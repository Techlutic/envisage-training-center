/* ============================================
   Hero Component
   Premium hero section with animations
   ============================================ */

import React, { useState, useEffect, useRef } from 'react';
import { useScrollAnimation, useBreakpoint } from '../../hooks';
import ParticleBackground from './ParticleBackground';
import FloatingElements from './FloatingElements';
import './Hero.css';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);
  const { isMobile } = useBreakpoint();

  // Animation refs
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Set loaded state after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Stats data
  const stats = [
    { number: '500+', label: 'Certified Students', suffix: '' },
    { number: '15+', label: 'Expert Courses', suffix: '' },
    { number: '98', label: 'Success Rate', suffix: '%' },
    { number: '10+', label: 'Years Excellence', suffix: '' },
  ];

  // Calculate parallax offset
  const getParallaxStyle = (intensity = 1) => {
    if (isMobile) return {};
    const x = (mousePosition.x - 0.5) * 30 * intensity;
    const y = (mousePosition.y - 0.5) * 30 * intensity;
    return {
      transform: `translate3d(${x}px, ${y}px, 0)`,
    };
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`hero ${isLoaded ? 'is-loaded' : ''}`}
      aria-label="Welcome to Envisage Training Academy"
    >
      {/* Background layers */}
      <div className="hero__bg">
        {/* Main background image */}
        <div 
          className="hero__bg-image"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            ...getParallaxStyle(0.3),
          }}
        ></div>

        {/* Gradient overlays */}
        <div className="hero__bg-gradient hero__bg-gradient--radial"></div>
        <div className="hero__bg-gradient hero__bg-gradient--bottom"></div>
        <div className="hero__bg-gradient hero__bg-gradient--top"></div>

        {/* Noise texture */}
        <div className="hero__bg-noise"></div>

        {/* Particle background */}
        <ParticleBackground />

        {/* Floating elements */}
        <FloatingElements mousePosition={mousePosition} />
      </div>

      {/* Main content */}
      <div className="hero__container">
        <div className="hero__content">
          {/* Pre-heading */}
          <div className={`hero__preheading ${isLoaded ? 'is-visible' : ''}`}>
            <span className="hero__preheading-line"></span>
            <span className="hero__preheading-text">Welcome to</span>
            <span className="hero__preheading-line"></span>
          </div>

          {/* Main heading */}
          <h1 ref={titleRef} className={`hero__title ${isLoaded ? 'is-visible' : ''}`}>
            <span className="hero__title-line">
              <span className="hero__title-word">Envisage</span>
            </span>
            <span className="hero__title-line">
              <span className="hero__title-word hero__title-word--accent">Training Academy</span>
            </span>
          </h1>

          {/* Tagline */}
          <p className={`hero__tagline ${isLoaded ? 'is-visible' : ''}`}>
            <span className="hero__tagline-text">
              Master the Art of Aesthetic Excellence
            </span>
          </p>

          {/* Description */}
          <p className={`hero__description ${isLoaded ? 'is-visible' : ''}`}>
            Transform your career with internationally accredited aesthetic training.
            Learn from industry experts and join hundreds of successful practitioners.
          </p>

          {/* CTA buttons */}
          <div className={`hero__cta ${isLoaded ? 'is-visible' : ''}`}>
            <a
              href="https://envisageaesthetics.thinkific.com/"
              className="hero__cta-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hero__cta-text">Start Your Journey</span>
              <span className="hero__cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </a>

            <a href="#courses" className="hero__cta-secondary">
              <span className="hero__cta-text">View Courses</span>
            </a>
          </div>

          {/* Social proof */}
          <div className={`hero__social-proof ${isLoaded ? 'is-visible' : ''}`}>
            <div className="hero__avatars">
              <div className="hero__avatar">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="Student"
                  loading="lazy"
                />
              </div>
              <div className="hero__avatar">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  alt="Student"
                  loading="lazy"
                />
              </div>
              <div className="hero__avatar">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  alt="Student"
                  loading="lazy"
                />
              </div>
              <div className="hero__avatar hero__avatar--count">
                <span>+500</span>
              </div>
            </div>
            <p className="hero__social-text">
              Trusted by <strong>500+ professionals</strong> worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className={`hero__stats ${isLoaded ? 'is-visible' : ''}`}>
        <div className="hero__stats-container">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="hero__stat"
              style={{ '--stat-index': index }}
            >
              <span className="hero__stat-number">
                {stat.number}
                <span className="hero__stat-suffix">{stat.suffix}</span>
              </span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`hero__scroll ${isLoaded ? 'is-visible' : ''}`}>
        <span className="hero__scroll-text">Scroll to explore</span>
        <div className="hero__scroll-indicator">
          <div className="hero__scroll-line">
            <div className="hero__scroll-dot"></div>
          </div>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="hero__corner hero__corner--tl"></div>
      <div className="hero__corner hero__corner--tr"></div>
      <div className="hero__corner hero__corner--bl"></div>
      <div className="hero__corner hero__corner--br"></div>
    </section>
  );
};

export default Hero;