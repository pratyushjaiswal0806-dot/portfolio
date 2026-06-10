import React, { useEffect, useState } from 'react';
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

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isTouch, setIsTouch] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
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

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenLoader = sessionStorage.getItem('pj-loader-seen') === 'true';

    if (hasSeenLoader || reducedMotion) {
      sessionStorage.setItem('pj-loader-seen', 'true');
      return;
    }

    setShowLoader(true);
    const timer = window.setTimeout(() => {
      sessionStorage.setItem('pj-loader-seen', 'true');
      setShowLoader(false);
    }, 1250);

    return () => window.clearTimeout(timer);
  }, []);

  const toggleView = (target: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setView(target), 300); // Allow smooth scroll reset before transition
  };

  return (
    <main className="bg-[#0B0D10] min-h-screen w-full relative selection:bg-[#94A3B8] selection:text-[#0B0D10]">
      <AnimatePresence>
        {showLoader && <BootLoader />}
      </AnimatePresence>

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
    </main>
  );
};

export default App;
