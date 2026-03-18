/* ============================================
   ContactForm Component
   Premium contact form with validation
   ============================================ */

import React, { useState, useCallback } from 'react';
import './Contact.css';

const ContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [focusedField, setFocusedField] = useState(null);

  // Course options
  const courseOptions = [
    { value: '', label: 'Select a course (optional)' },
    { value: 'foundation', label: 'Foundation Aesthetics Certification' },
    { value: 'advanced-botox', label: 'Advanced Botulinum Toxin Training' },
    { value: 'dermal-fillers', label: 'Dermal Fillers Masterclass' },
    { value: 'lip-augmentation', label: 'Lip Augmentation Specialist' },
    { value: 'skin-rejuvenation', label: 'Skin Rejuvenation & Peels' },
    { value: 'business', label: 'Business in Aesthetics' },
    { value: 'other', label: 'Other / General Inquiry' },
  ];

  // Validation
  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
      case 'phone':
        if (value && !/^[\d\s\-+()]{10,}$/.test(value)) {
          return 'Please enter a valid phone number';
        }
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  }, []);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Handle blur - validate field
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setFocusedField(null);
  }, [validateField]);

  // Handle focus
  const handleFocus = useCallback((e) => {
    setFocusedField(e.target.name);
  }, []);

  // Handle submit
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateField]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      message: '',
    });
    setErrors({});
    setSubmitStatus(null);
  }, []);

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Success message */}
      {submitStatus === 'success' && (
        <div className="contact-form__success">
          <div className="contact-form__success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h4>Message Sent Successfully!</h4>
          <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
          <button type="button" className="contact-form__reset" onClick={resetForm}>
            Send Another Message
          </button>
        </div>
      )}

      {/* Error message */}
      {submitStatus === 'error' && (
        <div className="contact-form__error">
          <div className="contact-form__error-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h4>Something Went Wrong</h4>
          <p>Please try again or contact us directly via phone or email.</p>
          <button type="button" className="contact-form__reset" onClick={() => setSubmitStatus(null)}>
            Try Again
          </button>
        </div>
      )}

      {/* Form fields */}
      {!submitStatus && (
        <>
          {/* Name field */}
          <div className={`contact-form__group ${focusedField === 'name' ? 'is-focused' : ''} ${errors.name ? 'has-error' : ''} ${formData.name ? 'has-value' : ''}`}>
            <label htmlFor="name" className="contact-form__label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="contact-form__input"
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
            <div className="contact-form__input-border"></div>
            {errors.name && <span className="contact-form__error-text">{errors.name}</span>}
          </div>

          {/* Email field */}
          <div className={`contact-form__group ${focusedField === 'email' ? 'is-focused' : ''} ${errors.email ? 'has-error' : ''} ${formData.email ? 'has-value' : ''}`}>
            <label htmlFor="email" className="contact-form__label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="contact-form__input"
              placeholder="Enter your email address"
              autoComplete="email"
              required
            />
            <div className="contact-form__input-border"></div>
            {errors.email && <span className="contact-form__error-text">{errors.email}</span>}
          </div>

          {/* Phone field */}
          <div className={`contact-form__group ${focusedField === 'phone' ? 'is-focused' : ''} ${errors.phone ? 'has-error' : ''} ${formData.phone ? 'has-value' : ''}`}>
            <label htmlFor="phone" className="contact-form__label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="contact-form__input"
              placeholder="Enter your phone number"
              autoComplete="tel"
            />
            <div className="contact-form__input-border"></div>
            {errors.phone && <span className="contact-form__error-text">{errors.phone}</span>}
          </div>

          {/* Course select */}
          <div className={`contact-form__group ${focusedField === 'course' ? 'is-focused' : ''} ${formData.course ? 'has-value' : ''}`}>
            <label htmlFor="course" className="contact-form__label">
              Course Interest
            </label>
            <div className="contact-form__select-wrapper">
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="contact-form__select"
              >
                {courseOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="contact-form__select-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
            <div className="contact-form__input-border"></div>
          </div>

          {/* Message field */}
          <div className={`contact-form__group contact-form__group--full ${focusedField === 'message' ? 'is-focused' : ''} ${errors.message ? 'has-error' : ''} ${formData.message ? 'has-value' : ''}`}>
            <label htmlFor="message" className="contact-form__label">
              Your Message <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="contact-form__textarea"
              placeholder="Tell us about your goals and any questions you have..."
              rows="5"
              required
            />
            <div className="contact-form__input-border"></div>
            {errors.message && <span className="contact-form__error-text">{errors.message}</span>}
            <span className="contact-form__char-count">
              {formData.message.length} / 500
            </span>
          </div>

          {/* Privacy notice */}
          <div className="contact-form__privacy">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p>
              By submitting this form, you agree to our{' '}
              <a href="/privacy">Privacy Policy</a> and consent to being contacted
              about our courses.
            </p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`contact-form__submit ${isSubmitting ? 'is-loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="contact-form__spinner"></span>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>
        </>
      )}
    </form>
  );
};

export default ContactForm;