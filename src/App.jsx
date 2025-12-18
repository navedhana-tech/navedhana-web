import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vegetables from './pages/Vegetables';
import Software from './pages/Software';
import Seasonal from './pages/Seasonal';
import About from './pages/About';
import Contact from './pages/Contact';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col">
        <Navbar />
        <main>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vegetables" element={<Vegetables />} />
            <Route path="/software" element={<Software />} />
            <Route path="/seasonal" element={<Seasonal />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
