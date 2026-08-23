import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { staggerParent, riseChild } from '../lib/motion';

const SERVICE_LINKS = [
  'AI Engineering',
  'Custom Software',
  'Intelligent Automation',
  'Product Engineering',
];

const PRODUCT_LINKS = [
  { name: 'Lekvya', href: 'https://ca.navedhana.com/', external: true },
  { name: 'AI Agent', path: '/ai-agent' },
  { name: 'Data Factory', path: '/products' },
  { name: 'QA Foundation', path: '/products' },
];

const COMPANY_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Insights', path: '/insights' },
  { name: 'Contact', path: '/contact' },
];

// Mirrors OTHER_VENTURES on the Services page (see Services.jsx) — Navedhana's
// non-software ventures, kept in their own column rather than folded into
// Company so they don't read as more software offerings.
const VENTURE_LINKS = [
  { name: 'Agri Tech Service', path: '/vegetables' },
  { name: 'Seasonal Products', path: '/seasonal' },
  { name: 'Solar Service', path: '/solar' },
];

// Link rows carry their own vertical padding rather than the column using
// `gap`, so each row is a ~44px tap target on a phone. At 13.5px text with
// gap-2.5 these were 20px tall — the worst tap targets on the site.
const FOOTER_LINK =
  'flex items-center justify-center sm:justify-start min-h-[30px] sm:min-h-0 sm:py-1 text-[12.5px] sm:text-[13.5px] leading-snug text-muted hover:text-ink transition-colors';

const FooterColumn = ({ title, children }) => (
  <motion.div variants={riseChild} className="text-center sm:text-left">
    <h5 className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wide text-muted/60 mb-1 sm:mb-4">{title}</h5>
    <div className="flex flex-col sm:gap-1.5">{children}</div>
  </motion.div>
);

// dark-scope reused from Home.jsx (see index.css) — same CSS-variable
// cascade re-themes text-ink/text-muted for this dark background across
// every page, since the footer is global, not Home-only.
const Footer = () => (
  <footer className="dark-scope relative z-10 pt-5 sm:pt-14 pb-3 sm:pb-7 px-4 sm:px-8 border-t border-ink/15 bg-[var(--hero-bg)]">
    <div className="max-w-7xl mx-auto">
      {/* Stays 2-wide on a phone, spacing tightened on mobile so the full
          footer fits one viewport without scrolling. */}
      {/* The footer is the one global block that had no reveal at all, so it
          appeared fully-formed under sections that had just animated in. Small
          stagger: it is the end of the page, not a feature of it. */}
      <motion.div
        {...staggerParent(0.06)}
        className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-3 sm:gap-10 mb-4 sm:mb-11"
      >
        <motion.div variants={riseChild} className="col-span-2 md:col-span-1 text-center sm:text-left">
          <Link to="/" className="flex w-full justify-center sm:inline-flex sm:w-auto sm:justify-start items-center gap-2.5 mb-1.5 sm:mb-3 min-h-[30px] sm:min-h-[44px]">
            <img src="/assets/redesign/logo-blue.png" alt="Navedhana" className="h-7 sm:h-9 w-auto" />
            <span className="font-display font-semibold text-lg sm:text-xl text-ink">Navedhana</span>
          </Link>
          <p className="text-[12.5px] sm:text-[13.5px] leading-snug sm:leading-relaxed text-muted/80 max-w-[280px] mx-auto sm:mx-0 mb-2 sm:mb-5">
            Innovating Solution. Growing Futures
          </p>
          <div className="flex justify-center sm:justify-start gap-2 sm:gap-3">
            <a
              href="https://www.linkedin.com/company/navedhana/home/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-ink/5 border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} className="sm:hidden" />
              <Linkedin size={18} className="hidden sm:block" />
            </a>
            <a
              href="https://www.instagram.com/navedhana.pvt.ltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-ink/5 border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink/10 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={15} className="sm:hidden" />
              <Instagram size={18} className="hidden sm:block" />
            </a>
            <a
              href="mailto:contact@navedhana.com"
              className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-ink/5 border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink/10 transition-colors"
              aria-label="Email"
            >
              <Mail size={15} className="sm:hidden" />
              <Mail size={18} className="hidden sm:block" />
            </a>
          </div>
        </motion.div>

        <FooterColumn title="Services">
          {SERVICE_LINKS.map((name) => (
            <Link key={name} to="/services" className={FOOTER_LINK}>
              {name}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Products">
          {PRODUCT_LINKS.map((link) =>
            link.external ? (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
                {link.name}
              </a>
            ) : (
              <Link key={link.name} to={link.path} className={FOOTER_LINK}>
                {link.name}
              </Link>
            )
          )}
        </FooterColumn>

        <FooterColumn title="Company">
          {COMPANY_LINKS.map((link) => (
            <Link key={link.path} to={link.path} className={FOOTER_LINK}>
              {link.name}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Other Ventures">
          {VENTURE_LINKS.map((link) => (
            <Link key={link.name} to={link.path} className={FOOTER_LINK}>
              {link.name}
            </Link>
          ))}
        </FooterColumn>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 pt-2.5 sm:pt-6 border-t border-ink/15 text-[11.5px] sm:text-[12.5px] text-muted/60">
        <span className="order-2 sm:order-1">&copy; {new Date().getFullYear()} Navedhana. All rights reserved.</span>
        <div className="order-1 sm:order-2 flex gap-2">
          <Link to="/privacy" className="flex items-center min-h-[30px] sm:min-h-[44px] px-2 hover:text-ink transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="flex items-center min-h-[30px] sm:min-h-[44px] px-2 hover:text-ink transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
