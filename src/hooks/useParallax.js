/* ============================================
   useParallax Hook
   Creates parallax scrolling effects
   ============================================ */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for parallax scrolling effects
 * @param {Object} options - Configuration options
 * @param {number} options.speed - Parallax speed (-1 to 1)
 * @param {string} options.direction - 'vertical' or 'horizontal'
 * @param {boolean} options.disabled - Disable parallax
 * @returns {Object} - { ref, style, offset }
 */
const useParallax = (options = {}) => {
  const {
    speed = 0.5,
    direction = 'vertical',
    disabled = false,
  } = options;

  const elementRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const calculateParallax = useCallback(() => {
    const element = elementRef.current;
    if (!element || disabled) return;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Check if element is in view
    const inView = rect.bottom > 0 && rect.top < windowHeight;
    setIsInView(inView);

    if (!inView) return;

    // Calculate parallax offset based on element position
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    
    // Apply speed factor
    const parallaxOffset = distanceFromCenter * speed * -1;

    setOffset(parallaxOffset);
  }, [speed, disabled]);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || disabled) {
      return;
    }

    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateParallax);
    
    // Initial calculation
    calculateParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateParallax);
    };
  }, [calculateParallax, disabled]);

  // Generate style object
  const style = {
    transform:
      direction === 'vertical'
        ? `translate3d(0, ${offset}px, 0)`
        : `translate3d(${offset}px, 0, 0)`,
    willChange: disabled ? 'auto' : 'transform',
  };

  return {
    ref: elementRef,
    style,
    offset,
    isInView,
  };
};

/**
 * Hook for parallax with multiple layers
 * @param {number} layerCount - Number of layers
 * @param {Object} options - Configuration options
 * @returns {Object} - { containerRef, getLayerStyle }
 */
export const useParallaxLayers = (layerCount, options = {}) => {
  const { baseSpeed = 0.1, speedMultiplier = 0.1 } = options;

  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - (rect.top / (windowHeight + rect.height));
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
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
  }, []);

  const getLayerStyle = useCallback(
    (layerIndex) => {
      const layerSpeed = baseSpeed + layerIndex * speedMultiplier;
      const offset = (scrollProgress - 0.5) * 100 * layerSpeed;

      return {
        transform: `translate3d(0, ${offset}px, 0)`,
        willChange: 'transform',
      };
    },
    [scrollProgress, baseSpeed, speedMultiplier]
  );

  return {
    containerRef,
    scrollProgress,
    getLayerStyle,
  };
};

/**
 * Hook for mouse-based parallax effect
 * @param {Object} options - Configuration options
 * @returns {Object} - { ref, style }
 */
export const useMouseParallax = (options = {}) => {
  const { strength = 20, inverted = false } = options;

  const elementRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const moveX = ((event.clientX - centerX) / centerX) * strength;
      const moveY = ((event.clientY - centerY) / centerY) * strength;

      setPosition({
        x: inverted ? -moveX : moveX,
        y: inverted ? -moveY : moveY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength, inverted]);

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: 'transform 0.1s ease-out',
    willChange: 'transform',
  };

  return {
    ref: elementRef,
    style,
    position,
  };
};

/**
 * Hook for scroll-based rotation parallax
 * @param {Object} options - Configuration options
 * @returns {Object} - { ref, style, rotation }
 */
export const useParallaxRotation = (options = {}) => {
  const { maxRotation = 15, axis = 'z' } = options;

  const elementRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const progress = 1 - (rect.top / windowHeight);
      const normalizedProgress = Math.min(Math.max(progress, 0), 1);
      const rotationValue = (normalizedProgress - 0.5) * 2 * maxRotation;

      setRotation(rotationValue);
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
  }, [maxRotation]);

  const getRotateTransform = () => {
    switch (axis) {
      case 'x':
        return `rotateX(${rotation}deg)`;
      case 'y':
        return `rotateY(${rotation}deg)`;
      default:
        return `rotate(${rotation}deg)`;
    }
  };

  const style = {
    transform: getRotateTransform(),
    willChange: 'transform',
  };

  return {
    ref: elementRef,
    style,
    rotation,
  };
};

export default useParallax;