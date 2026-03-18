/* ============================================
   Instructors Component
   Meet the team section
   ============================================ */

import React, { useState } from 'react';
import { useBreakpoint } from '../../hooks';
import InstructorCard from './InstructorCard';
import { SectionTitle, RevealOnScroll } from '../common';
import './Instructors.css';

const Instructors = () => {
  const [activeInstructor, setActiveInstructor] = useState(null);
  const { isMobile } = useBreakpoint();

  // Instructors data
  const instructors = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      title: 'Founder & Lead Instructor',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      specializations: ['Botox', 'Dermal Fillers', 'Facial Aesthetics'],
      experience: '15+ Years',
      bio: 'Dr. Sarah Mitchell is a renowned aesthetic medicine specialist with over 15 years of experience. She founded Envisage Training Academy to share her passion for excellence in aesthetic education.',
      qualifications: [
        'MBBS, MSc Aesthetic Medicine',
        'Fellow of Royal College',
        'International Trainer',
      ],
      social: {
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
      },
      stats: {
        students: '500+',
        courses: '12',
        rating: '4.9',
      },
    },
    {
      id: 2,
      name: 'Dr. James Wilson',
      title: 'Senior Clinical Trainer',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      specializations: ['Advanced Techniques', 'Male Aesthetics', 'Complications'],
      experience: '12+ Years',
      bio: 'Specializing in advanced aesthetic procedures and male aesthetics, Dr. James Wilson brings a wealth of clinical expertise to our training programs.',
      qualifications: [
        'MD, Aesthetic Surgery',
        'Board Certified',
        'Published Researcher',
      ],
      social: {
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
      },
      stats: {
        students: '350+',
        courses: '8',
        rating: '4.8',
      },
    },
    {
      id: 3,
      name: 'Dr. Emily Chen',
      title: 'Advanced Techniques Specialist',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      specializations: ['Thread Lifts', 'Non-Surgical', 'Skin Rejuvenation'],
      experience: '10+ Years',
      bio: 'Dr. Emily Chen is an expert in non-surgical facial rejuvenation techniques, particularly PDO thread lifts and advanced dermal filler applications.',
      qualifications: [
        'MD, Dermatology',
        'Advanced Aesthetics Diploma',
        'KOL for Leading Brands',
      ],
      social: {
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
      },
      stats: {
        students: '280+',
        courses: '6',
        rating: '5.0',
      },
    },
    {
      id: 4,
      name: 'Sarah Thompson',
      title: 'Business Development Coach',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      specializations: ['Business Strategy', 'Marketing', 'Clinic Management'],
      experience: '8+ Years',
      bio: 'Sarah Thompson helps aesthetic practitioners build successful businesses. With her expertise in marketing and clinic management, she guides our students toward entrepreneurial success.',
      qualifications: [
        'MBA, Healthcare Management',
        'Marketing Specialist',
        'Business Coach',
      ],
      social: {
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
      },
      stats: {
        students: '200+',
        courses: '4',
        rating: '4.9',
      },
    },
  ];

  // Expertise areas for decorative display
  const expertiseAreas = [
    'Botulinum Toxin',
    'Dermal Fillers',
    'Thread Lifts',
    'Skin Rejuvenation',
    'Lip Augmentation',
    'Facial Contouring',
    'Non-Surgical Rhinoplasty',
    'Business Training',
  ];

  return (
    <section
      id="instructors"
      className="instructors section"
      aria-labelledby="instructors-title"
    >
      {/* Background */}
      <div className="instructors__bg">
        <div className="instructors__bg-gradient"></div>
        <div className="instructors__bg-pattern"></div>
      </div>

      <div className="instructors__container">
        {/* Section header */}
        <RevealOnScroll animation="fadeUp">
          <SectionTitle
            subtitle="Expert Team"
            title="Learn From The |Best"
            description="Our instructors are industry-leading practitioners with decades of combined experience, dedicated to nurturing the next generation of aesthetic professionals."
            alignment="center"
          />
        </RevealOnScroll>

        {/* Instructors grid */}
        <div className="instructors__grid">
          {instructors.map((instructor, index) => (
            <RevealOnScroll
              key={instructor.id}
              animation="fadeUp"
              delay={100 + index * 100}
            >
              <InstructorCard
                instructor={instructor}
                isActive={activeInstructor === instructor.id}
                onHover={() => setActiveInstructor(instructor.id)}
                onLeave={() => setActiveInstructor(null)}
              />
            </RevealOnScroll>
          ))}
        </div>

        {/* Expertise marquee */}
        <RevealOnScroll animation="fadeUp" delay={400}>
          <div className="instructors__expertise">
            <div className="instructors__expertise-label">Areas of Expertise</div>
            <div className="instructors__expertise-marquee">
              <div className="instructors__expertise-track">
                {[...expertiseAreas, ...expertiseAreas].map((area, index) => (
                  <span key={index} className="instructors__expertise-item">
                    <span className="instructors__expertise-dot"></span>
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Stats bar */}
        <RevealOnScroll animation="fadeUp" delay={500}>
          <div className="instructors__stats">
            <div className="instructors__stat">
              <span className="instructors__stat-value">45+</span>
              <span className="instructors__stat-label">Combined Years Experience</span>
            </div>
            <div className="instructors__stat-divider"></div>
            <div className="instructors__stat">
              <span className="instructors__stat-value">1,300+</span>
              <span className="instructors__stat-label">Students Trained</span>
            </div>
            <div className="instructors__stat-divider"></div>
            <div className="instructors__stat">
              <span className="instructors__stat-value">30+</span>
              <span className="instructors__stat-label">Courses Delivered</span>
            </div>
            <div className="instructors__stat-divider"></div>
            <div className="instructors__stat">
              <span className="instructors__stat-value">4.9</span>
              <span className="instructors__stat-label">Average Rating</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* CTA */}
        <RevealOnScroll animation="fadeUp" delay={600}>
          <div className="instructors__cta">
            <p>Interested in joining our team of expert trainers?</p>
            <a href="#contact" className="instructors__cta-link">
              <span>Get in Touch</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>
      </div>

      {/* Decorative elements */}
      <div className="instructors__decor instructors__decor--1"></div>
      <div className="instructors__decor instructors__decor--2"></div>
    </section>
  );
};

export default Instructors;