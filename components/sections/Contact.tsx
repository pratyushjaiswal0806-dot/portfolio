import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { Linkedin, Mail, Phone, Github, FileDown, Check } from 'lucide-react';
import { PREMIUM_EASE, staggerContainer, fadeUp } from '../ui/motion';

const channels = [
  { icon: Mail, label: 'Email', value: 'pratyushjaiswal0806@gmail.com', href: 'mailto:pratyushjaiswal0806@gmail.com', external: false },
  { icon: Github, label: 'GitHub', value: '@pratyushjaiswal0806-dot', href: 'https://github.com/pratyushjaiswal0806-dot', external: true },
  { icon: Linkedin, label: 'LinkedIn', value: 'Pratyush Jaiswal', href: 'https://www.linkedin.com/in/pratyush-jaiswal-ba0b6926a', external: true },
  { icon: Phone, label: 'Phone', value: '+91 877 095 3990', href: 'tel:+918770953990', external: false },
];

const resumeHref = '/Pratyush.Jaiswal.pdf';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]);

  const handleCopy = (e: React.MouseEvent, label: string, value: string) => {
    if (label === 'Email' || label === 'Phone') {
      const copyVal = label === 'Phone' ? value.replace(/\s+/g, '') : value;
      navigator.clipboard?.writeText(copyVal);
      setCopiedLabel(label);
      setTimeout(() => setCopiedLabel(null), 2200);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="blueprint-section py-20 sm:py-24 md:py-28 px-5 sm:px-6 md:px-12 lg:px-24 bg-[#0B0D10] relative z-20 overflow-hidden"
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
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
          className="section-kicker"
        >
          05 / Contact
        </motion.span>

        {/* Heading with Animated SVG Water Displacement Filter */}
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: PREMIUM_EASE }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#EAEAF0] mb-6 tracking-tight"
        >
          Let's work <span className="text-[#94A3B8]">together</span>.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: PREMIUM_EASE }}
          className="text-[#9AA0B2] text-base sm:text-lg md:text-xl mb-10 sm:mb-14 max-w-lg mx-auto leading-relaxed font-light"
        >
          Have a project, internship, or frontend role in mind? Let's connect.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: PREMIUM_EASE }}
          className="flex justify-center mb-14 sm:mb-20"
        >
          <Magnetic strength={0.25}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="mailto:pratyushjaiswal0806@gmail.com"
                className="group relative inline-flex justify-center items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#EAEAF0] text-[#0B0D10] text-sm sm:text-base font-mono tracking-wider uppercase font-bold rounded-sm hover:bg-white active:bg-white active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(148,163,184,0.1)] hover:shadow-[0_0_30px_rgba(148,163,184,0.25)]"
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
                className="inline-flex justify-center items-center gap-3 px-8 py-4 sm:py-5 border border-[#2D3442] text-[#EAEAF0] text-sm sm:text-base font-mono tracking-wider uppercase font-bold rounded-sm hover:border-[#94A3B8] hover:text-white active:scale-[0.98] active:border-[#94A3B8] transition-all duration-300"
                data-cursor="hover"
              >
                Resume
                <FileDown className="w-4 h-4 text-[#94A3B8]" />
              </a>
            </div>
          </Magnetic>
        </motion.div>

        {/* Divider */}
        <div className="relative mb-16 sm:mb-20">
          <div className="h-px bg-gradient-to-r from-transparent via-[#2D3442]/60 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#2D3442]" />
        </div>

        {/* Contact Channels */}
        <motion.div
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[#2D3442]"
        >
          {channels.map((item) => (
            <motion.a
              key={item.label}
              variants={fadeUp}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              onClick={(e) => handleCopy(e, item.label, item.value)}
              className="min-h-[160px] md:min-h-[180px] p-3 sm:p-5 border-r border-b border-[#2D3442] bg-[#0D1015]/60 flex flex-col items-center justify-center text-center group hover:bg-[#141922] active:bg-[#181F2B] active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#94A3B8]"
            >
              <div className="w-12 h-12 bg-[#141821]/80 border border-[#2D3442]/80 flex items-center justify-center mb-4 group-hover:bg-[#EAEAF0] group-hover:border-transparent group-hover:shadow-[0_0_24px_rgba(148,163,184,0.15)] group-active:scale-95 transition-all duration-300">
                <item.icon className="w-5 h-5 text-[#94A3B8] group-hover:text-[#0B0D10] transition-colors duration-300" />
              </div>
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-1.5">
                {item.label}
              </span>
              <span className="text-[#667085] group-hover:text-[#EAEAF0] transition-colors text-[11px] font-mono tracking-wide leading-relaxed max-w-full break-all">
                {item.value}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Copy Notification Toast */}
        <AnimatePresence>
          {copiedLabel && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#141821]/95 backdrop-blur-md border border-[#3E4756] text-[#EAEAF0] text-xs font-mono rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2 pointer-events-none"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied {copiedLabel} to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Contact;
