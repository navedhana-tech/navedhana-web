import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionKicker from '../components/ui/SectionKicker';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';

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

const About = () => (
  <div className="bg-primary">
    <section className="pt-[168px] pb-10 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.div {...fadeUp} className="max-w-2xl">
        <SectionKicker className="mb-3.5">About Navedhana</SectionKicker>
        <h1 className="font-display text-[32px] sm:text-[50px] font-semibold tracking-tight text-ink leading-tight">
          Software and AI, built by people who ship
        </h1>
        <p className="text-[15.5px] leading-relaxed text-muted mt-4 max-w-xl">
          Founded in 2023. Still small. We'd rather ship one thing well than announce ten things we haven't built yet.
        </p>
      </motion.div>
    </section>

    <section className="py-4 pb-16 px-4 sm:px-8 max-w-3xl mx-auto">
      <motion.div {...fadeUp} className="flex flex-col gap-7">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink mb-2.5">What we build</h3>
          <p className="text-[14.5px] leading-relaxed text-muted">
            We build our own products, and we build custom software for other businesses — with the same engineering
            standard either way. That means AI systems that connect to real data and tools, not demos; software
            architecture that holds up in production, not just in a pitch.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink mb-2.5">Our approach</h3>
          <p className="text-[14.5px] leading-relaxed text-muted">
            We start with the business problem, not the technology — then move from discovery through architecture,
            iterative engineering, validation, and deployment.{' '}
            <Link to="/" className="text-electric hover:underline">See how we work</Link>.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink mb-2.5">Where we are today</h3>
          <p className="text-[14.5px] leading-relaxed text-muted">
            Lekvya, our AI-powered workflow platform for Chartered Accountants, is live and used by 2 active CA
            customers. We're also building Data Factory and a QA Foundation Platform, both currently in development,
            and we build custom software for clients like Yugminds.{' '}
            <Link to="/products" className="text-electric hover:underline">See our products</Link> or{' '}
            <Link to="/work" className="text-electric hover:underline">our work</Link>.
          </p>
        </div>
      </motion.div>
    </section>

    <section className="py-16 px-4 sm:px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="max-w-xl mx-auto mb-10 text-center">
          <SectionKicker centered className="mb-3.5">What We Believe</SectionKicker>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15 rounded-2xl overflow-hidden">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }} className="bg-primary p-6">
              <h4 className="font-display text-[15.5px] font-semibold text-ink mb-2">{p.title}</h4>
              <p className="text-[13px] leading-snug text-muted">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.div {...fadeUp} className="max-w-xl mx-auto mb-8 text-center">
        <SectionKicker centered className="mb-3.5">Technology</SectionKicker>
        <h2 className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-ink">What we build with</h2>
      </motion.div>
      <div className="max-w-3xl mx-auto flex flex-col">
        {TECH_GROUPS.map((g) => (
          <div key={g.label} className="grid sm:grid-cols-[150px_1fr] gap-5 py-4 border-t border-ink/15">
            <span className="font-display text-[11.5px] font-bold tracking-wide uppercase text-royal">{g.label}</span>
            <span className="text-[13.5px] text-ink/70">{g.items}</span>
          </div>
        ))}
        <p className="text-[13px] text-muted mt-5 text-center sm:text-left">
          Not on this list? <Link to="/contact" className="text-electric hover:underline">Ask us about your stack</Link> —
          this is what we reach for most, not the limit of what we work with.
        </p>
      </div>
    </section>

    <section className="py-16 px-4 sm:px-8 text-center">
      <motion.div {...fadeUp} className="max-w-xl mx-auto">
        <h2 className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-ink mb-3">Want to talk through a project?</h2>
        <Button to="/contact" className="mt-1" onClick={() => trackEvent('cta_click', { location: 'about' })}>
          Discuss Your Project →
        </Button>
      </motion.div>
    </section>
  </div>
);

export default About;
