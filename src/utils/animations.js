/* ============================================
   Animation Utility Functions
   ============================================ */

/**
 * Linear interpolation (lerp)
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} factor - Interpolation factor (0-1)
 * @returns {number} - Interpolated value
 */
export const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

/**
 * Clamp value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped value
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Map value from one range to another
 * @param {number} value - Value to map
 * @param {number} inMin - Input minimum
 * @param {number} inMax - Input maximum
 * @param {number} outMin - Output minimum
 * @param {number} outMax - Output maximum
 * @returns {number} - Mapped value
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Easing functions collection
 */
export const easings = {
  // Linear
  linear: (t) => t,

  // Quad
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  // Cubic
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  // Quart
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - --t * t * t * t,
  easeInOutQuart: (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,

  // Quint
  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => 1 + --t * t * t * t * t,
  easeInOutQuint: (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,

  // Expo
  easeInExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t) =>
    t === 0
      ? 0
      : t === 1
      ? 1
      : t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2,

  // Circ
  easeInCirc: (t) => 1 - Math.sqrt(1 - t * t),
  easeOutCirc: (t) => Math.sqrt(1 - --t * t),
  easeInOutCirc: (t) =>
    t < 0.5
      ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,

  // Back
  easeInBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeOutBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInOutBack: (t) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },

  // Elastic
  easeInElastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  },
  easeOutElastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  easeInOutElastic: (t) => {
    const c5 = (2 * Math.PI) / 4.5;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : t < 0.5
      ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
  },

  // Bounce
  easeOutBounce: (t) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },
  easeInBounce: (t) => 1 - easings.easeOutBounce(1 - t),
  easeInOutBounce: (t) =>
    t < 0.5
      ? (1 - easings.easeOutBounce(1 - 2 * t)) / 2
      : (1 + easings.easeOutBounce(2 * t - 1)) / 2,
};

/**
 * Create spring physics animation
 * @param {Object} options - Spring options
 * @returns {Function} - Animation frame callback
 */
export const spring = (options = {}) => {
  const {
    stiffness = 100,
    damping = 10,
    mass = 1,
    velocity = 0,
    onUpdate,
    onComplete,
  } = options;

  let currentPosition = 0;
  let currentVelocity = velocity;
  const targetPosition = 1;

  return () => {
    const springForce = -stiffness * (currentPosition - targetPosition);
    const dampingForce = -damping * currentVelocity;
    const acceleration = (springForce + dampingForce) / mass;

    currentVelocity += acceleration * (1 / 60);
    currentPosition += currentVelocity * (1 / 60);

    onUpdate?.(currentPosition);

    // Check if animation should complete
    const isComplete =
      Math.abs(currentVelocity) < 0.001 &&
      Math.abs(currentPosition - targetPosition) < 0.001;

    if (isComplete) {
      onComplete?.();
    }

    return !isComplete;
  };
};

/**
 * Create stagger delay calculator
 * @param {number} baseDelay - Base delay in ms
 * @param {number} staggerAmount - Stagger amount in ms
 * @param {string} direction - 'forward' or 'reverse'
 * @returns {Function} - Function that returns delay for given index
 */
export const stagger = (baseDelay = 0, staggerAmount = 100, direction = 'forward') => {
  return (index, total) => {
    const adjustedIndex = direction === 'reverse' ? total - 1 - index : index;
    return baseDelay + adjustedIndex * staggerAmount;
  };
};

/**
 * Create animation sequence
 * @param {Array} animations - Array of animation configs
 * @returns {Object} - Animation controller
 */
export const sequence = (animations) => {
  let currentIndex = 0;
  let isPlaying = false;

  const play = () => {
    if (isPlaying || currentIndex >= animations.length) return;
    isPlaying = true;

    const runAnimation = () => {
      if (currentIndex >= animations.length) {
        isPlaying = false;
        return;
      }

      const animation = animations[currentIndex];
      const duration = animation.duration || 1000;
      const onUpdate = animation.onUpdate || (() => {});
      const onComplete = animation.onComplete || (() => {});
      const easing = easings[animation.easing] || easings.easeInOutCubic;

      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing(progress);

        onUpdate(easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          onComplete();
          currentIndex++;
          runAnimation();
        }
      };

      requestAnimationFrame(animate);
    };

    runAnimation();
  };

  const reset = () => {
    currentIndex = 0;
    isPlaying = false;
  };

  return { play, reset };
};

/**
 * Generate random position for particles
 * @param {Object} bounds - { width, height }
 * @returns {Object} - { x, y, vx, vy }
 */
export const randomParticle = (bounds = { width: 100, height: 100 }) => {
  return {
    x: Math.random() * bounds.width,
    y: Math.random() * bounds.height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: Math.random() * 4 + 1,
    opacity: Math.random() * 0.5 + 0.2,
  };
};

/**
 * Calculate distance between two points
 * @param {Object} p1 - { x, y }
 * @param {Object} p2 - { x, y }
 * @returns {number} - Distance
 */
export const distance = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Get CSS transform string for 3D card tilt
 * @param {number} rotateX - X rotation in degrees
 * @param {number} rotateY - Y rotation in degrees
 * @param {number} scale - Scale factor
 * @returns {string} - CSS transform string
 */
export const get3DTransform = (rotateX, rotateY, scale = 1) => {
  return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in ms
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * RAF throttle for smooth animations
 * @param {Function} callback - Callback function
 * @returns {Function} - Throttled function
 */
export const rafThrottle = (callback) => {
  let requestId = null;
  let lastArgs = null;

  const later = (context) => () => {
    requestId = null;
    callback.apply(context, lastArgs);
  };

  const throttled = function (...args) {
    lastArgs = args;
    if (requestId === null) {
      requestId = requestAnimationFrame(later(this));
    }
  };

  throttled.cancel = () => {
    if (requestId !== null) {
      cancelAnimationFrame(requestId);
      requestId = null;
    }
  };

  return throttled;
};