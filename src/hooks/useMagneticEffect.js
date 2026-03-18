/* ============================================
   useMagneticEffect Hook
   Creates magnetic pull effect for buttons
   ============================================ */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for magnetic button effect
 * @param {Object} options - Configuration options
 * @param {number} options.strength - Magnetic pull strength
 * @param {number} options.radius - Effect trigger radius
 * @param {number} options.ease - Ease factor for smoothing
 * @returns {Object} - { ref, style, isHovered }
 */
const useMagneticEffect = (options = {}) => {
  const {
    strength = 0.5,
    radius = 100,
    ease = 0.15,
  } = options;

  const elementRef = useRef(null);
  const rafRef = useRef(null);
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Animate position with easing
  const animate = useCallback(() => {
    currentPosition.current.x += 
      (targetPosition.current.x - currentPosition.current.x) * ease;
    currentPosition.current.y += 
      (targetPosition.current.y - currentPosition.current.y) * ease;

    // Round to prevent sub-pixel rendering
    const x = Math.round(currentPosition.current.x * 100) / 100;
    const y = Math.round(currentPosition.current.y * 100) / 100;

    setPosition({ x, y });

    // Continue animation if not at target
    const dx = Math.abs(targetPosition.current.x - currentPosition.current.x);
    const dy = Math.abs(targetPosition.current.y - currentPosition.current.y);

    if (dx > 0.01 || dy > 0.01) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [ease]);

  const handleMouseMove = useCallback(
    (event) => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        setIsHovered(true);
        const pullX = distanceX * strength;
        const pullY = distanceY * strength;
        targetPosition.current = { x: pullX, y: pullY };
      } else {
        setIsHovered(false);
        targetPosition.current = { x: 0, y: 0 };
      }

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [strength, radius, animate]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsActive(false);
    targetPosition.current = { x: 0, y: 0 };
    
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const handleMouseDown = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Listen for mouse events on the window for smooth tracking
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseDown, handleMouseUp]);

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
  };

  return {
    ref: elementRef,
    style,
    position,
    isHovered,
    isActive,
  };
};

/**
 * Hook for magnetic text effect (text follows cursor)
 * @param {Object} options - Configuration options
 * @returns {Object} - { ref, childStyle, isHovered }
 */
export const useMagneticText = (options = {}) => {
  const { strength = 0.3, textStrength = 0.2 } = options;

  const containerRef = useRef(null);
  const [containerPosition, setContainerPosition] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;

      setContainerPosition({
        x: distanceX * strength,
        y: distanceY * strength,
      });

      setTextPosition({
        x: distanceX * textStrength,
        y: distanceY * textStrength,
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setContainerPosition({ x: 0, y: 0 });
      setTextPosition({ x: 0, y: 0 });
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, textStrength]);

  const containerStyle = {
    transform: `translate3d(${containerPosition.x}px, ${containerPosition.y}px, 0)`,
    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
  };

  const textStyle = {
    transform: `translate3d(${textPosition.x}px, ${textPosition.y}px, 0)`,
    transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
  };

  return {
    ref: containerRef,
    containerStyle,
    textStyle,
    isHovered,
  };
};

/**
 * Hook for magnetic cursor effect on multiple elements
 * @param {Object} options - Configuration options
 * @returns {Object} - { cursorStyle, handleElementHover }
 */
export const useMagneticCursor = (options = {}) => {
  const { strength = 0.5 } = options;

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [targetElement, setTargetElement] = useState(null);
  const [isAttracted, setIsAttracted] = useState(false);

  const handleElementHover = useCallback((element, hovering) => {
    if (hovering) {
      setTargetElement(element);
      setIsAttracted(true);
    } else {
      setTargetElement(null);
      setIsAttracted(false);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (targetElement && isAttracted) {
        const rect = targetElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const pullX = (centerX - event.clientX) * strength;
        const pullY = (centerY - event.clientY) * strength;

        setCursorPosition({
          x: event.clientX + pullX,
          y: event.clientY + pullY,
        });
      } else {
        setCursorPosition({
          x: event.clientX,
          y: event.clientY,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [targetElement, isAttracted, strength]);

  const cursorStyle = {
    position: 'fixed',
    left: cursorPosition.x,
    top: cursorPosition.y,
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    transition: isAttracted ? 'none' : 'all 0.15s ease-out',
  };

  return {
    cursorPosition,
    cursorStyle,
    handleElementHover,
    isAttracted,
  };
};

export default useMagneticEffect;