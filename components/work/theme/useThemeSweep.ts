import { useCallback, useEffect, useRef, useState } from 'react';

export type SweepPhase = 'idle' | 'loading' | 'sweep' | 'done';

/** How long the normal design is shown, the HUD "loading" beat, and the sweep. */
export const SWEEP_TIMING = { hold: 900, load: 900, sweep: 1200 } as const;

/**
 * Drives the "normal design → project theme" switch on a case study.
 * After a short hold and a loading beat, a band sweeps down the viewport;
 * each registered region flips into the theme as the band passes its top.
 * Regions above the fold flip first, ones below it flip when the sweep ends.
 * With reduced motion every region flips immediately.
 */
export const useThemeSweep = (enabled: boolean, reduce: boolean | null, regions: readonly string[]) => {
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const [flipped, setFlipped] = useState<ReadonlySet<string>>(() => new Set());
  const [phase, setPhase] = useState<SweepPhase>('idle');

  useEffect(() => {
    if (!enabled) return;
    if (reduce) {
      setFlipped(new Set(regions));
      setPhase('done');
      return;
    }
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const { hold, load, sweep } = SWEEP_TIMING;

    at(hold, () => setPhase('loading'));
    at(hold + load, () => {
      setPhase('sweep');
      const vh = window.innerHeight;
      regions.forEach((id) => {
        const top = refs.current[id]?.getBoundingClientRect().top ?? vh;
        const f = Math.min(1, Math.max(0, top / vh));
        at(f * sweep, () => setFlipped((prev) => new Set(prev).add(id)));
      });
    });
    at(hold + load + sweep + 500, () => setPhase('done'));
    return () => timers.forEach((t) => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, reduce]);

  const bind = useCallback((id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  }, []);
  const on = useCallback((id: string) => flipped.has(id), [flipped]);

  return { on, bind, phase };
};
