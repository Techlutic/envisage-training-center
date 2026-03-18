/* ============================================
   CustomCursor Component
   Premium custom cursor with effects
   ============================================ */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import './CustomCursor.css';

const CustomCursor = ({ 
  color = 'var(--gold-primary)',
  size = 8,
  trailSize = 40,
  trailDelay = 0.08,
}) => {
  // State
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isHidden, setIsHidden] = useState(false);

  // Refs
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const rafRef = useRef(null);
  const targetPosition = useRef({ x: 0, y: 0 });

  // Smooth trail follow
  const animateTrail = useCallback(() => {
    setTrailPosition((prev) => ({
      x: prev.x + (targetPosition.current.x - prev.x) * (1 - trailDelay * 5),
      y: prev.y + (targetPosition.current.y - prev.y) * (1 - trailDelay * 5),
    }));
    rafRef.current = requestAnimationFrame(animateTrail);
  }, [trailDelay]);

  // Mouse move handler
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    
    setPosition({ x: clientX, y: clientY });
    targetPosition.current = { x: clientX, y: clientY };
    
    if (!isVisible) {
      setIsVisible(true);
    }
  }, [isVisible]);

  // Mouse enter/leave handlers
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Mouse down/up handlers
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  // Check for interactive elements
  const handleElementHover = useCallback((e) => {
    const target = e.target;
    
    // Check for cursor-related data attributes
    const cursorType = target.closest('[data-cursor]')?.dataset.cursor;
    const cursorText = target.closest('[data-cursor-text]')?.dataset.cursorText;
    
    // Check for common interactive elements
    const isLink = target.closest('a, button, [role="button"]');
    const isInput = target.closest('input, textarea, select');
    const isImage = target.closest('[data-cursor="view"], .gallery-item, .lightbox-trigger');
    const isDrag = target.closest('[data-cursor="drag"]');
    const isHidden = target.closest('[data-cursor="hidden"]');
    
    // Set cursor variant
    if (isHidden) {
      setIsHidden(true);
      setCursorVariant('hidden');
      setIsHovering(false);
      setHoverText('');
    } else if (cursorType) {
      setIsHidden(false);
      setCursorVariant(cursorType);
      setIsHovering(true);
      setHoverText(cursorText || '');
    } else if (isImage || isDrag) {
      setIsHidden(false);
      setCursorVariant(isImage ? 'view' : 'drag');
      setIsHovering(true);
      setHoverText(isImage ? 'View' : 'Drag');
    } else if (isInput) {
      setIsHidden(false);
      setCursorVariant('text');
      setIsHovering(true);
      setHoverText('');
    } else if (isLink) {
      setIsHidden(false);
      setCursorVariant('pointer');
      setIsHovering(true);
      setHoverText(cursorText || '');
    } else {
      setIsHidden(false);
      setCursorVariant('default');
      setIsHovering(false);
      setHoverText('');
    }
  }, []);

  // Initialize cursor
  useEffect(() => {
    // Check if device supports hover (not touch)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    // Start trail animation
    rafRef.current = requestAnimationFrame(animateTrail);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    // Hide default cursor
    document.body.classList.add('custom-cursor-active');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementHover);
      document.body.classList.remove('custom-cursor-active');
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    animateTrail,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleElementHover,
  ]);

  // Build class names
  const cursorClasses = [
    'custom-cursor',
    isVisible && 'is-visible',
    isHovering && 'is-hovering',
    isClicking && 'is-clicking',
    isHidden && 'is-hidden',
    `cursor--${cursorVariant}`,
  ].filter(Boolean).join(' ');

  const trailClasses = [
    'custom-cursor__trail',
    isVisible && 'is-visible',
    isHovering && 'is-hovering',
    isClicking && 'is-clicking',
    isHidden && 'is-hidden',
    `cursor--${cursorVariant}`,
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={cursorClasses}
        style={{
          '--cursor-x': `${position.x}px`,
          '--cursor-y': `${position.y}px`,
          '--cursor-color': color,
          '--cursor-size': `${size}px`,
        }}
      >
        <div className="custom-cursor__dot"></div>
      </div>

      {/* Trailing ring */}
      <div
        ref={trailRef}
        className={trailClasses}
        style={{
          '--trail-x': `${trailPosition.x}px`,
          '--trail-y': `${trailPosition.y}px`,
          '--cursor-color': color,
          '--trail-size': `${trailSize}px`,
        }}
      >
        <div className="custom-cursor__ring"></div>
        
        {/* Hover text */}
        {hoverText && (
          <span className="custom-cursor__text">{hoverText}</span>
        )}
      </div>
    </>
  );
};

CustomCursor.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  trailSize: PropTypes.number,
  trailDelay: PropTypes.number,
};

export default CustomCursor;