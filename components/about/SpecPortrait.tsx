import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { personal } from '../../data/personal';
import { useLocalTime } from '../../lib/useLocalTime';
import pratyushImg from '../assets/pratyush.webp';

const EASE = [0.16, 1, 0.3, 1] as const;

/* The degree runs August 2025 → June 2029. The marker shows where today sits. */
const DEGREE_START = new Date('2025-08-01').getTime();
const DEGREE_END = new Date('2029-06-30').getTime();
const YEAR_MS = 365.25 * 24 * 3600 * 1000;

const degreeProgress = () => {
  const now = Date.now();
  const pct = Math.min(1, Math.max(0, (now - DEGREE_START) / (DEGREE_END - DEGREE_START)));
  const year = Math.min(4, Math.max(1, Math.floor((now - DEGREE_START) / YEAR_MS) + 1));
  return { pct, year };
};

const ordinal = (n: number) => ['first', 'second', 'third', 'final'][n - 1];

const frame: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.9, ease: EASE } },
};
const leader: Variants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({ scaleX: 1, transition: { duration: 0.55, delay: 0.55 + i * 0.12, ease: EASE } }),
};
const note: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.8 + i * 0.12, ease: EASE } }),
};
const dimension: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, delay: 1.05, ease: EASE } },
};
const marker: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.55, ease: EASE } },
};

interface Callout {
  top: string;
  label: string;
  value: string;
  meta?: string;
}

const Note: React.FC<Callout & { index: number }> = ({ index, label, value, meta }) => (
  <div className="flex items-start">
    {/* Leader line, anchored on the frame edge */}
    <div className="relative flex items-center w-8 sm:w-14 h-5 shrink-0">
      <span className="absolute -left-[4px] w-[7px] h-[7px] border border-accent bg-obsidian z-10" />
      <motion.span custom={index} variants={leader} className="block w-full h-px bg-accent origin-left" />
    </div>
    <motion.div custom={index} variants={note} className="pl-3 -mt-0.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">{label}</p>
      <p className="mt-1 text-ice leading-snug">{value}</p>
      {meta && <p className="mt-0.5 font-mono text-[11px] text-accent">{meta}</p>}
    </motion.div>
  </div>
);

/** Portrait drawn like a technical sheet: leader-line notes beside it and a
 *  dimension line underneath showing progress through the degree. The lines
 *  draw in once on load, the only orchestrated motion on the page. */
const SpecPortrait: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const time = useLocalTime();
  const { pct, year } = degreeProgress();

  const callouts: Callout[] = [
    { top: '12%', label: 'Based in', value: personal.location, meta: `${time.slice(0, 5)} there now` },
    { top: '40%', label: 'Studying', value: 'B.E. Computer Science, RVITM' },
    { top: '68%', label: 'Builds', value: 'Interfaces, motion and real-time UI' },
  ];

  return (
    <motion.figure
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      className="relative w-full max-w-[300px] xl:max-w-[340px] sm:mr-[240px]"
    >
      <div className="relative">
        <motion.div variants={frame} className="relative aspect-[4/5] border border-line bg-steel overflow-hidden">
          <img
            src={pratyushImg}
            alt="Pratyush Jaiswal on a tree-lined road in Bengaluru"
            className="w-full h-full object-cover grayscale-[30%]"
            decoding="async"
          />
          <span className="absolute left-2 top-2 w-3 h-3 border-l border-t border-ice/70" />
          <span className="absolute right-2 bottom-2 w-3 h-3 border-r border-b border-ice/70" />
        </motion.div>

        {/* Notes beside the frame (sm and up) */}
        <ul className="hidden sm:block absolute left-full top-0 bottom-0 w-[240px]">
          {callouts.map((c, i) => (
            <li key={c.label} className="absolute left-0 right-0" style={{ top: c.top }}>
              <Note index={i} {...c} />
            </li>
          ))}
        </ul>
      </div>

      {/* Dimension line: the degree, with today marked */}
      <div className="relative mt-7 h-14" role="img" aria-label={`In the ${ordinal(year)} year of a B.E. that runs from 2025 to 2029`}>
        <motion.div variants={dimension} className="absolute left-0 right-0 top-2 h-px bg-[#526175] origin-left" />
        <span className="absolute left-0 top-0 w-px h-4 bg-[#526175]" />
        <span className="absolute right-0 top-0 w-px h-4 bg-[#526175]" />
        <span className="absolute left-0 top-6 font-mono text-[10px] text-dim">2025</span>
        <span className="absolute right-0 top-6 font-mono text-[10px] text-dim">2029</span>
        <motion.div variants={marker} className="absolute top-0" style={{ left: `${pct * 100}%` }}>
          <span className="absolute -translate-x-1/2 top-[3px] w-0 h-0 border-x-[5px] border-x-transparent border-b-[7px] border-b-accent" />
          <span className="absolute -translate-x-1/2 top-6 whitespace-nowrap font-mono text-[10px] text-accent">
            now, {ordinal(year)} year
          </span>
        </motion.div>
      </div>

      {/* Notes stacked below on phones */}
      <ul className="sm:hidden mt-2 space-y-5">
        {callouts.map((c, i) => (
          <li key={c.label}>
            <Note index={i} {...c} />
          </li>
        ))}
      </ul>
    </motion.figure>
  );
};

export default SpecPortrait;
