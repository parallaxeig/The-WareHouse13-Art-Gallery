import React from 'react';
import FeatureCard from './FeatureCard';
import { Palette, ScanSearch, Glasses, Smartphone, Zap, Link, Users, Gem } from 'lucide-react';


const Features: React.FC = () => {
  const features = [
    {
      icon: <Palette size={32} color="#0078d4" />,
      title: 'AI-Powered Creation',
      description: 'Generate stunning artifacts using advanced AI technology.'
    },
    {
      icon: <ScanSearch size={32} color="#0078d4" />,
      title: 'Smart Analysis',
      description: 'Comprehensive diagnostic tools for image optimization.'
    },
    {
      icon: <Glasses size={32} color="#0078d4" />,
      title: 'VR Gallery Experience',
      description: 'Immerse yourself in a virtual reality art gallery where you can walk through and interact with NFT collections in a 3D environment.'
    },
    {
      icon: <Smartphone size={32} color="#0078d4" />,
      title: 'AR Art Preview',
      description: 'Use augmented reality to preview how NFT artwork would look in your real-world space before making a purchase.'
    },
    {
      icon: <Zap size={32} color="#0078d4" />,
      title: 'Easy NFT Minting',
      description: 'Upload your digital artwork and mint NFTs with just a few clicks. No technical knowledge required.'
    },
    {
      icon: <Link size={32} color="#0078d4" />,
      title: 'Multi-Chain Support',
      description: 'Connect wallets from Ethereum, Polygon, and other popular blockchains to access your entire NFT collection.'
    },
    {
      icon: <Users size={32} color="#0078d4" />,
      title: 'Community Curation',
      description: 'Join a community of artists and collectors who help curate and promote exceptional digital artwork.'
    },
    {
      icon: <Gem size={32} color="#0078d4" />,
      title: 'Rarity Analytics',
      description: 'Advanced tools to analyze NFT rarity, market trends, and investment potential with real-time data.'
    }
  ];

  return (
    <section className="fluent-section fluent-mt-xxxl" id="features">
      <div className="fluent-container">
        <div className="fluent-mb-xl" style={{ textAlign: 'center' }}>
          <h2 className="fluent-text-title-1 fluent-mb-s">Why Choose Us</h2>
          <p className="fluent-text-body-1" style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--fluent-color-neutral-secondary)' }}>
            Discover the future of digital art with cutting-edge AI, VR/AR technology
            and seamless blockchain integration.
          </p>
        </div>

        <div className="fluent-grid fluent-grid-3">
          {features.map((feature, index) => (
            <div key={feature.title} style={{ animationDelay: `${index * 0.1}s` }} className="fluent-fade-in">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
