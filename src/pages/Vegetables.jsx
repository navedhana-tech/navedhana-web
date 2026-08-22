import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Clock, ShieldCheck, BadgeCheck, Carrot, Salad, Apple, Sprout } from 'lucide-react';
import { rise, scaleIn, staggerParent, riseChild } from '../lib/motion';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

// This page intentionally breaks from the site's blue design system —
// content and the green "farm to table" palette both follow the live
// navedhana.com/vegetables page, which uses its own distinct theme for the
// vegetables-supply venture (same treatment as Seasonal.jsx). Everything
// else (Navbar/Footer/global tokens) stays exactly as-is.
const HIGHLIGHTS = [
  { icon: Leaf, title: '100% Farm Fresh Daily', desc: 'Sourced from certified organic farms.' },
  { icon: Clock, title: 'Daily Fresh', desc: 'Harvested and delivered within 24 hours.' },
  { icon: ShieldCheck, title: 'Hygiene Packed', desc: 'Sanitized and packed with utmost care.' },
  { icon: BadgeCheck, title: 'Premium Quality', desc: 'Hand-picked for freshness and taste.' },
];

const CATEGORIES = [
  { icon: Salad, title: 'Leafy Greens' },
  { icon: Carrot, title: 'Root Vegetables' },
  { icon: Sprout, title: 'Vegetables' },
  { icon: Apple, title: 'Seasonal Picks' },
];

// Stands in for the source page's farm photograph — an original icon-grid
// illustration instead, so this doesn't depend on any external image asset.
const CRATE_ICONS = [Carrot, Salad, Apple, Sprout, Leaf, Carrot];

const Vegetables = () => {
  useDocumentMeta({
    title: 'Organic Vegetables — Navedhana',
    description: 'Farm-fresh, 100% organic vegetables delivered to your doorstep — a separate venture from Navedhana, our primary business remains software and AI engineering.',
    noindex: true,
  });

  return (
  <div className="bg-[#f2faf5]">
    <section className="relative overflow-hidden pt-[104px] sm:pt-[148px] pb-16 sm:pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div {...rise} className="max-w-2xl">
          <span className="inline-block mb-5 px-4 py-2 rounded-full bg-green-100 text-green-700 font-display text-[11px] font-bold tracking-[0.14em] uppercase">
            Farm to Table
          </span>
          <h1 className="font-display text-[42px] sm:text-[58px] font-extrabold leading-[1.05] tracking-tight mb-5">
            <span className="block text-[#1c1a17]">Fresh</span>
            <span className="block text-green-600">Vegetables</span>
            <span className="block text-[#1c1a17]">Supply</span>
          </h1>
          <p className="text-[15.5px] sm:text-base leading-relaxed text-[#635c50] max-w-lg mb-7">
            Farm-fresh goodness delivered straight to your kitchen. We ensure quality, hygiene, and taste in every
            basket.
          </p>
          <Link
            to="https://fresh.navedhana.com/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-display font-bold text-[14.5px] hover:bg-green-700 transition-colors"
          >
            Order Now
          </Link>
        </motion.div>

        <motion.div {...scaleIn} className="relative flex items-center justify-center min-h-[240px] sm:min-h-[320px]">
          <div
            className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full opacity-40 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #4ade80, #22c55e 55%, #16a34a 100%)' }}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-[340px] aspect-square rounded-[2rem] bg-gradient-to-br from-green-500 to-green-700 shadow-2xl p-6 flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-3">
              {CRATE_ICONS.map((Icon, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-white/15 flex items-center justify-center text-white">
                  <Icon size={26} />
                </div>
              ))}
            </div>
            <div className="text-center text-white">
              <span className="block font-display text-3xl sm:text-[40px] font-extrabold leading-none">100%</span>
              <span className="text-[13px] sm:text-sm opacity-90">Fresh From Farm Daily</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="pb-16 sm:pb-24 px-4 sm:px-8 max-w-6xl mx-auto">
      <motion.div {...staggerParent(0.08)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {HIGHLIGHTS.map((h) => (
          <motion.div key={h.title} variants={riseChild} className="p-6 rounded-2xl border border-green-100 bg-white shadow-sm">
            <span className="w-11 h-11 rounded-xl bg-green-600 text-white flex items-center justify-center mb-4">
              <h.icon size={20} />
            </span>
            <h3 className="font-display text-[15.5px] font-bold text-[#1c1a17] mb-1.5">{h.title}</h3>
            <p className="text-[13px] leading-relaxed text-[#635c50]">{h.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>

    <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto">
      <div
        className="rounded-[2rem] sm:rounded-[2.5rem] px-6 sm:px-14 py-12 sm:py-16 text-center"
        style={{ background: 'linear-gradient(100deg, #22c55e, #15803d 60%, #22c55e)' }}
      >
        <h2 className="font-display text-[28px] sm:text-[36px] font-bold tracking-tight text-white mb-2.5">
          What We Offer
        </h2>
        <p className="text-[15px] text-white/85 mb-10">A wide variety of fresh produce</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {CATEGORIES.map((c) => (
            <div key={c.title} className="p-6 rounded-2xl bg-white shadow-sm flex flex-col items-center">
              <span className="w-11 h-11 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3">
                <c.icon size={20} />
              </span>
              <h3 className="font-display text-[14.5px] font-bold text-[#1c1a17]">{c.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-14 sm:py-20 px-4 sm:px-8 text-center bg-green-50/70">
      <h2 className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-[#1c1a17] mb-2.5">
        Ready to Order Fresh?
      </h2>
      <p className="text-[14.5px] text-[#635c50] mb-7">Get farm-fresh vegetables delivered to your door.</p>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-display font-bold text-[14.5px] hover:bg-green-700 transition-colors"
      >
        Contact Us Now
      </Link>
    </section>
  </div>
  );
};

export default Vegetables;
