import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Backstory from './components/Backstory';
import Footer from './components/Footer';
import DevTools from './components/DevTools';
import './styles/fluent-design-system.css';

function App() {
  return (
    <div className="fluent-app">
      {/* Update all components to use Fluent classes */}
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
              {/* Gallery items */}
            </div>
          </div>
        </section>
        
        <section id="create" className="fluent-section fluent-mt-xxxl">
          <div className="fluent-container">
            <h2 className="fluent-text-title-1 fluent-mb-xl">Create</h2>
            <ImageDiagnosticTool />
          </div>
        </section>
        
        <section id="about" className="fluent-section fluent-mt-xxxl">
          <div className="fluent-container">
            <h2 className="fluent-text-title-1 fluent-mb-xl">About</h2>
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
                icon="���"
                title="Global Community"
                description="Connect with creators worldwide and share your work"
              />
            </div>
          </div>
        </section>
        
        <section id="community" className="fluent-section fluent-mt-xxxl fluent-mb-xxxl">
          <div className="fluent-container">
            <h2 className="fluent-text-title-1 fluent-mb-xl">Community</h2>
            {/* Community content */}
          </div>
        </section>
      </main>
      
      <DevTools />
    </div>
  );
}

export default App;
