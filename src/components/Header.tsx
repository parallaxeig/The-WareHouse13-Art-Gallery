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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    setIsMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const headerHeight = document.querySelector('.fluent-header')?.clientHeight || 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { label: 'Gallery', href: '#gallery' },
    { label: 'Create', href: '#create' },
    { label: 'About', href: '#about' },
    { label: 'Community', href: '#community' },
  ];

  return (
    <header className={`fluent-header ${isScrolled ? 'fluent-header--scrolled' : ''} ${className}`}>
      <div className="fluent-header__container">
        <div className="fluent-header__brand">
          <h1 className="fluent-header__logo fluent-text-title-3">
            <span className="fluent-header__logo-icon" aria-hidden="true">🏛️</span>
            Warehouse 13
          </h1>
        </div>

        <nav className="fluent-header__nav" aria-label="Main navigation">
          <ul className="fluent-header__nav-list">
            {navItems.map((item) => (
              <li key={item.label} className="fluent-header__nav-item">
                <a
                  href={item.href}
                  className="fluent-header__nav-link fluent-text-body-1"
                  onClick={(e) => scrollToSection(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="fluent-header__actions">
          <Button size="md">
            Connect Wallet
          </Button>
          <Button size="md">
            Sign Up
          </Button>
        </div>
        <button
          className="fluent-header__mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle mobile menu"
        >

          <span className="fluent-header__hamburger">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="fluent-header__mobile-menu">
            <nav className="fluent-header__mobile-nav" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="fluent-header__mobile-link fluent-text-body-1"
                  onClick={(e) => scrollToSection(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
              <div className="fluent-header__mobile-actions">
                <Button size="md" fullWidth>
                  Connect Wallet
                </Button>
                <Button size="md" fullWidth>
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
