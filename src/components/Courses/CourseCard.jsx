/* ============================================
   CourseCard Component
   Premium course card with 3D effects
   ============================================ */

import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useBreakpoint } from '../../hooks';
import { TiltCard } from '../common';
import './CourseCard.css';

const CourseCard = ({ course, isHovered, onHover, onLeave }) => {
  const cardRef = useRef(null);
  const { isTouchDevice } = useBreakpoint();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate discount percentage
  const discountPercent = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="course-card__star course-card__star--full" viewBox="0 0 24 24">
            <polygon
              fill="currentColor"
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="course-card__star course-card__star--half" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`half-star-${course.id}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon
              fill={`url(#half-star-${course.id})`}
              stroke="currentColor"
              strokeWidth="1"
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="course-card__star course-card__star--empty" viewBox="0 0 24 24">
            <polygon
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            />
          </svg>
        );
      }
    }

    return stars;
  };

  return (
    <TiltCard
      className={`course-card ${isHovered ? 'is-hovered' : ''}`}
      maxTilt={isTouchDevice ? 0 : 8}
      scale={isTouchDevice ? 1 : 1.02}
      glare={!isTouchDevice}
      glareMaxOpacity={0.15}
    >
      <article
        ref={cardRef}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Image section */}
        <div className="course-card__image-wrapper">
          <div className={`course-card__image ${imageLoaded ? 'is-loaded' : ''}`}>
            <img
              src={course.image}
              alt={course.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
            <div className="course-card__image-overlay"></div>
          </div>

          {/* Badges */}
          <div className="course-card__badges">
            {course.featured && (
              <span className="course-card__badge course-card__badge--featured">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Featured
              </span>
            )}
            {course.bestseller && (
              <span className="course-card__badge course-card__badge--bestseller">
                Bestseller
              </span>
            )}
          </div>

          {/* Discount badge */}
          {discountPercent > 0 && (
            <div className="course-card__discount">
              <span>-{discountPercent}%</span>
            </div>
          )}

          {/* Category & Level */}
          <div className="course-card__meta-overlay">
            <span className="course-card__level">{course.level}</span>
            <span className="course-card__duration">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {course.duration}
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="course-card__content">
          {/* Instructor */}
          <div className="course-card__instructor">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              loading="lazy"
            />
            <span>{course.instructor.name}</span>
          </div>

          {/* Title */}
          <h3 className="course-card__title">{course.title}</h3>

          {/* Highlights */}
          <ul className="course-card__highlights">
            {course.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Rating */}
          <div className="course-card__rating">
            <span className="course-card__rating-value">{course.rating}</span>
            <div className="course-card__stars">{renderStars(course.rating)}</div>
            <span className="course-card__reviews">({course.reviews} reviews)</span>
          </div>

          {/* Students count */}
          <div className="course-card__students">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{course.students.toLocaleString()} students enrolled</span>
          </div>

          {/* Footer */}
          <div className="course-card__footer">
            <div className="course-card__price">
              <span className="course-card__price-current">
                {formatPrice(course.price)}
              </span>
              {course.originalPrice > course.price && (
                <span className="course-card__price-original">
                  {formatPrice(course.originalPrice)}
                </span>
              )}
            </div>

            <a
              href="https://envisageaesthetics.thinkific.com/"
              className="course-card__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Enroll Now</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* Hover overlay with quick view */}
        <div className="course-card__overlay">
          <button className="course-card__quick-view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Quick View</span>
          </button>
        </div>
      </article>
    </TiltCard>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    students: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired,
    featured: PropTypes.bool,
    bestseller: PropTypes.bool,
    highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructor: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isHovered: PropTypes.bool,
  onHover: PropTypes.func,
  onLeave: PropTypes.func,
};

export default CourseCard;