import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">The Warehouse 13 Art Gallery</h3>
            <p className="footer-description">
              Experience the future of digital art with our immersive VR/AR NFT gallery platform.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="Discord">
                <span className="social-icon">💬</span>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <span className="social-icon">📷</span>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <span className="social-icon">💼</span>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-section-title">Platform</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Create NFT</a></li>
              <li><a href="#" className="footer-link">Explore Gallery</a></li>
              <li><a href="#" className="footer-link">VR Experience</a></li>
              <li><a href="#" className="footer-link">Wallet Connect</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-section-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Documentation</a></li>
              <li><a href="#" className="footer-link">Community</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-section-title">Contact</h4>
            <div className="contact-info">
              <p className="contact-item">
                <span className="contact-icon">📧</span>
                hello@nftartgallery.com
              </p>
              <p className="contact-item">
                <span className="contact-icon">💬</span>
                Join our Discord
              </p>
              <p className="contact-item">
                <span className="contact-icon">🌐</span>
                www.nftartgallery.com
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 The Warehouse 13 Art Gallery. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <a href="#" className="footer-legal-link">Terms of Service</a>
            <a href="#" className="footer-legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
