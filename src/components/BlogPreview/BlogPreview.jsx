/* ============================================
   BlogPreview Component
   Premium blog preview section
   ============================================ */

import React, { useState } from 'react';
import { useScrollAnimation } from '../../hooks';
import { SectionTitle, RevealOnScroll } from '../common';
import './BlogPreview.css';

const BlogPreview = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Aesthetics: Trends to Watch in 2024',
      excerpt: 'Discover the latest trends shaping the aesthetics industry in 2024, from innovative treatments to emerging technologies that are revolutionizing the field.',
      category: 'Trends',
      date: 'January 15, 2024',
      author: 'Dr. Sarah Mitchell',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      readTime: '5 min read',
      featured: true,
    },
    {
      id: 2,
      title: 'Mastering Dermal Fillers: Tips for Perfect Results',
      excerpt: 'Learn expert tips and techniques for achieving perfect results with dermal fillers, including injection strategies, patient assessment, and complication management.',
      category: 'Techniques',
      date: 'January 10, 2024',
      author: 'Dr. Emily Chen',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      readTime: '7 min read',
      featured: false,
    },
    {
      id: 3,
      title: 'Building a Successful Aesthetics Business: A Comprehensive Guide',
      excerpt: 'From setting up your clinic to marketing your services, this comprehensive guide covers everything you need to know to build a thriving aesthetics business.',
      category: 'Business',
      date: 'January 5, 2024',
      author: 'Sarah Thompson',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      readTime: '10 min read',
      featured: true,
    },
    {
      id: 4,
      title: 'Safety First: Best Practices for Aesthetic Practitioners',
      excerpt: 'Patient safety should always be your top priority. Learn about the best practices and protocols every aesthetic practitioner should follow to ensure safe and effective treatments.',
      category: 'Safety',
      date: 'December 28, 2023',
      author: 'Dr. James Wilson',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      readTime: '6 min read',
      featured: false,
    },
    {
      id: 5,
      title: 'The Science Behind Botulinum Toxin: How It Works and What to Expect',
      excerpt: 'Gain a deeper understanding of botulinum toxin, including its mechanism of action, clinical applications, and what patients can expect during and after treatment.',
      category: 'Science',
      date: 'December 20, 2023',
      author: 'Dr. Rachel Brown',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      readTime: '8 min read',
      featured: false,
    },
    {
      id: 6,
      title: 'From Novice to Expert: Your Journey in Aesthetics',
      excerpt: 'Starting a career in aesthetics can be overwhelming. This article provides a roadmap for beginners, covering the essential steps to become a successful aesthetic practitioner.',
      category: 'Career',
      date: 'December 15, 2023',
      author: 'Dr. Sarah Mitchell',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      readTime: '9 min read',
      featured: false,
    },
  ];

  // Categories
  const categories = [
    { id: 'all', label: 'All Posts', count: blogPosts.length },
    { id: 'trends', label: 'Trends', count: blogPosts.filter(post => post.category === 'Trends').length },
    { id: 'techniques', label: 'Techniques', count: blogPosts.filter(post => post.category === 'Techniques').length },
    { id: 'business', label: 'Business', count: blogPosts.filter(post => post.category === 'Business').length },
    { id: 'safety', label: 'Safety', count: blogPosts.filter(post => post.category === 'Safety').length },
    { id: 'science', label: 'Science', count: blogPosts.filter(post => post.category === 'Science').length },
    { id: 'career', label: 'Career', count: blogPosts.filter(post => post.category === 'Career').length },
  ];

  // Filter posts by active tab
  const filteredPosts = activeTab === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase() === activeTab);

  return (
    <section
      id="blog"
      className="blog-preview section"
      aria-labelledby="blog-title"
    >
      {/* Background elements */}
      <div className="blog-preview__bg">
        <div className="blog-preview__bg-gradient"></div>
        <div className="blog-preview__bg-pattern"></div>
      </div>

      <div className="blog-preview__container">
        {/* Section header */}
        <RevealOnScroll animation="fadeUp">
          <SectionTitle
            subtitle="Latest Insights"
            title="Our Blog & |Resources"
            description="Stay updated with the latest trends, techniques, and insights from our expert instructors and industry leaders."
            alignment="center"
          />
        </RevealOnScroll>

        {/* Category tabs */}
        <RevealOnScroll animation="fadeUp" delay={100}>
          <div className="blog-preview__categories" role="tablist">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`blog-preview__category ${activeTab === category.id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(category.id)}
                role="tab"
                aria-selected={activeTab === category.id}
                aria-controls={`blog-panel-${category.id}`}
              >
                <span className="blog-preview__category-text">{category.label}</span>
                <span className="blog-preview__category-count">{category.count}</span>
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Blog grid */}
        <div
          id={`blog-panel-${activeTab}`}
          className="blog-preview__grid"
          role="tabpanel"
        >
          {filteredPosts.map((post, index) => (
            <RevealOnScroll
              key={post.id}
              animation="fadeUp"
              delay={index * 50}
            >
              <article className="blog-preview__card">
                {/* Featured badge */}
                {post.featured && (
                  <div className="blog-preview__featured-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <span>Featured</span>
                  </div>
                )}

                {/* Image */}
                <div className="blog-preview__image-wrapper">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="blog-preview__image"
                  />
                  <div className="blog-preview__image-overlay"></div>
                </div>

                {/* Content */}
                <div className="blog-preview__content">
                  {/* Meta */}
                  <div className="blog-preview__meta">
                    <span className="blog-preview__category">{post.category}</span>
                    <span className="blog-preview__date">{post.date}</span>
                    <span className="blog-preview__read-time">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="blog-preview__title">{post.title}</h3>

                  {/* Excerpt */}
                  <p className="blog-preview__excerpt">{post.excerpt}</p>

                  {/* Author */}
                  <div className="blog-preview__author">
                    <div className="blog-preview__author-avatar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="blog-preview__author-name">By {post.author}</span>
                  </div>

                  {/* Read more button */}
                  <a
                    href="#"
                    className="blog-preview__read-more"
                  >
                    <span>Read Article</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="blog-preview__empty">
            <div className="blog-preview__empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <path d="M12 12l4 4 2-2-4-4-2 2z" />
              </svg>
            </div>
            <h3>No posts found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}

        {/* View all button */}
        <RevealOnScroll animation="fadeUp" delay={200}>
          <div className="blog-preview__cta">
            <a
              href="#"
              className="blog-preview__cta-button"
            >
              <span>View All Posts</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>
      </div>

      {/* Decorative elements */}
      <div className="blog-preview__decor blog-preview__decor--1"></div>
      <div className="blog-preview__decor blog-preview__decor--2"></div>
    </section>
  );
};

export default BlogPreview;