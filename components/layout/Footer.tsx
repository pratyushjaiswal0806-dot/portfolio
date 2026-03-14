import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0D10] py-16 border-t border-[#2D3442] relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-24">

        {/* Top Row: Branding + Back to Top */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="text-[#EAEAF0] font-bold text-2xl tracking-tight mb-2">
              PJ<span className="text-[#94A3B8]">.</span>
            </div>
            <p className="text-[#555A6B] text-sm max-w-xs">
              CSE student at RVITM. Building, learning, and shipping — one project at a time.
            </p>
          </div>
          <button
            onClick={scrollToTop}
            className="group p-3 bg-[#141821] border border-[#2D3442] rounded-full hover:border-[#94A3B8] transition-all duration-300"
            data-cursor="hover"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-[#555A6B] group-hover:text-[#EAEAF0] group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>

        {/* Middle Row: Quick Links + Socials */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-[#2D3442]/50">
          <div>
            <h4 className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-4">Navigate</h4>
            <div className="flex flex-col gap-3">
              {['Skills', 'Projects', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[#555A6B] hover:text-[#EAEAF0] transition-colors text-sm"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-4">Connect</h4>
            <div className="flex flex-col gap-3">
              <a href="https://github.com/pratyushjaiswal0806" target="_blank" rel="noreferrer" className="text-[#555A6B] hover:text-[#EAEAF0] transition-colors text-sm flex items-center gap-2">
                <Github size={14} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/pratyush-jaiswal-ba0b6926a" target="_blank" rel="noreferrer" className="text-[#555A6B] hover:text-[#EAEAF0] transition-colors text-sm flex items-center gap-2">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href="mailto:pratyushjaiswal0806@gmail.com" className="text-[#555A6B] hover:text-[#EAEAF0] transition-colors text-sm flex items-center gap-2">
                <Mail size={14} /> Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-[#555A6B] text-sm">
            © {new Date().getFullYear()} Pratyush Jaiswal. All rights reserved.
          </p>
          <span className="text-xs text-[#555A6B]/70">
            Built with React, Tailwind & Framer Motion
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;