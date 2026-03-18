/* ============================================
   Testimonials Component
   Premium testimonials section with slider
   ============================================ */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useScrollAnimation, useBreakpoint } from '../../hooks';
import TestimonialCard from './TestimonialCard';
import { SectionTitle, RevealOnScroll } from '../common';
import './Testimonials.css';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  const { isMobile, isTablet } = useBreakpoint();

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Amanda Richardson',
      role: 'Aesthetic Practitioner',
      location: 'London, UK',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      course: 'Foundation Aesthetics Certification',
      quote: 'Envisage Training Academy transformed my career completely. The hands-on approach and expert guidance gave me the confidence to start my own successful aesthetics practice. The instructors are world-class and truly invested in your success.',
      date: '2024',
      featured: true,
    },
    {
      id: 2,
      name: 'Michael Torres',
      role: 'Clinical Director',
      location: 'Manchester, UK',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      course: 'Advanced Botulinum Toxin Training',
      quote: 'The advanced training exceeded all my expectations. Small class sizes meant personalized attention, and the real client practice was invaluable. I\'ve since trained with other providers, but none compare to the quality here.',
      date: '2024',
      featured: false,
    },
    {
      id: 3,
      name: 'Dr. Sophie Chen',
      role: 'Medical Aesthetician',
      location: 'Birmingham, UK',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      course: 'Dermal Fillers Masterclass',
      quote: 'From day one, I felt supported and challenged in equal measure. The curriculum is comprehensive, the facilities are state-of-the-art, and the networking opportunities with fellow professionals have been incredible.',
      date: '2023',
      featured: true,
    },
    {
      id: 4,
      name: 'Emma Williams',
      role: 'Nurse Practitioner',
      location: 'Leeds, UK',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      course: 'Lip Augmentation Specialist',
      quote: 'As a nurse transitioning into aesthetics, I needed thorough training. Envisage delivered beyond my expectations. The lip augmentation course was particularly excellent - I now feel confident offering this service.',
      date: '2024',
      featured: false,
    },
    {
      id: 5,
      name: 'Dr. James Patterson',
      role: 'Cosmetic Surgeon',
      location: 'Edinburgh, UK',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      course: 'Non-Surgical Rhinoplasty',
      quote: 'Even with my surgical background, the non-surgical techniques taught here opened new possibilities for my practice. The attention to detail and safety protocols are exemplary. Highly recommended for any medical professional.',
      date: '2023',
      featured: true,
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      role: 'Clinic Owner',
      location: 'Bristol, UK',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      course: 'Business in Aesthetics',
      quote: 'The business course gave me the roadmap I needed to launch my clinic. From marketing to compliance, everything was covered. Three months after completing the course, I opened my doors to a fully booked first week!',
      date: '2024',
      featured: false,
    },
  ];

  // Calculate slides to show based on screen size
  const slidesToShow = isMobile ? 1 : isTablet ? 2 : 3;
  const totalSlides = testimonials.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  // Navigation handlers
  const goToSlide = useCallback((index) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(index > activeIndex ? 'next' : 'prev');
    setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [activeIndex, maxIndex, isAnimating]);

  const goToNext = useCallback(() => {
    const nextIndex = activeIndex >= maxIndex ? 0 : activeIndex + 1;
    goToSlide(nextIndex);
  }, [activeIndex, maxIndex, goToSlide]);

  const goToPrev = useCallback(() => {
    const prevIndex = activeIndex <= 0 ? maxIndex : activeIndex - 1;
    goToSlide(prevIndex);
  }, [activeIndex, maxIndex, goToSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(goToNext, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, goToNext]);

  // Pause auto-play on hover
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  // Touch/swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    
    setIsAutoPlaying(true);
  }, [goToNext, goToPrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [goToNext, goToPrev]);

  // Calculate transform value
  const getTransformValue = () => {
    const slideWidth = 100 / slidesToShow;
    return `translateX(-${activeIndex * slideWidth}%)`;
  };

  // Stats data
  const stats = [
    { value: '500+', label: 'Happy Students' },
    { value: '4.9', label: 'Average Rating' },
    { value: '98%', label: 'Recommend Us' },
    { value: '100+', label: '5-Star Reviews' },
  ];

  return (
    <section
      id="testimonials"
      className="testimonials section"
      aria-labelledby="testimonials-title"
    >
      {/* Background elements */}
      <div className="testimonials__bg">
        <div className="testimonials__bg-gradient"></div>
        <div className="testimonials__bg-pattern"></div>
        <div className="testimonials__bg-glow testimonials__bg-glow--1"></div>
        <div className="testimonials__bg-glow testimonials__bg-glow--2"></div>
      </div>

      <div className="testimonials__container">
        {/* Section header */}
        <RevealOnScroll animation="fadeUp">
          <SectionTitle
            subtitle="Student Success Stories"
            title="What Our |Graduates Say"
            description="Hear from professionals who have transformed their careers through our comprehensive training programs."
            alignment="center"
          />
        </RevealOnScroll>

        {/* Testimonials slider */}
        <RevealOnScroll animation="fadeUp" delay={100}>
          <div
            ref={sliderRef}
            className="testimonials__slider"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
            role="region"
            aria-label="Testimonials carousel"
          >
            {/* Large quote decoration */}
            <div className="testimonials__quote-decor">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z"/>
              </svg>
            </div>

            {/* Slider track */}
            <div className="testimonials__track-wrapper">
              <div
                className={`testimonials__track testimonials__track--${direction}`}
                style={{ transform: getTransformValue() }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="testimonials__slide"
                    style={{ width: `${100 / slidesToShow}%` }}
                  >
                    <TestimonialCard
                      testimonial={testimonial}
                      isActive={index >= activeIndex && index < activeIndex + slidesToShow}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              className="testimonials__nav testimonials__nav--prev"
              onClick={goToPrev}
              aria-label="Previous testimonial"
              disabled={isAnimating}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="testimonials__nav testimonials__nav--next"
              onClick={goToNext}
              aria-label="Next testimonial"
              disabled={isAnimating}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Pagination dots */}
            <div className="testimonials__pagination" role="tablist">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  className={`testimonials__dot ${index === activeIndex ? 'is-active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-selected={index === activeIndex}
                  role="tab"
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="testimonials__progress">
              <div
                className="testimonials__progress-bar"
                style={{
                  width: `${((activeIndex + 1) / (maxIndex + 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </RevealOnScroll>

        {/* Stats section */}
        <RevealOnScroll animation="fadeUp" delay={200}>
          <div className="testimonials__stats">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="testimonials__stat"
                style={{ '--stat-delay': `${index * 100}ms` }}
              >
                <span className="testimonials__stat-value">{stat.value}</span>
                <span className="testimonials__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Trust badges */}
        <RevealOnScroll animation="fadeUp" delay={300}>
          <div className="testimonials__trust">
            <span className="testimonials__trust-text">Trusted & Verified Reviews</span>
            <div className="testimonials__trust-badges">
              <div className="testimonials__trust-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
                <span>Verified</span>
              </div>
              <div className="testimonials__trust-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span>Top Rated</span>
              </div>
              <div className="testimonials__trust-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Accredited</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Decorative elements */}
      <div className="testimonials__decor testimonials__decor--1"></div>
      <div className="testimonials__decor testimonials__decor--2"></div>
    </section>
  );
};

export default Testimonials;