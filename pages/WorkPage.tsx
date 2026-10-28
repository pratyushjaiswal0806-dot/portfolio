import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import type { Project, ProjectKind } from '../types';
import { projects, projectKinds } from '../data/projects';
import PageHeader from '../components/ui/PageHeader';
import { usePageMeta } from '../lib/usePageMeta';
import { useIsTouch } from '../lib/useMediaQuery';

type Filter = ProjectKind | 'All';

const WorkPage: React.FC = () => {
  usePageMeta({
    title: 'Work — Pratyush Jaiswal',
    description: 'Selected frontend work by Pratyush Jaiswal: tech-fest and community sites, real-time apps, developer tools and client builds, each with a case study.',
    path: '/work',
  });

  const isTouch = useIsTouch();
  const shouldReduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>('All');
  const [hovered, setHovered] = useState<Project | null>(null);

  const list = filter === 'All' ? projects : projects.filter((p) => p.kind.includes(filter));
  const filters: Filter[] = ['All', ...projectKinds.filter((k) => projects.some((p) => p.kind.includes(k)))];
  const countFor = (f: Filter) => (f === 'All' ? projects.length : projects.filter((p) => p.kind.includes(f)).length);

  // Cursor-following preview (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useSpring(mouseX, { stiffness: 260, damping: 28, mass: 0.6 });
  const previewY = useSpring(mouseY, { stiffness: 260, damping: 28, mass: 0.6 });
  const showPreview = !isTouch && !shouldReduceMotion;

  return (
    <>
      <PageHeader
        kicker="Index / Work"
        inspectName="WorkHeader"
        title={<>Things I’ve <span className="text-accent">built.</span></>}
      >
        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="text-body text-lg leading-relaxed max-w-xl">
            Event sites, community sites, real-time apps, developer tools and client work. Each one has a case study covering the problem, the decisions and the frontend details.
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`relative px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider border transition-colors ${
                    active ? 'border-accent text-obsidian' : 'border-line text-body hover:text-ice hover:border-accent/60'
                  }`}
                  data-cursor="hover"
                >
                  {active && (
                    <motion.span
                      layoutId="work-filter"
                      className="absolute inset-0 bg-accent"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {f} <span className={active ? 'text-obsidian/60' : 'text-muted'}>{countFor(f)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </PageHeader>

      <section
        data-inspect="WorkIndex"
        className="relative px-5 sm:px-6 md:px-12 lg:px-24 pb-24 md:pb-32"
        onPointerMove={(e) => {
          if (!showPreview) return;
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        <div className="max-w-[1248px] mx-auto">
          <div className="hidden md:grid grid-cols-[64px_1fr_240px_80px_40px] gap-6 pb-3 border-b border-line font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            <span>No.</span>
            <span>Project</span>
            <span>Type</span>
            <span>Year</span>
            <span />
          </div>

          <LayoutGroup>
            <motion.ul layout className="border-b border-line md:border-b-0">
              <AnimatePresence initial={false} mode="popLayout">
                {list.map((project) => (
                  <motion.li
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <WorkRow
                      project={project}
                      number={projects.indexOf(project) + 1}
                      onHover={setHovered}
                      dim={!!hovered && hovered.slug !== project.slug}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>
        </div>
      </section>

      {/* Floating preview that follows the cursor. It carries the project's
          view-transition name, so clicking morphs it into the case-study hero. */}
      {showPreview && (
        <motion.div
          aria-hidden="true"
          className="fixed top-0 left-0 z-30 pointer-events-none hidden md:block"
          style={{ x: previewX, y: previewY }}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative -translate-y-1/2 translate-x-8 w-[360px] aspect-[16/10] overflow-hidden border border-line bg-steel shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              >
                <img
                  src={hovered.cover.src}
                  alt=""
                  className="w-full h-full object-cover object-top"
                  style={{ viewTransitionName: `project-${hovered.slug}` }}
                />
                <span className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: hovered.accent.base }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
};

const WorkRow: React.FC<{
  project: Project;
  number: number;
  onHover: (p: Project | null) => void;
  dim: boolean;
}> = ({ project, number, onHover, dim }) => (
  <Link
    to={`/work/${project.slug}`}
    viewTransition
    data-cursor="project-card"
    onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(project)}
    onFocus={() => onHover(null)}
    className={`group relative block md:grid md:grid-cols-[64px_1fr_240px_80px_40px] md:items-center gap-6 py-6 md:py-8 border-t md:border-t-0 md:border-b border-line transition-opacity duration-300 focus-visible:outline-hidden focus-visible:bg-steel/60 ${
      dim ? 'md:opacity-40' : 'opacity-100'
    }`}
    style={{ ['--project' as string]: project.accent.base }}
  >
    {/* Accent rule grows on hover */}
    <span className="hidden md:block absolute left-0 bottom-[-1px] h-px w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ background: project.accent.base }} />

    {/* Mobile thumbnail */}
    <div className="md:hidden relative aspect-[16/10] mb-4 overflow-hidden border border-line bg-steel">
      <img
        src={project.cover.src}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top"
        style={{ viewTransitionName: `project-${project.slug}` }}
      />
      <span className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: project.accent.base }} />
    </div>

    <span className="hidden md:block font-mono text-xs text-muted">{String(number).padStart(2, '0')}</span>

    <div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ice tracking-tight md:group-hover:translate-x-2 transition-transform duration-500 ease-out">
        {project.title}
      </h2>
      <p className="mt-2 text-body text-sm md:text-base leading-relaxed max-w-xl">{project.tagline}</p>
    </div>

    <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
      {project.kind.map((k) => (
        <span key={k} className="px-2 py-1 border border-[#252C38] font-mono text-[10px] uppercase tracking-wider text-[#A8B0C0]">
          {k}
        </span>
      ))}
      {project.nda && (
        <span className="inline-flex items-center gap-1 px-2 py-1 border border-[#252C38] font-mono text-[10px] uppercase tracking-wider text-dim">
          <Lock className="w-3 h-3" /> NDA
        </span>
      )}
    </div>

    <span className="hidden md:block font-mono text-xs text-body">{project.year}</span>

    <span className="hidden md:flex justify-end">
      <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-ice group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
    </span>
  </Link>
);

export default WorkPage;
