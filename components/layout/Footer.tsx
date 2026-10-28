import React from 'react';
import { Link, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, ArrowRight, ExternalLink, FileDown, ScanLine } from 'lucide-react';
import { PREMIUM_EASE, fadeUp } from '../ui/motion';
import Magnetic from '../ui/Magnetic';
import { navRoutes, labRoute, colophonRoute, buildInfo, formatBuildDate } from '../../data/site';
import { personal } from '../../data/personal';
import { hasNotes } from '../../lib/notes';
import { useSiteUI } from '../../lib/site-ui';
import { useNavTo } from './Navbar';

/** Shown above the footer on every page except home, which has its own Contact section. */
const FooterCta: React.FC = () => (
  <section className="relative px-5 sm:px-6 md:px-12 lg:px-24 py-20 md:py-28 overflow-hidden" data-inspect="FooterCta">
    <div className="absolute inset-0 blueprint-grid-fade pointer-events-none" />
    <div className="max-w-[1248px] mx-auto relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-7xl font-bold text-ice tracking-tight leading-[1.02]"
      >
        Have something in mind?<br />
        <span className="text-accent">Let's build it.</span>
      </motion.h2>
      <motion.div
        variants={fadeUp}
        custom={{ delay: 0.1 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row gap-3 shrink-0"
      >
        <Magnetic strength={0.25}>
          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex justify-center items-center gap-3 px-8 py-4 bg-ice text-obsidian text-sm font-mono tracking-wider uppercase font-bold rounded-xs hover:bg-white transition-colors"
            data-cursor="hover"
          >
            Get in touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Magnetic>
        <a
          href={personal.resume}
          download
          className="inline-flex justify-center items-center gap-3 px-8 py-4 border border-line text-ice text-sm font-mono tracking-wider uppercase font-bold rounded-xs hover:border-accent transition-colors"
          data-cursor="hover"
        >
          Resume
          <FileDown className="w-4 h-4 text-accent" />
        </a>
      </motion.div>
    </div>
  </section>
);

const Footer: React.FC = () => {
  const location = useLocation();
  const navTo = useNavTo();
  const { inspect, toggleInspect } = useSiteUI();
  const isHome = location.pathname === '/';

  const navigate = [
    { label: 'Home', to: '/' },
    ...navRoutes.filter((r) => (!r.requiresNotes || hasNotes) && !r.to.includes('#')),
    labRoute,
    colophonRoute,
  ];

  const connect = [
    { label: 'GitHub', href: personal.github, icon: Github, external: true },
    { label: 'LinkedIn', href: personal.linkedin, icon: Linkedin, external: true },
    { label: 'Email', href: `mailto:${personal.email}`, icon: Mail, external: false },
  ];

  return (
    <>
      {!isHome && <FooterCta />}
      <footer className="bg-obsidian relative z-20 pb-24 md:pb-0" data-inspect="Footer">
        {/* Top accent line */}
        <div className="h-px bg-linear-to-r from-transparent via-line to-transparent" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-24 py-12 sm:py-16">

          {/* Status + Brand Row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-12 md:mb-16"
          >
            <div className="flex items-center gap-6">
              <Link to="/" viewTransition className="text-ice font-bold text-3xl tracking-tight">
                PJ<span className="text-accent">.</span>
              </Link>
              <div className="h-8 w-px bg-line" />
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                  Available for work
                </span>
              </div>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-3 px-5 py-2.5 bg-steel border border-line rounded-full hover:border-accent/50 transition-all duration-300"
              data-cursor="hover"
              aria-label="Back to top"
            >
              <span className="text-[10px] font-mono text-muted group-hover:text-accent transition-colors uppercase tracking-widest">
                Back to top
              </span>
              <ArrowUp className="w-3.5 h-3.5 text-muted group-hover:text-ice group-hover:-translate-y-0.5 transition-all" />
            </button>
          </motion.div>

          {/* Main Grid: Nav + Socials + Contact */}
          <motion.div
            variants={fadeUp}
            custom={{ delay: 0.1 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 mb-12 md:mb-16 pb-12 md:pb-16 border-b border-line/50"
          >
            {/* Navigate */}
            <div>
              <h4 className="text-[10px] font-mono text-accent uppercase tracking-widest mb-5">Navigate</h4>
              <div className="flex flex-col gap-3">
                {navigate.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    viewTransition
                    className="text-muted hover:text-ice transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-[10px] font-mono text-accent uppercase tracking-widest mb-5">Connect</h4>
              <div className="flex flex-col gap-3">
                {connect.map(({ label, href, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className="text-muted hover:text-ice transition-colors text-sm flex items-center gap-2 group"
                  >
                    <Icon size={14} className="group-hover:text-ice transition-colors" />
                    {label}
                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
                <a href={personal.resume} download className="text-muted hover:text-ice transition-colors text-sm flex items-center gap-2 group">
                  <FileDown size={14} className="group-hover:text-ice transition-colors" />
                  Resume
                </a>
              </div>
            </div>

            {/* Quick Contact + dev toggles */}
            <div>
              <h4 className="text-[10px] font-mono text-accent uppercase tracking-widest mb-5">Get in touch</h4>
              <a href={`mailto:${personal.email}`} className="text-muted hover:text-ice transition-colors text-sm break-all leading-relaxed">
                {personal.email}
              </a>
              <p className="text-muted/60 text-xs mt-4 font-mono">
                UTC+5:30 · India
              </p>
              <button
                type="button"
                onClick={toggleInspect}
                aria-pressed={inspect}
                className={`mt-6 inline-flex items-center gap-2 px-3 py-2 border rounded-xs text-[10px] font-mono uppercase tracking-widest transition-colors ${
                  inspect ? 'border-accent text-ice bg-steel' : 'border-line text-muted hover:text-ice hover:border-accent/60'
                }`}
                data-cursor="hover"
              >
                <ScanLine size={13} />
                Inspect mode: {inspect ? 'on' : 'off'}
              </button>
            </div>
          </motion.div>

          {/* Bottom Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: PREMIUM_EASE }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-muted text-xs font-mono">
              © {new Date().getFullYear()} {personal.name}.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[10px] text-muted/70 font-mono tracking-wide">
              <a
                href={buildInfo.sha === 'dev' ? personal.repo : `${personal.repo}/commit/${buildInfo.sha}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ice transition-colors"
              >
                Deployed {formatBuildDate(buildInfo.date)} · {buildInfo.sha}
              </a>
              <span className="hidden sm:inline text-line">/</span>
              <button type="button" onClick={() => navTo(colophonRoute.to)} className="hover:text-ice transition-colors uppercase tracking-wide">
                How this site is built →
              </button>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
