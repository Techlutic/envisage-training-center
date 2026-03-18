/* ============================================
   AccordionItem Component
   Individual accordion item with animations
   ============================================ */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const AccordionItem = ({ question, answer, isOpen, onClick, index }) => {
  const contentRef = useRef(null);

  // Set height for open/closed state
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.maxHeight = '0px';
      }
    }
  }, [isOpen]);

  return (
    <div className="accordion-item">
      {/* Header */}
      <button
        className={`accordion-item__header ${isOpen ? 'is-open' : ''}`}
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${index}`}
        role="tab"
        id={`accordion-header-${index}`}
      >
        <h3 className="accordion-item__question">{question}</h3>
        <span className="accordion-item__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        id={`accordion-content-${index}`}
        className="accordion-item__content"
        role="tabpanel"
        aria-labelledby={`accordion-header-${index}`}
        hidden={!isOpen}
      >
        <div className="accordion-item__answer">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default AccordionItem;