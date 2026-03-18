/* ============================================
   Button Component
   Premium button with multiple variants
   ============================================ */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  href = null,
  target = null,
  rel = null,
  type = 'button',
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  ariaLabel,
  ...props
}, ref) => {
  
  // Build class names
  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    disabled && 'btn--disabled',
    loading && 'btn--loading',
    icon && !children && 'btn--icon-only',
    className,
  ].filter(Boolean).join(' ');

  // Button content
  const content = (
    <>
      {/* Loading spinner */}
      {loading && (
        <span className="btn__spinner">
          <svg viewBox="0 0 24 24" className="btn__spinner-icon">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="31.4 31.4"
            />
          </svg>
        </span>
      )}

      {/* Icon (left) */}
      {icon && iconPosition === 'left' && !loading && (
        <span className="btn__icon btn__icon--left">{icon}</span>
      )}

      {/* Text */}
      {children && (
        <span className="btn__text">{children}</span>
      )}

      {/* Icon (right) */}
      {icon && iconPosition === 'right' && !loading && (
        <span className="btn__icon btn__icon--right">{icon}</span>
      )}

      {/* Ripple effect container */}
      <span className="btn__ripple"></span>

      {/* Shine effect */}
      <span className="btn__shine"></span>
    </>
  );

  // Render as link or button
  if (href && !disabled) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        className={classNames}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'outline',
    'ghost',
    'gold',
    'white',
    'dark',
    'glass',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  ariaLabel: PropTypes.string,
};

export default Button;