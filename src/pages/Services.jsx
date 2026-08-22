import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Layers, Workflow, Box, Sprout, Gift, Sun, ArrowUpRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionKicker from '../components/ui/SectionKicker';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { slideLeft, slideRight, blurIn, rise, staggerParent, riseChild } from '../lib/motion';

// One accent for all four, matching Home's capability cards. The four separate
// hues that used to live here were the same thing removed from those cards.
const ACCENT = 'var(--color-electric)';

// Restructured to match a reference layout the user approved: a punchy
// one-line `headline` carries the section (the service name moves to a small
// tag above it), `build` is a tight 4-item grid rather than a 5-item list,
// and the separate "when you need it" bullets are gone — their substance now
// lives in `lead` instead of a parallel block. `dark` alternates 01/03 true,
// 02/04 false, and is what both the section background AND which side the
// image sits on are driven from — image-left pairs with dark, image-right
// with light, exactly like the reference.
//
// `receive` still describes a system, not an outcome — no metrics, timelines
// or results are claimed anywhere on this page.
const GROUPS = [
  {
    id: 'ai-engineering',
    title: 'AI Engineering',
    icon: Cpu,
    image: '/assets/services/ai-engineering.webp',
    dark: true,
    headline: 'Build intelligence into the system.',
    lead: 'AI that works with your data, tools and workflows — not a demo sitting beside them.',
    build: [
      { title: 'AI Agents', desc: 'Reason, use tools and complete tasks.' },
      { title: 'RAG Systems', desc: 'Retrieval over your own documents and data.' },
      { title: 'Intelligent Assistants', desc: 'Embedded directly inside a product you run.' },
      { title: 'Machine Learning & Computer Vision', desc: 'Models trained on your data, not a generic API.' },
    ],
    receive: {
      title: 'A production-ready AI system',
      body: 'Connecting your models, business data, tools and users into one working flow.',
    },
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    icon: Layers,
    image: '/assets/services/custom-software.webp',
    dark: false,
    headline: 'Build the system your workflow actually needs.',
    lead: 'Software shaped around how your business works, not the shape a package vendor assumed.',
    build: [
      { title: 'Business Platforms', desc: 'Internal tools built around how your team works.' },
      { title: 'Web, Desktop & Mobile', desc: 'Applications across whichever surface the job needs.' },
      { title: 'APIs & Integrations', desc: "Connecting systems that don't talk to each other." },
      { title: 'SaaS Products', desc: 'Multi-tenant software you can sell, not just use.' },
    ],
    receive: {
      title: 'Software built around your workflow',
      body: 'A deployed application built to your process, with the integrations and handover needed to maintain it.',
    },
  },
  {
    id: 'intelligent-automation',
    title: 'Intelligent Automation',
    icon: Workflow,
    image: '/assets/services/intelligent-automation.webp',
    dark: true,
    headline: 'Make repetitive work move on its own.',
    lead: 'Connecting messy real-world inputs to intelligent decisions and automated actions.',
    build: [
      { title: 'Automated Processes', desc: 'End to end, not just the easy first and last steps.' },
      { title: 'AI-Powered Workflows', desc: "Handling the judgement calls rigid automation can't." },
      { title: 'Document Workflows', desc: 'Intake, extraction and routing, without re-entry.' },
      { title: 'Data Pipelines', desc: 'Moving information between systems on its own.' },
    ],
    receive: {
      title: 'A connected automation system',
      body: 'The repeatable parts run without a person, with monitoring for when it genuinely needs you.',
    },
  },
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    icon: Box,
    image: '/assets/services/product-engineering.webp',
    dark: false,
    headline: 'Turn an idea into a product that keeps growing.',
    lead: 'From the first usable version to the engineering real users demand.',
    build: [
      { title: 'Product MVPs', desc: 'A first real version you can put in front of users.' },
      { title: 'Production Applications', desc: 'Built to hold up once real usage arrives.' },
      { title: 'Product Enhancements', desc: 'Extending something already live and in use.' },
      { title: 'Architecture Improvements', desc: 'Fixing the foundation so the product can keep growing.' },
    ],
    receive: {
      title: 'A maintainable, production-ready product',
      body: 'Engineered on an architecture meant to be extended, ready to put in front of users.',
    },
  },
];

