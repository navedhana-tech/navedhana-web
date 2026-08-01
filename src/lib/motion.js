// Single source of truth for animation timing, shared by every Framer Motion
// usage in the app. Mirrors the CSS custom properties in src/index.css
// (Framer reads JS values, CSS reads var()s — same numbers, two places).

export const DURATION = {
  micro: 0.15,
  base: 0.3,
  reveal: 0.7,
  step: 0.5,
};

export const EASE_SIGNATURE = [0.16, 1, 0.3, 1];

export const SPRING = { type: 'spring', stiffness: 300, damping: 30 };
