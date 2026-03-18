/* ============================================
   FloatingElements Component
   Decorative floating elements for hero
   ============================================ */

import React from 'react';
import PropTypes from 'prop-types';
import { useBreakpoint } from '../../hooks';
import './FloatingElements.css';

const FloatingElements = ({ mousePosition = { x: 0.5, y: 0.5 } }) => {
  const { isMobile, prefersReducedMotion } = useBreakpoint();

  // Don't render on mobile or reduced motion
  if (isMobile || prefersReducedMotion) {
    return null;
  }

  // Calculate parallax transform
  const getTransform = (intensity = 1, invert = false) => {
    const x = (mousePosition.x - 0.5) * 50 * intensity * (invert ? -1 : 1);
    const y = (mousePosition.y - 0.5) * 50 * intensity * (invert ? -1 : 1);
    return `translate3d(${x}px, ${y}px, 0)`;
  };

  // Floating orb configurations
  const orbs = [
    {
      id: 1,
      size: 300,
      top: '10%',
      left: '10%',
      color: 'rgba(201, 168, 108, 0.15)',
      blur: 80,
      intensity: 0.3,
      animationDelay: '0s',
    },
    {
      id: 2,
      size: 200,
      top: '60%',
      right: '5%',
      color: 'rgba(201, 168, 108, 0.1)',
      blur: 60,
      intensity: 0.5,
      animationDelay: '2s',
    },
    {
      id: 3,
      size: 150,
      bottom: '20%',
      left: '20%',
      color: 'rgba(201, 168, 108, 0.08)',
      blur: 50,
      intensity: 0.4,
      animationDelay: '4s',
    },
    {
      id: 4,
      size: 100,
      top: '30%',
      right: '20%',
      color: 'rgba(255, 255, 255, 0.05)',
      blur: 40,
      intensity: 0.6,
      animationDelay: '1s',
    },
  ];

  // Decorative shapes
  const shapes = [
    {
      id: 1,
      type: 'ring',
      size: 80,
      top: '15%',
      right: '15%',
      intensity: 0.4,
      rotate: true,
    },
    {
      id: 2,
      type: 'ring',
      size: 60,
      bottom: '30%',
      left: '8%',
      intensity: 0.3,
      rotate: true,
    },
    {
      id: 3,
      type: 'cross',
      size: 20,
      top: '40%',
      left: '15%',
      intensity: 0.5,
    },
    {
      id: 4,
      type: 'cross',
      size: 16,
      bottom: '40%',
      right: '25%',
      intensity: 0.4,
    },
    {
      id: 5,
      type: 'dot',
      size: 6,
      top: '25%',
      left: '30%',
      intensity: 0.6,
    },
    {
      id: 6,
      type: 'dot',
      size: 4,
      top: '70%',
      right: '35%',
      intensity: 0.5,
    },
  ];

  return (
    <div className="floating-elements" aria-hidden="true">
      {/* Glowing orbs */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="floating-elements__orb"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
            transform: getTransform(orb.intensity),
            animationDelay: orb.animationDelay,
          }}
        />
      ))}

      {/* Decorative shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`floating-elements__shape floating-elements__shape--${shape.type}`}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            transform: getTransform(shape.intensity, true),
          }}
        >
          {shape.type === 'ring' && (
            <svg viewBox="0 0 100 100" className={shape.rotate ? 'rotate' : ''}>
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(201, 168, 108, 0.2)"
                strokeWidth="1"
                strokeDasharray="10 5"
              />
            </svg>
          )}
          {shape.type === 'cross' && (
            <svg viewBox="0 0 20 20">
              <line
                x1="10"
                y1="0"
                x2="10"
                y2="20"
                stroke="rgba(201, 168, 108, 0.3)"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="10"
                x2="20"
                y2="10"
                stroke="rgba(201, 168, 108, 0.3)"
                strokeWidth="1"
              />
            </svg>
          )}
          {shape.type === 'dot' && (
            <div className="floating-elements__dot" />
          )}
        </div>
      ))}

      {/* Gradient lines */}
      <div className="floating-elements__line floating-elements__line--1" />
      <div className="floating-elements__line floating-elements__line--2" />
    </div>
  );
};

FloatingElements.propTypes = {
  mousePosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default FloatingElements;