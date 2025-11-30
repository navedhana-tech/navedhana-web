import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../public/assets/logo/2.png';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Vegetables', path: '/vegetables' },
    { name: 'Software', path: '/software' },
    { name: 'Seasonal', path: '/seasonal' },
  ];

  const isActive = (path) => location.pathname === path;

  // Dynamic styles based on route
  const getThemeStyles = () => {
    switch (location.pathname) {
      case '/':
      case '/vegetables':
        return {
          border: 'border-green-200/50',
          activeBg: 'bg-green-100',
          activeText: 'text-green-800',
          glow: 'shadow-green-500/20',
          gradientText: 'from-green-700 to-emerald-900'
        };
      case '/software':
        return {
          border: 'border-blue-200/50',
          activeBg: 'bg-blue-100',
          activeText: 'text-blue-800',
          glow: 'shadow-blue-500/20',
          gradientText: 'from-blue-700 to-cyan-900'
        };
      case '/seasonal':
        return {
          border: 'border-orange-200/50',
          activeBg: 'bg-orange-100',
          activeText: 'text-orange-800',
          glow: 'shadow-orange-500/20',
          gradientText: 'from-orange-700 to-amber-900'
        };
      default:
        return {
          border: 'border-gray-200/50',
          activeBg: 'bg-gray-100',
          activeText: 'text-gray-900',
          glow: 'shadow-gray-500/20',
          gradientText: 'from-gray-700 to-gray-900'
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'
          }`}
      >
        {/* Floating Island Container */}
        <div className={`relative px-6 py-2 bg-gray-900/20 backdrop-blur-md rounded-full border ${theme.border} shadow-lg ${theme.glow} transition-all duration-300`}>
          <div className="flex justify-between items-center">

            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                <img src={logo} alt="Navedhana" className="w-full h-full object-contain" />
              </div>
              <span className={`font-bold text-xl bg-gradient-to-r ${theme.gradientText} bg-clip-text text-transparent tracking-tight hidden sm:block`}>
                Navedhana
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group hover:bg-white/20"
                >
                  <span className={`relative z-10 transition-colors duration-300 ${isActive(link.path) ? theme.activeText : 'text-gray-800 group-hover:text-black'}`}>
                    {link.name}
                  </span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-pill"
                      className={`absolute inset-0 rounded-full ${theme.activeBg}`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-white/20 transition-colors text-gray-800"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown (Detached) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden md:hidden"
          >
            <div className="p-2 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-center px-4 py-3 rounded-2xl text-base font-medium transition-all ${isActive(link.path)
                    ? `${theme.activeBg} ${theme.activeText}`
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
