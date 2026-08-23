import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// text-surface (not text-primary/white) for primary's label+icon — a cooler,
// slightly greyer theme tone ("silver") instead of stark white on the blue
// fill, while staying an existing @theme token rather than a one-off color.
const VARIANTS = {
 primary: 'bg-electric text-surface shadow-sm hover:bg-royal hover:shadow-md',
 outline: 'border border-ink/15 text-ink bg-ink/[0.03] hover:bg-ink/[0.08] hover:border-electric/30',
 link: 'relative text-electric font-semibold hover:text-royal btn-underline',
};

// Static fallback for the variants above — same resting look, no hover
// treatment at all (used by `hoverEffects={false}` call sites).
const STATIC_VARIANTS = {
 primary: 'bg-electric text-surface shadow-sm',
 outline: 'border border-ink/15 text-ink bg-ink/[0.03]',
 link: 'text-electric font-semibold',
};

// Pill shape, label padded on the left only — the right side is closed off
// by the icon chip itself (see CHIP_SIZE), not by matching right padding.
// `inline` sits inside running prose so it can't take real padding without
// wrecking line-height — instead it gets a 44px min-height on touch-sized
// screens only (a tappable target), collapsing back to normal inline flow at
// sm:+ where a mouse is doing the pointing.
const SIZES = {
 sm: 'pl-5 pr-1.5 py-1.5 text-[13.5px] sm:text-[13px]',
 lg: 'pl-6 sm:pl-7 pr-2 py-2 text-[15px] sm:text-base',
 inline: 'text-[14px] sm:text-[13px] min-h-[44px] sm:min-h-0 align-middle',
};

// Counterpart to SIZES for a pill with no trailing arrow. The sizes above pad
// the label on the left only and let the icon chip both close off the right
// edge and set the button's height (28px chip + 12px padding = 40px at sm).
// With no arrow there is no chip, so those sizes leave the label jammed against
// the right edge and the button ~6px shorter than a chipped one beside it —
// exactly what an outline CTA next to a primary one looks like. Symmetric
// padding, plus a min-height standing in for the chip the row expects.
const SIZES_NO_CHIP = {
 sm: 'px-5 py-1.5 min-h-10 text-[13.5px] sm:text-[13px]',
 lg: 'px-6 sm:px-7 py-2 min-h-[50px] text-[15px] sm:text-base',
};

const CHIP_SIZE = { sm: 'w-7 h-7', lg: 'w-9 h-9' };
const CHIP_ICON_SIZE = { sm: 14, lg: 16 };
// White chip reads on the blue primary fill; the outline variant is nearly
// white itself, so its chip needs a dark tint instead to stay visible.
const CHIP_BG = { primary: 'bg-white/15', outline: 'bg-ink/10' };

// A label ending in an arrow glyph has that glyph stripped — every existing
// `<Button>Label →</Button>` call site renders it as a ChevronRight instead,
// no call-site changes needed.
const ARROW_RE = /\s*(→|↗)\s*$/;
const splitArrow = (children) => {
 if (typeof children !== 'string') return { label: children, hasArrow: false };
 const match = children.match(ARROW_RE);
 if (!match) return { label: children, hasArrow: false };
 return { label: children.slice(0, match.index), hasArrow: true };
};

// Reused wherever a primary/outline/link CTA needs consistent sizing and
// hover color/shadow treatment — pass `to` for a route Link, `href` for an
// anchor, or neither for a plain button. No drift/translate on hover: only
// color, shadow and underline change, the button itself stays put.
const Button = ({ to, href, variant = 'primary', size = 'lg', hoverEffects = true, className = '', children, ...props }) => {
 const variantClasses = hoverEffects ? VARIANTS[variant] : STATIC_VARIANTS[variant];
 // Only primary/outline get the pill + icon-chip treatment — `link` stays a
 // plain inline text link with its underline, no chip fits inline prose.
 const isChip = variant !== 'link';
 const shape = isChip ? 'rounded-full' : 'rounded-xl';
 const { label, hasArrow } = splitArrow(children);
 const showChip = isChip && hasArrow;
 // Swapped wholesale rather than appended: these are conflicting padding
 // utilities, and which one wins would come down to Tailwind's output order,
 // not the order they appear in the class string.
 const sizeClasses = (isChip && !hasArrow && SIZES_NO_CHIP[size]) || SIZES[size];
 // Press feedback. Every state on this button until now was a `hover:` one,
 // which a touch device never enters — so tapping a CTA on a phone gave no
 // acknowledgement at all between the tap and the next page painting. `active:`
 // fires on touch as well as mouse, and `motion-safe:` keeps it out of the way
 // of a reduced-motion visitor. CSS rather than Framer `whileTap` because this
 // component renders a Link/anchor/button, none of which are motion elements.
 const classes = `group inline-flex items-center justify-center gap-2 ${shape} font-semibold transition-all duration-base motion-safe:active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${sizeClasses} ${variantClasses} ${className}`;

 const Component = to ? Link : href ? 'a' : 'button';
 const linkProps = to ? { to } : href ? { href } : {};

 return (
 <Component className={classes} {...linkProps} {...props}>
 {label}
 {showChip && (
 <span
 className={`inline-flex items-center justify-center shrink-0 ${CHIP_SIZE[size] || CHIP_SIZE.sm} rounded-full ${CHIP_BG[variant] || CHIP_BG.primary} transition-transform duration-base group-hover:translate-x-0.5`}
 >
 <ChevronRight size={CHIP_ICON_SIZE[size] || CHIP_ICON_SIZE.sm} strokeWidth={2.5} />
 </span>
 )}
 {hasArrow && !isChip && <ChevronRight size={15} strokeWidth={2.5} className="inline-block" />}
 </Component>
 );
};

export default Button;
