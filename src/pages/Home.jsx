import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BadgeCheck, Handshake, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import GradientMesh from '../components/background/GradientMesh';
import BinaryField from '../components/background/BinaryField';
import CursorGlow from '../components/background/CursorGlow';
import BinaryLogoField from '../components/hero/BinaryLogoField';
import ServiceCard from '../components/services/ServiceCard';
import TypingText from '../components/ui/TypingText';
import { SERVICES } from '../data/services';
import { useCycle } from '../hooks/useCycle';
import { EASE_SIGNATURE } from '../lib/motion';

const HERO_WORDS = ['Think.', 'Design.', 'Engineer.', 'Deploy.', 'Scale.'];
const NOISE_BG =
"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const Home = () => {
 const heroWordIndex = useCycle(HERO_WORDS.length, 1800);

 return (
 <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-lime-50">
 {/* Hero Section — layered: noise / grid / binary / glow / Engineering Universe / content / cursor-light */}
 <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 bg-primary">
 <div
 className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
                style={{ backgroundImage: `url("${NOISE_BG}")` }}
 />
 <GradientMesh />
 <div className="absolute inset-0 opacity-40">
 <BinaryField density={16} />
 </div>
 <CursorGlow />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="grid lg:grid-cols-2 gap-12 lg:items-stretch">
 {/* Left Column - Text Content */}
 <motion.div
 initial={{ opacity: 0, x: -30 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8 }}
 className="text-left"
 >
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="inline-block mb-6"
 >
 <span className="px-4 py-2 border border-electric/30 text-electric text-xs font-mono font-semibold tracking-widest uppercase">
 <TypingText text="Software Engineering & AI" speed={30} />
 </span>
 </motion.div>

 <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-ink min-h-[1.2em]">
 <AnimatePresence mode="wait">
 <motion.span
 key={HERO_WORDS[heroWordIndex]}
 initial={{ opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -12 }}
 transition={{ duration: 0.4, ease: EASE_SIGNATURE }}
 className="inline-block bg-gradient-to-r from-royal to-electric bg-clip-text text-transparent"
 >
 {HERO_WORDS[heroWordIndex]}
 </motion.span>
 </AnimatePresence>
 </h1>

 <motion.p
 className="font-mono text-sm md:text-base tracking-[0.2em] uppercase text-muted mb-6"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3, duration: 0.6 }}
 >
 <TypingText text="Web · Mobile · Desktop · AI · Cloud" speed={22} delay={200} />
 </motion.p>

 <motion.p
 className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed max-w-xl text-muted"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4, duration: 0.6 }}
 >
 <TypingText
 text="A software engineering and AI company — we design, build, and scale intelligent digital products for startups and enterprises."
 speed={12}
 delay={600}
 />
 </motion.p>

 <motion.div
 className="flex flex-wrap gap-4 mb-8 sm:mb-12"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.5, duration: 0.6 }}
 >
 <Link
 to="/contact"
 className="group relative inline-block px-6 sm:px-8 py-3 sm:py-4 bg-electric text-primary font-bold text-base sm:text-lg shadow-xl hover:shadow-electric/20 transition-all"
 >
 <span className="relative z-10 flex items-center justify-center gap-2">
 <TypingText text="Start a Project" speed={24} delay={900} />
 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
 </span>
 </Link>
 <Link
 to="/services"
 className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-white/15 text-ink font-bold text-base sm:text-lg hover:border-electric/40 hover:text-electric transition-all"
 >
 <TypingText text="See Work" speed={24} delay={1200} />
 </Link>
 </motion.div>

 {/* Stats Row */}
 <motion.div
 className="flex flex-wrap gap-6 sm:gap-8 items-center"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.6, duration: 0.6 }}
 >
 {[
 { value: "200+", label: "Builds & Releases" },
 { value: "99%", label: "Uptime" },
 { value: "2023", label: "Founded" }
 ].map((stat, idx) => (
 <motion.div
 key={idx}
 className="text-center min-w-[80px]"
 whileHover={{ scale: 1.05, y: -5 }}
 transition={{ type: "spring", stiffness: 300 }}
 >
 <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-transparent bg-gradient-to-r from-royal to-electric bg-clip-text mb-1 sm:mb-2">
 {stat.value}
 </div>
 <div className="text-xs sm:text-sm md:text-base text-muted font-medium">
 <TypingText text={stat.label} speed={30} />
 </div>
 </motion.div>
 ))}
 </motion.div>
 </motion.div>

 {/* Right Column - Binary Logo Field, stretches to match the
 left column's natural height (not an arbitrary fixed
 size — that inflated the whole section and threw off
 the left column's spacing) */}
 <motion.div
 initial={{ opacity: 0, x: 30 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8, delay: 0.3 }}
 className="relative hidden lg:block min-h-[420px]"
 >
 <BinaryLogoField />
 </motion.div>
 </div>
 </div>
 </section>

 {/* Services Preview — StepFlow mini-simulations, not decorative cards */}
 <section id="services" className="py-16 md:py-24 relative bg-surface">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 className="text-center mb-12 md:mb-16"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 >
 <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
 <TypingText text="What We" speed={40} />
 <span className="bg-gradient-to-r from-royal to-electric bg-clip-text text-transparent">
 <TypingText text="Build" speed={40} delay={320} />
 </span>
 </h2>
 <p className="text-lg md:text-xl text-muted">
 <TypingText text="Don't take our word for it — watch the workflow" speed={18} delay={600} />
 </p>
 </motion.div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
 {SERVICES.slice(0, 3).map((service, index) => (
 <motion.div
 key={service.id}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: index * 0.1, duration: 0.5 }}
 >
 <ServiceCard service={service} />
 </motion.div>
 ))}
 </div>

 <div className="text-center mt-10 md:mt-12">
 <Link
 to="/services"
 className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-ink font-semibold hover:border-electric/40 hover:text-electric transition-all"
 >
 <TypingText text="View all services" speed={26} />
 <ArrowRight size={16} />
 </Link>
 </div>
 </div>
 </section>

 {/* Why Choose Us Section */}
 <section className="py-16 md:py-24 bg-primary text-ink relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
 <motion.div
 initial={{ opacity: 0, x: -30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 >
 <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
 <TypingText text="Why Choose" speed={40} />
 <span className="bg-gradient-to-r from-royal to-electric bg-clip-text text-transparent">
 <TypingText text="Navedhana" speed={40} delay={440} />
 </span>
 ?
 </h2>
 <p className="text-base md:text-lg text-muted mb-8 leading-relaxed">
 <TypingText
 text="Founded in 2023 and based in Hyderabad, we're an engineering-first team — every project gets the same rigor, whether it's a first prototype or a system already carrying real traffic."
 speed={10}
 delay={900}
 />
 </p>

 <div className="space-y-4">
 {[
 { text: 'Customer-First Approach', desc: 'Building relationships from day one', icon: Handshake },
 { text: 'Quality Assurance', desc: 'Reviewed and tested before it ships', icon: BadgeCheck },
 { text: 'Growing Together', desc: 'Your success is our success', icon: Sprout }
 ].map((item, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
 >
 <div className="w-12 h-12 bg-electric/10 flex items-center justify-center flex-shrink-0">
 <item.icon className="w-6 h-6 text-electric" aria-hidden="true" />
 </div>
 <div>
 <h4 className="font-semibold text-lg mb-1 text-ink">
 <TypingText text={item.text} speed={26} />
 </h4>
 <p className="text-muted text-sm">
 <TypingText text={item.desc} speed={20} delay={item.text.length * 26 + 100} />
 </p>
 </div>
 </motion.div>
 ))}
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, x: 30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="relative mt-8 lg:mt-0"
 >
 <div className="grid grid-cols-2 gap-4 md:gap-6">
 {[
 { label: 'Quality Service', value: '100%' },
 { label: 'Builds & Releases', value: '200+' },
 { label: 'Uptime', value: '99%' },
 { label: 'Founded', value: '2023' }
 ].map((stat, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, scale: 0.8 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 whileHover={{ scale: 1.05 }}
 className="bg-card p-6 text-center hover:border-electric/30 transition-all border border-white/10"
 >
 <div className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-royal to-electric bg-clip-text text-transparent mb-2">
 {stat.value}
 </div>
 <div className="text-sm text-muted font-medium">
 <TypingText text={stat.label} speed={26} />
 </div>
 </motion.div>
 ))}
 </div>
 </motion.div>
 </div>
 </div>
 </section>
 </div>
 );
};

export default Home;
