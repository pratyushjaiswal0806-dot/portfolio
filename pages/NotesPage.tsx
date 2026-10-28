import React from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { notes, formatNoteDate } from '../lib/notes';
import { usePageMeta } from '../lib/usePageMeta';

const NotesPage: React.FC = () => {
  usePageMeta({
    title: 'Notes — Pratyush Jaiswal',
    description: 'Notes on frontend engineering, motion and the things I build.',
    path: '/notes',
  });

  return (
    <>
      <PageHeader kicker="Index / Notes" inspectName="NotesHeader" title={<>Notes<span className="text-accent">.</span></>}>
        <p className="mt-8 text-body text-lg leading-relaxed max-w-xl">
          Write-ups on frontend engineering, motion and the decisions behind the things I build.
        </p>
      </PageHeader>

      <section className="relative px-5 sm:px-6 md:px-12 lg:px-24 pb-24 md:pb-32" data-inspect="NotesIndex">
        <div className="max-w-[1248px] mx-auto">
          {notes.length === 0 ? (
            <p className="py-16 border-t border-line font-mono text-xs uppercase tracking-wider text-muted">
              Nothing published yet. The first note is being written.
            </p>
          ) : (
            <ul className="border-t border-line">
              {notes.map((note) => (
                <li key={note.slug}>
                  <Link
                    to={`/notes/${note.slug}`}
                    viewTransition
                    data-cursor="hover"
                    className="group grid md:grid-cols-[160px_1fr_40px] gap-3 md:gap-8 py-8 border-b border-line"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-wider text-dim pt-2">
                      {formatNoteDate(note.date)}
                      {note.draft && <span className="ml-2 text-[#FBBF24]">draft</span>}
                    </span>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-ice tracking-tight group-hover:translate-x-1 transition-transform">
                        {note.title}
                      </h2>
                      <p className="mt-2 text-body leading-relaxed max-w-2xl">{note.summary}</p>
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                        {note.minutes} min read{note.tags.length > 0 && ` · ${note.tags.join(' · ')}`}
                      </p>
                    </div>
                    <ArrowUpRight className="hidden md:block w-5 h-5 mt-2 text-muted group-hover:text-ice transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default NotesPage;
