/* ============================================
   Hooks Index - Export all custom hooks
   ============================================ */

// Scroll Animation
export { default as useScrollAnimation } from './useScrollAnimation';
export { useStaggerAnimation, useScrollProgress as useElementScrollProgress } from './useScrollAnimation';

// Mouse Position
export { default as useMousePosition } from './useMousePosition';
export { useRelativeMousePosition, useMouseVelocity } from './useMousePosition';

// Intersection Observer
export { default as useIntersectionObserver } from './useIntersectionObserver';
export { 
  useIntersectionObserverMultiple, 
  useLazyImage, 
  useInfiniteScroll 
} from './useIntersectionObserver';

// Parallax
export { default as useParallax } from './useParallax';
export { 
  useParallaxLayers, 
  useMouseParallax, 
  useParallaxRotation 
} from './useParallax';

// Magnetic Effect
export { default as useMagneticEffect } from './useMagneticEffect';
export { useMagneticText, useMagneticCursor } from './useMagneticEffect';

// Media Query
export { default as useMediaQuery } from './useMediaQuery';
export { 
  useBreakpoint, 
  useResponsiveValue, 
  useWindowSize, 
  useElementSize,
  useDevicePixelRatio,
  BREAKPOINTS 
} from './useMediaQuery';

// Count Up
export { default as useCountUp } from './useCountUp';
export { useCountUpOnScroll, useCountUpMultiple } from './useCountUp';

// Scroll Direction
export { default as useScrollDirection } from './useScrollDirection';
export { useScrollProgress, useScrollSections } from './useScrollDirection';

// Local Storage
export { default as useLocalStorage } from './useLocalStorage';
export { useSessionStorage, useStorageObject } from './useLocalStorage';

// Smooth Scroll
export { default as useSmoothScroll } from './useSmoothScroll';
export { useSmoothScrollContainer } from './useSmoothScroll';