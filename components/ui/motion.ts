import { Variants } from 'framer-motion';

// Premium mechanical/architectural transition timing
export const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: PREMIUM_EASE,
      ...custom
    }
  })
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      ...custom
    }
  })
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: PREMIUM_EASE,
      ...custom
    }
  })
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: (custom = {}) => ({
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
      ...custom
    }
  })
};

export const revealText: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (custom = {}) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: PREMIUM_EASE,
      ...custom
    }
  })
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: PREMIUM_EASE,
      ...custom
    }
  })
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: PREMIUM_EASE,
      ...custom
    }
  })
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
  visible: (custom = {}) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.9,
      ease: PREMIUM_EASE,
      ...custom
    }
  })
};
