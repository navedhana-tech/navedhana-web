import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BadgeCheck, Eye, HeartHandshake, Lightbulb, ShieldCheck, Target } from 'lucide-react';
import GradientMesh from '../components/background/GradientMesh';
import TypingText from '../components/ui/TypingText';

const About = () => {
 return (
 <div className="min-h-screen bg-primary">
 {/* Hero Section */}
 <div className="relative pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden min-h-[70vh] flex items-center">
 <GradientMesh />
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 >
 <span className="inline-block py-1 px-3 border border-electric/30 text-electric text-sm font-mono font-semibold mb-6 tracking-widest uppercase">
 <TypingText text="Our Story" speed={34} />
 </span>
 <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-ink mb-6 leading-tight">
 <TypingText text="Engineering Intelligence, " speed={30} delay={200} /> <br />
 <span className="bg-gradient-to-r from-royal to-electric bg-clip-text text-transparent">
 <TypingText text="Delivering Excellence" speed={30} delay={950} />
 </span>
 </h1>
 <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
 <TypingText
 text="Navedhana is a software engineering and AI company, founded in 2023 and based in Hyderabad, India. We design, build, and scale intelligent digital products — web, mobile, desktop, and AI — for startups and enterprises."
 speed={9}
 delay={1650}
 />
 </p>
 </motion.div>
 </div>
 </div>

 {/* Mission & Vision Section */}
 <div className="py-16 md:py-24 bg-surface">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid md:grid-cols-2 gap-12">
 <motion.div
 initial={{ opacity: 0, x: -50 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 className="p-8 md:p-12 bg-card border border-white/10 hover:border-electric/30 transition-all"
 >
 <div className="w-16 h-16 bg-electric/10 flex items-center justify-center mb-6">
 <Target className="w-8 h-8 text-electric" aria-hidden="true" />
 </div>
 <h2 className="font-display text-3xl font-bold text-ink mb-4">
 <TypingText text="Our Mission" speed={34} />
 </h2>
 <p className="text-muted leading-relaxed text-lg">
 <TypingText
 text="To engineer intelligent, reliable software that helps businesses move faster — combining rigorous engineering practice with applied AI to solve real problems, not just ship features."
 speed={10}
 delay={450}
 />
 </p>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, x: 50 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 className="p-8 md:p-12 bg-card border border-white/10 hover:border-electric/30 transition-all"
 >
 <div className="w-16 h-16 bg-electric/10 flex items-center justify-center mb-6">
 <Eye className="w-8 h-8 text-electric" aria-hidden="true" />
 </div>
 <h2 className="font-display text-3xl font-bold text-ink mb-4">
 <TypingText text="Our Vision" speed={34} />
 </h2>
 <p className="text-muted leading-relaxed text-lg">
 <TypingText
 text="To be the engineering partner ambitious companies call first — where software is engineered to last, scale, and adapt as AI reshapes what's possible."
 speed={10}
 delay={450}
 />
 </p>
 </motion.div>
 </div>
 </div>
 </div>

 {/* Core Values Section */}
 <div className="py-16 md:py-24">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16">
 <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">
 <TypingText text="Our Core Values" speed={34} />
 </h2>
 <p className="text-muted text-lg">
 <TypingText text="The principles that guide every decision we make" speed={20} delay={550} />
 </p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
 {[
 { title: "Integrity", desc: "Honest estimates, transparent progress, no surprises.", icon: ShieldCheck },
 { title: "Innovation", desc: "We bring AI and modern engineering practice to problems that used to need neither.", icon: Lightbulb },
 { title: "Quality", desc: "Code reviewed, tested, and built to last — not just to demo.", icon: BadgeCheck },
                            { title: "Customer Focus", desc: "Your product's success is the only metric that matters to us.", icon: HeartHandshake }
 ].map((value, idx) => (
 <motion.div
 key={idx}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: idx * 0.1 }}
 whileHover={{ y: -5 }}
 className="bg-card p-8 border border-white/10 text-center hover:border-electric/30 transition-all"
 >
 <div className="w-12 h-12 bg-electric/10 mx-auto mb-6 flex items-center justify-center">
 <value.icon className="w-6 h-6 text-electric" aria-hidden="true" />
 </div>
 <h3 className="text-xl font-bold text-ink mb-3">
 <TypingText text={value.title} speed={32} />
 </h3>
 <p className="text-muted">
 <TypingText text={value.desc} speed={14} delay={value.title.length * 32 + 150} />
 </p>
 </motion.div>
 ))}
 </div>
 </div>
 </div>

 {/* CTA Section */}
 <div className="py-20">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 className="relative overflow-hidden bg-gradient-to-r from-royal to-electric text-center py-16 px-8 border border-white/10"
 >
 <div className="relative z-10">
 <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
 <TypingText text="Ready to Build Something? " speed={26} />
 </h2>
 <p className="text-primary/80 text-lg mb-8 max-w-2xl mx-auto">
 <TypingText
 text="Whether it's a web platform, an AI agent, or a full product rebuild, Navedhana is ready to engineer it with you."
 speed={12}
 delay={700}
 />
 </p>
 <Link
 to="/contact"
 className="inline-block px-8 py-4 bg-primary text-ink font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
 >
 <TypingText text="Contact Us Today" speed={26} delay={1400} />
 </Link>
 </div>
 <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
 <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 translate-x-1/2 translate-y-1/2"></div>
 </motion.div>
 </div>
 </div>
 </div>
 );
};

export default About;
