/* ============================================
   About Component
   Premium about section with animations
   ============================================ */

import React, { useRef } from 'react';
import { useScrollAnimation, useParallax, useBreakpoint } from '../../hooks';
import AnimatedCounter from './AnimatedCounter';
import { RevealOnScroll } from '../common';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);
  const { isMobile } = useBreakpoint();

  // Parallax for image
  const { ref: imageParallaxRef, style: imageParallaxStyle } = useParallax({
    speed: 0.2,
    disabled: isMobile,
  });

  // Animation refs
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollAnimation({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Key features data
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: 'Internationally Accredited Programs',
      description: 'Recognized certifications accepted worldwide',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      title: 'Hands-On Practical Training',
      description: 'Real client experience in professional settings',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Industry Expert Instructors',
      description: 'Learn from leading aesthetic practitioners',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      title: 'Lifetime Career Support',
      description: 'Ongoing mentorship and job placement assistance',
    },
  ];

  // Stats data
  const stats = [
    { value: 500, suffix: '+', label: 'Students Trained' },
    { value: 15, suffix: '+', label: 'Expert Courses' },
    { value: 98, suffix: '%', label: 'Success Rate' },
    { value: 10, suffix: '+', label: 'Years Experience' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about section"
      aria-labelledby="about-title"
    >
      {/* Background elements */}
      <div className="about__bg">
        <div className="about__bg-gradient"></div>
        <div className="about__bg-pattern"></div>
      </div>

      <div className="about__container">
        {/* Main content grid */}
        <div className="about__grid">
          {/* Left side - Image */}
          <div className="about__image-wrapper">
            <RevealOnScroll animation="fadeRight" duration={800}>
              <div className="about__image-container">
                {/* Main image */}
                <div
                  ref={imageParallaxRef}
                  className="about__image"
                  style={imageParallaxStyle}
                >
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Professional aesthetics training session"
                    loading="lazy"
                  />
                  {/* Image overlay */}
                  <div className="about__image-overlay"></div>
                </div>

                {/* Decorative frame */}
                <div className="about__image-frame"></div>

                {/* Experience badge */}
                <div
                  ref={badgeRef}
                  className={`about__badge ${badgeVisible ? 'is-visible' : ''}`}
                >
                  <span className="about__badge-number">10+</span>
                  <span className="about__badge-text">Years of Excellence</span>
                </div>

                {/* Decorative elements */}
                <div className="about__image-dots"></div>
                <div className="about__image-accent"></div>
              </div>
            </RevealOnScroll>

            {/* Secondary image */}
            <RevealOnScroll animation="fadeUp" delay={200}>
              <div className="about__image-secondary">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Aesthetic treatment demonstration"
                  loading="lazy"
                />
              </div>
            </RevealOnScroll>
          </div>

          {/* Right side - Content */}
          <div className="about__content">
            {/* Section header */}
            <RevealOnScroll animation="fadeUp">
              <div className="about__header">
                <span className="about__subtitle">
                  <span className="about__subtitle-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </span>
                  Our Story
                </span>
                <h2 id="about-title" className="about__title">
                  Where <span className="text-gold-gradient">Excellence</span> Meets Aesthetics
                </h2>
                <div className="about__divider">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Description */}
            <RevealOnScroll animation="fadeUp" delay={100}>
              <div className="about__description">
                <p>
                  Welcome to <strong>Envisage Training Academy</strong>, where we transform passionate 
                  individuals into skilled aesthetic practitioners. Founded with a vision to elevate 
                  industry standards, we have become a leading institution for comprehensive aesthetic education.
                </p>
                <p>
                  Our academy combines cutting-edge techniques with time-tested practices, ensuring 
                  our students receive the most relevant and effective training available. With 
                  state-of-the-art facilities and expert instructors, we provide an immersive 
                  learning experience that prepares you for real-world success.
                </p>
              </div>
            </RevealOnScroll>

            {/* Features grid */}
            <div className="about__features">
              {features.map((feature, index) => (
                <RevealOnScroll
                  key={feature.title}
                  animation="fadeUp"
                  delay={150 + index * 100}
                >
                  <div className="about__feature">
                    <div className="about__feature-icon">
                      {feature.icon}
                    </div>
                    <div className="about__feature-content">
                      <h3 className="about__feature-title">{feature.title}</h3>
                      <p className="about__feature-text">{feature.description}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            {/* Founder signature */}
            <RevealOnScroll animation="fadeUp" delay={500}>
              <div className="about__signature">
                <div className="about__signature-image">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                    alt="Academy Founder"
                    loading="lazy"
                  />
                </div>
                <div className="about__signature-content">
                  <p className="about__signature-quote">
                    "Our mission is to empower the next generation of aesthetic professionals 
                    with knowledge, skills, and confidence."
                  </p>
                  <div className="about__signature-info">
                    <span className="about__signature-name">Dr. Sarah Mitchell</span>
                    <span className="about__signature-role">Founder & Lead Instructor</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* CTA Button */}
            <RevealOnScroll animation="fadeUp" delay={600}>
              <div className="about__cta">
                <a href="#courses" className="about__cta-button">
                  <span>Discover Our Courses</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Stats section */}
        <div className="about__stats">
          <div className="about__stats-container">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="about__stat"
                style={{ '--stat-index': index }}
              >
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2000}
                  delay={index * 200}
                />
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="about__corner about__corner--tl"></div>
      <div className="about__corner about__corner--br"></div>
    </section>
  );
};

export default About;