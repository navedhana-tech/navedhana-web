import React from 'react';
import { motion } from 'framer-motion';

// Numbered vertical step list with a connecting line and a flowing dot —
// used identically on Home's "AI Engineering" section and the AI Agent
// page's "How it works" section. One component, two call sites.
const RequestFlow = ({ steps, label }) => (
  <div className="flex flex-col gap-2.5 p-6 rounded-2xl bg-primary border border-ink/15">
    {label && (
      <span className="font-display text-[11px] font-bold tracking-[0.1em] uppercase text-muted/70 mb-1">
        {label}
      </span>
    )}
    {steps.map((step, i) => (
      <React.Fragment key={step}>
        <div className="flex items-center gap-2.5">
          <span className="font-display text-[11px] text-ink/30 w-4 flex-shrink-0">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 px-3.5 py-2.5 rounded-lg bg-ink/[0.035] font-display text-sm font-semibold text-ink">
            {step}
          </div>
        </div>
        {i < steps.length - 1 && (
          <div className="relative ml-[7px] w-px h-2.5 bg-ink/15">
            <motion.span
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-electric"
              animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: i * 0.15 }}
            />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
);

export default RequestFlow;
