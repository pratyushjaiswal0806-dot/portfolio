import React, { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { timeline } from '../../data/personal';
import { getProject } from '../../data/projects';

type Entry = (typeof timeline)[number] & { current?: boolean };

/** Milestones grouped by year. The guide line draws itself as you scroll. */
const Journey: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const groups = timeline.reduce<{ year: string; entries: Entry[] }[]>((acc, entry) => {
    const last = acc[acc.length - 1];
    if (last && last.year === entry.when) last.entries.push(entry);
    else acc.push({ year: entry.when, entries: [entry] });
    return acc;
  }, []);
  groups.push({
    year: 'Now',
    entries: [{ when: 'Now', title: 'What’s next', body: 'Looking for frontend internships and freelance builds where the details matter.', href: '/#contact', current: true }],
  });

  return (
    <div ref={ref} className="relative [--yc:0px] sm:[--yc:112px] lg:[--yc:168px]">
      {/* Guide line: base + scroll-drawn overlay */}
      <span className="absolute top-2 bottom-2 w-px bg-line left-[calc(var(--yc)+7px)] sm:left-[calc(var(--yc)+2rem+7px)]" />
      <motion.span
        className="absolute top-2 bottom-2 w-px bg-accent origin-top left-[calc(var(--yc)+7px)] sm:left-[calc(var(--yc)+2rem+7px)]"
        style={shouldReduceMotion ? undefined : { scaleY }}
      />

      {groups.map((group) => (
        <div key={group.year} className="sm:grid sm:grid-cols-[var(--yc)_1fr] sm:gap-8 pb-14 last:pb-0">
          <div>
            <p className="sm:sticky sm:top-32 pl-8 sm:pl-0 font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-[#3A4252] leading-none mb-5 sm:mb-0">
              {group.year}
            </p>
          </div>
          <ol className="relative pl-8 space-y-9">
            {group.entries.map((entry) => (
              <JourneyEntry key={entry.title} entry={entry} />
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

const JourneyEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const project = entry.href?.startsWith('/work/') ? getProject(entry.href.split('/').pop()) : undefined;

  const body = (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0">
        <h3 className="text-xl font-semibold text-ice leading-snug">{entry.title}</h3>
        <p className="mt-1.5 text-body leading-relaxed max-w-xl">{entry.body}</p>
      </div>
      {project && (
        <span className="hidden sm:block shrink-0 w-28 aspect-[16/10] border border-line overflow-hidden bg-steel opacity-70 group-hover:opacity-100 transition-opacity">
          <img src={project.cover.src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
        </span>
      )}
    </div>
  );

  return (
    <li className="relative">
      <span
        className={`absolute -left-8 top-1.5 w-[15px] h-[15px] border bg-obsidian flex items-center justify-center ${
          entry.current ? 'border-accent' : 'border-line'
        }`}
      >
        <span
          className={`w-1.5 h-1.5 ${entry.current ? 'bg-accent animate-pulse' : 'bg-[#526175]'}`}
          style={project ? { background: project.accent.base } : undefined}
        />
      </span>
      {entry.href ? (
        <Link to={entry.href} viewTransition data-cursor="hover" className="group block">
          {body}
        </Link>
      ) : (
        body
      )}
    </li>
  );
};

export default Journey;
