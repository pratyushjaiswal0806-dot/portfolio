import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { Linkedin, Mail, Phone, Github } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-24 bg-[#0B0D10] relative z-20 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#94A3B8]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-[#EAEAF0] mb-8"
        >
          Let's work together.
        </motion.h2>

        <p className="text-[#9AA0B2] text-xl mb-12">
          Have a project in mind? Let's create something extraordinary.
        </p>

        <div className="flex justify-center mb-16">
          <Magnetic strength={0.3}>
            <a
              href="mailto:pratyushjaiswal0806@gmail.com"
              className="inline-block px-10 py-5 bg-[#94A3B8] text-[#0B0D10] text-lg font-bold rounded-full hover:bg-[#CBD5E1] transition-all duration-300 shadow-[0_0_20px_rgba(148,163,184,0.3)] hover:shadow-[0_0_40px_rgba(148,163,184,0.5)] transform hover:-translate-y-1"
              data-cursor="hover"
            >
              Get In Touch
            </a>
          </Magnetic>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#2D3442] pt-12">
          <a href="mailto:pratyushjaiswal0806@gmail.com" className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-[#141821] flex items-center justify-center mb-4 group-hover:bg-[#94A3B8] transition-colors duration-300">
              <Mail className="w-5 h-5 text-[#EAEAF0] group-hover:text-[#0B0D10]" />
            </div>
            <span className="text-[#9AA0B2] group-hover:text-[#EAEAF0] transition-colors text-sm text-center">pratyushjaiswal0806@gmail.com</span>
          </a>

          <a href="https://github.com/pratyushjaiswal0806" target="_blank" rel="noreferrer" className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-[#141821] flex items-center justify-center mb-4 group-hover:bg-[#94A3B8] transition-colors duration-300">
              <Github className="w-5 h-5 text-[#EAEAF0] group-hover:text-[#0B0D10]" />
            </div>
            <span className="text-[#9AA0B2] group-hover:text-[#EAEAF0] transition-colors text-sm">GitHub Profile</span>
          </a>

          <a href="https://www.linkedin.com/in/pratyush-jaiswal-ba0b6926a" target="_blank" rel="noreferrer" className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-[#141821] flex items-center justify-center mb-4 group-hover:bg-[#94A3B8] transition-colors duration-300">
              <Linkedin className="w-5 h-5 text-[#EAEAF0] group-hover:text-[#0B0D10]" />
            </div>
            <span className="text-[#9AA0B2] group-hover:text-[#EAEAF0] transition-colors text-sm">LinkedIn Profile</span>
          </a>

          <a href="tel:+918770953990" className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-[#141821] flex items-center justify-center mb-4 group-hover:bg-[#94A3B8] transition-colors duration-300">
              <Phone className="w-5 h-5 text-[#EAEAF0] group-hover:text-[#0B0D10]" />
            </div>
            <span className="text-[#9AA0B2] group-hover:text-[#EAEAF0] transition-colors text-sm">+91 877 095 3990</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Contact;