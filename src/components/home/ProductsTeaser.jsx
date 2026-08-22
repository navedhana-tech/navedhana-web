import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, CheckCircle2, ShieldCheck } from 'lucide-react';
import SectionKicker from '../ui/SectionKicker';
import Button from '../ui/Button';

// Hero proof — leads with capability (the headline, in Home.jsx), then
// substantiates it with the actual products, rather than opening on a
// comparison to other agencies. Client work (Robocoders) still gets its own
// section lower on the page; the hero's one-line callout points there
// instead of duplicating it.
// badgeClass is a single-use arbitrary color per product (not a theme token —
// this is the only place three-way category color-coding is needed). Only
// Lekvya's card leaves the site — it's the one product with somewhere real
// to send someone; the other two route to /products, where their actual
// detail lives, not a case-study or roadmap page that doesn't exist yet.
const HERO_PRODUCTS = [
  {
    name: 'Lekvya', live: true, desc: 'AI Automation Platform for Businesses',
    badgeClass: 'bg-electric', icon: <span className="font-display font-bold text-base">L</span>,
    href: 'https://ca.navedhana.com/', external: true,
  },
  {
    name: 'Data Factory', live: false, desc: 'Data engineering platform',
    badgeClass: 'bg-[#6D5CE7]', icon: <Database size={18} />,
    to: '/products',
  },
  {
    name: 'QA Foundation', live: false, desc: 'AI-powered QA infrastructure',
    badgeClass: 'bg-sky', icon: <CheckCircle2 size={18} />,
    to: '/products',
  },
];

// Cascade offsets for the lg:+ isometric layout — a staircase down-right,
// top card frontmost, each step big enough that a visible strip of air
// separates the cards (the original 56-64px step left them nearly edge-to-
// edge — overlapping so tightly they read as a compressed stack of book
// pages rather than three distinct floating cards). Kept out of HERO_PRODUCTS
// since it's a desktop-only presentational detail, not product data.
const CASCADE_POSITION = [
  'top-0 left-0 z-30',
  'top-24 left-20 xl:top-28 xl:left-24 z-20',
  'top-48 left-40 xl:top-56 xl:left-48 z-10',
];

