/* ============================================
   Services Component
   Premium services section with horizontal scroll
   ============================================ */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useBreakpoint } from '../../hooks';
import ServiceCard from './ServiceCard';
import { SectionTitle, RevealOnScroll } from '../common';
import './Services.css';

const Services = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { isMobile, isTablet } = useBreakpoint();

  // Services data
  const services = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M20 12a8 8 0 0 0-8-8v8h8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: 'Botulinum Toxin Training',
      description: 'Master the art of wrinkle reduction with comprehensive Botox training covering facial anatomy, injection techniques, and patient consultation.',
      features: ['Facial anatomy mapping', 'Advanced injection techniques', 'Patient assessment skills', 'Complication management'],
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '2 Days',
      level: 'Foundation',
      price: '£1,200',
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      title: 'Dermal Fillers Masterclass',
      description: 'Expert training in dermal filler applications for facial contouring, lip enhancement, and volume restoration with premium products.',
      features: ['Lip augmentation techniques', 'Cheek & chin sculpting', 'Tear trough correction', 'Product selection guide'],
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '3 Days',
      level: 'Advanced',
      price: '£1,800',
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      ),
      title: 'Skin Rejuvenation',
      description: 'Comprehensive training in advanced skin treatments including chemical peels, microneedling, and combination therapies.',
      features: ['Chemical peel protocols', 'Microneedling techniques', 'PRP therapy training', 'Skin analysis methods'],
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '2 Days',
      level: 'Intermediate',
      price: '£950',
    },
    {
      id: 4,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v18M5.5 8.5l13 7M5.5 15.5l13-7" />
        </svg>
      ),
      title: 'Lip Augmentation Specialist',
      description: 'Specialized course focusing exclusively on lip enhancement techniques, from natural enhancement to dramatic transformations.',
      features: ['Russian lip technique', 'Lip flip procedures', 'Border definition', 'Natural volume enhancement'],
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '1 Day',
      level: 'Specialist',
      price: '£750',
    },
    {
      id: 5,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: 'Advanced Techniques',
      description: 'Elite training for experienced practitioners covering complex procedures, corrections, and combination treatments.',
      features: ['Non-surgical rhinoplasty', 'PDO thread lifts', 'Jawline contouring', 'Advanced corrections'],
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '4 Days',
      level: 'Expert',
      price: '£2,500',
    },
    {
      id: 6,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      title: 'Business in Aesthetics',
      description: 'Complete business training for setting up and running a successful aesthetics practice, from compliance to marketing.',
      features: ['Clinic setup guidance', 'Marketing strategies', 'Legal compliance', 'Financial planning'],
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '1 Day',
      level: 'Business',
      price: '£500',
    },
  ];

  // Handle horizontal scroll on desktop
  useEffect(() => {
    if (isMobile || isTablet) return;

    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!section || !scrollContainer) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const scrollStart = sectionTop + windowHeight * 0.2;
      const scrollEnd = sectionTop + sectionHeight - windowHeight * 0.8;
      const scrollRange = scrollEnd - scrollStart;

      if (scrollStart < 0 && scrollEnd > 0) {
        const progress = Math.abs(scrollStart) / scrollRange;
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        setScrollProgress(clampedProgress);

        const newIndex = Math.floor(clampedProgress * (services.length - 1));
        setActiveIndex(Math.min(newIndex, services.length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, isTablet, services.length]);

  // Navigate to specific card
  const navigateToCard = useCallback((index) => {
    if (isMobile || isTablet) return;
    
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollRange = sectionHeight - windowHeight * 0.6;
    
    const targetProgress = index / (services.length - 1);
    const targetScroll = sectionTop - windowHeight * 0.2 + (scrollRange * targetProgress);

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, [isMobile, isTablet, services.length]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`services section ${!isMobile && !isTablet ? 'services--horizontal' : ''}`}
      aria-labelledby="services-title"
    >
      {/* Background */}
      <div className="services__bg">
        <div className="services__bg-gradient"></div>
        <div className="services__bg-glow"></div>
      </div>

      <div className="services__container">
        {/* Section header */}
        <div className="services__header">
          <RevealOnScroll animation="fadeUp">
            <SectionTitle
              subtitle="What We Offer"
              title="Our Premium |Training Services"
              description="Comprehensive aesthetic training programs designed to transform your career and elevate your expertise."
              alignment="center"
            />
          </RevealOnScroll>
        </div>

        {/* Cards container */}
        {isMobile || isTablet ? (
          <div className="services__grid">
            {services.map((service, index) => (
              <RevealOnScroll
                key={service.id}
                animation="fadeUp"
                delay={index * 100}
              >
                <ServiceCard service={service} index={index} />
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <div className="services__scroll-wrapper">
            <div
              ref={scrollContainerRef}
              className="services__scroll-container"
              style={{
                transform: `translateX(${-scrollProgress * (services.length - 1) * 420}px)`,
              }}
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  isActive={index === activeIndex}
                />
              ))}
            </div>

            {/* Progress indicator */}
            <div className="services__progress">
              <div className="services__progress-bar">
                <div
                  className="services__progress-fill"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <div className="services__progress-dots">
                {services.map((_, index) => (
                  <button
                    key={index}
                    className={`services__progress-dot ${index === activeIndex ? 'is-active' : ''}`}
                    onClick={() => navigateToCard(index)}
                    aria-label={`Go to service ${index + 1}`}
                  >
                    <span></span>
                  </button>
                ))}
              </div>
              <div className="services__progress-count">
                <span className="services__progress-current">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="services__progress-separator">/</span>
                <span className="services__progress-total">
                  {String(services.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="services__scroll-hint">
              <span>Scroll to explore</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        )}

        {/* CTA */}
        <RevealOnScroll animation="fadeUp" delay={300}>
          <div className="services__cta">
            <a
              href="https://envisageaesthetics.thinkific.com/"
              className="services__cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View All Courses</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Services;