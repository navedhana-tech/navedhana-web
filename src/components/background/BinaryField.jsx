import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimationFrame } from '../../hooks/useAnimationFrame';

const CHARS = ['0', '1'];

// Ambient binary digit rain — the only Canvas2D consumer in the app (organic/
// ambient motion only, per the Canvas vs SVG split). Reused by the intro and
// as a low-density ambient hero layer via the `density` prop. Pass
// `interactive` to make particles nudge sideways and glow near the cursor —
// off by default so the plain ambient usages elsewhere stay untouched.
const BinaryField = ({ density = 40, className = '', interactive = false }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [inView, setInView] = useState(false);

  const seedParticles = useCallback(
    (width, height) => {
      particlesRef.current = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        offsetX: 0,
        speed: 20 + Math.random() * 30,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        opacity: 0.15 + Math.random() * 0.35,
      }));
    },
    [density]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      sizeRef.current = { width, height };
      seedParticles(width, height);
    };

    resize();
    window.addEventListener('resize', resize);

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(canvas);

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    if (interactive) {
      canvas.addEventListener('mousemove', handleMove);
      canvas.addEventListener('mouseleave', handleLeave);
    }

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMove);
        canvas.removeEventListener('mouseleave', handleLeave);
      }
    };
  }, [seedParticles, interactive]);

  useAnimationFrame(
    (delta) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const { width, height } = sizeRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.textBaseline = 'top';

      const mouse = mouseRef.current;

      for (const particle of particlesRef.current) {
        particle.y += particle.speed * (delta / 1000);
        if (particle.y > height) {
          particle.y = -20;
          particle.x = Math.random() * width;
          particle.offsetX = 0;
        }

        let glow = 0;
        if (interactive) {
          const dx = particle.x + particle.offsetX - mouse.x;
          const dy = particle.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 70) {
            const force = (70 - d) / 70;
            particle.offsetX += dx * force * 0.15;
            glow = force;
          }
          particle.offsetX *= 0.92;
        }

        ctx.fillStyle = `rgba(0, 212, 255, ${Math.min(1, particle.opacity + glow * 0.6)})`;
        ctx.fillText(particle.char, particle.x + particle.offsetX, particle.y);
      }
    },
    { active: inView }
  );

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} aria-hidden="true" />;
};

export default BinaryField;