// Shared stagger container for both columns — each direct motion child
// (variants={fadeItem}, or the heading's revealItem) fires in sequence as
// its column scrolls into view, rather than the whole column fading in as
// one flat block.
const columnVariants = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } } };
const fadeItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};
// Headline gets its own treatment — a clip-reveal (translateY inside an
// overflow-hidden wrapper) rather than a fade, so the one line that's meant
// to carry the section reads as a distinct "unveil" instead of just another
// item in the same fade stagger as the kicker/paragraph/link around it.
const revealItem = {
  hidden: { y: '100%' },
  show: { y: '0%', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const ProductCardLink = ({ p, className, style, children }) => {
  const CardTag = p.external ? 'a' : Link;
  const cardProps = p.external ? { href: p.href, target: '_blank', rel: 'noopener noreferrer' } : { to: p.to };
  return (
    <CardTag {...cardProps} className={className} style={style}>
      {children}
    </CardTag>
  );
};

// Its own component (not inline in Home.jsx) and its own section, deliberately
// separate from the hero — the hero's job is the headline alone; this is
// proof, and belongs below the fold, not competing with the headline for the
// opening view.
//
// Editorial split: a big left-column heading (SectionKicker's rare size="lg"
// variant) anchors the claim with a clear way out to the full lineup, while
// the products themselves substantiate it on the right. Generous pt-20/24 up
// top on purpose: this used to sit right under the hero's capability strip
// with almost no gap (pt-4), reading as glued to the section above instead
// of its own distinct block.
//
// Right column is two separate renderings of the same HERO_PRODUCTS, one
// per breakpoint rather than one layout stretched to fit both: below lg, a
// plain stacked list (readable, no risk of overlap on a narrow screen); at
// lg:+, a tilted 3D isometric cascade (perspective + rotateX/Y/Z, idle float,
// hover-to-flatten) — a desktop-only flourish that would just clip/overlap
// awkwardly if forced onto a phone-width column. The `.iso-card` transform
// and float keyframe live in index.css, not inline/framer, so framer's own
// `transform` writes on the *outer* fade-in wrapper never fight with it —
// only that outer div is a motion.div; each card underneath is plain CSS.
const ProductsTeaser = () => (
  <section className="pt-20 sm:pt-24 pb-10 px-4 sm:px-8">
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-10 lg:gap-16 items-center">
        <motion.div variants={columnVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="text-center sm:text-left">
          {/* Two renderings, same reason as the product list below: centered
              (both flanking rules) reads right on mobile, but the sm:+
              left-aligned kicker only ever had the one leading rule. */}
          <motion.div variants={fadeItem}>
            <SectionKicker centered size="lg" className="mb-5 sm:hidden">Our Work</SectionKicker>
            <SectionKicker size="lg" className="mb-5 hidden sm:flex">Our Work</SectionKicker>
          </motion.div>
          <div className="overflow-hidden mb-6">
            <motion.h2
              variants={revealItem}
              className="font-display text-[28px] sm:text-[52px] lg:text-[58px] font-bold tracking-tight leading-[1.1] text-ink"
            >
              Products &amp; Platforms We're Building
            </motion.h2>
          </div>
          <motion.p variants={fadeItem} className="flex items-start justify-center sm:justify-start gap-2 text-base leading-relaxed text-muted max-w-md mx-auto sm:mx-0 mb-3 sm:mb-7 text-center sm:text-left">
            <ShieldCheck size={20} className="hidden sm:block text-electric flex-shrink-0 mt-0.5" />
            <span className="min-w-0">Also trusted for custom product development and automation.</span>
          </motion.p>
          <motion.div variants={fadeItem} className="hidden sm:block">
            <Button to="/products" variant="link">View all products →</Button>
          </motion.div>
        </motion.div>

        {/* Mobile only: swipeable glass-card carousel — native scroll-snap
            gives left/right swipe with no JS carousel needed, one product
            centered at a time with the next peeking at the edge. sm:/lg:
            keep their own layouts below. */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="sm:hidden min-w-0 -mx-4 px-4 py-2"
        >
          <div className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory pb-1 hide-scrollbar">
            {HERO_PRODUCTS.map((p) => (
              <motion.div key={p.name} variants={fadeItem} className="shrink-0 w-[80%] snap-center">
                {/* Fixed badge/border color (not p.badgeClass) and h-full so
                    every card reads as one consistent blue set instead of
                    the tablet/desktop per-product color-coding, and matches
                    height regardless of description length. */}
                <ProductCardLink
                  p={p}
                  className="flex flex-col h-full rounded-2xl border border-electric/25 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(9,88,214,0.18)] p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-electric text-primary flex items-center justify-center flex-shrink-0">
                      {p.icon}
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full font-display text-[10.5px] font-bold tracking-wide ${
                        p.live ? 'bg-electric/10 text-electric' : 'bg-ink/[0.06] text-muted'
                      }`}
                    >
                      {p.live ? 'Live' : 'Dev'}
                    </span>
                  </div>
                  <h3 className="font-display text-[17px] font-bold text-ink mb-1">{p.name}</h3>
                  <p className="text-[13.5px] leading-relaxed text-muted">{p.desc}</p>
                </ProductCardLink>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeItem} className="flex justify-end mt-4">
            <Button to="/products" variant="link">View all products →</Button>
          </motion.div>
        </motion.div>

        {/* sm: up to lg: plain stacked list */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="hidden sm:flex lg:hidden flex-col gap-6"
        >
          {HERO_PRODUCTS.map((p) => (
            <motion.div key={p.name} variants={fadeItem}>
              <ProductCardLink
                p={p}
                className="group rounded-2xl border border-ink/15 bg-card shadow-sm p-5 flex items-center justify-between gap-4 hover:border-electric/30 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color] duration-300"
              >
                <div className="min-w-0">
                  <span className="font-display text-[10.5px] font-bold tracking-[0.14em] uppercase text-electric">
                    {p.live ? 'Live Product' : 'In Development'}
                  </span>
                  <h3 className="font-display text-[17px] font-bold text-ink mt-1 group-hover:text-electric transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-muted mt-1">{p.desc}</p>
                </div>
                <div
                  className={`w-11 h-11 rounded-xl ${p.badgeClass} text-primary flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
                >
                  {p.icon}
                </div>
              </ProductCardLink>
            </motion.div>
          ))}
        </motion.div>

        {/* lg:+ only: isometric cascade. The fixed-size cascade box is
            centered (flex items-center justify-center) inside a wrapper
            that stretches to the grid column's full width/height, rather
            than anchored to the column's top-left corner — the cascade's
            own bounding box grows a touch at xl: too, so it doesn't sit
            with the same absolute footprint on a 1920px screen as on a
            1024px one. */}
        <motion.div
          variants={fadeItem}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="hidden lg:flex items-center justify-center min-h-[380px]"
        >
          <div className="relative w-[460px] h-[360px] xl:w-[520px] xl:h-[400px]" style={{ perspective: '1200px' }}>
            {HERO_PRODUCTS.map((p, i) => (
              <ProductCardLink
                key={p.name}
                p={p}
                className={`iso-card absolute ${CASCADE_POSITION[i]} w-72 rounded-2xl border border-ink/10 bg-card/90 backdrop-blur-md shadow-[0_20px_45px_-20px_rgba(9,88,214,0.28)] p-5`}
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-full ${p.badgeClass} text-primary flex items-center justify-center flex-shrink-0`}>
                    {p.icon}
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full font-display text-[11px] sm:text-[10px] font-bold tracking-wide ${
                      p.live ? 'bg-electric/10 text-electric' : 'bg-ink/[0.06] text-muted'
                    }`}
                  >
                    {p.live ? 'Live' : 'Dev'}
                  </span>
                </div>
                <h3 className="font-display text-[16px] font-bold text-ink mb-1">{p.name}</h3>
                <p className="text-[13.5px] sm:text-[12.5px] leading-relaxed text-muted">{p.desc}</p>
              </ProductCardLink>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProductsTeaser;
