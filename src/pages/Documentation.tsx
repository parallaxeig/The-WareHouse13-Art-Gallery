import React from 'react';

const Documentation: React.FC = () => {
  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Documentation</h1>
      <p>Welcome to the Warehouse 13 Art Gallery documentation. Here you will find all the information needed to use and contribute to the platform.</p>
      
      <section>
        <h2>Getting Started</h2>
        <p>Learn how to create an account, connect your wallet, and start creating and exploring NFTs.</p>
      </section>
      
      <section>
        <h2>Features</h2>
        <ul>
          <li>VR Gallery Experience</li>
          <li>AR Art Preview</li>
          <li>Easy NFT Creation</li>
          <li>Multi-Chain Support</li>
          <li>Community Curation</li>
          <li>Rarity Analytics</li>
        </ul>
      </section>
      
      <section>
        <h2>Support</h2>
        <p>Find help and resources to troubleshoot issues and get the most out of the platform.</p>
      </section>
    </main>
  );
};

export default Documentation;
