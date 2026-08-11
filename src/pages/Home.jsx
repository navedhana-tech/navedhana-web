import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, CheckCircle2, ShieldCheck } from 'lucide-react';
import HeroCircuitBackground from '../components/hero/HeroCircuitBackground';
import PolyMeshField from '../components/hero/PolyMeshField';
import RequestFlow from '../components/ui/RequestFlow';
import SectionKicker from '../components/ui/SectionKicker';
import PlaceholderShot from '../components/ui/PlaceholderShot';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';

const CAPABILITY_STRIP = ['AI Engineering', 'Custom Software', 'Intelligent Automation', 'Product Engineering'];

// Hero proof — leads with capability (the headline), then substantiates it
// with the actual products, rather than opening on a comparison to other
// agencies. Client work (Robocoders) still gets its own section lower on
// the page; the hero's one-line callout points there instead of duplicating it.
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
    to: '/products', badgeClass: 'bg-green', icon: <CheckCircle2 size={18} />,
  },
];

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
  { title: 'Data Factory', desc: "A data engineering product we're building in-house. More details as it nears release." },
  { title: 'QA Foundation Platform', desc: 'An intelligent QA and software-testing platform, focused on automated testing and engineering infrastructure.' },
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

const TECH_GROUPS = [
  { label: 'AI / ML', items: 'Python, PyTorch, TensorFlow, LLMs, RAG, NLP, Computer Vision' },
  { label: 'Frontend', items: 'React, Next.js, Flutter, HTML/CSS' },
  { label: 'Backend', items: 'Python, FastAPI, Node.js, REST APIs' },
  { label: 'Data', items: 'PostgreSQL, MongoDB, Firebase, Vector Databases' },
  { label: 'Automation', items: 'Playwright, Selenium, Browser Automation' },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const Home = () => (
  <div className="bg-primary">
    {/* Hero */}
    <section className="relative overflow-hidden pt-[108px] pb-8 px-4 sm:px-8">
      {/* Spans the whole section — from page top (so it shows through the
          transparent navbar) down past the product cards — rather than being
          boxed inside the headline block, which read as a grey rectangle. */}
      <PolyMeshField />
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Bounded box so the decorative icon nodes frame just the headline —
            not the whole hero, which now runs much taller once the product
            cards and trust line are included. Kept snug so the products row
            below stays on-screen alongside the headline, not below the fold. */}
        <div className="relative min-h-[340px] sm:min-h-[400px] flex items-center">
          <HeroCircuitBackground />
          <motion.div {...fadeUp} className="relative z-10 w-full max-w-4xl mx-auto text-center">
            <SectionKicker centered className="mb-4">Software · AI · Product Engineering</SectionKicker>
            <h1 className="font-display text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.05] font-semibold tracking-tight text-ink">
              We turn complex ideas into
              <br />
              <span className="text-electric">working products.</span>
            </h1>
            <p className="text-[15px] sm:text-base leading-relaxed text-muted mt-4 max-w-2xl mx-auto">
              We design and engineer software, AI systems, and business platforms — from our own products to custom
              solutions built for companies.
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6"
        >
          <SectionKicker centered className="mb-4">Products &amp; Platforms We're Building</SectionKicker>
          <div className="grid sm:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {HERO_PRODUCTS.map((p) => (
              <Link
                key={p.name}
                to={p.to}
                className="group rounded-xl border border-ink/15 bg-card shadow-sm px-4 py-3.5 flex items-center justify-between gap-3 text-left hover:border-electric/30 transition-colors"
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
                <div className={`w-11 h-11 rounded-xl ${p.badgeClass} text-primary flex items-center justify-center flex-shrink-0`}>
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
          Technology built around real business problems
        </h2>
        <p className="text-[15px] text-muted mt-3.5">From intelligent AI systems to complete digital products, we engineer technology end to end.</p>
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
              <span className="px-2.5 py-1 rounded-full bg-green/10 text-green font-display text-[10.5px] font-bold tracking-wide">LIVE</span>
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
              <PlaceholderShot label={`Add ${p.title} screenshot`} className="w-full h-[150px]" />
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
        <PlaceholderShot label="Add Robocoders Desktop App screenshot" className="w-full h-[120px]" />
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

    {/* Why Navedhana */}
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.div {...fadeUp} className="max-w-xl mx-auto mb-11 text-center">
        <SectionKicker centered className="mb-3.5">Why Navedhana</SectionKicker>
        <h2 className="font-display text-[26px] sm:text-4xl font-bold tracking-tight text-ink">What we actually believe</h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15 rounded-2xl overflow-hidden">
        {PILLARS.map((p, i) => (
          <motion.div key={p.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }} className="bg-primary p-6">
            <h4 className="font-display text-[15.5px] font-semibold text-ink mb-2">{p.title}</h4>
            <p className="text-[13px] leading-snug text-muted">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Technology */}
    <section className="py-20 px-4 sm:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="max-w-xl mx-auto mb-11 text-center">
          <SectionKicker centered className="mb-3.5">Technology</SectionKicker>
          <h2 className="font-display text-[26px] sm:text-4xl font-bold tracking-tight text-ink">Technology we build with</h2>
        </motion.div>
        <div className="max-w-3xl mx-auto flex flex-col">
          {TECH_GROUPS.map((g) => (
            <div key={g.label} className="grid sm:grid-cols-[150px_1fr] gap-5 py-4 border-t border-ink/15">
              <span className="font-display text-[11.5px] font-bold tracking-wide uppercase text-royal">{g.label}</span>
              <span className="text-[13.5px] text-ink/70">{g.items}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* About teaser */}
    <section className="py-20 px-4 sm:px-8 max-w-3xl mx-auto text-center">
      <motion.div {...fadeUp}>
        <h2 className="font-display text-2xl sm:text-[32px] font-bold tracking-tight text-ink mb-4">
          A software and AI engineering company building real products
        </h2>
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
);

export default Home;
