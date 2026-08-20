import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Target, Eye, ShieldCheck, Lightbulb, Gem, HeartHandshake, Compass, Wrench } from 'lucide-react';
import SectionKicker from '../components/ui/SectionKicker';
import PageHero from '../components/ui/PageHero';
import AccentIcon from '../components/ui/AccentIcon';
import Button from '../components/ui/Button';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { canHover } from '../lib/canHover';
import { trackEvent } from '../lib/analytics';

// The four accents used sitewide for category coding (same order/hues as
// Services and Home), deepened for light backgrounds.
const ACCENTS = ['#0958d6', '#0d9488', '#0369a1', '#6D5CE7'];

const STATS = [
  { value: '2023', label: 'Founded' },
  { value: '4', label: 'Core capabilities' },
];

const MISSION_VISION = [
  {
    label: 'Our Mission',
    icon: Target,
    accent: ACCENTS[0],
    body:
      'To empower businesses and communities with sustainable technology — robust software systems, practical AI, and automation that removes real work. We aim to be a trusted partner in growth and long-term capability, not a one-off vendor.',
  },
  {
    label: 'Our Vision',
    icon: Eye,
    accent: ACCENTS[1],
    body:
      'To create a future where technology deepens human connection rather than replacing it — where digital innovation leaves the people and businesses it touches healthier, better connected, and more capable than it found them.',
  },
];

const VALUES = [
  { title: 'Integrity', icon: ShieldCheck, desc: 'Honesty and transparency in all our dealings.' },
  { title: 'Innovation', icon: Lightbulb, desc: 'Constantly pushing boundaries to find better solutions.' },
  { title: 'Quality', icon: Gem, desc: 'Uncompromising standards in products and services.' },
  { title: 'Customer Focus', icon: HeartHandshake, desc: 'Your success and satisfaction are our top priority.' },
  { title: 'Problem-first thinking', icon: Compass, desc: 'We start with the business problem, not the technology.' },
  { title: 'Engineering-led', icon: Wrench, desc: 'We care about architecture, reliability and maintainability.' },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

// Shared stagger shapes. `revealItem` is the clip-reveal (translateY inside an
// overflow-hidden wrapper) already used by ProductsTeaser for the one line
// meant to carry a section — reused here for the stat figures, which read far
// better sliding up from a mask than counting from zero at these magnitudes.
const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const fadeItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};
const revealItem = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const STORY = [
  {
    title: 'What we build',
    body: (
      <>
        We build our own products, and we build custom software for other businesses — with the same engineering
        standard either way. That means AI systems that connect to real data and tools, not demos; software
        architecture that holds up in production, not just in a pitch.
      </>
    ),
  },
  {
    title: 'Our approach',
    body: (
      <>
        We start with the business problem, not the technology — then move from discovery through architecture,
        iterative engineering, validation, and deployment.{' '}
        <Button to="/" variant="link" size="inline">See how we work</Button>.
      </>
    ),
  },
  {
    title: 'Where we are today',
    body: (
      <>
        Lekvya, our AI-powered workflow platform for Chartered Accountants, is live. We're also building Data
        Factory and a QA Foundation Platform, both currently in development, and we build custom software for
        clients like Yugminds.{' '}
        <Button to="/products" variant="link" size="inline">See our products</Button>.
      </>
    ),
  },
];

