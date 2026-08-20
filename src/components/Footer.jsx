import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';

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
  { name: 'Vegetable Service', path: '/vegetables' },
  { name: 'Contact', path: '/contact' },
];

// Link rows carry their own vertical padding rather than the column using
// `gap`, so each row is a ~44px tap target on a phone. At 13.5px text with
// gap-2.5 these were 20px tall — the worst tap targets on the site.
const FOOTER_LINK =
  'flex items-center min-h-[44px] sm:min-h-0 sm:py-1 text-[13.5px] leading-snug text-muted hover:text-ink transition-colors';

const FooterColumn = ({ title, children }) => (
  <div>
    <h5 className="text-[13px] sm:text-[12.5px] font-bold uppercase tracking-wide text-muted/60 mb-2 sm:mb-4">{title}</h5>
    <div className="flex flex-col sm:gap-1.5">{children}</div>
  </div>
);

// dark-scope reused from Home.jsx (see index.css) — same CSS-variable
// cascade re-themes text-ink/text-muted for this dark background across
// every page, since the footer is global, not Home-only.
const Footer = () => (
  <footer className="dark-scope relative z-10 pt-10 sm:pt-14 pb-6 sm:pb-7 px-4 sm:px-8 border-t border-ink/15 bg-[var(--hero-bg)]">
    <div className="max-w-7xl mx-auto">
      {/* Stays 2-wide on a phone. A single column was tried and measured 1105px
          tall — thirteen 44px link rows stacked is a worse mobile experience
          than two readable columns, even though each column is narrow. */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-7 sm:gap-10 mb-9 sm:mb-11">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3 min-h-[44px]">
            <img src="/assets/redesign/logo-blue.png" alt="Navedhana" className="h-9 w-auto" />
            <span className="font-display font-semibold text-xl text-ink">Navedhana</span>
          </Link>
          <p className="text-[14px] sm:text-[13.5px] leading-relaxed text-muted/80 max-w-[280px] mb-5">
            Software + AI engineering for real-world problems.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/company/navedhana-profit-amplifier-private-limited/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-ink/5 border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:navedhanaprofitamplifier@gmail.com"
              className="w-11 h-11 rounded-full bg-ink/5 border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink/10 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

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
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 pt-5 sm:pt-6 border-t border-ink/15 text-[13px] sm:text-[12.5px] text-muted/60">
        <span className="order-2 sm:order-1">&copy; {new Date().getFullYear()} Navedhana. All rights reserved.</span>
        <div className="order-1 sm:order-2 flex gap-2">
          <a href="#" className="flex items-center min-h-[44px] px-2 hover:text-ink transition-colors">Terms of Service</a>
          <a href="#" className="flex items-center min-h-[44px] px-2 hover:text-ink transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
