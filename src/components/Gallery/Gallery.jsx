/* ============================================
   Gallery Component
   Interactive masonry gallery with lightbox
   ============================================ */

import React, { useState, useCallback, useMemo } from 'react';
import { useScrollAnimation, useBreakpoint } from '../../hooks';
import GalleryItem from './GalleryItem';
import Lightbox from './Lightbox';
import { SectionTitle, RevealOnScroll } from '../common';
import './Gallery.css';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { isMobile } = useBreakpoint();

  // Filter categories
  const filters = [
    { id: 'all', label: 'All', icon: null },
    { id: 'training', label: 'Training', icon: null },
    { id: 'facilities', label: 'Facilities', icon: null },
    { id: 'certificates', label: 'Certificates', icon: null },
    { id: 'events', label: 'Events', icon: null },
  ];

  // Gallery items data
  const galleryItems = [
    {
      id: 1,
      title: 'Advanced Injection Technique',
      category: 'training',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'large',
      description: 'Hands-on training with live models',
    },
    {
      id: 2,
      title: 'State-of-the-Art Clinic',
      category: 'facilities',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'medium',
      description: 'Modern facilities for practical training',
    },
    {
      id: 3,
      title: 'CPD Certification',
      category: 'certificates',
      image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'small',
      description: 'Internationally recognized certification',
    },
    {
      id: 4,
      title: 'Live Demonstration',
      category: 'training',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'medium',
      description: 'Expert instructors demonstrating techniques',
    },
    {
      id: 5,
      title: 'Annual Conference 2024',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'large',
      description: 'Networking with industry professionals',
    },
    {
      id: 6,
      title: 'Training Room',
      category: 'facilities',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'small',
      description: 'Comfortable learning environment',
    },
    {
      id: 7,
      title: 'Dermal Filler Workshop',
      category: 'training',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'medium',
      description: 'Practical filler injection training',
    },
    {
      id: 8,
      title: 'Graduation Ceremony',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'small',
      description: 'Celebrating our graduates\' success',
    },
    {
      id: 9,
      title: 'Award of Excellence',
      category: 'certificates',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'medium',
      description: 'Recognition of training excellence',
    },
    {
      id: 10,
      title: 'Consultation Suite',
      category: 'facilities',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'large',
      description: 'Professional consultation rooms',
    },
    {
      id: 11,
      title: 'Practical Assessment',
      category: 'training',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'small',
      description: 'Skill evaluation sessions',
    },
    {
      id: 12,
      title: 'Industry Networking',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      size: 'medium',
      description: 'Building professional connections',
    },
  ];

  // Filter gallery items
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return galleryItems;
    return galleryItems.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  // Get item counts for filters
  const getFilterCount = useCallback((filterId) => {
    if (filterId === 'all') return galleryItems.length;
    return galleryItems.filter(item => item.category === filterId).length;
  }, [galleryItems]);

  // Handle filter change
  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId);
  }, []);

  // Lightbox handlers
  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => 
      prev >= filteredItems.length - 1 ? 0 : prev + 1
    );
  }, [filteredItems.length]);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => 
      prev <= 0 ? filteredItems.length - 1 : prev - 1
    );
  }, [filteredItems.length]);

  return (
    <section
      id="gallery"
      className="gallery section"
      aria-labelledby="gallery-title"
    >
      {/* Background elements */}
      <div className="gallery__bg">
        <div className="gallery__bg-gradient"></div>
        <div className="gallery__bg-pattern"></div>
      </div>

      <div className="gallery__container">
        {/* Section header */}
        <RevealOnScroll animation="fadeUp">
          <SectionTitle
            subtitle="Visual Journey"
            title="Our |Gallery"
            description="Explore our world-class training facilities, events, and the achievements of our students."
            alignment="center"
          />
        </RevealOnScroll>

        {/* Filter tabs */}
        <RevealOnScroll animation="fadeUp" delay={100}>
          <div className="gallery__filters" role="tablist">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`gallery__filter ${activeFilter === filter.id ? 'is-active' : ''}`}
                onClick={() => handleFilterChange(filter.id)}
                role="tab"
                aria-selected={activeFilter === filter.id}
                aria-controls="gallery-grid"
              >
                <span className="gallery__filter-text">{filter.label}</span>
                <span className="gallery__filter-count">{getFilterCount(filter.id)}</span>
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Gallery grid */}
        <div
          id="gallery-grid"
          className="gallery__grid"
          role="tabpanel"
        >
          {filteredItems.map((item, index) => (
            <RevealOnScroll
              key={item.id}
              animation="scaleUp"
              delay={100 + (index % 6) * 50}
            >
              <GalleryItem
                item={item}
                index={index}
                onClick={() => openLightbox(index)}
              />
            </RevealOnScroll>
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="gallery__empty">
            <div className="gallery__empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <h3>No images found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}

        {/* View more CTA */}
        <RevealOnScroll animation="fadeUp" delay={300}>
          <div className="gallery__cta">
            <a
              href="https://www.instagram.com/envisage_training_academy/"
              className="gallery__cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Follow Us on Instagram</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="gallery__cta-arrow">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrev={goToPrev}
      />

      {/* Decorative elements */}
      <div className="gallery__decor gallery__decor--1"></div>
      <div className="gallery__decor gallery__decor--2"></div>
    </section>
  );
};

export default Gallery;