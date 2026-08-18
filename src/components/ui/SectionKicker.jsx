import React from 'react';

// The flanking-hairline eyebrow label repeated at the top of nearly every
// section sitewide — one component instead of the same six lines of markup
// pasted into every page. size="lg" is an opt-in for the rare section that
// wants the kicker to read as a bigger editorial label (e.g. ProductsTeaser's
// left column) — default stays the small eyebrow every other call site uses.
const SectionKicker = ({ children, centered = false, size = 'sm', className = '' }) => {
  const lineWidth = size === 'lg' ? 'w-8' : 'w-6';
  return (
    <div className={`flex items-center gap-2.5 ${centered ? 'justify-center' : ''} ${className}`}>
      <span className={`${lineWidth} h-px bg-royal/45`} />
      <span
        className={`font-display font-bold tracking-[0.18em] uppercase text-royal whitespace-nowrap ${
          size === 'lg' ? 'text-base sm:text-lg' : 'text-xs'
        }`}
      >
        {children}
      </span>
      {centered && <span className={`${lineWidth} h-px bg-royal/45`} />}
    </div>
  );
};

export default SectionKicker;
