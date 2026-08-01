import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

// Small tilt-on-hover primitive for cards — mousemove -> rotateX/rotateY.
export function useTilt(maxDeg = 6) {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [maxDeg, -maxDeg]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxDeg, maxDeg]), { stiffness: 300, damping: 30 });

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return { ref, style: { rotateX, rotateY }, onMouseMove, onMouseLeave };
}
