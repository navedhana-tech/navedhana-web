// True when the device has a real pointer that can hover — the JS mirror of
// the `@media (hover: hover)` guards in index.css. Used to skip pointer-driven
// effects (cursor spotlights, glow tracking) on touch, where the CSS they
// drive is disabled anyway so the work would be wasted.
//
// Not a hook: pointer type does not meaningfully change mid-session, and the
// call sites need it during render, not as reactive state.
export const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
