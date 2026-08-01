// Traced SVG path data approximating public/assets/logo/NPA_Logo_Enlarge.png
// (leaf + circuit-branch motif). Deliberate hand-traced approximation, not
// pixel-perfect brand vector art — see plan Gaps & Assumptions.

export const LOGO_VIEWBOX = '0 0 440 460';

export const LEAF_PATH =
  'M 350 20 C 425 65, 448 175, 270 290 C 175 260, 160 140, 350 20 Z';

export const LEAF_VEIN_PATH = 'M 220 255 C 245 190, 285 110, 340 55';

// Three circuit branches, each tipped with a node circle, merging into one stem.
export const CIRCUIT_BRANCHES = [
  { id: 'branch-1', node: { cx: 195, cy: 40, r: 10 }, path: 'M 195 50 C 175 110, 200 190, 235 255' },
  { id: 'branch-2', node: { cx: 125, cy: 100, r: 10 }, path: 'M 125 110 C 135 155, 175 205, 235 258' },
  { id: 'branch-3', node: { cx: 65, cy: 180, r: 10 }, path: 'M 65 190 C 90 220, 150 245, 225 262' },
];

export const CIRCUIT_STEM_PATH = 'M 235 260 C 255 320, 265 390, 280 450';
