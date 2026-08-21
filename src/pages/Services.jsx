import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Layers, Workflow, Box, Sprout, Gift, ArrowUpRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionKicker from '../components/ui/SectionKicker';
import AccentIcon from '../components/ui/AccentIcon';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { slideLeft, slideRight, blurIn, scaleIn, rise, staggerParent, riseChild } from '../lib/motion';

// One accent for all four, matching Home's capability cards. The four separate
// hues that used to live here were the same thing removed from those cards.
const ACCENT = 'var(--color-electric)';

// Home's "What We Do" cards name these same four capabilities. What earns this
// page its "full breakdown" link is the three blocks below each one: the
// situation you would be in (`when`), the kind of system we build (`build`,
// each item a short label plus what it actually does — not a bare noun), and
// what actually lands in your hands at the end (`receive`).
//
// `receive` deliberately describes a system, not an outcome — no metrics,
// timelines or results are claimed anywhere on this page.
const GROUPS = [
  {
    id: 'ai-engineering',
    title: 'AI Engineering',
    icon: Cpu,
    image: '/assets/services/ai-engineering.png',
    lead: 'AI that is wired into your data, your tools and your rules — not a demo sitting beside them.',
    when: [
      'You want AI inside a product you already run.',
      'Your team reads, sorts or summarises large amounts of information by hand.',
      'You need an assistant or agent that can act, not just answer.',
      'You hold business data that should be driving decisions and currently is not.',
    ],
    build: [
      { title: 'AI Agents', desc: 'Agents that use tools and complete tasks, not just answer questions.' },
      { title: 'RAG Systems', desc: 'Retrieval over your own documents and data, kept current.' },
      { title: 'Intelligent Assistants', desc: 'Embedded directly inside a product you already run.' },
      { title: 'ML & Computer Vision', desc: 'Models trained on your data, not a generic API call.' },
      { title: 'LLM Integrations', desc: 'Language models wired into your existing workflows.' },
    ],
    receive:
      'A production system that connects your models, business data, tools and users into one working flow — with the evaluation showing where it is reliable, and the documentation to operate it.',
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    icon: Layers,
    image: '/assets/services/custom-software.png',
    lead: 'Systems built around how your business actually works, rather than the shape a package vendor assumed.',
    when: [
      'The tools you pay for almost fit, and the gap is where your real work happens.',
      'Several systems hold pieces of the same process and none of them talk.',
      'A core operation runs on spreadsheets and email because nothing else fits it.',
      'You need internal software only your organisation would ever use.',
    ],
    build: [
      { title: 'Business Platforms', desc: "Internal tools built around how your team actually works." },
      { title: 'Web, Desktop & Mobile', desc: 'Applications across whichever surface the job needs.' },
      { title: 'APIs & Integrations', desc: "Connecting systems that currently don't talk to each other." },
      { title: 'SaaS Products', desc: 'Multi-tenant software you can sell, not just use internally.' },
      { title: 'Workflow Systems', desc: 'Dashboards and tools shaped around one specific process.' },
    ],
    receive:
      'A deployed application built to your process, the integrations that keep it in step with your other systems, and the architecture notes and handover needed to maintain it.',
  },
  {
    id: 'intelligent-automation',
    title: 'Intelligent Automation',
    icon: Workflow,
    image: '/assets/services/intelligent-automation.png',
    lead: 'Taking the repetitive middle out of a process, including the parts too messy for conventional automation.',
    when: [
      'Repetitive manual steps are consuming hours of your team’s week.',
      'Information is being copied by hand between systems.',
      'The same operational sequence is performed again and again.',
      'Existing automation breaks whenever the input is not perfectly uniform.',
    ],
    build: [
      { title: 'Automated Processes', desc: "End-to-end, not just the easy first and last steps." },
      { title: 'AI-Powered Workflows', desc: "Handling the judgement calls rigid automation can't." },
      { title: 'Document Workflows', desc: 'Intake, extraction and routing, without manual re-entry.' },
      { title: 'Data Pipelines', desc: 'Moving information between systems on its own.' },
      { title: 'Event-Driven Automation', desc: 'Reacting the moment something changes, not on a schedule.' },
    ],
    receive:
      'The process mapped, the repeatable parts running without a person, and monitoring that tells you when something genuinely needs human attention.',
  },
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    icon: Box,
    image: '/assets/services/product-engineering.png',
    lead: 'Taking a product from idea to something that survives real users — or rescuing one that has outgrown its first build.',
    when: [
      'You have an idea and need it turned into a real, usable product.',
      'You need an MVP that can be put in front of users quickly.',
      'An early version works but will not hold up as usage grows.',
      'An existing product needs extending, modernising or re-architecting.',
    ],
    build: [
      { title: 'Product MVPs', desc: 'A first real version you can put in front of users.' },
      { title: 'Production Applications', desc: 'Built to hold up once real usage arrives.' },
      { title: 'Product Enhancements', desc: 'Extending something already live and in use.' },
      { title: 'Architecture Improvements', desc: 'Fixing the foundation so the product can keep growing.' },
      { title: 'Feature Development', desc: 'Ongoing capability added to an existing product.' },
    ],
    receive:
      'A product you can put in front of users, engineered on an architecture meant to be extended, with the reasoning behind the technical decisions written down.',
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
// buyers and the hierarchy should say so. Both link out rather than expanding.
// `/seasonal` exists only as a redirect to /vegetables, so both point there —
// no seasonal-products route is invented here.
const OTHER_VENTURES = [
  { title: 'Vegetables Supply', icon: Sprout, desc: 'Farm-fresh, organic vegetables and seasonal produce.', to: '/vegetables', status: null },
  { title: 'Seasonal Products', icon: Gift, desc: 'Authentic seasonal and festive products.', to: '/vegetables', status: 'Launching soon' },
];

// The navbar is fixed, so an anchored section would otherwise land underneath
// it. Applied to each capability section rather than globally.
const ANCHOR_OFFSET = 'scroll-mt-[96px]';

// The five-item "what we build" list, restyled as compact label+description
// pairs (title bold, one short line under it) rather than a flat bullet list
// or five full cards — a left rule carries the accent instead of a bordered
// box, so five of these read as one scannable block, not five tiles.
const ServiceDeliverables = ({ items }) => (
  <div className="grid sm:grid-cols-2 gap-x-5 gap-y-3.5">
    {items.map((it) => (
      <div key={it.title} className="border-l-2 border-electric/30 pl-3">
        <h4 className="font-display text-[13px] font-semibold text-ink leading-snug">{it.title}</h4>
        <p className="text-[12.5px] leading-snug text-muted mt-0.5">{it.desc}</p>
      </div>
    ))}
  </div>
);

// The one highlighted callout per service. Kept to a single small card
// (light blue fill, thin blue border) rather than four large panels — it
// should read as the answer to one specific question, not another section.
const ServiceReceiveCard = ({ children }) => (
  <div className="rounded-xl border border-electric/20 bg-electric/[0.05] p-4">
    <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.1em] text-royal mb-1.5">
      What you receive
    </h3>
    <p className="text-[13.5px] leading-relaxed text-ink/80">{children}</p>
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
          teaser cards do not: the situation, the system, the deliverable. */}
      {GROUPS.map((grp, i) => {
        // Alternating sides: even index (01, 03) carries the image left of
        // the text, odd index (02, 04) flips it. lg:order-2 on the image is
        // what actually flips the side — the grid columns stay in the same
        // DOM order either way, so a keyboard/screen-reader pass still meets
        // the heading before the illustration. Below lg the image always
        // leads (alternation has no meaning in a single stacked column).
        const imageSecond = i % 2 === 1;
        return (
          <section
            key={grp.id}
            id={grp.id}
            aria-labelledby={`${grp.id}-heading`}
            className={`${ANCHOR_OFFSET} px-4 sm:px-8`}
          >
            <div className="max-w-6xl mx-auto py-10 sm:py-14 border-t border-ink/15">
              {/* min-w-0 on both grid children: without it, a CSS grid item's
                  default min-width is its content's own intrinsic size, so
                  the illustration's native pixel width was forcing this track
                  wider than the viewport at mobile — a real 16px horizontal
                  overflow, not a rounding artifact. */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                <motion.div
                  {...(imageSecond ? slideRight : slideLeft)}
                  transition={{ duration: 0.5, delay: 0.04 }}
                  className={`min-w-0 flex justify-center ${imageSecond ? 'lg:order-2' : ''}`}
                >
                  {/* No card, border or fill behind the artwork — these are
                      pre-cut, transparent-background illustrations meant to
                      float directly on the page rather than sit boxed inside
                      a frame. Sized to ~50% of the section width (its column)
                      rather than a small fixed thumbnail. drop-shadow (not
                      box-shadow, which needs a rectangular layer) gives it
                      lift while following the artwork's own silhouette. */}
                  <img
                    src={grp.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full max-w-[560px] h-auto drop-shadow-[0_25px_35px_rgba(9,88,214,0.18)]"
                  />
                </motion.div>

                <motion.div
                  {...(imageSecond ? slideLeft : slideRight)}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`min-w-0 ${imageSecond ? 'lg:order-1' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <AccentIcon accent={ACCENT} className="w-10 h-10">
                      <grp.icon size={19} aria-hidden="true" />
                    </AccentIcon>
                    <span className="font-display text-sm font-bold text-ink/25" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h2 id={`${grp.id}-heading`} className="font-display text-[24px] sm:text-[30px] font-semibold tracking-tight text-ink mb-3">
                    {grp.title}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted mb-6 max-w-[520px]">{grp.lead}</p>

                  <div className="flex flex-col gap-5 mb-5">
                    <div>
                      <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.1em] text-royal mb-2.5">
                        When you need it
                      </h3>
                      <ul className="flex flex-col gap-1.5">
                        {grp.when.map((w) => (
                          <li key={w} className="flex gap-2.5 text-[13px] leading-snug text-muted">
                            <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-electric/60 flex-shrink-0" aria-hidden="true" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.1em] text-royal mb-2.5">
                        What we build
                      </h3>
                      <ServiceDeliverables items={grp.build} />
                    </div>
                  </div>

                  <ServiceReceiveCard>{grp.receive}</ServiceReceiveCard>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* How we work — the one dark section, both for rhythm against the light
          sections either side and because it is what a buyer needs before they
          will make contact. */}
      <section aria-labelledby="how-we-work-heading" className="dark-scope bg-[var(--hero-bg)] py-14 sm:py-20 px-4 sm:px-8 mt-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...blurIn} className="max-w-2xl mb-10 sm:mb-12">
            <SectionKicker className="mb-3.5">How We Work</SectionKicker>
            <h2 id="how-we-work-heading" className="font-display text-[26px] sm:text-[34px] font-bold tracking-tight leading-[1.15] text-ink mb-4">
              What working with us looks like
            </h2>
            <p className="text-[14.5px] leading-relaxed text-muted">
              Every engagement runs through the same five stages. Scope, timeline and commercial terms depend entirely
              on the problem — <strong className="text-ink font-semibold">[TO CONFIRM]</strong> — so we work those out
              with you in the first two stages rather than quoting a number before we understand the work.
            </p>
          </motion.div>

          <motion.ol {...staggerParent(0.09)} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ink/15 border border-ink/15 rounded-2xl overflow-hidden">
            {ENGAGEMENT.map((step, i) => (
              <motion.li key={step.title} variants={riseChild} className="bg-[var(--hero-bg)] p-5 sm:p-6">
                <span className="font-display text-[12.5px] font-bold text-electric tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[15.5px] font-semibold text-ink mt-3 mb-2">{step.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted">{step.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Selected work — the page sells four capabilities, so it should show
          something built with them. Lekvya is live and linkable. */}
      <section aria-labelledby="selected-work-heading" className="py-14 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <motion.div {...scaleIn} className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
          <div className="rounded-2xl overflow-hidden border border-ink/15 bg-card shadow-sm">
            <img
              src="/assets/redesign/lekvya-screenshot.png"
              alt="The Lekvya web application, showing its client-communication automation homepage"
              width={1600}
              height={1000}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
          <div>
            <SectionKicker className="mb-3.5">Selected Work</SectionKicker>
            <h2 id="selected-work-heading" className="font-display text-[24px] sm:text-[30px] font-bold tracking-tight text-ink mb-4">
              Built for real workflows
            </h2>
            <p className="text-[14.5px] leading-relaxed text-muted mb-4">
              Lekvya is our AI-powered workflow and client-communication platform for Chartered Accountants and
              financial-service firms, built around scheduling, client management and document handling. It is live,
              and we built and run it ourselves.
            </p>
            <p className="text-[14.5px] leading-relaxed text-muted mb-5">
              We also build custom software for other businesses, including client work for Yugminds.
            </p>

            <ul className="flex flex-wrap gap-2 mb-6" aria-label="Capabilities used to build Lekvya">
              {LEKVYA_CAPABILITIES.map((c) => (
                <li
                  key={c}
                  className="px-3 py-1.5 rounded-lg bg-electric/[0.07] border border-electric/25 text-[13.5px] sm:text-[12.5px] font-display text-ink/80"
                >
                  {c}
                </li>
              ))}
            </ul>

            {/* No case-study route exists yet, so this points at the live
                product rather than inventing one.
                TODO: swap to an internal /work/lekvya case study when written. */}
            <div className="flex flex-wrap gap-3">
              <Button
                href="https://ca.navedhana.com/"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                onClick={() => trackEvent('cta_click', { location: 'services_lekvya' })}
              >
                Explore the project →
              </Button>
              <Button to="/products" variant="outline" size="sm">See all products</Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Beyond the software — Navedhana runs these too, but a software buyer
          should not meet them as peers of AI Engineering. Compact strip, links
          out, clearly labelled status. */}
      <section aria-labelledby="ventures-heading" className="py-10 sm:py-14 px-4 sm:px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div {...rise} className="mb-5">
            <h2 id="ventures-heading" className="font-display text-[15px] font-semibold text-ink mb-1">
              Beyond the software
            </h2>
            <p className="text-[13.5px] text-muted">
              Navedhana runs ventures outside its technology practice. They are separate from the engineering work above.
            </p>
          </motion.div>

          {/* Plain Links, not <Button>: Button splits a trailing arrow out of
              its label and applies its own padding, neither of which suits a
              two-line card — forcing it needed !important overrides. */}
          <motion.div {...staggerParent(0.09)} className="grid sm:grid-cols-2 gap-4">
            {OTHER_VENTURES.map((v) => (
              <motion.div key={v.title} variants={riseChild}>
                <Link
                  to={v.to}
                  className="group flex items-center gap-4 min-h-[44px] px-5 py-4 rounded-xl border border-ink/15 bg-primary hover:border-ink/25 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-surface transition-colors duration-300"
                >
                  <v.icon size={20} className="text-muted flex-shrink-0" aria-hidden="true" />
                  <span className="flex-1">
                    <span className="flex items-center gap-2 flex-wrap">
                      <span className="font-display text-[15px] font-semibold text-ink">{v.title}</span>
                      {v.status && (
                        <span className="px-2 py-0.5 rounded-full bg-ink/[0.06] text-muted font-display text-[10.5px] font-bold tracking-wide">
                          {v.status}
                        </span>
                      )}
                    </span>
                    <span className="block text-[13px] text-muted mt-0.5">{v.desc}</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-muted flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
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
            Discuss your project →
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
