import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sun, Zap, Leaf, ShieldCheck, IndianRupee, Banknote, PhoneCall, MapPin,
  Home, Building2, GraduationCap, Snowflake, Factory, ClipboardCheck,
  Wrench, Gauge, Cable, BadgeCheck, User,
} from 'lucide-react';
import { rise, scaleIn, staggerParent, riseChild } from '../lib/motion';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

// This one page intentionally breaks from the site's blue design system —
// content and the sky-blue/solar-amber palette follow the source brochures
// (Likith Solar Power + Dhruva Solar Power) for this venture, same treatment
// as Vegetables.jsx and Seasonal.jsx. Everything else (Navbar/Footer/global
// tokens) stays exactly as-is; only this page's own markup opts out of --color-*.
const HIGHLIGHTS = [
  { icon: IndianRupee, title: '₹78,000 Subsidy', desc: 'Under the PM Surya Ghar Yojana scheme.' },
  { icon: Sun, title: '25-Year Solar Life', desc: 'Long-lasting panels built to last decades.' },
  { icon: Zap, title: '360 Units / Month', desc: 'A 3kW system generates up to this monthly.' },
  { icon: Banknote, title: 'Bank Loans Arranged', desc: 'Financing help from all national banks.' },
];

const SEGMENTS = [
  { icon: Home, title: 'Houses' },
  { icon: Building2, title: 'Commercial' },
  { icon: Factory, title: 'Industrial' },
  { icon: Snowflake, title: 'Cold Storages' },
  { icon: GraduationCap, title: 'Colleges' },
];

const SERVICES = [
  'Solar PV design', 'Solar PV modules', 'Grid-tie solar structure', 'Off-grid solar structure',
  'Hybrid solar structure', 'Hot-dip galvanized structure', 'Commissioning', 'Net meters', 'Electricals & earthing',
  'Fire meters', 'Maintenance (AMC)',
];

const PROCESS = [
  { icon: ClipboardCheck, title: 'Feasibility & Application', desc: 'Site feasibility check and application filing.' },
  { icon: Gauge, title: 'Net Metering', desc: 'Net meter application and installation.' },
  { icon: Cable, title: 'Synchronization', desc: 'DISCOM synchronization and report.' },
  { icon: IndianRupee, title: 'Subsidy Follow-up', desc: 'Subsidy application filed and tracked through.' },
];

const ADVANTAGES = [
  { icon: Leaf, title: 'Clean & Pollution-Free', desc: 'Generates environmentally clean energy with no pollution.' },
  { icon: Home, title: 'Compact Footprint', desc: 'Around 100 sq. ft. of roof area needed per kW.' },
  { icon: ShieldCheck, title: 'Built to Last', desc: '25-year system life with easy install and upkeep.' },
  { icon: Banknote, title: 'Export & Earn', desc: 'Export surplus power to the grid and earn money back.' },
];

