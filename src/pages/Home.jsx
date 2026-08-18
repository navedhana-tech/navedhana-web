import React from 'react';
import { motion } from 'framer-motion';
import { Database, CheckCircle2 } from 'lucide-react';
import HeroCircuitBackground from '../components/hero/HeroCircuitBackground';
import PolyMeshField from '../components/hero/PolyMeshField';
import { useIntroDone } from '../lib/introContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import ProductsTeaser from '../components/home/ProductsTeaser';
import SectionKicker from '../components/ui/SectionKicker';
import PlaceholderShot from '../components/ui/PlaceholderShot';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';

const CAPABILITY_STRIP = ['AI Engineering', 'Custom Software', 'Intelligent Automation', 'Product Engineering'];

const WWD_CARDS = [
  { title: 'AI Engineering', items: ['AI Applications', 'AI Agents', 'RAG Systems', 'Machine Learning', 'NLP', 'Computer Vision'] },
  { title: 'Custom Software', items: ['Web Applications', 'Desktop Applications', 'Mobile Applications', 'Backend Systems', 'APIs / SaaS'] },
  { title: 'Intelligent Automation', items: ['Workflow Automation', 'Browser Automation', 'Business Process Automation', 'Document Automation'] },
  { title: 'Product Engineering', items: ['MVP Development', 'Product Architecture', 'Prototyping', 'Production Engineering'] },
];

const SW_TAGS = ['Web', 'Mobile', 'Desktop', 'Backend', 'APIs', 'Databases', 'Cloud', 'Integrations', 'Automation'];

const DEV_PRODUCTS = [
  { title: 'Data Factory', desc: "A data engineering product we're building in-house. More details as it nears release.", icon: <Database size={18} /> },
  { title: 'QA Foundation Platform', desc: 'An intelligent QA and software-testing platform, focused on automated testing and engineering infrastructure.', icon: <CheckCircle2 size={18} /> },
];

const HOW_STEPS = [
  { title: 'Discover', desc: 'Understand the business problem, users, requirements and constraints.' },
  { title: 'Design', desc: 'Define product experience, architecture and technical approach.' },
  { title: 'Build', desc: 'Engineer the software / AI system iteratively.' },
  { title: 'Validate', desc: 'Test functionality, reliability, performance and integration.' },
  { title: 'Deploy', desc: 'Move the solution into production.' },
  { title: 'Evolve', desc: 'Improve and expand the product over time.' },
];

