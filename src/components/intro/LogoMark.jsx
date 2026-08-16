import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SPRING } from '../../lib/motion';

// Path data straight from the client-supplied Software_logo.svg (viewBox
// 0 0 325 396, same translate/scale group) — not redrawn, just recolored via
// currentColor so it can share one CSS var with the rest of the brand palette.
const LOGO_PATH = `M2860 3819 c-19 -4 -66 -15 -105 -23 -111 -24 -178 -42 -208 -54 -16
-7 -32 -12 -36 -12 -12 0 -208 -75 -276 -105 -94 -42 -257 -125 -286 -146 -15
-10 -35 -22 -45 -26 -27 -11 -165 -104 -194 -130 -14 -13 -28 -23 -32 -23 -13
0 -235 -224 -273 -275 -21 -27 -40 -52 -44 -55 -20 -16 -125 -227 -143 -290
-9 -30 -23 -75 -30 -100 -18 -62 -18 -464 0 -482 6 -6 12 -24 12 -40 0 -26 20
-99 40 -143 5 -11 12 -30 15 -43 6 -20 4 -21 -17 -11 -13 5 -37 31 -53 57 -16
26 -32 49 -35 52 -4 3 -23 39 -42 80 -110 233 -123 287 -122 520 1 174 14 266
56 367 23 59 35 89 48 123 8 19 21 49 31 65 9 17 25 46 35 65 11 19 24 40 29
47 30 37 50 68 67 101 10 19 19 22 76 22 61 0 66 2 98 36 30 31 34 42 34 88 0
44 -5 58 -30 86 -27 30 -37 34 -90 38 -59 4 -61 4 -101 -37 -41 -40 -41 -41
-35 -98 11 -106 11 -108 -40 -185 -51 -76 -54 -82 -102 -175 -39 -74 -56 -117
-71 -173 -7 -25 -17 -61 -22 -80 -35 -117 -47 -302 -30 -455 11 -95 80 -306
121 -374 17 -26 30 -53 30 -59 0 -6 3 -12 8 -14 4 -2 16 -20 27 -40 25 -46 79
-109 174 -204 67 -68 73 -77 68 -107 -4 -17 -9 -48 -12 -67 -12 -71 -16 -80
-30 -80 -8 0 -15 4 -15 8 0 4 -15 16 -32 26 -43 25 -288 273 -288 292 0 8 -4
14 -9 14 -18 0 -141 206 -141 238 0 6 -4 12 -9 12 -10 0 -81 211 -81 241 0 11
-4 28 -9 37 -12 23 -24 156 -24 262 0 118 14 290 23 290 4 0 10 9 13 20 3 14
14 20 31 20 14 0 26 4 26 9 0 5 9 13 20 16 11 3 20 12 20 20 0 7 6 15 13 18 8
2 12 24 12 59 0 52 -3 59 -38 93 -37 36 -40 37 -98 33 -52 -4 -63 -8 -89 -38
-25 -28 -30 -42 -30 -86 0 -44 5 -57 28 -81 52 -54 56 -61 41 -80 -19 -22 -20
-552 -2 -575 7 -8 16 -37 19 -64 4 -27 10 -53 14 -59 4 -5 17 -39 30 -75 13
-36 30 -76 37 -90 7 -14 13 -31 13 -37 0 -7 3 -13 8 -13 4 0 16 -19 27 -42 47
-98 150 -232 267 -347 65 -63 66 -64 134 -116 101 -77 104 -81 104 -124 0 -22
-4 -43 -10 -46 -6 -4 -10 -57 -10 -126 0 -122 -7 -142 -34 -93 -6 10 -14 21
-17 24 -8 6 -36 59 -45 83 -3 9 -10 17 -15 17 -5 0 -9 5 -9 12 0 6 -7 18 -15
27 -8 9 -35 41 -59 71 -47 59 -73 84 -176 168 -108 90 -233 223 -270 290 -8
15 -27 48 -43 74 -15 26 -27 54 -27 62 0 9 -4 16 -9 16 -5 0 -12 14 -16 31 -4
17 -13 42 -21 57 -8 15 -14 34 -14 43 0 8 -4 19 -10 25 -5 5 -13 31 -16 57 -6
40 -3 51 13 70 57 62 58 119 5 175 -47 48 -84 58 -137 36 -57 -23 -77 -49 -83
-105 -4 -40 0 -55 19 -84 13 -19 30 -35 37 -35 25 0 92 -41 92 -55 0 -9 4 -23
9 -33 5 -9 19 -48 31 -87 23 -78 111 -259 144 -298 11 -14 30 -38 41 -54 23
-32 107 -127 117 -131 3 -2 17 -13 31 -25 13 -12 48 -42 78 -67 79 -66 249
-240 249 -255 0 -4 19 -40 43 -79 45 -76 65 -116 92 -181 9 -22 20 -47 25 -56
5 -9 12 -34 16 -55 3 -22 10 -43 14 -49 5 -5 11 -28 15 -50 9 -51 35 -145 46
-167 5 -9 12 -35 15 -58 4 -22 10 -40 15 -40 5 0 9 -7 9 -16 0 -9 16 -51 37
-95 26 -57 41 -79 55 -79 20 0 24 29 8 58 -5 9 -19 40 -30 67 -23 55 -30 72
-53 125 -8 19 -24 78 -36 130 -12 52 -26 109 -32 126 -5 17 -9 48 -9 70 0 22
-5 45 -12 52 -16 16 -17 494 -1 514 6 7 13 40 16 73 10 99 61 333 76 348 6 6
11 21 11 33 0 12 7 35 15 50 8 16 15 36 15 45 0 9 7 30 15 45 8 16 15 37 15
46 0 9 4 19 9 23 5 3 12 19 16 35 4 17 11 30 16 30 5 0 9 7 9 16 0 8 12 41 26
72 58 128 78 167 85 172 4 3 11 18 14 33 4 15 10 27 14 27 4 0 18 21 31 48 12
26 33 61 46 79 13 17 24 36 24 42 0 6 5 11 10 11 6 0 10 5 10 10 0 10 31 59
55 86 6 6 17 22 25 34 33 49 117 152 179 219 13 14 35 40 50 56 77 86 126 111
157 81 27 -27 17 -48 -62 -130 -50 -52 -179 -217 -225 -287 -13 -20 -45 -67
-70 -105 -76 -113 -205 -359 -253 -484 -17 -41 -33 -79 -38 -84 -4 -6 -8 -19
-8 -31 0 -12 -4 -25 -8 -31 -5 -5 -26 -63 -46 -129 -21 -66 -42 -129 -46 -140
-5 -11 -12 -39 -15 -62 -9 -57 3 -61 124 -39 53 9 114 20 136 23 22 3 45 9 50
13 6 5 33 11 60 15 28 4 55 11 60 15 6 4 50 21 98 38 48 18 109 43 135 57 26
14 53 25 59 25 7 0 13 4 13 9 0 5 13 14 29 19 37 13 171 101 171 112 0 5 8 11
18 14 23 8 107 89 152 146 19 25 37 47 40 50 12 10 65 96 81 130 9 19 25 55
37 80 32 70 70 218 78 300 4 41 10 80 14 85 4 6 10 136 14 290 8 323 24 608
36 641 5 12 12 57 16 98 l7 76 -44 -1 c-24 -1 -60 -5 -79 -10z m-1487 -261
c32 -19 37 -28 37 -79 0 -39 -4 -49 -25 -63 -36 -23 -76 -20 -108 9 -72 67 10
180 96 133z m-575 -448 c34 -28 41 -91 13 -119 -26 -26 -96 -29 -123 -4 -27
25 -25 99 5 124 29 24 76 24 105 -1z m-295 -753 c20 -17 27 -32 27 -57 -1 -52
-29 -80 -80 -80 -53 0 -80 27 -80 78 0 74 77 108 133 59z`;

