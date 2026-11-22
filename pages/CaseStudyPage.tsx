import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Lock } from 'lucide-react';
import type { Project } from '../types';
import { getProject, getNextProject, projects } from '../data/projects';
import { usePageMeta } from '../lib/usePageMeta';
import { staggerContainer, fadeUp } from '../components/ui/motion';
import ImpactAnalytics from '../components/work/ImpactAnalytics';
import ThemeSweepHud from '../components/work/theme/ThemeSweepHud';
import ThemeFrame from '../components/work/theme/ThemeFrame';
import ThemeFacts from '../components/work/theme/ThemeFacts';
import { useThemeSweep } from '../components/work/theme/useThemeSweep';
import { caseThemes, type CaseTheme } from '../components/work/theme/themes';
import NotFoundPage from './NotFoundPage';

const baseSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'The problem' },
  { id: 'decisions', label: 'Key decisions' },
  { id: 'frontend', label: 'Frontend notes' },
  { id: 'outcome', label: 'Outcome' },
];

const impactSection = { id: 'impact', label: 'Live impact' };

/** Regions of a themed case study, in the order the sweep can reach them. */
const sweepRegions = ['header', 'media', 'impact', 'facts', 'toc', 'overview', 'problem', 'decisions', 'frontend', 'outcome', 'gallery', 'next'] as const;

const CaseStudyPage: React.FC = () => {
  const { slug } = useParams();
  const project = getProject(slug);

  usePageMeta({
    title: project ? `${project.title} — case study — Pratyush Jaiswal` : 'Not found — Pratyush Jaiswal',
    description: project ? `${project.tagline} ${project.overview}`.slice(0, 300) : 'This page does not exist.',
    path: `/work/${slug ?? ''}`,
  });

  if (!project) return <NotFoundPage />;
  return <CaseStudy key={project.slug} project={project} />;
};

