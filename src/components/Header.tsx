import React, { useState, useEffect } from 'react';
import Button from './Button';
import './Header.css';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Gallery', href: '#gallery' },
    { label: 'Create', href: '#create' },
    { label: 'About', href: '#about' },
    { label: 'Community', href: '#community' },
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${className}`}>
      <div className="header__container">
        <div className="header__brand">
          <h1 className="header__logo">
            <span className="header__logo-icon" aria-hidden="true">🏛️</span>
            Warehouse 13
          </h1>
        </div>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.label} className="header__nav-item">
                <a href={item.href} className="header__nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Button variant="ghost" size="sm">
            Connect Wallet
          </Button>
          <Button variant="primary" size="sm">
            Sign Up
          </Button>
        </div>

        <button
          className="header__mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle mobile menu"
        >
          <span className="header__hamburger">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {isMobileMenuOpen && (
          <div id="mobile-menu" className="header__mobile-menu">
            <nav className="header__mobile-nav" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="header__mobile-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="header__mobile-actions">
                <Button variant="outline" size="sm" fullWidth>
                  Connect Wallet
                </Button>
                <Button variant="primary" size="sm" fullWidth>
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
