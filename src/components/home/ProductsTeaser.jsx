import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, CheckCircle2, ShieldCheck } from 'lucide-react';
import SectionKicker from '../ui/SectionKicker';

// Hero proof — leads with capability (the headline, in Home.jsx), then
// substantiates it with the actual products, rather than opening on a
// comparison to other agencies. Client work (Robocoders) still gets its own
// section lower on the page; the hero's one-line callout points there
// instead of duplicating it.
// badgeClass is a single-use arbitrary color per product (not a theme token —
// this is the only place three-way category color-coding is needed).
const HERO_PRODUCTS = [
  {
    name: 'Lekvya', status: 'Live product', desc: 'AI platform used by practising CAs',
    to: '/products', badgeClass: 'bg-electric', icon: <span className="font-display font-bold text-base">L</span>,
  },
  {
    name: 'Data Factory', status: 'In development', desc: 'Data engineering platform',
    to: '/products', badgeClass: 'bg-[#6D5CE7]', icon: <Database size={18} />,
  },
  {
    name: 'QA Foundation', status: 'In development', desc: 'AI-powered QA infrastructure',
    to: '/products', badgeClass: 'bg-amber', icon: <CheckCircle2 size={18} />,
  },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

// Its own component (not inline in Home.jsx) and its own section, deliberately
// separate from the hero — the hero's job is the headline alone; this is
// proof, and belongs below the fold, not competing with the headline for the
// opening view.
const ProductsTeaser = () => (
  <section className="pt-4 pb-10 px-4 sm:px-8">
    <div className="w-full max-w-7xl mx-auto">
      <motion.div {...fadeUp}>
        <SectionKicker centered className="mb-4">Products &amp; Platforms We're Building</SectionKicker>
        <div className="grid sm:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {HERO_PRODUCTS.map((p) => (
            <Link
              key={p.name}
              to={p.to}
              className="group rounded-xl border border-ink/15 bg-card shadow-sm px-4 py-3.5 flex items-center justify-between gap-3 text-left hover:border-electric/30 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color] duration-300"
            >
              <div className="min-w-0">
                <span className="font-display text-[9.5px] font-bold tracking-[0.12em] uppercase text-electric">
                  {p.status}
                </span>
                <h3 className="font-display text-[14px] font-bold text-ink mt-1 group-hover:text-electric transition-colors">
                  {p.name}
                </h3>
                <p className="text-[11.5px] leading-snug text-muted mt-1">{p.desc}</p>
              </div>
              <div
                className={`w-11 h-11 rounded-xl ${p.badgeClass} text-primary flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
              >
                {p.icon}
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      <p className="flex items-center justify-center gap-1.5 text-center text-[12px] text-muted/70 mt-4">
        <ShieldCheck size={14} className="text-electric" />
        Also trusted for custom product development and automation.
      </p>
    </div>
  </section>
);

export default ProductsTeaser;
