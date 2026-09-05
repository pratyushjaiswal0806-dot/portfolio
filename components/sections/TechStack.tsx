import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PREMIUM_EASE, staggerContainer, fadeUp } from '../ui/motion';

import tsLogo from '../assets/icons8-typescript.svg';
import jsLogo from '../assets/icons8-javascript.svg';
import pyLogo from '../assets/icons8-python.svg';
import javaLogo from '../assets/icons8-java.svg';
import nodeLogo from '../assets/icons8-nodejs.svg';
import reactLogo from '../assets/icons8-react-40.png';
import tailwindLogo from '../assets/icons8-tailwind-css.svg';
import expressLogo from '../assets/icons8-express-js.svg';
import gitLogo from '../assets/icons8-git.svg';
import githubLogo from '../assets/icons8-github.svg';
import figmaLogo from '../assets/figma.svg';
import postmanLogo from '../assets/Postman-Icon--Streamline-Svg-Logos.svg';
import supabaseLogo from '../assets/Supabase-Icon--Streamline-Svg-Logos.svg';
import firebaseLogo from '../assets/icons8-firebase.svg';

interface Technology {
  name: string;
  icon: string;
  color: string;
}

const technologyMap: Record<string, Technology> = {
  TypeScript: { name: 'TypeScript', icon: tsLogo, color: '#3178C6' },
  JavaScript: { name: 'JavaScript', icon: jsLogo, color: '#F7DF1E' },
  Python: { name: 'Python', icon: pyLogo, color: '#3776AB' },
  Java: { name: 'Java', icon: javaLogo, color: '#ED8B00' },
  React: { name: 'React', icon: reactLogo, color: '#61DAFB' },
  Tailwind: { name: 'Tailwind CSS', icon: tailwindLogo, color: '#06B6D4' },
  Node: { name: 'Node.js', icon: nodeLogo, color: '#5FA04E' },
  Express: { name: 'Express', icon: expressLogo, color: '#EAEAF0' },
  Supabase: { name: 'Supabase', icon: supabaseLogo, color: '#3ECF8E' },
  Firebase: { name: 'Firebase', icon: firebaseLogo, color: '#FFCA28' },
  Git: { name: 'Git', icon: gitLogo, color: '#F05032' },
  GitHub: { name: 'GitHub', icon: githubLogo, color: '#EAEAF0' },
  Postman: { name: 'Postman', icon: postmanLogo, color: '#FF6C37' },
  Figma: { name: 'Figma', icon: figmaLogo, color: '#F24E1E' },
};

const coreStack = [
  { ...technologyMap.React, proof: 'Interface systems' },
  { ...technologyMap.TypeScript, proof: 'Typed application logic' },
  { ...technologyMap.Node, proof: 'Services & APIs' },
  { ...technologyMap.Supabase, proof: 'Realtime & data' },
];

const categories = [
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java'] },
  { label: 'Frontend', items: ['React', 'Tailwind'] },
  { label: 'Backend / Data', items: ['Node', 'Express', 'Supabase', 'Firebase'] },
  { label: 'Workflow', items: ['Git', 'GitHub', 'Postman', 'Figma'] },
];

