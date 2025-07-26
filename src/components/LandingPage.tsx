import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Backstory from './Backstory';
import Testimonials from './Testimonials';
import Footer from './Footer';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Hero />
      <Features />
      <Backstory />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;
