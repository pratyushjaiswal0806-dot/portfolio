import React from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUp } from '../ui/motion';

const disciplines = [
  {
    label: 'Interfaces',
    text: 'Figma (or a rough idea) to production React: responsive layouts, reusable components, and every UI state accounted for.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Motion',
    text: 'Springs, scroll-linked reveals and loaders that make an interface feel alive without getting in the way.',
    stack: ['Framer Motion', 'React Spring', 'View Transitions'],
    link: { to: '/lab', label: 'Try the Motion Lab' },
  },
  {
    label: 'Real-time & product',
    text: 'Live flows that stay readable under pressure: queues, match states, leaderboards and registrations.',
    stack: ['Next.js', 'Supabase', 'Node.js'],
  },
];

const WhatIDo: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="what-i-do"
      data-inspect="WhatIDo"
      className="blueprint-section py-20 sm:py-24 md:py-28 px-5 sm:px-6 md:px-12 lg:px-24 bg-panel relative z-20 overflow-hidden"
      aria-label="What I do"
    >
      <div className="absolute inset-0 blueprint-grid-fade pointer-events-none" />
      <div className="absolute -top-40 right-[8%] w-[420px] h-[420px] rounded-full bg-accent/[0.035] blur-[110px] pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="max-w-[1248px] mx-auto relative z-10"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <motion.span variants={fadeUp} className="section-kicker">03 / What I do</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-bold text-ice tracking-tight leading-[1.02]">
              Interfaces that feel<br className="hidden sm:block" /> <span className="text-accent">considered.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="lg:col-span-5 text-[#A8B0C0] text-base md:text-lg leading-relaxed max-w-xl">
            I’m a frontend developer. My work sits where design meets engineering: turning a screen or an idea into something fast, accessible and pleasant to use.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 border-t border-l border-line">
          {disciplines.map((item, index) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="group relative min-h-[240px] p-5 md:p-7 border-r border-b border-line bg-obsidian/35 hover:bg-[#11161D] transition-colors duration-300 flex flex-col"
            >
              <span className="absolute top-0 left-0 h-[2px] w-10 bg-accent/60 transition-all duration-500 group-hover:w-full group-hover:bg-accent" />
              <span className="font-mono text-[9px] text-[#566072] block mb-10">0{index + 1}</span>
              <h3 className="text-ice font-medium text-xl mb-3">{item.label}</h3>
              <p className="text-body leading-relaxed">{item.text}</p>
              <div className="mt-auto pt-6 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 border border-[#252C38] bg-[#11151C] font-mono text-[10px] text-[#A8B0C0]">
                    {tech}
                  </span>
                ))}
              </div>
              {item.link && (
                <Link
                  to={item.link.to}
                  viewTransition
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-accent hover:text-ice transition-colors"
                  data-cursor="hover"
                >
                  {item.link.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-8 flex justify-end">
          <Link
            to="/about#toolkit"
            viewTransition
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-body hover:text-ice transition-colors"
            data-cursor="hover"
          >
            <span className="w-8 h-px bg-accent" />
            The full toolkit and the story behind it
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhatIDo;
