/* ============================================
   TestimonialCard Component
   Individual testimonial card with animations
   ============================================ */

import React from 'react';
import PropTypes from 'prop-types';

const TestimonialCard = ({ testimonial, isActive }) => {
  const {
    name,
    role,
    location,
    avatar,
    rating,
    course,
    quote,
    date,
    featured,
  } = testimonial;

  // Render star rating
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`testimonial-card__star ${index < rating ? 'is-filled' : ''}`}
        viewBox="0 0 24 24"
        fill={index < rating ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  return (
    <article
      className={`testimonial-card ${isActive ? 'is-active' : ''} ${featured ? 'is-featured' : ''}`}
    >
      {/* Card glow effect */}
      <div className="testimonial-card__glow"></div>

      {/* Card content */}
      <div className="testimonial-card__inner">
        {/* Featured badge */}
        {featured && (
          <div className="testimonial-card__badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span>Featured</span>
          </div>
        )}

        {/* Quote icon */}
        <div className="testimonial-card__quote-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z"/>
          </svg>
        </div>

        {/* Rating */}
        <div className="testimonial-card__rating">
          {renderStars()}
        </div>

        {/* Quote text */}
        <blockquote className="testimonial-card__quote">
          <p>{quote}</p>
        </blockquote>

        {/* Course tag */}
        <div className="testimonial-card__course">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <span>{course}</span>
        </div>

        {/* Divider */}
        <div className="testimonial-card__divider"></div>

        {/* Author info */}
        <div className="testimonial-card__author">
          <div className="testimonial-card__avatar">
            <img
              src={avatar}
              alt={name}
              loading="lazy"
            />
            <div className="testimonial-card__avatar-ring"></div>
          </div>
          <div className="testimonial-card__info">
            <h4 className="testimonial-card__name">{name}</h4>
            <p className="testimonial-card__role">{role}</p>
            <p className="testimonial-card__location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {location}
            </p>
          </div>
          <div className="testimonial-card__date">{date}</div>
        </div>
      </div>

      {/* Card border gradient */}
      <div className="testimonial-card__border"></div>
    </article>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    course: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    featured: PropTypes.bool,
  }).isRequired,
  isActive: PropTypes.bool,
};

export default TestimonialCard;