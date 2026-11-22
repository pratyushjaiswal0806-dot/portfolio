import React from 'react';

/** Themed screenshot frame; replaces the browser chrome on themed case studies. */
const ThemeFrame: React.FC<{ url: string; status: string; children: React.ReactNode }> = ({ url, status, children }) => (
  <div className="th-frame">
    <div className="th-frame-bar">
      <span className="th-label th-frame-text flex items-center gap-2">
        <span className="th-blink th-frame-led inline-block" aria-hidden="true" /> {status}
      </span>
      <span className="th-label th-frame-text truncate max-w-[55%] hidden sm:inline">
        {url.replace(/^https?:\/\//, '').replace(/\/$/, '') || '—'}
      </span>
    </div>
    <div className="th-frame-screen">{children}</div>
  </div>
);

export default ThemeFrame;
