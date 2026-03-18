/* ============================================
   Achievements Component
   Premium achievements section with counters
   ============================================ */

import React, { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../../hooks';
import { SectionTitle, RevealOnScroll } from '../common';
import './Achievements.css';

const Achievements = () => {
  const [counters, setCounters] = useState({
    students: 0,
    courses: 0,
    years: 0,
    reviews: 0,
    countries: 0,
    awards: 0,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);

  // Scroll animation hook
  const { ref: counterRef, isVisible: countersVisible } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Counters data
  const counterData = [
    {
      id: 'students',
      value: 500,
      suffix: '+',
      label: 'Certified Students',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'courses',
      value: 15,
      suffix: '+',
      label: 'Expert Courses',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      id: 'years',
      value: 10,
      suffix: '+',
      label: 'Years of Excellence',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: 'reviews',
      value: 98,
      suffix: '%',
      label: 'Positive Reviews',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 15l-3.88 3.88c-.4.4-.4 1.03 0 1.42.4.4 1.03.4 1.42 0L12 16.41l3.47 3.47c.4.4 1.03.4 1.42 0 .4-.4.4-1.03 0-1.42L13 15" />
          <path d="M12 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
        </svg>
      ),
    },
    {
      id: 'countries',
      value: 20,
      suffix: '+',
      label: 'Global Reach',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      id: 'awards',
      value: 5,
      suffix: '+',
      label: 'Industry Awards',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
    },
  ];

  // Awards data
  const awards = [
    {
      id: 1,
      title: 'Best Aesthetics Training Academy',
      year: '2023',
      organization: 'Aesthetic Industry Awards',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      title: 'Excellence in Education',
      year: '2022',
      organization: 'UK Healthcare Awards',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 3,
      title: 'Top CPD Provider',
      year: '2021',
      organization: 'CPD Certification Service',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 4,
      title: 'Innovative Training Program',
      year: '2020',
      organization: 'Cosmetic Surgery Times',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 5,
      title: 'Student Choice Award',
      year: '2019',
      organization: 'National Student Survey',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
  ];

  // Certification badges
  const certifications = [
    {
      id: 1,
      name: 'CPD Certified',
      image: 'https://via.placeholder.com/120x80',
    },
    {
      id: 2,
      name: 'NMC Approved',
      image: 'https://via.placeholder.com/120x80',
    },
    {
      id: 3,
      name: 'GMC Recognized',
      image: 'https://via.placeholder.com/120x80',
    },
    {
      id: 4,
      name: 'UKCPD Member',
      image: 'https://via.placeholder.com/120x80',
    },
    {
      id: 5,
      name: 'ABQ Accredited',
      image: 'https://via.placeholder.com/120x80',
    },
  ];

  // Animate counters
  useEffect(() => {
    if (countersVisible && !isAnimating) {
      setIsAnimating(true);
      
      counterData.forEach((item) => {
        const target = item.value;
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const interval = setInterval(() => {
          current += step;
          
          if (current >= target) {
            clearInterval(interval);
            setCounters(prev => ({ ...prev, [item.id]: target }));
          } else {
            setCounters(prev => ({ ...prev, [item.id]: Math.floor(current) }));
          }
        }, 16);
      });
    }
  }, [countersVisible, isAnimating, counterData]);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="achievements section"
      aria-labelledby="achievements-title"
    >
      {/* Background elements */}
      <div className="achievements__bg">
        <div className="achievements__bg-gradient"></div>
        <div className="achievements__bg-pattern"></div>
        <div className="achievements__bg-glow achievements__bg-glow--1"></div>
        <div className="achievements__bg-glow achievements__bg-glow--2"></div>
      </div>

      <div className="achievements__container">
        {/* Section header */}
        <RevealOnScroll animation="fadeUp">
          <SectionTitle
            subtitle="Our Milestones"
            title="Achievements & |Recognition"
            description="We're proud of our journey and the recognition we've received for our commitment to excellence in aesthetic education."
            alignment="center"
          />
        </RevealOnScroll>

        {/* Counters section */}
        <RevealOnScroll animation="fadeUp" delay={100}>
          <div
            ref={counterRef}
            className="achievements__counters"
          >
            {counterData.map((item) => (
              <div
                key={item.id}
                className="achievements__counter"
                style={{ '--counter-delay': `${counterData.indexOf(item) * 100}ms` }}
              >
                <div className="achievements__counter-icon">
                  {item.icon}
                </div>
                <div className="achievements__counter-number">
                  <span className="achievements__counter-value">{counters[item.id]}</span>
                  <span className="achievements__counter-suffix">{item.suffix}</span>
                </div>
                <span className="achievements__counter-label">{item.label}</span>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Awards section */}
        <RevealOnScroll animation="fadeUp" delay={200}>
          <div className="achievements__awards">
            <h3 className="achievements__awards-title">Industry Awards</h3>
            <div className="achievements__awards-grid">
              {awards.map((award, index) => (
                <RevealOnScroll
                  key={award.id}
                  animation="fadeUp"
                  delay={index * 100}
                >
                  <div className="achievements__award-card">
                    <div className="achievements__award-image">
                      <img
                        src={award.image}
                        alt={award.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="achievements__award-content">
                      <h4 className="achievements__award-name">{award.title}</h4>
                      <div className="achievements__award-details">
                        <span className="achievements__award-year">{award.year}</span>
                        <span className="achievements__award-organization">{award.organization}</span>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Certifications section */}
        <RevealOnScroll animation="fadeUp" delay={300}>
          <div className="achievements__certifications">
            <h3 className="achievements__certifications-title">Accreditation & Certifications</h3>
            <div className="achievements__certifications-grid">
              {certifications.map((cert, index) => (
                <RevealOnScroll
                  key={cert.id}
                  animation="scaleUp"
                  delay={index * 50}
                >
                  <div className="achievements__certification-card">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      loading="lazy"
                    />
                    <span className="achievements__certification-name">{cert.name}</span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Stats banner */}
        <RevealOnScroll animation="fadeUp" delay={400}>
          <div className="achievements__banner">
            <div className="achievements__banner-content">
              <h3 className="achievements__banner-title">Join Our Global Community</h3>
              <p className="achievements__banner-text">
                Become part of a network of over 500 certified aesthetic professionals worldwide
              </p>
            </div>
            <div className="achievements__banner-stats">
              <div className="achievements__banner-stat">
                <span className="achievements__banner-value">500+</span>
                <span className="achievements__banner-label">Graduates</span>
              </div>
              <div className="achievements__banner-stat">
                <span className="achievements__banner-value">98%</span>
                <span className="achievements__banner-label">Success Rate</span>
              </div>
              <div className="achievements__banner-stat">
                <span className="achievements__banner-value">10+</span>
                <span className="achievements__banner-label">Years of Experience</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Decorative elements */}
      <div className="achievements__decor achievements__decor--1"></div>
      <div className="achievements__decor achievements__decor--2"></div>
    </section>
  );
};

export default Achievements;