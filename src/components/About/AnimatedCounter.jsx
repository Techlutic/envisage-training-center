/* ============================================
   AnimatedCounter Component
   Animated number counting with scroll trigger
   ============================================ */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import './AnimatedCounter.css';

const AnimatedCounter = ({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  className = '',
  onComplete,
}) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const hasStartedRef = useRef(false); // Use ref instead of state

  // Easing function
  const easeOutExpo = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  // Format number with separators
  const formatNumber = useCallback((num) => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  }, [decimals, separator]);

  // Animation loop - use refs for values to avoid stale closures
  const endRef = useRef(end);
  const startRef = useRef(start);
  const durationRef = useRef(duration);
  const onCompleteRef = useRef(onComplete);

  // Update refs when props change
  useEffect(() => {
    endRef.current = end;
    startRef.current = start;
    durationRef.current = duration;
    onCompleteRef.current = onComplete;
  }, [end, start, duration, onComplete]);

  // Animation function
  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / durationRef.current, 1);
    const easedProgress = easeOutExpo(progress);
    const currentValue = startRef.current + (endRef.current - startRef.current) * easedProgress;

    setCount(currentValue);

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      setCount(endRef.current);
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }
  }, []); // No dependencies - uses refs

  // Start animation function
  const startAnimation = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const timeoutId = setTimeout(() => {
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    // Store timeout ID for cleanup
    return timeoutId;
  }, [animate, delay]);

  // Intersection observer - runs once on mount
  useEffect(() => {
    const counter = counterRef.current;
    if (!counter) return;

    let timeoutId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          setIsVisible(true);
          timeoutId = startAnimation();
        }
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(counter);

    return () => {
      observer.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [startAnimation]);

  // Build class names
  const counterClasses = [
    'animated-counter',
    isVisible && 'is-visible',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span ref={counterRef} className={counterClasses}>
      <span className="animated-counter__value">
        {prefix}
        {formatNumber(count)}
        {suffix}
      </span>
    </span>
  );
};

AnimatedCounter.propTypes = {
  end: PropTypes.number.isRequired,
  start: PropTypes.number,
  duration: PropTypes.number,
  delay: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  decimals: PropTypes.number,
  separator: PropTypes.string,
  className: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AnimatedCounter;