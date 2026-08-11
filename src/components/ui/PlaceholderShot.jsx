import React from 'react';
import { ImageIcon } from 'lucide-react';

// Stands in for a product/case-study screenshot that doesn't exist yet
// (Data Factory, QA Foundation, Robocoders) — a plain bordered box, not a
// broken <img>. Replace with a real image once one is available.
const PlaceholderShot = ({ label, className = '' }) => (
  <div
    className={`flex flex-col items-center justify-center gap-2 bg-ink/[0.035] border border-dashed border-ink/15 text-muted/60 ${className}`}
  >
    <ImageIcon size={22} strokeWidth={1.5} aria-hidden="true" />
    {label && <span className="text-[11px] text-center px-4">{label}</span>}
  </div>
);

export default PlaceholderShot;
