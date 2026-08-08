// Shared Framer Motion animation variants and configurations for ZeesuMeet landing page components

export const viewportConfig = {
  once: true,
  amount: 0.2,
};

export const defaultTransition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1.0], // smooth easeOut
};

// Container with staggered child animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Fade In + Slide Up
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Fade In + Slide Left
export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

// Fade In + Slide Right
export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

// Scale In
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

// Hover micro-interactions for cards
export const hoverCard = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -4,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// Hover micro-interactions for buttons
export const hoverButton = {
  hover: { scale: 1.04 },
  tap: { scale: 0.96 },
};

// Floating animation loop for phone mockups
export const floatingAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

// Continuous pulse glow for center icons / featured cards
export const pulsingGlowAnimation = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.85, 1, 0.85],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
