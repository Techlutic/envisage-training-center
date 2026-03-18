/* ============================================
   ServiceCard Component
   Individual service card with FIXED image display
   ============================================ */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ServiceCard.css';

const ServiceCard = ({ service, index, isActive = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    icon,
    title,
    description,
    features,
    image,
    duration,
    level,
    price,
  } = service;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const fallbackImage = `https://via.placeholder.com/800x500/1A1A2E/C9A86C?text=${encodeURIComponent(title)}`;
  const imageUrl = imageError ? fallbackImage : image;

  return (
    <article
      className={`service-card ${isActive ? 'is-active' : ''}`}
      style={{ '--card-index': index }}
    >
      {/* Glow effect */}
      <div className="service-card__glow" />

      {/* Image section */}
      <div className="service-card__image-section">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="service-card__skeleton">
            <div className="service-card__skeleton-shimmer" />
          </div>
        )}

        {/* Image using background-image for reliable centering */}
        <div
          className={`service-card__image ${imageLoaded ? 'is-loaded' : ''}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
          role="img"
          aria-label={title}
        />

        {/* Hidden img for load detection */}
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          className="service-card__image-preloader"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Overlay */}
        <div className="service-card__image-overlay" />

        {/* Badges */}
        <span className="service-card__badge service-card__badge--level">{level}</span>
        <span className="service-card__badge service-card__badge--price">{price}</span>
      </div>

      {/* Content section */}
      <div className="service-card__content">
        {/* Icon */}
        <div className="service-card__icon">{icon}</div>

        {/* Title */}
        <h3 className="service-card__title">{title}</h3>

        {/* Description */}
        <p className="service-card__description">{description}</p>

        {/* Features */}
        <ul className="service-card__features">
          {features.map((feature, idx) => (
            <li key={idx} className="service-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="service-card__footer">
          <span className="service-card__duration">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {duration}
          </span>
          <a href="#courses" className="service-card__cta">
            Learn More
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>

      {/* Border decoration */}
      <div className="service-card__border" />
    </article>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

export default ServiceCard;