import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue, useReducedMotion } from 'framer-motion';
import { Project } from '../../types';
import { X, ArrowRight, ExternalLink } from 'lucide-react';
import techTokenImage from '../assets/tech-token-heist.png';
import fancallImage from '../assets/fancall.png';
import promptcompilerImage from '../assets/promptcompiler.png';
import { PREMIUM_EASE } from '../ui/motion';

const projects: Project[] = [
  {
    id: '1',
    title: 'Tech Token Heist',
    category: 'Web Application',
    description: 'Real-time gamified matchmaking platform for an inter-college tech competition with team queues, token economy flows, domain selection, gameplay phases, and a live leaderboard.',
    role: 'Built the React interface, Supabase-backed real-time flows, matchmaking screens, gameplay state views, and leaderboard experience.',
    challenge: 'The core challenge was keeping fast-moving game state understandable for many teams at once without making the interface feel chaotic.',
    impact: 'Created a competition-ready product structure that can support up to 24 teams, phase-specific rules, and live event operations.',
    image: techTokenImage,
    year: '2024',
    details: ['Supabase real-time channels', 'Queue and match state flows', 'Leaderboard and token views'],
    tech: ['React', 'Supabase', 'Real-time'],
    link: 'https://tech-toke-nheist.vercel.app/'
  },
  {
    id: '2',
    title: 'Fancall Frontend Development',
    category: 'Frontend Development',
    description: 'Production frontend implementation for a celebrity-fan engagement platform, translating detailed Figma screens into responsive React interfaces.',
    role: 'Converted design files into reusable React components, handled responsive layouts, and prepared UI states for backend integration.',
    challenge: 'The main constraint was matching polished visual details while keeping components scalable across desktop, tablet, and mobile screens.',
    impact: 'Delivered NDA-safe frontend work with consistent layouts, cleaner component reuse, and production-focused interaction states.',
    image: fancallImage,
    year: '2024',
    details: ['Figma to React', 'Responsive Layout', 'Performance Optimization'],
    tech: ['React', 'TypeScript', 'Tailwind'],
    nda: true
  },
  {
    id: '3',
    title: 'PromptCompiler',
    category: 'Developer Tool',
    description: 'Local-first workbench for analyzing and reducing LLM prompt size while preserving important facts such as IDs, dates, URLs, and constraints.',
    role: 'Built the prompt inspection workflow, deterministic reduction logic, fact-preservation checks, and optional NVIDIA NIM-assisted summarization path.',
    challenge: 'Prompt compression can easily delete useful context, so the interface needed to show what changed and protect critical details.',
    impact: 'Gives developers a local tool for reducing prompt waste before sending content to an LLM, with offline deterministic behavior by default.',
    image: promptcompilerImage,
    year: '2025',
    details: ['Token Analysis', 'Offline & Deterministic', 'NVIDIA NIM Integration'],
    tech: ['React', 'TypeScript', 'LLM'],
    link: 'https://github.com/pratyushjaiswal0806-dot/promp-t.git'
  }
];

