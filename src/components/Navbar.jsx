import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import LogoMark from './intro/LogoMark';
import { trackEvent } from '../lib/analytics';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/products' },
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
];

// Full-width on scroll — a flat solid bar with one hairline border, not a
// floating inset pill. Secondary destinations (AI Agent, Insights, Vegetable
// Service) live in the footer — keeping the primary nav to four links is
// what lets the dropdown go away entirely. The active link is marked by a
// small dot below it (echoes the logo mark's circuit-stem motif) rather
// than an underline.
const Navbar = ({ introDone = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Home's hero is a fixed, full-viewport section (Home.jsx) with its own
  // large "Discuss Your Project" CTA — the navbar's copy is redundant while
  // the navbar is still transparent over the hero, and appears the moment
  // the navbar itself turns solid/white (the same `isScrolled` threshold).
  // Every other page has no equivalent hero CTA, so it just stays visible.
  const showNavCta = !isHome || isScrolled;

  // The home hero (Home.jsx `.hero-dark`) is a dark background; the navbar
  // is a DOM sibling of it, not a descendant, so it can't pick up that
  // scope's light-text token overrides via CSS cascade — it needs its own
  // light-text state for exactly the window where it's transparent over
  // that dark section (home, not yet scrolled).
  const overDarkHero = isHome && !isScrolled;

  return (
    <>
      <nav
        className={`fixed z-50 mx-auto flex items-center justify-between gap-6 border transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'top-3 sm:top-4 left-3 right-3 sm:left-6 sm:right-6 lg:left-10 lg:right-10 max-w-7xl h-[68px] px-5 sm:px-8 rounded-full bg-card/65 backdrop-blur-xl backdrop-saturate-150 border-white/40 shadow-[0_8px_30px_-8px_rgba(28,26,23,0.2),0_1px_0_0_rgba(255,255,255,0.5)_inset]'
            : 'top-0 left-0 right-0 max-w-none w-full h-[84px] px-4 sm:px-8 rounded-none bg-transparent border-transparent shadow-none'
        }`}
      >
        <Link to="/" className="group relative flex items-center gap-2.5 flex-shrink-0">
          <span
            className="absolute -left-2 -top-2 w-11 h-11 rounded-full bg-electric/0 group-hover:bg-electric/10 blur-md transition-colors duration-base"
            aria-hidden="true"
          />
          <motion.span
            className="relative inline-block h-10 w-10"
            whileHover={{ scale: 1.08, rotate: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <LogoMark
              stage="settled"
              layoutId={introDone ? 'brand-logomark' : undefined}
              className={`h-10 w-10 text-electric transition-opacity duration-300 ${
                introDone ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </motion.span>
          <span className={`font-display font-semibold text-xl tracking-tight ${overDarkHero ? 'text-white' : 'text-ink'}`}>Navedhana</span>
        </Link>

        <div className={`relative hidden lg:flex items-center gap-2 text-[14.5px] font-medium whitespace-nowrap ${overDarkHero ? 'text-white/70' : 'text-ink/70'}`}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link px-3.5 py-2 rounded-full transition-colors duration-base ${
                isActive(link.path)
                  ? (overDarkHero ? 'text-white' : 'text-ink')
                  : (overDarkHero ? 'hover:text-white hover:bg-white/10' : 'hover:text-ink hover:bg-ink/[0.05]')
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.span
                  layoutId="navbar-underline"
                  className="absolute left-3.5 right-3.5 -bottom-[1px] h-[1.5px] rounded-full bg-electric"
                  style={{ boxShadow: '0 0 6px rgba(1,100,245,0.5)' }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.55 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block flex-shrink-0 min-w-[186px] text-right">
          <AnimatePresence>
            {showNavCta && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <Button to="/contact" size="sm" onClick={() => trackEvent('cta_click', { location: 'navbar' })}>
                  Discuss Your Project →
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className={`lg:hidden p-2 -mr-2 ${overDarkHero ? 'text-white' : 'text-ink'}`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[92px] left-4 right-4 z-[2000] rounded-2xl bg-card border border-ink/15 shadow-2xl p-2 max-h-[calc(100vh-110px)] overflow-auto lg:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                  isActive(link.path) ? 'bg-ink/[0.06] text-ink' : 'text-ink/70 hover:bg-ink/[0.06]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block mt-2 px-4 py-3 rounded-xl bg-electric text-primary font-bold text-center"
            >
              Discuss Your Project →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
