import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GradientBlobs from './components/background/GradientBlobs';
import Home from './pages/Home';
import Vegetables from './pages/Vegetables';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import AiAgent from './pages/AiAgent';
import Products from './pages/Products';
import Work from './pages/Work';
import Insights from './pages/Insights';
import { useScrollDepth } from './hooks/useScrollDepth';

import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  useScrollDepth();

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <GradientBlobs />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vegetables" element={<Vegetables />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ai-agent" element={<AiAgent />} />
          <Route path="/products" element={<Products />} />
          <Route path="/work" element={<Work />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/seasonal" element={<Navigate to="/vegetables" replace />} />
        </Routes>
      </main>
      <Footer />
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
