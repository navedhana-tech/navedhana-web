import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionKicker from '../components/ui/SectionKicker';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';

// Selected Work — a capability showcase, not a project gallery. Every entry
// below reuses ONLY facts already stated elsewhere in this codebase (Home.jsx,
// Products.jsx, About.jsx, AiAgent.jsx) — no invented metrics, clients, roles,
// or tech stacks. Anything not yet confirmed is a code comment, not
// user-visible copy, so the live page never shows a "TODO" to a visitor.
const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

// Engineering-capability entries — same problem/approach/status narrative
// voice AiAgent.jsx already established, applied consistently across all
// four. Kept text-forward and numbered (Services.jsx's own pattern) rather
// than a screenshot-card grid — the section is proof of thinking, not a
// visual portfolio.
const CAPABILITY_ENTRIES = [
  {
    name: 'Lekvya',
    status: 'Live — 2 active customers',
    statusTone: 'live',
    problem:
      'Chartered Accountants and financial-service firms run client communication, scheduling, and document handling across disconnected tools.',
    approach:
      'An AI-powered workflow and client-communication platform purpose-built for CA practice — scheduling, client management, and document handling in one system.',
    proof: 'Live today, in active use by 2 CA firms.',
    link: { to: null, href: 'https://ca.navedhana.com/', label: 'Explore Lekvya →' },
  },
  {
    name: 'QA Foundation Platform',
    status: 'In development',
    statusTone: 'dev',
    problem:
      'Manual and script-based software testing doesn’t scale with how fast real products change.',
    approach:
      'An intelligent QA and software-testing platform focused on automated testing and the engineering infrastructure behind it.',
    proof: 'In active development — this is engineering infrastructure we’re building for ourselves first.',
    link: null,
  },
  {
    name: 'AI Agent',
    status: 'In development',
    statusTone: 'dev',
    problem:
      'Most "AI features" stop at generating text — they don’t close the gap between an answer and a completed task.',
    approach:
      'An agent that reasons over a request and acts through tools, APIs, and data — task planning, tool use, and workflow triggers, not a chat window.',
    proof: 'An internal capability under active development, already informing the AI systems we build for clients today.',
    link: { to: '/ai-agent', href: null, label: 'Read more about our AI Agent →' },
  },
  {
    name: 'Data Factory',
    status: 'In development',
    statusTone: 'dev',
    problem:
      'Growing products outgrow ad-hoc data pipelines before anyone plans for it.',
    approach:
      'A data engineering platform we’re building in-house. More detail as it nears release.',
    proof: null,
    link: null,
  },
];

const STATUS_STYLE = {
  live: 'bg-amber/15 text-amber-text',
  dev: 'bg-ink/[0.06] text-muted',
};

const Work = () => (
  <div className="bg-primary">
    <section className="pt-[168px] pb-6 px-4 sm:px-8 max-w-7xl mx-auto text-center">
      <motion.div {...fadeUp} className="max-w-2xl mx-auto">
        <SectionKicker centered className="mb-3.5">Selected Work</SectionKicker>
        <h1 className="font-display text-[30px] sm:text-[46px] font-semibold tracking-tight text-ink leading-tight mb-4">
          Engineering thinking, not a project gallery
        </h1>
        <p className="text-[15px] leading-relaxed text-muted">
          A closer look at how we approach real problems — the systems we've built for ourselves, and for the
          businesses we work with.
        </p>
      </motion.div>
    </section>

    {/* Client case study — the one full external engagement, given the
        deeper problem/approach/engagement treatment a case study deserves,
        distinct from the in-house capability entries below. */}
    <section className="py-6 pb-10 px-4 sm:px-8 max-w-[1120px] mx-auto">
      <motion.div {...fadeUp} className="rounded-2xl border border-ink/15 bg-card p-8 sm:p-11">
        <span className="inline-block mb-5 px-2.5 py-1 rounded-full bg-ink/[0.06] text-muted font-display text-[10.5px] font-bold tracking-wide">
          CLIENT ENGAGEMENT
        </span>
        <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-ink mb-5">
          Yugminds — Robocoders Desktop App
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-[12px] font-bold uppercase tracking-wide text-royal mb-2">The engagement</h3>
            <p className="text-[14px] leading-relaxed text-muted">
              Yugminds needed a desktop application built in the same category as OpenBlocks — engineered end to
              end as a full-cycle client project, from architecture through delivery.
            </p>
          </div>
          <div>
            <h3 className="font-display text-[12px] font-bold uppercase tracking-wide text-royal mb-2">What we owned</h3>
            <p className="text-[14px] leading-relaxed text-muted">
              Full-cycle custom software development — we didn't just implement a spec, we carried the product
              from technical approach through to a shipped desktop application.
            </p>
          </div>
        </div>
        {/* NOTE for confirmation, not shown on the page: architecture detail,
            tech stack, and outcome/results for Robocoders aren't documented
            anywhere in the current codebase — add here once confirmed,
            following the same problem/approach/proof structure as the
            capability entries below. */}
      </motion.div>
    </section>

    {/* In-house capability proof */}
    <section className="py-6 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.div {...fadeUp} className="max-w-xl mx-auto mb-10 text-center">
        <SectionKicker centered className="mb-3.5">What We Build For Ourselves</SectionKicker>
        <h2 className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-ink">
          We build our own products before we ask anyone to trust us with theirs
        </h2>
      </motion.div>
      <div className="flex flex-col">
        {CAPABILITY_ENTRIES.map((entry, i) => (
          <motion.div
            key={entry.name}
            {...fadeUp}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="grid sm:grid-cols-[56px_1fr] gap-6 py-8 border-t border-ink/15"
          >
            <span className="font-display text-sm text-ink/25">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="font-display text-[19px] font-semibold text-ink">{entry.name}</h3>
                <span className={`px-2.5 py-1 rounded-full font-display text-[10.5px] font-bold tracking-wide ${STATUS_STYLE[entry.statusTone]}`}>
                  {entry.status}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
                <div>
                  <span className="block font-display text-[11px] font-bold uppercase tracking-wide text-muted/60 mb-1.5">
                    The problem
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-muted">{entry.problem}</p>
                </div>
                <div>
                  <span className="block font-display text-[11px] font-bold uppercase tracking-wide text-muted/60 mb-1.5">
                    Our approach
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-muted">{entry.approach}</p>
                </div>
              </div>
              {entry.proof && <p className="text-[13px] text-ink/70 mt-3.5">{entry.proof}</p>}
              {entry.link && (
                entry.link.to ? (
                  <Link to={entry.link.to} className="inline-block mt-3.5 text-[13px] font-semibold text-electric hover:underline">
                    {entry.link.label}
                  </Link>
                ) : (
                  <a
                    href={entry.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3.5 text-[13px] font-semibold text-electric hover:underline"
                  >
                    {entry.link.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        ))}
        <div className="border-t border-ink/15" />
      </div>
    </section>

    <section className="py-14 px-4 sm:px-8 text-center bg-surface">
      <motion.div {...fadeUp} className="max-w-xl mx-auto">
        <h2 className="font-display text-2xl sm:text-[28px] font-bold tracking-tight text-ink mb-2.5">Have a problem worth solving?</h2>
        <p className="text-sm text-muted mb-6">
          <Link to="/products" className="text-electric hover:underline">See our full product lineup</Link> or tell us what you're building.
        </p>
        <Button to="/contact" size="sm" onClick={() => trackEvent('cta_click', { location: 'work' })}>
          Discuss Your Project →
        </Button>
      </motion.div>
    </section>
  </div>
);

export default Work;
