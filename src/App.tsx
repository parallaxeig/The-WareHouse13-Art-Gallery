import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Backstory from './components/Backstory';
import Footer from './components/Footer';
import DevTools from './components/DevTools';
import ImageDiagnosticTool from './components/ImageDiagnosticTool';
import FeatureCard from './components/FeatureCard';
import './styles/fluent-design-system.css';
import './styles/global.css';

function App() {
  return (
    <div className="fluent-app">
      <Header />
      
      <main className="fluent-main">
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
                <img src="https://via.placeholder.com/400x300/115ea3/ffffff?text=NFT+Art+1" alt="NFT Art 1" className="fluent-image" />
                <div className="fluent-card__content">
                  <h3 className="fluent-text-title-3">Digital Dreams</h3>
                  <p className="fluent-text-body-2">AI-generated masterpiece</p>
                </div>
              </div>
              <div className="fluent-card">
                <img src="https://via.placeholder.com/400x300/2886de/ffffff?text=NFT+Art+2" alt="NFT Art 2" className="fluent-image" />
                <div className="fluent-card__content">
                  <h3 className="fluent-text-title-3">Virtual Reality</h3>
                  <p className="fluent-text-body-2">Immersive experience</p>
                </div>
              </div>
              <div className="fluent-card">
                <img src="https://via.placeholder.com/400x300/479ef5/ffffff?text=NFT+Art+3" alt="NFT Art 3" className="fluent-image" />
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
        
        <section id="features" className="fluent-section fluent-mt-xxxl">
          <div className="fluent-container">
            <h2 className="fluent-text-title-1 fluent-mb-xl">Why Choose Us</h2>
            <div className="fluent-grid fluent-grid-3">
              <FeatureCard
                icon="🎨"
                title="AI-Powered Creation"
                description="Generate stunning artifacts using advanced AI technology"
              />
              <FeatureCard
                icon="🔍"
                title="Smart Analysis"
                description="Comprehensive diagnostic tools for image optimization"
              />
              <FeatureCard
                icon="🌐"
                title="Global Community"
                description="Connect with creators worldwide and share your work"
              />
            </div>
          </div>
        </section>
        
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
        
        <section id="community" className="fluent-section fluent-mt-xxxl">
          <div className="fluent-container">
            <h2 className="fluent-text-title-1 fluent-mb-xl">Join Our Community</h2>
            <div className="fluent-card">
              <div className="fluent-card__content">
                <h3 className="fluent-text-title-2 fluent-mb-m">Connect With Fellow Artists</h3>
                <p className="fluent-text-body-1">
                  Be part of a vibrant community of digital artists, collectors, and enthusiasts. 
                  Share your work, get feedback, and collaborate on exciting projects.
                </p>
                <div className="fluent-mt-l">
                  <button className="fluent-button fluent-button--primary">
                    Join Discord
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <DevTools />
    </div>
  );
}

export default App;
