import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Backstory from './components/Backstory';
import Footer from './components/Footer';
import DevTools from './components/DevTools';

function App() {
  return (
    <div className="App">
      <Hero />
      <Features />
      <Testimonials />
      <Backstory />
      <Footer />
      
      {/* Development tools - only visible in development */}
      <DevTools />
    </div>
  );
}

export default App;
