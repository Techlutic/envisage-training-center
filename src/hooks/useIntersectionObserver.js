/* ============================================
   useIntersectionObserver Hook
   Detects when elements are visible in viewport
   ============================================ */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for Intersection Observer API
 * @param {Object} options - IntersectionObserver options
 * @param {number|number[]} options.threshold - Visibility threshold(s)
 * @param {string} options.rootMargin - Margin around viewport
 * @param {Element} options.root - Root element (null = viewport)
 * @param {boolean} options.freezeOnceVisible - Stop observing once visible
 * @returns {Object} - { ref, entry, isIntersecting }
 */
const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0,
    rootMargin = '0px',
    root = null,
    freezeOnceVisible = false,
  } = options;

  const elementRef = useRef(null);
  const [entry, setEntry] = useState(null);
  const frozen = useRef(false);

  const updateEntry = useCallback(([entry]) => {
    setEntry(entry);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    
    // Check for browser support
    const hasIOSupport = !!window.IntersectionObserver;
    
    if (!hasIOSupport || frozen.current || !element) {
      return;
    }

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, updateEntry]);

  // Freeze observer once element is visible
  useEffect(() => {
    if (entry?.isIntersecting && freezeOnceVisible) {
      frozen.current = true;
    }
  }, [entry?.isIntersecting, freezeOnceVisible]);

  return {
    ref: elementRef,
    entry,
    isIntersecting: entry?.isIntersecting ?? false,
    intersectionRatio: entry?.intersectionRatio ?? 0,
  };
};

/**
 * Hook for observing multiple elements
 * @param {Object} options - Configuration options
 * @returns {Object} - { setElements, entries, visibleCount }
 */
export const useIntersectionObserverMultiple = (options = {}) => {
  const {
    threshold = 0,
    rootMargin = '0px',
    root = null,
  } = options;

  const [entries, setEntries] = useState(new Map());
  const elementsRef = useRef(new Set());

  const setElements = useCallback((elements) => {
    elementsRef.current = new Set(elements);
  }, []);

  useEffect(() => {
    const elements = elementsRef.current;
    if (elements.size === 0) return;

    const handleIntersect = (observerEntries) => {
      setEntries((prevEntries) => {
        const newEntries = new Map(prevEntries);
        observerEntries.forEach((entry) => {
          newEntries.set(entry.target, entry);
        });
        return newEntries;
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      root,
      rootMargin,
    });

    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin]);

  const visibleCount = Array.from(entries.values()).filter(
    (entry) => entry.isIntersecting
  ).length;

  return {
    setElements,
    entries,
    visibleCount,
  };
};

/**
 * Hook for lazy loading images
 * @param {string} src - Image source URL
 * @param {Object} options - Configuration options
 * @returns {Object} - { ref, isLoaded, currentSrc }
 */
export const useLazyImage = (src, options = {}) => {
  const { placeholder = '', rootMargin = '200px' } = options;

  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start loading the image
          const img = new Image();
          img.onload = () => {
            setCurrentSrc(src);
            setIsLoaded(true);
          };
          img.src = src;
          
          // Stop observing
          observer.unobserve(image);
        }
      },
      { rootMargin }
    );

    observer.observe(image);

    return () => {
      observer.disconnect();
    };
  }, [src, rootMargin]);

  return {
    ref: imageRef,
    isLoaded,
    currentSrc,
  };
};

/**
 * Hook for infinite scroll
 * @param {Function} callback - Function to call when reaching end
 * @param {Object} options - Configuration options
 * @returns {Object} - { sentinelRef, isLoading }
 */
export const useInfiniteScroll = (callback, options = {}) => {
  const { rootMargin = '100px', enabled = true } = options;

  const sentinelRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const callbackRef = useRef(callback);

  // Update callback ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !enabled) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);
          await callbackRef.current();
          setIsLoading(false);
        }
      },
      { rootMargin }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, enabled, isLoading]);

  return {
    sentinelRef,
    isLoading,
  };
};

export default useIntersectionObserver;