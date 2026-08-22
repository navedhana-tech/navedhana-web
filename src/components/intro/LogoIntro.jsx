import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import LogoMark from './LogoMark';

// Timeline (ms, desktop) — scaled by `factor` on narrow viewports so mobile
// lands in the spec's ~1.2-1.5s window instead of ~2.5s. Stage order:
// draw (outline) -> energy (fill-in + energy wash) -> settled (+ one pulse)
// -> transition (shrink into navbar). No wordmark during the splash — "NAVEDHANA"
// only appears once, in the navbar itself, once the logo mark lands there.
const T_ENERGY = 850;
const T_SETTLE = 1450;
const T_TRANSITION = 2050;
const T_COMPLETE = 2450;

// Mounted only when the caller (App.jsx) has already decided the intro
// should run (route is "/", not seen this session, motion not reduced) —
// this component owns only the staged animation, not that decision.
const LogoIntro = ({ onComplete }) => {
  const [stage, setStage] = useState('draw');
  const [transitioning, setTransitioning] = useState(false);
  const factor = useRef(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches ? 0.55 : 1
  ).current;

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('energy'), Math.round(T_ENERGY * factor)),
      setTimeout(() => setStage('settled'), Math.round(T_SETTLE * factor)),
      setTimeout(() => setTransitioning(true), Math.round(T_TRANSITION * factor)),
      setTimeout(() => onComplete(), Math.round(T_COMPLETE * factor)),
    ];
    return () => timers.forEach(clearTimeout);
  }, [factor, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 bg-primary transition-opacity duration-500 ease-out ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div className="relative z-10 flex flex-col items-center">
        <LogoMark
          stage={stage}
          pulse={stage === 'settled'}
          speed={factor}
          layoutId="brand-logomark"
          className="w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 text-electric"
        />
      </div>
    </motion.div>
  );
};

export default LogoIntro;
