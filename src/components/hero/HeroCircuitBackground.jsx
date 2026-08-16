import React, { useEffect, useState } from 'react';
import { Code2, Database, BarChart3 } from 'lucide-react';
import { useIntroDone } from '../../lib/introContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// pos: approximate percentage position, used to draw the connector lines
// from the central glow — matches each node's own top/left/right classes.
// Hidden below md entirely: at phone widths these sat close enough to the
// headline text to read as clutter rather than decoration, so the mobile
// hero is just the mesh + text now, no floating cards fighting for space.
// idle: restrained per-node CSS animation class (src/index.css), applied to
// the icon glyph only, never the card itself, so it never fights the card's
// own mouse-parallax transform.
const NODES = [
  { icon: <Code2 size={20} />, className: 'md:top-[9%] md:left-[7%] lg:left-[11%]', pos: { x: 9, y: 10 }, idle: '' },
  { icon: <span className="font-display font-bold text-[13px]">AI</span>, className: 'md:top-[12%] md:right-[7%] lg:right-[11%]', pos: { x: 91, y: 13 }, idle: 'node-idle-ai' },
  { icon: <Database size={20} />, className: 'top-[46%] left-[3%] lg:left-[8%]', pos: { x: 5, y: 46 }, idle: 'node-idle-database' },
  { icon: <BarChart3 size={20} />, className: 'top-[40%] right-[4%] lg:right-[9%]', pos: { x: 95, y: 40 }, idle: 'node-idle-analytics' },
];

// Where the connector lines converge.
const CENTER = { x: 50, y: 24 };

const DotGrid = ({ className }) => (
  <div className={`absolute hidden lg:grid grid-cols-4 gap-2 opacity-30 ${className}`}>
    {Array.from({ length: 12 }).map((_, i) => (
      <span key={i} className="w-1 h-1 rounded-full bg-electric" />
    ))}
  </div>
);

// Decorative hero backdrop — a soft glow, four icon nodes naming what the
// company actually builds (code, AI, data, analytics), and thin connector
// lines tying them back to a central point so they read as one system
// rather than four unrelated stickers. Entrance is gated on the logo intro
// finishing (src/lib/introContext.js) so the network visibly "grows" in
// right after the intro logo settles, instead of popping in on mount.
const HeroCircuitBackground = () => {
  const introDone = useIntroDone();
  const reducedMotion = useReducedMotion();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeSignal, setActiveSignal] = useState(null);

  // Desktop-only, rAF-throttled mouse parallax — a couple of px, nothing more.
  useEffect(() => {
    if (reducedMotion) return undefined;
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return undefined;
    let frame = null;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        setMouse({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 });
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  // Occasional single signal traveling along one connector line at a time.
  useEffect(() => {
    if (reducedMotion || !introDone) return undefined;
    let cancelled = false;
    let hideId;
    const tick = () => {
      const delay = 5000 + Math.random() * 3000;
      hideId = setTimeout(() => {
        if (cancelled) return;
        setActiveSignal(Math.floor(Math.random() * NODES.length));
        setTimeout(() => {
          if (!cancelled) setActiveSignal(null);
        }, 900);
        tick();
      }, delay);
    };
    tick();
    return () => {
      cancelled = true;
      clearTimeout(hideId);
    };
  }, [reducedMotion, introDone]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-out"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ opacity: introDone ? 1 : 0 }}
      >
        {NODES.map((n, i) => (
          <line
            key={i}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.pos.x}
            y2={n.pos.y}
            stroke="rgba(9,88,214,0.14)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {activeSignal !== null && (
          <line
            x1={CENTER.x}
            y1={CENTER.y}
            x2={NODES[activeSignal].pos.x}
            y2={NODES[activeSignal].pos.y}
            stroke="rgba(9,88,214,0.6)"
            strokeWidth={1.6}
            vectorEffect="non-scaling-stroke"
            className="signal-sweep"
          />
        )}
      </svg>

      {NODES.map((n, i) => (
        <div
          key={i}
          className={`absolute hidden md:block ${n.className} transition-[opacity,transform] duration-500 ease-out`}
          style={{
            transitionDelay: `${i * 70}ms`,
            opacity: introDone ? 1 : 0,
            transform: introDone
              ? `translate(${(mouse.x * 3).toFixed(1)}px, ${(mouse.y * 3 - 0).toFixed(1)}px)`
              : 'translateY(10px) scale(0.92)',
          }}
        >
          <div className="w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-card border border-electric/20 shadow-sm flex items-center justify-center text-electric">
            <span className={n.idle}>{n.icon}</span>
          </div>
        </div>
      ))}
      <DotGrid className="top-[6%] left-[20%]" />
      <DotGrid className="bottom-[16%] right-[22%]" />
    </div>
  );
};

export default HeroCircuitBackground;
