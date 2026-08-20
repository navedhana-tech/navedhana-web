import React from 'react';
import { motion } from 'framer-motion';
import SectionKicker from './SectionKicker';

// Shared centered page header for the interior pages (About/Services/Products).
// Same staggered kicker -> headline -> subhead reveal Home's hero uses, at
// page-header scale and on the light background rather than Home's dark scope.
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Default top padding clears the navbar: 84px tall, so 104px on a phone is
// enough breathing room — the old flat 168px was a desktop value that opened
// every mobile page with an empty band.
const PageHero = ({ kicker, title, subtitle, align = 'center', backdrop, className = 'pt-[104px] sm:pt-[168px] pb-8 sm:pb-12', children }) => {
  const centered = align === 'center';
  return (
    <section className={`relative overflow-hidden px-4 sm:px-8 ${className}`}>
      {/* Decorative only — the headline carries the meaning, so the image is
          aria-hidden and heavily washed out rather than sitting at full
          strength behind live text. */}
      {backdrop && (
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <img src={backdrop} alt="" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-primary/55 to-primary" />
        </div>
      )}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={centered ? 'max-w-3xl mx-auto text-center' : 'max-w-[1120px] mx-auto'}
      >
        <motion.div variants={item}>
          <SectionKicker centered={centered} className="mb-5">{kicker}</SectionKicker>
        </motion.div>
        <motion.h1
          variants={item}
          className="font-display text-[29px] sm:text-[46px] font-bold tracking-tight leading-[1.12] sm:leading-[1.08] text-ink"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={item}
            className={`text-[15px] sm:text-base leading-relaxed text-muted mt-4 sm:mt-5 max-w-xl ${centered ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </motion.p>
        )}
        {children && <motion.div variants={item} className="mt-6 sm:mt-7">{children}</motion.div>}
      </motion.div>
    </section>
  );
};

export default PageHero;
