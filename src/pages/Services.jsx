import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import StepFlow from '../components/ui/StepFlow';
import GradientMesh from '../components/background/GradientMesh';
import TypingText from '../components/ui/TypingText';
import { SERVICES } from '../data/services';
import { PIPELINE } from '../data/engineeringPipeline';
import { EASE_SIGNATURE } from '../lib/motion';

const TIMELINE_STAGES = ['Architecture', 'Tech Stack', 'Features', 'CTA'];

const Services = () => {
 const [openId, setOpenId] = useState(SERVICES[0].id);

 return (
 <div className="min-h-screen bg-primary">
 {/* Header */}
 <div className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
 <GradientMesh />
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
 <motion.span
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="inline-block px-4 py-2 mb-6 border border-electric/30 text-electric text-xs font-mono font-semibold tracking-widest uppercase"
 >
 <TypingText text="Our Disciplines" speed={32} />
 </motion.span>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink mb-6"
 >
 <TypingText text="Software Engineering, " speed={26} delay={300} />
 <span className="bg-gradient-to-r from-royal to-electric bg-clip-text text-transparent">
 <TypingText text="Applied." speed={26} delay={870} />
 </span>
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto"
 >
 <TypingText
 text="Six disciplines, one engineering standard. Select one to see how we actually build it."
 speed={14}
 delay={1250}
 />
 </motion.p>
 </div>
 </div>

 {/* Engineering pipeline strip — the named, literal tech pipeline (moved out of the Hero) */}
 <div className="py-10 md:py-12 border-y border-white/5 bg-surface">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2">
 {PIPELINE.map((node, i) => (
 <React.Fragment key={node.id}>
 <div className="flex flex-col items-center gap-2 flex-shrink-0">
 <div className="w-10 h-10 border border-white/10 bg-card flex items-center justify-center">
 {node.icon ? (
 <node.icon className="w-5 h-5 text-electric" aria-hidden="true" />
 ) : (
 <span className="w-2 h-2 bg-electric" />
 )}
 </div>
 <span className="font-mono text-[10px] uppercase tracking-wide text-muted whitespace-nowrap">
 <TypingText text={node.label} speed={30} />
 </span>
 </div>
 {i < PIPELINE.length - 1 && (
 <div className="w-6 md:w-10 h-px bg-white/10 flex-shrink-0 mb-5" />
 )}
 </React.Fragment>
 ))}
 </div>
 </div>
 </div>

 {/* Disciplines accordion — documentary style, not a static grid */}
 <div className="py-16 md:py-20">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
 {SERVICES.map((service) => {
 const isOpen = openId === service.id;
 return (
 <div
 key={service.id}
 className="border border-white/10 bg-card overflow-hidden"
 >
 <button
 onClick={() => setOpenId(isOpen ? null : service.id)}
 className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 md:py-6 text-left"
 aria-expanded={isOpen}
 >
 <span className="font-display text-xl md:text-2xl font-bold text-ink">
 <TypingText text={service.title} speed={28} />
 </span>
 <ChevronDown
 className={`w-5 h-5 text-electric flex-shrink-0 transition-transform duration-base ${isOpen ? 'rotate-180' : ''}`}
 />
 </button>

 <AnimatePresence initial={false}>
 {isOpen && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.35, ease: EASE_SIGNATURE }}
 className="overflow-hidden"
 >
 <div className="px-6 md:px-8 pb-8">
 <StepFlow steps={TIMELINE_STAGES} className="mb-6" />

 <p className="text-muted leading-relaxed mb-6">
 <TypingText text={service.description} speed={9} />
 </p>

 <div className="flex flex-wrap gap-2 mb-6">
 {service.tags.map((tag) => (
 <span
 key={tag}
 className="px-2.5 py-1 bg-white/5 text-muted text-xs font-mono"
 >
 {tag}
 </span>
 ))}
 </div>

 <ul className="space-y-2 mb-8">
 {service.features.map((feature) => (
 <li key={feature} className="flex items-start gap-2 text-sm text-ink">
 <span className="w-1.5 h-1.5 mt-1.5 bg-electric flex-shrink-0" />
 {feature}
 </li>
 ))}
 </ul>

 <Link
 to="/contact"
 className="inline-flex items-center gap-2 px-5 py-3 bg-electric text-primary font-bold text-sm hover:shadow-lg hover:shadow-electric/20 transition-all"
 >
 Start a Project
 <ArrowRight size={16} />
 </Link>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
 })}
 </div>
 </div>

 {/* Partner Section */}
 <div className="py-16 md:py-20 bg-surface border-t border-white/5">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 >
 <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-12">
 <TypingText text="Our" speed={40} />
 <span className="bg-gradient-to-r from-royal to-electric bg-clip-text text-transparent">
 <TypingText text="Partner" speed={40} delay={200} />
 </span>
 </h2>

 <a href="https://yugminds.org/" target="_blank" rel="noopener noreferrer" className="inline-block">
 <motion.div
 whileHover={{ scale: 1.05 }}
 className="p-8 md:p-12 bg-card border border-white/10 hover:border-electric/30 transition-all max-w-md mx-auto"
 >
 <img
 src="/assets/other/yug.png"
 alt="Yugminds"
 className="mx-auto w-full max-w-none h-auto object-contain scale-110 md:scale-125"
 loading="lazy"
 />
 </motion.div>
 </a>
 </motion.div>
 </div>
 </div>

 {/* CTA Section */}
 <div className="py-16 md:py-20">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="relative overflow-hidden border border-white/10"
 >
 <div className="absolute inset-0 bg-gradient-to-r from-royal to-electric opacity-90" />
 <div className="relative px-6 md:px-8 py-12 md:py-16 text-center">
 <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
 <TypingText text="Let's Build Something Amazing" speed={22} />
 </h2>
 <p className="text-primary/80 text-lg mb-8">
 <TypingText text="Transform your ideas into reality with our expert team" speed={16} delay={700} />
 </p>
 <Link
 to="/contact"
 className="inline-block px-8 md:px-10 py-4 bg-primary text-ink font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
 >
 <TypingText text="Start Your Project" speed={26} delay={1400} />
 </Link>
 </div>
 </motion.div>
 </div>
 </div>
 </div>
 );
};

export default Services;
