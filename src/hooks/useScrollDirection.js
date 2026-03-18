/* ============================================
   useScrollDirection Hook
   Detects scroll direction (up/down)
   ============================================ */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for detecting scroll direction
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Minimum scroll distance to trigger
 * @param {number} options.throttleMs - Throttle time in ms
 * @returns {Object} - { scrollDirection, scrollY, isAtTop, isAtBottom }
 */
const useScrollDirection = (options = {}) => {
  const { threshold = 10, throttleMs = 100 } = options;

  const [scrollDirection, setScrollDirection] = useState('none');
  const [scrollY, setScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const lastScrollY = useRef(0);
  const lastScrollDirection = useRef('none');
  const ticking = useRef(false);
  const lastTime = useRef(Date.now());

  const updateScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Update scroll position
    setScrollY(currentScrollY);

    // Check if at top or bottom
    setIsAtTop(currentScrollY <= 0);
    setIsAtBottom(currentScrollY + windowHeight >= documentHeight - 10);

    // Calculate direction
    const diff = currentScrollY - lastScrollY.current;

    if (Math.abs(diff) >= threshold) {
      const newDirection = diff > 0 ? 'down' : 'up';

      if (newDirection !== lastScrollDirection.current) {
        setScrollDirection(newDirection);
        lastScrollDirection.current = newDirection;
      }

      lastScrollY.current = currentScrollY;
    }

    ticking.current = false;
  }, [threshold]);

  useEffect(() => {
    // Set initial scroll position
    lastScrollY.current = window.scrollY;
    setScrollY(window.scrollY);
    setIsAtTop(window.scrollY <= 0);

    const handleScroll = () => {
      const now = Date.now();

      if (!ticking.current && now - lastTime.current >= throttleMs) {
        window.requestAnimationFrame(() => {
          updateScrollDirection();
          lastTime.current = now;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [throttleMs, updateScrollDirection]);

  return {
    scrollDirection,
    scrollY,
    isAtTop,
    isAtBottom,
    isScrollingUp: scrollDirection === 'up',
    isScrollingDown: scrollDirection === 'down',
  };
};

/**
 * Hook for scroll progress (0-1)
 * @returns {Object} - { progress, scrollY }
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollableHeight = documentHeight - windowHeight;
      const currentProgress = scrollableHeight > 0 
        ? scrollTop / scrollableHeight 
        : 0;

      setProgress(Math.min(Math.max(currentProgress, 0), 1));
      setScrollY(scrollTop);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return { progress, scrollY };
};

/**
 * Hook for section-based scroll tracking
 * @param {string[]} sectionIds - Array of section IDs
 * @returns {Object} - { activeSection, sectionProgress }
 */
export const useScrollSections = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || null);
  const [sectionProgress, setSectionProgress] = useState({});

  useEffect(() => {
    if (!sectionIds.length) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const triggerPoint = scrollTop + windowHeight * 0.4;

      let currentSection = sectionIds[0];
      const progress = {};

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const elementBottom = elementTop + rect.height;

        // Calculate section progress
        if (scrollTop >= elementTop - windowHeight && scrollTop < elementBottom) {
          const sectionScrolled = scrollTop - (elementTop - windowHeight);
          const sectionScrollable = rect.height + windowHeight;
          progress[id] = Math.min(Math.max(sectionScrolled / sectionScrollable, 0), 1);
        } else if (scrollTop >= elementBottom) {
          progress[id] = 1;
        } else {
          progress[id] = 0;
        }

        // Determine active section
        if (triggerPoint >= elementTop && triggerPoint < elementBottom) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
      setSectionProgress(progress);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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
  }, [sectionIds]);

  return { activeSection, sectionProgress };
};

export default useScrollDirection;