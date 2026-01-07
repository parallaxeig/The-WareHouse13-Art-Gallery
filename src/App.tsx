import React from 'react';
import Header from './components/Header';

import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Backstory from './components/Backstory';
import Community from './components/Community';
import Footer from './components/Footer';
import DevTools from './components/DevTools';
import ImageDiagnosticTool from './components/ImageDiagnosticTool';

import './styles/fluent-design-system.css';
import './styles/global.css';

function App() {
  return (
    <div className="fluent-app">
      <Header />


      <main className="fluent-main" style={{ width: '100%', overflowX: 'hidden' }}>
        <section id="hero" className="fluent-section">
          <div className="fluent-container">
            <Hero />
          </div>
        </section>

        <section id="gallery" className="fluent-section fluent-mt-xxxl">
          <div className="fluent-container">
            <h2 className="fluent-text-title-1 fluent-mb-xl">Gallery</h2>
            <div className="fluent-grid fluent-grid-3">
              <div className="fluent-card">
                <img src="/nft-1.png" alt="NFT Art 1" className="fluent-image" />
                <div className="fluent-card__content">
                  <h3 className="fluent-text-title-3">Digital Dreams</h3>
                  <p className="fluent-text-body-2">AI-generated masterpiece</p>
                </div>
              </div>
              <div className="fluent-card">
                <img src="/nft-2.png" alt="NFT Art 2" className="fluent-image" />
                <div className="fluent-card__content">
                  <h3 className="fluent-text-title-3">Virtual Reality</h3>
                  <p className="fluent-text-body-2">Immersive experience</p>
                </div>
              </div>
              <div className="fluent-card">
                <img src="/nft-3.png" alt="NFT Art 3" className="fluent-image" />
                <div className="fluent-card__content">
                  <h3 className="fluent-text-title-3">Metaverse Magic</h3>
                  <p className="fluent-text-body-2">Future of art</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="create" className="fluent-section fluent-mt-xxxl">
          <div className="fluent-container">
            <h2 className="fluent-text-title-1 fluent-mb-xl">Create Your Masterpiece</h2>
            <ImageDiagnosticTool />
          </div>
        </section>

        <Features />

        <section id="testimonials" className="fluent-section fluent-mt-xxxl">
          <div className="fluent-container">
            <h2 className="fluent-text-title-1 fluent-mb-xl">What Artists Say</h2>
            <Testimonials />
          </div>
        </section>

        <section id="about" className="fluent-section fluent-mt-xxxl">
          <div className="fluent-container">
            <h2 className="fluent-text-title-1 fluent-mb-xl">About Warehouse 13</h2>
            <Backstory />
          </div>
        </section>

        <Community />
      </main>

      <Footer />
      <DevTools />
    </div>
  );
}

export default App;
