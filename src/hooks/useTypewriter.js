import { useEffect, useRef, useState } from 'react';

// Types out `text` one character at a time once the element scrolls into
// view. Reused by TypingText — the shared "coding feel" reveal used across
// the site instead of each place hand-rolling its own char-by-char timer.
export function useTypewriter(text, { speed = 24, once = true, delay = 0 } = {}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let delayTimer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          delayTimer = setTimeout(() => setActive(true), delay);
          if (once) observer.disconnect();
        } else if (!once) {
          clearTimeout(delayTimer);
          setActive(false);
          setCount(0);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(delayTimer);
    };
  }, [once, delay]);

  useEffect(() => {
    if (!active || count >= text.length) return undefined;
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [active, count, text, speed]);

  return { ref, displayed: text.slice(0, count), done: count >= text.length };
}
