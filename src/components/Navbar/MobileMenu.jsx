/* ============================================
   MobileMenu Component
   Full-screen mobile navigation
   ============================================ */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MobileMenu = ({
  isOpen,
  onClose,
  navLinks,
  socialLinks,
  activeLink,
  onLinkClick,
}) => {
  const menuRef = useRef(null);
  const firstFocusableRef = useRef(null);

  // Trap focus within menu
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      className={`mobile-menu ${isOpen ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      aria-hidden={!isOpen}
    >
      {/* Background overlay */}
      <div className="mobile-menu__overlay" onClick={onClose}></div>

      {/* Menu content */}
      <div className="mobile-menu__content">
        {/* Decorative elements */}
        <div className="mobile-menu__decor">
          <div className="mobile-menu__decor-circle mobile-menu__decor-circle--1"></div>
          <div className="mobile-menu__decor-circle mobile-menu__decor-circle--2"></div>
          <div className="mobile-menu__decor-line"></div>
        </div>

        {/* Navigation links */}
        <nav className="mobile-menu__nav">
          <ul className="mobile-menu__links">
            {navLinks.map((link, index) => (
              <li
                key={link.id}
                className="mobile-menu__item"
                style={{ '--item-index': index }}
              >
                <a
                  ref={index === 0 ? firstFocusableRef : null}
                  href={link.href}
                  className={`mobile-menu__link ${
                    activeLink === link.id ? 'is-active' : ''
                  }`}
                  onClick={(e) => onLinkClick(e, link.href)}
                >
                  <span className="mobile-menu__link-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mobile-menu__link-text">{link.label}</span>
                  <span className="mobile-menu__link-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mobile-menu__footer">
          {/* CTA Button */}
          <a
            href="https://envisageaesthetics.thinkific.com/"
            className="mobile-menu__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Start Your Journey</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>

          {/* Social links */}
          <div className="mobile-menu__social">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                className="mobile-menu__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
                <span>{social.label}</span>
              </a>
            ))}
          </div>

          {/* Contact info */}
          <div className="mobile-menu__contact">
            <a href="mailto:info@envisagetraining.com" className="mobile-menu__contact-link">
              info@envisagetraining.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
  activeLink: PropTypes.string,
  onLinkClick: PropTypes.func.isRequired,
};

export default MobileMenu;