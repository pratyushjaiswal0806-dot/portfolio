import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileThumbDock from './MobileThumbDock';
import Cursor from '../ui/Cursor';
import BootLoader from '../ui/BootLoader';
import InspectOverlay from '../ui/InspectOverlay';
import { SiteUIContext, SiteUI } from '../../lib/site-ui';
import { readLocal, readSession, writeLocal, writeSession } from '../../lib/storage';
import { useIsTouch } from '../../lib/useMediaQuery';

// The palette (and cmdk) only downloads the first time someone opens it.
const CommandPalette = lazy(() => import('../ui/CommandPalette'));

const LOADER_KEY = 'pj-loader-seen';
const INSPECT_KEY = 'pj-inspect';

/** Check loader eligibility synchronously so the very first render
 *  shows the loader overlay on both web and android. It plays once per
 *  session: refreshes and deep links opened later in the tab skip it. */
const shouldShowLoader = (): boolean => {
  if (typeof window === 'undefined') return true;
  if (readSession(LOADER_KEY) === 'true') return false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return !reducedMotion;
};

const RootLayout: React.FC = () => {
  const isTouch = useIsTouch();
  const [showLoader, setShowLoader] = useState(shouldShowLoader);
  // Fade the page in only when it's revealed by the loader; otherwise paint it
  // immediately so the first paint is real content (and LCP is measurable).
  const revealedByLoader = useRef(showLoader);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);
  const [inspect, setInspect] = useState(() => readLocal(INSPECT_KEY) === 'on');
  const [toast, setToast] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  /** Driven by BootLoader's onComplete instead of a guessed timeout. */
  const handleLoaderComplete = useCallback(() => {
    writeSession(LOADER_KEY, 'true');
    setShowLoader(false);
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute('data-inspect', inspect);
    writeLocal(INSPECT_KEY, inspect ? 'on' : null);
  }, [inspect]);

  useEffect(() => {
    if (paletteOpen) setPaletteLoaded(true);
  }, [paletteOpen]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  // ⌘K / Ctrl+K anywhere; Esc leaves inspect mode when nothing else is open.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (showLoader) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      } else if (e.key === 'Escape' && !paletteOpen && inspect) {
        setInspect(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showLoader, paletteOpen, inspect]);

  const ui = useMemo<SiteUI>(() => ({
    openPalette: () => setPaletteOpen(true),
    inspect,
    toggleInspect: () => setInspect((v) => !v),
    replayLoader: () => {
      writeSession(LOADER_KEY, null);
      setPaletteOpen(false);
      window.scrollTo({ top: 0 });
      revealedByLoader.current = true;
      setShowLoader(true);
    },
    notify: setToast,
  }), [inspect]);

  return (
    <SiteUIContext.Provider value={ui}>
      <div className="bg-obsidian min-h-screen w-full relative">
        {/* ── Boot Loader ─────────────────────────────── */}
        <AnimatePresence>
          {showLoader && <BootLoader onComplete={handleLoaderComplete} />}
        </AnimatePresence>

        {/* ── Page Content ─────────────────────────────
             Hidden while the loader is active so nothing
             paints behind the overlay for even one frame. */}
        {!showLoader && (
          <motion.div
            initial={revealedByLoader.current ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ice focus:text-obsidian focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider"
            >
              Skip to content
            </a>

            {!isTouch && <Cursor />}

            {/* Global Scroll Progress */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
              style={{ scaleX, viewTransitionName: 'scroll-progress' }}
            />

            <Navbar />

            <main id="content">
              <Outlet />
            </main>

            <Footer />
            <MobileThumbDock />
          </motion.div>
        )}

        {paletteLoaded && (
          <Suspense fallback={null}>
            <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
          </Suspense>
        )}
        {inspect && !showLoader && <InspectOverlay />}

        <AnimatePresence>
          {toast && (
            <motion.div
              role="status"
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[70] px-4 py-2 bg-steel/95 backdrop-blur-md border border-[#3E4756] text-ice text-xs font-mono rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2 pointer-events-none"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fresh page loads all share the key "default"; key those by path so a
            scroll position from one page is never restored onto another. */}
        <ScrollRestoration getKey={(loc) => (loc.key === 'default' ? loc.pathname : loc.key)} />
      </div>
    </SiteUIContext.Provider>
  );
};

export default RootLayout;
