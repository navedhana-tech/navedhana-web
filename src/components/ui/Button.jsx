import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const VARIANTS = {
 primary: 'bg-electric text-primary hover:shadow-lg hover:shadow-electric/20',
 outline: 'border border-white/15 text-ink hover:border-electric/40 hover:text-electric',
};

const SIZES = {
 sm: 'px-5 py-2.5 text-sm',
 lg: 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg',
};

// Magnetic hover: the button drifts a capped amount toward the cursor, then
// springs back. Reused wherever a primary/outline CTA needs it — pass`to`
// for a route Link, `href` for an anchor, or neither for a plain button.
const Button = ({ to, href, variant = 'primary', size = 'lg', className = '', children, ...props }) => {
 const ref = useRef(null);
 const x = useMotionValue(0);
 const y = useMotionValue(0);
 const springX = useSpring(x, { stiffness: 300, damping: 20 });
 const springY = useSpring(y, { stiffness: 300, damping: 20 });

 const onMouseMove = (e) => {
 const rect = ref.current?.getBoundingClientRect();
 if (!rect) return;
 const relX = e.clientX - (rect.left + rect.width / 2);
 const relY = e.clientY - (rect.top + rect.height / 2);
 x.set(relX * 0.25);
 y.set(relY * 0.25);
 };

 const onMouseLeave = () => {
 x.set(0);
 y.set(0);
 };

 const classes = `group inline-flex items-center justify-center gap-2 font-bold transition-all duration-base focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

 const Component = to ? Link : href ? 'a' : 'button';
 const linkProps = to ? { to } : href ? { href } : {};

 return (
 <motion.div
 ref={ref}
 style={{ x: springX, y: springY }}
 onMouseMove={onMouseMove}
 onMouseLeave={onMouseLeave}
 className="inline-block"
 >
 <Component className={classes} {...linkProps} {...props}>
 {children}
 </Component>
 </motion.div>
 );
};

export default Button;
