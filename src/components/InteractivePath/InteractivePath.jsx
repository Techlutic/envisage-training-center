/* ============================================
   InteractivePath Component
   Interactive learning journey timeline
   ============================================ */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useScrollAnimation, useBreakpoint } from '../../hooks';
import { SectionTitle, RevealOnScroll } from '../common';
import './InteractivePath.css';

const InteractivePath = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const stepRefs = useRef([]);
  const { isMobile } = useBreakpoint();

  // Learning journey steps
  const steps = [
    {
      id: 1,
      number: '01',
      title: 'Initial Consultation',
      description: 'Begin your journey with a personalized consultation. We assess your background, goals, and recommend the perfect training pathway for your career aspirations.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      details: [
        'Career goals assessment',
        'Experience evaluation',
        'Course recommendations',
        'Flexible scheduling options',
      ],
      duration: '30 min',
      highlight: 'Free consultation',
    },
    {
      id: 2,
      number: '02',
      title: 'Choose Your Path',
      description: 'Select from our range of accredited courses. Whether you\'re starting fresh or advancing your skills, we have the perfect program for you.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        </svg>
      ),
      details: [
        'Foundation courses',
        'Advanced techniques',
        'Specialist certifications',
        'Business training',
      ],
      duration: 'Varies',
      highlight: 'Flexible options',
    },
    {
      id: 3,
      number: '03',
      title: 'Theory Training',
      description: 'Master the essential theoretical knowledge through our comprehensive curriculum covering anatomy, product science, and safety protocols.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="12" y1="6" x2="16" y2="6" />
          <line x1="12" y1="10" x2="16" y2="10" />
          <line x1="8" y1="6" x2="8" y2="6" />
          <line x1="8" y1="10" x2="8" y2="10" />
        </svg>
      ),
      details: [
        'Facial anatomy & physiology',
        'Product knowledge',
        'Patient consultation',
        'Safety & hygiene protocols',
      ],
      duration: '1-2 days',
      highlight: 'Expert-led',
    },
    {
      id: 4,
      number: '04',
      title: 'Practical Sessions',
      description: 'Apply your knowledge with hands-on training on real clients. Practice injection techniques under expert supervision in our professional clinic.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 18v-6" />
          <path d="M9 15h6" />
        </svg>
      ),
      details: [
        'Live model practice',
        '1-on-1 supervision',
        'Technique refinement',
        'Confidence building',
      ],
      duration: '1-3 days',
      highlight: 'Hands-on',
    },
    {
      id: 5,
      number: '05',
      title: 'Assessment & Exam',
      description: 'Demonstrate your competency through practical assessments and written examinations. Our rigorous standards ensure you\'re fully prepared.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
      details: [
        'Practical demonstration',
        'Written assessment',
        'Portfolio review',
        'Competency verification',
      ],
      duration: '1 day',
      highlight: 'Accredited',
    },
    {
      id: 6,
      number: '06',
      title: 'Certification Award',
      description: 'Receive your internationally recognized certification. Join our network of qualified practitioners and unlock new career opportunities.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      ),
      details: [
        'CPD accredited certificate',
        'Digital credentials',
        'Alumni network access',
        'Professional recognition',
      ],
      duration: 'Immediate',
      highlight: 'Certified',
    },
    {
      id: 7,
      number: '07',
      title: 'Career Support',
      description: 'Your journey doesn\'t end with certification. Enjoy ongoing mentorship, business setup guidance, and continued professional development.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      details: [
        'Ongoing mentorship',
        'Job placement assistance',
        'Business setup support',
        'Refresher courses',
      ],
      duration: 'Lifetime',
      highlight: 'Ongoing',
    },
  ];

  // Track scroll progress for line animation
  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    if (!section || !timeline) return;

    const handleScroll = () => {
      const sectionRect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress within section
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - sectionTop) / (sectionHeight + windowHeight * 0.5)
      ));

      setLineProgress(scrollProgress);

      // Update active step based on scroll
      stepRefs.current.forEach((ref, index) => {
        if (ref) {
          const stepRect = ref.getBoundingClientRect();
          const stepCenter = stepRect.top + stepRect.height / 2;
          
          if (stepCenter < windowHeight * 0.6) {
            setActiveStep(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle step click
  const handleStepClick = useCallback((index) => {
    setActiveStep(index);
    
    const stepRef = stepRefs.current[index];
    if (stepRef) {
      const navHeight = 80;
      const elementPosition = stepRef.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="learning-path"
      className="interactive-path section"
      aria-labelledby="path-title"
    >
      {/* Background */}
      <div className="interactive-path__bg">
        <div className="interactive-path__bg-gradient"></div>
        <div className="interactive-path__bg-lines"></div>
      </div>

      <div className="interactive-path__container">
        {/* Section header */}
        <RevealOnScroll animation="fadeUp">
          <SectionTitle
            subtitle="Your Journey"
            title="The Learning |Path"
            description="From consultation to certification, discover the structured pathway that transforms beginners into confident aesthetic practitioners."
            alignment="center"
          />
        </RevealOnScroll>

        {/* Timeline */}
        <div ref={timelineRef} className="interactive-path__timeline">
          {/* Animated line */}
          <div className="interactive-path__line">
            <div
              className="interactive-path__line-progress"
              style={{ height: `${lineProgress * 100}%` }}
            ></div>
          </div>

          {/* Steps */}
          <div className="interactive-path__steps">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (stepRefs.current[index] = el)}
                className={`interactive-path__step ${
                  index === activeStep ? 'is-active' : ''
                } ${index < activeStep ? 'is-completed' : ''}`}
                onClick={() => handleStepClick(index)}
              >
                {/* Step marker */}
                <div className="interactive-path__marker">
                  <div className="interactive-path__marker-outer">
                    <div className="interactive-path__marker-inner">
                      <span className="interactive-path__marker-number">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="interactive-path__connector"></div>
                  )}
                </div>

                {/* Step content */}
                <div className="interactive-path__content">
                  <div className="interactive-path__card">
                    {/* Card header */}
                    <div className="interactive-path__card-header">
                      <div className="interactive-path__icon">
                        {step.icon}
                      </div>
                      <div className="interactive-path__meta">
                        <span className="interactive-path__highlight">
                          {step.highlight}
                        </span>
                        <span className="interactive-path__duration">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {step.duration}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <h3 className="interactive-path__title">{step.title}</h3>
                    <p className="interactive-path__description">{step.description}</p>

                    {/* Details list */}
                    <ul className="interactive-path__details">
                      {step.details.map((detail, idx) => (
                        <li key={idx}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Card footer */}
                    <div className="interactive-path__card-footer">
                      <button className="interactive-path__learn-more">
                        <span>Learn More</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <RevealOnScroll animation="fadeUp" delay={200}>
          <div className="interactive-path__cta">
            <h3>Ready to Start Your Journey?</h3>
            <p>Book a free consultation and discover the perfect pathway for your career.</p>
            <a
              href="#contact"
              className="interactive-path__cta-button"
            >
              <span>Book Free Consultation</span>
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

export default InteractivePath;