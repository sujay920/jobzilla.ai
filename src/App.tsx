import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CareerRecommendations from './components/CareerRecommendations';
import AskJobzilla from './components/AskJobzilla';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <CareerRecommendations />
              <AskJobzilla />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;