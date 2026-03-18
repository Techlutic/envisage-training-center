/* ============================================
   FeatureCard Component
   Individual feature card with animations
   ============================================ */

import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useBreakpoint } from '../../hooks';
import './FeatureCard.css';

const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);
  const { isTouchDevice } = useBreakpoint();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // Track mouse for spotlight effect
  const handleMouseMove = useCallback((e) => {
    if (isTouchDevice) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  }, [isTouchDevice]);

  return (
    <article
      ref={cardRef}
      className={`feature-card ${isHovered ? 'is-hovered' : ''}`}
      style={{
        '--card-color': feature.color,
        '--mouse-x': `${mousePosition.x * 100}%`,
        '--mouse-y': `${mousePosition.y * 100}%`,
        '--card-index': index,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Background spotlight */}
      <div className="feature-card__spotlight"></div>

      {/* Border glow */}
      <div className="feature-card__border"></div>

      {/* Content */}
      <div className="feature-card__content">
        {/* Header */}
        <div className="feature-card__header">
          <div className="feature-card__icon">
            {feature.icon}
            <div className="feature-card__icon-glow"></div>
          </div>
          <div className="feature-card__stats">
            <span className="feature-card__stats-value">{feature.stats.value}</span>
            <span className="feature-card__stats-label">{feature.stats.label}</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="feature-card__title">{feature.title}</h3>
        <p className="feature-card__description">{feature.description}</p>

        {/* Features list */}
        <ul className="feature-card__features">
          {feature.features.map((item, idx) => (
            <li key={idx} style={{ '--feature-index': idx }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Learn more link */}
        <a href="#courses" className="feature-card__link">
          <span>Learn More</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      {/* Decorative number */}
      <div className="feature-card__number">
        {String(index + 1).padStart(2, '0')}
      </div>
    </article>
  );
};

FeatureCard.propTypes = {
  feature: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FeatureCard;