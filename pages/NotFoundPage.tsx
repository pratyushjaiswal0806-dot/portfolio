import React from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowLeft, Search } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { usePageMeta } from '../lib/usePageMeta';
import { useSiteUI } from '../lib/site-ui';

const NotFoundPage: React.FC = () => {
  const { pathname } = useLocation();
  const { openPalette } = useSiteUI();
  usePageMeta({ title: 'Route not found — Pratyush Jaiswal', description: 'This page does not exist.', path: pathname });

  return (
    <div className="min-h-[80vh]">
      <PageHeader kicker="Error / 404" inspectName="NotFound" title={<>Route not <span className="text-accent">found.</span></>}>
        <pre className="mt-10 inline-block max-w-full overflow-x-auto px-5 py-4 bg-steel border border-line font-mono text-xs sm:text-sm text-body">
          <span className="text-accent">GET</span> {pathname}{'\n'}
          <span className="text-[#F87171]">404</span> no route matches this path
        </pre>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" viewTransition className="inline-flex items-center gap-2 px-6 py-3.5 bg-ice text-obsidian font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors" data-cursor="hover">
            <ArrowLeft className="w-4 h-4" /> Back home
          </Link>
          <Link to="/work" viewTransition className="inline-flex items-center gap-2 px-6 py-3.5 border border-line text-ice font-mono text-xs uppercase tracking-wider hover:border-accent transition-colors" data-cursor="hover">
            See the work
          </Link>
          <button type="button" onClick={openPalette} className="inline-flex items-center gap-2 px-6 py-3.5 border border-line text-body font-mono text-xs uppercase tracking-wider hover:text-ice hover:border-accent transition-colors" data-cursor="hover">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </PageHeader>
    </div>
  );
};

export default NotFoundPage;
