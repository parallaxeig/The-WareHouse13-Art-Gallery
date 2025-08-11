import React from 'react';

const DMCA: React.FC = () => {
  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>DMCA Policy</h1>
      <p>Warehouse 13 Art Gallery respects the intellectual property rights of others and expects users to do the same.</p>
      
      <section>
        <h2>Notice of Infringement</h2>
        <p>If you believe your work has been copied in a way that constitutes copyright infringement, please notify us with the following information:</p>
        <ul>
          <li>A physical or electronic signature of the copyright owner or authorized agent</li>
          <li>Identification of the copyrighted work claimed to have been infringed</li>
          <li>Identification of the material claimed to be infringing and its location</li>
          <li>Your contact information</li>
          <li>A statement of good faith belief that the use is not authorized</li>
          <li>A statement that the information is accurate</li>
        </ul>
      </section>

      <section>
        <h2>Counter-Notification</h2>
        <p>If you believe your content was removed in error, you may submit a counter-notification with your contact information and a statement under penalty of perjury.</p>
      </section>

      <section>
        <h2>Repeat Infringers</h2>
        <p>We reserve the right to terminate accounts of repeat infringers in accordance with the DMCA.</p>
      </section>

      <p>For DMCA notices, please contact our designated agent.</p>
    </main>
  );
};

export default DMCA;
