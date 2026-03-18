/* ============================================
   FAQ Component
   Premium FAQ section with accordion
   ============================================ */

import React, { useState, useCallback } from 'react';
import { useScrollAnimation } from '../../hooks';
import AccordionItem from './AccordionItem';
import { SectionTitle, RevealOnScroll } from '../common';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // FAQ data
  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      questions: [
        {
          id: 1,
          question: 'What qualifications do I need to enroll in your courses?',
          answer: 'We welcome students with various backgrounds including medical professionals (doctors, nurses, dentists), beauty therapists, and individuals looking to start a career in aesthetics. We offer foundation courses for beginners and advanced courses for experienced practitioners. Please check individual course requirements for specific details.',
        },
        {
          id: 2,
          question: 'Are your courses CPD certified?',
          answer: 'Yes, all our courses are CPD certified and recognized by major regulatory bodies including the NMC, GMC, and UKCPD. Our certifications are accepted worldwide and help you meet your continuing professional development requirements.',
        },
        {
          id: 3,
          question: 'What is included in the course fee?',
          answer: 'Our course fees include comprehensive training materials, practical training with live models, certification, lifetime access to online resources, and ongoing support from our expert instructors. Some courses also include starter kits and product discounts.',
        },
        {
          id: 4,
          question: 'Do you offer flexible payment plans?',
          answer: 'Yes, we offer flexible payment plans to help you spread the cost of your training. We also accept major credit cards and offer financing options through our partner providers. Please contact our admissions team for more information.',
        },
      ],
    },
    {
      id: 'training',
      title: 'Training & Curriculum',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      questions: [
        {
          id: 5,
          question: 'What is the training format?',
          answer: 'Our courses combine theoretical knowledge with extensive practical training. Most courses include both in-person and online components, allowing you to learn at your own pace before joining us for hands-on sessions with live models. We also offer fully online courses for certain modules.',
        },
        {
          id: 6,
          question: 'How long do your courses take to complete?',
          answer: 'Course durations vary depending on the program. Foundation courses typically take 1-5 days, while advanced courses can range from 2-10 days. Online modules can be completed at your own pace, usually within 4-6 weeks.',
        },
        {
          id: 7,
          question: 'Will I get hands-on experience with live models?',
          answer: 'Yes, hands-on training with live models is a core part of our curriculum. We provide all necessary materials and models for you to practice your skills under the guidance of our expert instructors. This practical experience is essential for building confidence and competence.',
        },
        {
          id: 8,
          question: 'What support do you offer after the course?',
          answer: 'We provide lifetime support to all our graduates. This includes ongoing mentorship, access to exclusive online resources, and invitations to our annual refresher courses. Our graduates also benefit from our job placement service and networking opportunities.',
        },
      ],
    },
    {
      id: 'career',
      title: 'Career Opportunities',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
          <line x1="12" y1="6.81" x2="12" y2="20" />
        </svg>
      ),
      questions: [
        {
          id: 9,
          question: 'Will I be able to work as an aesthetic practitioner after completing your courses?',
          answer: 'Yes, our comprehensive training programs prepare you for a successful career in aesthetics. Upon completion, you will receive a recognized certification that allows you to practice legally in the UK and many other countries. We also provide guidance on setting up your own practice or finding employment.',
        },
        {
          id: 10,
          question: 'Do you offer job placement assistance?',
          answer: 'Yes, we have a dedicated career support team that helps our graduates find employment opportunities. We work with a network of reputable clinics and salons across the UK and internationally to connect our students with potential employers.',
        },
        {
          id: 11,
          question: 'What is the earning potential for aesthetic practitioners?',
          answer: 'Aesthetic practitioners can earn a very competitive income, with earning potential depending on experience, location, and specialization. Our graduates typically earn between £30,000 and £80,000 per year, with many earning significantly more as they build their client base.',
        },
        {
          id: 12,
          question: 'Can I start my own business after completing your courses?',
          answer: 'Absolutely! We provide comprehensive business training as part of many of our courses, including guidance on setting up your own clinic, marketing, legal requirements, and financial management. Many of our graduates have successfully launched their own thriving businesses.',
        },
      ],
    },
    {
      id: 'technical',
      title: 'Technical Questions',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
          <path d="M12 12h4" />
          <path d="M12 16h2" />
          <path d="M12 8h4" />
        </svg>
      ),
      questions: [
        {
          id: 13,
          question: 'What equipment and products do I need to practice?',
          answer: 'We provide all necessary equipment and products during your training. After completing the course, you will need to invest in your own equipment, including needles, syringes, dermal fillers, botulinum toxin, and other aesthetic products. We can provide recommendations on trusted suppliers.',
        },
        {
          id: 14,
          question: 'How do I stay updated with the latest techniques and products?',
          answer: 'We offer regular refresher courses and workshops to keep our graduates updated with the latest advancements in aesthetics. We also provide access to an exclusive online community where you can share knowledge and learn from other practitioners.',
        },
        {
          id: 15,
          question: 'What are the legal requirements for practicing aesthetics in the UK?',
          answer: 'In the UK, aesthetic practitioners must be registered with a professional regulatory body (NMC, GMC, etc.) and hold appropriate insurance. We provide comprehensive guidance on legal requirements and help you navigate the registration process.',
        },
        {
          id: 16,
          question: 'Do you provide insurance recommendations?',
          answer: 'Yes, we work with several specialist insurance providers who offer competitive rates for our graduates. We can provide you with information and discounts on professional indemnity insurance, public liability insurance, and other necessary coverage.',
        },
      ],
    },
  ];

  // Handle accordion toggle
  const toggleAccordion = useCallback((index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }, [activeIndex]);

  // Handle category toggle (optional)
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);

  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    setActiveIndex(null);
  }, []);

  // Filter questions by active category
  const activeQuestions = faqCategories.find(
    category => category.id === activeCategory
  )?.questions || [];

  return (
    <section
      id="faq"
      className="faq section"
      aria-labelledby="faq-title"
    >
      {/* Background elements */}
      <div className="faq__bg">
        <div className="faq__bg-gradient"></div>
        <div className="faq__bg-pattern"></div>
      </div>

      <div className="faq__container">
        {/* Section header */}
        <RevealOnScroll animation="fadeUp">
          <SectionTitle
            subtitle="Frequently Asked Questions"
            title="Answers to Your |Questions"
            description="We've compiled the most common questions from our students. If you don't find what you're looking for, please don't hesitate to contact us."
            alignment="center"
          />
        </RevealOnScroll>

        {/* Category tabs */}
        <RevealOnScroll animation="fadeUp" delay={100}>
          <div className="faq__categories" role="tablist">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                className={`faq__category ${activeCategory === category.id ? 'is-active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
                role="tab"
                aria-selected={activeCategory === category.id}
                aria-controls={`faq-panel-${category.id}`}
              >
                <span className="faq__category-icon">{category.icon}</span>
                <span className="faq__category-text">{category.title}</span>
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Accordion */}
        <div
          id={`faq-panel-${activeCategory}`}
          className="faq__accordion"
          role="tabpanel"
        >
          {activeQuestions.map((question, index) => (
            <RevealOnScroll
              key={question.id}
              animation="fadeUp"
              delay={index * 50}
            >
              <AccordionItem
                question={question.question}
                answer={question.answer}
                isOpen={activeIndex === index}
                onClick={() => toggleAccordion(index)}
                index={index}
              />
            </RevealOnScroll>
          ))}
        </div>

        {/* Contact CTA */}
        <RevealOnScroll animation="fadeUp" delay={200}>
          <div className="faq__cta">
            <div className="faq__cta-content">
              <h3 className="faq__cta-title">Still have questions?</h3>
              <p className="faq__cta-text">
                Our friendly team is here to help. Contact us today for personalized assistance.
              </p>
            </div>
            <a
              href="#contact"
              className="faq__cta-button"
            >
              <span>Contact Us</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>
      </div>

      {/* Decorative elements */}
      <div className="faq__decor faq__decor--1"></div>
      <div className="faq__decor faq__decor--2"></div>
    </section>
  );
};

export default FAQ;