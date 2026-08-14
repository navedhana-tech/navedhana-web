import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, CheckCircle2, Monitor } from 'lucide-react';
import HeroCircuitBackground from '../components/hero/HeroCircuitBackground';
import PolyMeshField from '../components/hero/PolyMeshField';
import ProductsTeaser from '../components/home/ProductsTeaser';
import RequestFlow from '../components/ui/RequestFlow';
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

const AI_TAGS = ['AI Agents', 'RAG Systems', 'Custom AI Applications', 'Machine Learning', 'NLP', 'Computer Vision', 'Intelligent Automation'];
const AI_FLOW = ['User', 'AI System', 'Reasoning', 'Tools / APIs / Data', 'Business Systems', 'Result'];
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

const Home = () => (
  <div className="bg-primary">
    {/* Curtain-reveal hero: pinned to the viewport (fixed, 100vh, z-1) while
        the ContentOverlay below scrolls up over it (z-2, offset by its own
        height of exactly 100vh via mt-[100vh]) — the overlay's solid bg-
        primary background is what visually "covers" the hero as the curtain
        pulls back, rather than the hero scrolling away itself. Full-bleed
        (top-0 left-0 right-0) rather than `inset-0`, since `inset-0` would
        also force bottom:0 — redundant with h-screen and easy to misread as
        depending on both; explicit top/left/right + h-screen says exactly
        what's pinned. */}
    <section className="fixed top-0 left-0 right-0 h-screen overflow-hidden flex items-center pt-[84px] pb-16 px-4 sm:px-8 z-[1]">
      {/* Spans the whole section — from page top (so it shows through the
          transparent navbar) down past the fold — rather than being boxed
          inside the headline block, which read as a grey rectangle. */}
      <PolyMeshField />
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="relative min-h-[340px] sm:min-h-[400px] flex items-center">
          <HeroCircuitBackground />
          <motion.div {...fadeUp} className="relative z-10 w-full max-w-4xl mx-auto text-center">
            <SectionKicker centered className="mb-4">Software · AI · Product Engineering</SectionKicker>
            <h1 className="font-display text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.05] font-semibold tracking-tight text-ink">
              We build the software.
              <br />
              <span className="text-electric">We build the intelligence.</span>
            </h1>
            <p className="text-[15px] sm:text-base leading-relaxed text-muted mt-4 max-w-2xl mx-auto">
              Products we've shipped. Systems we've built for others. Same engineering standard either way.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5 mt-6">
              <Button to="/contact" onClick={() => trackEvent('cta_click', { location: 'home_hero' })}>
                Discuss Your Project →
              </Button>
              <Button to="/work" variant="outline">
                See What We've Built
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Content overlay — everything after the hero, in one wrapper so it
        scrolls as a single solid "curtain" over the fixed hero above. The
        hero is `fixed` (out of document flow, contributes no height), so
        this `mt-[100vh]` is what actually creates the one-viewport-tall gap
        the hero occupies visually before this overlay's top reaches it.
        z-[2] (above the hero's z-[1]) + solid bg-primary is what makes the
        hero visibly disappear under this as you scroll, rather than both
        layers just co-existing. The negative-offset box-shadow only casts
        upward from this container's top edge — exactly the "leading edge
        sliding over the layer below" cue, not a shadow around all sides. */}
    <div className="relative z-[2] bg-primary mt-[100vh] shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.18)]">
      {/* Products & Platforms teaser — its own component (components/home/
          ProductsTeaser.jsx) and its own section, deliberately separate from
          the hero above so the opening view is the headline alone. */}
      <ProductsTeaser />

    {/* Capability strip */}
    <section className="py-5 px-4 sm:px-8 border-y border-ink/15">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3.5 font-display text-[11.5px] font-bold tracking-[0.12em] uppercase text-muted">
        {CAPABILITY_STRIP.map((c, i) => (
          <React.Fragment key={c}>
            <span>{c}</span>
            {i < CAPABILITY_STRIP.length - 1 && <span className="text-ink/20">•</span>}
          </React.Fragment>
        ))}
      </div>
    </section>

    {/* What We Do */}
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.div {...fadeUp} className="max-w-xl mx-auto mb-11 text-center">
        <SectionKicker centered className="mb-3.5">What We Do</SectionKicker>
        <h2 className="font-display text-[26px] sm:text-4xl font-bold tracking-tight text-ink">
          Four capabilities. One engineering standard.
        </h2>
        <p className="text-[15px] text-muted mt-3.5">
          <Link to="/services" className="text-electric hover:underline">The full breakdown</Link>, or the short version below.
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

    {/* AI Engineering */}
    <section className="py-20 px-4 sm:px-8 bg-surface">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
        <motion.div {...fadeUp}>
          <SectionKicker className="mb-3.5">AI Engineering</SectionKicker>
          <h2 className="font-display text-2xl sm:text-[32px] font-bold tracking-tight text-ink mb-4">AI that works beyond the demo</h2>
          <p className="text-[14.5px] leading-relaxed text-muted max-w-md">
            We build practical AI systems that connect models with your data, software, workflows, and business operations — not just a chatbot in a corner.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {AI_TAGS.map((tag) => (
              <span key={tag} className="px-3.5 py-2 rounded-lg bg-ink/[0.045] border border-ink/15 text-[12.5px] font-display text-ink/80">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
          <RequestFlow steps={AI_FLOW} label="Request flow" />
        </motion.div>
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
          <Link to="/products" className="text-[13.5px] font-semibold text-electric hover:underline">See all products →</Link>
        </div>
      </div>
    </section>

    {/* Client Work */}
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.div {...fadeUp} className="max-w-xl mx-auto mb-10 text-center">
        <SectionKicker centered className="mb-3.5">Client Work</SectionKicker>
        <h2 className="font-display text-[26px] sm:text-4xl font-bold tracking-tight text-ink">Built for businesses</h2>
      </motion.div>
      <motion.div {...fadeUp} className="grid sm:grid-cols-[180px_1fr_auto] gap-6 items-center p-7 rounded-2xl border border-ink/15 bg-surface">
        <PlaceholderShot icon={<Monitor size={18} />} label="Preview coming soon" className="w-full h-[120px]" />
        <div>
          <span className="inline-block mb-2.5 px-2.5 py-1 rounded-full bg-ink/[0.06] text-muted font-display text-[10.5px] font-bold tracking-wide">
            CLIENT PROJECT
          </span>
          <h3 className="font-display text-lg font-semibold text-ink mb-2">Yugminds — Robocoders Desktop App</h3>
          <p className="text-[13.5px] leading-relaxed text-muted">
            A custom desktop application built for Yugminds, in a category similar to OpenBlocks — engineered end to end as a client project.
          </p>
        </div>
        <Link to="/work" className="whitespace-nowrap text-[13.5px] font-semibold text-electric hover:underline">See more →</Link>
      </motion.div>
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
        <Link to="/about" className="text-[14px] font-semibold text-electric hover:underline">More About Navedhana →</Link>
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

export default Home;
