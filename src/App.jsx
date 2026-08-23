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
import Terms from './pages/Terms';
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
          {/* Route transition. Keyed on pathname so each navigation mounts a
              fresh node and replays the `page-enter` keyframe (index.css).

              Deliberately CSS rather than a Framer initial/animate pair, and
              deliberately transform-only rather than a fade. This element wraps
              EVERY page, so its failure mode is the whole site: anything that
              starts at opacity 0 is invisible until the animation actually
              progresses, which turns a stalled animation into a blank page.
              Starting 6px low instead means the worst case is a slightly
              offset — but fully readable — page.

              No exit animation and no AnimatePresence mode="wait" either: both
              keep the outgoing page mounted while the incoming one arrives,
              which stacks two full pages and fights ScrollToTop for the scroll
              position. */}
          <main className="flex-1">
            <div key={location.pathname} className="page-enter">
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
              <Route path="/terms" element={<Terms />} />
              <Route path="/work" element={<Navigate to="/products" replace />} />
            </Routes>
            </div>
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
