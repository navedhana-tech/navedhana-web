import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vegetables from './pages/Vegetables';
import Services from './pages/Services';
import Seasonal from './pages/Seasonal';
import About from './pages/About';
import Contact from './pages/Contact';
import IntroAnimation from './components/intro/IntroAnimation';
import { useIntroSeen } from './hooks/useIntroSeen';

import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();
  const [seen, markSeen] = useIntroSeen();
  const [introActive, setIntroActive] = useState(location.pathname === '/' && !seen);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar logoVisible={!introActive} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vegetables" element={<Vegetables />} />
          <Route path="/services" element={<Services />} />
          <Route path="/seasonal" element={<Seasonal />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <AnimatePresence>
        {introActive && (
          <IntroAnimation
            key="intro"
            onComplete={() => {
              markSeen();
              setIntroActive(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
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
