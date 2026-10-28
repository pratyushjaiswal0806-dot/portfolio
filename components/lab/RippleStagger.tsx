import React, { useEffect, useRef, useState } from 'react';
import { useAnimate, useInView, useReducedMotion } from 'framer-motion';
import Experiment from './Experiment';
import { Segmented, Slider } from './controls';

const COLS = 13;
const ROWS = 9;
const CELLS = COLS * ROWS;

type Shape = 'circle' | 'diamond' | 'row';

const distance = (i: number, origin: number, shape: Shape) => {
  const dx = Math.abs((i % COLS) - (origin % COLS));
  const dy = Math.abs(Math.floor(i / COLS) - Math.floor(origin / COLS));
  if (shape === 'diamond') return dx + dy;
  if (shape === 'row') return dx;
  return Math.hypot(dx, dy);
};

/** Stagger, but measured from wherever you click instead of from the first item. */
const RippleStagger: React.FC = () => {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(45);
  const [shape, setShape] = useState<Shape>('circle');
  const played = useRef(false);

  const ripple = (origin: number) => {
    const cells = scope.current?.querySelectorAll('[data-cell]');
    if (!cells) return;
    animate(
      cells,
      { scale: [1, 1.9, 1], backgroundColor: ['#2D3442', '#EAEAF0', '#2D3442'] },
      { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i: number) => distance(i, origin, shape) * (step / 1000) },
    );
  };

  useEffect(() => {
    if (inView && !played.current && !shouldReduceMotion) {
      played.current = true;
      ripple(Math.floor(CELLS / 2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, shouldReduceMotion]);

  return (
    <Experiment
      id="stagger"
      title="Stagger"
      hint="Click any square"
      summary={
        <>
          <p>Staggering delays each item a little more than the last, so a group reads as one movement rather than a pile of separate ones.</p>
          <p>Here the delay comes from each square’s distance to the one you click, so the wave starts under your pointer.</p>
        </>
      }
      usedOn={{ label: 'the hero entrance and section reveals', to: '/' }}
      code={`
const [scope, animate] = useAnimate();

function ripple(origin) {
  animate(
    scope.current.querySelectorAll('[data-cell]'),
    { scale: [1, 1.9, 1] },
    {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      // ${shape === 'circle' ? 'straight-line distance' : shape === 'diamond' ? 'grid steps (Manhattan distance)' : 'distance along the row only'}
      delay: (i) => distance(i, origin) * ${(step / 1000).toFixed(3)},
    },
  );
}
`}
      controls={
        <>
          <Slider label="Delay per step" value={step} min={10} max={120} step={5} format={(v) => `${v}ms`} onChange={setStep} />
          <Segmented
            label="Measure distance as"
            layoutId="ripple-shape"
            value={shape}
            onChange={setShape}
            options={[
              { value: 'circle', label: 'Circle' },
              { value: 'diamond', label: 'Diamond' },
              { value: 'row', label: 'Columns' },
            ]}
          />
        </>
      }
    >
      <div className="h-[360px] flex items-center justify-center p-6">
        <div ref={scope} className="grid gap-3 sm:gap-4" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
          {Array.from({ length: CELLS }, (_, i) => (
            <button
              key={i}
              type="button"
              data-cell
              onClick={() => ripple(i)}
              aria-label={`Start ripple from square ${i + 1}`}
              className="w-3 h-3 sm:w-4 sm:h-4 bg-line hover:outline hover:outline-1 hover:outline-accent outline-offset-2"
            />
          ))}
        </div>
      </div>
    </Experiment>
  );
};

export default RippleStagger;
