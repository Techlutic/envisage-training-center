/* ============================================
   ENVISAGE TRAINING ACADEMY
   Main Application Component
   ============================================ */

import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import './App.css';

// Core Components (loaded immediately)
import Preloader from './components/Preloader/Preloader';
import CustomCursor from './components/CustomCursor/CustomCursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';

// Lazy loaded components for better performance
const About = lazy(() => import('./components/About/About'));
const Services = lazy(() => import('./components/Services/Services'));
const Courses = lazy(() => import('./components/Courses/Courses'));
const InteractivePath = lazy(() => import('./components/InteractivePath/InteractivePath'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs/WhyChooseUs'));
const Instructors = lazy(() => import('./components/Instructors/Instructors'));
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'));
const Gallery = lazy(() => import('./components/Gallery/Gallery'));
const Achievements = lazy(() => import('./components/Achievements/Achievements'));
const FAQ = lazy(() => import('./components/FAQ/FAQ'));
const BlogPreview = lazy(() => import('./components/BlogPreview/BlogPreview'));
const CTA = lazy(() => import('./components/CTA/CTA'));
const Contact = lazy(() => import('./components/Contact/Contact'));

// Loading fallback component
const SectionLoader = () => (
  <div className="section-loader">
    <div className="section-loader__spinner"></div>
  </div>
);

function App() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  // Preloader state
  const [isLoading, setIsLoading] = useState(true);
  
  // Cursor visibility (desktop only)
  const [showCursor, setShowCursor] = useState(false);
  
  // Scroll state
  const [scrollY, setScrollY] = useState(0);
  
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  // ============================================
  // EFFECTS
  // ============================================

  // Handle preloader and initial setup
  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      const mobile = window.matchMedia('(max-width: 1024px)').matches || 
                     'ontouchstart' in window ||
                     navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
      setShowCursor(!mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simulate loading time (replace with actual asset loading)
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      // Enable scrolling after preloader
      document.body.style.overflow = 'unset';
    }, 2500);

    // Prevent scrolling during preload
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Scroll event handling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Throttled scroll handler for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
          const navHeight = 80; // Account for fixed navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // ============================================
  // HANDLERS
  // ============================================

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="app">
      {/* Skip to main content link (Accessibility) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Preloader */}
      <Preloader isLoading={isLoading} />

      {/* Custom Cursor (Desktop only) */}
      {showCursor && <CustomCursor />}

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Main content wrapper */}
      <div className={`app__wrapper ${isLoading ? 'is-loading' : 'is-loaded'}`}>
        {/* Navigation */}
        <Navbar scrollY={scrollY} />

        {/* Main Content */}
        <main id="main-content" className="main">
          {/* Hero Section */}
          <Hero />

          {/* Lazy loaded sections */}
          <Suspense fallback={<SectionLoader />}>
            {/* About Section */}
            <About />

            {/* Services Section */}
            {/* <Services /> */}

            {/* Courses Section */}
            <Courses />

            {/* Interactive Learning Path */}
            <InteractivePath />

            {/* Why Choose Us Section */}
            <WhyChooseUs />

            {/* Instructors Section */}
            <Instructors />

            {/* Testimonials Section */}
            <Testimonials />

            {/* Gallery Section */}
            <Gallery />

            {/* Achievements Section */}
            <Achievements />

            {/* FAQ Section */}
            <FAQ />

            {/* Blog Preview Section */}
            <BlogPreview />

            {/* Call to Action Section */}
            <CTA />

            {/* Contact Section */}
            <Contact />
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />

        {/* Back to Top Button */}
        <button
          className={`back-to-top ${scrollY > 500 ? 'is-visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;