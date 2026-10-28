import React, { Suspense, lazy, useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { getNote, loadNote, formatNoteDate } from '../lib/notes';
import { usePageMeta } from '../lib/usePageMeta';
import NotFoundPage from './NotFoundPage';

/** Internal links in MDX go through the router; external ones open in a new tab. */
const mdxComponents = {
  a: ({ href = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith('/') ? (
      <Link to={href} viewTransition {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ),
};

const NotePage: React.FC = () => {
  const { slug } = useParams();
  const note = getNote(slug);

  usePageMeta({
    title: note ? `${note.title} — Pratyush Jaiswal` : 'Not found — Pratyush Jaiswal',
    description: note?.summary ?? 'This page does not exist.',
    path: `/notes/${slug ?? ''}`,
  });

  const Body = useMemo(() => (note ? lazy(() => loadNote(note.slug)!) : null), [note?.slug]);

  if (!note || !Body) return <NotFoundPage />;

  return (
    <article className="relative px-5 sm:px-6 md:px-12 lg:px-24 pt-32 md:pt-44 pb-24 md:pb-32" data-inspect="Note">
      <div className="absolute inset-x-0 top-0 h-[520px] blueprint-grid-fade pointer-events-none" />
      <div className="relative max-w-[720px] mx-auto">
        <Link
          to="/notes"
          viewTransition
          className="group inline-flex items-center gap-2 mb-10 font-mono text-[11px] uppercase tracking-wider text-body hover:text-ice transition-colors"
          data-cursor="hover"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> All notes
        </Link>
        <p className="font-mono text-[11px] uppercase tracking-wider text-dim">
          {formatNoteDate(note.date)} · {note.minutes} min read
          {note.draft && <span className="ml-2 text-[#FBBF24]">draft (dev only)</span>}
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-ice tracking-tight leading-[1.05]">{note.title}</h1>
        <p className="mt-6 text-xl text-[#B4BBC8] leading-relaxed font-light">{note.summary}</p>
        <div className="mt-12 pt-12 border-t border-line prose-pj">
          <Suspense fallback={<p className="font-mono text-xs uppercase tracking-wider text-muted">Loading…</p>}>
            <Body components={mdxComponents} />
          </Suspense>
        </div>
      </div>
    </article>
  );
};

export default NotePage;
