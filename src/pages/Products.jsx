import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionKicker from '../components/ui/SectionKicker';
import PlaceholderShot from '../components/ui/PlaceholderShot';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';

const DEV_PRODUCTS = [
  { title: 'AI Agent', desc: 'An agent built to act, not just answer — it reasons over a request, uses tools and data, and returns a completed result.', to: '/ai-agent' },
  { title: 'Data Factory', desc: "A data engineering product we're building in-house. More details as it nears release." },
  { title: 'QA Foundation Platform', desc: 'An intelligent QA and software-testing platform, focused on automated testing and engineering infrastructure.' },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const Products = () => (
  <div className="bg-primary">
    <section className="pt-[168px] pb-6 px-4 sm:px-8 max-w-7xl mx-auto text-center">
      <motion.div {...fadeUp} className="max-w-2xl mx-auto">
        <SectionKicker centered className="mb-3.5">Our Products</SectionKicker>
        <h1 className="font-display text-[30px] sm:text-[46px] font-semibold tracking-tight text-ink leading-tight mb-4">
          We build our own technology
        </h1>
        <p className="text-[15px] leading-relaxed text-muted">
          Real products, at different stages — built to solve problems we understand firsthand.
        </p>
      </motion.div>
    </section>

    <section className="py-6 px-4 sm:px-8 max-w-[1120px] mx-auto">
      <motion.div {...fadeUp} className="grid sm:grid-cols-2 rounded-2xl overflow-hidden border border-ink/15 bg-card">
        <div className="p-2 flex items-center">
          <img src="/assets/redesign/lekvya-screenshot.png" alt="Lekvya product screenshot" className="w-full h-auto rounded-xl" />
        </div>
        <div className="p-9 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <img src="/assets/redesign/lekvya-logo.png" alt="Lekvya" className="h-6 w-auto" />
            <span className="px-2.5 py-1 rounded-full bg-green/10 text-green font-display text-[10.5px] font-bold tracking-wide">LIVE</span>
          </div>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Lekvya</h2>
          <p className="text-[14px] leading-relaxed text-muted mb-5">
            An AI-powered workflow and client-communication platform for Chartered Accountants and financial-service
            firms — built around scheduling, client management, and document handling. Currently used by 2 active CA
            customers.
          </p>
          <a
            href="https://ca.navedhana.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-electric text-primary font-bold text-sm w-fit"
          >
            Explore Lekvya →
          </a>
        </div>
      </motion.div>
    </section>

    <section className="py-6 pb-16 px-4 sm:px-8 max-w-[1120px] mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEV_PRODUCTS.map((p, i) => (
          <motion.div key={p.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl overflow-hidden border border-ink/15 bg-card flex flex-col">
            <PlaceholderShot label={`Add ${p.title} screenshot`} className="w-full h-[170px]" />
            <div className="p-6">
              <span className="inline-block mb-3 px-2.5 py-1 rounded-full bg-ink/[0.06] text-muted font-display text-[10.5px] font-bold tracking-wide">
                IN DEVELOPMENT
              </span>
              <h3 className="font-display text-[18px] font-semibold text-ink mb-2.5">{p.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{p.desc}</p>
              {p.to && (
                <Link to={p.to} className="inline-block mt-4 text-[13px] font-semibold text-electric hover:underline">
                  Read more →
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="py-14 px-4 sm:px-8 text-center bg-surface">
      <motion.div {...fadeUp} className="max-w-xl mx-auto">
        <h2 className="font-display text-2xl sm:text-[28px] font-bold tracking-tight text-ink mb-2.5">Building something similar?</h2>
        <p className="text-sm text-muted mb-6">
          We also build custom software for other businesses. <Link to="/work" className="text-electric hover:underline">See our client work</Link>.
        </p>
        <Button to="/contact" size="sm" onClick={() => trackEvent('cta_click', { location: 'products' })}>
          Discuss Your Project →
        </Button>
      </motion.div>
    </section>
  </div>
);

export default Products;
