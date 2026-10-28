import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** A marquee that speeds up, reverses and skews with your scroll velocity. */
const Row: React.FC<{ children: string; baseVelocity: number }> = ({ children, baseVelocity }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) direction.current = -1;
    else if (velocityFactor.get() > 0) direction.current = 1;
    moveBy += direction.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div className="flex whitespace-nowrap font-display font-bold uppercase tracking-tighter text-5xl sm:text-7xl md:text-8xl text-line" style={{ x, skewX }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="block mr-12">{children}</span>
        ))}
      </motion.div>
    </div>
  );
};

const VelocityMarquee: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="py-16 md:py-20 border-t border-line/70 overflow-hidden" aria-hidden="true">
      {shouldReduceMotion ? (
        <p className="font-display font-bold uppercase tracking-tighter text-5xl md:text-7xl text-line whitespace-nowrap">Springs · curves · gestures</p>
      ) : (
        <div className="flex flex-col gap-6">
          <Row baseVelocity={-2}>Springs · curves · gestures ·</Row>
          <Row baseVelocity={2}>Stagger · layout · transitions ·</Row>
        </div>
      )}
      <p className="mt-6 text-sm text-dim">Scroll faster and the type speeds up, reverses and leans with you.</p>
    </div>
  );
};

export default VelocityMarquee;
