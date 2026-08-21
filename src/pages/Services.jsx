import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Layers, Workflow, Box, Sprout, Gift, ArrowUpRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionKicker from '../components/ui/SectionKicker';
import AccentIcon from '../components/ui/AccentIcon';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';
import { slideLeft, blurIn, scaleIn, rise, staggerParent, riseChild } from '../lib/motion';

// One accent for all four, matching Home's capability cards — the per-service
// hues that used to live here were the same thing removed from those cards.
const ACCENT = 'var(--color-electric)';

// Home's "What We Do" cards list the same four capabilities. The difference
// that earns this page its "full breakdown" link from Home is `forWhom` and
// `deliver`: Home answers *what we do*, this answers *whether it is for you*
// and *what you actually end up with*. Nothing here is a claim about a
// specific past project — those live in the proof section below.
const GROUPS = [
  {
    title: 'AI Engineering',
    icon: Cpu,
    desc: 'Practical AI systems connected to your data, tools, and workflows.',
    forWhom: 'You have a process or a body of data that an off-the-shelf AI tool does not fit — it needs to read your systems, follow your rules, and be trusted with real work.',
    deliver: 'A working system integrated with your data sources, the evaluation to show where it is reliable, and the documentation to run it.',
    items: ['Generative AI', 'AI Applications', 'AI Agents', 'RAG Systems', 'Machine Learning', 'NLP', 'Computer Vision'],
  },
  {
    title: 'Custom Software',
    icon: Layers,
    desc: 'Web, desktop, mobile, and backend systems engineered for production.',
    forWhom: 'Packaged software almost fits, but the gaps are where your actual business happens — so you are running the difference on spreadsheets and email.',
    deliver: 'An application built around how you actually work, deployed, with the architecture and handover notes to maintain it.',
    items: ['Web Applications', 'Desktop Applications', 'Mobile Applications', 'Backend Systems', 'APIs', 'SaaS Platforms'],
  },
  {
    title: 'Intelligent Automation',
    icon: Workflow,
    desc: 'Automation that removes manual work from real business processes.',
    forWhom: 'Your team spends hours on repetitive steps — rekeying data, chasing documents, moving things between systems that do not talk.',
    deliver: 'The process mapped, the repetitive parts automated end to end, and monitoring so you know when something needs a human.',
    items: ['Workflow Automation', 'Browser Automation', 'Business Process Automation', 'Document Automation', 'AI-powered Workflows'],
  },
  {
    title: 'Product Engineering',
    icon: Box,
    desc: 'From first prototype to a production system that can grow.',
    forWhom: 'You have a product idea, or an early version that works but will not survive real usage, and you need it engineered rather than patched.',
    deliver: 'A prototype you can put in front of users, then the architecture and build to take it to production.',
    items: ['MVP Development', 'Product Architecture', 'Prototyping', 'Production Engineering', 'Existing Product Enhancement'],
  },
];

// The practical counterpart to Home's six-step engineering process: what a
// client actually experiences, rather than how we build. Durations and
// commercial terms are [TO CONFIRM] rather than invented — they are business
// facts, and a plausible guess here would be a promise we might not keep.
const ENGAGEMENT = [
  {
    title: 'First conversation',
    body: 'You tell us the problem. We ask what you have tried and what "solved" would look like. No cost, no obligation — sometimes the honest answer is that you do not need custom software.',
  },
  {
    title: 'Scoping',
    body: 'We work out what the system has to do, what it touches, and where the hard parts are, then come back with an approach and a shape for the work.',
  },
  {
    title: 'Build',
    body: 'We build in visible increments so you see progress and can redirect early, rather than waiting for a reveal at the end.',
  },
  {
    title: 'Handover and support',
    body: 'You get the running system, the source, and the documentation to operate it. Ongoing support is arranged separately if you want it.',
  },
];

// Secondary, deliberately: Navedhana also runs these, but this page is for
// software buyers and the hierarchy should say so. Both link out rather than
// expanding here.
const OTHER_VENTURES = [
  { title: 'Vegetables Supply', icon: Sprout, desc: 'Farm-fresh organic vegetables and seasonal produce.', to: '/vegetables', status: null },
  { title: 'Seasonal Products', icon: Gift, desc: 'Festive and seasonal products.', to: '/contact', status: 'Launching soon' },
];

