import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// ─── Configuration ──────────────────────────────────────────
const LETTERS = ['p', 'r', 'a', 't', 'y', 'u', 's', 'h'];
const DURATION = 3.0; // total letter-animation duration (seconds)

// Timeline anchors (seconds) — single source of truth for both
// the keyframe generator and the glitch-state toggle.
const GLITCH_BEFORE = 1.5;
const GLITCH_PEAK   = 1.75;
const GLITCH_SETTLE = 2.05;
const EXIT_START    = 2.15;

// Marquee speed in px/sec — keeps perceived speed consistent
// across breakpoints even though gap sizes change.
const MARQUEE_PX_PER_SEC = 110;

// Injected into a <style> tag so the marquee runs on the GPU
// compositor thread with zero JS overhead.
const MARQUEE_CSS = `
@keyframes bl-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes bl-scan{0%{top:-2px}100%{top:100%}}
@keyframes bl-pulse{0%,100%{opacity:.4}50%{opacity:1}}
`;

// ─── Keyframe Types ─────────────────────────────────────────
interface KF {
  t: number;
  opacity?: number;
  y?: number;
  x?: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: number;
  rotate?: number;
}

// ─── Keyframe Builder ───────────────────────────────────────
const buildKeyframes = (i: number) => {
  const pts: KF[] = [];

  // 1) Hidden
  pts.push({ t: 0, opacity: 0, y: 50, scaleX: 0.9, skewX: 8, rotate: 3 });

  // 2) Pre-reveal hold
  const revealAt = i * 0.09;
  if (revealAt > 0.01) {
    pts.push({ t: revealAt - 0.01, opacity: 0, y: 50, scaleX: 0.9, skewX: 8, rotate: 3 });
  }

  // 3) Overshoot reveal — each letter has a unique personality
  const overshootAt = revealAt + 0.05;
  let oSkew = 0, oScaleX = 1, oRot = 0, oY = -25, oX = 6;

  if (i === 0) { oRot = -10; oSkew = -12; }        // 'p' — tilts with italic lean
  if (i === 4) { oSkew = -25; oRot = -6; }          // 'y' — dramatic skew
  if (i === 5) { oScaleX = 2.0; oSkew = -30; }      // 'u' — stretches wide
  if (i === 6) { oScaleX = 1.6; oRot = 4; }         // 's' — slight stretch
  if (i === 7) { oSkew = -18; oRot = 6; }           // 'h' — tilts opposite

  pts.push({ t: overshootAt, opacity: 1, y: oY, x: oX, scaleX: oScaleX, skewX: oSkew, rotate: oRot });

  // 4) Settle to baseline
  const settleAt = revealAt + 0.16;
  pts.push({ t: settleAt, opacity: 1, y: 0, x: 0, scaleX: 1, scaleY: 1, skewX: 0, rotate: 0 });

  // 5) Pre-glitch hold
  pts.push({ t: GLITCH_BEFORE, opacity: 1, y: 0, x: 0, scaleX: 1, scaleY: 1, skewX: 0, rotate: 0 });

  // 6) Glitch peak — the signature distortion
  let gY = 0, gX = 0, gSX = 1, gSY = 1, gSkew = 0, gRot = 0;

  if (i === 4) {
    // 'y' → dramatic diagonal slash morph
    gSkew = -42; gSY = 2.6; gY = 22; gX = -10; gRot = -6;
  } else if (i === 3) {
    // 't' — slight italic distortion
    gSkew = 18; gX = 6; gRot = 4;
  } else if (i === 7) {
    // 'h' — heavy italic shift
    gSkew = -28; gX = 14; gRot = -4;
  } else if (i === 5) {
    // 'u' — horizontal stretch
    gSX = 1.4; gX = -5; gRot = 2;
  } else {
    // Subtle jitter for remaining letters
    gX = i % 2 === 0 ? 5 : -5;
    gY = i % 2 === 0 ? -4 : 4;
    gRot = i % 2 === 0 ? 2 : -2;
  }

  pts.push({ t: GLITCH_PEAK, opacity: 1, y: gY, x: gX, scaleX: gSX, scaleY: gSY, skewX: gSkew, rotate: gRot });

  // 7) Post-glitch settle
  pts.push({ t: GLITCH_SETTLE, opacity: 1, y: 0, x: 0, scaleX: 1, scaleY: 1, skewX: 0, rotate: 0 });

  // 8) Pre-exit hold
  const exitAt = EXIT_START + i * 0.065;
  pts.push({ t: exitAt - 0.01, opacity: 1, y: 0, x: 0, scaleX: 1, scaleY: 1, skewX: 0, rotate: 0 });

  // 9) Exit — drops down with a slight skew
  const exitDone = exitAt + 0.1;
  pts.push({ t: exitDone, opacity: 0, y: 35, x: -10, scaleX: 0.92, skewX: 6, rotate: 3 });

  // 10) Final hold
  pts.push({ t: DURATION, opacity: 0, y: 35, x: -10, scaleX: 0.92, skewX: 6, rotate: 3 });

  pts.sort((a, b) => a.t - b.t);

  return {
    times:  pts.map(p => p.t / DURATION),
    opacity: pts.map(p => p.opacity ?? 0),
    y:       pts.map(p => p.y ?? 0),
    x:       pts.map(p => p.x ?? 0),
    scaleX:  pts.map(p => p.scaleX ?? 1),
    scaleY:  pts.map(p => p.scaleY ?? 1),
    skewX:   pts.map(p => p.skewX ?? 0),
    rotate:  pts.map(p => p.rotate ?? 0),
  };
};

