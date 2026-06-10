import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Magnetic from '../ui/Magnetic';
import { Linkedin, Mail, Phone, Github, FileDown } from 'lucide-react';
import { PREMIUM_EASE, staggerContainer, fadeUp } from '../ui/motion';

const channels = [
  { icon: Mail, label: 'Email', value: 'pratyushjaiswal0806@gmail.com', href: 'mailto:pratyushjaiswal0806@gmail.com', external: false },
  { icon: Github, label: 'GitHub', value: '@pratyushjaiswal0806-dot', href: 'https://github.com/pratyushjaiswal0806-dot', external: true },
  { icon: Linkedin, label: 'LinkedIn', value: 'Pratyush Jaiswal', href: 'https://www.linkedin.com/in/pratyush-jaiswal-ba0b6926a', external: true },
  { icon: Phone, label: 'Phone', value: '+91 877 095 3990', href: 'tel:+918770953990', external: false },
];

const resumeHref = '/Pratyush-Jaiswal-Resume.md';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-6 md:px-24 bg-[#0B0D10] relative z-20 overflow-hidden"
      aria-label="Contact Pratyush Jaiswal"
    >
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#EAEAF0 1px, transparent 1px), linear-gradient(90deg, #EAEAF0 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top/bottom fade mask on grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0B0D10, transparent 15%, transparent 85%, #0B0D10)',
        }}
      />

      {/* Center radial glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.06)_0%,transparent_70%)]" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        {/* Section Label */}
        <motion.span
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
          className="inline-block text-sm font-bold uppercase tracking-widest text-[#94A3B8] mb-6"
        >
          Contact
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: PREMIUM_EASE }}
          className="text-5xl md:text-7xl font-bold text-[#EAEAF0] mb-6 tracking-tight"
        >
          Let's work <span className="text-[#94A3B8]">together</span>.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: PREMIUM_EASE }}
          className="text-[#9AA0B2] text-lg md:text-xl mb-14 max-w-lg mx-auto leading-relaxed font-light"
        >
          Have a project, internship, or frontend role in mind? Let's connect.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: PREMIUM_EASE }}
          className="flex justify-center mb-20"
        >
          <Magnetic strength={0.25}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="mailto:pratyushjaiswal0806@gmail.com"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[#EAEAF0] text-[#0B0D10] text-base font-mono tracking-wider uppercase font-bold rounded-sm hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(148,163,184,0.1)] hover:shadow-[0_0_30px_rgba(148,163,184,0.25)]"
                data-cursor="hover"
              >
                GET IN TOUCH
                <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300">
                  <svg className="w-4 h-4 -ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a
                href={resumeHref}
                download
                className="inline-flex items-center gap-3 px-8 py-5 border border-[#2D3442] text-[#EAEAF0] text-base font-mono tracking-wider uppercase font-bold rounded-sm hover:border-[#94A3B8] hover:text-white transition-all duration-300"
                data-cursor="hover"
              >
                Resume
                <FileDown className="w-4 h-4 text-[#94A3B8]" />
              </a>
            </div>
          </Magnetic>
        </motion.div>

        {/* Divider */}
        <div className="relative mb-20">
          <div className="h-px bg-gradient-to-r from-transparent via-[#2D3442]/60 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#2D3442]" />
        </div>

        {/* Contact Channels */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
        >
          {channels.map((item) => (
            <motion.a
              key={item.label}
              variants={fadeUp}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-[#141821]/80 border border-[#2D3442]/80 flex items-center justify-center mb-4 group-hover:bg-[#EAEAF0] group-hover:border-transparent group-hover:shadow-[0_0_24px_rgba(148,163,184,0.15)] transition-all duration-500">
                <item.icon className="w-5 h-5 text-[#94A3B8] group-hover:text-[#0B0D10] transition-colors duration-500" />
              </div>
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-1.5">
                {item.label}
              </span>
              <span className="text-[#555A6B] group-hover:text-[#EAEAF0] transition-colors text-xs font-mono tracking-wide leading-relaxed max-w-[180px] truncate">
                {item.value}
              </span>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
