import { useEffect, useRef } from 'react';

// Shared requestAnimationFrame driver — every canvas consumer passes its own
// per-frame callback instead of running its own rAF loop (Engineering principles:
// no duplicated logic). Pass `active: false` to pause (e.g. off-screen).
export function useAnimationFrame(callback, { active = true } = {}) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!active) return undefined;
    let frameId;
    let last = performance.now();

    const loop = (now) => {
      const delta = now - last;
      last = now;
      callbackRef.current(delta);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [active]);
}
