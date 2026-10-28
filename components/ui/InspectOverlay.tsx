import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useSiteUI } from '../../lib/site-ui';

interface Readout {
  name: string;
  rect: DOMRect;
  padding: [number, number, number, number];
}

const px = (v: string) => Math.round(parseFloat(v) || 0);

/** Devtools-style readout for whichever [data-inspect] block the pointer is
 *  over. The outlines and labels themselves are pure CSS (see index.css). */
const InspectOverlay: React.FC = () => {
  const { toggleInspect } = useSiteUI();
  const [readout, setReadout] = useState<Readout | null>(null);
  const target = useRef<HTMLElement | null>(null);
  const frame = useRef(0);

  useEffect(() => {
    const measure = () => {
      frame.current = 0;
      const el = target.current;
      if (!el || !el.isConnected) {
        setReadout(null);
        return;
      }
      const cs = getComputedStyle(el);
      setReadout({
        name: el.dataset.inspect ?? '',
        rect: el.getBoundingClientRect(),
        padding: [px(cs.paddingTop), px(cs.paddingRight), px(cs.paddingBottom), px(cs.paddingLeft)],
      });
    };
    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(measure);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-inspect]') ?? null;
      if (el !== target.current) {
        target.current = el;
        schedule();
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const r = readout?.rect;
  const [pt, pr, pb, pl] = readout?.padding ?? [0, 0, 0, 0];

  return (
    <>
      {/* Fixed 60px blueprint grid over everything */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[60] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {readout && r && (
        <div aria-hidden="true" className="fixed z-[61] pointer-events-none" style={{ left: r.left, top: r.top, width: r.width, height: r.height }}>
          {/* Padding bands, devtools green */}
          <div className="absolute left-0 right-0 top-0 bg-emerald-400/15" style={{ height: pt }} />
          <div className="absolute left-0 right-0 bottom-0 bg-emerald-400/15" style={{ height: pb }} />
          <div className="absolute left-0 bg-emerald-400/15" style={{ top: pt, bottom: pb, width: pl }} />
          <div className="absolute right-0 bg-emerald-400/15" style={{ top: pt, bottom: pb, width: pr }} />
          <div className="absolute inset-0 border border-accent" />
          <div
            className="absolute right-0 px-2 py-1 bg-ice text-obsidian font-mono text-[10px] leading-none whitespace-nowrap"
            style={r.bottom > window.innerHeight - 28 ? { top: Math.max(0, window.innerHeight - 28 - r.top) } : { bottom: -22 }}
          >
            {readout.name} · {Math.round(r.width)}×{Math.round(r.height)}
            <span className="text-dim"> · pad {pt} {pr} {pb} {pl}</span>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed z-[62] left-4 bottom-24 md:bottom-4 flex items-center gap-3 pl-3 pr-1.5 py-1.5 bg-obsidian/90 backdrop-blur-md border border-accent/60 font-mono text-[10px] uppercase tracking-widest text-accent"
      >
        <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
        <span>Inspect mode</span>
        <span className="hidden md:inline text-muted">hover a block · esc to exit</span>
        <button
          type="button"
          onClick={toggleInspect}
          className="p-1.5 text-muted hover:text-ice transition-colors"
          aria-label="Exit inspect mode"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </>
  );
};

export default InspectOverlay;
