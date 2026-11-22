import React from 'react';
import { createPortal } from 'react-dom';
import { SWEEP_TIMING, type SweepPhase } from './useThemeSweep';
import type { CaseTheme } from './themes';

/**
 * HUD for the theme switch: a small loading card with a stepped progress bar,
 * then a band that sweeps the viewport while regions flip. Each theme styles
 * the card and band its own way (scan line for pixel, brush stroke for folk).
 */
const ThemeSweepHud: React.FC<{ phase: SweepPhase; theme: CaseTheme }> = ({ phase, theme }) => {
  if (phase === 'idle' || phase === 'done') return null;
  const sweeping = phase === 'sweep';

  return createPortal(
    <div aria-hidden="true" className={`${theme.className} th-vars fixed inset-0 z-[300] pointer-events-none`}>
      {sweeping && <div className="th-sweep" style={{ animationDuration: `${SWEEP_TIMING.sweep}ms` }} />}
      <div className="th-hud absolute left-1/2 bottom-6 sm:bottom-10 -translate-x-1/2 w-[min(320px,calc(100vw-32px))]">
        <div className="flex items-center justify-between gap-3">
          <span className="th-hud-text">{sweeping ? theme.copy.hudReady : theme.copy.hudLoading}</span>
          <span className={`th-hud-led ${sweeping ? 'is-ready' : ''}`} />
        </div>
        <div className="th-hud-track mt-3">
          <span className="th-hud-fill" style={{ animationDuration: `${SWEEP_TIMING.load}ms` }} />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ThemeSweepHud;
