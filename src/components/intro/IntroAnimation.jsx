import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BinaryField from '../background/BinaryField';
import LogoMark from './LogoMark';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCycle } from '../../hooks/useCycle';
import { DURATION, EASE_SIGNATURE } from '../../lib/motion';

// 0101 -> React -> Flutter -> Python -> Java -> Node -> AI -> Navedhana:
// software evolving into the company, in the same glyph slot the binary occupied.
const WORDS = ['01001010', '11010010', 'React', 'Flutter', 'Python', 'Java', 'Node', 'AI', 'Navedhana'];
const WORD_INTERVAL = 380;

// Plays once per session on "/" (see useIntroSeen). Reduced motion skips the
// binary/word/circuit build-up and fades straight to the finished mark.
const IntroAnimation = ({ onComplete }) => {
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState('words'); // 'words' | 'logo'
  const wordsActive = !reducedMotion && stage === 'words';
  const wordIndex = useCycle(wordsActive ? WORDS.length : 0, WORD_INTERVAL, {
    loop: false,
    onComplete: () => setStage('logo'),
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!reducedMotion) return undefined;
    const t = setTimeout(() => onComplete?.(), 500);
    return () => clearTimeout(t);
  }, [reducedMotion, onComplete]);

  useEffect(() => {
    if (reducedMotion || stage !== 'logo') return undefined;
    const t = setTimeout(() => onComplete?.(), 2700);
    return () => clearTimeout(t);
  }, [stage, reducedMotion, onComplete]);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary">
        <motion.div
          layoutId="brand-mark"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.reveal }}
        >
          <LogoMark size={64} />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.base }}
    >
      <div className="absolute inset-0 opacity-60">
        <BinaryField density={70} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, color-mix(in srgb, var(--color-electric) 15%, transparent), transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {stage === 'words' && (
          <AnimatePresence mode="wait">
            <motion.span
              key={WORDS[wordIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE_SIGNATURE }}
              className="font-mono text-3xl md:text-5xl text-electric tracking-widest"
            >
              {WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        )}

        {stage === 'logo' && (
          <>
            <motion.div layoutId="brand-mark">
              <LogoMark size={140} animated />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: DURATION.reveal, ease: EASE_SIGNATURE }}
              className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight"
            >
              Navedhana
            </motion.span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default IntroAnimation;