const PILLARS = [
  { title: 'Problem-first thinking', desc: 'We start with the business problem, not the technology.' },
  { title: 'Engineering-led', desc: 'We care about architecture, reliability and maintainability.' },
  { title: 'AI where it matters', desc: 'We use AI where it creates meaningful business value.' },
  { title: 'Product mindset', desc: 'We think beyond individual features and build complete products.' },
  { title: 'Build and learn', desc: 'We build our own products as well as software for businesses.' },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

// Hero content stagger — gated on the logo intro finishing (src/lib/
// introContext.js) instead of firing on mount, so eyebrow -> headline ->
// subhead -> CTAs reveal in sequence right after the intro settles into the
// navbar, per the intro spec's staged hero reveal.
const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
const heroItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const Home = () => {
  const introDone = useIntroDone();
  const reducedMotion = useReducedMotion();

  return (
  <div className="bg-primary">
    {/* Full-height hero — normal document flow, scrolls away like any other
        section. min-h-dvh (not h-screen/100vh) so it still fills the actual
        visible viewport on mobile Safari/Chrome, where plain 100vh includes
        the area the address bar covers. */}
    <section className="hero-dark relative overflow-hidden flex flex-col min-h-dvh bg-[var(--hero-bg)]">
      {/* Spans the whole section — from page top (so it shows through the
          transparent navbar) down past the fold — rather than being boxed
          inside the headline block, which read as a grey rectangle. */}
      <PolyMeshField />
      {/* flex-1 + min-h-0: the capability strip below is a normal flow
          sibling (not absolutely positioned over this), so it always
          reserves its own real height and this area only gets what's left.
          No height-based content hiding here on purpose: this section is
          normal document flow now, not the old fixed/pinned curtain-reveal
          hero, so on a short real-device viewport (address bar expanded,
          on-screen nav buttons, etc.) the content is simply allowed to be
          slightly taller than one screen — the page grows and the strip
          gets pushed down, never clipped or overlapped. A prior version
          hid the subhead and shrank things below max-height:640px to dodge
          overlap under the *old* fixed hero; kept post-revert, it instead
          started hiding real copy on ordinary phones with browser chrome
          on-screen, which is worse than a few extra px of scroll. */}
      <div className="relative z-10 flex-1 min-h-0 flex items-center pt-[84px] px-4 sm:px-8">
        <div className="relative w-full max-w-7xl mx-auto">
          {/* min-h only from md: up — that's also where the floating node
              cards (HeroCircuitBackground) start showing, so mobile/sm never
              reserves dead vertical space for decoration it isn't drawing. */}
          <div className="relative md:min-h-[340px] lg:min-h-[400px] flex items-center">
            <HeroCircuitBackground />
            <motion.div
              variants={heroContainer}
              initial={reducedMotion ? false : 'hidden'}
              animate={introDone ? 'show' : 'hidden'}
              className="relative z-10 w-full max-w-4xl mx-auto text-center"
            >
              <motion.div variants={heroItem}>
                <SectionKicker centered className="mb-4 hero-text-glow">Software · AI · Product Engineering</SectionKicker>
              </motion.div>
              <motion.h1
                variants={heroItem}
                className="font-display text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.05] font-semibold tracking-tight text-ink hero-text-glow"
              >
                We build the software.
                <br />
                <span className="text-electric">We build the intelligence.</span>
              </motion.h1>
              {/* Hidden below sm: the kicker + two-line headline already
                  carry the message on a phone screen; this line is a nice-
                  to-have on room to spare, not essential copy — a width
                  check, not the height-based hiding removed above, since
                  width doesn't jitter with browser chrome. */}
              <motion.p variants={heroItem} className="hidden sm:block text-base leading-relaxed text-muted mt-4 max-w-2xl mx-auto hero-text-glow">
                Products we've shipped. Systems we've built for others. Same engineering standard either way.
              </motion.p>
              <motion.div variants={heroItem} className="flex flex-wrap justify-center gap-3.5 mt-6">
                <Button
                  to="/contact"
                  size="sm"
                  hoverEffects={false}
                  onClick={() => trackEvent('cta_click', { location: 'home_hero' })}
                >
                  Discuss Your Project →
                </Button>
                <Button to="/products" variant="outline" size="sm" hoverEffects={false}>
                  See What We've Built
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Capability strip — the hero's closing line, sitting in normal flow
          at the bottom of the section. */}
      <div className="relative z-20 shrink-0 py-5 px-4 sm:px-8 border-t border-ink/15 bg-[var(--hero-bg)]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3.5 font-display text-[11.5px] font-bold tracking-[0.12em] uppercase text-muted">
          {CAPABILITY_STRIP.map((c, i) => (
            <React.Fragment key={c}>
              <span className="capability-item" style={{ animationDelay: `${i * 2}s` }}>{c}</span>
              {i < CAPABILITY_STRIP.length - 1 && <span className="text-ink/20">•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>

    <div>
      {/* Products & Platforms teaser — its own component (components/home/
          ProductsTeaser.jsx) and its own section, deliberately separate from
          the hero above so the opening view is the headline alone. */}
      <ProductsTeaser />

    {/* What We Do */}
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.div {...fadeUp} className="max-w-xl mx-auto mb-11 text-center">
        <SectionKicker centered className="mb-3.5">What We Do</SectionKicker>
        <h2 className="font-display text-[26px] sm:text-4xl font-bold tracking-tight text-ink">
          Four capabilities. One engineering standard.
        </h2>
        <p className="text-[15px] text-muted mt-3.5">
          <Button to="/services" variant="link" size="inline">The full breakdown</Button>, or the short version below.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15 border border-ink/15 rounded-2xl overflow-hidden">
        {WWD_CARDS.map((card, i) => (
          <motion.div key={card.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }} className="bg-primary p-6">
            <h3 className="font-display text-[16.5px] font-semibold text-ink mb-2.5">{card.title}</h3>
            <div className="flex flex-col gap-1.5 text-[12.5px] text-muted">
              {card.items.map((it) => <span key={it}>{it}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Custom Software */}
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <motion.div {...fadeUp} className="flex flex-wrap gap-2 order-2 lg:order-1">
          {SW_TAGS.map((tag) => (
            <span key={tag} className="px-3.5 py-2.5 rounded-lg bg-surface border border-ink/15 text-[12.5px] font-display text-ink/80">
              {tag}
            </span>
          ))}
        </motion.div>
        <motion.div {...fadeUp} className="order-1 lg:order-2">
          <SectionKicker className="mb-3.5">Custom Software</SectionKicker>
          <h2 className="font-display text-2xl sm:text-[32px] font-bold tracking-tight text-ink mb-4">From architecture to production</h2>
          <p className="text-[14.5px] leading-relaxed text-muted max-w-md">
            Web, mobile, desktop, and backend systems — engineered with the same care whether it's a client project or one of our own products.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Our Products */}
    <section className="py-20 px-4 sm:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="max-w-xl mx-auto mb-11 text-center">
          <SectionKicker centered className="mb-3.5">Our Products</SectionKicker>
          <h2 className="font-display text-[26px] sm:text-4xl font-bold tracking-tight text-ink">We build our own technology</h2>
        </motion.div>

        <motion.div {...fadeUp} className="grid sm:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-ink/15 bg-primary mb-6">
          <div className="p-2 flex items-center">
            <img src="/assets/redesign/lekvya-screenshot.png" alt="Lekvya product screenshot" className="w-full h-auto rounded-xl" />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/redesign/lekvya-logo.png" alt="Lekvya" className="h-5 w-auto" />
              <span className="px-2.5 py-1 rounded-full bg-amber/15 text-amber-text font-display text-[10.5px] font-bold tracking-wide">LIVE</span>
            </div>
            <h3 className="font-display text-xl font-semibold text-ink mb-2.5">Lekvya</h3>
            <p className="text-[13.5px] leading-relaxed text-muted mb-4">
              An AI-powered workflow and client-communication platform for Chartered Accountants and financial-service firms. Currently used by 2 active CA customers.
            </p>
            <a
              href="https://ca.navedhana.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-electric text-primary font-bold text-[13.5px] w-fit"
            >
              Explore Lekvya →
            </a>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {DEV_PRODUCTS.map((p, i) => (
            <motion.div key={p.title} {...fadeUp} transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }} className="rounded-2xl overflow-hidden border border-ink/15 bg-primary">
              <PlaceholderShot icon={p.icon} label="Preview coming soon" className="w-full h-[150px]" />
              <div className="p-6">
                <span className="inline-block mb-3 px-2.5 py-1 rounded-full bg-ink/[0.06] text-muted font-display text-[10.5px] font-bold tracking-wide">
                  IN DEVELOPMENT
                </span>
                <h3 className="font-display text-[17px] font-semibold text-ink mb-2">{p.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-7">
          <Button to="/products" variant="link" size="inline">See all products →</Button>
        </div>
      </div>
    </section>

    {/* How We Work */}
    <section className="py-20 px-4 sm:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="max-w-xl mx-auto mb-2 text-center">
          <SectionKicker centered className="mb-3.5">How We Work</SectionKicker>
          <h2 className="font-display text-[26px] sm:text-4xl font-bold tracking-tight text-ink">From problem to production</h2>
        </motion.div>
        <div className="max-w-3xl mx-auto mt-9 border-t border-ink/15">
          {HOW_STEPS.map((s, i) => (
            <motion.div key={s.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }} className="grid grid-cols-[56px_1fr] gap-5 py-5 border-b border-ink/15">
              <span className="font-display text-[13px] text-ink/30">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4 className="font-display text-base font-semibold text-ink mb-1">{s.title}</h4>
                <p className="text-[13.5px] leading-relaxed text-muted">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Navedhana — condensed teaser; full pillars + reasoning live on
        /about, not duplicated here (was a byte-identical copy of About's
        "What We Believe" section prior to this pass). */}
    <section className="py-20 px-4 sm:px-8 max-w-3xl mx-auto text-center">
      <motion.div {...fadeUp}>
        <SectionKicker centered className="mb-3.5">Why Navedhana</SectionKicker>
        <h2 className="font-display text-2xl sm:text-[32px] font-bold tracking-tight text-ink mb-5">
          A software and AI engineering company building real products
        </h2>
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-2 mb-6">
          {PILLARS.slice(0, 3).map((p) => (
            <span key={p.title} className="font-display text-[13px] font-semibold text-ink/80">{p.title}</span>
          ))}
        </div>
        <p className="text-[14.5px] leading-relaxed text-muted mb-5">
          We build our own technology, and we build software for businesses — with the same engineering standard either way.
        </p>
        <Button to="/about" variant="link" size="inline">More About Navedhana →</Button>
      </motion.div>
    </section>

    {/* Final CTA */}
    <section className="py-16 px-4 sm:px-8 text-center">
      <motion.div {...fadeUp} className="max-w-xl mx-auto">
        <h2 className="font-display text-2xl sm:text-[32px] font-bold tracking-tight text-ink mb-3">Have a problem worth solving?</h2>
        <p className="text-[14.5px] text-muted mb-6">Tell us what you're building. We'll help you figure out the technology behind it.</p>
        <Button to="/contact" onClick={() => trackEvent('cta_click', { location: 'home_final' })}>Let's Build It →</Button>
      </motion.div>
    </section>
    </div>
  </div>
  );
};

export default Home;
