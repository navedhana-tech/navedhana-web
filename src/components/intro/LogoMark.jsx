import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE_SIGNATURE } from '../../lib/motion';
import {
  LOGO_VIEWBOX,
  LEAF_PATH,
  LEAF_VEIN_PATH,
  CIRCUIT_BRANCHES,
  CIRCUIT_STEM_PATH,
} from './logoPaths';

const REAL_LOGO_SRC = '/assets/logo/navedhana-mark.svg';

// Static by default (used in Navbar every render) — renders the real vector
// logo. Pass `animated` to play the one-shot circuit-draw -> leaf-fill
// sequence first (an abstract "software becoming a symbol" beat, using the
// simplified traced paths in logoPaths.js), then crossfade to the real
// artwork before the `layoutId` flight into the navbar.
const LogoMark = ({ size = 40, animated = false, className = '' }) => {
  const [showReal, setShowReal] = useState(!animated);

  useEffect(() => {
    if (!animated) return undefined;
    const t = setTimeout(() => setShowReal(true), 1500);
    return () => clearTimeout(t);
  }, [animated]);

  if (showReal) {
    return (
      <motion.img
        src={REAL_LOGO_SRC}
        alt="Navedhana"
        width={size}
        height={size}
        className={`object-contain ${className}`}
        initial={animated ? { opacity: 0, scale: 0.92 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE_SIGNATURE }}
      />
    );
  }

  const circuitAnim = {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 0.8, ease: EASE_SIGNATURE },
  };
  const leafAnim = {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay: 0.7, duration: 0.6, ease: EASE_SIGNATURE },
    style: { transformOrigin: '50% 50%' },
  };
  const veinAnim = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 1.1, duration: 0.4, ease: EASE_SIGNATURE },
  };

  return (
    <svg viewBox={LOGO_VIEWBOX} width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <linearGradient id="leafFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-royal)" />
          <stop offset="100%" stopColor="var(--color-electric)" />
        </linearGradient>
      </defs>
      {CIRCUIT_BRANCHES.map((branch) => (
        <g key={branch.id}>
          <motion.path
            d={branch.path}
            stroke="var(--color-electric)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            {...circuitAnim}
          />
          <circle
            cx={branch.node.cx}
            cy={branch.node.cy}
            r={branch.node.r}
            fill="var(--color-surface)"
            stroke="var(--color-electric)"
            strokeWidth="4"
          />
        </g>
      ))}
      <motion.path
        d={CIRCUIT_STEM_PATH}
        stroke="var(--color-electric)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        {...circuitAnim}
      />
      <motion.path d={LEAF_PATH} fill="url(#leafFill)" {...leafAnim} />
      <motion.path
        d={LEAF_VEIN_PATH}
        stroke="var(--color-surface)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        {...veinAnim}
      />
    </svg>
  );
};

export default LogoMark;
