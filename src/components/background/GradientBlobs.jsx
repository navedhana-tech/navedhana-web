import React from 'react';

// Two soft, slowly-drifting radial blobs behind the pages — reuses the
// existing `animate-drift` keyframe (src/index.css) rather than defining a
// near-duplicate one; the two instances desync via a negative animation-delay,
// the same trick the old GradientMesh used.
//
// Alpha is deliberately low (0.05/0.07): on the warm paper background a
// stronger wash turns the cream grey and kills the warmth that makes the
// palette work. Second blob uses `sky` (not `electric`) so the two stay
// visually distinct — both instances of the same brand blue would read as
// one blob with uneven opacity instead of two.
const GradientBlobs = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div
      className="absolute -top-[14%] -left-[14%] w-[56vw] h-[56vw] max-w-[820px] max-h-[820px] rounded-full bg-electric/[0.05] blur-[70px] animate-drift"
    />
    <div
      className="absolute -bottom-[16%] -right-[12%] w-[58vw] h-[58vw] max-w-[900px] max-h-[900px] rounded-full bg-sky/[0.07] blur-[80px] animate-drift"
      style={{ animationDelay: '-10s' }}
    />
  </div>
);

export default GradientBlobs;
