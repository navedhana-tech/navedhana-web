import React from 'react';

// The flanking-hairline eyebrow label repeated at the top of nearly every
// section sitewide — one component instead of the same six lines of markup
// pasted into every page. size="lg" is an opt-in for the rare section that
// wants the kicker to read as a bigger editorial label (e.g. ProductsTeaser's
// left column) — default stays the small eyebrow every other call site uses.
const SectionKicker = ({ children, centered = false, size = 'sm', className = '' }) => {
  // shrink-0 on the flanking rules: without it a long label squeezes them from
  // 24px down to ~11px on a phone, where they read as stray artifacts rather
  // than a deliberate flourish. The label instead gets a slightly smaller size
  // and tighter tracking on mobile so the whole row still fits 375px.
  const lineWidth = size === 'lg' ? 'w-8' : 'w-5 sm:w-6';
  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 ${centered ? 'justify-center' : ''} ${className}`}>
      <span className={`${lineWidth} shrink-0 h-px bg-royal/45`} />
      <span
        className={`font-display font-bold tracking-[0.1em] sm:tracking-[0.18em] uppercase text-royal whitespace-nowrap ${
          size === 'lg' ? 'text-base sm:text-lg' : 'text-[12px] sm:text-xs'
        }`}
      >
        {children}
      </span>
      {centered && <span className={`${lineWidth} shrink-0 h-px bg-royal/45`} />}
    </div>
  );
};

export default SectionKicker;
