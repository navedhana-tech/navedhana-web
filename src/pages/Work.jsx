import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionKicker from '../components/ui/SectionKicker';
import PlaceholderShot from '../components/ui/PlaceholderShot';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const Work = () => (
  <div className="bg-primary">
    <section className="pt-[168px] pb-6 px-4 sm:px-8 max-w-7xl mx-auto text-center">
      <motion.div {...fadeUp} className="max-w-2xl mx-auto">
        <SectionKicker centered className="mb-3.5">Selected Work</SectionKicker>
        <h1 className="font-display text-[30px] sm:text-[46px] font-semibold tracking-tight text-ink leading-tight mb-4">
          Built for businesses
        </h1>
        <p className="text-[15px] leading-relaxed text-muted">
          Custom software we've engineered for other companies — kept separate from our own products.
        </p>
      </motion.div>
    </section>

    <section className="py-6 pb-8 px-4 sm:px-8 max-w-[1120px] mx-auto">
      <motion.div {...fadeUp} className="grid sm:grid-cols-2 rounded-2xl overflow-hidden border border-ink/15 bg-card">
        <div className="p-2">
          <PlaceholderShot label="Add Robocoders Desktop App screenshot" className="w-full h-full min-h-[220px]" />
        </div>
        <div className="p-9">
          <span className="inline-block mb-4 px-2.5 py-1 rounded-full bg-ink/[0.06] text-muted font-display text-[10.5px] font-bold tracking-wide">
            CLIENT PROJECT
          </span>
          <h2 className="font-display text-[21px] font-semibold text-ink mb-3">Yugminds — Robocoders Desktop App</h2>
          <p className="text-[14px] leading-relaxed text-muted mb-4">
            Yugminds is an active client. We designed and built Robocoders, a desktop application in a category
            similar to OpenBlocks, engineered end to end as a client project.
          </p>
          <div className="flex flex-col gap-2 text-[13px] text-muted">
            <div><strong className="text-ink font-semibold">Client:</strong> Yugminds</div>
            <div><strong className="text-ink font-semibold">What we built:</strong> A custom desktop application (Robocoders)</div>
            <div><strong className="text-ink font-semibold">Engagement:</strong> Full-cycle custom software development</div>
          </div>
        </div>
      </motion.div>
    </section>

    <section className="py-14 px-4 sm:px-8 text-center bg-surface">
      <motion.div {...fadeUp} className="max-w-xl mx-auto">
        <h2 className="font-display text-2xl sm:text-[28px] font-bold tracking-tight text-ink mb-2.5">Looking for our own products?</h2>
        <p className="text-sm text-muted mb-6">
          <Link to="/products" className="text-electric hover:underline">See what we're building</Link> — including Lekvya, live today.
        </p>
        <Button to="/contact" size="sm" onClick={() => trackEvent('cta_click', { location: 'work' })}>
          Discuss Your Project →
        </Button>
      </motion.div>
    </section>
  </div>
);

export default Work;
