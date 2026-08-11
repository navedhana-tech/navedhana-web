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
  { name: 'Work', path: '/work' },
  { name: 'Insights', path: '/insights' },
  { name: 'Vegetable Service', path: '/vegetables' },
  { name: 'Contact', path: '/contact' },
];

const Footer = () => (
  <footer className="relative z-10 pt-14 pb-7 px-4 sm:px-8 border-t border-ink/15 bg-surface">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-11">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <img src="/assets/redesign/logo-blue.png" alt="Navedhana" className="h-6 w-auto" />
            <span className="font-display font-semibold text-lg text-ink">Navedhana</span>
          </Link>
          <p className="text-[13.5px] leading-relaxed text-muted/80 max-w-[280px] mb-5">
            Software + AI engineering for real-world problems.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/company/navedhana-profit-amplifier-private-limited/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-ink/5 border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:navedhanaprofitamplifier@gmail.com"
              className="w-9 h-9 rounded-full bg-ink/5 border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink/10 transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div>
          <h5 className="text-[12.5px] font-bold uppercase tracking-wide text-muted/60 mb-4">Services</h5>
          <div className="flex flex-col gap-2.5 text-[13.5px] text-muted">
            {SERVICE_LINKS.map((name) => (
              <Link key={name} to="/services" className="hover:text-ink transition-colors">
                {name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-[12.5px] font-bold uppercase tracking-wide text-muted/60 mb-4">Products</h5>
          <div className="flex flex-col gap-2.5 text-[13.5px] text-muted">
            {PRODUCT_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} to={link.path} className="hover:text-ink transition-colors">
                  {link.name}
                </Link>
              )
            )}
          </div>
        </div>

        <div>
          <h5 className="text-[12.5px] font-bold uppercase tracking-wide text-muted/60 mb-4">Company</h5>
          <div className="flex flex-col gap-2.5 text-[13.5px] text-muted">
            {COMPANY_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className="hover:text-ink transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-ink/15 text-[12.5px] text-muted/60">
        <span>&copy; {new Date().getFullYear()} Navedhana. All rights reserved.</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
