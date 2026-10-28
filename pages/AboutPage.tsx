import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SpecPortrait from '../components/about/SpecPortrait';
import SectionLabel from '../components/about/SectionLabel';
import ProjectMention from '../components/about/ProjectMention';
import Journey from '../components/about/Journey';
import HowIWork from '../components/about/HowIWork';
import Toolkit from '../components/about/Toolkit';
import { now, offScreen } from '../data/personal';
import { usePageMeta } from '../lib/usePageMeta';
import { useHashScroll } from '../lib/useHashScroll';
import { paletteHint } from '../components/layout/Navbar';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Two-column band: section title on the left, content on the right. */
const Band: React.FC<{ id?: string; label: string; note?: string; inspect: string; children: React.ReactNode }> = ({
  id,
  label,
  note,
  inspect,
  children,
}) => (
  <section id={id} data-inspect={inspect} className="relative px-5 sm:px-6 md:px-12 lg:px-24 scroll-mt-24">
    <div className="max-w-[1248px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 py-20 md:py-28 border-t border-line/70">
      <div className="lg:col-span-3">
        <SectionLabel note={note}>{label}</SectionLabel>
      </div>
      <div className="lg:col-span-9">{children}</div>
    </div>
  </section>
);

const AboutPage: React.FC = () => {
  usePageMeta({
    title: 'About — Pratyush Jaiswal',
    description: 'Frontend developer and Computer Science student at RVITM, Bengaluru: the story so far, how I like to work and the tools I use.',
    path: '/about',
  });
  useHashScroll();
  const shouldReduceMotion = useReducedMotion();

  // The Studying line already sits beside the portrait.
  const current = now.items.filter((item) => item.label !== 'Studying');

  return (
    <>
      {/* ── Sheet ──────────────────────────────────── */}
      <header data-inspect="AboutHeader" className="relative pt-32 md:pt-44 pb-8 md:pb-12 px-5 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid-fade pointer-events-none" />
        <div className="max-w-[1248px] mx-auto relative grid lg:grid-cols-12 gap-14 lg:gap-10 items-start">
          <motion.div
            className="lg:col-span-6"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="section-kicker">About</span>
            <h1 className="font-display text-[2.6rem] sm:text-6xl xl:text-7xl font-bold text-ice tracking-tight leading-[1.02] max-w-[13ch]">
              I build the part of software people actually touch.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-[#B4BBC8] leading-relaxed font-light max-w-[34rem]">
              I’m Pratyush, a frontend developer and Computer Science student in Bengaluru. I care about layouts, states and motion: the small details that decide whether something feels considered or just assembled.
            </p>
          </motion.div>

          <div className="lg:col-span-6 flex lg:justify-end">
            <SpecPortrait />
          </div>
        </div>
      </header>

      {/* ── Story ──────────────────────────────────── */}
      <Band label="Story" inspect="Story">
        {/* TODO(pj): add a line on how you got into frontend, and where you're from. */}
        <div className="max-w-[62ch] space-y-6 text-lg md:text-xl text-[#B4BBC8] leading-[1.75]">
          <p>
            Most of what I build is for real people on real deadlines. I designed and built{' '}
            <ProjectMention slug="pegasus" />, the site for my college’s web development club, and{' '}
            <ProjectMention slug="robofiesta-26" />, the site for RVITM’s annual tech fest, both on my own.
          </p>
          <p>
            Alongside those: <ProjectMention slug="tech-token-heist" />, a real-time game for an inter-college competition;{' '}
            <ProjectMention slug="fancall" />, client work turning Figma screens into production React; and{' '}
            <ProjectMention slug="promptcompiler" />, a small tool for trimming LLM prompts.
          </p>
          <p>
            What ties them together is the part I enjoy most: taking messy requirements, finding the one flow that matters, and shipping an interface that stays clear under real use.
          </p>
        </div>

        <dl className="mt-12 max-w-[62ch] border-l border-accent pl-6 space-y-4">
          {current.map((item) => (
            <div key={item.label} className="grid sm:grid-cols-[96px_1fr] gap-1 sm:gap-4">
              <dt className="text-sm text-dim">{item.label}</dt>
              <dd className="text-[#C9CED8] leading-relaxed">{item.value}</dd>
            </div>
          ))}
          <div className="grid sm:grid-cols-[96px_1fr] gap-1 sm:gap-4">
            <dt className="text-sm text-dim">This site</dt>
            <dd className="text-[#C9CED8] leading-relaxed">
              Press <kbd className="font-mono text-sm text-ice border border-line px-1.5">{paletteHint}</kbd>, or turn on inspect mode in the footer to see how it’s put together.
            </dd>
          </div>
        </dl>
      </Band>

      {/* ── Journey ────────────────────────────────── */}
      <Band label="Journey" note="From first-year student to sites a club and a fest depend on." inspect="Journey">
        <Journey />
      </Band>

      {/* ── How I work ─────────────────────────────── */}
      <Band label="How I work" note="Three habits, each with a project where it mattered." inspect="HowIWork">
        <HowIWork />
      </Band>

      {/* ── Toolkit ────────────────────────────────── */}
      <Band id="toolkit" label="Toolkit" inspect="Toolkit">
        <Toolkit />
      </Band>

      {offScreen.length > 0 && (
        <Band label="Off-screen" inspect="OffScreen">
          <ul className="border-t border-line">
            {offScreen.map((item) => (
              <li key={item.label} className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-2 md:gap-10 py-6 border-b border-line">
                <h3 className="text-ice text-xl font-medium">{item.label}</h3>
                <p className="text-body leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </Band>
      )}
    </>
  );
};

export default AboutPage;
