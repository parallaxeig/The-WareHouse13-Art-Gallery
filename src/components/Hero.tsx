import React from 'react';
import Button from './Button';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge__icon">✨</span>
            <span className="hero-badge__text">Now with VR/AR Support</span>
          </div>

          <h1 className="hero-title">
            Experience Art in a 
            <span className="hero-title__highlight"> New Dimension</span>
          </h1>

          <p className="hero-description">
            Create, mint, and showcase your digital artwork as NFTs in our immersive VR/AR gallery. 
            Connect your wallet, upload your masterpieces, and step into the future of digital art.
          </p>

          <div className="hero-actions">
            <Button variant="primary" size="lg" leftIcon="🚀">
              Start Creating
            </Button>
            <Button variant="outline" size="lg" leftIcon="🎨">
              Explore Gallery
            </Button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat__number">10K+</span>
              <span className="hero-stat__label">NFTs Created</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat__number">5K+</span>
              <span className="hero-stat__label">Artists</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat__number">$2M+</span>
              <span className="hero-stat__label">Volume Traded</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-container">
            <img 
              src="/placeholder.svg?height=500&width=600" 
              alt="3D VR gallery showcasing digital NFT artwork with immersive lighting"
              className="hero-image"
            />
            <div className="floating-elements">
              <div className="floating-nft floating-nft-1" aria-hidden="true">
                <span className="floating-nft__icon">🎨</span>
              </div>
              <div className="floating-nft floating-nft-2" aria-hidden="true">
                <span className="floating-nft__icon">💎</span>
              </div>
              <div className="floating-nft floating-nft-3" aria-hidden="true">
                <span className="floating-nft__icon">🖼️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
