import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ProjectAnalytics } from '../../types';
import type { CaseTheme } from './theme/themes';

const W = 720;
const H = 260;
const PAD = { t: 28, r: 12, b: 28, l: 36 };

const dateLabel = (start: string, offset: number) => {
  const d = new Date(`${start}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
};

const pct = (n: number, total: number) => `${Math.round((n / total) * 100)}%`;

/** Audience growth: daily active users as bars, 30-day active users as a line. */
const GrowthChart: React.FC<{ a: ProjectAnalytics; accent: string }> = ({ a, accent }) => {
  const reduce = useReducedMotion();
  const n = a.daily.length;
  const max = Math.ceil(Math.max(...a.rolling) / 100) * 100;
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const x = (i: number) => PAD.l + (i + 0.5) * (iw / n);
  const y = (v: number) => PAD.t + ih - (v / max) * ih;
  const line = a.rolling.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L${x(n - 1).toFixed(1)},${PAD.t + ih} L${x(0).toFixed(1)},${PAD.t + ih} Z`;
  const barW = Math.max(3, (iw / n) * 0.55);
  const ticks = [0, max / 2, max];
  const last = n - 1;
  const gid = 'impact-area';

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label={`Active users grew from ${a.rolling[0]} to ${a.rolling[last]} over 30 days. The launch day on ${dateLabel(a.startDate, a.launchDay)} reached ${a.daily[a.launchDay]} users in a single day.`}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="var(--color-line)" strokeDasharray={t ? '2 5' : undefined} />
          <text x={PAD.l - 8} y={y(t) + 3} textAnchor="end" className="fill-[#667085]" style={{ font: '10px ui-monospace, monospace' }}>
            {t}
          </text>
        </g>
      ))}
      {a.daily.map((v, i) => (
        <rect
          key={i}
          x={x(i) - barW / 2}
          y={y(v)}
          width={barW}
          height={Math.max(1, PAD.t + ih - y(v))}
          fill={i === a.launchDay ? accent : '#4A5266'}
          opacity={i === a.launchDay ? 1 : 0.75}
        />
      ))}
      <path d={area} fill={`url(#${gid})`} />
      <motion.path
        d={line}
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <circle cx={x(last)} cy={y(a.rolling[last])} r="4" fill={accent} />
      <text x={x(last) - 8} y={y(a.rolling[last]) - 10} textAnchor="end" fill={accent} style={{ font: '700 12px ui-monospace, monospace' }}>
        {a.rolling[last]}
      </text>
      {/* launch annotation */}
      <text x={x(a.launchDay) - 10} y={y(a.daily[a.launchDay]) + 4} textAnchor="end" className="fill-[#EAEAF0]" style={{ font: '10px ui-monospace, monospace' }}>
        Launch day · {a.daily[a.launchDay]} users
      </text>
      {[0, a.launchDay, last].map((i) => (
        <text key={i} x={x(i)} y={H - 8} textAnchor={i === 0 ? 'start' : i === last ? 'end' : 'middle'} className="fill-[#667085]" style={{ font: '10px ui-monospace, monospace' }}>
          {dateLabel(a.startDate, i)}
        </text>
      ))}
    </svg>
  );
};

const Card: React.FC<{ title: string; note?: string; className?: string; themed?: boolean; children: React.ReactNode }> = ({ title, note, className = '', themed, children }) => (
  <div className={`bg-obsidian p-5 sm:p-7 ${className}`}>
    <h3 className={themed ? 'th-label !text-[var(--th-orange)]' : 'font-mono text-[10px] uppercase tracking-[0.18em] text-muted'}>{title}</h3>
    {note && <p className="mt-1 text-sm text-body">{note}</p>}
    <div className="mt-5">{children}</div>
  </div>
);

