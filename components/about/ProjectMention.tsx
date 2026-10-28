import React from 'react';
import { Link } from 'react-router';
import { getProject } from '../../data/projects';

/** Inline link to a case study. On hover (desktop) a small screenshot rises above it. */
const ProjectMention: React.FC<{ slug: string; children?: React.ReactNode }> = ({ slug, children }) => {
  const project = getProject(slug);
  if (!project) return <>{children}</>;

  return (
    <Link
      to={`/work/${project.slug}`}
      viewTransition
      data-cursor="hover"
      className="group relative whitespace-nowrap text-ice underline decoration-line decoration-1 underline-offset-[6px] hover:decoration-[color:var(--mention)] transition-colors"
      style={{ ['--mention' as string]: project.accent.base }}
    >
      {children ?? project.title}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-full mb-3 w-56 -translate-x-1/2 translate-y-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out z-30 hidden md:block"
      >
        <span className="block border border-line bg-steel overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <span className="block h-[2px]" style={{ background: project.accent.base }} />
          <img src={project.cover.src} alt="" loading="lazy" className="block w-full aspect-[16/10] object-cover object-top" />
        </span>
      </span>
    </Link>
  );
};

export default ProjectMention;
