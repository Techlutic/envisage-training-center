/* ============================================
   CourseFilter Component
   Animated filter tabs for courses
   ============================================ */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './CourseFilter.css';

const CourseFilter = ({ filters, activeFilter, onFilterChange }) => {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const buttonsRef = useRef({});

  // Update indicator position
  const updateIndicator = useCallback(() => {
    const activeButton = buttonsRef.current[activeFilter];
    const container = containerRef.current;

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setIndicatorStyle({
        width: buttonRect.width,
        left: buttonRect.left - containerRect.left,
      });
    }
  }, [activeFilter]);

  // Update indicator on active filter change
  useEffect(() => {
    updateIndicator();
  }, [activeFilter, updateIndicator]);

  // Update indicator on resize
  useEffect(() => {
    const handleResize = () => {
      updateIndicator();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateIndicator]);

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    const filterIds = filters.map(f => f.id);
    let newIndex = index;

    switch (e.key) {
      case 'ArrowLeft':
        newIndex = index > 0 ? index - 1 : filters.length - 1;
        break;
      case 'ArrowRight':
        newIndex = index < filters.length - 1 ? index + 1 : 0;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = filters.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    onFilterChange(filterIds[newIndex]);
    buttonsRef.current[filterIds[newIndex]]?.focus();
  };

  return (
    <div className="course-filter" role="tablist" aria-label="Filter courses">
      <div ref={containerRef} className="course-filter__container">
        {/* Active indicator */}
        <div
          className="course-filter__indicator"
          style={{
            width: indicatorStyle.width || 0,
            transform: `translateX(${indicatorStyle.left || 0}px)`,
          }}
        >
          <div className="course-filter__indicator-glow"></div>
        </div>

        {/* Filter buttons */}
        {filters.map((filter, index) => (
          <button
            key={filter.id}
            ref={(el) => (buttonsRef.current[filter.id] = el)}
            role="tab"
            aria-selected={activeFilter === filter.id}
            aria-controls={`courses-panel-${filter.id}`}
            tabIndex={activeFilter === filter.id ? 0 : -1}
            className={`course-filter__button ${
              activeFilter === filter.id ? 'is-active' : ''
            }`}
            onClick={() => onFilterChange(filter.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <span className="course-filter__button-text">{filter.label}</span>
            <span className="course-filter__button-count">{filter.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

CourseFilter.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default CourseFilter;