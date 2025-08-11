import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Backstory from './Backstory';
import Testimonials from './Testimonials';
import Footer from './Footer';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Header />
      <main>
        <Hero />
        <Features />
        <Backstory />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
