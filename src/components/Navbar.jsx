import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
const logo = '/assets/logo/NPA_Logo_Enlarge.png';
const blueLogo = '/assets/logo/blueLogo_Englarge.png';
const orangeLogo = '/assets/logo/orangeLogo_Englarge.png';
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
    { name: 'About', path: '/about' },
    { name: 'Vegetables', path: '/vegetables' },
    { name: 'Software', path: '/software' },
    { name: 'Seasonal', path: '/seasonal' },
  ];

  const isActive = (path) => location.pathname === path;

  // Get logo based on current route
  const getCurrentLogo = () => {
    switch (location.pathname) {
      case '/software':
        return blueLogo;
      case '/seasonal':
        return orangeLogo;
      default:
        return logo;
    }
  };

  // Dynamic styles based on route
  const getThemeStyles = () => {
    switch (location.pathname) {
      case '/':
        return {
          border: 'border-lime-200/50',
          activeBg: 'bg-lime-600',
          activeText: 'text-lime-600',
          buttonBg: 'bg-lime-600 hover:bg-lime-700',
          buttonBorder: 'border-lime-600',
          glow: 'shadow-lime-500/20',
          gradientText: 'from-lime-700 to-lime-900'
        };
      case '/vegetables':
        return {
          border: 'border-green-200/50',
          activeBg: 'bg-green-600',
          activeText: 'text-green-600',
          buttonBg: 'bg-green-600 hover:bg-green-700',
          buttonBorder: 'border-green-600',
          glow: 'shadow-green-500/20',
          gradientText: 'from-green-700 to-emerald-900'
        };
      case '/about':
        return {
          border: 'border-indigo-200/50',
          activeBg: 'bg-indigo-600',
          activeText: 'text-indigo-600',
          buttonBg: 'bg-indigo-600 hover:bg-indigo-700',
          buttonBorder: 'border-indigo-600',
          glow: 'shadow-indigo-500/20',
          gradientText: 'from-indigo-700 to-violet-900'
        };
      case '/software':
        return {
          border: 'border-blue-200/50',
          activeBg: 'bg-blue-600',
          activeText: 'text-blue-600',
          buttonBg: 'bg-blue-600 hover:bg-blue-700',
          buttonBorder: 'border-blue-600',
          glow: 'shadow-blue-500/20',
          gradientText: 'from-blue-700 to-cyan-900'
        };
      case '/seasonal':
        return {
          border: 'border-orange-200/50',
          activeBg: 'bg-orange-600',
          activeText: 'text-orange-600',
          buttonBg: 'bg-orange-600 hover:bg-orange-700',
          buttonBorder: 'border-orange-600',
          glow: 'shadow-orange-500/20',
          gradientText: 'from-orange-700 to-amber-900'
        };
      default:
        return {
          border: 'border-gray-200/50',
          activeBg: 'bg-gray-600',
          activeText: 'text-gray-900',
          buttonBg: 'bg-gray-600 hover:bg-gray-700',
          buttonBorder: 'border-gray-600',
          glow: 'shadow-gray-500/20',
          gradientText: 'from-gray-700 to-gray-900'
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors transition-shadow duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                <img src={getCurrentLogo()} alt="Navedhana" className="w-full h-full object-contain" />
              </div>
              <span className={`font-bold text-xl bg-gradient-to-r ${theme.gradientText} bg-clip-text text-transparent tracking-tight`}>
                Navedhana
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                    ? theme.activeText
                    : 'text-gray-700 hover:text-gray-900'
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-underline"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${theme.activeBg}`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Action Buttons - Right */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/about"
                className={`px-5 py-2.5 text-sm font-semibold ${theme.activeText} border-2 ${theme.buttonBorder} rounded-lg hover:bg-opacity-10 transition-all`}
              >
                GET STARTED
              </Link>
              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  const footer = document.getElementById('footer');
                  if (footer) {
                    footer.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`px-5 py-2.5 text-sm font-semibold text-white ${theme.buttonBg} rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer`}
              >
                CONTACT US
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden lg:hidden"
          >
            <div className="p-2 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-center px-4 py-3 rounded-2xl text-base font-medium transition-all ${isActive(link.path)
                    ? `${theme.activeBg} text-white`
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
