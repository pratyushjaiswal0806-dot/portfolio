import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isHeroTextHovered, setIsHeroTextHovered] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Velocity tracking for dynamic scaling
  const velocityX = useVelocity(cursorX);
  const velocityY = useVelocity(cursorY);
  
  // Transform velocity into a "squeeze" factor (0 to 1 range approx)
  // High velocity = smaller scale
  const velocityScaleRaw = useTransform<number, number>(
    [velocityX, velocityY],
    ([latestX, latestY]) => {
      const magnitude = Math.sqrt(Math.pow(latestX, 2) + Math.pow(latestY, 2));
      // Map 0-3000 velocity to a 1 -> 0.6 scale factor
      return Math.max(0.6, 1 - Math.min(magnitude / 4000, 0.4));
    }
  );

  const velocityScale = useSpring(velocityScaleRaw, { damping: 50, stiffness: 400 });

  const springConfig = { damping: 30, stiffness: 700, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for Hero Text (Highest Priority)
      if (target.closest('[data-cursor="hero-text"]')) {
        setIsHeroTextHovered(true);
        setIsTextHovered(false);
        setIsHovered(false);
      }
      // Check for generic text hover (Secondary Priority)
      else if (target.closest('[data-cursor="text-hover"]')) {
        setIsTextHovered(true);
        setIsHeroTextHovered(false);
        setIsHovered(false);
      } 
      // Check for standard interactive elements
      else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor="hover"]')
      ) {
        setIsHovered(true);
        setIsTextHovered(false);
        setIsHeroTextHovered(false);
      } else {
        setIsHovered(false);
        setIsTextHovered(false);
        setIsHeroTextHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Determine cursor base appearance
  const getCursorStyles = () => {
    if (isHeroTextHovered) {
      return {
        baseScale: 6, 
        backgroundColor: "#EAEAF0", 
        mixBlendMode: "difference" as any,
        blur: "blur(0px)", // Sharp edges restored
        opacity: 1 // Full opacity restored
      };
    }
    if (isTextHovered) {
      return {
        baseScale: 4,
        backgroundColor: "rgba(148, 163, 184, 0.15)",
        mixBlendMode: "normal" as any,
        blur: "blur(2px)",
        opacity: 1
      };
    }
    if (isHovered) {
      return {
        baseScale: 3.5,
        backgroundColor: "#94A3B8",
        mixBlendMode: "difference" as any,
        blur: "blur(0px)",
        opacity: 0.8
      };
    }
    return {
      baseScale: 1,
      backgroundColor: "#94A3B8",
      mixBlendMode: "difference" as any,
      blur: "blur(0px)",
      opacity: 0.6
    };
  };

  const styles = getCursorStyles();

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999]" 
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        scale: useTransform(velocityScale, (v) => v * styles.baseScale), 
      }}
      animate={{
        opacity: styles.opacity,
        backgroundColor: styles.backgroundColor,
        mixBlendMode: styles.mixBlendMode,
        filter: styles.blur
      }}
      transition={{ duration: 0.3, ease: "easeOut" }} 
    />
  );
};

export default Cursor;