import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { trackEvent } from '../lib/analytics';

const links = [
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
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 mx-auto flex items-center justify-between gap-6 max-w-none w-full px-4 sm:px-8 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'h-[72px] bg-card border-b border-ink/15'
            : 'h-[84px] bg-transparent border-b border-transparent'
        }`}
      >
        <Link to="/" className="group relative flex items-center gap-2.5 flex-shrink-0">
          <span
            className="absolute -left-2 -top-2 w-11 h-11 rounded-full bg-electric/0 group-hover:bg-electric/10 blur-md transition-colors duration-base"
            aria-hidden="true"
          />
          <motion.img
            src="/assets/redesign/logo-blue.png"
            alt="Navedhana"
            className="relative h-10 w-auto"
            whileHover={{ scale: 1.08, rotate: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          />
          <span className="font-display font-semibold text-xl text-ink tracking-tight">Navedhana</span>
        </Link>

        <div className="relative hidden lg:flex items-center gap-2 text-[14.5px] font-medium text-ink/70 whitespace-nowrap">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-3.5 py-2 transition-colors duration-base ${
                isActive(link.path) ? 'text-ink' : 'hover:text-ink'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.span
                  layoutId="navbar-node"
                  className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-electric"
                  style={{ boxShadow: '0 0 6px rgba(1,100,245,0.65)' }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.55 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block flex-shrink-0">
          <Button to="/contact" size="sm" onClick={() => trackEvent('cta_click', { location: 'navbar' })}>
            Discuss Your Project →
          </Button>
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-ink"
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
