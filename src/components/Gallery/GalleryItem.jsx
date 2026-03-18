/* ============================================
   GalleryItem Component
   Individual gallery item with hover effects
   ============================================ */

import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useBreakpoint } from '../../hooks';

const GalleryItem = ({ item, index, onClick }) => {
  const itemRef = useRef(null);
  const { isTouchDevice } = useBreakpoint();

  const { title, category, thumbnail, size, description } = item;

  // 3D tilt effect on mouse move
  const handleMouseMove = useCallback((e) => {
    if (isTouchDevice) return;
    
    const element = itemRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    const element = itemRef.current;
    if (!element) return;
    
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }, []);

  // Category labels
  const categoryLabels = {
    training: 'Training',
    facilities: 'Facilities',
    certificates: 'Certificates',
    events: 'Events',
  };

  return (
    <article
      ref={itemRef}
      className={`gallery-item gallery-item--${size}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${title}`}
    >
      {/* Image container */}
      <div className="gallery-item__image-wrapper">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="gallery-item__image"
        />
        
        {/* Overlay */}
        <div className="gallery-item__overlay">
          {/* Category badge */}
          <span className="gallery-item__category">
            {categoryLabels[category] || category}
          </span>

          {/* Content */}
          <div className="gallery-item__content">
            <h3 className="gallery-item__title">{title}</h3>
            <p className="gallery-item__description">{description}</p>
          </div>

          {/* View icon */}
          <div className="gallery-item__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
        </div>

        {/* Corner accents */}
        <div className="gallery-item__corner gallery-item__corner--tl"></div>
        <div className="gallery-item__corner gallery-item__corner--tr"></div>
        <div className="gallery-item__corner gallery-item__corner--bl"></div>
        <div className="gallery-item__corner gallery-item__corner--br"></div>
      </div>

      {/* Glow effect */}
      <div className="gallery-item__glow"></div>
    </article>
  );
};

GalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    description: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GalleryItem;