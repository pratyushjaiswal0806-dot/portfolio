import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { PREMIUM_EASE } from '../components/ui/motion';
import { personal } from '../data/personal';
import { buildInfo, formatBuildDate } from '../data/site';
import { usePageMeta } from '../lib/usePageMeta';
import { useSiteUI } from '../lib/site-ui';
import pkg from '../package.json';

const tokens = [
  { name: 'obsidian', role: 'Canvas' },
  { name: 'panel', role: 'Alternate section' },
  { name: 'steel', role: 'Cards & panels' },
  { name: 'line', role: 'Borders & grids' },
  { name: 'muted', role: 'System labels' },
  { name: 'body', role: 'Paragraphs' },
  { name: 'accent', role: 'The one accent' },
  { name: 'ice', role: 'Headings' },
];

type Bezier = [number, number, number, number];

const curves: { name: string; where: string; value: Bezier }[] = [
  { name: 'PREMIUM_EASE', where: 'Reveals, loader exit, page transitions', value: PREMIUM_EASE },
  { name: 'SYSTEM_EASE', where: 'Motion Lab modules', value: [0.22, 1, 0.36, 1] },
  { name: 'ease-out', where: 'Small state changes', value: [0, 0, 0.58, 1] },
];

const springs = [
  ['Cursor ring', 'stiffness 280 · damping 35 · mass 0.6'],
  ['Cursor dot', 'stiffness 750 · damping 20 · mass 0.1'],
  ['Nav indicator', 'stiffness 350 · damping 30'],
  ['Mobile dock pill', 'stiffness 450 · damping 35'],
  ['Boot loader blocks', 'tension 220 · mass 2 (react-spring)'],
];

const stackKeys: [string, string][] = [
  ['react', 'UI'],
  ['react-router', 'Routing & view transitions'],
  ['framer-motion', 'Most of the motion'],
  ['@react-spring/web', 'Boot loader & portrait physics'],
  ['tailwindcss', 'Styling & design tokens'],
  ['cmdk', '⌘K palette'],
  ['@mdx-js/rollup', 'Notes'],
  ['shiki', 'Build-time code highlighting'],
  ['lucide-react', 'Icons'],
  ['vite', 'Build'],
  ['typescript', 'Types'],
];

const deps: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies };

const details = [
  'React 19 with React Router 7’s data router. Every page except home is code-split with route-level lazy loading, so chunks load before a navigation commits.',
  'Page transitions use the View Transitions API. Project images share a view-transition-name, so cards morph into case-study heroes. Browsers without support just navigate.',
  'Every animation checks prefers-reduced-motion. With it on, the boot loader, parallax and page transitions are skipped entirely.',
  'The boot loader plays once per browser session (sessionStorage), so refreshes and deep links go straight to content.',
  'Inspect mode is mostly CSS: [data-inspect] outlines and attr() labels, plus a small rAF-throttled script for the hover readout.',
  'Design tokens live in one Tailwind v4 @theme block. This page reads them back from CSS custom properties at runtime.',
  'Type is Space Grotesk for display and DM Sans for text, served from Google Fonts with display=swap.',
  'Notes are MDX, highlighted at build time with Shiki, so no highlighter ships to the browser.',
];

const bezierPoint = (t: number, p1: number, p2: number) => 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3;

const CurvePlot: React.FC<{ value: Bezier }> = ({ value }) => {
  const [x1, y1, x2, y2] = value;
  const size = 160;
  const pad = 12;
  const map = (x: number, y: number) => [pad + x * size, pad + (1 - y) * size];
  const points = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    const [px, py] = map(bezierPoint(t, x1, x2), bezierPoint(t, y1, y2));
    return `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`;
  }).join(' ');
  const [sx, sy] = map(0, 0);
  const [ex, ey] = map(1, 1);
  const [c1x, c1y] = map(x1, y1);
  const [c2x, c2y] = map(x2, y2);

  return (
    <svg viewBox={`0 0 ${size + pad * 2} ${size + pad * 2}`} className="w-full h-auto" aria-hidden="true">
      <rect x={pad} y={pad} width={size} height={size} fill="none" stroke="#2D3442" />
      <line x1={sx} y1={sy} x2={c1x} y2={c1y} stroke="#526175" strokeDasharray="3 3" />
      <line x1={ex} y1={ey} x2={c2x} y2={c2y} stroke="#526175" strokeDasharray="3 3" />
      <circle cx={c1x} cy={c1y} r="3" fill="#526175" />
      <circle cx={c2x} cy={c2y} r="3" fill="#526175" />
      <path d={points} fill="none" stroke="#EAEAF0" strokeWidth="2" />
    </svg>
  );
};

