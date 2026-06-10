import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, ExternalLink, FileDown } from 'lucide-react';
import { PREMIUM_EASE, fadeUp } from '../ui/motion';

const Footer: React.FC = () => {
  const resumeHref = '/Pratyush-Jaiswal-Resume.md';
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0D10] relative z-20">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#2D3442] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-24 py-16">

        {/* Status + Brand Row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16"
        >
          <div className="flex items-center gap-6">
            <div className="text-[#EAEAF0] font-bold text-3xl tracking-tight">
              PJ<span className="text-[#94A3B8]">.</span>
            </div>
            <div className="h-8 w-px bg-[#2D3442]" />
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">
                Available for work
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-5 py-2.5 bg-[#141821] border border-[#2D3442] rounded-full hover:border-[#94A3B8]/50 transition-all duration-300"
            data-cursor="hover"
            aria-label="Back to top"
          >
            <span className="text-[10px] font-mono text-[#555A6B] group-hover:text-[#94A3B8] transition-colors uppercase tracking-widest">
              Back to top
            </span>
            <ArrowUp className="w-3.5 h-3.5 text-[#555A6B] group-hover:text-[#EAEAF0] group-hover:-translate-y-0.5 transition-all" />
          </button>
        </motion.div>

        {/* Main Grid: Nav + Socials + Contact */}
        <motion.div
          variants={fadeUp}
          custom={{ delay: 0.1 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-8 mb-16 pb-16 border-b border-[#2D3442]/50"
        >
          {/* Navigate */}
          <div>
            <h4 className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-5">Navigate</h4>
            <div className="flex flex-col gap-3">
              {['Skills', 'Projects', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[#555A6B] hover:text-[#EAEAF0] transition-colors text-sm inline-flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-[#94A3B8] transition-all duration-300" />
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-5">Connect</h4>
            <div className="flex flex-col gap-3">
              <a href="https://github.com/pratyushjaiswal0806-dot" target="_blank" rel="noreferrer" className="text-[#555A6B] hover:text-[#EAEAF0] transition-colors text-sm flex items-center gap-2 group">
                <Github size={14} className="group-hover:text-[#EAEAF0] transition-colors" />
                GitHub
                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://www.linkedin.com/in/pratyush-jaiswal-ba0b6926a" target="_blank" rel="noreferrer" className="text-[#555A6B] hover:text-[#EAEAF0] transition-colors text-sm flex items-center gap-2 group">
                <Linkedin size={14} className="group-hover:text-[#EAEAF0] transition-colors" />
                LinkedIn
                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="mailto:pratyushjaiswal0806@gmail.com" className="text-[#555A6B] hover:text-[#EAEAF0] transition-colors text-sm flex items-center gap-2 group">
                <Mail size={14} className="group-hover:text-[#EAEAF0] transition-colors" />
                Email
                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href={resumeHref} download className="text-[#555A6B] hover:text-[#EAEAF0] transition-colors text-sm flex items-center gap-2 group">
                <FileDown size={14} className="group-hover:text-[#EAEAF0] transition-colors" />
                Resume
              </a>
            </div>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-5">Get in touch</h4>
            <a href="mailto:pratyushjaiswal0806@gmail.com" className="text-[#555A6B] hover:text-[#EAEAF0] transition-colors text-sm break-all leading-relaxed">
              pratyushjaiswal0806@gmail.com
            </a>
            <p className="text-[#555A6B]/60 text-xs mt-4 font-mono">
              UTC+5:30 · India
            </p>
          </div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: PREMIUM_EASE }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-[#555A6B] text-xs font-mono">
            © {new Date().getFullYear()} Pratyush Jaiswal.
          </p>
          <span className="text-[10px] text-[#555A6B]/50 font-mono tracking-wide">
            Built with React · Tailwind · Framer Motion
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
