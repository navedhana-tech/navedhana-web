import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const VARIANTS = {
 primary: 'bg-electric text-primary shadow-lg shadow-electric/25 hover:shadow-xl hover:shadow-electric/30 btn-signal',
 outline: 'border border-ink/15 text-ink bg-ink/[0.03] hover:bg-ink/[0.08] hover:border-electric/30 hover:translate-x-[1px]',
 link: 'relative text-electric font-semibold hover:text-royal btn-underline',
};

// Static fallback for the variants above — same resting look, no hover
// treatment at all (used by `hoverEffects={false}` call sites).
const STATIC_VARIANTS = {
 primary: 'bg-electric text-primary shadow-lg shadow-electric/25',
 outline: 'border border-ink/15 text-ink bg-ink/[0.03]',
 link: 'text-electric font-semibold',
};

const SIZES = {
 sm: 'px-5 py-2.5 text-sm',
 lg: 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg',
 inline: 'text-[13px]',
};

// A label ending in an arrow glyph gets that glyph split into its own span
// so it can shift independently on hover — every existing `<Button>Label
// →</Button>` call site picks this up automatically, no call-site changes.
const ARROW_RE = /\s*(→|↗)\s*$/;
const splitArrow = (children) => {
 if (typeof children !== 'string') return { label: children, arrow: null };
 const match = children.match(ARROW_RE);
 if (!match) return { label: children, arrow: null };
 return { label: children.slice(0, match.index), arrow: match[1] };
};

// Magnetic hover: the button drifts a capped amount toward the cursor, then
// springs back. Reused wherever a primary/outline CTA needs it — pass`to`
// for a route Link, `href` for an anchor, or neither for a plain button.
const Button = ({ to, href, variant = 'primary', size = 'lg', hoverEffects = true, className = '', children, ...props }) => {
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

 const variantClasses = hoverEffects ? VARIANTS[variant] : STATIC_VARIANTS[variant];
 const classes = `group inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-base focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${SIZES[size]} ${variantClasses} ${className}`;

 const Component = to ? Link : href ? 'a' : 'button';
 const linkProps = to ? { to } : href ? { href } : {};
 const { label, arrow } = splitArrow(children);

 return (
 <motion.span
 ref={ref}
 style={{ x: springX, y: springY }}
 onMouseMove={hoverEffects ? onMouseMove : undefined}
 onMouseLeave={hoverEffects ? onMouseLeave : undefined}
 className="inline-block"
 >
 <Component className={classes} {...linkProps} {...props}>
 {label}
 {arrow && (
 <span
 className={hoverEffects ? 'inline-block transition-transform duration-base group-hover:translate-x-1.5' : 'inline-block'}
 >
 {arrow}
 </span>
 )}
 </Component>
 </motion.span>
 );
};

export default Button;
