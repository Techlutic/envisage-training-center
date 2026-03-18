/* ============================================
   useMediaQuery Hook
   Responsive breakpoint detection
   ============================================ */

import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Breakpoint values (match CSS breakpoints)
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Custom hook for media query matching
 * @param {string} query - CSS media query string
 * @returns {boolean} - Whether query matches
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Legacy browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  // Return false during SSR
  if (!mounted) {
    return false;
  }

  return matches;
};

/**
 * Hook for common breakpoint checks
 * @returns {Object} - Breakpoint state object
 */
export const useBreakpoint = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)');
  const isXLDesktop = useMediaQuery('(min-width: 1536px)');

  // Touch device detection
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)');

  // Orientation
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  // Reduced motion
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // High contrast
  const prefersHighContrast = useMediaQuery('(prefers-contrast: high)');

  // Current breakpoint name
  const getCurrentBreakpoint = useCallback(() => {
    if (isXLDesktop) return '2xl';
    if (isLargeDesktop) return 'xl';
    if (isDesktop) return 'lg';
    if (isTablet) return 'md';
    return 'sm';
  }, [isXLDesktop, isLargeDesktop, isDesktop, isTablet]);

  return {
    // Size breakpoints
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isXLDesktop,
    
    // Derived states
    isMobileOrTablet: isMobile || isTablet,
    isTabletOrDesktop: isTablet || isDesktop,
    
    // Device type
    isTouchDevice,
    
    // Orientation
    isPortrait,
    isLandscape,
    
    // User preferences
    prefersReducedMotion,
    prefersDarkMode,
    prefersHighContrast,
    
    // Current breakpoint
    breakpoint: getCurrentBreakpoint(),
  };
};

/**
 * Hook for responsive values based on breakpoint
 * @param {Object} values - Values for each breakpoint
 * @returns {*} - Current value based on breakpoint
 */
export const useResponsiveValue = (values) => {
  const { breakpoint } = useBreakpoint();

  const getValue = useCallback(() => {
    // Priority order: current breakpoint, then smaller breakpoints
    const breakpointOrder = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
    const currentIndex = breakpointOrder.indexOf(breakpoint);

    for (let i = currentIndex; i < breakpointOrder.length; i++) {
      const bp = breakpointOrder[i];
      if (values[bp] !== undefined) {
        return values[bp];
      }
    }

    // Fallback to default or first defined value
    return values.default ?? Object.values(values)[0];
  }, [values, breakpoint]);

  return getValue();
};

/**
 * Hook for window dimensions
 * @returns {Object} - { width, height }
 */
export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Debounced resize handler
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return size;
};

/**
 * Hook for element dimensions
 * @returns {Object} - { ref, dimensions }
 */
export const useElementSize = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const elementRef = useCallback((node) => {
    if (node !== null) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]) {
          const { width, height, top, left } = entries[0].contentRect;
          setDimensions({ width, height, top, left });
        }
      });

      resizeObserver.observe(node);

      // Cleanup
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return { ref: elementRef, ...dimensions };
};

/**
 * Hook for device pixel ratio
 * @returns {number} - Device pixel ratio
 */
export const useDevicePixelRatio = () => {
  const [dpr, setDpr] = useState(
    typeof window !== 'undefined' ? window.devicePixelRatio : 1
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDpr = () => {
      setDpr(window.devicePixelRatio);
    };

    // Listen for changes (e.g., moving window between monitors)
    const mediaQuery = window.matchMedia(
      `(resolution: ${window.devicePixelRatio}dppx)`
    );

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateDpr);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateDpr);
      }
    };
  }, []);

  return dpr;
};

export default useMediaQuery;