const Meter: React.FC<{ label: string; value: number; total: number; accent: string; strong?: boolean }> = ({ label, value, total, accent, strong }) => (
  <li>
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className={strong ? 'text-ice' : 'text-body'}>{label}</span>
      <span className="font-mono text-xs text-dim tabular-nums">
        {value} · {pct(value, total)}
      </span>
    </div>
    <div className="mt-1.5 h-1.5 bg-steel overflow-hidden">
      <motion.div
        className="h-full origin-left"
        style={{ width: `${(value / total) * 100}%`, background: strong ? accent : '#4A5266' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  </li>
);

const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

const ImpactAnalytics: React.FC<{ analytics: ProjectAnalytics; accent: string; glow: string; theme?: CaseTheme }> = ({ analytics: a, accent: baseAccent, glow, theme }) => {
  // A themed case study uses its theme's chart colour instead of the project accent.
  const themed = !!theme;
  const accent = theme ? theme.chartTone : baseAccent;
  const sessions = a.channels.reduce((sum, c) => sum + c.value, 0);
  const maxEng = Math.max(...a.engagement.map((e) => e.value));
  const localShare = pct(a.geo.local.value, a.geo.total);

  return (
    <section id="impact" className="relative px-5 sm:px-6 md:px-12 lg:px-24 mt-20 md:mt-28 scroll-mt-28" data-inspect="ImpactAnalytics" aria-labelledby="impact-title">
      <div
        className={`max-w-[1248px] mx-auto relative overflow-hidden ${themed ? 'border-[3px] border-[var(--th-purple)]' : 'border border-line'}`}
        style={{ boxShadow: themed ? '8px 8px 0 var(--th-ink)' : `0 0 0 1px ${accent}22, 0 30px 100px ${glow}33` }}
      >
        <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-[140px] opacity-20 pointer-events-none" style={{ background: glow }} />

        <div className="relative p-5 sm:p-8 md:p-10 border-b border-line bg-panel">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span
              className={themed ? 'th-label !text-[var(--th-yellow)] inline-flex items-center gap-2' : 'inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]'}
              style={themed ? undefined : { color: accent }}
            >
              <span className={themed ? 'w-2.5 h-2.5 bg-[var(--th-yellow)] border-2 border-[var(--th-ink)] th-blink' : 'w-1.5 h-1.5 rounded-full'} style={themed ? undefined : { background: accent }} /> Live impact
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {a.source} · {a.period}
            </span>
          </div>
          <h2
            id="impact-title"
            className={`mt-4 font-bold text-ice ${themed ? 'th-font text-xl sm:text-2xl md:text-3xl leading-[1.35]' : 'text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.05]'}`}
          >
            {a.rolling[a.rolling.length - 1]} people in a month, before the fest has started.
          </h2>
          <p className="mt-4 max-w-2xl text-body leading-relaxed">
            Real traffic to the live site. Audience is concentrated in Bengaluru, where the college is, and most visitors arrive by typing the address or
            from search rather than through ads.
          </p>
        </div>

        <dl className="relative grid grid-cols-2 lg:grid-cols-4 gap-px bg-line">
          {a.headline.map((h) => (
            <div key={h.label} className="bg-obsidian p-5 sm:p-7">
              <dd
                className={`font-bold tabular-nums ${themed ? 'th-font text-2xl md:text-3xl text-[var(--th-yellow)]' : 'text-4xl md:text-5xl tracking-tight'}`}
                style={themed ? undefined : { color: accent }}
              >
                {h.value}
              </dd>
              <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">{h.label}</dt>
            </div>
          ))}
        </dl>

        <div className="relative grid lg:grid-cols-12 gap-px bg-line border-t border-line">
          <Card
            themed={themed}
            className="lg:col-span-8"
            title="Audience growth"
            note="Bars are daily active users; the line is the running 30-day total."
          >
            <GrowthChart a={a} accent={accent} />
          </Card>

          <Card themed={themed} className="lg:col-span-4" title="Where visitors come from" note={`${sessions} sessions`}>
            <ul className="space-y-4">
              {a.channels.map((c, i) => (
                <Meter key={c.label} label={c.label} value={c.value} total={sessions} accent={accent} strong={i < 2} />
              ))}
            </ul>
          </Card>

          <Card themed={themed} className="lg:col-span-5" title="Where they are" note={`${localShare} of new users are in ${a.geo.local.label}; ${a.geo.countries} countries in total.`}>
            <ul className="space-y-4">
              {a.geo.cities.map((c, i) => (
                <Meter key={c.label} label={c.label} value={c.value} total={a.geo.total} accent={accent} strong={i === 0} />
              ))}
            </ul>
          </Card>

          <Card themed={themed} className="lg:col-span-7" title="Time spent per visitor" note="Average engagement time per active user, by week.">
            <div className="flex items-end gap-3 sm:gap-5 h-44" role="img" aria-label={`Average engagement time per active user by week: ${a.engagement.map((e) => `${e.label} ${fmtTime(e.value)}`).join(', ')}`}>
              {a.engagement.map((e, i) => (
                <div key={e.label} className="flex-1 h-full flex flex-col justify-end items-center gap-2 min-w-0">
                  <span className="font-mono text-xs text-ice tabular-nums">{fmtTime(e.value)}</span>
                  <motion.div
                    className="w-full origin-bottom"
                    style={{ height: `${(e.value / maxEng) * 100}%`, background: e.value === maxEng ? accent : '#4A5266', opacity: e.value === maxEng ? 1 : 0.8 }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <span className="font-mono text-[10px] text-dim whitespace-nowrap">{e.label}</span>
                </div>
              ))}
            </div>
            {a.engagementNote && <p className="mt-4 font-mono text-[10px] text-muted">{a.engagementNote}</p>}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ImpactAnalytics;
