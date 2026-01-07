import React from 'react';
import './Backstory.css';

const Backstory: React.FC = () => {
  return (
    <section className="backstory">
      <div className="backstory-container">
        <div className="backstory-content">
          <span className="backstory-label">Our Origin</span>
          <h2 className="backstory-title">Revolutionizing the Digital Art Experience</h2>

          <p className="backstory-text">
            The Warehouse 13 Art Gallery was born from a vision to break free from traditional gallery constraints.
            Inspired by the mysterious and eclectic nature of the original Warehouse 13, we combine
            cutting-edge VR/AR technology with blockchain innovation.
          </p>

          <div className="backstory-highlight">
            <p>
              "The largest art galleries are on our phones and digital devices. What if you could mint that cool photo you took on a trip with friends in Masai Mara?"
            </p>
          </div>

          <p className="backstory-text">
            Our journey began with a small group of passionate digital artists. Today, we empower creators worldwide
            to showcase their masterpieces in a dynamic, immersive environment where stories come to life
            and every piece holds a unique place in the metaverse.
          </p>
        </div>

        <div className="backstory-visual">
          {/* Conceptual visual representation */}
          <div style={{
            width: '100%',
            height: '400px',
            background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <span style={{ fontSize: '4rem', opacity: 0.2 }}>🖼️ 13</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Backstory;