const Services = () => (
  <div className="bg-primary">
    <PageHero
      kicker="What We Do"
      title="Technology built around real business problems"
      subtitle="From intelligent AI systems to complete digital products, we engineer technology end to end."
    />

    {/* Capabilities — the numbered deep-dive. Same four as Home, but each one
        answers who it is for and what you receive, which the Home teaser
        deliberately does not. */}
    <section className="pt-2 pb-12 sm:pb-16 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col">
        {GROUPS.map((grp, i) => (
          <motion.div
            key={grp.title}
            {...slideLeft}
            transition={{ duration: 0.5, delay: Math.min(i, 2) * 0.08 }}
            className="grid sm:grid-cols-[64px_1fr] gap-4 sm:gap-6 py-7 sm:py-10 border-t border-ink/15"
          >
            {/* At sm:+ the icon and index sit in their own left rail. Below
                that the rail collapses under the heading, so the icon moves
                inline with the title instead and the index is dropped — a bare
                "01" floating above a heading reads as a stray number. */}
            <div className="hidden sm:flex sm:flex-col items-start gap-3">
              <AccentIcon accent={ACCENT} className="w-12 h-12">
                <grp.icon size={22} />
              </AccentIcon>
              <span className="font-display text-sm font-bold text-ink/25 mt-1">{String(i + 1).padStart(2, '0')}</span>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2.5">
                <AccentIcon accent={ACCENT} className="w-10 h-10 sm:hidden">
                  <grp.icon size={19} />
                </AccentIcon>
                <h2 className="font-display text-[19px] sm:text-[24px] font-semibold text-ink">{grp.title}</h2>
              </div>
              <p className="text-[14.5px] leading-relaxed text-muted mb-5 max-w-[560px]">{grp.desc}</p>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-5 max-w-[680px]">
                <div className="border-l-2 border-electric/30 pl-4">
                  <h3 className="font-display text-[11.5px] font-bold uppercase tracking-[0.1em] text-royal mb-1.5">
                    When you need it
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-muted">{grp.forWhom}</p>
                </div>
                <div className="border-l-2 border-electric/30 pl-4">
                  <h3 className="font-display text-[11.5px] font-bold uppercase tracking-[0.1em] text-royal mb-1.5">
                    What you get
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-muted">{grp.deliver}</p>
                </div>
              </div>

              <motion.div {...staggerParent(0.04)} className="flex flex-wrap gap-2">
                {grp.items.map((it) => (
                  <motion.span
                    key={it}
                    variants={riseChild}
                    className="px-3.5 py-2 rounded-lg bg-electric/[0.07] border border-electric/25 text-[13.5px] sm:text-[12.5px] font-display text-ink/80"
                  >
                    {it}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-ink/15" />
      </div>
    </section>

    {/* How an engagement runs — dark, both for rhythm against the light
        sections either side and because it is the part a buyer actually
        needs before they will contact you. */}
    <section className="dark-scope bg-[var(--hero-bg)] py-12 sm:py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div {...blurIn} className="max-w-xl mb-10 sm:mb-12">
          <SectionKicker className="mb-3.5">How We Work Together</SectionKicker>
          <h2 className="font-display text-[26px] sm:text-[34px] font-bold tracking-tight leading-[1.15] text-ink mb-4">
            What happens after you get in touch
          </h2>
          <p className="text-[14.5px] leading-relaxed text-muted">
            Typical project length and commercial terms depend on scope —{' '}
            <strong className="text-ink font-semibold">[TO CONFIRM]</strong>. Ask us on the first call and we will be
            straight with you.
          </p>
        </motion.div>

        <motion.ol {...staggerParent(0.1)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15 border border-ink/15 rounded-2xl overflow-hidden">
          {ENGAGEMENT.map((step, i) => (
            <motion.li key={step.title} variants={riseChild} className="bg-[var(--hero-bg)] p-6 sm:p-7">
              <span className="font-display text-[12.5px] font-bold text-electric tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[16px] font-semibold text-ink mt-3 mb-2">{step.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>

    {/* Proof — the page's weakest point before this pass was that it made
        claims with nothing behind them. Lekvya is live and linkable. */}
    <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto">
      <motion.div {...scaleIn} className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center">
        <div className="rounded-2xl overflow-hidden border border-ink/15 bg-card shadow-sm">
          <img
            src="/assets/redesign/lekvya-screenshot.png"
            alt="The Lekvya web app, showing its client-communication automation homepage"
            width={1600}
            height={1000}
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
        <div>
          <SectionKicker className="mb-3.5">Built With This</SectionKicker>
          <h2 className="font-display text-[24px] sm:text-[30px] font-bold tracking-tight text-ink mb-4">
            We use our own services first
          </h2>
          <p className="text-[14.5px] leading-relaxed text-muted mb-4">
            Lekvya is our AI-powered workflow and client-communication platform for Chartered Accountants and
            financial-service firms. It is built with the same four capabilities listed on this page, and it is live.
          </p>
          <p className="text-[14.5px] leading-relaxed text-muted mb-6">
            We also build custom software for other businesses — including client work for Yugminds.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="https://ca.navedhana.com/" target="_blank" rel="noopener noreferrer" size="sm">
              Explore Lekvya →
            </Button>
            <Button to="/products" variant="outline" size="sm">See our products</Button>
          </div>
        </div>
      </motion.div>
    </section>

    {/* Other ventures — mentioned, not promoted. Navedhana runs these too, but
        this page is for software buyers, so they get a compact strip and a
        link out rather than parity with the capabilities above. */}
    <section className="py-10 sm:py-14 px-4 sm:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.p {...rise} className="font-display text-[11.5px] font-bold uppercase tracking-[0.12em] text-muted mb-5">
          Navedhana also runs
        </motion.p>
        {/* Plain Links rather than <Button>: Button splits a trailing arrow
            glyph out of its label and applies variant padding, neither of
            which suits a two-line card, and forcing it here needed a row of
            !important overrides. */}
        <motion.div {...staggerParent(0.09)} className="grid sm:grid-cols-2 gap-4">
          {OTHER_VENTURES.map((v) => (
            <motion.div key={v.title} variants={riseChild}>
              <Link
                to={v.to}
                className="group flex items-center gap-4 min-h-[44px] px-5 py-4 rounded-xl border border-ink/15 bg-primary hover:border-ink/25 hover:bg-card transition-colors duration-300"
              >
                <v.icon size={20} className="text-muted flex-shrink-0" />
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
          Describe the problem and we will tell you what it actually takes — including if that is nothing.
        </p>
        <Button to="/contact" onClick={() => trackEvent('cta_click', { location: 'services' })}>
          Discuss your project →
        </Button>
      </motion.div>
    </section>
  </div>
);

export default Services;