// The client-side view of an engagement — deliberately distinct from Home's
// six-step account of how we engineer. Nothing here states duration, price or
// commercial model: those are business facts, and this page does not have them.
const ENGAGEMENT = [
  { title: 'Understand', body: 'We work through the problem, the people who will use the system, the constraints around it, and what the business needs it to achieve.' },
  { title: 'Define', body: 'That turns into a clear scope, a solution direction and a technical architecture, so what is being built is agreed before it is built.' },
  { title: 'Build', body: 'We design, engineer and integrate the system in visible increments, so you can see progress and redirect early rather than waiting for a reveal.' },
  { title: 'Validate', body: 'The system is tested against real-world conditions and requirements, then refined where reality differs from the plan.' },
  { title: 'Handover', body: 'You receive a maintainable system with the documentation and knowledge transfer needed to run and extend it.' },
];

// Derived from what Lekvya already is on this site (an AI-powered workflow and
// client-communication platform we built and run) — not a claim about metrics,
// customers or results, none of which appear anywhere on this page.
const LEKVYA_CAPABILITIES = ['AI Engineering', 'Custom Software', 'Intelligent Automation', 'Product Engineering'];

// Secondary by design: Navedhana runs these, but this page is for software
// buyers and the hierarchy should say so. Each links out to its own minimal
// venture page (Vegetables.jsx-style) rather than expanding inline here.
const OTHER_VENTURES = [
  { title: 'Agri Tech Service', icon: Sprout, desc: 'Farm-fresh, organic vegetables and seasonal produce.', to: '/vegetables', status: null },
  { title: 'Seasonal Products', icon: Gift, desc: 'Authentic seasonal and festive products.', to: '/seasonal', status: 'Launching soon' },
  { title: 'Solar Service', icon: Sun, desc: 'Solar installation and clean energy solutions.', to: '/solar', status: null },
];

// The navbar is fixed, so an anchored section would otherwise land underneath
// it. Applied to each capability section rather than globally.
const ANCHOR_OFFSET = 'scroll-mt-[96px]';

