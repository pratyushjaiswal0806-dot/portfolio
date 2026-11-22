import React from 'react';

const surfaces = ['var(--th-cream)', 'var(--th-blue)', 'var(--th-yellow)', 'var(--th-pink)'];

const ThemeFacts: React.FC<{ facts: { label: string; value: string }[] }> = ({ facts }) => (
  <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {facts.map((f, i) => (
      <div
        key={f.label}
        className="th-panel th-fact p-4 sm:p-5"
        style={{ background: surfaces[i % surfaces.length], ['--i' as string]: i } as React.CSSProperties}
      >
        <dd className="th-font th-fact-value">{f.value}</dd>
        <dt className="th-label mt-3">{f.label}</dt>
      </div>
    ))}
  </dl>
);

export default ThemeFacts;
