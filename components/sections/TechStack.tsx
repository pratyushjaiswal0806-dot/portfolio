import React from 'react';
import { motion } from 'framer-motion';
import OrbitingCirclesGlobeDemo from '../ui/orbiting-circles-02';
import { PREMIUM_EASE } from '../ui/motion';

const TechStack: React.FC = () => {
  return (
    <section
      id="tech-stack"
      className="py-28 md:py-36 px-6 md:px-24 bg-[#0B0D10] relative z-20 overflow-hidden"
      aria-label="Tech Stack and Tools"
    >
      {/* Background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header matching Contact/About/Projects style */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: PREMIUM_EASE }}
            className="inline-block text-sm font-bold uppercase tracking-widest text-[#94A3B8] mb-6"
          >
            Capabilities & Ecosystem
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: PREMIUM_EASE }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#EAEAF0] mb-6 tracking-tight"
          >
            Tech Stack & <span className="text-[#94A3B8]">Tools</span>.
          </motion.h2>
        </div>

        {/* Orbiting Circles Globe Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: PREMIUM_EASE }}
          className="w-full flex justify-center items-center py-4"
        >
          <OrbitingCirclesGlobeDemo />
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
