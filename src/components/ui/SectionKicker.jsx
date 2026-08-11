import React from 'react';

// The flanking-hairline eyebrow label repeated at the top of nearly every
// section sitewide — one component instead of the same six lines of markup
// pasted into every page.
const SectionKicker = ({ children, centered = false, className = '' }) => (
  <div className={`flex items-center gap-2.5 ${centered ? 'justify-center' : ''} ${className}`}>
    <span className="w-6 h-px bg-royal/45" />
    <span className="font-display text-xs font-bold tracking-[0.18em] uppercase text-royal whitespace-nowrap">
      {children}
    </span>
    {centered && <span className="w-6 h-px bg-royal/45" />}
  </div>
);

export default SectionKicker;
