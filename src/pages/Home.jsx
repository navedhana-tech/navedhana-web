import React from 'react';
import { motion } from 'framer-motion';
import { Database, CheckCircle2, Cpu, Layers, Workflow, Box } from 'lucide-react';
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

// accent is a per-card decorative color (glass-card spotlight + icon ring +
// list-item dot) — same "one-off arbitrary color for category coding"
// pattern ProductsTeaser's badgeClass already uses, not a new theme token.
// Reuses --color-electric/--color-amber where the category already has a
// brand color and the existing ProductsTeaser purple for the fourth, rather
// than inventing four new one-off hexes.
const WWD_CARDS = [
  { title: 'AI Engineering', icon: Cpu, accent: 'var(--color-electric)', items: ['Generative AI', 'AI Applications', 'AI Agents', 'RAG Systems', 'Machine Learning', 'Natural Language Processing'] },
  { title: 'Custom Software', icon: Layers, accent: '#3FE1C9', items: ['Web Applications', 'Desktop Applications', 'Mobile Applications', 'Backend Systems', 'SaaS [Software as a Service]', 'CRM [Customer Relationship Management]'] },
  { title: 'Intelligent Automation', icon: Workflow, accent: 'var(--color-amber)', items: ['Workflow Automation', 'Browser Automation', 'Business Process Automation', 'Document Automation'] },
  { title: 'Product Engineering', icon: Box, accent: '#6D5CE7', items: ['MVP Development', 'Product Architecture', 'Prototyping', 'Production Engineering'] },
];

const SW_TAGS = ['Web', 'Mobile', 'Desktop', 'Backend', 'APIs', 'Databases', 'Cloud', 'Integrations', 'Automation'];

const DEV_PRODUCTS = [
  { title: 'Data Factory', desc: "A data engineering product we're building in-house. More details as it nears release.", icon: <Database size={18} /> },
  { title: 'QA Foundation Platform', desc: 'An intelligent QA and software-testing platform, focused on automated testing and engineering infrastructure.', icon: <CheckCircle2 size={18} /> },
];

const HOW_STEPS = [
  { title: 'Understand', desc: 'Understand the problem, users, and business goals.' },
  { title: 'Architect', desc: 'Design scalable systems and the right technology stack.' },
  { title: 'Build', desc: 'Turn the architecture into clean, maintainable software.' },
  { title: 'Intelligence', desc: 'Integrate AI, automation, data, and intelligent workflows.' },
  { title: 'Validate', desc: 'Test, refine, and verify the system before release.' },
  { title: 'Deploy', desc: 'Ship reliable software and evolve it in production.' },
];

