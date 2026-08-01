import React, { useEffect, useRef, useState } from 'react';
import { useAnimationFrame } from '../../hooks/useAnimationFrame';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import LogoMark from '../intro/LogoMark';
import BinaryField from '../background/BinaryField';
import { SERVICES } from '../../data/services';

const LOGO_SRC = '/assets/logo/navedhana-mark.svg';

// Baseline tuned at a 520px container; the logo's own sampling resolution
// and particle count scale up with the container's real size so it stays
// proportioned instead of shrinking relative to a much bigger box.
const BASE_DIMENSION = 520;
const BASE_OFFSCREEN_W = 260;
const BASE_SHAPE_COUNT = 1100;
const MAX_OFFSCREEN_W = 420;
const MAX_SHAPE_COUNT = 2200;
const SAMPLE_STEP = 4;
const REPEL_RADIUS = 60;
const REVEAL_RADIUS = 90;
const RAIN_DENSITY = 200;

// Fixed scatter positions around the forming logo — filled with the first
// four service titles (single source of truth: data/services.js).
const ANCHORS = [
  { xPct: 12, yPct: 18 },
  { xPct: 82, yPct: 14 },
  { xPct: 80, yPct: 78 },
  { xPct: 14, yPct: 80 },
];
const LABELS = SERVICES.slice(0, 4).map((s, i) => ({ title: s.title, ...ANCHORS[i] }));

// Signature Hero piece: binary digits assemble into the real Navedhana logo
// (sampled from the actual traced SVG, not a stand-in shape), and part around
// the cursor like a magnetic field. A separate falling-rain layer (BinaryField,
// full-height/width) fills the rest of the right half — kept on its own canvas
// so it never competes with or disturbs the shape-forming particles.
const BinaryLogoField = () => {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRefs = useRef([]);
  const particlesRef = useRef([]);
  const targetsRef = useRef([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const colorRef = useRef('#00D4FF');
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) return undefined;
    let cancelled = false;
    colorRef.current = getComputedStyle(document.documentElement).getPropertyValue('--color-electric').trim() || '#00D4FF';

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const syncCanvasSize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      sizeRef.current = { width, height };
      return { width, height };
    };

    const { width, height } = syncCanvasSize();

    // Sized off the smaller dimension so the logo stays in proportion and
    // never clips, even though the container itself is much wider than tall.
    const sizeScale = Math.min(2, Math.max(1, Math.min(width, height) / BASE_DIMENSION));
    const offscreenW = Math.min(MAX_OFFSCREEN_W, Math.round(BASE_OFFSCREEN_W * sizeScale));
    const offscreenH = Math.round((offscreenW * 396) / 325);
    const shapeCount = Math.min(MAX_SHAPE_COUNT, Math.round(BASE_SHAPE_COUNT * sizeScale * sizeScale));

    particlesRef.current = Array.from({ length: shapeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      char: Math.random() > 0.5 ? '1' : '0',
      speed: 0.045 + Math.random() * 0.04,
    }));

    const img = new Image();
    img.src = LOGO_SRC;
    img.onload = () => {
      if (cancelled) return;
      const off = document.createElement('canvas');
      off.width = offscreenW;
      off.height = offscreenH;
      const octx = off.getContext('2d');
      octx.drawImage(img, 0, 0, offscreenW, offscreenH);
      const data = octx.getImageData(0, 0, offscreenW, offscreenH).data;
      const pts = [];
      for (let y2 = 0; y2 < offscreenH; y2 += SAMPLE_STEP) {
        for (let x2 = 0; x2 < offscreenW; x2 += SAMPLE_STEP) {
          const alpha = data[(y2 * offscreenW + x2) * 4 + 3];
          if (alpha > 40) pts.push({ x: x2 - offscreenW / 2, y: y2 - offscreenH / 2 });
        }
      }
      targetsRef.current = pts;
      setReady(true);
    };

    const handleResize = () => syncCanvasSize();
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(container);

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, [reducedMotion]);

  useAnimationFrame(
    () => {
      const canvas = canvasRef.current;
      if (!canvas || !ready) return;
      const { width, height } = sizeRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = colorRef.current;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const targets = targetsRef.current;
      const shapeCount = particlesRef.current.length;
      const cx = width / 2;
      const cy = height / 2;
      const mouse = mouseRef.current;

      particlesRef.current.forEach((p, i) => {
        if (!targets.length) return;
        // Spread particles evenly across the whole target set — not a plain
        // `i % targets.length`, which (with more sample points than
        // particles) only ever reaches the first N points in scan order and
        // silently drops everything after, i.e. the bottom of the shape.
        const t = targets[Math.floor((i * targets.length) / shapeCount) % targets.length];
        const tx = cx + t.x;
        const ty = cy + t.y;

        p.x += (tx - p.x) * p.speed;
        p.y += (ty - p.y) * p.speed;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - d) / REPEL_RADIUS;
          p.x += dx * force * 0.3;
          p.y += dy * force * 0.3;
        }

        if (Math.random() < 0.01) p.char = p.char === '1' ? '0' : '1';

        ctx.fillText(p.char, p.x, p.y);
      });

      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        const anchor = LABELS[i];
        const ax = (anchor.xPct / 100) * width;
        const ay = (anchor.yPct / 100) * height;
        const dx = ax - mouse.x;
        const dy = ay - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        el.style.opacity = d < REVEAL_RADIUS ? 1 : 0;
      });
    },
    { active: inView && !reducedMotion && ready }
  );

  if (reducedMotion) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <LogoMark size={140} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Falling-rain layer, full container — separate canvas so it never
          competes with or disturbs the shape-forming particles above it. */}
      <div className="absolute inset-0 opacity-80">
        <BinaryField density={RAIN_DENSITY} interactive />
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      {LABELS.map((label, i) => (
        <span
          key={label.title}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-wide text-electric opacity-0 transition-opacity duration-base pointer-events-none whitespace-nowrap"
          style={{ left: `${label.xPct}%`, top: `${label.yPct}%` }}
        >
          {label.title}
        </span>
      ))}
    </div>
  );
};

export default BinaryLogoField;