const ColophonPage: React.FC = () => {
  usePageMeta({
    title: 'Colophon — Pratyush Jaiswal',
    description: 'How this site is built: design tokens, type, motion curves, the stack and build details.',
    path: '/colophon',
  });

  const shouldReduceMotion = useReducedMotion();
  const { notify } = useSiteUI();
  const [values, setValues] = useState<Record<string, string>>({});

  // Read the tokens back from the stylesheet, so this page can't drift from the CSS.
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    setValues(Object.fromEntries(tokens.map((t) => [t.name, styles.getPropertyValue(`--color-${t.name}`).trim()])));
  }, []);

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).then(() => notify(`Copied ${text}`), () => notify(text));
  };

  return (
    <>
      <PageHeader kicker="Colophon" inspectName="ColophonHeader" title={<>How this site <span className="text-accent">is built.</span></>}>
        <p className="mt-8 text-body text-lg leading-relaxed max-w-2xl">
          The tokens, type, motion and code behind these pages. The source is{' '}
          <a href={personal.repo} target="_blank" rel="noreferrer" className="text-ice underline decoration-line underline-offset-4 hover:decoration-accent">
            on GitHub
          </a>.
        </p>
      </PageHeader>

      <div className="px-5 sm:px-6 md:px-12 lg:px-24 pb-24 md:pb-32 space-y-20 md:space-y-28">
        {/* Tokens */}
        <section className="max-w-[1248px] mx-auto relative" data-inspect="Tokens">
          <span className="section-kicker">01 / Colour tokens</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-line">
            {tokens.map((t) => {
              const hex = values[t.name] ?? '';
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => copy(hex)}
                  className="group text-left border-r border-b border-line p-4 hover:bg-steel/60 transition-colors"
                  data-cursor="hover"
                  aria-label={`Copy ${t.name} ${hex}`}
                >
                  <span className="block aspect-[5/3] border border-line mb-4" style={{ background: hex }} />
                  <span className="block text-ice text-sm font-medium">{t.name}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-muted mt-1">{hex || '—'} · {t.role}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-dim">
            Each case study adds one accent borrowed from that project’s own site.
          </p>
        </section>

        {/* Type */}
        <section className="max-w-[1248px] mx-auto relative" data-inspect="Type">
          <span className="section-kicker">02 / Type</span>
          <div className="border-t border-line">
            {[
              { label: 'Display · Space Grotesk 700', sample: 'Interfaces that feel considered.', className: 'font-display text-4xl md:text-6xl font-bold tracking-tight text-ice' },
              { label: 'Text · DM Sans 300–500', sample: 'I build fast, expressive web interfaces and care about the motion details.', className: 'font-sans text-xl md:text-2xl font-light text-[#B4BBC8]' },
              { label: 'System · ui-monospace', sample: 'BUILD: ' + buildInfo.sha.toUpperCase() + ' · STATUS: READY', className: 'font-mono text-sm uppercase tracking-[0.2em] text-accent' },
            ].map((row) => (
              <div key={row.label} className="grid md:grid-cols-[220px_1fr] gap-3 md:gap-8 py-8 border-b border-line items-baseline">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{row.label}</span>
                <p className={row.className}>{row.sample}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Motion */}
        <section className="max-w-[1248px] mx-auto relative" data-inspect="Motion">
          <span className="section-kicker">03 / Motion</span>
          <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
            {curves.map((c) => (
              <div key={c.name} className="bg-obsidian p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-xs text-ice">{c.name}</p>
                  <p className="font-mono text-[10px] text-muted">[{c.value.join(', ')}]</p>
                </div>
                <p className="mt-1 text-xs text-dim">{c.where}</p>
                <div className="mt-5 max-w-[220px]">
                  <CurvePlot value={c.value} />
                </div>
                <div className="mt-5 h-8 border border-line relative overflow-hidden">
                  <motion.span
                    className="absolute top-1/2 left-1 w-5 h-5 -mt-2.5 bg-accent"
                    animate={shouldReduceMotion ? undefined : { left: ['4px', 'calc(100% - 24px)'] }}
                    transition={{ duration: 1.4, ease: c.value, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.6 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <dl className="mt-8 border-t border-line">
            {springs.map(([name, value]) => (
              <div key={name} className="grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-8 py-3.5 border-b border-line">
                <dt className="text-ice text-sm">{name}</dt>
                <dd className="font-mono text-xs text-body">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Stack */}
        <section className="max-w-[1248px] mx-auto relative" data-inspect="Stack">
          <span className="section-kicker">04 / Stack</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
            {stackKeys.filter(([key]) => deps[key]).map(([key, use]) => (
              <div key={key} className="p-5 border-r border-b border-line">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-sm text-ice">{key}</span>
                  <span className="font-mono text-[10px] text-accent">{deps[key].replace(/^[\^~]/, 'v')}</span>
                </div>
                <p className="mt-1.5 text-xs text-dim">{use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Details */}
        <section className="max-w-[1248px] mx-auto relative grid lg:grid-cols-12 gap-10" data-inspect="Details">
          <div className="lg:col-span-4">
            <span className="section-kicker">05 / Details</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ice tracking-tight">The small print.</h2>
          </div>
          <ul className="lg:col-span-8 border-t border-line">
            {details.map((d, i) => (
              <li key={i} className="grid grid-cols-[40px_1fr] gap-4 py-4 border-b border-line">
                <span className="font-mono text-[10px] text-muted pt-1">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-[#B4BBC8] leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Build */}
        <section className="max-w-[1248px] mx-auto relative" data-inspect="Build">
          <span className="section-kicker">06 / Build</span>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 md:p-8 border border-line bg-steel/40">
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-muted">Commit</dt>
                <dd className="mt-1 text-ice">{buildInfo.sha}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-muted">Built</dt>
                <dd className="mt-1 text-ice">{formatBuildDate(buildInfo.date)}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-muted">Hosting</dt>
                <dd className="mt-1 text-ice">Vercel</dd>
              </div>
            </dl>
            <a
              href={buildInfo.sha === 'dev' ? personal.repo : `${personal.repo}/commit/${buildInfo.sha}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-line font-mono text-xs uppercase tracking-wider text-ice hover:border-accent transition-colors self-start md:self-auto"
              data-cursor="hover"
            >
              View source <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default ColophonPage;