// The 4-item "what we build" grid. A bordered, gap-px-divided 2x2 (the same
// idiom ENGAGEMENT already uses below, just 2 columns instead of 5) rather
// than a bullet list or four separate cards — reads as one compact reference
// block. `dark` swaps the cell fill between the two section backgrounds;
// text-ink/text-muted/text-royal already re-theme automatically via the
// .dark-scope cascade, so only the fill and divider need the branch.
const ServiceBuildGrid = ({ items, dark }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-px rounded-xl overflow-hidden border ${dark ? 'bg-white/10 border-white/10' : 'bg-ink/15 border-ink/15'}`}>
    {items.map((it, i) => (
      <div
        key={it.title}
        className={`p-3 transition-colors duration-300 ${dark ? 'bg-[var(--hero-bg)] hover:bg-white/[0.04]' : 'bg-card hover:bg-ink/[0.02]'}`}
      >
        <span className="font-display text-[10px] font-bold text-electric tabular-nums">{String(i + 1).padStart(2, '0')}</span>
        <h4 className="font-display text-[13px] font-semibold text-ink mt-1 leading-snug">{it.title}</h4>
        <p className="text-[11.5px] leading-snug text-muted mt-0.5">{it.desc}</p>
      </div>
    ))}
  </div>
);

// The one highlighted callout per service — a left accent bar (border-l-4)
// rather than an absolutely-positioned pseudo-element bar, since Tailwind's
// border utilities give the identical visual result natively. `title` is the
// tangible deliverable itself ("A production-ready AI system") as its own
// strong line, not buried inside the first sentence of `body`.
const ServiceReceiveCard = ({ title, body, dark }) => (
  <div
    className={`rounded-xl border-l-4 border-electric py-4 px-5 ${
      dark ? 'bg-white/[0.04] border-y border-r border-white/10' : 'bg-electric/[0.05] border-y border-r border-electric/20'
    }`}
  >
    <h3 className="font-display text-[10.5px] font-bold uppercase tracking-[0.1em] text-royal mb-1.5">
      What you receive
    </h3>
    <p className="font-display text-[15px] font-semibold text-ink mb-1">{title}</p>
    <p className="text-[13px] leading-relaxed text-muted">{body}</p>
  </div>
);

const Services = () => {
  useDocumentMeta({
    title: 'Services — AI Engineering, Custom Software, Automation & Product Engineering | Navedhana',
    description:
      'Navedhana builds AI systems, custom software, intelligent automation and production products. See when each service applies, what we build, what you receive, and how an engagement works.',
  });

  return (
    <div className="bg-primary">
      <PageHero
        kicker="Services"
        title="Software built around the way your business works"
        subtitle="We combine software engineering, applied AI, automation and product thinking to build systems that run real work — not prototypes that stop at the demo."
      />

      {/* Capability index — a compact contents list that doubles as anchor
          navigation. Deliberately not sticky: a fixed bar on top of an already
          fixed navbar costs a phone too much of its viewport. */}
      <section aria-labelledby="capabilities-heading" className="pb-10 sm:pb-14 px-4 sm:px-8 max-w-6xl mx-auto">
        <h2 id="capabilities-heading" className="sr-only">Our capabilities</h2>
        <motion.ul {...staggerParent(0.07)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {GROUPS.map((grp, i) => (
            <motion.li key={grp.id} variants={riseChild}>
              <a
                href={`#${grp.id}`}
                className="group flex items-center gap-3 min-h-[56px] px-4 py-3 rounded-xl border border-ink/15 bg-card hover:border-electric/40 hover:bg-electric/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-colors duration-300"
              >
                <span className="font-display text-[12.5px] font-bold text-electric tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[14.5px] font-semibold text-ink flex-1">{grp.title}</span>
                <grp.icon size={17} className="text-muted flex-shrink-0" aria-hidden="true" />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* The four capabilities in depth. Each answers three things Home's
          teaser cards do not: the situation (folded into the headline/lead),
          the system ("what we build"), the deliverable ("what you receive").
          Alternation is two axes at once, in sync: dark background pairs with
          image-left, light pairs with image-right — 01/03 dark+left,
          02/04 light+right. */}
      {GROUPS.map((grp, i) => {
        const imageSecond = !grp.dark;
        return (
          <section
            key={grp.id}
            id={grp.id}
            aria-labelledby={`${grp.id}-heading`}
            className={`${ANCHOR_OFFSET} px-4 sm:px-8 ${grp.dark ? 'dark-scope bg-[var(--hero-bg)]' : ''}`}
          >
            <div className="max-w-6xl mx-auto py-10 sm:py-16">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <motion.div
                  {...(imageSecond ? slideRight : slideLeft)}
                  transition={{ duration: 0.5, delay: 0.04 }}
                  className={`relative min-w-0 flex justify-center ${imageSecond ? 'lg:order-2' : ''}`}
                >
                  {grp.boxed ? (
                    // This source photo has an opaque background rather than
                    // a transparent cut-out, so it sits in a bordered card
                    // (same border/fill tokens the venture and index cards
                    // already use) instead of floating — a visible rectangle
                    // is honest here, not a bug, since the image itself is a
                    // literal screenshot-style render, not an illustration.
                    <div
                      className={`w-full max-w-[560px] rounded-2xl overflow-hidden border shadow-sm ${
                        grp.dark ? 'border-white/10 bg-white/[0.04]' : 'border-ink/15 bg-card'
                      }`}
                    >
                      <img src={grp.image} alt="" aria-hidden="true" loading="lazy" className="w-full h-auto" />
                    </div>
                  ) : (
                    <>
                      {/* Same subtle radial-blob idiom as the page-level
                          GradientBlobs (bg-electric/[0.05..0.08] blur-[Npx]) —
                          an ambient glow behind the artwork, not a container.
                          Slightly stronger on dark sections, where a faint glow
                          needs more presence to register against navy. */}
                      <div
                        className={`absolute inset-[8%] -z-10 rounded-full blur-[60px] ${grp.dark ? 'bg-electric/[0.16]' : 'bg-electric/[0.08]'}`}
                        aria-hidden="true"
                      />
                      <img
                        src={grp.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="relative w-full max-w-[560px] h-auto drop-shadow-[0_25px_35px_rgba(9,88,214,0.18)]"
                      />
                    </>
                  )}
                </motion.div>

                <motion.div
                  {...(imageSecond ? slideLeft : slideRight)}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`min-w-0 ${imageSecond ? 'lg:order-1' : ''}`}
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="font-display text-[11px] font-bold text-electric tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-[11px] font-bold uppercase tracking-[0.15em] text-royal">
                      {grp.title}
                    </span>
                  </div>
                  <h2 id={`${grp.id}-heading`} className="font-display text-[30px] sm:text-[38px] font-bold tracking-tight leading-[1.08] text-ink mb-3">
                    {grp.headline}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted mb-5 max-w-[460px]">{grp.lead}</p>

                  <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.1em] text-royal mb-2.5">
                    What we build
                  </h3>
                  <div className="mb-5">
                    <ServiceBuildGrid items={grp.build} dark={grp.dark} />
                  </div>

                  <ServiceReceiveCard title={grp.receive.title} body={grp.receive.body} dark={grp.dark} />
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Beyond the software — dark, matching How We Work's treatment so the
          page's two dark sections read as one system. Navedhana runs these
          too, but a software buyer should not meet them as peers of AI
          Engineering — compact cards, links out, clearly labelled status. */}
      <section aria-labelledby="ventures-heading" className="py-12 sm:py-20 px-4 sm:px-8">
        <div className="dark-scope bg-[var(--hero-bg)] rounded-[2rem] sm:rounded-[2.5rem] max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-16">
          <motion.div {...rise} className="mb-8 sm:mb-10">
            <SectionKicker className="mb-3.5">Beyond the Software</SectionKicker>
            <h2 id="ventures-heading" className="font-display text-[24px] sm:text-[30px] font-bold tracking-tight text-ink mb-2">
              Other Navedhana ventures
            </h2>
            <p className="text-[14px] text-muted max-w-lg">
              Navedhana runs ventures outside its technology practice. They are separate from the engineering work above.
            </p>
          </motion.div>

          {/* Plain Links, not <Button>: Button splits a trailing arrow out of
              its label and applies its own padding, neither of which suits a
              two-line card — forcing it needed !important overrides. */}
          <motion.div {...staggerParent(0.09)} className="grid sm:grid-cols-3 gap-3">
            {OTHER_VENTURES.map((v, i) => (
              <motion.div key={v.title} variants={riseChild} className="h-full">
                <Link
                  to={v.to}
                  className="group h-full flex flex-col justify-between min-h-[124px] p-4 rounded-xl border border-white/10 bg-white/[0.04] hover:border-electric/40 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hero-bg)] transition-colors duration-300"
                >
                  <div>
                    <span className="block font-display text-[10px] font-bold text-electric tabular-nums mb-1.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-[16px] font-semibold text-ink mb-1">{v.title}</h3>
                    <p className="text-[12.5px] text-muted">{v.desc}</p>
                  </div>
                  <div className="self-start mt-3 flex items-center gap-2 flex-wrap">
                    {v.status && (
                      <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-muted font-display text-[10.5px] font-bold tracking-wide">
                        {v.status}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-[12px] font-display font-bold text-electric">
                      Explore
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-8 text-center">
        <motion.div {...blurIn} className="max-w-xl mx-auto">
          <h2 className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-ink mb-3">
            Not sure which of these you need?
          </h2>
          <p className="text-[14.5px] text-muted mb-6">
            Describe the problem. We will tell you what it actually takes to solve it — including when the answer is
            that you do not need custom software.
          </p>
          <Button to="/contact" onClick={() => trackEvent('cta_click', { location: 'services' })}>
            Talk to an Engineer →
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
