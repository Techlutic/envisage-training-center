/* ============================================
   Navbar Component
   Premium navigation with animations
   ============================================ */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useScrollDirection, useBreakpoint } from '../../hooks';
import MobileMenu from './MobileMenu';
import './Navbar.css';

const Navbar = ({ scrollY = 0 }) => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const [isHovered, setIsHovered] = useState(false);
  
  // Refs
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  
  // Hooks
  const { scrollDirection, isAtTop } = useScrollDirection({ threshold: 50 });
  const { isMobile, isTablet } = useBreakpoint();
  
  // Navigation links
  const navLinks = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'courses', label: 'Courses', href: '#courses' },
    { id: 'instructors', label: 'Instructors', href: '#instructors' },
    { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  // Social links
  const socialLinks = [
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/envisage_training_academy/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/AestheticsAcademia/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
    },
  ];

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveLink(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    if (!isMobile && !isTablet && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isTablet, isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Handle link click
  const handleLinkClick = useCallback((e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navHeight = navRef.current?.offsetHeight || 80;
      const targetPosition = targetElement.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      setIsMenuOpen(false);
    }
  }, []);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Build nav classes
  const navClasses = [
    'navbar',
    !isAtTop && 'is-scrolled',
    scrollDirection === 'down' && !isAtTop && !isMenuOpen && 'is-hidden',
    isMenuOpen && 'menu-open',
    isHovered && 'is-hovered',
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav
        ref={navRef}
        className={navClasses}
        role="navigation"
        aria-label="Main navigation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background blur layer */}
        <div className="navbar__bg"></div>

        {/* Main container */}
        <div className="navbar__container">
          {/* Logo */}
          <a
            href="#hero"
            className="navbar__logo"
            onClick={(e) => handleLinkClick(e, '#hero')}
            aria-label="Envisage Training Academy - Home"
          >
            <span className="navbar__logo-icon">
              <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="23" stroke="currentColor" strokeWidth="1.5"/>
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="central"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="22"
                  fontFamily="Playfair Display, serif"
                  fontWeight="600"
                >
                  E
                </text>
              </svg>
            </span>
            <span className="navbar__logo-text">
              <span className="navbar__logo-main">Envisage</span>
              <span className="navbar__logo-sub">Training Academy</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="navbar__nav">
            <ul className="navbar__links">
              {navLinks.map((link, index) => (
                <li key={link.id} className="navbar__item">
                  <a
                    href={link.href}
                    className={`navbar__link ${activeLink === link.id ? 'is-active' : ''}`}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    style={{ '--item-index': index }}
                  >
                    <span className="navbar__link-text">{link.label}</span>
                    <span className="navbar__link-line"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right section */}
          <div className="navbar__right">
            {/* Social links */}
            <div className="navbar__social">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  className="navbar__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="https://envisageaesthetics.thinkific.com/"
              className="navbar__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="navbar__cta-text">Enroll Now</span>
              <span className="navbar__cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </a>

            {/* Mobile menu toggle */}
            <button
              className={`navbar__toggle ${isMenuOpen ? 'is-active' : ''}`}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="navbar__toggle-line"></span>
              <span className="navbar__toggle-line"></span>
              <span className="navbar__toggle-line"></span>
            </button>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="navbar__border"></div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
        socialLinks={socialLinks}
        activeLink={activeLink}
        onLinkClick={handleLinkClick}
      />
    </>
  );
};

Navbar.propTypes = {
  scrollY: PropTypes.number,
};

export default Navbar;