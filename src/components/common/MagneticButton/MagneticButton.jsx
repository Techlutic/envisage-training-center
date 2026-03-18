/* ============================================
   MagneticButton Component
   Button with magnetic cursor attraction
   ============================================ */

import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useBreakpoint } from '../../../hooks';
import './MagneticButton.css';

const MagneticButton = ({
  children,
  as: Tag = 'button',
  href = null,
  strength = 0.4,
  textStrength = 0.2,
  radius = 150,
  className = '',
  onClick,
  disabled = false,
  ...props
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const rafRef = useRef(null);
  
  const { isTouchDevice } = useBreakpoint();
  
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  // Calculate magnetic effect
  const handleMouseMove = useCallback((e) => {
    if (disabled || isTouchDevice) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      // Inside magnetic radius
      const magnetX = distanceX * strength;
      const magnetY = distanceY * strength;
      
      const textMagnetX = distanceX * textStrength;
      const textMagnetY = distanceY * textStrength;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: magnetX, y: magnetY });
        setTextPosition({ x: textMagnetX, y: textMagnetY });
      });

      if (!isHovered) {
        setIsHovered(true);
      }
    } else {
      // Outside magnetic radius
      if (isHovered) {
        resetPosition();
      }
    }
  }, [strength, textStrength, radius, disabled, isTouchDevice, isHovered]);

  const resetPosition = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setPosition({ x: 0, y: 0 });
    setTextPosition({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    resetPosition();
  }, [resetPosition]);

  // Build styles
  const containerStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  };

  const textStyle = {
    transform: `translate3d(${textPosition.x}px, ${textPosition.y}px, 0)`,
  };

  // Build class names
  const containerClasses = [
    'magnetic-btn',
    isHovered && 'is-hovered',
    disabled && 'is-disabled',
    className,
  ].filter(Boolean).join(' ');

  // Common props
  const commonProps = {
    ref: containerRef,
    className: containerClasses,
    style: containerStyle,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: disabled ? undefined : onClick,
    disabled: Tag === 'button' ? disabled : undefined,
    ...props,
  };

  // Render as link or button
  if (href && Tag === 'button') {
    return (
      <a
        href={disabled ? undefined : href}
        {...commonProps}
        aria-disabled={disabled}
      >
        <span ref={textRef} className="magnetic-btn__content" style={textStyle}>
          {children}
        </span>
        <span className="magnetic-btn__bg"></span>
      </a>
    );
  }

  return (
    <Tag {...commonProps}>
      <span ref={textRef} className="magnetic-btn__content" style={textStyle}>
        {children}
      </span>
      <span className="magnetic-btn__bg"></span>
    </Tag>
  );
};

MagneticButton.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(['button', 'a', 'div']),
  href: PropTypes.string,
  strength: PropTypes.number,
  textStrength: PropTypes.number,
  radius: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default MagneticButton;