// Shared logo mark used by both the opening intro overlay and the navbar —
// same DOM node identity via `layoutId` lets Framer Motion animate the
// intro's centered logo into the navbar slot, rather than crossfading two
// unrelated elements.
//
// stage: 'hidden' | 'draw' | 'energy' | 'settled'
//   hidden  — nothing visible (pre-intro)
//   draw    — stroke outline animates in (path length computed on mount)
//   energy  — outline fades out, fill fades in, brief brighter "energy" wash
//   settled — plain filled mark, no animation (navbar's resting state)
const LogoMark = ({ className = '', stage = 'settled', layoutId, pulse = false, speed = 1 }) => {
  const outlineRef = useRef(null);
  const drawMs = Math.round(900 * speed);

  // Runs once: prime the outline's dash pattern so it starts fully hidden,
  // regardless of which stage we mount into.
  useEffect(() => {
    const el = outlineRef.current;
    if (!el) return;
    const length = el.getTotalLength();
    el.style.strokeDasharray = String(length);
    el.style.strokeDashoffset = String(length);
  }, []);

  // Triggers the actual "draw" transition when the stage becomes 'draw'.
  useEffect(() => {
    const el = outlineRef.current;
    if (!el || stage !== 'draw') return;
    const length = el.getTotalLength();
    el.style.transition = 'none';
    el.style.strokeDashoffset = String(length);
    void el.getBoundingClientRect(); // force reflow before re-enabling transition
    requestAnimationFrame(() => {
      el.style.transition = `stroke-dashoffset ${drawMs}ms cubic-bezier(0.16,1,0.3,1)`;
      el.style.strokeDashoffset = '0';
    });
  }, [stage, drawMs]);

  const isDecorative = stage !== 'settled';

  return (
    <motion.span
      layoutId={layoutId}
      transition={SPRING}
      className={`relative inline-block ${className}`}
      data-stage={stage}
      data-pulse={pulse ? '1' : undefined}
      style={{ '--logo-energy-ms': `${Math.round(650 * speed)}ms`, '--logo-fill-ms': `${Math.round(500 * speed)}ms` }}
      aria-hidden={isDecorative || undefined}
      role={isDecorative ? undefined : 'img'}
      aria-label={isDecorative ? undefined : 'Navedhana'}
    >
      <svg viewBox="0 0 325 396" className="block w-full h-full overflow-visible">
        <g transform="translate(0,396) scale(0.1,-0.1)">
          <path
            ref={outlineRef}
            d={LOGO_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="logo-mark-outline"
          />
          <path d={LOGO_PATH} fill="currentColor" className="logo-mark-fill" />
        </g>
      </svg>
      <span className="absolute inset-0 logo-mark-energy" aria-hidden="true">
        <svg viewBox="0 0 325 396" className="block w-full h-full overflow-visible text-[#5ea1ff]">
          <g transform="translate(0,396) scale(0.1,-0.1)">
            <path d={LOGO_PATH} fill="currentColor" />
          </g>
        </svg>
      </span>
    </motion.span>
  );
};

export default LogoMark;
