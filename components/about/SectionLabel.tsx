import React from 'react';

/** Left-column section title used on the about page. Sticky on large screens. */
const SectionLabel: React.FC<{ children: React.ReactNode; note?: string }> = ({ children, note }) => (
  <div className="lg:sticky lg:top-32">
    <h2 className="flex items-center gap-3 font-display text-xl text-ice">
      <span className="w-6 h-px bg-accent" />
      {children}
    </h2>
    {note && <p className="mt-3 pl-9 text-sm text-dim leading-relaxed max-w-[16rem]">{note}</p>}
  </div>
);

export default SectionLabel;
