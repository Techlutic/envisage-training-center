/* ============================================
   TiltCard Component
   3D tilt effect card on hover
   ============================================ */

import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useBreakpoint } from '../../../hooks';
import './TiltCard.css';

const TiltCard = ({
  children,
  className = '',
  maxTilt = 15,
  scale = 1.02,
  speed = 400,
  glare = true,
  glareMaxOpacity = 0.2,
  perspective = 1000,
  disabled = false,
  onTilt,
  ...props
}) => {
  const cardRef = useRef(null);
  const { isTouchDevice } = useBreakpoint();
  
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Calculate tilt based on mouse position
  const handleMouseMove = useCallback((e) => {
    if (disabled || isTouchDevice) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;

    // Calculate mouse position relative to card center
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize to -1 to 1
    const normalizedX = (mouseX / cardWidth - 0.5) * 2;
    const normalizedY = (mouseY / cardHeight - 0.5) * 2;

    // Calculate tilt angles
    const tiltX = -normalizedY * maxTilt;
    const tiltY = normalizedX * maxTilt;

    setTilt({ x: tiltX, y: tiltY });

    // Update glare position
    if (glare) {
      setGlarePosition({
        x: (mouseX / cardWidth) * 100,
        y: (mouseY / cardHeight) * 100,
      });
    }

    // Callback
    if (onTilt) {
      onTilt({ tiltX, tiltY, mouseX, mouseY });
    }
  }, [maxTilt, glare, disabled, isTouchDevice, onTilt]);

  const handleMouseEnter = useCallback(() => {
    if (disabled || isTouchDevice) return;
    setIsHovered(true);
  }, [disabled, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (disabled || isTouchDevice) return;
    setTilt({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
    setIsHovered(false);
  }, [disabled, isTouchDevice]);

  // Build transform style
  const transformStyle = {
    transform: `
      perspective(${perspective}px)
      rotateX(${tilt.x}deg)
      rotateY(${tilt.y}deg)
      scale(${isHovered ? scale : 1})
    `,
    transition: isHovered 
      ? `transform ${speed / 2}ms ease-out` 
      : `transform ${speed}ms ease-out`,
  };

  // Glare style
  const glareStyle = {
    background: `
      radial-gradient(
        circle at ${glarePosition.x}% ${glarePosition.y}%,
        rgba(255, 255, 255, ${isHovered ? glareMaxOpacity : 0}) 0%,
        transparent 60%
      )
    `,
    opacity: isHovered ? 1 : 0,
  };

  // Build class names
  const cardClasses = [
    'tilt-card',
    isHovered && 'is-hovered',
    disabled && 'is-disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      style={transformStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Card content */}
      <div className="tilt-card__content">
        {children}
      </div>

      {/* Glare overlay */}
      {glare && (
        <div className="tilt-card__glare" style={glareStyle}></div>
      )}

      {/* Border glow */}
      <div className="tilt-card__glow"></div>
    </div>
  );
};

TiltCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  maxTilt: PropTypes.number,
  scale: PropTypes.number,
  speed: PropTypes.number,
  glare: PropTypes.bool,
  glareMaxOpacity: PropTypes.number,
  perspective: PropTypes.number,
  disabled: PropTypes.bool,
  onTilt: PropTypes.func,
};

export default TiltCard;