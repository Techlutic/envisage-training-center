/* ============================================
   WhyChooseUs Component
   Premium features section with dark theme
   ============================================ */

import React, { useRef, useState, useEffect } from 'react';
import { useScrollAnimation, useBreakpoint, useMousePosition } from '../../hooks';
import FeatureCard from './FeatureCard';
import { SectionTitle, RevealOnScroll } from '../common';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const { isMobile } = useBreakpoint();

  // Track mouse for gradient effect
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  // Features data
  const features = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      ),
      title: 'Certified Excellence',
      description: 'Internationally recognized CPD accredited certifications that open doors to opportunities worldwide. Our credentials are accepted by insurance providers and regulatory bodies.',
      stats: { value: '100%', label: 'Accredited' },
      features: ['CPD Accredited', 'Insurance Approved', 'Global Recognition'],
      color: '#C9A86C',
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Expert Mentorship',
      description: 'Learn directly from industry-leading practitioners with decades of combined experience. Our instructors are actively practicing professionals at the forefront of aesthetic medicine.',
      stats: { value: '15+', label: 'Years Experience' },
      features: ['Active Practitioners', '1-on-1 Guidance', 'Industry Leaders'],
      color: '#E8D5B7',
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 18v-6" />
          <path d="M9 15l3 3 3-3" />
        </svg>
      ),
      title: 'Hands-On Training',
      description: 'Real client experience in our professional clinical settings. Practice injection techniques, master consultation skills, and build confidence with live model training.',
      stats: { value: '80%', label: 'Practical Focus' },
      features: ['Live Models', 'Clinical Setting', 'Real Procedures'],
      color: '#D4A5A5',
    },
    {
      id: 4,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      title: 'Career Launch',
      description: 'Complete business setup guidance and placement assistance to kickstart your aesthetics career. From compliance to marketing, we support your journey to success.',
      stats: { value: '500+', label: 'Careers Launched' },
      features: ['Business Setup', 'Job Placement', 'Ongoing Support'],
      color: '#9CAF88',
    },
  ];

  // Trust indicators
  const trustIndicators = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
      label: 'Fully Insured',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      label: 'Secure Payments',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      label: 'Satisfaction Guaranteed',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: 'Flexible Scheduling',
    },
  ];

  // Gradient style based on mouse position
  const gradientStyle = !isMobile ? {
    '--mouse-x': `${mousePosition.x * 100}%`,
    '--mouse-y': `${mousePosition.y * 100}%`,
  } : {};

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="why-choose-us section"
      style={gradientStyle}
      aria-labelledby="why-title"
    >
      {/* Background */}
      <div className="why-choose-us__bg">
        <div className="why-choose-us__bg-gradient"></div>
        <div className="why-choose-us__bg-pattern"></div>
        <div className="why-choose-us__bg-glow"></div>
        <div className="why-choose-us__bg-noise"></div>
      </div>

      {/* Floating particles */}
      <div className="why-choose-us__particles">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="why-choose-us__particle"
            style={{
              '--delay': `${Math.random() * 5}s`,
              '--duration': `${Math.random() * 10 + 10}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--size': `${Math.random() * 4 + 2}px`,
            }}
          />
        ))}
      </div>

      <div className="why-choose-us__container">
        {/* Section header */}
        <RevealOnScroll animation="fadeUp">
          <SectionTitle
            subtitle="Why Envisage"
            title="Why Choose |Us"
            description="Join hundreds of successful practitioners who have transformed their careers with our industry-leading training programs."
            alignment="center"
            theme="dark"
          />
        </RevealOnScroll>

        {/* Features grid */}
        <div className="why-choose-us__grid">
          {features.map((feature, index) => (
            <RevealOnScroll
              key={feature.id}
              animation="fadeUp"
              delay={100 + index * 100}
            >
              <FeatureCard feature={feature} index={index} />
            </RevealOnScroll>
          ))}
        </div>

        {/* Trust indicators */}
        <RevealOnScroll animation="fadeUp" delay={500}>
          <div className="why-choose-us__trust">
            <div className="why-choose-us__trust-container">
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="why-choose-us__trust-item"
                  style={{ '--item-index': index }}
                >
                  <div className="why-choose-us__trust-icon">
                    {indicator.icon}
                  </div>
                  <span className="why-choose-us__trust-label">
                    {indicator.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Bottom CTA */}
        <RevealOnScroll animation="fadeUp" delay={600}>
          <div className="why-choose-us__cta">
            <div className="why-choose-us__cta-content">
              <h3>Ready to Elevate Your Career?</h3>
              <p>Join our next intake and become a certified aesthetic practitioner.</p>
            </div>
            <div className="why-choose-us__cta-actions">
              <a
                href="https://envisageaesthetics.thinkific.com/"
                className="why-choose-us__cta-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Explore Courses</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#contact" className="why-choose-us__cta-secondary">
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Decorative corners */}
      <div className="why-choose-us__corner why-choose-us__corner--tl"></div>
      <div className="why-choose-us__corner why-choose-us__corner--tr"></div>
      <div className="why-choose-us__corner why-choose-us__corner--bl"></div>
      <div className="why-choose-us__corner why-choose-us__corner--br"></div>
    </section>
  );
};

export default WhyChooseUs;