/* ============================================
   Courses Component
   Premium courses section with filtering
   ============================================ */

import React, { useState, useCallback, useMemo } from 'react';
import { useScrollAnimation } from '../../hooks';
import CourseCard from './CourseCard';
import CourseFilter from './CourseFilter';
import { SectionTitle, RevealOnScroll } from '../common';
import './Courses.css';

const Courses = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCourse, setHoveredCourse] = useState(null);

  // Filter categories
  const filters = [
    { id: 'all', label: 'All Courses', count: 8 },
    { id: 'foundation', label: 'Foundation', count: 2 },
    { id: 'advanced', label: 'Advanced', count: 3 },
    { id: 'masterclass', label: 'Masterclass', count: 2 },
    { id: 'business', label: 'Business', count: 1 },
  ];

  // Courses data
  const courses = [
    {
      id: 1,
      title: 'Foundation Aesthetics Certification',
      slug: 'foundation-aesthetics',
      category: 'foundation',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '5 Days',
      level: 'Beginner',
      students: 234,
      rating: 4.9,
      reviews: 89,
      price: 2499,
      originalPrice: 2999,
      featured: true,
      bestseller: true,
      highlights: [
        'Complete beginner certification',
        'Botox & dermal fillers basics',
        'Live model practice',
        'CPD accredited',
      ],
      instructor: {
        name: 'Dr. Sarah Mitchell',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
      },
    },
    {
      id: 2,
      title: 'Advanced Botulinum Toxin Training',
      slug: 'advanced-botox',
      category: 'advanced',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '3 Days',
      level: 'Advanced',
      students: 156,
      rating: 4.8,
      reviews: 67,
      price: 1899,
      originalPrice: 2299,
      featured: false,
      bestseller: false,
      highlights: [
        'Advanced injection techniques',
        'Complication management',
        'Male aesthetics focus',
        'Small group training',
      ],
      instructor: {
        name: 'Dr. James Wilson',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
      },
    },
    {
      id: 3,
      title: 'Dermal Fillers Masterclass',
      slug: 'dermal-fillers-masterclass',
      category: 'masterclass',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '4 Days',
      level: 'Expert',
      students: 98,
      rating: 5.0,
      reviews: 45,
      price: 2999,
      originalPrice: 3499,
      featured: true,
      bestseller: false,
      highlights: [
        'Full face transformation',
        'Cannula techniques',
        'Product knowledge',
        'Case study analysis',
      ],
      instructor: {
        name: 'Dr. Emily Chen',
        avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop',
      },
    },
    {
      id: 4,
      title: 'Lip Augmentation Specialist',
      slug: 'lip-augmentation',
      category: 'advanced',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '2 Days',
      level: 'Intermediate',
      students: 312,
      rating: 4.9,
      reviews: 124,
      price: 1299,
      originalPrice: 1599,
      featured: false,
      bestseller: true,
      highlights: [
        'Russian lip technique',
        'Natural enhancement',
        'Border definition',
        'Troubleshooting tips',
      ],
      instructor: {
        name: 'Dr. Sarah Mitchell',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
      },
    },
    {
      id: 5,
      title: 'Skin Rejuvenation & Chemical Peels',
      slug: 'skin-rejuvenation',
      category: 'foundation',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '2 Days',
      level: 'Beginner',
      students: 189,
      rating: 4.7,
      reviews: 78,
      price: 999,
      originalPrice: 1299,
      featured: false,
      bestseller: false,
      highlights: [
        'Chemical peel protocols',
        'Skin analysis techniques',
        'Treatment planning',
        'Aftercare guidance',
      ],
      instructor: {
        name: 'Dr. Rachel Brown',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      },
    },
    {
      id: 6,
      title: 'Non-Surgical Rhinoplasty',
      slug: 'non-surgical-rhinoplasty',
      category: 'masterclass',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '2 Days',
      level: 'Expert',
      students: 67,
      rating: 4.9,
      reviews: 32,
      price: 1999,
      originalPrice: 2499,
      featured: false,
      bestseller: false,
      highlights: [
        'Nose reshaping techniques',
        'Safety protocols',
        'Patient selection',
        'Correction methods',
      ],
      instructor: {
        name: 'Dr. James Wilson',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
      },
    },
    {
      id: 7,
      title: 'PDO Thread Lift Certification',
      slug: 'pdo-thread-lift',
      category: 'advanced',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '3 Days',
      level: 'Advanced',
      students: 78,
      rating: 4.8,
      reviews: 41,
      price: 2299,
      originalPrice: 2799,
      featured: false,
      bestseller: false,
      highlights: [
        'Thread types & selection',
        'Insertion techniques',
        'Facial mapping',
        'Combination therapies',
      ],
      instructor: {
        name: 'Dr. Emily Chen',
        avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop',
      },
    },
    {
      id: 8,
      title: 'Business in Aesthetics',
      slug: 'business-aesthetics',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '1 Day',
      level: 'All Levels',
      students: 145,
      rating: 4.6,
      reviews: 56,
      price: 599,
      originalPrice: 799,
      featured: false,
      bestseller: false,
      highlights: [
        'Business setup guide',
        'Marketing strategies',
        'Legal compliance',
        'Financial planning',
      ],
      instructor: {
        name: 'Sarah Thompson',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      },
    },
  ];

  // Filter courses based on active filter
  const filteredCourses = useMemo(() => {
    if (activeFilter === 'all') return courses;
    return courses.filter(course => course.category === activeFilter);
  }, [activeFilter, courses]);

  // Handle filter change
  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId);
  }, []);

  return (
    <section
      id="courses"
      className="courses section"
      aria-labelledby="courses-title"
    >
      {/* Background */}
      <div className="courses__bg">
        <div className="courses__bg-gradient"></div>
        <div className="courses__bg-pattern"></div>
        <div className="courses__bg-glow"></div>
      </div>

      <div className="courses__container">
        {/* Section header */}
        <RevealOnScroll animation="fadeUp">
          <SectionTitle
            subtitle="Transform Your Career"
            title="Our Premium |Courses"
            description="Comprehensive training programs designed by industry experts to help you master aesthetic techniques and build a successful career."
            alignment="center"
          />
        </RevealOnScroll>

        {/* Filter tabs */}
        <RevealOnScroll animation="fadeUp" delay={100}>
          <CourseFilter
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </RevealOnScroll>

        {/* Courses grid */}
        <div className="courses__grid">
          {filteredCourses.map((course, index) => (
            <RevealOnScroll
              key={course.id}
              animation="fadeUp"
              delay={150 + index * 50}
            >
              <CourseCard
                course={course}
                isHovered={hoveredCourse === course.id}
                onHover={() => setHoveredCourse(course.id)}
                onLeave={() => setHoveredCourse(null)}
              />
            </RevealOnScroll>
          ))}
        </div>

        {/* Empty state */}
        {filteredCourses.length === 0 && (
          <div className="courses__empty">
            <div className="courses__empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <h3>No courses found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}

        {/* View all CTA */}
        <RevealOnScroll animation="fadeUp" delay={400}>
          <div className="courses__cta">
            <a
              href="https://envisageaesthetics.thinkific.com/"
              className="courses__cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View All Courses</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <p className="courses__cta-note">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>All courses include certification & lifetime access to materials</span>
            </p>
          </div>
        </RevealOnScroll>
      </div>

      {/* Decorative elements */}
      <div className="courses__decor courses__decor--1"></div>
      <div className="courses__decor courses__decor--2"></div>
    </section>
  );
};

export default Courses;