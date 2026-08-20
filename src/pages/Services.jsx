import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers, Workflow, Box } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import AccentIcon from '../components/ui/AccentIcon';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';

// Same four capabilities Home's "What We Do" cards show, in the same order —
// icon and accent mirror that section so the two pages read as one system,
// while the layout here stays the numbered deep-dive rather than a repeat of
// Home's card grid. Accents are deepened for the light background.
const GROUPS = [
  { title: 'AI Engineering', icon: Cpu, accent: '#0958d6', desc: 'Practical AI systems connected to your data, tools, and workflows.', items: ['Generative AI','AI Applications', 'AI Agents', 'RAG Systems', 'Machine Learning', 'NLP', 'Computer Vision'] },
  { title: 'Custom Software', icon: Layers, accent: '#0d9488', desc: 'Web, desktop, mobile, and backend systems engineered for production.', items: ['Web Applications', 'Desktop Applications', 'Mobile Applications', 'Backend Systems', 'APIs', 'SaaS Platforms'] },
  { title: 'Intelligent Automation', icon: Workflow, accent: '#0369a1', desc: 'Automation that removes manual work from real business processes.', items: ['Workflow Automation', 'Browser Automation', 'Business Process Automation', 'Document Automation', 'AI-powered Workflows'] },
  { title: 'Product Engineering', icon: Box, accent: '#6D5CE7', desc: 'From first prototype to a production system that can grow.', items: ['MVP Development', 'Product Architecture', 'Prototyping', 'Production Engineering', 'Existing Product Enhancement'] },
];

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const Services = () => (
  <div className="bg-primary">
    <PageHero
      kicker="What We Do"
      title="Technology built around real business problems"
      subtitle="From intelligent AI systems to complete digital products, we engineer technology end to end."
    />

    <section className="py-6 pb-[72px] px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col">
        {GROUPS.map((grp, i) => (
          <motion.div
            key={grp.title}
            {...fadeUp}
            transition={{ duration: 0.5, delay: i * 0.09 }}
            className="grid sm:grid-cols-[64px_1fr] gap-4 sm:gap-6 py-6 sm:py-8 border-t border-ink/15"
          >
            {/* At sm:+ the icon and index sit in their own left rail. Below
                that the rail collapses under the heading, so the icon moves
                inline with the title instead and the index is dropped — a bare
                "01" floating above a heading reads as a stray number. */}
            <div className="hidden sm:flex sm:flex-col items-start gap-3">
              <AccentIcon accent={grp.accent} className="w-12 h-12">
                <grp.icon size={22} />
              </AccentIcon>
              <span className="font-display text-sm font-bold text-ink/25 mt-1">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2.5">
                <AccentIcon accent={grp.accent} className="w-10 h-10 sm:hidden">
                  <grp.icon size={19} />
                </AccentIcon>
                <h3 className="font-display text-[19px] sm:text-[22px] font-semibold text-ink">{grp.title}</h3>
              </div>
              <p className="text-[14px] leading-relaxed text-muted mb-4 max-w-[480px]">{grp.desc}</p>
              <div className="flex flex-wrap gap-2">
                {grp.items.map((it) => (
                  <span
                    key={it}
                    className="px-3.5 py-2 rounded-lg border text-[13.5px] sm:text-[12.5px] font-display text-ink/80"
                    style={{
                      background: `color-mix(in srgb, ${grp.accent} 7%, transparent)`,
                      borderColor: `color-mix(in srgb, ${grp.accent} 25%, transparent)`,
                    }}
                  >
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
