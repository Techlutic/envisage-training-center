/* ============================================
   Preloader Component
   Premium loading screen with animations
   ============================================ */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Preloader.css';

const Preloader = ({ isLoading, minDuration = 2000 }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading');
  const progressRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Simulate loading progress
  useEffect(() => {
    if (!isLoading && progress >= 100) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        // If still loading, cap at 90%
        if (isLoading && prev >= 90) return 90;
        
        // Otherwise, complete to 100%
        if (!isLoading && prev < 100) {
          const remaining = 100 - prev;
          return prev + Math.max(remaining * 0.1, 1);
        }
        
        // Normal progress
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, isLoading ? 90 : 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isLoading, progress]);

  // Loading text animation
  useEffect(() => {
    const texts = ['Loading', 'Loading.', 'Loading..', 'Loading...'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Handle exit animation
  useEffect(() => {
    if (!isLoading && progress >= 100) {
      const elapsed = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setIsExiting(true);
        
        // Remove from DOM after animation
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }, remainingTime);
    }
  }, [isLoading, progress, minDuration]);

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  if (!isVisible) return null;

  return (
    <div className={`preloader ${isExiting ? 'is-exiting' : ''}`}>
      {/* Background layers */}
      <div className="preloader__bg">
        <div className="preloader__bg-gradient"></div>
        <div className="preloader__bg-noise"></div>
      </div>

      {/* Floating particles */}
      <div className="preloader__particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="preloader__particle"
            style={{
              '--x': `${particle.x}%`,
              '--y': `${particle.y}%`,
              '--size': `${particle.size}px`,
              '--duration': `${particle.duration}s`,
              '--delay': `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="preloader__content">
        {/* Logo */}
        <div className="preloader__logo">
          {/* Outer ring */}
          <svg
            className="preloader__logo-ring"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="preloader__logo-ring-bg"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(201, 168, 108, 0.1)"
              strokeWidth="1"
            />
            <circle
              className="preloader__logo-ring-progress"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A86C" />
                <stop offset="50%" stopColor="#E8D5B7" />
                <stop offset="100%" stopColor="#C9A86C" />
              </linearGradient>
            </defs>
          </svg>

          {/* Logo text */}
          <div className="preloader__logo-text">
            <span className="preloader__logo-letter">E</span>
          </div>

          {/* Decorative dots */}
          <div className="preloader__logo-dots">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Brand name */}
        <div className="preloader__brand">
          <span className="preloader__brand-text">ENVISAGE</span>
          <span className="preloader__brand-sub">Training Academy</span>
        </div>

        {/* Progress section */}
        <div className="preloader__progress">
          {/* Progress bar */}
          <div className="preloader__progress-bar">
            <div
              ref={progressRef}
              className="preloader__progress-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="preloader__progress-glow"></div>
            </div>
          </div>

          {/* Progress info */}
          <div className="preloader__progress-info">
            <span className="preloader__progress-text">{loadingText}</span>
            <span className="preloader__progress-percent">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Exit reveal layers */}
      <div className="preloader__reveal">
        <div className="preloader__reveal-layer preloader__reveal-layer--1"></div>
        <div className="preloader__reveal-layer preloader__reveal-layer--2"></div>
      </div>

      {/* Corner accents */}
      <div className="preloader__corner preloader__corner--tl"></div>
      <div className="preloader__corner preloader__corner--tr"></div>
      <div className="preloader__corner preloader__corner--bl"></div>
      <div className="preloader__corner preloader__corner--br"></div>
    </div>
  );
};

Preloader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  minDuration: PropTypes.number,
};

export default Preloader;