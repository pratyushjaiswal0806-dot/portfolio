import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isHeroTextHovered, setIsHeroTextHovered] = useState(false);
  const [isProjectHovered, setIsProjectHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Velocity tracking for dynamic stretching
  const velocityX = useVelocity(cursorX);
  const velocityY = useVelocity(cursorY);
  
  // Calculate speed and angle using Framer Motion 10+ function overloads
  const speed = useTransform(() => {
    const vx = velocityX.get();
    const vy = velocityY.get();
    return Math.sqrt(vx * vx + vy * vy);
  });

  const angle = useTransform(() => {
    const vx = velocityX.get();
    const vy = velocityY.get();
    return vx === 0 && vy === 0 ? 0 : Math.atan2(vy, vx) * (180 / Math.PI);
  });

  // Stretch scale mapping (max stretch at 3000px/s)
  const scaleX = useTransform(speed, [0, 3000], [1, 1.85]);
  const scaleY = useTransform(speed, [0, 3000], [1, 0.65]);

  // Spring settings for trail delay (Ring)
  const ringSpringConfig = { damping: 35, stiffness: 280, mass: 0.6 };
  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);

  // Spring settings for instant response (Dot)
  const dotSpringConfig = { damping: 20, stiffness: 750, mass: 0.1 };
  const dotX = useSpring(cursorX, dotSpringConfig);
  const dotY = useSpring(cursorY, dotSpringConfig);

  useEffect(() => {
    // Check user preference for motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    const moveCursor = (e: MouseEvent) => {
      // Offset by radius (default 8px)
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Project card hover state
      if (target.closest('[data-cursor="project-card"]')) {
        setIsProjectHovered(true);
        setIsHovered(false);
        setIsTextHovered(false);
        setIsHeroTextHovered(false);
      }
      // Hero Title hover state
      else if (target.closest('[data-cursor="hero-text"]')) {
        setIsHeroTextHovered(true);
        setIsProjectHovered(false);
        setIsHovered(false);
        setIsTextHovered(false);
      }
      // Generic text hover state
      else if (target.closest('[data-cursor="text-hover"]')) {
        setIsTextHovered(true);
        setIsProjectHovered(false);
        setIsHeroTextHovered(false);
        setIsHovered(false);
      } 
      // Interactive items (links, buttons, items with custom cursor triggers)
      else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor="hover"]')
      ) {
        setIsHovered(true);
        setIsProjectHovered(false);
        setIsHeroTextHovered(false);
        setIsTextHovered(false);
      } else {
        setIsHovered(false);
        setIsProjectHovered(false);
        setIsHeroTextHovered(false);
        setIsTextHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', listener);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (reducedMotion) return null;

  // Determine size of the outer ring
  const getRingSize = () => {
    if (isProjectHovered) return 70;
    if (isHeroTextHovered) return 90;
    if (isTextHovered) return 50;
    if (isHovered) return 40;
    return 24;
  };

  const ringSize = getRingSize();

  return (
    <>
      {/* 1. OUTER SPRING RING */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center border border-[#94A3B8] bg-transparent text-[#0B0D10] font-mono text-[9px] font-bold tracking-widest overflow-hidden"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
          scaleX,
          scaleY,
          rotate: angle,
          mixBlendMode: (isHeroTextHovered || isHovered) && !isProjectHovered ? "difference" : "normal"
        }}
        animate={{
          backgroundColor: isProjectHovered ? '#EAEAF0' : 'rgba(234, 234, 240, 0)',
          borderColor: isProjectHovered ? '#EAEAF0' : isHovered ? '#EAEAF0' : 'rgba(148, 163, 184, 0.4)',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      >
        {isProjectHovered && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[#0B0D10] font-bold tracking-wider"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>

      {/* 2. INNER RESPONSIVE DOT */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#EAEAF0] pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: "difference"
        }}
        animate={{
          scale: isHovered || isProjectHovered || isHeroTextHovered ? 0 : 1,
          opacity: isVisible ? 0.8 : 0
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      />
    </>
  );
};

export default Cursor;