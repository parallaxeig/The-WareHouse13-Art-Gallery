import React from 'react';
import FeatureCard from './FeatureCard';
import './Features.css';

const Features: React.FC = () => {
  const features = [
    {
      icon: '🎨',
      title: 'Upload & Create',
      description: 'Upload high-resolution digital artwork in PNG, SVG, and other formats. Our platform supports various file types for maximum creativity.'
    },
    {
      icon: '🔗',
      title: 'Mint NFTs',
      description: 'Transform your digital art into blockchain-verified NFTs with seamless minting process and secure ownership verification.'
    },
    {
      icon: '💳',
      title: 'Wallet Integration',
      description: 'Connect with MetaMask, WalletConnect, One Key hardware wallet, and other popular wallet solutions for secure transactions.'
    },
    {
      icon: '🥽',
      title: 'VR/AR Gallery',
      description: 'Experience your art collection in immersive virtual and augmented reality environments. Step into your gallery like never before.'
    },
    {
      icon: '📱',
      title: 'PWA Experience',
      description: 'Enjoy offline support, installable app experience, and responsive design that works seamlessly across all devices.'
    },
    {
      icon: '🔒',
      title: 'Secure & Decentralized',
      description: 'Built on blockchain technology with decentralized storage ensuring your artwork and ownership rights are protected forever.'
    }
  ];

  return (
    <section className="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Powerful Features for Digital Artists</h2>
          <p className="features-subtitle">
            Everything you need to create, mint, and showcase your digital art in the metaverse
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
