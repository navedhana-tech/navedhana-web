import React from 'react';
import SectionKicker from '../components/ui/SectionKicker';

// Referenced in the nav "More" dropdown on every page, but the source
// design project has no designed content for it yet — a minimal shell
// rather than fabricated content.
const Insights = () => (
  <div className="bg-primary min-h-[60vh]">
    <section className="pt-[104px] sm:pt-[168px] pb-24 px-4 sm:px-8 max-w-2xl mx-auto text-center">
      <SectionKicker centered className="mb-3.5">Insights</SectionKicker>
      <h1 className="font-display text-[28px] sm:text-4xl font-semibold tracking-tight text-ink mb-3">Coming soon</h1>
      <p className="text-[14.5px] text-muted">We're putting together writing on engineering and AI. Check back soon.</p>
    </section>
  </div>
);

export default Insights;