const Projects: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  // Transform that moves the project list horizontally
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const useStaticProjectList = isMobile || shouldReduceMotion;

  const springTransition = { type: 'spring', stiffness: 220, damping: 26 };

  return (
    <section id="projects" className={`relative bg-[#0B0D10] ${selectedId ? 'z-[60]' : 'z-20'}`} aria-label="Selected Projects by Pratyush Jaiswal">
      <div ref={targetRef} className={useStaticProjectList ? "relative px-6 py-24" : "h-[300vh] relative"}>
        <div className={useStaticProjectList ? "max-w-7xl mx-auto" : "sticky top-0 h-screen overflow-hidden flex flex-col justify-center"}>

          <div className={useStaticProjectList ? "mb-8" : "px-6 md:px-24 mb-8"}>
            <h2 className="text-4xl md:text-6xl font-bold text-[#EAEAF0]">Selected Works by <span className="text-[#94A3B8]">Pratyush Jaiswal</span></h2>
          </div>

          <motion.div
            style={useStaticProjectList ? undefined : { x }}
            className={useStaticProjectList ? "grid grid-cols-1 gap-6" : "flex gap-12 px-6 md:px-24 w-max items-center"}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                scrollYProgress={scrollYProgress}
                total={projects.length}
                setSelectedId={setSelectedId}
                disableMotion={useStaticProjectList}
              />
            ))}
          </motion.div>

          {/* Progress Bar */}
          {!useStaticProjectList && <div className="absolute bottom-10 left-6 md:left-24 right-6 md:right-24 h-[1px] bg-[#2D3442] mt-12">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full bg-[#94A3B8]"
            />
          </div>}
        </div>
      </div>

      {/* Expanded Project View (Modal with shared spring transition) */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {projects.filter(p => p.id === selectedId).map(project => (
              <motion.div
                key={project.id}
                layoutId={`card-container-${project.id}`}
                transition={springTransition}
                className="relative w-full max-w-5xl max-h-[90vh] bg-[#141821] rounded-2xl border border-[#2D3442] z-10 shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Fixed Close Button */}
                <div className="absolute top-4 right-4 z-50">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                    className="p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-md border border-white/10 shadow-lg"
                    aria-label="Close details"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Scrollable Content Container */}
                <div className="w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide">
                  <div className="relative h-[30vh] md:h-[35vh] w-full overflow-hidden">
                    {/* Ken Burns zoom animation */}
                    <motion.img
                      layoutId={`image-${project.id}`}
                      src={project.image}
                      alt={`${project.title} — project by Pratyush Jaiswal`}
                      className="w-full h-full object-cover object-top"
                      animate={{ scale: 1.05 }}
                      transition={{
                        layout: springTransition,
                        scale: { duration: 15, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }
                      }}
                      loading="lazy"
                      width="1200"
                      height="675"
                    />
                  </div>

                  <motion.div
                    className="p-8 md:p-12 bg-[#141821]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="flex-1">
                      <motion.p layoutId={`cat-${project.id}`} transition={springTransition} className="text-[#94A3B8] font-mono text-sm uppercase tracking-widest mb-3">{project.category}</motion.p>
                      <motion.h3 layoutId={`title-${project.id}`} transition={springTransition} className="text-4xl md:text-6xl font-bold text-white tracking-tight">{project.title}</motion.h3>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#EAEAF0] text-[#0B0D10] rounded-full font-medium hover:bg-white transition-colors flex items-center gap-2 text-sm tracking-wide whitespace-nowrap">
                          Live Demo <ExternalLink size={16} />
                        </a>
                      ) : project.nda ? (
                        <span className="px-6 py-3 bg-[#2D3442] text-[#9AA0B2] rounded-full font-medium flex items-center gap-2 text-sm tracking-wide whitespace-nowrap cursor-not-allowed" title="Link unavailable due to Non-Disclosure Agreement">
                          Under NDA
                        </span>
                      ) : (
                        <a href="#" className="px-6 py-3 bg-[#EAEAF0] text-[#0B0D10] rounded-full font-medium hover:bg-white transition-colors flex items-center gap-2 text-sm tracking-wide whitespace-nowrap">
                          Live Demo <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-8 space-y-12">
                      <div>
                        <h4 className="text-[#EAEAF0] font-medium text-xl mb-6 flex items-center gap-3">
                          <span className="w-8 h-[1px] bg-[#94A3B8]"></span>
                          Project Overview
                        </h4>
                        <p className="text-[#9AA0B2] leading-relaxed text-lg font-light">
                          {project.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        {[
                          ['Role', project.role],
                          ['Technical Challenge', project.challenge],
                          ['Result', project.impact]
                        ].map(([label, value]) => (
                          <div key={label} className="border-l border-[#2D3442] pl-5">
                            <h4 className="text-xs font-mono text-[#94A3B8] uppercase tracking-widest mb-2">{label}</h4>
                            <p className="text-[#9AA0B2] leading-relaxed">{value}</p>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h4 className="text-[#EAEAF0] font-medium text-xl mb-6 flex items-center gap-3">
                          <span className="w-8 h-[1px] bg-[#94A3B8]"></span>
                          Key Deliverables
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                          {project.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-[#9AA0B2] group">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#2D3442] group-hover:bg-[#94A3B8] transition-colors" />
                              <span className="group-hover:text-[#EAEAF0] transition-colors">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Sidebar Metadata */}
                    <div className="md:col-span-4">
                      <div className="bg-[#0B0D10] border border-[#2D3442] rounded-xl p-8 space-y-8 sticky top-8">

                        <div>
                          <h4 className="text-xs font-mono text-[#555A6B] uppercase tracking-widest mb-4">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, idx) => (
                              <span key={idx} className="px-3 py-1.5 bg-[#141821] border border-[#2D3442] rounded text-xs text-[#94A3B8] font-mono">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="w-full h-[1px] bg-[#2D3442]"></div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-mono text-[#555A6B] uppercase tracking-widest mb-2">Year</p>
                            <p className="text-[#EAEAF0] text-base font-medium">{project.year}</p>
                          </div>
                          <div>
                            <p className="text-xs font-mono text-[#555A6B] uppercase tracking-widest mb-2">Role</p>
                            <p className="text-[#EAEAF0] text-base font-medium">Design & Dev</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Sub-component to handle per-card scroll transforms
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  scrollYProgress: MotionValue<number>;
  total: number;
  setSelectedId: (id: string) => void;
  disableMotion?: boolean;
}> = ({ project, index, scrollYProgress, total, setSelectedId, disableMotion = false }) => {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;

  const center = start + (step / 2);

  const scale = useTransform(scrollYProgress,
    [start - 0.2, center, end + 0.2],
    [0.94, 1, 0.94]
  );
  const opacity = useTransform(scrollYProgress,
    [start - 0.2, center, end + 0.2],
    [0.4, 1, 0.4]
  );

  const filter = useTransform(scrollYProgress,
    [start - 0.2, center, end + 0.2],
    ["grayscale(100%) blur(4px)", "grayscale(0%) blur(0px)", "grayscale(100%) blur(4px)"]
  );

  const springTransition = { type: 'spring', stiffness: 220, damping: 26 };

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      transition={springTransition}
      onClick={() => setSelectedId(project.id)}
      style={disableMotion ? { scale: 1, opacity: 1, filter: "none" } : { scale, opacity, filter }}
      data-cursor="project-card"
      className="relative w-full md:w-[600px] h-[430px] md:h-[60vh] bg-[#141821] rounded-2xl overflow-hidden cursor-pointer group border border-[#2D3442] flex-shrink-0"
    >
      <motion.img
        layoutId={`image-${project.id}`}
        transition={springTransition}
        src={project.image}
        alt={`${project.title} — a project by Pratyush Jaiswal | ${project.category}`}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        width="800"
        height="600"
      />
      
      {/* Sliding color gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-transparent to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500 z-10" />

      {/* Slide shifting title container */}
      <div className="absolute bottom-0 left-0 p-8 w-full z-20 transform group-hover:-translate-y-1.5 transition-transform duration-500">
        <motion.p layoutId={`cat-${project.id}`} transition={springTransition} className="text-[#94A3B8] text-sm font-bold uppercase tracking-wider mb-2">{project.category}</motion.p>
        <motion.h3 layoutId={`title-${project.id}`} transition={springTransition} className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-white transition-colors">{project.title}</motion.h3>
        <p className="text-[#9AA0B2] line-clamp-2 font-light text-sm md:text-base leading-relaxed">{project.description}</p>
      </div>

      <div className="absolute top-8 right-8 bg-black/30 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10 z-20">
        <ArrowRight className="text-white w-6 h-6 -rotate-45" />
      </div>
    </motion.div>
  );
};

export default Projects;
