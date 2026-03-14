import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import { Project } from '../../types';
import { X, ArrowRight, ExternalLink } from 'lucide-react';

const projects: Project[] = [
  {
    id: '1',
    title: 'SolarFit',
    category: 'Web Development',
    description: 'A responsive website designed in under 10 hours focusing on clean UI and user-centric design for solar energy solutions.',
    image: 'https://picsum.photos/800/600?random=1',
    year: '2024',
    details: ['10 Hour Sprint', 'Responsive Layout', 'Lead Generation Focus'],
    tech: ['React', 'Tailwind', 'Framer Motion']
  },
  {
    id: '2',
    title: 'Lumina Workflow',
    category: 'Productivity Tool',
    description: 'An interface designed to improve user engagement and interaction for workflow management systems.',
    image: 'https://picsum.photos/800/600?random=2',
    year: '2023',
    details: ['Dashboard Design', 'Micro-interactions', 'Dark Mode'],
    tech: ['Next.js', 'Typescript', 'Chart.js']
  },
  {
    id: '3',
    title: 'Pilot',
    category: 'SaaS Platform',
    description: 'Focusing on usability and visual appeal to retain users longer on the website through strategic layout planning.',
    image: 'https://picsum.photos/800/600?random=3',
    year: '2023',
    details: ['B2B Interface', 'Visual Hierarchy', 'Brand Identity'],
    tech: ['React', 'Redux', 'SCSS']
  }
];

const Projects: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Transform that moves the project list horizontally
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="projects" className="relative bg-[#0B0D10] z-20">
      {/* Scroll Trigger Container */}
      <div ref={targetRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

          <div className="px-6 md:px-24 mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-[#EAEAF0]">Selected Works <span className="text-[#94A3B8] text-xl align-top">03</span></h2>
          </div>

          <motion.div style={{ x }} className="flex gap-12 px-6 md:px-24 w-max items-center">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                scrollYProgress={scrollYProgress}
                total={projects.length}
                setSelectedId={setSelectedId}
              />
            ))}
          </motion.div>

          {/* Progress Bar */}
          <div className="absolute bottom-10 left-6 md:left-24 right-6 md:right-24 h-[1px] bg-[#2D3442] mt-12">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full bg-[#94A3B8]"
            />
          </div>
        </div>
      </div>

      {/* Expanded Project View */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {projects.filter(p => p.id === selectedId).map(project => (
              <motion.div
                key={project.id}
                layoutId={`card-container-${project.id}`}
                className="relative w-full max-w-5xl max-h-[90vh] bg-[#141821] rounded-2xl overflow-y-auto overflow-x-hidden scrollbar-hide border border-[#2D3442] z-10 shadow-2xl"
              >
                <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                  <motion.img
                    layoutId={`image-${project.id}`}
                    src={project.image}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                      className="p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <motion.div
                  className="p-8 md:p-12 bg-[#141821]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="flex-1">
                      <motion.p layoutId={`cat-${project.id}`} className="text-[#94A3B8] font-mono text-sm uppercase tracking-widest mb-3">{project.category}</motion.p>
                      <motion.h3 layoutId={`title-${project.id}`} className="text-4xl md:text-6xl font-bold text-white tracking-tight">{project.title}</motion.h3>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <a href="#" className="px-6 py-3 bg-[#EAEAF0] text-[#0B0D10] rounded-full font-medium hover:bg-white transition-colors flex items-center gap-2 text-sm tracking-wide whitespace-nowrap">
                        Live Demo <ExternalLink size={16} />
                      </a>
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
                          <br /><br />
                          This project was conceived with a focus on modularity and scalability. By implementing a component-driven architecture, we ensured that the design system could evolve without technical debt. The interface prioritizes clarity, using whitespace and typographic hierarchy to guide the user's journey.
                        </p>
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
}> = ({ project, index, scrollYProgress, total, setSelectedId }) => {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;

  const center = start + (step / 2);

  const scale = useTransform(scrollYProgress,
    [start - 0.2, center, end + 0.2],
    [0.9, 1, 0.9]
  );
  const opacity = useTransform(scrollYProgress,
    [start - 0.2, center, end + 0.2],
    [0.5, 1, 0.5]
  );

  const filter = useTransform(scrollYProgress,
    [start - 0.2, center, end + 0.2],
    ["grayscale(100%) blur(2px)", "grayscale(0%) blur(0px)", "grayscale(100%) blur(2px)"]
  );

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      onClick={() => setSelectedId(project.id)}
      style={{ scale, opacity, filter }}
      className="relative w-[80vw] md:w-[600px] h-[50vh] md:h-[60vh] bg-[#141821] rounded-2xl overflow-hidden cursor-pointer group border border-[#2D3442] flex-shrink-0"
    >
      <motion.img
        layoutId={`image-${project.id}`}
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-transparent to-transparent opacity-90" />

      <div className="absolute bottom-0 left-0 p-8 w-full">
        <motion.p layoutId={`cat-${project.id}`} className="text-[#94A3B8] text-sm font-bold uppercase tracking-wider mb-2">{project.category}</motion.p>
        <motion.h3 layoutId={`title-${project.id}`} className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</motion.h3>
        <p className="text-[#9AA0B2] line-clamp-2">{project.description}</p>
      </div>

      <div className="absolute top-8 right-8 bg-black/30 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
        <ArrowRight className="text-white w-6 h-6 -rotate-45" />
      </div>
    </motion.div>
  );
};

export default Projects;