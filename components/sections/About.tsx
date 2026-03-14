import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // More pronounced parallax effect (wider range)
  const y = useTransform(scrollYProgress, [0, 1], [-50, 200]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);

  // Animation Variants for Content
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] // Custom "Mechanical" ease
      }
    }
  };

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 md:px-24 bg-[#0B0D10] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Image Side - Pronounced Parallax */}
        <div className="relative h-[600px] w-full overflow-hidden rounded-2xl">
          <motion.div style={{ scale, y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <img
              src="https://picsum.photos/800/1000?grayscale"
              alt="Abstract Design"
              className="w-full h-full object-cover opacity-60"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] to-transparent opacity-60"></div>
        </div>

        {/* Content Side - Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
        >
          <motion.span
            variants={itemVariants}
            className="text-[#94A3B8] font-bold uppercase tracking-widest text-sm mb-6 block"
          >
            About Me
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-[#EAEAF0] mb-8 leading-tight"
          >
            I don't just write code — I <span className="text-[#94A3B8]">build things</span> that matter.
          </motion.h2>

          <div className="space-y-6 text-[#9AA0B2] text-lg leading-relaxed">
            <motion.p variants={itemVariants}>
              I'm a Computer Science student at R V Institute of Technology and Management (2025-2029), driven by genuine curiosity about how software shapes the world.
            </motion.p>
            <motion.p variants={itemVariants}>
              From data structures and algorithms to full-stack web development, I enjoy diving deep into problems and coming out with solutions that actually work. I build with React, TypeScript, Python, and whatever else the problem demands.
            </motion.p>
            <motion.p variants={itemVariants}>
              When I'm not coding, I'm exploring new frameworks, contributing to open-source projects, or finding better ways to learn and share knowledge.
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 border-l-2 border-[#94A3B8] bg-[#141821]/50 backdrop-blur-sm"
          >
            <p className="text-[#EAEAF0] italic">
              "The best way to learn is to build, break, and build again."
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;