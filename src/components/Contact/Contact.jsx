/* ============================================
   Contact Component
   Premium contact section with form
   ============================================ */

import React from 'react';
import ContactForm from './ContactForm';
import { SectionTitle, RevealOnScroll } from '../common';
import './Contact.css';

const Contact = () => {
  // Contact info data
  const contactInfo = [
    {
      id: 'address',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Visit Us',
      value: '123 Harley Street',
      subValue: 'London, W1G 7JU, UK',
      href: 'https://maps.google.com/?q=123+Harley+Street+London',
    },
    {
      id: 'phone',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: 'Call Us',
      value: '+44 (0) 20 7123 4567',
      subValue: 'Mon - Fri: 9am - 6pm',
      href: 'tel:+442071234567',
    },
    {
      id: 'email',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email Us',
      value: 'info@envisageacademy.com',
      subValue: 'We reply within 24 hours',
      href: 'mailto:info@envisageacademy.com',
    },
    {
      id: 'hours',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: 'Working Hours',
      value: 'Monday - Friday',
      subValue: '9:00 AM - 6:00 PM GMT',
      href: null,
    },
  ];

  // Social links
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/envisage_training_academy/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/AestheticsAcademia/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/envisage-training-academy/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@envisageacademy',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="contact section"
      aria-labelledby="contact-title"
    >
      {/* Background */}
      <div className="contact__bg">
        <div className="contact__bg-gradient"></div>
        <div className="contact__bg-pattern"></div>
        <div className="contact__bg-glow"></div>
      </div>

      <div className="contact__container">
        {/* Section header */}
        <RevealOnScroll animation="fadeUp">
          <SectionTitle
            subtitle="Get In Touch"
            title="Let's Start Your |Journey"
            description="Have questions about our courses? Ready to enroll? Reach out and our team will guide you every step of the way."
            alignment="center"
          />
        </RevealOnScroll>

        {/* Main content grid */}
        <div className="contact__grid">
          {/* Left side - Contact Form */}
          <RevealOnScroll animation="fadeRight" delay={100}>
            <div className="contact__form-wrapper">
              <div className="contact__form-header">
                <h3 className="contact__form-title">Send Us a Message</h3>
                <p className="contact__form-subtitle">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>
              <ContactForm />
            </div>
          </RevealOnScroll>

          {/* Right side - Contact Info */}
          <RevealOnScroll animation="fadeLeft" delay={200}>
            <div className="contact__info-wrapper">
              {/* Contact cards */}
              <div className="contact__info-cards">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.id}
                    className="contact__info-card"
                    style={{ '--card-delay': `${index * 100}ms` }}
                  >
                    <div className="contact__info-icon">
                      {info.icon}
                    </div>
                    <div className="contact__info-content">
                      <span className="contact__info-label">{info.label}</span>
                      {info.href ? (
                        <a href={info.href} className="contact__info-value">
                          {info.value}
                        </a>
                      ) : (
                        <span className="contact__info-value">{info.value}</span>
                      )}
                      <span className="contact__info-subvalue">{info.subValue}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="contact__social">
                <h4 className="contact__social-title">Follow Us</h4>
                <div className="contact__social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="contact__social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="contact__map">
                <div className="contact__map-overlay">
                  <div className="contact__map-content">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>123 Harley Street, London</span>
                    <a
                      href="https://maps.google.com/?q=123+Harley+Street+London"
                      className="contact__map-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Map location"
                  className="contact__map-image"
                  loading="lazy"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Quick response banner */}
        <RevealOnScroll animation="fadeUp" delay={400}>
          <div className="contact__banner">
            <div className="contact__banner-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="contact__banner-content">
              <h4>Quick Response Guaranteed</h4>
              <p>Our admissions team responds to all inquiries within 24 hours</p>
            </div>
            <a href="tel:+442071234567" className="contact__banner-cta">
              Call Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>
      </div>

      {/* Decorative elements */}
      <div className="contact__decor contact__decor--1"></div>
      <div className="contact__decor contact__decor--2"></div>
    </section>
  );
};

export default Contact;