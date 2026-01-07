import React from 'react';
import Button from './Button';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <img src="/hero-bg.png" alt="Abstract digital art background" className="hero-background__image" />
        <div className="hero-background__overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge__text">✨ Now with VR/AR Support</span>
          </div>

          <h1 className="hero-title">
            Experience Art in a
            <span className="hero-title__highlight">New Dimension</span>
          </h1>

          <p className="hero-description">
            Create, mint, and showcase your digital artwork as NFTs in our immersive VR/AR gallery.
            Step into the future of digital expression.
          </p>

          <div className="hero-actions">
            <Button variant="primary" size="lg" leftIcon="🚀">
              Start Creating
            </Button>
            <Button variant="outline" size="lg" leftIcon="🎨">
              Explore Gallery
            </Button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-stack">
            {/* Main featured visual */}
            <img src="/hero-visual.png" alt="Futuristic VR Gallery Interface" className="hero-visual__main-img" />

            {/* Floating Stats */}
            <div className="floating-element float-1">
              <span className="float-icon">💎</span>
              <div>
                <div className="float-label">Volume</div>
                <div className="float-stat">$2M+</div>
              </div>
            </div>

            <div className="floating-element float-2">
              <span className="float-icon">👥</span>
              <div>
                <div className="float-label">Artists</div>
                <div className="float-stat">5k+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
