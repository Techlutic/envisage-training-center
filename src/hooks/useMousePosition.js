/* ============================================
   useMousePosition Hook
   Tracks mouse position for cursor and effects
   ============================================ */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for tracking mouse position
 * @param {Object} options - Configuration options
 * @param {boolean} options.includeTouch - Track touch events
 * @param {number} options.smoothing - Smoothing factor (0-1)
 * @param {boolean} options.normalized - Return normalized values (0-1)
 * @returns {Object} - Mouse position data
 */
const useMousePosition = (options = {}) => {
  const {
    includeTouch = false,
    smoothing = 0,
    normalized = false,
  } = options;

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
    isMoving: false,
  });

  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);
  const moveTimeout = useRef(null);

  // Smooth position update using lerp
  const updateSmoothPosition = useCallback(() => {
    if (smoothing > 0) {
      const lerpFactor = 1 - smoothing;
      currentPosition.current.x += 
        (targetPosition.current.x - currentPosition.current.x) * lerpFactor;
      currentPosition.current.y += 
        (targetPosition.current.y - currentPosition.current.y) * lerpFactor;

      setPosition((prev) => ({
        ...prev,
        x: currentPosition.current.x,
        y: currentPosition.current.y,
      }));

      // Continue animation if not close enough
      const dx = Math.abs(targetPosition.current.x - currentPosition.current.x);
      const dy = Math.abs(targetPosition.current.y - currentPosition.current.y);

      if (dx > 0.1 || dy > 0.1) {
        animationFrame.current = requestAnimationFrame(updateSmoothPosition);
      }
    }
  }, [smoothing]);

  const handleMouseMove = useCallback(
    (event) => {
      const x = event.clientX;
      const y = event.clientY;

      // Calculate normalized values
      const normalizedX = x / window.innerWidth;
      const normalizedY = y / window.innerHeight;

      if (smoothing > 0) {
        targetPosition.current = { x, y };
        
        if (!animationFrame.current) {
          animationFrame.current = requestAnimationFrame(updateSmoothPosition);
        }

        setPosition((prev) => ({
          ...prev,
          clientX: x,
          clientY: y,
          normalizedX,
          normalizedY,
          isMoving: true,
        }));
      } else {
        setPosition({
          x,
          y,
          clientX: x,
          clientY: y,
          normalizedX,
          normalizedY,
          isMoving: true,
        });
      }

      // Clear previous timeout
      if (moveTimeout.current) {
        clearTimeout(moveTimeout.current);
      }

      // Set isMoving to false after mouse stops
      moveTimeout.current = setTimeout(() => {
        setPosition((prev) => ({ ...prev, isMoving: false }));
      }, 100);
    },
    [smoothing, updateSmoothPosition]
  );

  const handleTouchMove = useCallback(
    (event) => {
      if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        handleMouseMove({
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
      }
    },
    [handleMouseMove]
  );

  useEffect(() => {
    // Set initial position to center
    currentPosition.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    targetPosition.current = { ...currentPosition.current };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    if (includeTouch) {
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (includeTouch) {
        window.removeEventListener('touchmove', handleTouchMove);
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (moveTimeout.current) {
        clearTimeout(moveTimeout.current);
      }
    };
  }, [handleMouseMove, handleTouchMove, includeTouch]);

  return position;
};

/**
 * Hook for tracking mouse position relative to an element
 * @param {Object} options - Configuration options
 * @returns {Object} - { ref, position }
 */
export const useRelativeMousePosition = (options = {}) => {
  const { centered = true } = options;

  const elementRef = useRef(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    percentX: 0.5,
    percentY: 0.5,
    isInside: false,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const percentX = x / rect.width;
      const percentY = y / rect.height;

      const centeredX = centered ? (percentX - 0.5) * 2 : percentX;
      const centeredY = centered ? (percentY - 0.5) * 2 : percentY;

      const isInside =
        x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      setPosition({
        x: centered ? centeredX : x,
        y: centered ? centeredY : y,
        percentX,
        percentY,
        isInside,
      });
    };

    const handleMouseLeave = () => {
      setPosition((prev) => ({
        ...prev,
        isInside: false,
        x: 0,
        y: 0,
        percentX: 0.5,
        percentY: 0.5,
      }));
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [centered]);

  return {
    ref: elementRef,
    ...position,
  };
};

/**
 * Hook for tracking mouse velocity
 * @returns {Object} - { position, velocity }
 */
export const useMouseVelocity = () => {
  const [state, setState] = useState({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  });

  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleMouseMove = (event) => {
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTime.current;

      if (timeDelta > 0) {
        const velocityX = (event.clientX - lastPosition.current.x) / timeDelta;
        const velocityY = (event.clientY - lastPosition.current.y) / timeDelta;

        setState({
          position: { x: event.clientX, y: event.clientY },
          velocity: { x: velocityX, y: velocityY },
        });

        lastPosition.current = { x: event.clientX, y: event.clientY };
        lastTime.current = currentTime;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return state;
};

export default useMousePosition;