import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowLeft } from 'lucide-react';
import Experiment from './Experiment';
import { projects } from '../../data/projects';

const items = projects.slice(0, 3);
const supported = typeof document !== 'undefined' && 'startViewTransition' in document;

/** A shared-element morph using the browser's View Transitions API, scoped to this box. */
const ViewTransitionSwap: React.FC = () => {
  const [active, setActive] = useState(items[0].slug);
  const [open, setOpen] = useState(false);
  const project = items.find((p) => p.slug === active)!;

  const transition = (update: () => void) => {
    if (!supported) {
      update();
      return;
    }
    const html = document.documentElement;
    html.classList.add('lab-vt');
    const vt = document.startViewTransition(() => flushSync(update));
    vt.finished.finally(() => html.classList.remove('lab-vt'));
  };

  const openItem = (slug: string) => {
    flushSync(() => setActive(slug)); // name the clicked image before the snapshot
    transition(() => setOpen(true));
  };

  return (
    <Experiment
      id="view-transitions"
      title="View transitions"
      hint={open ? 'Go back to the grid' : 'Open a card'}
      summary={
        <>
          <p>The browser takes a snapshot, you change the DOM however you like, and it animates between the two. Give two elements the same <code className="font-mono text-ice text-sm">view-transition-name</code> and it morphs one into the other.</p>
          <p>
            {supported
              ? 'This is how a project card turns into the case-study header when you change pages.'
              : 'Your browser doesn’t support view transitions yet, so here it simply swaps.'}
          </p>
        </>
      }
      usedOn={{ label: 'page transitions', to: '/work' }}
      code={`
import { flushSync } from 'react-dom';

function open() {
  document.startViewTransition(() => {
    // update the DOM synchronously inside the callback
    flushSync(() => setOpen(true));
  });
}

/* The thumbnail and the large image share a name,
   so the browser morphs one into the other. */
img.selected { view-transition-name: hero-image; }
`}
    >
      <div className="min-h-[360px] p-5 sm:p-8">
        {!open ? (
          <ul className="grid sm:grid-cols-3 gap-4">
            {items.map((p) => (
              <li key={p.slug}>
                <button type="button" onClick={() => openItem(p.slug)} className="group block w-full text-left">
                  <span className="block border border-line overflow-hidden bg-steel">
                    <img
                      src={p.cover.src}
                      alt=""
                      className="block w-full aspect-[4/3] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      style={p.slug === active ? { viewTransitionName: 'lab-hero' } : undefined}
                    />
                  </span>
                  <span className="mt-2 block text-sm text-ice">{p.title}</span>
                  <span className="block text-xs text-dim">{p.category}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-6 items-start">
            <img
              src={project.cover.src}
              alt=""
              className="block w-full aspect-[16/10] object-cover object-top border border-line"
              style={{ viewTransitionName: 'lab-hero' }}
            />
            <div>
              <p className="text-xs" style={{ color: project.accent.base }}>{project.category}</p>
              <h3 className="mt-1 text-2xl font-bold text-ice">{project.title}</h3>
              <p className="mt-3 text-sm text-body leading-relaxed">{project.tagline}</p>
              <button
                type="button"
                onClick={() => transition(() => setOpen(false))}
                className="mt-6 inline-flex items-center gap-2 text-sm text-ice hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to the grid
              </button>
            </div>
          </div>
        )}
      </div>
    </Experiment>
  );
};

export default ViewTransitionSwap;
