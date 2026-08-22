// Single source of truth for animation timing and the shared reveal
// vocabulary, used by every Framer Motion usage in the app. The DURATION
// values mirror the CSS custom properties in src/index.css (Framer reads JS
// values, CSS reads var()s — same numbers, two places).

export const DURATION = {
  micro: 0.15,
  base: 0.3,
  reveal: 0.7,
  step: 0.5,
};

export const EASE_SIGNATURE = [0.16, 1, 0.3, 1];

export const SPRING = { type: 'spring', stiffness: 300, damping: 30 };

// Every section used to share one identical `fadeUp` (opacity + y:24, 0.6s),
// redeclared in five page files — so each page read as the same effect over
// and over. These are the distinct alternatives; the rule when applying them
// is that two adjacent sections never use the same one.
//
// Movement is deliberately small (16-28px, 0.5-0.7s). The variety comes from
// the AXIS and the TRANSFORM, not from travelling further or lasting longer,
// which is what makes repeat visits tiring.
const VIEWPORT = { once: true, amount: 0.25 };

// Read once at module load (not reactive to the OS setting flipping mid-
// session — the same trade-off Home.jsx's own local reducedMotion checks
// already make; a live listener is more than this is worth). Below-the-fold
// content sits in its `hidden` pose (opacity:0, x/y offset, blur, scale)
// until whileInView fires, which is invisible on a normal scroll — but a
// reduced-motion visitor should never see motion OR that pose at all, and
// without this check none of these presets checked for that. The x:±32
// slideLeft/slideRight offset was also the direct cause of a real 16px
// horizontal-overflow bug on /services at narrow widths: any below-the-fold
// image sitting in that untriggered hidden state was measurably 32px off
// its resting position, wide enough to push part of it past the viewport
// edge before the visitor ever scrolled there.
const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const preset = (hidden, show, duration = DURATION.reveal) => ({
  initial: prefersReducedMotion ? false : hidden,
  whileInView: show,
  viewport: VIEWPORT,
  transition: { duration: prefersReducedMotion ? 0 : duration, ease: EASE_SIGNATURE },
});

/** Rises from below. The original site-wide effect, now one option of several. */
export const rise = preset({ opacity: 0, y: 26 }, { opacity: 1, y: 0 });

/** Enters from the left. Good for left-aligned section headers. */
export const slideLeft = preset({ opacity: 0, x: -32 }, { opacity: 1, x: 0 });

/** Enters from the right. Pairs with slideLeft across a two-column split. */
export const slideRight = preset({ opacity: 0, x: 32 }, { opacity: 1, x: 0 });

/** Settles in from slightly small — reads as "arriving", good for cards. */
export const scaleIn = preset({ opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1 });

/** Focus-pull: blurred and soft, sharpening as it lands. Good for imagery. */
export const blurIn = preset(
  { opacity: 0, filter: 'blur(10px)', scale: 1.02 },
  { opacity: 1, filter: 'blur(0px)', scale: 1 }
);

/** Tips up into place on the X axis — a subtle perspective settle. */
export const tiltIn = preset(
  { opacity: 0, rotateX: 10, y: 18, transformPerspective: 900 },
  { opacity: 1, rotateX: 0, y: 0, transformPerspective: 900 }
);

/** Drops from above. Rare by design — used where content hangs off a header. */
export const dropIn = preset({ opacity: 0, y: -22 }, { opacity: 1, y: 0 });

// --- Staggered groups -------------------------------------------------------
// `staggerParent` orchestrates; children use one of the *Child variants. Unlike
// the presets above these are `variants` objects, so the parent needs
// initial="hidden" whileInView="show".

// `initial: false` here doesn't just skip the parent's own (empty) hidden
// state — framer-motion propagates it to every descendant that doesn't set
// its own `initial`, which is exactly the *Child variants below. That's what
// stops riseChild/slideChild/etc. from sitting in their offset hidden pose.
export const staggerParent = (stagger = 0.08, delay = 0.05) => ({
  initial: prefersReducedMotion ? false : 'hidden',
  whileInView: 'show',
  viewport: VIEWPORT,
  variants: { hidden: {}, show: { transition: { staggerChildren: prefersReducedMotion ? 0 : stagger, delayChildren: prefersReducedMotion ? 0 : delay } } },
});

export const riseChild = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.step, ease: EASE_SIGNATURE } },
};

export const scaleChild = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: DURATION.step, ease: EASE_SIGNATURE } },
};

export const slideChild = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION.step, ease: EASE_SIGNATURE } },
};

/** Wipes up from behind a mask. The parent must clip (overflow-hidden). */
export const clipChild = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: DURATION.reveal, ease: EASE_SIGNATURE } },
};

/** Grows a rule/divider along its length. Set transformOrigin at the call site. */
export const growX = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DURATION.step, ease: 'easeInOut' } },
};

export const growY = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: DURATION.step, ease: 'easeInOut' } },
};
