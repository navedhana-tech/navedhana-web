import React from 'react';
import { motion } from 'framer-motion';
import PageHero from './PageHero';

// Shared shell for /privacy and /terms — same structure, different sections,
// so the two pages are data rather than two near-identical components.
// `sections` is [{ heading, body }] where body is a JSX fragment.
const LegalPage = ({ kicker, title, updated, intro, sections }) => (
  <div className="bg-primary">
    <PageHero align="left" kicker={kicker} title={title} subtitle={intro} className="pt-[104px] sm:pt-[168px] pb-6" />

    <section className="pb-16 sm:pb-20 px-4 sm:px-8 max-w-3xl mx-auto">
      <p className="text-[13px] text-muted/70 mb-8 pb-6 border-b border-ink/15">Last updated: {updated}</p>

      <div className="flex flex-col gap-9">
        {sections.map((s, i) => (
          <motion.section
            key={s.heading}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.04 }}
          >
            <h2 className="font-display text-[18px] sm:text-[20px] font-semibold text-ink mb-3">{s.heading}</h2>
            <div className="flex flex-col gap-3 text-[14.5px] leading-relaxed text-muted [&_a]:text-electric [&_a]:underline [&_a]:inline-flex [&_a]:items-center [&_a]:min-h-[44px] sm:[&_a]:min-h-0 [&_a]:align-middle [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_li]:list-disc">
              {s.body}
            </div>
          </motion.section>
        ))}
      </div>
    </section>
  </div>
);

export default LegalPage;
