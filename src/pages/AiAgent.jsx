import React from 'react';
import { motion } from 'framer-motion';
import SectionKicker from '../components/ui/SectionKicker';
import RequestFlow from '../components/ui/RequestFlow';
import Button from '../components/ui/Button';
import { trackEvent } from '../lib/analytics';
import { rise, tiltIn, scaleIn } from '../lib/motion';

const FLOW = [
  'User request',
  'AI system interprets the task',
  'Reasoning over steps needed',
  'Calls tools / APIs / data sources',
  'Acts on business systems',
  'Returns a completed result',
];

const CAPABILITIES = ['Task planning', 'Tool use', 'API integration', 'Memory / context', 'Human-in-the-loop review', 'Workflow triggers'];

const AiAgent = () => {
  return (
  <div className="bg-primary">
    <section className="pt-[104px] sm:pt-[168px] pb-6 px-4 sm:px-8 max-w-7xl mx-auto text-center">
      <motion.div {...rise} className="max-w-2xl mx-auto">
        <SectionKicker centered className="mb-3.5">AI Agent</SectionKicker>
        <h1 className="font-display text-[28px] sm:text-[44px] font-semibold tracking-tight text-ink leading-tight mb-3.5">
          An agent built to act, not just answer
        </h1>
        <span className="inline-block px-3 py-1.5 rounded-full bg-ink/[0.06] text-muted font-display text-[11.5px] sm:text-[10.5px] font-bold tracking-wide">
          IN DEVELOPMENT
        </span>
      </motion.div>
    </section>

    <section className="py-6 px-4 sm:px-8 max-w-2xl mx-auto">
      <motion.div {...tiltIn} className="flex flex-col gap-7">
        <div>
          <h3 className="font-display text-[17px] font-semibold text-ink mb-2">What it is</h3>
          <p className="text-[14.5px] leading-relaxed text-muted">
            A general-purpose AI agent capability we're developing in-house — one that can reason over a task and act
            through tools and APIs, rather than just answering a question in a chat window.
          </p>
        </div>
        <div>
          <h3 className="font-display text-[17px] font-semibold text-ink mb-2">What problem it solves</h3>
          <p className="text-[14.5px] leading-relaxed text-muted">
            Most "AI features" stop at generating text. An agent that can call tools, read and write data, and follow
            a multi-step process closes the gap between an answer and a completed task.
          </p>
        </div>
        <div>
          <h3 className="font-display text-[17px] font-semibold text-ink mb-3">How it works</h3>
          <RequestFlow steps={FLOW} />
        </div>
        <div>
          <h3 className="font-display text-[17px] font-semibold text-ink mb-3">Capabilities we're building toward</h3>
          <div className="flex flex-wrap gap-2">
            {CAPABILITIES.map((c) => (
              <span key={c} className="px-3.5 py-2 rounded-lg bg-ink/[0.045] border border-ink/15 text-[13.5px] sm:text-[12.5px] font-display text-ink/80">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-[17px] font-semibold text-ink mb-2">Current status</h3>
          <p className="text-[14.5px] leading-relaxed text-muted">
            This is an internal capability under active development — it's not yet a packaged product, and a public
            demo isn't available. We use what we learn building it in the AI systems we deliver for clients today.
          </p>
        </div>
      </motion.div>
    </section>

    <section className="py-10 sm:py-16 mt-6 px-4 sm:px-8 text-center bg-surface">
      <motion.div {...scaleIn} className="max-w-xl mx-auto">
        <h2 className="font-display text-2xl sm:text-[28px] font-bold tracking-tight text-ink mb-2.5">Have an agent use case in mind?</h2>
        <p className="text-sm text-muted mb-6">We build practical AI agents and automation for real workflows, today.</p>
        <Button to="/contact" size="sm" onClick={() => trackEvent('cta_click', { location: 'ai_agent' })}>
          Talk to us about AI agents →
        </Button>
      </motion.div>
    </section>
  </div>
  );
};

export default AiAgent;
