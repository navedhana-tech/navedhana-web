import React, { useEffect, useRef } from 'react';

// Cursor-reactive light, topmost layer. Direct style mutation on mousemove —
// no JS animation loop, no re-renders.
const CursorGlow = () => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const handleMove = (e) => {
      node.style.setProperty('--x', `${e.clientX}px`);
      node.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-10 hidden md:block"
      style={{
        background:
          'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--color-electric) 12%, transparent), transparent 60%)',
      }}
      aria-hidden="true"
    />
  );
};

export default CursorGlow;
