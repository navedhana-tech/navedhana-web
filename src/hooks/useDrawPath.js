import { useEffect, useRef, useState } from 'react';
import { DURATION, EASE_SIGNATURE } from '../lib/motion';

// Shared "line draws itself" primitive — the intro circuit and StepFlow both
// use this instead of each reimplementing scroll/visibility tracking + a
// stroke-draw animation (Engineering principles: no duplicated logic).
// Drives Framer Motion's built-in `pathLength` animation on <motion.path>.
export function useDrawPath({ once = true, duration = DURATION.reveal } = {}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setActive(false);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration, ease: EASE_SIGNATURE } },
  };

  return { ref, active, pathVariants };
}
