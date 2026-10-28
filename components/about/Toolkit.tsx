import React, { Suspense, lazy } from 'react';
import { useReducedMotion } from 'framer-motion';
import { technologies, toolkitGroups } from '../../data/toolkit';
import { useMediaQuery } from '../../lib/useMediaQuery';

const OrbitingStack = lazy(() => import('../ui/orbiting-circles-02'));

/** Grouped by how often I reach for each tool; the orbit illustrates it on large screens. */
const Toolkit: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  return (
    <div className="grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-12 items-center">
      <div className="space-y-10 order-2 xl:order-1">
        {toolkitGroups.map((group) => (
          <div key={group.label}>
            <h3 className="text-ice text-lg font-medium">{group.label}</h3>
            <p className="mt-1 text-sm text-dim">{group.note}</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {group.items.map((key) => {
                const tech = technologies[key];
                return (
                  <li key={key} className="group flex items-center gap-2.5">
                    <img
                      src={tech.icon}
                      alt=""
                      aria-hidden="true"
                      className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      style={'invert' in tech && tech.invert ? { filter: 'invert(1)' } : undefined}
                    />
                    <span className="text-[#C9CED8] group-hover:text-ice transition-colors">{tech.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {isDesktop && !shouldReduceMotion && (
        <div className="order-1 xl:order-2 relative h-[470px]" aria-hidden="true">
          {/* The orbit draws at a fixed 680px (its rings are up to 640px) and is scaled to fit. */}
          <div className="absolute left-1/2 top-1/2 w-[680px] -translate-x-1/2 -translate-y-1/2 scale-[0.68]">
            <Suspense fallback={null}>
              <OrbitingStack />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolkit;
