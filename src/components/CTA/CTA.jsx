/* ============================================
   CTA Component
   Premium call to action section
   ============================================ */

import React, { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../../hooks';
import { SectionTitle, RevealOnScroll } from '../common';
import './CTA.css';

const CTA = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="cta section"
      aria-labelledby="cta-title"
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      }}
    >
      {/* Background elements */}
      <div className="cta__bg">
        <div className="cta__bg-gradient"></div>
        <div className="cta__bg-pattern"></div>
        <div className="cta__bg-glow"></div>
        <div className="cta__bg-shape cta__bg-shape--1"></div>
        <div className="cta__bg-shape cta__bg-shape--2"></div>
        <div className="cta__bg-shape cta__bg-shape--3"></div>
      </div>

      <div className="cta__container">
        {/* Section header */}
        <RevealOnScroll animation="fadeUp">
          <SectionTitle
            subtitle="Start Your Journey"
            title="Transform Your Career |Today"
            description="Join our community of successful aesthetic practitioners and take the first step towards a rewarding career in aesthetics."
            alignment="center"
          />
        </RevealOnScroll>

        {/* CTA cards */}
        <div className="cta__cards">
          <RevealOnScroll animation="fadeUp" delay={100}>
            <div className="cta__card cta__card--primary">
              <div className="cta__card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="cta__card-title">Book a Free Consultation</h3>
              <p className="cta__card-description">
                Speak to our admissions team to discuss your goals and find the perfect course for you.
              </p>
              <a
                href="#contact"
                className="cta__card-button"
              >
                <span>Get Started</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll animation="fadeUp" delay={200}>
            <div className="cta__card cta__card--secondary">
              <div className="cta__card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14,2 14,8 20,8" />
                </svg>
              </div>
              <h3 className="cta__card-title">Download Course Brochure</h3>
              <p className="cta__card-description">
                Get detailed information about our courses, curriculum, fees, and career opportunities.
              </p>
              <a
                href="#"
                className="cta__card-button"
              >
                <span>Download Now</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll animation="fadeUp" delay={300}>
            <div className="cta__card cta__card--tertiary">
              <div className="cta__card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="cta__card-title">Attend an Open Day</h3>
              <p className="cta__card-description">
                Visit our state-of-the-art facilities, meet our instructors, and experience our training environment.
              </p>
              <a
                href="#"
                className="cta__card-button"
              >
                <span>Register Now</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Stats banner */}
        <RevealOnScroll animation="fadeUp" delay={400}>
          <div className="cta__stats">
            <div className="cta__stat">
              <span className="cta__stat-value">500+</span>
              <span className="cta__stat-label">Successful Graduates</span>
            </div>
            <div className="cta__stat">
              <span className="cta__stat-value">98%</span>
              <span className="cta__stat-label">Satisfaction Rate</span>
            </div>
            <div className="cta__stat">
              <span className="cta__stat-value">10+</span>
              <span className="cta__stat-label">Years of Experience</span>
            </div>
            <div className="cta__stat">
              <span className="cta__stat-value">15+</span>
              <span className="cta__stat-label">Industry-Accredited Courses</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Trust badges */}
        <RevealOnScroll animation="fadeUp" delay={500}>
          <div className="cta__trust">
            <span className="cta__trust-text">Trusted by Professionals</span>
            <div className="cta__trust-badges">
              <div className="cta__trust-badge">
                <img
                  src="https://via.placeholder.com/120x80"
                  alt="CPD Certified"
                  loading="lazy"
                />
              </div>
              <div className="cta__trust-badge">
                <img
                  src="https://via.placeholder.com/120x80"
                  alt="NMC Approved"
                  loading="lazy"
                />
              </div>
              <div className="cta__trust-badge">
                <img
                  src="https://via.placeholder.com/120x80"
                  alt="GMC Recognized"
                  loading="lazy"
                />
              </div>
              <div className="cta__trust-badge">
                <img
                  src="https://via.placeholder.com/120x80"
                  alt="ABQ Accredited"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Decorative elements */}
      <div className="cta__decor cta__decor--1"></div>
      <div className="cta__decor cta__decor--2"></div>
    </section>
  );
};

export default CTA;