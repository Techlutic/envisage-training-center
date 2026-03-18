/* ============================================
   useScrollAnimation Hook
   Triggers animations when elements enter viewport
   ============================================ */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Margin around the root
 * @param {boolean} options.triggerOnce - Only trigger animation once
 * @param {number} options.delay - Delay before animation starts (ms)
 * @returns {Object} - { ref, isVisible, hasAnimated }
 */
const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleIntersection = useCallback(
    (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        if (delay > 0) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        } else {
          setIsVisible(true);
          setHasAnimated(true);
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    },
    [delay, triggerOnce]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, handleIntersection]);

  return {
    ref: elementRef,
    isVisible,
    hasAnimated,
  };
};

/**
 * Hook for animating multiple elements with stagger effect
 * @param {number} itemCount - Number of items to animate
 * @param {Object} options - Configuration options
 * @returns {Object} - { containerRef, isVisible, getItemStyle }
 */
export const useStaggerAnimation = (itemCount, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    staggerDelay = 100,
    triggerOnce = true,
  } = options;

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(container);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  const getItemStyle = useCallback(
    (index) => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.6s ease ${index * staggerDelay}ms, transform 0.6s ease ${index * staggerDelay}ms`,
    }),
    [isVisible, staggerDelay]
  );

  return {
    containerRef,
    isVisible,
    getItemStyle,
  };
};

/**
 * Hook for scroll-based progress animations
 * @param {Object} options - Configuration options
 * @returns {Object} - { ref, progress }
 */
export const useScrollProgress = (options = {}) => {
  const { start = 'top bottom', end = 'bottom top' } = options;
  
  const elementRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on element position
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Progress from 0 (element entering) to 1 (element leaving)
      const rawProgress = 1 - (elementTop / (windowHeight + elementHeight));
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
      
      setProgress(clampedProgress);
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
  }, [start, end]);

  return {
    ref: elementRef,
    progress,
  };
};

export default useScrollAnimation;