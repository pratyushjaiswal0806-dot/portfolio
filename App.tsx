import React, { useCallback, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Intro from './components/sections/Intro';
import TechStack from './components/sections/TechStack';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Cursor from './components/ui/Cursor';
import AnimationLab from './components/sections/AnimationLab';
import BootLoader from './components/ui/BootLoader';

type ViewState = 'home' | 'lab';

/** Check loader eligibility synchronously so the very first render
 *  shows the loader overlay — no single-frame flash of page content. */
const shouldShowLoader = (): boolean => {
  if (typeof window === 'undefined') return true;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasSeenLoader = sessionStorage.getItem('pj-loader-seen') === 'true';
  return !hasSeenLoader && !reducedMotion;
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isTouch, setIsTouch] = useState(false);
  const [showLoader, setShowLoader] = useState(shouldShowLoader);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  /** Driven by BootLoader's onComplete instead of a guessed timeout. */
  const handleLoaderComplete = useCallback(() => {
    sessionStorage.setItem('pj-loader-seen', 'true');
    setShowLoader(false);
  }, []);

  const toggleView = (target: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setView(target), 300);
  };

  return (
    <main className="bg-[#0B0D10] min-h-screen w-full relative selection:bg-[#94A3B8] selection:text-[#0B0D10]">
      {/* ── Boot Loader ─────────────────────────────── */}
      <AnimatePresence>
        {showLoader && <BootLoader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {/* ── Page Content ─────────────────────────────
           Hidden while the loader is active so nothing
           paints behind the overlay for even one frame. */}
      {!showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {!isTouch && <Cursor />}

          {/* Global Scroll Progress */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-[#94A3B8] origin-left z-50"
            style={{ scaleX }}
          />

          {/* Conditional Navbar */}
          <Navbar onViewChange={toggleView} currentView={view} />

          <AnimatePresence mode="wait">
            {view === 'home' ? (
              <motion.div
                key="home"
                exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                className="w-full"
              >
                <Hero />
                <Intro />
                <TechStack />
                <Projects />
                <About />
                <Contact />
                <Footer />
              </motion.div>
            ) : (
              <motion.div
                key="lab"
                className="w-full"
              >
                <AnimationLab onBack={() => setView('home')} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </main>
  );
};

export default App;
