import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import FloatingChatBot from './components/FloatingChatBot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 text-white font-poppins">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <About />
              <Contact />
            </>
          } />
        </Routes>
        <FloatingChatBot />
      </div>
    </Router>
  );
}

export default App;