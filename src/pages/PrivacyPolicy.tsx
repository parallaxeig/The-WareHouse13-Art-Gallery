import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Privacy Policy</h1>
      <p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.</p>
      
      <section>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly, such as account details and wallet information, and data collected automatically through your use of the platform.</p>
      </section>

      <section>
        <h2>How We Use Information</h2>
        <p>Information is used to provide and improve our services, communicate with you, and comply with legal obligations.</p>
      </section>

      <section>
        <h2>Data Security</h2>
        <p>We implement security measures to protect your information from unauthorized access and disclosure.</p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>You have rights regarding your personal data, including access, correction, and deletion, subject to applicable laws.</p>
      </section>

      <section>
        <h2>International Transfers</h2>
        <p>Your information may be transferred and processed in countries other than your own, in compliance with applicable laws.</p>
      </section>

      <p>For questions or concerns, please contact our privacy team.</p>
    </main>
  );
};

export default PrivacyPolicy;
