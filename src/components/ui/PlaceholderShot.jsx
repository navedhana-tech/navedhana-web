import React from 'react';

// Stands in for a product/case-study screenshot that doesn't exist yet
// (Data Factory, QA Foundation, Robocoders, AI Agent) — a designed "in
// progress" state, not a "missing image" admin note. A dashed box with a
// generic broken-picture icon and literal "Add X screenshot" copy reads as
// an unfinished website to a visitor, even though the intent was an honest
// placeholder rather than a broken <img>; this keeps the honesty (no fake
// screenshot) but stops it looking like leaked internal TODO text. `icon`
// reuses the same per-product Lucide icon already shown on Home's hero
// cards, so the placeholder still carries real information (which product)
// instead of a content-free grey box.
const PlaceholderShot = ({ icon, label, className = '' }) => (
  <div
    className={`relative flex flex-col items-center justify-center gap-2.5 overflow-hidden bg-surface text-muted/70 ${className}`}
  >
    <div
      className="absolute inset-0 opacity-[0.4]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 30% 30%, oklch(55% 0.19 232 / 0.10), transparent 55%), radial-gradient(circle at 75% 70%, oklch(70% 0.15 55 / 0.10), transparent 55%)',
      }}
      aria-hidden="true"
    />
    {icon && (
      <div className="relative w-10 h-10 rounded-xl bg-card border border-ink/10 flex items-center justify-center text-electric">
        {icon}
      </div>
    )}
    {label && <span className="relative text-[11px] font-display font-semibold tracking-wide">{label}</span>}
  </div>
);

export default PlaceholderShot;
