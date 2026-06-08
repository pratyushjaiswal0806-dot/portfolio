import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import pratyushImage from '../assets/pratyush.jpg';
import { blurReveal, PREMIUM_EASE } from '../ui/motion';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // More pronounced parallax effect (wider range)
  const y = useTransform(scrollYProgress, [0, 1], [-60, 150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12]);

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
    <section id="about" ref={containerRef} className="py-32 px-6 md:px-24 bg-[#0B0D10] relative z-20 overflow-hidden" aria-label="About Pratyush Jaiswal">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Image Side - Parallax + Hover Scale */}
        <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-[#2D3442]/30 group">
          <motion.div style={{ scale, y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <motion.img
              src={pratyushImage}
              alt="Pratyush Jaiswal — Computer Science student and software developer at RVITM Bangalore"
              className="w-full h-full object-cover opacity-90 transition-all duration-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: PREMIUM_EASE }}
              loading="lazy"
              width="800"
              height="1000"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] to-transparent opacity-60 pointer-events-none"></div>
        </div>

        {/* Content Side - Staggered progressive reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
        >
          <motion.span
            variants={itemVariants}
            className="text-[#94A3B8] font-bold uppercase tracking-widest text-sm mb-6 block"
          >
            About Pratyush Jaiswal
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-[#EAEAF0] mb-8 leading-tight"
          >
            I don't just write code — I <span className="text-[#94A3B8]">build things</span> that matter.
          </motion.h2>

          <div className="space-y-6 text-[#9AA0B2] text-lg leading-relaxed">
            <motion.p variants={itemVariants}>
              Pratyush Jaiswal is a Computer Science student at R V Institute of Technology and Management, Bangalore (2025–2029), driven by genuine curiosity about how software shapes the world.
            </motion.p>
            <motion.p variants={itemVariants}>
              From data structures and algorithms to full-stack web development, Pratyush enjoys diving deep into problems and coming out with solutions that actually work — using React, TypeScript, Python, and Supabase.
            </motion.p>
            <motion.p variants={itemVariants}>
              When not coding, Pratyush is exploring new frameworks, contributing to open-source projects, or finding better ways to learn and share knowledge.
            </motion.p>
          </div>

          {/* Quote Block with horizontal expansion line */}
          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 border-l-2 border-[#94A3B8]/20 bg-[#141821]/50 backdrop-blur-sm relative overflow-hidden"
          >
            <p className="text-[#EAEAF0] italic relative z-10">
              "The best way to learn is to build, break, and build again."
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