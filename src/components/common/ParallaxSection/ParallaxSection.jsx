/* ============================================
   ParallaxSection Component
   Section with parallax scrolling effects
   ============================================ */

import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useBreakpoint } from '../../../hooks';
import './ParallaxSection.css';

const ParallaxSection = ({
  children,
  backgroundImage = null,
  backgroundColor = null,
  overlayColor = 'rgba(10, 10, 15, 0.7)',
  overlayGradient = null,
  speed = 0.5,
  direction = 'up',
  height = 'auto',
  minHeight = '100vh',
  disabled = false,
  className = '',
  ...props
}) => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const { isTouchDevice, prefersReducedMotion } = useBreakpoint();
  const [offset, setOffset] = useState(0);

  // Parallax effect
  useEffect(() => {
    if (disabled || isTouchDevice || prefersReducedMotion) return;

    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is in viewport
      if (rect.bottom < 0 || rect.top > windowHeight) return;

      // Calculate parallax offset
      const scrollPosition = (windowHeight - rect.top) / (windowHeight + rect.height);
      const parallaxOffset = (scrollPosition - 0.5) * rect.height * speed;

      // Apply direction
      const finalOffset = direction === 'down' ? -parallaxOffset : parallaxOffset;
      setOffset(finalOffset);
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
  }, [speed, direction, disabled, isTouchDevice, prefersReducedMotion]);

  // Build styles
  const sectionStyle = {
    minHeight,
    height: height !== 'auto' ? height : undefined,
    backgroundColor: !backgroundImage ? backgroundColor : undefined,
  };

  const bgStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundColor: backgroundImage ? undefined : backgroundColor,
    transform: `translate3d(0, ${offset}px, 0) scale(1.2)`,
  };

  const overlayStyle = {
    background: overlayGradient || overlayColor,
  };

  // Build class names
  const sectionClasses = [
    'parallax-section',
    backgroundImage && 'has-background-image',
    disabled && 'is-disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <section
      ref={sectionRef}
      className={sectionClasses}
      style={sectionStyle}
      {...props}
    >
      {/* Background layer */}
      {(backgroundImage || backgroundColor) && (
        <div ref={bgRef} className="parallax-section__bg" style={bgStyle}></div>
      )}

      {/* Overlay */}
      {(overlayColor || overlayGradient) && (
        <div className="parallax-section__overlay" style={overlayStyle}></div>
      )}

      {/* Noise texture */}
      <div className="parallax-section__noise"></div>

      {/* Content */}
      <div className="parallax-section__content">
        {children}
      </div>
    </section>
  );
};

ParallaxSection.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundImage: PropTypes.string,
  backgroundColor: PropTypes.string,
  overlayColor: PropTypes.string,
  overlayGradient: PropTypes.string,
  speed: PropTypes.number,
  direction: PropTypes.oneOf(['up', 'down']),
  height: PropTypes.string,
  minHeight: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

// Parallax element for use inside sections
export const ParallaxElement = ({
  children,
  speed = 0.3,
  direction = 'up',
  className = '',
  ...props
}) => {
  const elementRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const { isTouchDevice, prefersReducedMotion } = useBreakpoint();

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom < 0 || rect.top > windowHeight) return;

      const scrollPosition = (windowHeight - rect.top) / (windowHeight + rect.height);
      const parallaxOffset = (scrollPosition - 0.5) * 100 * speed;
      const finalOffset = direction === 'down' ? -parallaxOffset : parallaxOffset;

      setOffset(finalOffset);
    };

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
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [speed, direction, isTouchDevice, prefersReducedMotion]);

  return (
    <div
      ref={elementRef}
      className={`parallax-element ${className}`}
      style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      {...props}
    >
      {children}
    </div>
  );
};

ParallaxElement.propTypes = {
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
  direction: PropTypes.oneOf(['up', 'down']),
  className: PropTypes.string,
};

export default ParallaxSection;