/* ============================================
   useSmoothScroll Hook
   Smooth scroll to sections/elements
   ============================================ */

import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for smooth scrolling
 * @param {Object} options - Configuration options
 * @returns {Object} - { scrollTo, scrollToElement, scrollToTop }
 */
const useSmoothScroll = (options = {}) => {
  const {
    duration = 1000,
    easing = 'easeInOutCubic',
    offset = 0,
  } = options;

  const isScrolling = useRef(false);
  const animationRef = useRef(null);

  // Easing functions
  const easingFunctions = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => --t * t * t + 1,
    easeInOutCubic: (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInQuart: (t) => t * t * t * t,
    easeOutQuart: (t) => 1 - --t * t * t * t,
    easeInOutQuart: (t) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    easeInExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
    easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  };

  const getEasing = useCallback(
    (easingName) => {
      return easingFunctions[easingName] || easingFunctions.easeInOutCubic;
    },
    []
  );

  // Scroll to specific Y position
  const scrollTo = useCallback(
    (targetY, customDuration) => {
      if (isScrolling.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const startY = window.scrollY;
      const difference = targetY - startY;
      const scrollDuration = customDuration || duration;
      const easeFn = getEasing(easing);
      let startTime = null;

      isScrolling.current = true;

      const animateScroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / scrollDuration, 1);
        const easedProgress = easeFn(progress);

        window.scrollTo(0, startY + difference * easedProgress);

        if (elapsed < scrollDuration) {
          animationRef.current = requestAnimationFrame(animateScroll);
        } else {
          isScrolling.current = false;
        }
      };

      animationRef.current = requestAnimationFrame(animateScroll);
    },
    [duration, easing, getEasing]
  );

  // Scroll to element by ID or ref
  const scrollToElement = useCallback(
    (target, customOffset) => {
      let element;

      if (typeof target === 'string') {
        // ID or selector
        element = document.querySelector(target) || document.getElementById(target);
      } else if (target?.current) {
        // Ref
        element = target.current;
      } else if (target instanceof Element) {
        // DOM element
        element = target;
      }

      if (!element) {
        console.warn('Element not found:', target);
        return;
      }

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - (customOffset ?? offset);

      scrollTo(offsetPosition);
    },
    [scrollTo, offset]
  );

  // Scroll to top
  const scrollToTop = useCallback(
    (customDuration) => {
      scrollTo(0, customDuration);
    },
    [scrollTo]
  );

  // Scroll to bottom
  const scrollToBottom = useCallback(
    (customDuration) => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      scrollTo(documentHeight - windowHeight, customDuration);
    },
    [scrollTo]
  );

  // Handle anchor links
  useEffect(() => {
    const handleClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      event.preventDefault();
      
      const targetId = href.slice(1);
      scrollToElement(`#${targetId}`);

      // Update URL without scroll - FIXED: Using window.history
      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, href);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollToElement]);

  return {
    scrollTo,
    scrollToElement,
    scrollToTop,
    scrollToBottom,
    isScrolling: isScrolling.current,
  };
};

/**
 * Hook for parallax-style smooth scroll container
 * @param {Object} options - Configuration options
 * @returns {Object} - { containerRef, scrollY }
 */
export const useSmoothScrollContainer = (options = {}) => {
  const { ease = 0.1 } = options;
  const containerRef = useRef(null);
  const scrollY = useRef(0);
  const currentY = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set container height to document height
    const setBodyHeight = () => {
      document.body.style.height = `${container.scrollHeight}px`;
    };

    // Smooth scroll animation
    const smoothScroll = () => {
      scrollY.current = window.scrollY;
      currentY.current += (scrollY.current - currentY.current) * ease;

      // Round to prevent sub-pixel rendering
      const roundedY = Math.round(currentY.current * 100) / 100;
      container.style.transform = `translate3d(0, ${-roundedY}px, 0)`;

      rafRef.current = requestAnimationFrame(smoothScroll);
    };

    // Initialize
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.willChange = 'transform';

    setBodyHeight();
    rafRef.current = requestAnimationFrame(smoothScroll);

    // Handle resize
    window.addEventListener('resize', setBodyHeight);

    return () => {
      window.removeEventListener('resize', setBodyHeight);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.body.style.height = '';
    };
  }, [ease]);

  return { containerRef, scrollY: scrollY.current };
};

export default useSmoothScroll;