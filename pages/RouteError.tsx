import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router';

/** Last-resort boundary. Deliberately free of layout context so it can render
 *  even when RootLayout itself is what failed (e.g. a chunk failed to load). */
const RouteError: React.FC = () => {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : null;
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : 'Unknown error';

  return (
    <div className="min-h-[80vh] flex items-center px-5 sm:px-6 md:px-12 lg:px-24 py-32 bg-obsidian">
      <div className="max-w-[1248px] mx-auto w-full">
        <span className="section-kicker">Error / {status ?? 'runtime'}</span>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-ice tracking-tight leading-[0.98]">
          Something <span className="text-accent">broke.</span>
        </h1>
        <p className="mt-6 text-body text-lg max-w-xl">
          A part of this page failed to load. Usually a refresh fixes it, especially right after a new deploy.
        </p>
        {import.meta.env.DEV && (
          <pre className="mt-8 max-w-full overflow-x-auto px-5 py-4 bg-steel border border-line font-mono text-xs text-[#F87171]">{message}</pre>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3.5 bg-ice text-obsidian font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors"
          >
            Reload
          </button>
          <a href="/" className="px-6 py-3.5 border border-line text-ice font-mono text-xs uppercase tracking-wider hover:border-accent transition-colors">
            Back home
          </a>
        </div>
      </div>
    </div>
  );
};

export default RouteError;
