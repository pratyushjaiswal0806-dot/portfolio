import React, { useEffect, useRef, useState } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, BookOpen, Copy, CornerDownLeft, FileDown, FlaskConical, FolderGit2, Github, Home,
  Info, Linkedin, Mail, RotateCcw, ScanLine, Search, Code2, User,
} from 'lucide-react';
import { projects } from '../../data/projects';
import { personal } from '../../data/personal';
import { notes, hasNotes } from '../../lib/notes';
import { useSiteUI } from '../../lib/site-ui';
import { useNavTo } from '../layout/Navbar';

interface PaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Entry = {
  id: string;
  label: string;
  hint?: string;
  keywords?: string[];
  icon: React.ElementType;
  run: () => void;
};

/** Predictable ranking: label prefix > word prefix > substring > keyword > fuzzy.
 *  cmdk's default fuzzy scorer let "pegas" rank "About" first. */
const rank = (value: string, search: string, keywords: string[] = []) => {
  const q = search.trim().toLowerCase();
  if (!q) return 1;
  const label = value.toLowerCase();
  if (label.startsWith(q)) return 1;
  if (label.split(/[\s'’/-]+/).some((w) => w.startsWith(q))) return 0.9;
  if (label.includes(q)) return 0.8;
  if (keywords.some((k) => k.toLowerCase().includes(q))) return 0.5;
  let i = 0;
  for (const ch of label) if (ch === q[i]) i++;
  return i === q.length ? 0.2 : 0;
};

const Item: React.FC<{ entry: Entry; onRun: (fn: () => void) => void }> = ({ entry, onRun }) => {
  const Icon = entry.icon;
  return (
    <Command.Item
      value={entry.label}
      keywords={entry.keywords}
      onSelect={() => onRun(entry.run)}
      className="group relative flex items-center gap-3 px-3 py-2.5 text-sm text-body rounded-xs cursor-pointer data-[selected=true]:bg-steel data-[selected=true]:text-ice"
    >
      <span className="absolute left-0 top-2 bottom-2 w-[2px] bg-accent opacity-0 group-data-[selected=true]:opacity-100 transition-opacity" />
      <Icon className="w-4 h-4 shrink-0 text-dim group-data-[selected=true]:text-accent" />
      <span className="flex-1 truncate">{entry.label}</span>
      {entry.hint && <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{entry.hint}</span>}
    </Command.Item>
  );
};

const CommandPalette: React.FC<PaletteProps> = ({ open, onOpenChange }) => {
  const navTo = useNavTo();
  const { inspect, toggleInspect, replayLoader, notify } = useSiteUI();
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setSearch('');
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = previous;
      restoreFocus.current?.focus?.();
    };
  }, [open]);

  const close = () => onOpenChange(false);
  const run = (fn: () => void) => {
    close();
    // Let the dialog unmount (and scroll unlock) before navigating.
    requestAnimationFrame(fn);
  };

  const go = (to: string) => () => navTo(to);
  const external = (href: string) => () => window.open(href, '_blank', 'noopener,noreferrer');

  const pages: Entry[] = [
    { id: 'page-home', label: 'Home', icon: Home, hint: '/', run: go('/') },
    { id: 'page-work', label: 'Work', icon: FolderGit2, hint: '/work', keywords: ['projects', 'portfolio'], run: go('/work') },
    { id: 'page-about', label: 'About', icon: User, hint: '/about', keywords: ['story', 'timeline', 'stack', 'toolkit'], run: go('/about') },
    ...(hasNotes ? [{ id: 'page-notes', label: 'Notes', icon: BookOpen, hint: '/notes', keywords: ['blog', 'writing'], run: go('/notes') }] : []),
    { id: 'page-lab', label: 'Motion Lab', icon: FlaskConical, hint: '/lab', keywords: ['animation', 'springs', 'playground'], run: go('/lab') },
    { id: 'page-colophon', label: 'Colophon', icon: Info, hint: '/colophon', keywords: ['how this site is built', 'design tokens', 'build'], run: go('/colophon') },
    { id: 'page-contact', label: 'Contact', icon: Mail, hint: '#contact', keywords: ['hire', 'email'], run: go('/#contact') },
  ];

  const work: Entry[] = projects.map((p) => ({
    id: `project-${p.slug}`,
    label: p.title,
    hint: p.category,
    keywords: [...p.stack, ...p.kind, p.category],
    icon: ArrowRight,
    run: go(`/work/${p.slug}`),
  }));

  const writing: Entry[] = notes.map((n) => ({
    id: `note-${n.slug}`,
    label: n.title,
    hint: `${n.minutes} min`,
    keywords: n.tags,
    icon: BookOpen,
    run: go(`/notes/${n.slug}`),
  }));

  const actions: Entry[] = [
    {
      id: 'action-copy-email',
      label: 'Copy email address',
      hint: personal.email.split('@')[0],
      keywords: ['contact', 'mail'],
      icon: Copy,
      run: () => {
        navigator.clipboard?.writeText(personal.email).then(
          () => notify('Copied email to clipboard'),
          () => notify(personal.email),
        );
      },
    },
    {
      id: 'action-resume',
      label: 'Download résumé',
      hint: 'PDF',
      keywords: ['cv', 'resume'],
      icon: FileDown,
      run: () => {
        const a = document.createElement('a');
        a.href = personal.resume;
        a.download = '';
        a.click();
      },
    },
    { id: 'action-github', label: 'Open GitHub', icon: Github, hint: '↗', run: external(personal.github) },
    { id: 'action-linkedin', label: 'Open LinkedIn', icon: Linkedin, hint: '↗', run: external(personal.linkedin) },
    {
      id: 'action-inspect',
      label: inspect ? 'Turn off inspect mode' : 'Inspect this page',
      hint: inspect ? 'on' : 'off',
      keywords: ['blueprint', 'outline', 'components', 'debug'],
      icon: ScanLine,
      run: toggleInspect,
    },
    { id: 'action-loader', label: 'Replay boot loader', icon: RotateCcw, keywords: ['intro', 'animation'], run: replayLoader },
    { id: 'action-source', label: 'View this site’s source', icon: Code2, hint: '↗', keywords: ['code', 'repo'], run: external(personal.repo) },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-obsidian border border-line shadow-[0_30px_90px_rgba(0,0,0,0.75)] overflow-hidden"
          >
            {/* Blueprint corner marks */}
            <span className="absolute -left-px -top-px w-4 h-4 border-l border-t border-accent pointer-events-none" />
            <span className="absolute -right-px -bottom-px w-4 h-4 border-r border-b border-accent pointer-events-none" />

            <Command
              label="Command palette"
              loop
              filter={rank}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  close();
                } else if (e.key === 'Tab') {
                  // Keep focus in the search field; items are reached with the arrow keys.
                  e.preventDefault();
                  inputRef.current?.focus();
                }
              }}
            >
              <div className="flex items-center gap-3 px-4 border-b border-line">
                <Search className="w-4 h-4 text-dim shrink-0" />
                <Command.Input
                  ref={inputRef}
                  autoFocus
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Jump to a page, project or action…"
                  className="w-full h-14 bg-transparent text-ice placeholder:text-muted text-[15px] outline-hidden"
                />
                <kbd className="hidden sm:inline font-mono text-[10px] text-muted border border-line px-1.5 py-0.5">ESC</kbd>
              </div>

              <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto overscroll-contain p-2 scrollbar-hide">
                <Command.Empty className="px-3 py-10 text-center font-mono text-xs text-muted">
                  No match for “{search}”.
                </Command.Empty>

                <Command.Group heading="Navigate">
                  {pages.map((e) => <Item key={e.id} entry={e} onRun={run} />)}
                </Command.Group>
                <Command.Group heading="Projects">
                  {work.map((e) => <Item key={e.id} entry={e} onRun={run} />)}
                </Command.Group>
                {writing.length > 0 && (
                  <Command.Group heading="Notes">
                    {writing.map((e) => <Item key={e.id} entry={e} onRun={run} />)}
                  </Command.Group>
                )}
                <Command.Group heading="Actions">
                  {actions.map((e) => <Item key={e.id} entry={e} onRun={run} />)}
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-t border-line bg-panel font-mono text-[10px] uppercase tracking-wider text-muted">
                <span className="flex items-center gap-3">
                  <span>↑↓ move</span>
                  <span className="flex items-center gap-1"><CornerDownLeft className="w-3 h-3" /> open</span>
                </span>
                <span className="hidden sm:inline">pratyush / cmd</span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
