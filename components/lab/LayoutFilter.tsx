import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Experiment from './Experiment';
import { Segmented, Toggle } from './controls';
import { projects, projectKinds } from '../../data/projects';
import type { ProjectKind } from '../../types';

type Filter = ProjectKind | 'All';

/** The /work filter in miniature, with a switch to turn layout animation off. */
const LayoutFilter: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');
  const [animated, setAnimated] = useState(true);
  const visible = filter === 'All' ? projects : projects.filter((p) => p.kind.includes(filter));
  const kinds: Filter[] = ['All', ...projectKinds.filter((k) => projects.some((p) => p.kind.includes(k)))];

  return (
    <Experiment
      id="layout"
      title="Layout animation"
      hint="Pick a filter"
      summary={
        <>
          <p>When a list changes, items normally jump to their new places. Layout animation measures where everything was and where it ends up, then animates the difference with transforms, so nothing reflows mid-flight.</p>
          <p>Switch it off to see what the same filter looks like without it.</p>
        </>
      }
      usedOn={{ label: 'the filters on the work page', to: '/work' }}
      code={`
<LayoutGroup>
  <AnimatePresence mode="popLayout">
    {visible.map((project) => (
      <motion.li
        key={project.slug}
        layout          // animate position and size changes
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      />
    ))}
  </AnimatePresence>
</LayoutGroup>
`}
      controls={
        <>
          <Segmented
            label="Filter"
            layoutId="lab-filter"
            value={filter}
            onChange={setFilter}
            options={kinds.map((k) => ({ value: k, label: k }))}
          />
          <Toggle label="Animate layout changes" checked={animated} onChange={setAnimated} />
        </>
      }
    >
      <div className="min-h-[360px] p-5 sm:p-8">
        <LayoutGroup id="lab-layout">
          <motion.ul layout={animated} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p) => (
                <motion.li
                  key={`${p.slug}-${animated}`}
                  layout={animated}
                  initial={animated ? { opacity: 0, scale: 0.9 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={animated ? { opacity: 0, scale: 0.9 } : { opacity: 0, transition: { duration: 0 } }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="relative border border-line bg-steel overflow-hidden"
                >
                  <img src={p.cover.src} alt="" loading="lazy" className="block w-full aspect-[16/10] object-cover object-top" />
                  <span className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: p.accent.base }} />
                  <span className="block px-3 py-2 text-xs text-ice truncate">{p.title}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </Experiment>
  );
};

export default LayoutFilter;
