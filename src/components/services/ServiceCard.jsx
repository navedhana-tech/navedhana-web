import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import StepFlow from '../ui/StepFlow';
import TypingText from '../ui/TypingText';
import { useTilt } from '../../hooks/useTilt';

const ServiceCard = ({ service, className = '' }) => {
 const tilt = useTilt(4);

 return (
 <div className="[perspective:900px]">
 <motion.div
 ref={tilt.ref}
 onMouseMove={tilt.onMouseMove}
 onMouseLeave={tilt.onMouseLeave}
 style={tilt.style}
 whileHover={{ y: -6 }}
 transition={{ type: 'spring', stiffness: 300, damping: 30 }}
 className={`group relative border border-white/10 bg-card p-6 md:p-8 hover:border-electric/30 transition-colors duration-base ${className}`}
 >
 <StepFlow steps={service.steps} className="mb-6" />
 <h3 className="font-display text-xl md:text-2xl font-bold text-ink mb-2">
 <TypingText text={service.title} speed={28} />
 </h3>
 <p className="text-muted text-sm md:text-base leading-relaxed mb-5">
 <TypingText text={service.description} speed={9} delay={service.title.length * 28 + 150} />
 </p>
 <div className="flex flex-wrap gap-2 mb-6">
 {service.tags.map((tag) => (
 <span key={tag} className="px-2.5 py-1 bg-white/5 text-muted text-xs font-mono">
 {tag}
 </span>
 ))}
 </div>
 <Link
 to="/services"
 className="inline-flex items-center gap-2 text-electric font-semibold text-sm group-hover:gap-3 transition-all"
 >
 <TypingText text="Learn more" speed={26} />
 <ArrowRight size={16} />
 </Link>
 </motion.div>
 </div>
 );
};

export default ServiceCard;
