import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, Sparkles, PartyPopper } from 'lucide-react';
import { rise, scaleIn } from '../lib/motion';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

// Fanned card stack for the hero — an original recreation of the "colorful
// festival cards" idea (not a copy of any source image/asset): three flat
// cards at different rotate angles, idle-floating via .festival-card-float
// (index.css). Colors and copy are generic to any festival, not tied to a
// specific one.
const HERO_CARDS = [
  { rotate: '-14deg', bg: '#a855f7', delay: '0.4s' },
  { rotate: '-6deg', bg: '#db2777', delay: '0.7s' },
];

// This one page intentionally breaks from the site's blue design system —
// content and the warm orange/festival palette both follow the live
// navedhana.com/seasonal page, which uses its own distinct theme for the
// festival-products venture. Everything else (Navbar/Footer/global tokens)
// stays exactly as-is; only this page's own markup opts out of --color-*.
const PRODUCTS = [
  { title: 'Holi Colors', desc: 'Organic, skin-friendly, and vibrant gulal for a safe and joyful Holi celebration.' },
  { title: 'Festival Kites', desc: 'High-quality kites and manjha for Makar Sankranti and other celebrations.' },
  { title: 'Diwali Decor', desc: 'Beautiful diyas, rangoli colors, and decorative items for the festival of lights.' },
];

const FEATURES = [
  { icon: Palette, title: 'Vibrant Colors', desc: 'Safe and eco-friendly' },
  { icon: Sparkles, title: 'Premium Quality', desc: 'Handpicked products' },
  { icon: PartyPopper, title: 'Festive Joy', desc: 'Celebrate with happiness' },
];

const Seasonal = () => {
  useDocumentMeta({
    title: 'Seasonal Products — Navedhana',
    description: 'Authentic seasonal festival products — holi colors, festival kites, and diwali decor — from Navedhana, a separate venture from our software and AI work.',
    noindex: true,
  });

  return (
  <div className="bg-[#fff8f0]">
    <section className="relative overflow-hidden pt-[104px] sm:pt-[148px] pb-16 sm:pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div {...rise} className="max-w-2xl">
          <span className="inline-block mb-5 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-display text-[11px] font-bold tracking-[0.14em] uppercase">
            Celebrate Every Festival
          </span>
          <h1 className="font-display text-[42px] sm:text-[58px] font-extrabold leading-[1.05] tracking-tight mb-5">
            <span className="block text-orange-600">Seasonal</span>
            <span className="block text-[#1c1a17]">Products</span>
          </h1>
          <p className="text-[15.5px] sm:text-base leading-relaxed text-[#635c50] max-w-lg mb-7">
            Bringing joy to every festival with vibrant colors, high-flying kites, and authentic seasonal products.
          </p>
          <span className="inline-flex items-center px-5 py-2.5 rounded-full border-2 border-orange-300 text-orange-600 bg-orange-50 font-display font-bold text-[13.5px]">
            Launching Soon
          </span>
        </motion.div>

        <motion.div {...scaleIn} className="relative flex items-center justify-center min-h-[220px] sm:min-h-[300px]">
          {/* Soft festival-colored glow behind the card stack — same warm
              palette as the source page's illustration, no external image. */}
          <div
            className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full opacity-40 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #fb923c, #ec4899 55%, #a855f7 100%)' }}
            aria-hidden="true"
          />
          <div className="relative w-[220px] h-[170px] sm:w-[300px] sm:h-[230px]">
            {HERO_CARDS.map((c) => (
              <div
                key={c.rotate}
                className="festival-card-float absolute inset-0 rounded-3xl shadow-xl"
                style={{ background: c.bg, transform: `rotate(${c.rotate})`, animationDelay: c.delay }}
                aria-hidden="true"
              />
            ))}
            <div
              className="festival-card-float absolute inset-0 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center text-white"
              style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)' }}
            >
              <span className="font-display text-2xl sm:text-[28px] font-extrabold">Sankranti</span>
              <span className="text-[13px] sm:text-sm opacity-90 mt-1">Festival Joy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto text-center">
      <h2 className="font-display text-[28px] sm:text-[36px] font-bold tracking-tight text-[#1c1a17] mb-2.5">
        Celebrate Every <span className="text-orange-600">Festival</span>
      </h2>
      <p className="text-[15px] text-[#635c50] mb-10">Premium products for your special occasions</p>
      <div className="grid sm:grid-cols-3 gap-5 text-left">
        {PRODUCTS.map((p) => (
          <div key={p.title} className="p-6 rounded-2xl border border-orange-100 bg-white shadow-sm">
            <h3 className="font-display text-lg font-bold text-[#1c1a17] mb-2">{p.title}</h3>
            <p className="text-[13.5px] leading-relaxed text-[#635c50] mb-4">{p.desc}</p>
            <span className="inline-block px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 font-display text-[10.5px] font-bold tracking-wide">
              Coming Soon
            </span>
          </div>
        ))}
      </div>
    </section>

    <section className="py-10 sm:py-14 px-4 sm:px-8 max-w-6xl mx-auto">
      <div
        className="grid sm:grid-cols-3 gap-8 rounded-[2rem] sm:rounded-[2.5rem] px-6 sm:px-14 py-12 sm:py-16 text-center"
        style={{ background: 'linear-gradient(100deg, #f97316, #ea580c 60%, #f97316)' }}
      >
        {FEATURES.map((f) => (
          <div key={f.title} className="flex flex-col items-center">
            <span className="w-12 h-12 rounded-full bg-white/15 text-white flex items-center justify-center mb-3">
              <f.icon size={20} />
            </span>
            <h3 className="font-display text-[15px] font-bold text-white mb-1">{f.title}</h3>
            <p className="text-[13px] text-white/80">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="py-14 sm:py-20 px-4 sm:px-8 text-center bg-orange-50/70">
      <h2 className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-[#1c1a17] mb-2.5">
        Never Miss a Festival
      </h2>
      <p className="text-[14.5px] text-[#635c50] mb-7">Get notified when seasonal products are back in stock</p>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-600 text-white font-display font-bold text-[14.5px] hover:bg-orange-700 transition-colors"
      >
        Notify Me
      </Link>
    </section>
  </div>
  );
};

export default Seasonal;
