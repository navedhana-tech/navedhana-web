import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Database, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import PlaceholderShot from '../components/ui/PlaceholderShot';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';
import { scaleIn, rise } from '../lib/motion';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

// `image` is decorative abstract art, not a screenshot — see PlaceholderShot.
const DEV_PRODUCTS = [
  { title: 'AI Agent', accent: '#0958d6', image: '/assets/photos/product-ai-agent.jpg', desc: 'An agent built to act, not just answer — it reasons over a request, uses tools and data, and returns a completed result.', to: '/ai-agent', icon: <Bot size={18} /> },
  { title: 'Data Factory', accent: '#6D5CE7', image: '/assets/photos/product-data-factory.jpg', desc: "A data engineering product we're building in-house. More details as it nears release.", icon: <Database size={18} /> },
  { title: 'QA Foundation Platform', accent: '#0d9488', image: '/assets/photos/product-qa-foundation.jpg', desc: 'An intelligent QA and software-testing platform, focused on automated testing and engineering infrastructure.', icon: <CheckCircle2 size={18} /> },
];

const Products = () => {
  useDocumentMeta({
    title: 'Products — Navedhana Software & AI Products',
    description:
      'Real products from Navedhana, built to solve problems we understand firsthand: Lekvya (live), and an AI Agent and QA platform in development.',
  });

  return (
  <div className="bg-primary">
    {/* Product-first: the header stays compact rather than the tall one other
        pages use, so the Lekvya screenshot below is still the first
        substantial thing a visitor sees. Centered per request. */}
    <PageHero
      backdrop="/assets/photos/abstract-blue.jpg"
      className="pt-[104px] sm:pt-[140px] pb-6"
      kicker="Our Products"
      title="Real products, at different stages"
      subtitle="Built to solve problems we understand firsthand — one live, two in development."
    />

    <section className="pt-2 pb-6 px-4 sm:px-8 max-w-[1120px] mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid sm:grid-cols-2 rounded-2xl overflow-hidden border border-ink/15 bg-card shadow-sm hover:shadow-md hover:border-ink/25 hover:-translate-y-0.5 transition-[transform,box-shadow,border-color] duration-300"
      >
        <div className="p-2 flex items-center">
          <img
            src="/assets/redesign/lekvya-screenshot.png"
            alt="The Lekvya web app, showing its client-communication automation homepage"
            width={1600}
            height={1000}
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="p-5 sm:p-9 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <img src="/assets/redesign/lekvya-logo.png" alt="Lekvya" className="h-6 w-auto" />
            <span className="px-2.5 py-1 rounded-full bg-sky/15 text-sky-text font-display text-[11.5px] sm:text-[10.5px] font-bold tracking-wide">LIVE</span>
          </div>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Lekvya</h2>
          <p className="text-[14px] leading-relaxed text-muted mb-5">
            An AI-powered workflow and client-communication platform for Chartered Accountants and financial-service
            firms — built around scheduling, client management, and document handling.
          </p>
          <Button href="https://ca.navedhana.com/" target="_blank" rel="noopener noreferrer" size="sm" className="w-fit">
            Explore Lekvya →
          </Button>
        </div>
      </motion.div>
    </section>

    <section className="py-6 pb-16 px-4 sm:px-8 max-w-[1120px] mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEV_PRODUCTS.map((p, i) => (
          <motion.div
            key={p.title}
            {...scaleIn}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden border border-ink/15 bg-card flex flex-col hover:shadow-md hover:border-ink/25 hover:-translate-y-0.5 transition-[transform,box-shadow,border-color] duration-300"
            style={{ borderTopColor: p.accent, borderTopWidth: '3px' }}
          >
            <PlaceholderShot icon={p.icon} image={p.image} label="Preview coming soon" className="w-full h-[170px]" />
            <div className="p-5 sm:p-6">
              <span
                className="inline-block mb-3 px-2.5 py-1 rounded-full border font-display text-[11.5px] sm:text-[10.5px] font-bold tracking-wide"
                style={{
                  background: `color-mix(in srgb, ${p.accent} 10%, transparent)`,
                  borderColor: `color-mix(in srgb, ${p.accent} 28%, transparent)`,
                  color: p.accent,
                }}
              >
                IN DEVELOPMENT
              </span>
              <h3 className="font-display text-[18px] font-semibold text-ink mb-2.5">{p.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{p.desc}</p>
              {p.to && (
                <Button to={p.to} variant="link" size="inline" className="inline-block mt-4">
                  Read more →
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="py-9 sm:py-14 px-4 sm:px-8 text-center bg-surface">
      <motion.div {...rise} className="max-w-xl mx-auto">
        <h2 className="font-display text-2xl sm:text-[28px] font-bold tracking-tight text-ink mb-2.5">Building something similar?</h2>
        <p className="text-sm text-muted mb-6">
          We also build custom software for other businesses.
        </p>
        <Button to="/contact" size="sm" onClick={() => trackEvent('cta_click', { location: 'products' })}>
          Discuss Your Project →
        </Button>
      </motion.div>
    </section>
  </div>
  );
};

export default Products;
