import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Horizontal, wrapping chip flow — reads as an actual left-to-right pipeline
// instead of a vertical numbered checklist. Used identically on Home's
// "AI Engineering" section and the AI Agent page's "How it works" section.
const RequestFlow = ({ steps, label }) => (
  <div className="p-6 rounded-2xl bg-primary border border-ink/15">
    {label && (
      <span className="font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted/70 mb-4 block">
        {label}
      </span>
    )}
    <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-center gap-2 pl-2 pr-3.5 py-2 rounded-full bg-electric/[0.06] border border-electric/20"
          >
            <span className="w-5 h-5 rounded-full bg-electric text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="font-display text-[13px] font-semibold text-ink whitespace-nowrap">
              {step}
            </span>
          </motion.div>
          {i < steps.length - 1 && (
            <ArrowRight size={15} className="text-electric/40 flex-shrink-0" aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default RequestFlow;
