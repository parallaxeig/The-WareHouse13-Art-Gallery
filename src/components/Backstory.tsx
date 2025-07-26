import React from 'react';
import './Backstory.css';

const Backstory: React.FC = () => {
  return (
    <section className="backstory">
      <div className="backstory-container">
        <h2 className="backstory-title">The Warehouse 13 Art Gallery - Backstory</h2>
        <p className="backstory-text">
          The Warehouse 13 Art Gallery was born from a vision to revolutionize the way digital art is experienced and shared. Inspired by the mysterious and eclectic nature of the original Warehouse 13, our gallery combines cutting-edge VR and AR technology with blockchain innovation to create an immersive space where artists and collectors can connect like never before.
        </p>
        <p className="backstory-text">
          Our journey began with a small group of passionate digital artists who wanted to break free from traditional galleries and explore new dimensions of creativity. By integrating NFT minting, secure wallet connections, and immersive virtual environments, we have built a platform that empowers artists to showcase their masterpieces in a dynamic and interactive way.
        </p>
        <p className="backstory-text">
          Step inside the Warehouse 13 Art Gallery and discover a world where art transcends boundaries, stories come to life, and every piece holds a unique place in the metaverse. Join us as we continue to push the limits of digital expression and redefine the future of art.
        </p>
      </div>
    </section>
  );
};

export default Backstory;
