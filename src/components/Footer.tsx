import React from 'react';
import { Twitter, MessageCircle, Instagram, Linkedin, Mail, Globe } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Warehouse 13</h3>
            <p className="footer-description">
              The premier immersive VR/AR NFT gallery platform. Experience art without boundaries.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="social-link" aria-label="Discord"><MessageCircle size={20} /></a>
              <a href="#" className="social-link" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className="social-link" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Marketplace</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">All NFTs</a></li>
              <li><a href="#" className="footer-link">New Art</a></li>
              <li><a href="#" className="footer-link">Music</a></li>
              <li><a href="#" className="footer-link">Virtual Worlds</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Partners</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">Newsletter</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-section-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Legal</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 ParallaxEIG. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Privacy</a>
            <a href="#" className="footer-legal-link">Terms</a>
            <a href="#" className="footer-legal-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
