import React from 'react';
import { useDrawPath } from '../../hooks/useDrawPath';
import { useCycle } from '../../hooks/useCycle';

// Generic step-sequence simulation — "don't describe the workflow, simulate
// it". Reused by ServiceCard mini-simulations and the /services documentary
// timeline (same primitive, different step data, per plan Animation Architecture).
const StepFlow = ({ steps, className = '' }) => {
  const { ref, active } = useDrawPath({ once: false });
  const activeIndex = useCycle(active ? steps.length : 0, 550);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-1.5 flex-wrap font-mono text-[11px] uppercase tracking-wide ${className}`}
    >
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <span
            className={`whitespace-nowrap transition-colors duration-base ${
              i === activeIndex ? 'text-electric' : 'text-muted/50'
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span
              className={`transition-colors duration-base ${
                i === activeIndex ? 'text-electric' : 'text-muted/30'
              }`}
            >
              &rarr;
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepFlow;
