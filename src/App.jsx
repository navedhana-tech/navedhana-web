import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GradientBlobs from './components/background/GradientBlobs';
import LogoIntro from './components/intro/LogoIntro';
import { IntroContext } from './lib/introContext';
import Home from './pages/Home';
import Vegetables from './pages/Vegetables';
import Seasonal from './pages/Seasonal';
import Solar from './pages/Solar';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import AiAgent from './pages/AiAgent';
import Products from './pages/Products';
import Insights from './pages/Insights';
import Privacy from './pages/Privacy';
import { useScrollDepth } from './hooks/useScrollDepth';

import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  useScrollDepth();
  const location = useLocation();

  // Decided once, at first mount, from the URL actually loaded — the intro
  // is a site-entrance sequence, not a per-navigation loader, so it's never
  // recomputed on route changes.
  const [shouldRunIntro] = useState(() => {
    if (typeof window === 'undefined' || location.pathname !== '/') return false;
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      return sessionStorage.getItem('navedhana_intro_seen') !== '1';
    } catch {
      return false;
    }
  });
  const [introDone, setIntroDone] = useState(!shouldRunIntro);

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem('navedhana_intro_seen', '1');
    } catch {
      // sessionStorage unavailable (private mode etc.) — intro just replays next load
    }
    setIntroDone(true);
  };

  return (
    <IntroContext.Provider value={introDone}>
      {/* reducedMotion="user" makes Framer honour the OS setting for every
          motion component below: transform and layout animations are dropped,
          opacity still fades. The global rule in index.css only covers CSS
          animations, so without this the whole JS-driven reveal system ignored
          the preference. */}
      <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <GradientBlobs />
          <AnimatePresence>
            {shouldRunIntro && !introDone && <LogoIntro key="logo-intro" onComplete={handleIntroComplete} />}
          </AnimatePresence>
          <Navbar introDone={introDone} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/vegetables" element={<Vegetables />} />
              <Route path="/seasonal" element={<Seasonal />} />
              <Route path="/solar" element={<Solar />} />
              <Route path="/services" element={<Services />} />
              <Route path="/ai-agent" element={<AiAgent />} />
              <Route path="/products" element={<Products />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/work" element={<Navigate to="/products" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LayoutGroup>
      </MotionConfig>
    </IntroContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
