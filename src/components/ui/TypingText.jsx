import React from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Terminal-style typing reveal — the shared "coding feel" animation used
// across headings, body copy, nav, and buttons sitewide (one implementation,
// many call sites, per Engineering principles). Pass `delay` (ms) to
// sequence a second TypingText after a preceding one in the same heading.
const TypingText = ({ text, as: Tag = 'span', speed = 24, delay = 0, className = '' }) => {
  const reducedMotion = useReducedMotion();
  const { ref, displayed, done } = useTypewriter(text, { speed, delay });

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref} className={className}>
      <span aria-hidden="true">
        {displayed}
        {!done && (
          <span className="inline-block w-[2px] h-[1em] align-middle bg-current ml-0.5 animate-pulse" />
        )}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
};

export default TypingText;
