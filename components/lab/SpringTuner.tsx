import React, { useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import Experiment from './Experiment';
import { ActionButton, Segmented, Slider } from './controls';

type Preset = 'ring' | 'nav' | 'dock' | 'wobbly' | 'heavy';

const presets: Record<Preset, { label: string; stiffness: number; damping: number; mass: number }> = {
  ring: { label: 'Cursor ring', stiffness: 280, damping: 35, mass: 0.6 },
  nav: { label: 'Nav indicator', stiffness: 350, damping: 30, mass: 1 },
  dock: { label: 'Mobile dock', stiffness: 450, damping: 35, mass: 1 },
  wobbly: { label: 'Wobbly', stiffness: 120, damping: 8, mass: 1 },
  heavy: { label: 'Heavy', stiffness: 90, damping: 20, mass: 3 },
};

/** Same damped-spring equation framer-motion solves, stepped numerically for the graph. */
const simulate = (stiffness: number, damping: number, mass: number) => {
  const dt = 1 / 240;
  const points: [number, number][] = [];
  let x = 0;
  let v = 0;
  let settle = 0;
  let peak = 0;
  for (let t = 0; t <= 3; t += dt) {
    const a = (-stiffness * (x - 1) - damping * v) / mass;
    v += a * dt;
    x += v * dt;
    points.push([t, x]);
    peak = Math.max(peak, x);
    if (Math.abs(x - 1) > 0.005 || Math.abs(v) > 0.05) settle = t;
  }
  return { points, settle: Math.min(settle, 3), overshoot: Math.max(0, peak - 1) };
};

const W = 600;
const H = 150;

const SpringTuner: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [preset, setPreset] = useState<Preset | null>('ring');
  const [stiffness, setStiffness] = useState(presets.ring.stiffness);
  const [damping, setDamping] = useState(presets.ring.damping);
  const [mass, setMass] = useState(presets.ring.mass);
  const [run, setRun] = useState(0);

  const position = useMotionValue(0);
  const playhead = useMotionValue(-1);
  const left = useTransform(position, (p) => `calc(${p * 100}% - ${p * 40}px)`);
  const playheadX = useTransform(playhead, (t) => (t < 0 ? 0 : (t / 3) * W));
  const playheadOpacity = useTransform(playhead, (t) => (t < 0 ? 0 : 1));
  const raf = useRef(0);

  const { points, settle, overshoot } = useMemo(() => simulate(stiffness, damping, mass), [stiffness, damping, mass]);

  // y in [-0.1, max(1.6, peak)] mapped into the graph height
  const top = Math.max(1.5, 1 + overshoot + 0.1);
  const toY = (x: number) => H - ((x + 0.1) / (top + 0.1)) * H;
  const path = points
    .filter((_, i) => i % 3 === 0)
    .map(([t, x], i) => `${i ? 'L' : 'M'}${((t / 3) * W).toFixed(1)},${toY(x).toFixed(1)}`)
    .join(' ');

  useEffect(() => {
    if (run === 0) return;
    position.set(0);
    const controls = animate(position, 1, { type: 'spring', stiffness, damping, mass, restDelta: 0.0005 });
    const start = performance.now();
    cancelAnimationFrame(raf.current);
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      playhead.set(t);
      if (t < 3) raf.current = requestAnimationFrame(tick);
      else playhead.set(-1);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      controls.stop();
      cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  // Replay shortly after the numbers change, so tuning feels live.
  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setTimeout(() => setRun((r) => r + 1), 220);
    return () => clearTimeout(id);
  }, [stiffness, damping, mass, shouldReduceMotion]);

  const applyPreset = (p: Preset) => {
    setPreset(p);
    setStiffness(presets[p].stiffness);
    setDamping(presets[p].damping);
    setMass(presets[p].mass);
  };
  const tweak = (set: (v: number) => void) => (v: number) => {
    setPreset(null);
    set(v);
  };

  const code = `
import { useSpring } from 'framer-motion';

// Stiffness pulls towards the target, damping resists
// the speed, mass makes everything slower to react.
const x = useSpring(0, {
  stiffness: ${stiffness},
  damping: ${damping},
  mass: ${mass},
});

x.set(1); // anything styled with x springs to the new value
`;

  return (
    <Experiment
      id="springs"
      title="Springs"
      hint="Click the track to replay"
      summary={
        <>
          <p>Most motion on this site isn’t timed, it’s simulated. A spring has no duration: it settles when the physics says so, which is why it feels natural when you interrupt it.</p>
          <p>The graph is the ball’s position over three seconds. Drag the sliders and watch the curve change shape.</p>
        </>
      }
      usedOn={{ label: 'the cursor, nav indicator and mobile dock', to: '/' }}
      code={code}
      controls={
        <>
          <Segmented
            label="Start from"
            layoutId="spring-preset"
            value={preset}
            onChange={applyPreset}
            options={(Object.keys(presets) as Preset[]).map((k) => ({ value: k, label: presets[k].label }))}
          />
          <Slider label="Stiffness" value={stiffness} min={20} max={800} onChange={tweak(setStiffness)} />
          <Slider label="Damping" value={damping} min={1} max={80} onChange={tweak(setDamping)} />
          <Slider label="Mass" value={mass} min={0.1} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={tweak(setMass)} />
          <ActionButton onClick={() => setRun((r) => r + 1)}>
            <Play className="w-3.5 h-3.5" /> Replay
          </ActionButton>
        </>
      }
    >
      <div className="p-5 sm:p-8 min-h-[360px] flex flex-col gap-8">
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="relative h-16 border-y border-dashed border-line text-left"
          aria-label="Replay the spring"
        >
          <span className="absolute right-0 top-0 bottom-0 w-px bg-accent/60" />
          <span className="absolute right-2 -top-6 text-[11px] text-dim">target</span>
          <motion.span
            className="absolute top-1/2 -mt-5 w-10 h-10 bg-ice shadow-[0_0_30px_rgba(234,234,240,0.15)]"
            style={{ left }}
          />
        </button>

        <div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" aria-hidden="true">
            <line x1="0" x2={W} y1={toY(1)} y2={toY(1)} stroke="#526175" strokeDasharray="4 4" />
            <line x1="0" x2={W} y1={toY(0)} y2={toY(0)} stroke="#2D3442" />
            {settle < 3 && (
              <line x1={(settle / 3) * W} x2={(settle / 3) * W} y1="0" y2={H} stroke="#2D3442" strokeDasharray="2 4" />
            )}
            <path d={path} fill="none" stroke="#EAEAF0" strokeWidth="2" />
            <motion.line x1={playheadX} x2={playheadX} y1="0" y2={H} stroke="#94A3B8" strokeWidth="1" opacity={playheadOpacity} />
          </svg>
          <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-dim">
            <span>0s</span>
            <span className="text-body">
              Settles in <span className="text-ice tabular-nums">{settle >= 3 ? '3s+' : `${settle.toFixed(2)}s`}</span>
              {' · '}overshoot <span className="text-ice tabular-nums">{Math.round(overshoot * 100)}%</span>
            </span>
            <span>3s</span>
          </div>
        </div>
      </div>
    </Experiment>
  );
};

export default SpringTuner;
