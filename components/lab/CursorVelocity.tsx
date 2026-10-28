import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';
import Experiment from './Experiment';
import { Slider, Toggle } from './controls';

const RING = { stiffness: 280, damping: 35, mass: 0.6 };

/** The site cursor, in a box: a sprung ring that stretches along its direction of travel. */
const CursorVelocity: React.FC = () => {
  const padRef = useRef<HTMLDivElement>(null);
  const [stretch, setStretch] = useState(1.85);
  const [showVector, setShowVector] = useState(true);
  const stretchRef = useRef(stretch);
  stretchRef.current = stretch;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ringX = useSpring(x, RING);
  const ringY = useSpring(y, RING);
  const vx = useVelocity(ringX);
  const vy = useVelocity(ringY);

  const speed = useTransform(() => Math.hypot(vx.get(), vy.get()));
  const angle = useTransform(() => (vx.get() === 0 && vy.get() === 0 ? 0 : (Math.atan2(vy.get(), vx.get()) * 180) / Math.PI));
  const scaleX = useTransform(speed, (s) => 1 + Math.min(s / 3000, 1) * (stretchRef.current - 1));
  const scaleY = useTransform(speed, (s) => 1 - Math.min(s / 3000, 1) * (stretchRef.current - 1) * 0.41);
  const vectorLength = useTransform(speed, (s) => Math.min(s / 12, 180));
  const readout = useTransform(speed, (s) => `${Math.round(s)} px/s`);

  const centre = () => {
    const rect = padRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(rect.width / 2);
    y.set(rect.height / 2);
  };

  return (
    <Experiment
      id="cursor"
      title="Velocity"
      hint="Move your pointer in the box"
      summary={
        <>
          <p>The ring around the cursor lags behind on a spring, and the faster it moves the more it stretches along its direction of travel. Speed is read from the spring itself, so it eases off as the ring catches up.</p>
          <p>The small dot is your raw pointer. The line is the velocity vector.</p>
        </>
      }
      usedOn={{ label: 'the cursor on desktop', to: '/' }}
      code={`
const ringX = useSpring(pointerX, { stiffness: 280, damping: 35, mass: 0.6 });
const ringY = useSpring(pointerY, { stiffness: 280, damping: 35, mass: 0.6 });

const vx = useVelocity(ringX);
const vy = useVelocity(ringY);
const speed = useTransform(() => Math.hypot(vx.get(), vy.get()));
const angle = useTransform(() => Math.atan2(vy.get(), vx.get()) * 180 / Math.PI);

// Stretch along the direction of travel, squash across it
const scaleX = useTransform(speed, [0, 3000], [1, ${stretch.toFixed(2)}]);
const scaleY = useTransform(speed, [0, 3000], [1, ${(1 - (stretch - 1) * 0.41).toFixed(2)}]);
`}
      controls={
        <>
          <Slider label="Maximum stretch" value={stretch} min={1} max={2.6} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={setStretch} />
          <Toggle label="Show velocity vector" checked={showVector} onChange={setShowVector} />
          <p className="text-sm text-dim">
            Speed: <motion.span className="font-mono text-ice tabular-nums">{readout}</motion.span>
          </p>
        </>
      }
    >
      <div
        ref={(el) => {
          padRef.current = el;
          if (el && x.get() === 0) centre();
        }}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left);
          y.set(e.clientY - rect.top);
        }}
        onPointerLeave={centre}
        data-cursor="none"
        className="relative h-[360px] overflow-hidden touch-pan-y cursor-crosshair"
      >
        {/* raw pointer */}
        <motion.span className="absolute top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-ice rounded-full pointer-events-none" style={{ x, y }} />
        {/* velocity vector */}
        {showVector && (
          <motion.span
            className="absolute top-0 left-0 h-px bg-accent origin-left pointer-events-none"
            style={{ x: ringX, y: ringY, width: vectorLength, rotate: angle }}
          />
        )}
        {/* the ring */}
        <motion.span
          className="absolute top-0 left-0 w-12 h-12 -ml-6 -mt-6 rounded-full border border-accent pointer-events-none"
          style={{ x: ringX, y: ringY, rotate: angle, scaleX, scaleY }}
        />
      </div>
    </Experiment>
  );
};

export default CursorVelocity;
