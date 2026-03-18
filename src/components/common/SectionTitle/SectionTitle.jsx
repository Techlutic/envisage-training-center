/* ============================================
   SectionTitle Component
   Animated section headings with accents
   ============================================ */

import React from 'react';
import PropTypes from 'prop-types';
import { useScrollAnimation } from '../../../hooks';
import './SectionTitle.css';

const SectionTitle = ({
  subtitle = '',
  title = '',
  description = '',
  alignment = 'center',
  theme = 'dark',
  animated = true,
  subtitleIcon = null,
  className = '',
  titleAs = 'h2',
}) => {
  // Animation hooks
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true,
    delay: 100,
  });

  const { ref: descRef, isVisible: descVisible } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true,
    delay: 200,
  });

  // Dynamic heading tag
  const TitleTag = titleAs;

  // Build class names
  const containerClasses = [
    'section-title',
    `section-title--${alignment}`,
    `section-title--${theme}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Subtitle */}
      {subtitle && (
        <div
          ref={animated ? subtitleRef : null}
          className={`section-title__subtitle ${
            animated ? (subtitleVisible ? 'is-visible' : '') : 'is-visible'
          }`}
        >
          {subtitleIcon && (
            <span className="section-title__subtitle-icon">{subtitleIcon}</span>
          )}
          <span className="section-title__subtitle-text">{subtitle}</span>
          <span className="section-title__subtitle-line"></span>
        </div>
      )}

      {/* Main Title */}
      {title && (
        <TitleTag
          ref={animated ? titleRef : null}
          className={`section-title__heading ${
            animated ? (titleVisible ? 'is-visible' : '') : 'is-visible'
          }`}
        >
          {/* Split title for gradient effect if contains | */}
          {title.includes('|') ? (
            <>
              {title.split('|').map((part, index) => (
                <span
                  key={index}
                  className={index === 1 ? 'section-title__heading-accent' : ''}
                >
                  {part}
                </span>
              ))}
            </>
          ) : (
            title
          )}
        </TitleTag>
      )}

      {/* Description */}
      {description && (
        <p
          ref={animated ? descRef : null}
          className={`section-title__description ${
            animated ? (descVisible ? 'is-visible' : '') : 'is-visible'
          }`}
        >
          {description}
        </p>
      )}

      {/* Decorative element */}
      <div className="section-title__decorator">
        <span className="section-title__decorator-line"></span>
        <span className="section-title__decorator-diamond"></span>
        <span className="section-title__decorator-line"></span>
      </div>
    </div>
  );
};

SectionTitle.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
  theme: PropTypes.oneOf(['dark', 'light']),
  animated: PropTypes.bool,
  subtitleIcon: PropTypes.node,
  className: PropTypes.string,
  titleAs: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
};

export default SectionTitle;