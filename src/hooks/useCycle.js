import { useEffect, useState } from 'react';

// Advances an index on a fixed interval. Loops forever by default (the Hero
// headline); pass `loop: false` to stop at the last item and fire
// `onComplete` once (the intro's one-shot binary -> tech-name sequence).
export function useCycle(length, interval, { loop = true, onComplete } = {}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) return undefined;
    if (!loop && index >= length - 1) {
      const t = setTimeout(() => onComplete?.(), interval);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => (i + 1) % length), interval);
    return () => clearTimeout(t);
  }, [index, length, interval, loop, onComplete]);

  return index;
}
