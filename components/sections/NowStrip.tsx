import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../ui/motion';
import { now, personal } from '../../data/personal';
import { useLocalTime } from '../../lib/useLocalTime';

/** A small /now section: what I'm doing at the moment, kept in data/personal.ts. */
const NowStrip: React.FC<{ kicker?: string; tone?: 'obsidian' | 'panel' }> = ({ kicker = '04 / Now', tone = 'obsidian' }) => {
  const shouldReduceMotion = useReducedMotion();
  const time = useLocalTime();

  return (
    <section
      id="now"
      data-inspect="NowStrip"
      className={`relative z-20 px-5 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-20 ${tone === 'panel' ? 'bg-panel' : 'bg-obsidian'}`}
      aria-label="What I'm doing now"
    >
      <motion.div
        variants={staggerContainer}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="max-w-[1248px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12"
      >
        <motion.div variants={fadeUp} className="lg:col-span-4">
          <span className="section-kicker">{kicker}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-ice tracking-tight">What I’m up to</h2>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">Updated {now.updated}</p>
        </motion.div>

        <dl className="lg:col-span-8 border-t border-line">
          {now.items.map((item) => (
            <motion.div key={item.label} variants={fadeUp} className="grid sm:grid-cols-[140px_1fr] gap-1 sm:gap-6 py-4 border-b border-line">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent pt-1">{item.label}</dt>
              <dd className="text-[#C9CED8] leading-relaxed">{item.value}</dd>
            </motion.div>
          ))}
          <motion.div variants={fadeUp} className="grid sm:grid-cols-[140px_1fr] gap-1 sm:gap-6 py-4 border-b border-line">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent pt-1">Local time</dt>
            <dd className="text-[#C9CED8] leading-relaxed flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{personal.location.split(',')[0]} · <span className="font-mono text-sm">{time}</span> IST</span>
            </dd>
          </motion.div>
        </dl>
      </motion.div>
    </section>
  );
};

export default NowStrip;
