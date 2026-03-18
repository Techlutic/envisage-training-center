/* ============================================
   useCountUp Hook
   Animated number counting effect
   ============================================ */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Easing functions for count animation
 */
const easingFunctions = {
  linear: (t) => t,
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  easeIn: (t) => t * t * t,
  easeInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  elastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

/**
 * Custom hook for animated number counting
 * @param {number} end - Target number
 * @param {Object} options - Configuration options
 * @returns {Object} - { count, isAnimating, start, reset }
 */
const useCountUp = (end, options = {}) => {
  const {
    start: startValue = 0,
    duration = 2000,
    delay = 0,
    decimals = 0,
    easing = 'easeOut',
    separator = ',',
    prefix = '',
    suffix = '',
    startOnMount = false,
    onComplete = null,
  } = options;

  const [count, setCount] = useState(startValue);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const hasStarted = useRef(false);

  // Get easing function
  const easeFn = easingFunctions[easing] || easingFunctions.easeOut;

  // Format number with separators
  const formatNumber = useCallback(
    (num) => {
      const fixed = num.toFixed(decimals);
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return prefix + parts.join('.') + suffix;
    },
    [decimals, separator, prefix, suffix]
  );

  // Animation loop
  const animate = useCallback(
    (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeFn(progress);
      
      const currentValue = startValue + (end - startValue) * easedProgress;
      setCount(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsAnimating(false);
        setIsComplete(true);
        onComplete?.();
      }
    },
    [duration, startValue, end, easeFn, onComplete]
  );

  // Start counting
  const startCounting = useCallback(() => {
    if (hasStarted.current && !options.allowRestart) return;

    hasStarted.current = true;
    setIsAnimating(true);
    setIsComplete(false);
    startTimeRef.current = null;

    if (delay > 0) {
      setTimeout(() => {
        rafRef.current = requestAnimationFrame(animate);
      }, delay);
    } else {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate, delay, options.allowRestart]);

  // Reset counter
  const reset = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setCount(startValue);
    setIsAnimating(false);
    setIsComplete(false);
    hasStarted.current = false;
    startTimeRef.current = null;
  }, [startValue]);

  // Start on mount if enabled
  useEffect(() => {
    if (startOnMount) {
      startCounting();
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [startOnMount, startCounting]);

  return {
    count,
    formattedCount: formatNumber(count),
    isAnimating,
    isComplete,
    start: startCounting,
    reset,
  };
};

/**
 * Hook for counting up when element is visible
 * @param {number} end - Target number
 * @param {Object} options - Configuration options
 * @returns {Object} - { ref, count, formattedCount, isVisible }
 */
export const useCountUpOnScroll = (end, options = {}) => {
  const {
    threshold = 0.5,
    rootMargin = '0px',
    ...countOptions
  } = options;

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  const { count, formattedCount, isAnimating, start, reset } = useCountUp(end, {
    ...countOptions,
    startOnMount: false,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          setIsVisible(true);
          hasTriggered.current = true;
          start();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, start]);

  return {
    ref: elementRef,
    count,
    formattedCount,
    isVisible,
    isAnimating,
    reset: () => {
      hasTriggered.current = false;
      reset();
    },
  };
};

/**
 * Hook for multiple count up animations
 * @param {Array} values - Array of { end, options } objects
 * @returns {Object} - { ref, counts, startAll, resetAll }
 */
export const useCountUpMultiple = (values) => {
  const containerRef = useRef(null);
  const [counts, setCounts] = useState(values.map((v) => v.start || 0));
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);
  const rafsRef = useRef([]);

  const easeFn = easingFunctions.easeOut;

  const startAll = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    values.forEach((value, index) => {
      const { end, duration = 2000, start = 0, delay = index * 200 } = value;

      setTimeout(() => {
        const startTime = performance.now();

        const animate = (timestamp) => {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeFn(progress);
          const currentValue = start + (end - start) * easedProgress;

          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = currentValue;
            return newCounts;
          });

          if (progress < 1) {
            rafsRef.current[index] = requestAnimationFrame(animate);
          }
        };

        rafsRef.current[index] = requestAnimationFrame(animate);
      }, delay);
    });
  }, [values, easeFn]);

  const resetAll = useCallback(() => {
    rafsRef.current.forEach((raf) => {
      if (raf) cancelAnimationFrame(raf);
    });
    setCounts(values.map((v) => v.start || 0));
    hasTriggered.current = false;
  }, [values]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          setIsVisible(true);
          startAll();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      rafsRef.current.forEach((raf) => {
        if (raf) cancelAnimationFrame(raf);
      });
    };
  }, [startAll]);

  return {
    ref: containerRef,
    counts,
    isVisible,
    startAll,
    resetAll,
  };
};

export default useCountUp;