const TechStack: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="tech-stack"
      className="blueprint-section py-20 sm:py-24 md:py-28 px-5 sm:px-6 md:px-12 lg:px-24 bg-[#0D1015] relative z-20 overflow-hidden"
      aria-label="Tech Stack and Tools"
    >
      <div className="absolute inset-0 blueprint-grid-fade pointer-events-none" />
      <div className="absolute -top-40 right-[8%] w-[420px] h-[420px] rounded-full bg-[#94A3B8]/[0.035] blur-[110px] pointer-events-none" />

      <div className="max-w-[1248px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: PREMIUM_EASE }}
              className="section-kicker"
            >
              02 / Capabilities
            </motion.span>
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08, ease: PREMIUM_EASE }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#EAEAF0] tracking-tight leading-[1.02]"
            >
              The stack behind<br className="hidden sm:block" /> <span className="text-[#94A3B8]">the work.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16, ease: PREMIUM_EASE }}
            className="lg:col-span-5 lg:pb-1"
          >
            <p className="text-[#A8B0C0] text-base md:text-lg leading-relaxed max-w-xl">
              A practical toolkit for building responsive interfaces, realtime products, and developer-focused experiences.
            </p>
            <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#667085]">
              <span className="w-8 h-px bg-[#94A3B8]" />
              <span>14 tools / used in projects</span>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 border border-[#2D3442] bg-[#0B0D10]/80 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="lg:col-span-5 p-4 sm:p-7 md:p-9 border-b lg:border-b-0 lg:border-r border-[#2D3442] relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-36 h-36 tech-radar opacity-40 pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-4 mb-5 sm:mb-7">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#667085]">System / Primary</p>
                <h3 className="text-xl font-semibold text-[#EAEAF0] mt-2">Core stack</h3>
              </div>
              <span className="font-mono text-[10px] text-[#94A3B8] border border-[#2D3442] px-2.5 py-1">04 ACTIVE</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {coreStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  variants={fadeUp}
                  className="group relative min-h-[126px] sm:min-h-36 border border-[#252C38] bg-[#11151C] p-3 sm:p-4 flex flex-col justify-between overflow-hidden transition-colors duration-300 hover:border-[#526175]"
                >
                  <span className="absolute top-0 left-0 h-[2px] w-10 transition-all duration-500 group-hover:w-full" style={{ backgroundColor: tech.color }} />
                  <div className="flex items-start justify-between gap-3">
                    <img src={tech.icon} alt="" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" aria-hidden="true" />
                    <span className="font-mono text-[9px] text-[#555F70]">0{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-[#EAEAF0] font-medium">{tech.name}</p>
                    <p className="text-[#7F899B] text-[11px] sm:text-xs mt-1.5 leading-snug">{tech.proof}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-[#252C38] flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.5)] shrink-0" />
              <p className="text-xs leading-relaxed text-[#7F899B]">
                Used across realtime competition flows, production UI work, and local-first developer tooling.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="lg:col-span-7"
          >
            <div className="px-5 sm:px-7 md:px-9 py-5 border-b border-[#2D3442] flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#667085]">Index / Ecosystem</p>
                <h3 className="text-lg font-medium text-[#EAEAF0] mt-1.5">Tools by discipline</h3>
              </div>
              <span className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.16em] text-[#555F70]">Hover to inspect</span>
            </div>

            <div className="divide-y divide-[#252C38]">
              {categories.map((category, categoryIndex) => (
                <motion.div
                  key={category.label}
                  variants={fadeUp}
                  className="grid md:grid-cols-[150px_1fr]"
                >
                  <div className="px-4 sm:px-7 py-3.5 md:py-6 bg-[#10141A]/70 md:border-r border-[#252C38] flex md:block items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-[#94A3B8]">{category.label}</p>
                    <span className="font-mono text-[9px] text-[#4E5869] md:block md:mt-3">0{categoryIndex + 1}</span>
                  </div>

                  <div className={`grid ${category.items.length === 2 ? 'grid-cols-2' : 'grid-cols-4 md:grid-cols-2 xl:grid-cols-4'} gap-px bg-[#252C38]`}>
                    {category.items.map((key) => {
                      const tech = technologyMap[key];
                      return (
                        <div
                          key={tech.name}
                            className="group min-h-[78px] sm:min-h-[92px] bg-[#0D1015] px-1.5 sm:px-3 py-3 sm:py-4 flex flex-col justify-center items-center text-center gap-2 transition-colors duration-300 hover:bg-[#141922]"
                        >
                          <img
                            src={tech.icon}
                            alt=""
                            aria-hidden="true"
                              className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                              style={{ filter: `${tech.name === 'Express' || tech.name === 'GitHub' ? 'invert(1) ' : ''}drop-shadow(0 0 10px ${tech.color}18)` }}
                          />
                            <span className="text-[10px] sm:text-xs text-[#A8B0C0] group-hover:text-[#EAEAF0] transition-colors leading-tight">{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
