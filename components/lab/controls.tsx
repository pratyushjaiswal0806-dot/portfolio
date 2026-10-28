import React from 'react';
import { motion } from 'framer-motion';

export const Slider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}> = ({ label, value, min, max, step = 1, format = String, onChange }) => {
  const id = `slider-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label htmlFor={id} className="text-sm text-body">{label}</label>
        <output htmlFor={id} className="font-mono text-xs text-ice tabular-nums">{format(value)}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="lab-range"
        style={{ ['--fill' as string]: `${fill}%` }}
      />
    </div>
  );
};

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  layoutId,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (v: T) => void;
  layoutId: string;
}) {
  return (
    <div>
      <p className="text-sm text-body mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              aria-pressed={active}
              className={`relative px-3 py-1.5 text-xs border transition-colors ${
                active ? 'border-accent text-obsidian' : 'border-line text-body hover:text-ice hover:border-accent/60'
              }`}
            >
              {active && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 bg-accent"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const Toggle: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="flex items-center justify-between w-full gap-4 text-sm text-body hover:text-ice transition-colors"
  >
    {label}
    <span className={`relative w-9 h-5 border transition-colors ${checked ? 'border-accent bg-accent/20' : 'border-line'}`}>
      <motion.span
        className={`absolute top-[3px] w-3 h-3 ${checked ? 'bg-ice' : 'bg-muted'}`}
        animate={{ left: checked ? 19 : 3 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      />
    </span>
  </button>
);

export const ActionButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = '', ...props }) => (
  <button
    type="button"
    {...props}
    className={`inline-flex items-center gap-2 px-4 py-2.5 bg-ice text-obsidian text-xs font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors ${className}`}
  />
);