const CaseStudy: React.FC<{ project: Project }> = ({ project }) => {
  const shouldReduceMotion = useReducedMotion();
  const next = getNextProject(project.slug);
  const number = projects.indexOf(project) + 1;
  // Open in the normal portfolio look, then sweep each region into the project's own theme.
  const theme = project.theme ? caseThemes[project.theme] : undefined;
  const { on, bind, phase } = useThemeSweep(!!theme, shouldReduceMotion, sweepRegions);
  const px = (id: string) => (theme && on(id) ? `${theme.className} th-flip` : '');
  const tone = (i: number) => theme?.tones[i % theme.tones.length];
  const sections = project.analytics ? [impactSection, ...baseSections] : baseSections;
  const activeId = useActiveSection(sections.map((s) => s.id));
  const accentVars = {
    ['--project' as string]: project.accent.base,
    ['--project-glow' as string]: project.accent.glow,
    ['--kicker-line' as string]: project.accent.base,
  } as React.CSSProperties;

  return (
    <article style={accentVars} className={`relative ${theme ? `${theme.className}-vars th-vars` : ''}`}>
      {theme && <ThemeSweepHud phase={phase} theme={theme} />}
      {/* ── Header ───────────────────────────────────── */}
      <header ref={bind('header')} data-inspect="CaseStudyHeader" className={`relative pt-28 md:pt-40 px-5 sm:px-6 md:px-12 lg:px-24 overflow-hidden ${px('header')}`}>
        <div className="absolute inset-0 blueprint-grid-fade pointer-events-none" />
        <div
          className="absolute -top-48 -right-40 w-[640px] h-[640px] rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{ background: project.accent.glow }}
        />

        <motion.div
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          className="max-w-[1248px] mx-auto relative"
        >
          <motion.div variants={fadeUp}>
            <Link
              to="/work"
              viewTransition
              className="group inline-flex items-center gap-2 mb-10 font-mono text-[11px] uppercase tracking-wider text-body hover:text-ice transition-colors"
              data-cursor="hover"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> All work
            </Link>
          </motion.div>

          <motion.span variants={fadeUp} className="section-kicker">
            Case study / {String(number).padStart(2, '0')}
            <KickerSub theme={on('header') ? theme : undefined} label="Case study" />
          </motion.span>

          {theme && on('header') ? (
            <motion.h1 variants={fadeUp} className="th-title" aria-label={project.title}>
              <span aria-hidden="true" className="th-title-bar" />
              {theme.id === 'folk'
                ? [...project.title].map((ch, i) => (
                    <span key={i} aria-hidden="true" className="th-letter" style={{ ['--i' as string]: i } as React.CSSProperties}>
                      {ch === ' ' ? '\u00A0' : ch}
                    </span>
                  ))
                : <span aria-hidden="true">{project.title}</span>}
            </motion.h1>
          ) : (
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-ice tracking-tight leading-[0.95]">
              {project.title}
            </motion.h1>
          )}
          <motion.p variants={fadeUp} className="mt-6 text-lg md:text-2xl text-[#B4BBC8] leading-relaxed max-w-3xl font-light">
            {project.tagline}
          </motion.p>

          <motion.dl variants={fadeUp} className="mt-12 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
            {[
              ['Role', project.role],
              ['Year', project.year],
              ['Type', project.category],
              ['Stack', project.stack.join(' · ')],
            ].map(([label, value]) => (
              <div key={label} className="p-4 sm:p-5 border-r border-b border-line">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">{label}</dt>
                <dd className="text-ice text-sm sm:text-base">{value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={on('header') ? 'th-btn' : 'inline-flex items-center gap-2 px-6 py-3.5 font-mono text-xs uppercase tracking-wider font-bold text-obsidian hover:brightness-110 transition'}
                style={on('header') ? undefined : { background: project.accent.base }}
                data-cursor="hover"
              >
                Visit live site <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.links.code && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noopener noreferrer"
                className={on('header') ? 'th-btn th-btn--alt' : 'inline-flex items-center gap-2 px-6 py-3.5 border border-line font-mono text-xs uppercase tracking-wider text-ice hover:border-accent transition-colors'}
                data-cursor="hover"
              >
                <Github className="w-4 h-4" /> View code
              </a>
            )}
            {project.nda && (
              <span
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-line font-mono text-xs uppercase tracking-wider text-dim"
                title="Link unavailable due to a non-disclosure agreement"
              >
                <Lock className="w-4 h-4" /> Under NDA: no public link
              </span>
            )}
          </motion.div>
        </motion.div>
      </header>

      {/* ── Hero media ───────────────────────────────── */}
      <section
        ref={bind('media')}
        data-inspect="CaseStudyMedia"
        className={`relative px-5 sm:px-6 md:px-12 lg:px-24 mt-14 md:mt-20 ${px('media')}`}
      >
        <div className="max-w-[1248px] mx-auto relative">
          <Frame theme={on('media') ? theme : undefined} url={project.links.live ?? (project.nda ? 'private build' : project.links.code ?? '')}>
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              className="w-full h-auto block"
              style={{ viewTransitionName: `project-${project.slug}` }}
              width="1440"
              height="900"
              decoding="async"
            />
          </Frame>

          {project.mobile && (
            <motion.figure
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`hidden sm:block absolute -bottom-16 right-4 md:right-10 w-[150px] md:w-[210px] lg:w-[240px] overflow-hidden rounded-[28px] border-[6px] border-[#1C212B] bg-[#1C212B] shadow-[0_30px_80px_rgba(0,0,0,0.7)]`}
            >
              <img src={project.mobile.src} alt={project.mobile.alt} className="w-full h-auto block rounded-[22px]" loading="lazy" decoding="async" />
            </motion.figure>
          )}
        </div>
      </section>

      {/* ── Live impact ──────────────────────────────── */}
      {project.analytics && (
        <div ref={bind('impact')} className={px('impact')}>
          <ImpactAnalytics analytics={project.analytics} accent={project.accent.base} glow={project.accent.glow} theme={on('impact') ? theme : undefined} />
        </div>
      )}

      {/* ── Facts ────────────────────────────────────── */}
      <div ref={bind('facts')} className={px('facts')}>
      {theme && on('facts') && project.facts && project.facts.length > 0 && (
        <section className="relative px-5 sm:px-6 md:px-12 lg:px-24 mt-24 md:mt-32" data-inspect="CaseStudyFacts">
          <div className="max-w-[1248px] mx-auto">
            <ThemeFacts facts={project.facts} />
          </div>
        </section>
      )}
      {!(theme && on('facts')) && project.facts && project.facts.length > 0 && (
        <section className="relative px-5 sm:px-6 md:px-12 lg:px-24 mt-24 md:mt-32" data-inspect="CaseStudyFacts">
          <dl className="max-w-[1248px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            {project.facts.map((fact) => (
              <div key={fact.label} className="bg-obsidian p-5 sm:p-7">
                <dd className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: project.accent.base }}>
                  {fact.value}
                </dd>
                <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">{fact.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <section className="relative px-5 sm:px-6 md:px-12 lg:px-24 py-20 md:py-28" data-inspect="CaseStudyBody">
        <div className="max-w-[1248px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          <aside ref={bind('toc')} className="hidden lg:block lg:col-span-3">
            <nav aria-label="On this page" className={`sticky top-28 ${px('toc')}`}>
              <p className={theme && on('toc') ? 'th-label th-toc-title' : 'font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-4'}>
                {theme && on('toc') ? theme.copy.toc : 'On this page'}
              </p>
              <ul className={`space-y-1 border-l ${theme && on('toc') ? 'th-toc-rail' : 'border-line'}`}>
                {sections.map((s) => {
                  const active = activeId === s.id;
                  return (
                    <li key={s.id} className="relative">
                      {active && (
                        <motion.span
                          layoutId="toc-indicator"
                          className={theme && on('toc') ? 'th-toc-marker' : 'absolute -left-px top-0 bottom-0 w-px'}
                          style={theme && on('toc') ? undefined : { background: project.accent.base }}
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={
                          theme && on('toc')
                            ? `th-toc-link ${active ? 'is-active' : ''}`
                            : `block pl-4 py-1.5 text-sm transition-colors ${active ? 'text-ice' : 'text-muted hover:text-ice'}`
                        }
                      >
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="lg:col-span-9 max-w-3xl space-y-20 md:space-y-24">
            <Block id="overview" innerRef={bind('overview')} className={px('overview')} theme={on('overview') ? theme : undefined} label="Overview">
              <p className="text-xl md:text-2xl text-ice leading-relaxed font-light">{project.overview}</p>
            </Block>

            <Block id="problem" innerRef={bind('problem')} className={px('problem')} theme={on('problem') ? theme : undefined} label="The problem">
              <p className="text-lg text-[#A8B0C0] leading-relaxed">{project.problem}</p>
            </Block>

            <Block id="decisions" innerRef={bind('decisions')} className={px('decisions')} theme={on('decisions') ? theme : undefined} label="Key decisions">
              {theme && on('decisions') ? (
                <ol className="relative space-y-6 sm:space-y-8">
                  <span aria-hidden="true" className="th-track absolute left-[20px] max-sm:left-[16px] top-4 bottom-4 w-[4px]" />
                  {project.decisions.map((d, i) => {
                    const n = theme.numeral(i + 1);
                    return (
                      <li
                        key={d.title}
                        className="relative grid grid-cols-[36px_1fr] sm:grid-cols-[44px_1fr] gap-4 sm:gap-6 items-start"
                        style={{ ['--i' as string]: i, ['--tone' as string]: tone(i) } as React.CSSProperties}
                      >
                        <span className="th-node" aria-hidden="true">{n}</span>
                        <div className="th-mission">
                          <p className="th-label th-mission-tag">{theme.copy.step(i + 1)}</p>
                          <h3 className="th-mission-title">{d.title}</h3>
                          <p className="th-mission-body">{d.body}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              ) : (
              <ol className="space-y-px bg-line border border-line">
                {project.decisions.map((d, i) => (
                  <li key={d.title} className="bg-obsidian p-5 sm:p-7 grid sm:grid-cols-[56px_1fr] gap-3 sm:gap-6">
                    <span className="font-mono text-sm font-bold" style={{ color: project.accent.base }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-ice text-xl font-medium mb-2">{d.title}</h3>
                      <p className="text-body leading-relaxed">{d.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              )}
            </Block>

            <Block id="frontend" innerRef={bind('frontend')} className={px('frontend')} theme={on('frontend') ? theme : undefined} label="Frontend notes">
              {theme && on('frontend') ? (
                <dl className="grid sm:grid-cols-2 gap-5">
                  {project.frontendNotes.map((n, i) => (
                    <div
                      key={n.label}
                      className="th-mission th-note"
                      style={{ ['--i' as string]: i, ['--tone' as string]: tone(i + 1) } as React.CSSProperties}
                    >
                      <dt className="th-label th-mission-tag">{n.label}</dt>
                      <dd className="th-mission-body">{n.body}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
              <dl className="grid sm:grid-cols-2 gap-px bg-line border border-line">
                {project.frontendNotes.map((n) => (
                  <div key={n.label} className="bg-panel p-5 sm:p-6">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: project.accent.base }}>
                      {n.label}
                    </dt>
                    <dd className="text-[#B4BBC8] leading-relaxed">{n.body}</dd>
                  </div>
                ))}
              </dl>
              )}
            </Block>

            <Block id="outcome" innerRef={bind('outcome')} className={px('outcome')} theme={on('outcome') ? theme : undefined} label="Outcome">
              {theme && on('outcome') ? (
                <div className="th-mission" style={{ ['--tone' as string]: 'var(--th-green)' } as React.CSSProperties}>
                  <p className="th-label th-mission-tag">{theme.copy.outcome}</p>
                  <p className="th-mission-body text-lg">{project.outcome}</p>
                </div>
              ) : (
                <p className="text-lg text-[#A8B0C0] leading-relaxed border-l-2 pl-5" style={{ borderColor: project.accent.base }}>
                  {project.outcome}
                </p>
              )}
            </Block>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────── */}
      {project.gallery.length > 0 && (
        <section ref={bind('gallery')} className={`relative px-5 sm:px-6 md:px-12 lg:px-24 pb-20 md:pb-28 ${px('gallery')}`} data-inspect="CaseStudyGallery">
          <div className="max-w-[1248px] mx-auto">
            <span className="section-kicker">
              Gallery
              <KickerSub theme={on('gallery') ? theme : undefined} label="Gallery" />
            </span>
            <div className="space-y-14 md:space-y-20">
              {project.gallery.map((img) => (
                <motion.figure
                  key={img.src}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={`overflow-hidden bg-steel ${theme && on('gallery') ? 'th-card' : 'border border-line'}`}>
                    <img src={img.src} alt={img.alt} className="w-full h-auto block" loading="lazy" decoding="async" width="1440" height="900" />
                  </div>
                  {img.caption && (
                    <figcaption className="mt-4 flex gap-4 text-sm text-body leading-relaxed max-w-2xl">
                      <span
                        className={theme && on('gallery') ? 'th-bullet' : 'mt-2.5 w-6 h-px shrink-0'}
                        style={theme && on('gallery') ? undefined : { background: project.accent.base }}
                      />
                      {img.caption}
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Next project ─────────────────────────────── */}
      <section ref={bind('next')} className={`relative border-t border-line ${px('next')}`} data-inspect="NextProject">
        <Link
          to={`/work/${next.slug}`}
          viewTransition
          data-cursor="project-card"
          className="group block px-5 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24 overflow-hidden relative"
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `radial-gradient(80% 120% at 85% 120%, ${next.accent.glow}40, transparent 70%)` }}
          />
          <div className="max-w-[1248px] mx-auto relative flex items-end justify-between gap-8">
            <div>
              <p className={theme && on('next') ? 'th-label th-toc-title' : 'font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-4'}>
                {theme && on('next') ? theme.copy.next : 'Next project'}
              </p>
              <p className={`${theme && on('next') ? 'th-next-title' : 'text-4xl sm:text-6xl md:text-7xl tracking-tight'} font-bold text-ice group-hover:translate-x-2 transition-transform duration-500`}>
                {next.title}
              </p>
              <p className="mt-3 text-body max-w-xl">{next.tagline}</p>
            </div>
            <span
              className={`shrink-0 w-14 h-14 md:w-20 md:h-20 flex items-center justify-center transition-colors group-hover:border-transparent group-hover:bg-[color:var(--hover-bg)] ${theme && on('next') ? 'th-next-arrow' : 'rounded-full border border-line'}`}
              style={{ ['--hover-bg' as string]: next.accent.base }}
            >
              <ArrowRight className="w-6 h-6 text-ice group-hover:text-obsidian group-hover:translate-x-1 transition-all" />
            </span>
          </div>
        </Link>
      </section>
    </article>
  );
};

const Block: React.FC<{
  id: string;
  label: string;
  className?: string;
  innerRef?: (el: HTMLDivElement | null) => void;
  theme?: CaseTheme;
  children: React.ReactNode;
}> = ({ id, label, className = '', innerRef, theme, children }) => (
  <motion.div
    id={id}
    ref={innerRef}
    className={`scroll-mt-28 ${className}`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
  >
    <h2 className="section-kicker">
      {label}
      <KickerSub theme={theme} label={label} />
    </h2>
    {children}
  </motion.div>
);

const BrowserFrame: React.FC<{ url: string; children: React.ReactNode }> = ({ url, children }) => (
  <div className="border border-line bg-[#11151C] shadow-[0_40px_120px_rgba(0,0,0,0.55)] overflow-hidden">
    <div className="flex items-center gap-4 px-4 py-3 border-b border-line">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#2D3442]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#2D3442]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#2D3442]" />
      </div>
      <div className="flex-1 max-w-md mx-auto px-3 py-1 bg-obsidian border border-line font-mono text-[10px] text-dim truncate text-center">
        {url.replace(/^https?:\/\//, '').replace(/\/$/, '') || '—'}
      </div>
      <span className="w-[42px]" />
    </div>
    {children}
  </div>
);

const Frame: React.FC<{ url: string; theme?: CaseTheme; children: React.ReactNode }> = ({ url, theme, children }) =>
  theme ? (
    <ThemeFrame url={url} status={theme.copy.frameStatus}>
      {children}
    </ThemeFrame>
  ) : (
    <BrowserFrame url={url}>{children}</BrowserFrame>
  );

/** Second-script subtitle after a kicker (e.g. Devanagari for the folk theme). Decorative. */
const KickerSub: React.FC<{ theme?: CaseTheme; label: string }> = ({ theme, label }) => {
  const text = theme?.kickerSubs?.[label];
  return text ? (
    <span aria-hidden="true" className="th-kicker-sub">
      {text}
    </span>
  ) : null;
};

/** Highlights the table-of-contents entry for the section nearest the top. */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids.join(',')]);
  return active;
};

export default CaseStudyPage;
