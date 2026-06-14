import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { PREMIUM_EASE } from '../ui/motion';

const focusAreas = [
  {
    label: 'Frontend Systems',
    text: 'Translating product ideas and Figma screens into responsive React interfaces with clear states and reusable components.'
  },
  {
    label: 'Real-time Products',
    text: 'Designing live flows that stay understandable under pressure, from queues and match states to leaderboard views.'
  },
  {
    label: 'Developer Tools',
    text: 'Building practical utilities that reduce friction, expose tradeoffs, and keep important technical details visible.'
  }
];

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 70]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.06]);

  // Animation Variants for Content
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: PREMIUM_EASE
      }
    }
  };

  return (
    <section id="about" ref={containerRef} className="py-28 md:py-32 px-6 md:px-24 bg-[#0B0D10] relative z-20 overflow-hidden" aria-label="About Pratyush Jaiswal">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#EAEAF0 1px, transparent 1px), linear-gradient(90deg, #EAEAF0 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="pt-2"
        >
          <motion.span
            variants={itemVariants}
            className="text-[#94A3B8] font-bold uppercase tracking-widest text-sm mb-6 block"
          >
            How I Build
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#EAEAF0] mb-8 leading-tight tracking-tight"
          >
            I turn rough ideas into <span className="text-[#94A3B8]">working software</span> people can use.
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#9AA0B2] text-lg md:text-xl leading-relaxed max-w-3xl">
            I am a Computer Science student at RVITM Bangalore focused on frontend engineering, real-time web apps, and developer tools. I like taking messy requirements, finding the core user flow, and shipping interfaces that feel clear under real use.
          </motion.p>

          <div className="mt-10 grid gap-4">
            {focusAreas.map((area) => (
              <motion.div
                key={area.label}
                variants={itemVariants}
                className="group border-l border-[#2D3442] pl-5 py-1"
              >
                <h3 className="text-[#EAEAF0] font-medium text-lg mb-2 group-hover:text-white transition-colors">
                  {area.label}
                </h3>
                <p className="text-[#9AA0B2] leading-relaxed">
                  {area.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 border-l-2 border-[#94A3B8]/30 bg-[#141821]/50 backdrop-blur-sm relative overflow-hidden"
          >
            <p className="text-[#EAEAF0] relative z-10">
              Build the smallest useful version, test it honestly, then improve what matters.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: PREMIUM_EASE }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#94A3B8] origin-left"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
