import React from 'react';

const KYC: React.FC = () => {
  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Know Your Customer (KYC) Policy</h1>
      <p>To comply with global regulations and ensure a secure platform, we require users to complete KYC verification.</p>
      
      <section>
        <h2>Why KYC?</h2>
        <p>KYC helps prevent fraud, money laundering, and ensures the integrity of our marketplace.</p>
      </section>
      
      <section>
        <h2>Information Required</h2>
        <p>Users will be asked to provide identification documents, proof of address, and other relevant information.</p>
      </section>
      
      <section>
        <h2>Data Protection</h2>
        <p>All personal information collected during KYC is securely stored and handled in accordance with our Privacy Policy.</p>
      </section>
      
      <section>
        <h2>Verification Process</h2>
        <p>Verification is typically completed within 1-3 business days. Users will be notified of their status via email.</p>
      </section>
      
      <p>For questions, please contact our support team.</p>
    </main>
  );
};

export default KYC;
