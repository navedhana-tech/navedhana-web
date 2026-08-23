import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Database, CheckCircle2, Cpu, Layers, Workflow, Box } from 'lucide-react';
import HeroCircuitBackground from '../components/hero/HeroCircuitBackground';
import PolyMeshField from '../components/hero/PolyMeshField';
import { useIntroDone } from '../lib/introContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { canHover } from '../lib/canHover';
import { rise, scaleIn, tiltIn, blurIn, staggerParent, riseChild, growX } from '../lib/motion';
import ProductsTeaser from '../components/home/ProductsTeaser';
import SectionKicker from '../components/ui/SectionKicker';
import PlaceholderShot from '../components/ui/PlaceholderShot';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';

const CAPABILITY_STRIP = ['AI Engineering', 'Custom Software', 'Intelligent Automation', 'Product Engineering'];

// `image` is a topical photograph per capability (circuit board, code, server
// room, 3D printer), rendered as a darkened background inside each card. Kept
// well under the text via low opacity plus a scrim, since these cards carry a
// heading and a six-item list that has to stay readable.
//
// There is no per-card accent colour: all four take the theme blue from
// `--accent` on .wwd-card (index.css). The photographs already distinguish
// the cards, so four separate hues only fought the palette.
const WWD_CARDS = [
  { title: 'AI Engineering', icon: Cpu, image: '/assets/photos/service-ai.jpg', items: ['Generative AI', 'AI Applications', 'AI Agents', 'RAG Systems', 'Machine Learning', 'Natural Language Processing'] },
  { title: 'Custom Software', icon: Layers, image: '/assets/photos/service-software.jpg', items: ['Web Applications', 'Desktop Applications', 'Mobile Applications', 'Backend Systems', 'SaaS [Software as a Service]', 'CRM [Customer Relationship Management]'] },
  { title: 'Intelligent Automation', icon: Workflow, image: '/assets/photos/service-automation.jpg', items: ['Workflow Automation', 'Browser Automation', 'Business Process Automation', 'Document Automation'] },
  { title: 'Product Engineering', icon: Box, image: '/assets/photos/service-product.jpg', items: ['MVP Development', 'Product Architecture', 'Prototyping', 'Production Engineering'] },
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

// Mobile-only "snake" version of HOW_STEPS: steps sit in a two-column grid,
// alternating sides, and a curved path links each node circle to the next.
//
// The path is MEASURED from the laid-out cells rather than computed from
// assumed percentages — text length and viewport width both move the nodes,
// and any hardcoded geometry drifts off them. The measured element is the
// plain grid cell, NOT the animated inner div: a transformed element becomes
// its descendants' offsetParent, which would report every node at the same
// local coordinates. The circle is the cell's first child, so its centre is
// half a node-height down from the cell's top.
const NODE_SIZE = 48;

function SnakeSteps({ steps, reducedMotion }) {
  const gridRef = React.useRef(null);
  const nodeRefs = React.useRef([]);
  const [geom, setGeom] = React.useState(null);

  React.useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const measure = () => {
      const pts = nodeRefs.current.filter(Boolean).map((el) => ({
        x: el.offsetLeft + el.offsetWidth / 2,
        y: el.offsetTop + NODE_SIZE / 2,
      }));
      if (pts.length < 2) return;
      const d = pts.reduce((acc, p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = pts[i - 1];
        const midY = (prev.y + p.y) / 2;
        return `${acc} C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`;
      }, '');
      setGeom((prev) =>
        prev && prev.d === d && prev.w === grid.offsetWidth && prev.h === grid.offsetHeight
          ? prev
          : { d, w: grid.offsetWidth, h: grid.offsetHeight }
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, [steps]);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start 0.85', 'end 0.55'],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 70, damping: 20, mass: 0.4 });

  // Nodes light up as the drawn line reaches them. Node i sits at fraction
  // i/(n-1) along the path, so the count already crossed is derived from the
  // same spring the stroke uses — the fill stays in step with the visible
  // line tip rather than with raw scroll. One state write per crossing, not
  // per frame.
  const [litCount, setLitCount] = React.useState(0);
  React.useEffect(() => {
    if (reducedMotion) {
      setLitCount(steps.length);
      return;
    }
    const sync = (v) => {
      const crossed = v <= 0 ? 0 : Math.min(steps.length, Math.floor(v * (steps.length - 1)) + 1);
      setLitCount((c) => (c === crossed ? c : crossed));
    };
    sync(pathLength.get());
    return pathLength.on('change', sync);
  }, [pathLength, steps.length, reducedMotion]);

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {geom && (
        <svg
          className="absolute left-0 top-0 pointer-events-none"
          width={geom.w}
          height={geom.h}
          viewBox={`0 0 ${geom.w} ${geom.h}`}
          fill="none"
        >
          {/* Tailwind preflight sets `svg { stroke: none }`, which beats a
              stroke="..." presentation attribute — stroke must be inline style.
              The theme vars are --color-ink / --color-electric, not --ink. */}
          <path
            d={geom.d}
            strokeWidth={2}
            strokeLinecap="round"
            style={{ stroke: 'var(--color-ink)', strokeOpacity: 0.13 }}
          />
          <motion.path
            d={geom.d}
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ stroke: 'var(--color-electric)', pathLength: reducedMotion ? 1 : pathLength }}
          />
        </svg>
      )}
      <div ref={gridRef} className="relative z-10 grid grid-cols-2 gap-x-2">
        {steps.map((step, i) => (
          <div
            key={step.title}
            ref={(el) => { nodeRefs.current[i] = el; }}
            style={{ gridColumn: (i % 2) + 1, gridRow: i + 1 }}
            className="pb-9"
          >
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.85, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div
                style={{ width: NODE_SIZE, height: NODE_SIZE }}
                className={`rounded-full border-2 flex items-center justify-center font-display text-[13px] font-bold shadow-sm transition-colors duration-500 ${
                  i < litCount
                    ? 'bg-electric border-electric text-white'
                    : 'bg-primary border-electric/40 text-electric'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <h4 className="font-display text-[12.5px] font-bold uppercase tracking-wide text-ink mt-3 mb-1.5">{step.title}</h4>
              <p className="text-[12.5px] leading-snug text-muted">{step.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  useDocumentMeta({
    title: 'Navedhana — Software Development & AI Engineering Company',
    description:
      'Navedhana is a software development and AI engineering company building web, mobile, and AI-powered products — custom software, AI agents, RAG systems, and intelligent automation for startups and enterprises.',
  });

  const introDone = useIntroDone();
  const reducedMotion = useReducedMotion();
  // The wwd-card tilt + spotlight need a real pointer; on touch the CSS behind
  // them is disabled (`@media (hover: hover)` in index.css), so running the
  // handlers there would be work with nothing to show for it.
  const pointerFx = !reducedMotion && canHover();

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
              {/* Fluid below sm. The headline is a parallel construction — two
                  sentences, one per line, the second in accent — and that only
                  reads as parallel while each sentence occupies exactly one
                  line. At a fixed 34px "We build the intelligence." needs 395px
                  against 358px available on a 390px phone, so it wrapped and
                  split the accent line mid-phrase ("We build the" /
                  "intelligence."). Anything from 31px up wraps; 30px and below
                  fits. A clamp keeps it at the largest size that still fits one
                  line at any phone width, instead of a fixed value that is
                  correct on one device and broken on the next one down. */}
              <motion.h1
                variants={heroItem}
                className="font-display text-[clamp(24px,7.5vw,34px)] sm:text-[42px] lg:text-[52px] leading-[1.05] font-semibold tracking-tight text-ink hero-text-glow"
              >
                We build the software.
                <br />
                <span className="text-electric">We build the intelligence.</span>
              </motion.h1>
              {/* Shown on phones again. This was hidden below sm on the
                  reasoning that the line was a nice-to-have "on room to
                  spare" — but measured at 390x844 the hero runs 63% empty
                  (306px above the content, 222px below it), so the room to
                  spare is exactly what this screen has most of. Hiding it
                  bought nothing and cost the one line that says what the
                  company actually does. */}
              <motion.p variants={heroItem} className="text-[14.5px] sm:text-base leading-relaxed text-muted mt-3.5 sm:mt-4 max-w-2xl mx-auto hero-text-glow">
                Products we've shipped. Systems we've built for others. Same engineering standard either way.
              </motion.p>
              {/* Phones stack the CTAs full-width instead of letting them wrap.
                  Side by side they measure 392px against 358px of available
                  width, so they always wrapped anyway — but as a centred wrap
                  of two different widths (197px over 181px), which reads as a
                  layout accident rather than a choice. Stacking makes it
                  deliberate, equal-width, and a full-width tap target. */}
              <motion.div variants={heroItem} className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-stretch sm:items-center gap-3 sm:gap-3.5 mt-6">
                <Button
                  to="/contact"
                  size="sm"
                  hoverEffects={false}
                  className="w-full sm:w-auto"
                  onClick={() => trackEvent('cta_click', { location: 'home_hero' })}
                >
                  Discuss Your Project →
                </Button>
                <Button to="/products" variant="outline" size="sm" hoverEffects={false} className="w-full sm:w-auto">
                  See What We've Built
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Capability strip — the hero's closing line, sitting in normal flow
          at the bottom of the section. Below sm: a horizontal marquee (the
          four terms don't fit one line at 375px, and a wrapped stack either
          took four lines or broke alignment); sm:+ keeps the static
          centered row since it fits fine there. */}
      <div className="relative z-20 shrink-0 py-4 sm:py-5 sm:px-8 border-t border-ink/15 bg-[var(--hero-bg)]/70 backdrop-blur-md">
        <div
          className="sm:hidden overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div
            className="flex w-max capability-marquee-track"
            style={{ animationPlayState: reducedMotion ? 'paused' : 'running' }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-3 shrink-0 pr-3" aria-hidden={copy === 1}>
                {CAPABILITY_STRIP.map((c) => (
                  <React.Fragment key={c}>
                    <span className="font-display text-[12px] font-bold tracking-[0.08em] uppercase text-muted">{c}</span>
                    <span className="text-ink/20">•</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden sm:flex max-w-7xl mx-auto flex-row flex-wrap justify-center gap-3.5 text-center font-display text-[11.5px] font-bold tracking-[0.12em] uppercase text-muted">
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
    <section className="dark-scope bg-[var(--hero-bg)] py-12 sm:py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div {...tiltIn} className="max-w-xl mx-auto mb-11 text-center">
          <SectionKicker centered className="mb-3.5">What We Do</SectionKicker>
          <h2 className="font-display text-[30px] sm:text-[42px] font-bold tracking-tight text-ink">
            Four capabilities. One engineering standard.
          </h2>
          <p className="text-[15px] text-muted mt-3.5">
            <Button to="/services" variant="link" size="inline">The full breakdown</Button>, or the short version below.
          </p>
        </motion.div>
        {/* Default `stretch` alignment: all four cards match the tallest, so
            the row reads as one straight band. `flex flex-col` on the card and
            `flex-1` on the body then push each card's own background down to
            fill its share, rather than leaving a transparent gap under the
            shorter lists. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WWD_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              {...scaleIn}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="wwd-card flex flex-col rounded-2xl bg-primary border border-ink/10 shadow-[0_26px_54px_-28px_rgba(0,0,0,0.75)]"
              onMouseMove={pointerFx ? (e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                e.currentTarget.style.setProperty('--mx', `${x}px`);
                e.currentTarget.style.setProperty('--my', `${y}px`);
                const rx = ((y / r.height) - 0.5) * -8;
                const ry = ((x / r.width) - 0.5) * 8;
                e.currentTarget.style.transform = `translateY(-4px) rotateX(${rx}deg) rotateY(${ry}deg)`;
              } : undefined}
              onMouseLeave={pointerFx ? (e) => { e.currentTarget.style.transform = ''; } : undefined}
            >
              {/* The photo is now a band at the top rather than a wash behind
                  the text. On a white card there is no scrim strong enough to
                  keep a photograph readable underneath body copy without
                  turning it to mud — giving it its own strip keeps the image
                  at full strength AND the list on clean white. */}
              <div className="relative h-[100px] sm:h-[112px] shrink-0 overflow-hidden">
                <img src={card.image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent)_20%,transparent),rgba(16,25,46,0.35))]"
                  aria-hidden="true"
                />
              </div>
              <div className="relative z-10 flex-1 p-5 sm:p-6">
                {/* Pulled up so the tile straddles the photo edge — the one
                    element tying the two halves of the card together. */}
                <div className="-mt-[38px] mb-3 w-11 h-11 rounded-xl flex items-center justify-center border bg-card text-electric border-ink/10 shadow-sm">
                  <card.icon size={20} />
                </div>
                <h3 className="font-display text-[16.5px] font-semibold text-ink mb-2 sm:mb-3">{card.title}</h3>
                <motion.ul {...staggerParent(0.05, 0.12)} className="flex flex-col text-[13px] sm:text-[12.5px] text-muted">
                {card.items.map((it) => {
                  const note = it.match(ITEM_NOTE_RE);
                  return (
                    <motion.li variants={riseChild} key={it} className="flex items-center gap-2 py-1 sm:py-1.5 border-t border-ink/[0.08] first:border-t-0 first:pt-0 hover:text-ink transition-colors">
                      {note ? (
                        <span>
                          {note[1]} <span className="opacity-60 text-[11px]">({note[2]})</span>
                        </span>
                      ) : it}
                    </motion.li>
                  );
                })}
                </motion.ul>
              </div>
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
    <section className="py-12 sm:py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div {...blurIn} className="max-w-3xl mx-auto mb-9 sm:mb-16 text-center">
          <SectionKicker centered className="mb-4 sm:mb-5">Our Engineering Approach</SectionKicker>
          <h2 className="font-display text-[36px] sm:text-[50px] font-extrabold tracking-tight leading-[1.1] text-ink mb-5">
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
          // Low threshold on purpose: this track is six nodes wide, and with
          // `once: true` a fast flick-scroll past a high `amount` can leave the
          // whole chain stuck invisible with no second chance to fire.
          viewport={{ once: true, amount: 0.15 }}
          className="hidden lg:flex items-start"
        >
          {HOW_STEPS.map((step, i) => (
            <React.Fragment key={step.title}>
              <motion.div variants={stepNodeVariants} className="flex flex-col items-center text-center w-[152px] flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary border-2 border-electric/40 flex items-center justify-center font-display text-[14px] sm:text-[13px] font-bold text-electric mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h4 className="font-display text-[12px] font-bold uppercase tracking-wide text-ink mb-2">{step.title}</h4>
                <p className="text-[13.5px] sm:text-[12.5px] leading-relaxed text-muted">{step.desc}</p>
              </motion.div>
              {i < HOW_STEPS.length - 1 && (
                <motion.div variants={growX} style={{ transformOrigin: 'left' }} className="flex-1 h-px bg-ink/15 mt-6" />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Below lg: snake chain — zigzagging nodes on a scroll-drawn path */}
        <div className="lg:hidden">
          <SnakeSteps steps={HOW_STEPS} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>

    {/* Why Navedhana — condensed teaser; full pillars + reasoning live on
        /about, not duplicated here (was a byte-identical copy of About's
        "What We Believe" section prior to this pass). */}
    {/* Why Navedhana — condensed teaser; full pillars + reasoning live on
        /about, not duplicated here. Dark panel is an inset rounded card, not
        a full-bleed band, so it reads as a distinct floating block. */}
    <section className="py-12 sm:py-20 px-4 sm:px-8">
      <div className="dark-scope bg-[var(--hero-bg)] rounded-[2rem] sm:rounded-[2.5rem] max-w-7xl mx-auto px-6 sm:px-14 py-12 sm:py-16 text-center">
        <motion.div {...rise}>
          <SectionKicker centered className="mb-3.5">Why Navedhana</SectionKicker>
          <h2 className="font-display text-[28px] sm:text-[38px] font-bold tracking-tight text-ink mb-5">
            A software and AI engineering company building real products
          </h2>
          <motion.div {...staggerParent(0.1)} className="flex flex-wrap justify-center gap-x-7 gap-y-2 mb-6">
            {PILLARS.slice(0, 3).map((p) => (
              <motion.span key={p.title} variants={riseChild} className="font-display text-[14px] sm:text-[13px] font-semibold text-ink/80">
                {p.title}
              </motion.span>
            ))}
          </motion.div>
          <p className="text-[14.5px] leading-relaxed text-muted mb-5">
            We build our own technology, and we build software for businesses — with the same engineering standard either way.
          </p>
          <Button to="/about" variant="link" size="inline">More About Navedhana →</Button>
        </motion.div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-10 sm:py-16 px-4 sm:px-8 text-center">
      <motion.div {...scaleIn} className="max-w-xl mx-auto">
        <h2 className="font-display text-[28px] sm:text-[38px] font-bold tracking-tight text-ink mb-3">Have a problem worth solving?</h2>
        <p className="text-[14.5px] text-muted mb-6">Tell us what you're building. We'll help you figure out the technology behind it.</p>
        <Button to="/contact" onClick={() => trackEvent('cta_click', { location: 'home_final' })}>Let's Build It →</Button>
      </motion.div>
    </section>
    </div>
  </div>
  );
};

export default Home;