const PILLARS = [
  { title: 'Problem-first thinking', desc: 'We start with the business problem, not the technology.' },
  { title: 'Engineering-led', desc: 'We care about architecture, reliability and maintainability.' },
  { title: 'AI where it matters', desc: 'We use AI where it creates meaningful business value.' },
  { title: 'Product mindset', desc: 'We think beyond individual features and build complete products.' },
  { title: 'Build and learn', desc: 'We build our own products as well as software for businesses.' },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

// WWD_CARDS items can carry a parenthetical spell-out ("SaaS [Software as a
// Service]") — splits that into the short label plus a dim inline note
// instead of every item needing to be pre-split into a {label, note} shape.
const ITEM_NOTE_RE = /^(.+?)\s*\[(.+)\]$/;

// HOW_STEPS timeline — one shared stagger container holds BOTH the step
// nodes and the connector segments between them as alternating direct
// children (node, line, node, line, ...), so staggerChildren fires them in
// that literal sequence: node 1 pops in, then the line to node 2 grows,
// then node 2 pops in, and so on — a genuine step-by-step chain rather than
// all six nodes fading in together.
const stepTrackVariants = { hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } } };
const stepNodeVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};
const stepLineVariants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.35, ease: 'easeInOut' } },
};
// Same growth, vertical axis — the mobile step list runs top-to-bottom, so
// its connectors grow in height instead of width.
const stepLineVerticalVariants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.35, ease: 'easeInOut' } },
};

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
    <section className="dark-scope relative overflow-hidden flex flex-col min-h-dvh bg-[var(--hero-bg)]">
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

    {/* What We Do — dark-scope reused from the hero (see index.css): the
        section bg + kicker/heading/link re-theme for the dark background
        automatically via the same CSS-variable cascade. The cards are now
        frosted glass panels (`.wwd-card`, index.css) that sit right on that
        dark background — no light-scope reset needed, since text-ink/
        text-muted already read as light text via dark-scope. */}
    <section className="dark-scope bg-[var(--hero-bg)] py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="max-w-xl mx-auto mb-11 text-center">
          <SectionKicker centered className="mb-3.5">What We Do</SectionKicker>
          <h2 className="font-display text-[26px] sm:text-4xl font-bold tracking-tight text-ink">
            Four capabilities. One engineering standard.
          </h2>
          <p className="text-[15px] text-muted mt-3.5">
            <Button to="/services" variant="link" size="inline">The full breakdown</Button>, or the short version below.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WWD_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="wwd-card rounded-2xl p-6 bg-gradient-to-br from-white/[0.09] to-white/[0.03] border border-white/[0.14] backdrop-blur-xl shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)]"
              style={{ '--accent': card.accent }}
              onMouseMove={reducedMotion ? undefined : (e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                e.currentTarget.style.setProperty('--mx', `${x}px`);
                e.currentTarget.style.setProperty('--my', `${y}px`);
                const rx = ((y / r.height) - 0.5) * -8;
                const ry = ((x / r.width) - 0.5) * 8;
                e.currentTarget.style.transform = `translateY(-4px) rotateX(${rx}deg) rotateY(${ry}deg)`;
              }}
              onMouseLeave={reducedMotion ? undefined : (e) => { e.currentTarget.style.transform = ''; }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border"
                style={{
                  background: `linear-gradient(160deg, color-mix(in srgb, ${card.accent} 30%, transparent), transparent)`,
                  borderColor: `color-mix(in srgb, ${card.accent} 45%, transparent)`,
                  color: card.accent,
                }}
              >
                <card.icon size={20} />
              </div>
              <h3 className="font-display text-[16.5px] font-semibold text-ink mb-3">{card.title}</h3>
              <ul className="flex flex-col text-[12.5px] text-muted">
                {card.items.map((it) => {
                  const note = it.match(ITEM_NOTE_RE);
                  return (
                    <li key={it} className="flex items-center gap-2 py-1.5 border-t border-white/[0.07] first:border-t-0 first:pt-0 hover:text-ink transition-colors">
                      {note ? (
                        <span>
                          {note[1]} <span className="opacity-60 text-[11px]">({note[2]})</span>
                        </span>
                      ) : it}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How We Work — plain centered kicker/h2/paragraph, same as every other
        section, then a step-by-step chain below: two renderings of the same
        HOW_STEPS again (see WWD_CARDS/ProductsTeaser precedent) — a
        horizontal node-and-growing-line track at lg:+, a vertical one below
        it, since a 6-wide horizontal chain has no room to breathe under
        ~1024px. Both share one stagger container (stepTrackVariants) whose
        direct children alternate node/line/node/line/…, so staggerChildren
        fires them in that literal order — each node pops in, THEN the line
        to the next one grows, THEN the next node — a real step-by-step
        reveal instead of all six nodes fading in at once. */}
    <section className="py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto mb-16 text-center">
          <SectionKicker centered className="mb-5">Our Engineering Approach</SectionKicker>
          <h2 className="font-display text-[32px] sm:text-[44px] font-extrabold tracking-tight leading-[1.1] text-ink mb-5">
            Think deeply.
            <br />
            <span className="text-electric">Build intelligently.</span>
          </h2>
          <p className="text-[15px] sm:text-base leading-relaxed text-muted max-w-xl mx-auto">
            We don't start with technology. We start with understanding. Every solution is shaped by the problem,
            engineered for reliability, and built to evolve.
          </p>
        </motion.div>

        {/* lg:+ horizontal chain */}
        <motion.div
          variants={stepTrackVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="hidden lg:flex items-start"
        >
          {HOW_STEPS.map((step, i) => (
            <React.Fragment key={step.title}>
              <motion.div variants={stepNodeVariants} className="flex flex-col items-center text-center w-[152px] flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary border-2 border-electric/40 flex items-center justify-center font-display text-[13px] font-bold text-electric mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h4 className="font-display text-[12px] font-bold uppercase tracking-wide text-ink mb-2">{step.title}</h4>
                <p className="text-[12.5px] leading-relaxed text-muted">{step.desc}</p>
              </motion.div>
              {i < HOW_STEPS.length - 1 && (
                <motion.div variants={stepLineVariants} style={{ transformOrigin: 'left' }} className="flex-1 h-px bg-ink/15 mt-6" />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Below lg: vertical chain */}
        <motion.div
          variants={stepTrackVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:hidden flex flex-col max-w-md mx-auto"
        >
          {HOW_STEPS.map((step, i) => (
            <React.Fragment key={step.title}>
              <motion.div variants={stepNodeVariants} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-primary border-2 border-electric/40 flex items-center justify-center font-display text-[12.5px] font-bold text-electric flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="pt-1.5 pb-1">
                  <h4 className="font-display text-[14px] font-bold uppercase tracking-wide text-ink mb-1">{step.title}</h4>
                  <p className="text-[13px] leading-relaxed text-muted">{step.desc}</p>
                </div>
              </motion.div>
              {i < HOW_STEPS.length - 1 && (
                <motion.div variants={stepLineVerticalVariants} style={{ transformOrigin: 'top' }} className="w-px h-7 bg-ink/15 ml-[22px]" />
              )}
            </React.Fragment>
          ))}
        </motion.div>
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
