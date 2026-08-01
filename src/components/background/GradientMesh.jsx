import React from 'react';

// CSS-only grid + gradient mesh — no JS animation loop, pure transform/opacity keyframes.
const GradientMesh = () => (
 <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
 <div
 className="absolute inset-0 opacity-[0.07] animate-grid-pan"
 style={{
 backgroundImage:
'linear-gradient(var(--color-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-muted) 1px, transparent 1px)',
 backgroundSize: '64px 64px',
 }}
 />
 <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-royal/20 blur-[120px] animate-drift" />
 <div
 className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-electric/10 blur-[120px] animate-drift"
 style={{ animationDelay: '-10s' }}
 />
 </div>
);

export default GradientMesh;
