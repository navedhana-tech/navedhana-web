import React from 'react';
import { motion } from 'framer-motion';
import SectionKicker from '../components/ui/SectionKicker';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';

const GROUPS = [
  { title: 'AI Engineering', desc: 'Practical AI systems connected to your data, tools, and workflows.', items: ['AI Applications', 'AI Agents', 'RAG Systems', 'Machine Learning', 'NLP', 'Computer Vision'] },
  { title: 'Custom Software', desc: 'Web, desktop, mobile, and backend systems engineered for production.', items: ['Web Applications', 'Desktop Applications', 'Mobile Applications', 'Backend Systems', 'APIs', 'SaaS Platforms'] },
  { title: 'Intelligent Automation', desc: 'Automation that removes manual work from real business processes.', items: ['Workflow Automation', 'Browser Automation', 'Business Process Automation', 'Document Automation', 'AI-powered Workflows'] },
  { title: 'Product Engineering', desc: 'From first prototype to a production system that can grow.', items: ['MVP Development', 'Product Architecture', 'Prototyping', 'Production Engineering', 'Existing Product Enhancement'] },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const Services = () => (
  <div className="bg-primary">
    <section className="pt-[168px] pb-6 px-4 sm:px-8 max-w-7xl mx-auto text-center">
      <motion.div {...fadeUp} className="max-w-2xl mx-auto">
        <SectionKicker centered className="mb-3.5">What We Do</SectionKicker>
        <h1 className="font-display text-[30px] sm:text-[46px] font-semibold tracking-tight text-ink leading-tight mb-4">
          Technology built around real business problems
        </h1>
        <p className="text-[15px] leading-relaxed text-muted">
          From intelligent AI systems to complete digital products, we engineer technology end to end.
        </p>
      </motion.div>
    </section>

    <section className="py-6 pb-[72px] px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col">
        {GROUPS.map((grp, i) => (
          <motion.div
            key={grp.title}
            {...fadeUp}
            transition={{ duration: 0.5, delay: i * 0.09 }}
            className="grid sm:grid-cols-[56px_1fr] gap-6 py-8 border-t border-ink/15"
          >
            <span className="font-display text-sm text-ink/25">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="font-display text-[22px] font-semibold text-ink mb-2.5">{grp.title}</h3>
              <p className="text-[14px] leading-relaxed text-muted mb-4 max-w-[480px]">{grp.desc}</p>
              <div className="flex flex-wrap gap-2">
                {grp.items.map((it) => (
                  <span key={it} className="px-3.5 py-2 rounded-lg bg-ink/[0.045] border border-ink/15 text-[12.5px] font-display text-ink/80">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-ink/15" />
      </div>
      <motion.div {...fadeUp} className="text-center mt-11">
        <Button to="/contact" size="sm" onClick={() => trackEvent('cta_click', { location: 'services' })}>
          Discuss your project →
        </Button>
      </motion.div>
    </section>
  </div>
);

export default Services;
