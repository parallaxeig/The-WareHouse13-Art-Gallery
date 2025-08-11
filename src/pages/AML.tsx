import React from 'react';

const AML: React.FC = () => {
  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Anti-Money Laundering (AML) Policy</h1>
      <p>Warehouse 13 Art Gallery is committed to preventing money laundering and terrorist financing activities.</p>
      
      <section>
        <h2>Compliance</h2>
        <p>We comply with all applicable AML laws and regulations in the jurisdictions where we operate.</p>
      </section>

      <section>
        <h2>Customer Due Diligence</h2>
        <p>We perform due diligence on our users, including identity verification and transaction monitoring.</p>
      </section>

      <section>
        <h2>Reporting Suspicious Activity</h2>
        <p>Any suspicious transactions or activities are reported to the relevant authorities as required by law.</p>
      </section>

      <section>
        <h2>Training and Awareness</h2>
        <p>Our team receives regular training to recognize and prevent money laundering risks.</p>
      </section>

      <p>For questions or concerns, please contact our compliance team.</p>
    </main>
  );
};

export default AML;
