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
          <Button appearance="subtle" size="medium">
            Connect Wallet
          </Button>
          <Button appearance="primary" size="medium">
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
                <Button appearance="outline" size="medium" fullWidth>
                  Connect Wallet
                </Button>
                <Button appearance="primary" size="medium" fullWidth>
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

/* src/components/Header.css */
.fluent-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--fluent-z-index-priority);
  background-color: var(--fluent-color-neutral-0);
  border-bottom: 1px solid var(--fluent-color-neutral-8);
  transition: all var(--fluent-duration-normal) var(--fluent-curve-easy-ease);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.fluent-header--scrolled {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: var(--fluent-shadow-8);
  border-bottom-color: var(--fluent-color-neutral-12);
}

.fluent-header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--fluent-space-horizontal-l);
  height: 64px;
}

.fluent-header__brand {
  display: flex;
  align-items: center;
}

.fluent-header__logo {
  display: flex;
  align-items: center;
  gap: var(--fluent-space-horizontal-s);
  margin: 0;
  color: var(--fluent-color-neutral-90);
  text-decoration: none;
  font-weight: var(--fluent-font-weight-semibold);
}

.fluent-header__logo-icon {
  font-size: var(--fluent-font-size-600);
}

.fluent-header__nav {
  display: flex;
  align-items: center;
}

.fluent-header__nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--fluent-space-horizontal-xl);
}

.fluent-header__nav-item {
  display: flex;
}

.fluent-header__nav-link {
  color: var(--fluent-color-neutral-70);
  text-decoration: none;
  padding: var(--fluent-space-vertical-s) var(--fluent-space-horizontal-m);
  border-radius: var(--fluent-border-radius-medium);
  transition: all var(--fluent-duration-faster) var(--fluent-curve-easy-ease);
  position: relative;
}

.fluent-header__nav-link:hover {
  color: var(--fluent-color-brand-80);
  background-color: var(--fluent-color-brand-160);
}

.fluent-header__nav-link:focus-visible {
  outline: 2px solid var(--fluent-color-brand-80);
  outline-offset: 2px;
}

.fluent-header__actions {
  display: flex;
  align-items: center;
  gap: var(--fluent-space-horizontal-s);
}

.fluent-header__mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--fluent-space-vertical-s);
  border-radius: var(--fluent-border-radius-medium);
  transition: background-color var(--fluent-duration-faster) var(--fluent-curve-easy-ease);
}

.fluent-header__mobile-toggle:hover {
  background-color: var(--fluent-color-neutral-4);
}

.fluent-header__mobile-toggle:focus-visible {
  outline: 2px solid var(--fluent-color-brand-80);
  outline-offset: 2px;
}

.fluent-header__hamburger {
  display: flex;
  flex-direction: column;
  width: 20px;
  height: 16px;
  justify-content: space-between;
}

.fluent-header__hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: var(--fluent-color-neutral-70);
  border-radius: var(--fluent-border-radius-small);
  transition: all var(--fluent-duration-fast) var(--fluent-curve-easy-ease);
}

.fluent-header__mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--fluent-color-neutral-0);
  border-bottom: 1px solid var(--fluent-color-neutral-8);
  box-shadow: var(--fluent-shadow-16);
  animation: slideDown var(--fluent-duration-normal) var(--fluent-curve-decelerate-mid);
}

.fluent-header__mobile-nav {
  display: flex;
  flex-direction: column;
  padding: var(--fluent-space-vertical-l);
  gap: var(--fluent-space-vertical-s);
}

.fluent-header__mobile-link {
  color: var(--fluent-color-neutral-70);
  text-decoration: none;
  padding: var(--fluent-space-vertical-m) var(--fluent-space-horizontal-l);
  border-radius: var(--fluent-border-radius-medium);
  transition: all var(--fluent-duration-faster) var(--fluent-curve-easy-ease);
}

.fluent-header__mobile-link:hover {
  color: var(--fluent-color-brand-80);
  background-color: var(--fluent-color-brand-160);
}

.fluent-header__mobile-actions {
  display: flex;
  flex-direction: column;
  gap: var(--fluent-space-vertical-s);
  margin-top: var(--fluent-space-vertical-l);
  padding-top: var(--fluent-space-vertical-l);
  border-top: 1px solid var(--fluent-color-neutral-8);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .fluent-header__container {
    padding: 0 var(--fluent-space-horizontal-m);
  }

  .fluent-header__nav {
    display: none;
  }

  .fluent-header__actions {
    display: none;
  }

  .fluent-header__mobile-toggle {
    display: flex;
  }
}

@media (max-width: 480px) {
  .fluent-header__container {
    padding: 0 var(--fluent-space-horizontal-s);
    height: 56px;
  }

  .fluent-header__logo {
    font-size: var(--fluent-font-size-500);
  }

  .fluent-header__logo-icon {
    font-size: var(--fluent-font-size-500);
  }
}
