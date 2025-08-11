import React from 'react';
import FeatureCard from './FeatureCard';
import './Features.css';

const Features: React.FC = () => {
  const features = [
    {
      icon: '🥽',
      title: 'VR Gallery Experience',
      description: 'Immerse yourself in a virtual reality art gallery where you can walk through and interact with NFT collections in a 3D environment.'
    },
    {
      icon: '📱',
      title: 'AR Art Preview',
      description: 'Use augmented reality to preview how NFT artwork would look in your real-world space before making a purchase.'
    },
    {
      icon: '🎨',
      title: 'Easy NFT Creation',
      description: 'Upload your digital artwork and mint NFTs with just a few clicks. No technical knowledge required.'
    },
    {
      icon: '🔗',
      title: 'Multi-Chain Support',
      description: 'Connect wallets from Ethereum, Polygon, and other popular blockchains to access your entire NFT collection.'
    },
    {
      icon: '👥',
      title: 'Community Curation',
      description: 'Join a community of artists and collectors who help curate and promote exceptional digital artwork.'
    },
    {
      icon: '💎',
      title: 'Rarity Analytics',
      description: 'Advanced tools to analyze NFT rarity, market trends, and investment potential with real-time data.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="features__container">
        <header className="features__header">
          <h2 className="features__title">Revolutionary NFT Experience</h2>
          <p className="features__subtitle">
            Discover the future of digital art with cutting-edge VR/AR technology 
            and seamless blockchain integration.
          </p>
        </header>
        
        <div className="features__grid">
          {features.map((feature, index) => (
            <div key={feature.title} className="features__item" style={{ animationDelay: `${index * 0.1}s` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
