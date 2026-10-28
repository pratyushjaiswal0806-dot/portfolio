import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, MotionValue, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../../types';
import { featuredProjects, projects } from '../../data/projects';
import { useMediaQuery } from '../../lib/useMediaQuery';

const FeaturedWork: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const shouldReduceMotion = useReducedMotion();
  const useStaticProjectList = isMobile || !!shouldReduceMotion;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Pin the section for exactly as long as the track needs to slide past.
  useLayoutEffect(() => {
    if (useStaticProjectList) return;
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [useStaticProjectList]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const otherCount = projects.length - featuredProjects.length;

  return (
    <section
      id="featured"
      data-inspect="FeaturedWork"
      className="blueprint-section relative bg-obsidian z-20"
      aria-label="Selected projects by Pratyush Jaiswal"
    >
      <div className="absolute inset-0 blueprint-grid-fade pointer-events-none" />
      <div
        ref={targetRef}
        className={useStaticProjectList ? 'relative px-5 sm:px-6 md:px-12 lg:px-24 py-20 sm:py-24 md:py-28' : 'relative'}
        style={useStaticProjectList ? undefined : { height: `calc(100vh + ${distance}px)` }}
      >
        <div className={useStaticProjectList ? 'max-w-7xl mx-auto' : 'sticky top-0 h-screen overflow-hidden flex flex-col justify-center'}>

          <div className={useStaticProjectList ? 'mb-10 md:mb-12' : 'px-6 md:px-24 mb-8'}>
            <span className="section-kicker">02 / Selected work</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ice tracking-tight">Projects with <span className="text-accent">purpose.</span></h2>
              <div className="flex flex-col md:items-end gap-3">
                <p className="text-[#7F899B] text-sm md:text-base leading-relaxed max-w-md md:text-right">
                  Product thinking, interface systems, and technical decisions made visible.
                </p>
                <Link
                  to="/work"
                  viewTransition
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent hover:text-ice transition-colors"
                  data-cursor="hover"
                >
                  All work <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <motion.div
            ref={trackRef}
            style={useStaticProjectList ? undefined : { x }}
            className={useStaticProjectList ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : 'flex gap-12 px-6 md:px-24 w-max items-center'}
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                scrollYProgress={scrollYProgress}
                total={featuredProjects.length + 1}
                disableMotion={useStaticProjectList}
              />
            ))}

            <Link
              to="/work"
              viewTransition
              data-cursor="hover"
              className={`group relative shrink-0 border border-line bg-steel/40 hover:bg-steel transition-colors flex flex-col justify-between p-6 sm:p-8 ${
                useStaticProjectList ? 'md:col-span-2 min-h-[180px]' : 'w-[340px] h-[60vh]'
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Index / {String(projects.length).padStart(2, '0')}</span>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-ice tracking-tight leading-tight">
                  All work<span className="text-accent">.</span>
                </p>
                <p className="mt-3 text-body text-sm leading-relaxed max-w-[16rem]">
                  {otherCount > 0
                    ? `Every project, plus ${otherCount} more, with filters and case studies.`
                    : 'Every project, with filters and case studies.'}
                </p>
                <span className="mt-6 inline-flex items-center justify-center w-11 h-11 rounded-full border border-line group-hover:border-accent group-hover:bg-ice transition-colors">
                  <ArrowRight className="w-4 h-4 text-ice group-hover:text-obsidian transition-colors" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Progress Bar */}
          {!useStaticProjectList && <div className="absolute bottom-10 left-6 md:left-24 right-6 md:right-24 h-[1px] bg-line mt-12">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full bg-accent"
            />
          </div>}
        </div>
      </div>
    </section>
  );
};

// Sub-component to handle per-card scroll transforms
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  scrollYProgress: MotionValue<number>;
  total: number;
  disableMotion?: boolean;
}> = ({ project, index, scrollYProgress, total, disableMotion = false }) => {
  const center = total === 1 ? 0 : index / (total - 1);
  const focusSpan = 0.32;

  const scale = useTransform(scrollYProgress,
    [center - focusSpan, center, center + focusSpan],
    [0.94, 1, 0.94]
  );
  const opacity = useTransform(scrollYProgress,
    [center - focusSpan, center, center + focusSpan],
    [0.4, 1, 0.4]
  );

  const filter = useTransform(scrollYProgress,
    [center - focusSpan, center, center + focusSpan],
    ['grayscale(100%) blur(4px)', 'grayscale(0%) blur(0px)', 'grayscale(100%) blur(4px)']
  );

  return (
    <motion.div
      style={disableMotion ? undefined : { scale, opacity, filter }}
      className={`relative shrink-0 ${disableMotion ? '' : 'md:w-[600px]'}`}
    >
      <Link
        to={`/work/${project.slug}`}
        viewTransition
        data-cursor="project-card"
        data-inspect="ProjectCard"
        aria-label={`${project.title}: ${project.category}. Read the case study`}
        className={`relative block w-full h-[400px] sm:h-[430px] bg-steel overflow-hidden group border border-line text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian active:scale-[0.985] transition-transform ${disableMotion ? 'md:h-[460px]' : 'md:h-[60vh]'}`}
      >
        <img
          src={project.cover.src}
          alt=""
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ viewTransitionName: `project-${project.slug}` }}
          loading="lazy"
          decoding="async"
          width="1440"
          height="900"
        />

        {/* Project accent: top rule + glow borrowed from the project's own palette */}
        <span className="absolute top-0 left-0 h-[2px] w-12 group-hover:w-full transition-all duration-500 z-30" style={{ background: project.accent.base }} />
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(120% 70% at 50% 110%, ${project.accent.glow}55, transparent 70%)` }}
        />

        {/* Sliding color gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/30 to-transparent opacity-95 group-hover:opacity-80 transition-opacity duration-500 z-10" />

        {/* Slide shifting title container */}
        <div className="absolute bottom-0 left-0 p-5 sm:p-8 w-full z-20 transform group-hover:-translate-y-1.5 transition-transform duration-500">
          <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: project.accent.base }}>
            {project.category} <span className="text-dim font-mono font-normal">/ {project.year}</span>
          </p>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-body line-clamp-2 font-light text-sm md:text-base leading-relaxed">{project.tagline}</p>
        </div>

        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-black/30 backdrop-blur-md p-2.5 sm:p-3 rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10 z-20">
          <ArrowRight className="text-white w-5 h-5 sm:w-6 sm:h-6 -rotate-45" />
        </div>
      </Link>
    </motion.div>
  );
};

export default FeaturedWork;
