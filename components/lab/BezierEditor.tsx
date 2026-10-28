import React, { useEffect, useRef, useState } from 'react';
import { animate, cubicBezier, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { Check, Copy, Play } from 'lucide-react';
import Experiment from './Experiment';
import { ActionButton, Segmented, Slider } from './controls';
import { PREMIUM_EASE } from '../ui/motion';

type Curve = [number, number, number, number];
type Preset = 'site' | 'lab' | 'inout' | 'back' | 'linear';

const presets: Record<Preset, { label: string; value: Curve }> = {
  site: { label: 'This site', value: PREMIUM_EASE },
  lab: { label: 'Snappy', value: [0.22, 1, 0.36, 1] },
  inout: { label: 'Ease in-out', value: [0.42, 0, 0.58, 1] },
  back: { label: 'Overshoot', value: [0.34, 1.56, 0.64, 1] },
  linear: { label: 'Linear', value: [0, 0, 1, 1] },
};

// Plot geometry (SVG units). y can overshoot, so leave room above and below.
const X0 = 40;
const SIZE = 220;
const Y0 = 290; // y = 0
const toPx = (x: number, y: number) => [X0 + x * SIZE, Y0 - y * SIZE] as const;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const round = (v: number) => Math.round(v * 100) / 100;

const BezierEditor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [curve, setCurve] = useState<Curve>(PREMIUM_EASE);
  const [preset, setPreset] = useState<Preset | null>('site');
  const [duration, setDuration] = useState(900);
  const [run, setRun] = useState(0);
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef<0 | 1 | null>(null);

  // One linear clock drives the dot on the curve and both boxes, so they stay in sync.
  // The transform reads the curve through a ref so it never uses a stale one.
  const curveRef = useRef<Curve>(curve);
  curveRef.current = curve;
  const clock = useMotionValue(1);
  const eased = useTransform(clock, (t) => {
    const [a, b, c, d] = curveRef.current;
    return cubicBezier(a, b, c, d)(t);
  });
  const dotX = useTransform(clock, (t) => X0 + t * SIZE);
  const dotY = useTransform(eased, (e) => Y0 - e * SIZE);
  const boxLeft = useTransform(eased, (e) => `calc(${e * 100}% - ${e * 40}px)`);
  const ghostLeft = useTransform(clock, (t) => `calc(${t * 100}% - ${t * 40}px)`);

  useEffect(() => {
    if (run === 0) return;
    clock.set(0);
    const controls = animate(clock, 1, { duration: duration / 1000, ease: 'linear' });
    return () => controls.stop();
  }, [run, clock, duration]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setTimeout(() => setRun((r) => r + 1), 250);
    return () => clearTimeout(id);
  }, [curve, shouldReduceMotion]);

  const setHandle = (i: 0 | 1, x: number, y: number) => {
    setPreset(null);
    setCurve((c) => {
      const next = [...c] as Curve;
      next[i * 2] = round(clamp(x, 0, 1));
      next[i * 2 + 1] = round(clamp(y, -0.3, 1.3));
      return next;
    });
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (dragging.current === null || !svgRef.current) return;
    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const local = pt.matrixTransform(svgRef.current.getScreenCTM()!.inverse());
    setHandle(dragging.current, (local.x - X0) / SIZE, (Y0 - local.y) / SIZE);
  };

  const onHandleKey = (i: 0 | 1) => (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 0.1 : 0.01;
    const [x, y] = [curve[i * 2], curve[i * 2 + 1]];
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [x - step, y],
      ArrowRight: [x + step, y],
      ArrowUp: [x, y + step],
      ArrowDown: [x, y - step],
    };
    if (moves[e.key]) {
      e.preventDefault();
      setHandle(i, ...moves[e.key]);
    }
  };

  const css = `cubic-bezier(${curve.join(', ')})`;
  const copyCss = () => {
    navigator.clipboard?.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  const [x0, y0] = toPx(0, 0);
  const [x1, y1] = toPx(1, 1);
  const [c1x, c1y] = toPx(curve[0], curve[1]);
  const [c2x, c2y] = toPx(curve[2], curve[3]);

  const code = `
/* CSS */
.card {
  transition: transform ${duration}ms ${css};
}

// framer-motion
animate(card, { x: 240 }, {
  duration: ${duration / 1000},
  ease: [${curve.join(', ')}],
});
`;

  return (
    <Experiment
      id="easing"
      title="Easing curves"
      hint="Drag the two handles"
      summary={
        <>
          <p>When something does need a fixed duration, a cubic Bézier decides how it spends that time. The x axis is time and the y axis is progress, so a steep start means a fast launch.</p>
          <p>This site’s curve launches hard and then glides. The faint box below runs linearly for comparison.</p>
        </>
      }
      usedOn={{ label: 'reveals, the loader exit and page transitions', to: '/colophon' }}
      code={code}
      controls={
        <>
          <Segmented
            label="Start from"
            layoutId="ease-preset"
            value={preset}
            onChange={(p) => {
              setPreset(p);
              setCurve(presets[p].value);
            }}
            options={(Object.keys(presets) as Preset[]).map((k) => ({ value: k, label: presets[k].label }))}
          />
          <Slider label="Duration" value={duration} min={300} max={2000} step={50} format={(v) => `${v}ms`} onChange={setDuration} />
          <div className="flex items-center justify-between gap-3 px-3 py-2.5 border border-line bg-obsidian">
            <code className="font-mono text-xs text-ice truncate">{css}</code>
            <button type="button" onClick={copyCss} className="shrink-0 text-dim hover:text-ice transition-colors" aria-label="Copy cubic-bezier value">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <ActionButton onClick={() => setRun((r) => r + 1)}>
            <Play className="w-3.5 h-3.5" /> Play
          </ActionButton>
        </>
      }
    >
      <div className="p-5 sm:p-8 min-h-[360px] grid md:grid-cols-[minmax(0,300px)_1fr] gap-8 items-center">
        <svg
          ref={svgRef}
          viewBox="0 0 300 360"
          className="w-full max-w-[300px] mx-auto select-none"
          onPointerMove={onPointerMove}
          onPointerUp={() => (dragging.current = null)}
          onPointerLeave={() => (dragging.current = null)}
        >
          <rect x={X0} y={Y0 - SIZE} width={SIZE} height={SIZE} fill="none" stroke="#2D3442" />
          <text x={X0} y={Y0 + 22} fill="#555A6B" fontSize="11" fontFamily="ui-monospace, monospace">time →</text>
          <text x={X0 - 12} y={Y0} transform={`rotate(-90 ${X0 - 12} ${Y0})`} fill="#555A6B" fontSize="11" fontFamily="ui-monospace, monospace">progress →</text>
          <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="#2D3442" strokeDasharray="3 4" />
          <line x1={x0} y1={y0} x2={c1x} y2={c1y} stroke="#526175" />
          <line x1={x1} y1={y1} x2={c2x} y2={c2y} stroke="#526175" />
          <path d={`M${x0},${y0} C${c1x},${c1y} ${c2x},${c2y} ${x1},${y1}`} fill="none" stroke="#EAEAF0" strokeWidth="2.5" />
          <motion.circle cx={dotX} cy={dotY} r="4" fill="#94A3B8" />
          {([0, 1] as const).map((i) => {
            const [cx, cy] = i === 0 ? [c1x, c1y] : [c2x, c2y];
            return (
              <g
                key={i}
                tabIndex={0}
                role="slider"
                aria-label={`Control point ${i + 1}: x ${curve[i * 2]}, y ${curve[i * 2 + 1]}. Arrow keys move it.`}
                aria-valuenow={curve[i * 2 + 1]}
                onKeyDown={onHandleKey(i)}
                onPointerDown={(e) => {
                  dragging.current = i;
                  (e.currentTarget.ownerSVGElement as SVGSVGElement).setPointerCapture(e.pointerId);
                }}
                className="cursor-grab outline-hidden group touch-none"
              >
                <circle cx={cx} cy={cy} r="18" fill="transparent" />
                <circle cx={cx} cy={cy} r="7" fill="#0B0D10" stroke="#EAEAF0" strokeWidth="2" className="group-focus-visible:stroke-[#94A3B8]" />
              </g>
            );
          })}
        </svg>

        <div className="space-y-6">
          <div>
            <p className="text-xs text-dim mb-2">Your curve</p>
            <div className="relative h-12 border-y border-dashed border-line">
              <motion.span className="absolute top-1/2 -mt-5 w-10 h-10 bg-ice" style={{ left: boxLeft }} />
            </div>
          </div>
          <div>
            <p className="text-xs text-dim mb-2">Linear</p>
            <div className="relative h-12 border-y border-dashed border-line">
              <motion.span className="absolute top-1/2 -mt-5 w-10 h-10 border border-[#526175]" style={{ left: ghostLeft }} />
            </div>
          </div>
        </div>
      </div>
    </Experiment>
  );
};

export default BezierEditor;
