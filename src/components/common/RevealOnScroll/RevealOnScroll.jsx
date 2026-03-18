/* ============================================
   RevealOnScroll Component
   Wrapper for scroll-triggered animations
   ============================================ */

import React from 'react';
import PropTypes from 'prop-types';
import { useScrollAnimation } from '../../../hooks';
import './RevealOnScroll.css';

const RevealOnScroll = ({
  children,
  as: Tag = 'div',
  animation = 'fadeUp',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  disabled = false,
  className = '',
  onReveal,
  ...props
}) => {
  // Scroll animation hook
  const { ref, isVisible, hasAnimated } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
    delay: 0, // We handle delay with CSS
  });

  // Call onReveal callback
  React.useEffect(() => {
    if (isVisible && onReveal) {
      setTimeout(onReveal, delay);
    }
  }, [isVisible, onReveal, delay]);

  // If disabled, render without animation
  if (disabled) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  // Build class names
  const containerClasses = [
    'reveal-on-scroll',
    `reveal-on-scroll--${animation}`,
    isVisible && 'is-visible',
    hasAnimated && 'has-animated',
    className,
  ].filter(Boolean).join(' ');

  // Custom CSS properties
  const style = {
    '--reveal-delay': `${delay}ms`,
    '--reveal-duration': `${duration}ms`,
  };

  return (
    <Tag
      ref={ref}
      className={containerClasses}
      style={style}
      {...props}
    >
      {children}
    </Tag>
  );
};

RevealOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.string,
  animation: PropTypes.oneOf([
    'fadeUp',
    'fadeDown',
    'fadeLeft',
    'fadeRight',
    'fadeIn',
    'scaleUp',
    'scaleIn',
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight',
    'clipUp',
    'clipLeft',
    'rotate',
    'blur',
    'flip',
  ]),
  delay: PropTypes.number,
  duration: PropTypes.number,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  triggerOnce: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onReveal: PropTypes.func,
};

// Convenience components with preset animations
export const FadeUp = (props) => <RevealOnScroll animation="fadeUp" {...props} />;
export const FadeIn = (props) => <RevealOnScroll animation="fadeIn" {...props} />;
export const ScaleUp = (props) => <RevealOnScroll animation="scaleUp" {...props} />;
export const SlideUp = (props) => <RevealOnScroll animation="slideUp" {...props} />;

// Stagger container component
export const RevealStagger = ({
  children,
  staggerDelay = 100,
  animation = 'fadeUp',
  className = '',
  ...props
}) => {
  return (
    <div className={`reveal-stagger ${className}`} {...props}>
      {React.Children.map(children, (child, index) => (
        <RevealOnScroll
          animation={animation}
          delay={index * staggerDelay}
          {...props}
        >
          {child}
        </RevealOnScroll>
      ))}
    </div>
  );
};

RevealStagger.propTypes = {
  children: PropTypes.node.isRequired,
  staggerDelay: PropTypes.number,
  animation: PropTypes.string,
  className: PropTypes.string,
};

export default RevealOnScroll;