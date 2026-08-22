import React from 'react';

// Tinted icon tile used across the interior pages for per-category color
// coding. Light-background counterpart to Home's `.wwd-card` icon tile — same
// idea, lower tint so it reads on `bg-primary`/`bg-card` instead of dark.
const AccentIcon = ({ accent, className = '', children }) => (
  <div
    className={`rounded-xl border flex items-center justify-center flex-shrink-0 ${className}`}
    style={{
      background: `color-mix(in srgb, ${accent} 12%, transparent)`,
      borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
      color: accent,
    }}
  >
    {children}
  </div>
);

export default AccentIcon;
