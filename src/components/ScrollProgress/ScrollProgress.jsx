/* ============================================
   ScrollProgress Component
   Scroll progress indicator
   ============================================ */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './ScrollProgress.css';

const ScrollProgress = ({
  position = 'top',
  variant = 'line',
  showPercentage = false,
  color = 'var(--gold-primary)',
  height = 3,
  sections = [],
  onProgressChange,
}) => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate scroll progress
  const calculateProgress = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollableHeight = documentHeight - windowHeight;
    
    if (scrollableHeight <= 0) return 0;
    
    const currentProgress = (scrollTop / scrollableHeight) * 100;
    return Math.min(Math.max(currentProgress, 0), 100);
  }, []);

  // Find active section
  const findActiveSection = useCallback(() => {
    if (!sections.length) return null;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const triggerPoint = scrollTop + windowHeight * 0.3;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i].id);
      if (section && section.offsetTop <= triggerPoint) {
        return sections[i].id;
      }
    }

    return sections[0]?.id || null;
  }, [sections]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const newProgress = calculateProgress();
      setProgress(newProgress);
      setIsVisible(newProgress > 0);

      if (sections.length) {
        const newActiveSection = findActiveSection();
        if (newActiveSection !== activeSection) {
          setActiveSection(newActiveSection);
        }
      }

      if (onProgressChange) {
        onProgressChange(newProgress);
      }
    };

    // Throttle scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [calculateProgress, findActiveSection, activeSection, sections, onProgressChange]);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80;
      const targetPosition = section.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Build class names
  const containerClasses = [
    'scroll-progress',
    `scroll-progress--${position}`,
    `scroll-progress--${variant}`,
    isVisible && 'is-visible',
  ].filter(Boolean).join(' ');

  // Render line variant
  if (variant === 'line') {
    return (
      <div 
        className={containerClasses}
        style={{ '--progress-height': `${height}px` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Page scroll progress"
      >
        <div 
          className="scroll-progress__track"
          style={{ '--progress-color': color }}
        >
          <div 
            className="scroll-progress__fill"
            style={{ width: `${progress}%` }}
          >
            <div className="scroll-progress__glow"></div>
          </div>
        </div>

        {showPercentage && (
          <div className="scroll-progress__percentage">
            {Math.round(progress)}%
          </div>
        )}
      </div>
    );
  }

  // Render circular variant
  if (variant === 'circle') {
    const circumference = 2 * Math.PI * 20;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div 
        className={containerClasses}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Page scroll progress"
      >
        <svg
          className="scroll-progress__circle"
          viewBox="0 0 50 50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Background circle */}
          <circle
            className="scroll-progress__circle-bg"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <circle
            className="scroll-progress__circle-progress"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 25 25)"
          />
        </svg>

        {/* Center content */}
        <div className="scroll-progress__circle-content">
          {showPercentage ? (
            <span className="scroll-progress__circle-percent">
              {Math.round(progress)}
            </span>
          ) : (
            <svg 
              className="scroll-progress__circle-arrow"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          )}
        </div>
      </div>
    );
  }

  // Render dots variant (with sections)
  if (variant === 'dots' && sections.length) {
    return (
      <div className={containerClasses}>
        <div className="scroll-progress__dots">
          {sections.map((section, index) => (
            <button
              key={section.id}
              className={`scroll-progress__dot ${
                activeSection === section.id ? 'is-active' : ''
              }`}
              onClick={() => scrollToSection(section.id)}
              aria-label={`Go to ${section.label}`}
              title={section.label}
            >
              <span className="scroll-progress__dot-inner"></span>
              <span className="scroll-progress__dot-label">{section.label}</span>
            </button>
          ))}
          
          {/* Active indicator line */}
          <div 
            className="scroll-progress__dots-line"
            style={{
              '--active-index': sections.findIndex(s => s.id === activeSection),
              '--total-dots': sections.length,
            }}
          ></div>
        </div>
      </div>
    );
  }

  return null;
};

ScrollProgress.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  variant: PropTypes.oneOf(['line', 'circle', 'dots']),
  showPercentage: PropTypes.bool,
  color: PropTypes.string,
  height: PropTypes.number,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onProgressChange: PropTypes.func,
};

export default ScrollProgress;