// Pre-compute at module load — no per-render cost.
const LETTER_KF = LETTERS.map((_, i) => buildKeyframes(i));

// ─── Marquee Word ───────────────────────────────────────────
interface WordProps { glitch: boolean; reduced: boolean; }

const MarqueeWord: React.FC<WordProps> = React.memo(({ glitch, reduced }) => {
  const cls = [
    'inline-flex',
    'select-none lowercase tracking-tight',
    'text-[5rem] md:text-[9rem] lg:text-[13rem]',
    'font-bold text-[#EAEAF0]',
  ].join(' ');

  if (reduced) return <span className={cls} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{LETTERS.join('')}</span>;

  return (
    <span className={cls} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {LETTERS.map((ch, idx) => {
        const kf = LETTER_KF[idx];
        const display = ch === 'y' && glitch ? '\\' : ch;

        return (
          <motion.span
            key={idx}
            className="inline-block origin-bottom will-change-transform"
            animate={{
              opacity: kf.opacity,
              x: kf.x,
              y: kf.y,
              scaleX: kf.scaleX,
              scaleY: kf.scaleY,
              skewX: kf.skewX,
              rotate: kf.rotate,
            }}
            transition={{
              times: kf.times,
              duration: DURATION,
              ease: 'linear',
            }}
          >
            {display}
          </motion.span>
        );
      })}
    </span>
  );
});
MarqueeWord.displayName = 'MarqueeWord';

// ─── System Label ───────────────────────────────────────────
const SysLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className={`text-[10px] font-bold uppercase tracking-[0.2em] text-[#555A6B] ${className}`}
    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
  >
    {children}
  </motion.span>
);

// ─── BootLoader ─────────────────────────────────────────────
interface BootLoaderProps {
  onComplete?: () => void;
}

const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const reduced = Boolean(prefersReduced);

  const [glitch, setGlitch] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [marqueeDur, setMarqueeDur] = useState(18);

  // Glitch toggle synced to timeline constants
  useEffect(() => {
    if (reduced) return;
    const t1 = setTimeout(() => setGlitch(true),  GLITCH_BEFORE * 1000);
    const t2 = setTimeout(() => setGlitch(false), GLITCH_SETTLE * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [reduced]);

  // Notify parent when done
  useEffect(() => {
    if (!onComplete) return;
    const t = setTimeout(onComplete, reduced ? 800 : DURATION * 1000);
    return () => clearTimeout(t);
  }, [onComplete, reduced]);

  // Measure track width → derive scroll duration at constant px/sec
  useEffect(() => {
    if (reduced) return;
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const halfWidth = el.scrollWidth / 2;
      if (halfWidth > 0) setMarqueeDur(halfWidth / MARQUEE_PX_PER_SEC);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [reduced]);

  const words = useMemo(
    () => Array.from({ length: 4 }).map((_, i) => (
      <MarqueeWord key={i} glitch={glitch} reduced={reduced} />
    )),
    [glitch, reduced],
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(14px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[10000] bg-[#0B0D10] flex flex-col overflow-hidden select-none"
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Injected GPU-accelerated CSS animations */}
      <style>{MARQUEE_CSS}</style>

      {/* Screen-reader text */}
      <span className="sr-only">Loading portfolio</span>

      {/* ── Ambient Glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(148,163,184,0.035), transparent)',
        }}
      />

      {/* ── Scan Line ── */}
      {!reduced && (
        <div
          className="absolute left-0 w-full h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.08) 30%, rgba(148,163,184,0.08) 70%, transparent)',
            animation: 'bl-scan 3s linear infinite',
          }}
        />
      )}

      {/* ── Top Metadata ── */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-10 pt-6" aria-hidden="true">
        <SysLabel>VER 2.5.0</SysLabel>
        <SysLabel>BOOT_SEQUENCE_00</SysLabel>
      </div>

      {/* ── Marquee Track ── */}
      <div className="flex-1 flex items-center w-full" aria-hidden="true">
        {reduced ? (
          <div className="flex px-6">
            <MarqueeWord glitch={false} reduced />
          </div>
        ) : (
          <div
            ref={trackRef}
            className="flex whitespace-nowrap will-change-transform"
            style={{
              animation: `bl-scroll ${marqueeDur}s linear infinite`,
            }}
          >
            {/* Set 1 */}
            <div className="flex gap-[200px] md:gap-[350px] lg:gap-[450px] pr-[200px] md:pr-[350px] lg:pr-[450px]">
              {words}
            </div>
            {/* Set 2 (duplicate for seamless loop) */}
            <div className="flex gap-[200px] md:gap-[350px] lg:gap-[450px] pr-[200px] md:pr-[350px] lg:pr-[450px]">
              {words}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-10 px-6 md:px-10 pb-6" aria-hidden="true">
        {/* Progress line */}
        <div className="w-full h-px bg-[#2D3442] mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-[#94A3B8] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div className="flex items-center justify-between">
          <SysLabel>
            <span style={{ animation: 'bl-pulse 1.4s ease-in-out infinite' }} className="inline-block mr-1.5 w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
            STATUS: COMPILING
          </SysLabel>
          <SysLabel>LAT: 12.9716° N &nbsp;·&nbsp; LNG: 77.5946° E</SysLabel>
        </div>
      </div>
    </motion.div>
  );
};

export default BootLoader;