import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import SpringTuner from '../components/lab/SpringTuner';
import BezierEditor from '../components/lab/BezierEditor';
import CursorVelocity from '../components/lab/CursorVelocity';
import VelocityMarquee from '../components/lab/VelocityMarquee';
import RippleStagger from '../components/lab/RippleStagger';
import LayoutFilter from '../components/lab/LayoutFilter';
import ViewTransitionSwap from '../components/lab/ViewTransitionSwap';
import DecryptExperiment from '../components/lab/DecryptExperiment';
import { useFps } from '../components/lab/useFps';
import { usePageMeta } from '../lib/usePageMeta';
import { useHashScroll } from '../lib/useHashScroll';

const index = [
  { id: 'springs', label: 'Springs' },
  { id: 'easing', label: 'Easing curves' },
  { id: 'cursor', label: 'Velocity' },
  { id: 'stagger', label: 'Stagger' },
  { id: 'layout', label: 'Layout animation' },
  { id: 'view-transitions', label: 'View transitions' },
  { id: 'decrypt', label: 'Decrypt' },
];

const LabPage: React.FC = () => {
  usePageMeta({
    title: 'Motion Lab — Pratyush Jaiswal',
    description: 'Every animation on this site, isolated so you can play with it: springs, easing curves, velocity, stagger, layout animation and view transitions, with the code behind each.',
    path: '/lab',
  });
  useHashScroll();
  const fps = useFps();

  return (
    <>
      <PageHeader kicker="Motion Lab" inspectName="LabHeader" title="Motion, taken apart.">
        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
          <p className="lg:col-span-7 text-body text-lg leading-relaxed max-w-xl">
            Every animation on this site, isolated so you can play with it. Change the numbers, watch what happens, then copy the code.
          </p>
          <div className="lg:col-span-5 lg:justify-self-end flex items-center gap-3 text-sm text-dim" aria-live="off">
            <span className={`w-2 h-2 ${fps === null || fps >= 50 ? 'bg-emerald-400' : fps >= 30 ? 'bg-amber-400' : 'bg-red-400'}`} />
            Running at <span className="font-mono text-ice tabular-nums w-[4ch]">{fps ?? '—'}</span> fps
          </div>
        </div>
        <nav aria-label="Experiments" className="mt-12">
          <ul className="flex flex-wrap gap-2">
            {index.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block px-3.5 py-2 border border-line text-sm text-body hover:text-ice hover:border-accent/60 transition-colors"
                  data-cursor="hover"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className="px-5 sm:px-6 md:px-12 lg:px-24 pb-16">
        <div className="max-w-[1248px] mx-auto">
          <SpringTuner />
          <BezierEditor />
          <CursorVelocity />
          <VelocityMarquee />
          <RippleStagger />
          <LayoutFilter />
          <ViewTransitionSwap />
          <DecryptExperiment />
        </div>
      </div>
    </>
  );
};

export default LabPage;
