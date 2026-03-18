/* ============================================
   InstructorCard Component
   Individual instructor profile card
   ============================================ */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useBreakpoint } from '../../hooks';
import './InstructorCard.css';

const InstructorCard = ({ instructor, isActive, onHover, onLeave }) => {
  const cardRef = useRef(null);
  const { isTouchDevice } = useBreakpoint();
  const [showOverlay, setShowOverlay] = useState(false);

  // Handle click on mobile
  const handleClick = () => {
    if (isTouchDevice) {
      setShowOverlay(!showOverlay);
    }
  };

  return (
    <article
      ref={cardRef}
      className={`instructor-card ${isActive || showOverlay ? 'is-active' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={handleClick}
    >
      {/* Image container */}
      <div className="instructor-card__image-wrapper">
        <div className="instructor-card__image">
          <img
            src={instructor.image}
            alt={instructor.name}
            loading="lazy"
          />
        </div>

        {/* Gradient overlay */}
        <div className="instructor-card__gradient"></div>

        {/* Experience badge */}
        <div className="instructor-card__experience">
          <span>{instructor.experience}</span>
          <small>Experience</small>
        </div>

        {/* Social links */}
        <div className="instructor-card__social">
          <a
            href={instructor.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${instructor.name} on Instagram`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href={instructor.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${instructor.name} on LinkedIn`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="instructor-card__content">
        {/* Basic info */}
        <div className="instructor-card__info">
          <h3 className="instructor-card__name">{instructor.name}</h3>
          <p className="instructor-card__title">{instructor.title}</p>
        </div>

        {/* Specializations */}
        <div className="instructor-card__specializations">
          {instructor.specializations.map((spec, index) => (
            <span key={index} className="instructor-card__tag">
              {spec}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="instructor-card__stats">
          <div className="instructor-card__stat">
            <span className="instructor-card__stat-value">{instructor.stats.students}</span>
            <span className="instructor-card__stat-label">Students</span>
          </div>
          <div className="instructor-card__stat">
            <span className="instructor-card__stat-value">{instructor.stats.courses}</span>
            <span className="instructor-card__stat-label">Courses</span>
          </div>
          <div className="instructor-card__stat">
            <span className="instructor-card__stat-value">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {instructor.stats.rating}
            </span>
            <span className="instructor-card__stat-label">Rating</span>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="instructor-card__overlay">
        <div className="instructor-card__overlay-content">
          <h4>About {instructor.name.split(' ')[0]}</h4>
          <p className="instructor-card__bio">{instructor.bio}</p>

          {/* Qualifications */}
          <div className="instructor-card__qualifications">
            <h5>Qualifications</h5>
            <ul>
              {instructor.qualifications.map((qual, index) => (
                <li key={index}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <a href="#courses" className="instructor-card__overlay-cta">
            <span>View Courses</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>

      {/* Border */}
      <div className="instructor-card__border"></div>
    </article>
  );
};

InstructorCard.propTypes = {
  instructor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    specializations: PropTypes.arrayOf(PropTypes.string).isRequired,
    experience: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    qualifications: PropTypes.arrayOf(PropTypes.string).isRequired,
    social: PropTypes.shape({
      instagram: PropTypes.string,
      linkedin: PropTypes.string,
    }).isRequired,
    stats: PropTypes.shape({
      students: PropTypes.string.isRequired,
      courses: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isActive: PropTypes.bool,
  onHover: PropTypes.func,
  onLeave: PropTypes.func,
};

export default InstructorCard;