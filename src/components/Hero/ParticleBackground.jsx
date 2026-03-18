/* ============================================
   ParticleBackground Component
   Animated particle system for hero
   ============================================ */

import React, { useEffect, useRef, useCallback } from 'react';
import { useBreakpoint } from '../../hooks';
import './ParticleBackground.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { isMobile, prefersReducedMotion } = useBreakpoint();

  // Particle class
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
      this.hue = Math.random() * 30 + 30; // Gold range
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;

      // Mouse interaction
      const dx = mouseRef.current.x - this.x;
      const dy = mouseRef.current.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100;
        this.speedX -= (dx / distance) * force * 0.02;
        this.speedY -= (dy / distance) * force * 0.02;
      }

      // Fade in/out based on life
      if (this.life < 20) {
        this.opacity = (this.life / 20) * 0.5;
      } else if (this.life > this.maxLife - 20) {
        this.opacity = ((this.maxLife - this.life) / 20) * 0.5;
      }

      // Reset if out of bounds or life ended
      if (
        this.x < 0 ||
        this.x > this.canvas.width ||
        this.y < 0 ||
        this.y > this.canvas.height ||
        this.life >= this.maxLife
      ) {
        this.reset();
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 50%, 65%, ${this.opacity})`;
      ctx.fill();

      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = `hsla(${this.hue}, 50%, 65%, 0.5)`;
    }
  }

  // Initialize particles
  const initParticles = useCallback((canvas) => {
    const particleCount = isMobile ? 30 : 60;
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(canvas));
    }
  }, [isMobile]);

  // Animation loop
  const animate = useCallback((ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    particlesRef.current.forEach((particle, i) => {
      particlesRef.current.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = `rgba(201, 168, 108, ${0.1 * (1 - distance / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      particle.update();
      particle.draw(ctx);
    });

    animationRef.current = requestAnimationFrame(() => animate(ctx, canvas));
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initParticles(canvas);
  }, [initParticles]);

  // Handle mouse move
  const handleMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Setup effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize
    initParticles(canvas);

    // Start animation
    animate(ctx, canvas);

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion, initParticles, animate, handleResize, handleMouseMove]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="particle-background"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;