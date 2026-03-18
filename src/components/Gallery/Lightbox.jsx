/* ============================================
   Lightbox Component
   Fullscreen image viewer with navigation
   ============================================ */

import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const Lightbox = ({
  isOpen,
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const lightboxRef = useRef(null);
  const imageRef = useRef(null);

  // Current item
  const currentItem = items[currentIndex] || {};

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus trap
    lightboxRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Touch/swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        onNext();
      } else {
        onPrev();
      }
    }
  }, [onNext, onPrev]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen) return;

    const preloadImages = [
      items[currentIndex - 1]?.image,
      items[currentIndex + 1]?.image,
    ].filter(Boolean);

    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [isOpen, currentIndex, items]);

  // Don't render if not open
  if (!isOpen) return null;

  // Portal content
  const lightboxContent = (
    <div
      ref={lightboxRef}
      className={`lightbox ${isOpen ? 'is-open' : ''}`}
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      tabIndex={-1}
    >
      {/* Backdrop */}
      <div className="lightbox__backdrop"></div>

      {/* Close button */}
      <button
        className="lightbox__close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Navigation - Previous */}
      <button
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        disabled={items.length <= 1}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Navigation - Next */}
      <button
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        disabled={items.length <= 1}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Main content */}
      <div className="lightbox__content">
        {/* Image container */}
        <div className="lightbox__image-container">
          <img
            ref={imageRef}
            key={currentItem.id}
            src={currentItem.image}
            alt={currentItem.title}
            className="lightbox__image"
          />
        </div>

        {/* Image info */}
        <div className="lightbox__info">
          <div className="lightbox__info-content">
            <span className="lightbox__category">{currentItem.category}</span>
            <h3 className="lightbox__title">{currentItem.title}</h3>
            {currentItem.description && (
              <p className="lightbox__description">{currentItem.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Counter */}
      <div className="lightbox__counter">
        <span className="lightbox__counter-current">{currentIndex + 1}</span>
        <span className="lightbox__counter-separator">/</span>
        <span className="lightbox__counter-total">{items.length}</span>
      </div>

      {/* Thumbnails strip */}
      {items.length > 1 && (
        <div className="lightbox__thumbnails">
          {items.map((item, index) => (
            <button
              key={item.id}
              className={`lightbox__thumbnail ${index === currentIndex ? 'is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                // You would need to add a goToIndex callback prop for this
              }}
              aria-label={`Go to image ${index + 1}`}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Render in portal
  return createPortal(lightboxContent, document.body);
};

Lightbox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string,
      image: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default Lightbox;