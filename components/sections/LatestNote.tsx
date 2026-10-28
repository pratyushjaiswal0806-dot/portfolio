import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { notes, formatNoteDate } from '../../lib/notes';

/** One-line pointer to the newest note. Renders nothing until a note is published. */
const LatestNote: React.FC = () => {
  const latest = notes[0];
  if (!latest) return null;

  return (
    <section className="relative z-20 px-5 sm:px-6 md:px-12 lg:px-24 bg-obsidian" data-inspect="LatestNote" aria-label="Latest note">
      <Link
        to={`/notes/${latest.slug}`}
        viewTransition
        data-cursor="hover"
        className="group max-w-[1248px] mx-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-6 border-y border-line hover:border-accent/50 transition-colors"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent shrink-0">Latest note</span>
        <span className="text-ice text-lg font-medium flex-1 group-hover:translate-x-1 transition-transform">{latest.title}</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-dim shrink-0">
          {formatNoteDate(latest.date)} · {latest.minutes} min read
        </span>
        <ArrowRight className="hidden sm:block w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
      </Link>
    </section>
  );
};

export default LatestNote;
