import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoMark from './intro/LogoMark';
import Button from './ui/Button';
import TypingText from './ui/TypingText';

const links = [
 { name: 'Home', path: '/' },
 { name: 'Services', path: '/services' },
 { name: 'About', path: '/about' },
 { name: 'Contact', path: '/contact' },
];

const Navbar = ({ logoVisible = true }) => {
 const [isOpen, setIsOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const location = useLocation();

 useEffect(() => {
 const handleScroll = () => setScrolled(window.scrollY > 20);
 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const isActive = (path) => location.pathname === path;

 return (
 <>
 <nav
 className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-base ${
 scrolled ? 'bg-primary/90 backdrop-blur-lg border-white/10' : 'bg-primary/60 backdrop-blur-md border-white/5'
 }`}
 >
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex justify-between items-center h-20">
 <Link to="/" className="flex items-center gap-3 group">
 <motion.div
 layoutId="brand-mark"
 className="w-10 h-10 group-hover:scale-110 transition-transform duration-base"
 style={{ opacity: logoVisible ? 1 : 0 }}
 >
 <LogoMark size={40} />
 </motion.div>
 <span className="font-display font-bold text-xl text-ink tracking-tight">
 Navedhana
 </span>
 </Link>

 <div className="hidden lg:flex items-center space-x-8">
 {links.map((link) => (
 <Link
 key={link.path}
 to={link.path}
 className={`relative text-sm font-medium transition-colors duration-base ${
 isActive(link.path) ? 'text-electric' : 'text-muted hover:text-ink'
 }`}
 >
 <TypingText text={link.name} speed={30} />
 {isActive(link.path) && (
 <motion.div
 layoutId="navbar-underline"
 className="absolute -bottom-1 left-0 right-0 h-0.5 bg-electric"
 transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
 />
 )}
 </Link>
 ))}
 </div>

 <div className="hidden lg:flex items-center">
 <Button to="/contact" size="sm">
 <TypingText text="Start a Project" speed={26} />
 </Button>
 </div>

 <button
 onClick={() => setIsOpen((v) => !v)}
 className="lg:hidden p-2 hover:bg-white/5 transition-colors text-ink"
 aria-label={isOpen ? 'Close menu' : 'Open menu'}
 >
 {isOpen ? <X size={24} /> : <Menu size={24} />}
 </button>
 </div>
 </div>
 </nav>

 <AnimatePresence>
 {isOpen && (
 <motion.div
 initial={{ opacity: 0, y: -20, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: -20, scale: 0.95 }}
 transition={{ duration: 0.2 }}
 className="fixed top-[84px] left-1/2 -translate-x-1/2 z-[2000] w-[90%] max-w-sm bg-surface/95 backdrop-blur-xl shadow-2xl border border-white/10 overflow-hidden lg:hidden"
 >
 <div className="p-2 space-y-1">
 {[...links, { name: 'Start a Project', path: '/contact' }].map((link) => (
 <div key={link.path} onClick={() => setIsOpen(false)} className="w-full">
 <Link
 to={link.path}
 className={`flex items-center justify-center px-4 py-3 text-base font-medium transition-all w-full ${
 isActive(link.path) ? 'bg-electric text-primary' : 'text-muted hover:bg-white/5'
 }`}
 >
 <TypingText text={link.name} speed={26} />
 </Link>
 </div>
 ))}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
};

export default Navbar;