const About = () => {
  const reducedMotion = useReducedMotion();
  const storyRef = useRef(null);
  // Progress line for the story timeline — bound to the section's own scroll
  // range rather than the page's, so it fills exactly as the three blocks pass
  // through the viewport.
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start 0.85', 'end 0.55'] });

  // Also gated on a real pointer, not just reduced-motion: on touch the
  // spotlight it drives is never visible (its CSS is behind `hover: hover`),
  // so the handler would be pure work for no effect.
  const onCardMove =
    reducedMotion || !canHover()
      ? undefined
      : (e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
        };

  return (
    <div className="bg-primary">
      <PageHero
        kicker="Our Story"
        title="Driving innovation, delivering excellence"
        subtitle="Navedhana bridges traditional values and modern technology. Founded in 2023, still small — we'd rather ship one thing well than announce ten things we haven't built yet."
      >
        <motion.dl
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-x-4 sm:gap-x-6 w-full sm:max-w-sm mx-auto pt-2 sm:pt-4"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="text-center">
              <div className="overflow-hidden">
                <motion.dd
                  variants={revealItem}
                  className="font-display text-[30px] sm:text-[36px] font-bold tracking-tight leading-none"
                  style={{ color: ACCENTS[i] }}
                >
                  {s.value}
                </motion.dd>
              </div>
              <motion.dt
                variants={fadeItem}
                className="font-display text-[11.5px] sm:text-[10.5px] font-bold tracking-[0.12em] uppercase text-muted mt-2.5"
              >
                {s.label}
              </motion.dt>
            </div>
          ))}
        </motion.dl>
      </PageHero>

      {/* Story — a scroll-drawn timeline rather than three stacked paragraphs.
          The rule on the left fills as the section passes the viewport and each
          block arrives on its own, so the page's longest stretch of prose reads
          as a sequence instead of a wall. */}
      <section className="py-9 sm:py-14 px-4 sm:px-8">
        <div ref={storyRef} className="relative max-w-3xl mx-auto pl-9 sm:pl-12">
          <div className="absolute left-[7px] sm:left-[10px] top-3 bottom-3 w-px bg-ink/15" aria-hidden="true" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-[7px] sm:left-[10px] top-3 bottom-3 w-px origin-top bg-gradient-to-b from-electric to-royal"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-8 sm:gap-11">
            {STORY.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -left-9 sm:-left-12 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-primary"
                  style={{ background: ACCENTS[i], boxShadow: `0 0 0 3px color-mix(in srgb, ${ACCENTS[i]} 22%, transparent)` }}
                  aria-hidden="true"
                />
                <h3 className="font-display text-[19px] font-semibold text-ink mb-2.5">{s.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-muted">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-8 bg-surface">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="max-w-xl mx-auto mb-10 text-center">
            <SectionKicker centered className="mb-3.5">Purpose</SectionKicker>
            <h2 className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-ink">Why we do this</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {MISSION_VISION.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={onCardMove}
                className="glow-card rounded-2xl border border-ink/15 bg-card p-5 sm:p-8"
                style={{ '--accent': m.accent, borderTopColor: m.accent, borderTopWidth: '3px' }}
              >
                <AccentIcon accent={m.accent} className="w-12 h-12 mb-5">
                  <m.icon size={22} />
                </AccentIcon>
                <h3 className="font-display text-[20px] font-semibold text-ink mb-3">{m.label}</h3>
                <p className="text-[14.5px] leading-relaxed text-muted">{m.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="max-w-xl mx-auto mb-10 text-center">
            <SectionKicker centered className="mb-3.5">What We Believe</SectionKicker>
            <h2 className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-ink">Our core values</h2>
            <p className="text-[14.5px] text-muted mt-3.5">The principles that guide every decision we make.</p>
          </motion.div>
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15 rounded-2xl overflow-hidden"
          >
            {VALUES.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeItem}
                className="value-cell bg-primary p-5 sm:p-7 hover:bg-card"
                style={{ '--accent': ACCENTS[i % ACCENTS.length] }}
              >
                <AccentIcon accent={ACCENTS[i % ACCENTS.length]} className="w-10 h-10 mb-4">
                  <p.icon size={19} />
                </AccentIcon>
                <h4 className="font-display text-[15.5px] font-semibold text-ink mb-2">{p.title}</h4>
                <p className="text-[14px] sm:text-[13px] leading-snug text-muted">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-8 text-center">
        <motion.div {...fadeUp} className="max-w-xl mx-auto">
          <h2 className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-ink mb-3">Want to talk through a project?</h2>
          <Button to="/contact" className="mt-1" onClick={() => trackEvent('cta_click', { location: 'about' })}>
            Discuss Your Project →
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
