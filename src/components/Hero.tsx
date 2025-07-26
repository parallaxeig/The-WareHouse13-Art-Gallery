import React from 'react';
import Button from './Button';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Experience Art in a New Dimension
          </h1>
          <p className="hero-description">
            Create, mint, and showcase your digital artwork as NFTs in our immersive VR/AR gallery. 
            Connect your wallet, upload your masterpieces, and step into the future of digital art.
          </p>
          <div className="hero-actions">
            <Button variant="primary" size="large">
              Start Creating
            </Button>
            <Button variant="secondary" size="large">
              Explore Gallery
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-container">
            <img 
              src="/placeholder.svg?height=500&width=600" 
              alt="3D VR gallery showcasing digital NFT artwork"
              className="hero-image"
            />
            <div className="floating-elements">
              <div className="floating-nft floating-nft-1"></div>
              <div className="floating-nft floating-nft-2"></div>
              <div className="floating-nft floating-nft-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