const Solar = () => {
  useDocumentMeta({
    title: 'Solar Service — Navedhana',
    description:
      "Navedhana's solar installation and clean-energy service for homes and businesses — PM Surya Ghar subsidy, grid-tie solar, and net metering — a separate offering from our primary software and AI engineering work.",
    noindex: true,
  });

  return (
  <div className="bg-[#f3f9ff]">
    {/* Hero */}
    <section className="relative overflow-hidden pt-[104px] sm:pt-[148px] pb-16 sm:pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div {...rise} className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 mb-5 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-display text-[11px] font-bold tracking-[0.14em] uppercase">
            <Sun size={13} /> PM Surya Ghar Solar
          </span>
          <h1 className="font-display text-[42px] sm:text-[58px] font-extrabold leading-[1.05] tracking-tight mb-5">
            <span className="block text-[#0c2340]">Solar Power,</span>
            <span className="block text-sky-600">Simplified</span>
          </h1>
          <p className="text-[15.5px] sm:text-base leading-relaxed text-[#4b5768] max-w-lg mb-4">
            End-to-end rooftop solar — design, installation, net metering, and subsidy
            follow-up — for homes, industries, cold storages, colleges, and commercial buildings.
          </p>
          <p className="text-[14px] leading-relaxed text-[#4b5768] max-w-lg mb-7">
            A <span className="font-semibold text-[#0c2340]">₹78,000 subsidy</span> is available on qualifying
            residential systems under PM Surya Ghar, with a 25-year solar life and loans arranged through all
            national banks.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-600 text-white font-display font-bold text-[14.5px] hover:bg-sky-700 transition-colors"
          >
            Get a Free Consultation
          </Link>
        </motion.div>

        <motion.div {...scaleIn} className="relative flex items-center justify-center min-h-[240px] sm:min-h-[320px]" style={{ perspective: '1200px' }}>
          <div
            className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full opacity-40 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #fbbf24, #38bdf8 60%, #0284c7 100%)' }}
            aria-hidden="true"
          />
          <div
            className="relative w-full max-w-[340px] aspect-square rounded-[2rem] shadow-2xl overflow-hidden transition-transform duration-500 hover:[transform:rotateY(0deg)]"
            style={{ transform: 'rotateY(-28deg)', transformStyle: 'preserve-3d' }}
          >
            <img
              src="/assets/photos/solar.png"
              alt="Technician installing solar panels on a rooftop"
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c2340]/90 via-[#0c2340]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-center text-white">
              <span className="block font-display text-3xl sm:text-[40px] font-extrabold leading-none">3kW</span>
              <span className="text-[13px] sm:text-sm opacity-90">Up to 360 Units / Month</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Highlights */}
    <section className="pb-16 sm:pb-24 px-4 sm:px-8 max-w-6xl mx-auto">
      <motion.div {...staggerParent(0.08)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {HIGHLIGHTS.map((h) => (
          <motion.div key={h.title} variants={riseChild} className="p-6 rounded-2xl border border-sky-100 bg-white shadow-sm">
            <span className="w-11 h-11 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-4">
              <h.icon size={20} />
            </span>
            <h3 className="font-display text-[15.5px] font-bold text-[#0c2340] mb-1.5">{h.title}</h3>
            <p className="text-[13px] leading-relaxed text-[#4b5768]">{h.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>

    {/* Who it's for */}
    <section className="pb-16 sm:pb-24 px-4 sm:px-8 max-w-6xl mx-auto text-center">
      <h2 className="font-display text-[26px] sm:text-[32px] font-bold tracking-tight text-[#0c2340] mb-2.5">
        For Every Kind of Property
      </h2>
      <p className="text-[14.5px] text-[#4b5768] mb-10">Full turn-key solar for residential and commercial sectors alike</p>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {SEGMENTS.map((s) => (
          <div key={s.title} className="p-5 rounded-2xl bg-white border border-sky-100 shadow-sm flex flex-col items-center">
            <span className="w-11 h-11 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <s.icon size={20} />
            </span>
            <h3 className="font-display text-[13.5px] font-bold text-[#0c2340]">{s.title}</h3>
          </div>
        ))}
      </div>
    </section>

    {/* Services */}
    <section className="pb-16 sm:pb-24 px-4 sm:px-8 max-w-6xl mx-auto">
      <div
        className="rounded-[2rem] sm:rounded-[2.5rem] px-6 sm:px-14 py-12 sm:py-16"
        style={{ background: 'linear-gradient(100deg, #0284c7, #075985 60%, #0284c7)' }}
      >
        <h2 className="font-display text-[26px] sm:text-[32px] font-bold tracking-tight text-white mb-2.5 text-center">
          What We Supply & Install
        </h2>
        <p className="text-[14.5px] text-white/80 mb-10 text-center">Designed and commissioned by a qualified, trained professional team</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((s) => (
            <div key={s} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-[13.5px] font-medium">
              <BadgeCheck size={16} className="shrink-0 text-amber-300" />
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="pb-16 sm:pb-24 px-4 sm:px-8 max-w-6xl mx-auto text-center">
      <h2 className="font-display text-[26px] sm:text-[32px] font-bold tracking-tight text-[#0c2340] mb-2.5">
        From Application to Commissioning
      </h2>
      <p className="text-[14.5px] text-[#4b5768] mb-10">We liaison the full paperwork so you don't have to</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
        {PROCESS.map((p, i) => (
          <div key={p.title} className="relative p-6 rounded-2xl border border-sky-100 bg-white shadow-sm">
            <span className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-amber-400 text-[#0c2340] font-display text-[12px] font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <span className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <p.icon size={20} />
            </span>
            <h3 className="font-display text-[14.5px] font-bold text-[#0c2340] mb-1.5">{p.title}</h3>
            <p className="text-[13px] leading-relaxed text-[#4b5768]">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Advantages */}
    <section className="pb-16 sm:pb-24 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {ADVANTAGES.map((a) => (
          <div key={a.title} className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
            <span className="w-11 h-11 rounded-xl bg-amber-400 text-[#0c2340] flex items-center justify-center mb-4">
              <a.icon size={20} />
            </span>
            <h3 className="font-display text-[14.5px] font-bold text-[#0c2340] mb-1.5">{a.title}</h3>
            <p className="text-[13px] leading-relaxed text-[#4b5768]">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Contact CTA */}
    <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="rounded-[2rem] sm:rounded-[2.5rem] px-6 sm:px-14 py-12 sm:py-16 bg-white border border-sky-100 shadow-sm text-center">
        <h2 className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-[#0c2340] mb-2.5">
          Ready to Go Solar?
        </h2>
        <p className="text-[14.5px] text-[#4b5768] mb-8">Reach out for a free site feasibility check and subsidy guidance.</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-[13.5px] text-[#0c2340]">
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-sky-600" /> Shamshabad, Hyderabad, Rangareddy District, Telangana
          </span>
          <span className="inline-flex items-center gap-2">
            <PhoneCall size={16} className="text-sky-600" /> +91 78939 29369
          </span>
          <span className="inline-flex items-center gap-2">
            <User size={16} className="text-sky-600" /> Mettu Likith
          </span>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-600 text-white font-display font-bold text-[14.5px] hover:bg-sky-700 transition-colors"
        >
          Contact Us Now
        </Link>
      </div>
    </section>
  </div>
  );
};

export default Solar;
