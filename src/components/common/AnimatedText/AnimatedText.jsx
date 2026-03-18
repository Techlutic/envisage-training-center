/* ============================================
   AnimatedText Component
   Text with various animation effects
   ============================================ */

import React, { useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useScrollAnimation } from '../../../hooks';
import './AnimatedText.css';

const AnimatedText = ({
  children,
  as: Tag = 'span',
  animation = 'fadeUp',
  delay = 0,
  duration = 600,
  stagger = 50,
  triggerOnScroll = true,
  threshold = 0.2,
  className = '',
  onAnimationComplete,
  ...props
}) => {
  const containerRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(!triggerOnScroll);
  
  // Scroll animation hook
  const { ref: scrollRef, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce: true,
  });

  // Combine refs
  useEffect(() => {
    if (triggerOnScroll && isVisible && !isAnimated) {
      setIsAnimated(true);
      
      // Calculate total animation duration
      const text = typeof children === 'string' ? children : '';
      const totalDuration = delay + duration + (text.length * stagger);
      
      // Call completion callback
      if (onAnimationComplete) {
        setTimeout(onAnimationComplete, totalDuration);
      }
    }
  }, [isVisible, triggerOnScroll, isAnimated, children, delay, duration, stagger, onAnimationComplete]);

  // Split text for character animations
  const characters = useMemo(() => {
    if (typeof children !== 'string') return null;
    
    if (['charReveal', 'charRevealUp', 'charRevealRotate'].includes(animation)) {
      return children.split('').map((char, index) => ({
        char: char === ' ' ? '\u00A0' : char,
        index,
      }));
    }
    
    return null;
  }, [children, animation]);

  // Split text for word animations
  const words = useMemo(() => {
    if (typeof children !== 'string') return null;
    
    if (['wordReveal', 'wordRevealUp'].includes(animation)) {
      return children.split(' ').map((word, index) => ({
        word,
        index,
      }));
    }
    
    return null;
  }, [children, animation]);

  // Build class names
  const containerClasses = [
    'animated-text',
    `animated-text--${animation}`,
    isAnimated && 'is-animated',
    className,
  ].filter(Boolean).join(' ');

  // Render characters animation
  if (characters) {
    return (
      <Tag
        ref={triggerOnScroll ? scrollRef : containerRef}
        className={containerClasses}
        style={{ '--animation-delay': `${delay}ms`, '--animation-duration': `${duration}ms` }}
        {...props}
      >
        {characters.map(({ char, index }) => (
          <span
            key={index}
            className="animated-text__char"
            style={{
              '--char-index': index,
              '--char-delay': `${delay + index * stagger}ms`,
            }}
          >
            {char}
          </span>
        ))}
      </Tag>
    );
  }

  // Render words animation
  if (words) {
    return (
      <Tag
        ref={triggerOnScroll ? scrollRef : containerRef}
        className={containerClasses}
        style={{ '--animation-delay': `${delay}ms`, '--animation-duration': `${duration}ms` }}
        {...props}
      >
        {words.map(({ word, index }) => (
          <span key={index} className="animated-text__word-wrapper">
            <span
              className="animated-text__word"
              style={{
                '--word-index': index,
                '--word-delay': `${delay + index * stagger}ms`,
              }}
            >
              {word}
            </span>
            {index < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </Tag>
    );
  }

  // Simple animations (fadeUp, fadeIn, etc.)
  return (
    <Tag
      ref={triggerOnScroll ? scrollRef : containerRef}
      className={containerClasses}
      style={{
        '--animation-delay': `${delay}ms`,
        '--animation-duration': `${duration}ms`,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};

AnimatedText.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div']),
  animation: PropTypes.oneOf([
    'fadeUp',
    'fadeDown',
    'fadeLeft',
    'fadeRight',
    'fadeIn',
    'scaleIn',
    'charReveal',
    'charRevealUp',
    'charRevealRotate',
    'wordReveal',
    'wordRevealUp',
    'typewriter',
    'slideUp',
    'clipReveal',
    'blur',
    'gradient',
  ]),
  delay: PropTypes.number,
  duration: PropTypes.number,
  stagger: PropTypes.number,
  triggerOnScroll: PropTypes.bool,
  threshold: PropTypes.number,
  className: PropTypes.string,
  onAnimationComplete: PropTypes.func,
};

// Animated heading shortcuts
export const AnimatedH1 = (props) => <AnimatedText as="h1" {...props} />;
export const AnimatedH2 = (props) => <AnimatedText as="h2" {...props} />;
export const AnimatedH3 = (props) => <AnimatedText as="h3" {...props} />;
export const AnimatedP = (props) => <AnimatedText as="p" {...props} />;

export default AnimatedText;