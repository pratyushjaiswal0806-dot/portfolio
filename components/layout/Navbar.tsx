import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onViewChange?: (view: 'home' | 'lab') => void;
  currentView?: 'home' | 'lab';
}

const Navbar: React.FC<NavbarProps> = ({ onViewChange, currentView = 'home' }) => {
  const [time, setTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section tracking for active tab indicator
      if (currentView === 'home') {
        const sections = ['tech-stack', 'projects', 'about', 'contact'];
        const scrollPosition = window.scrollY + window.innerHeight * 0.4;

        let currentActive = "";
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              currentActive = section;
              break;
            }
          }
        }
        setActiveSection(currentActive);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = ['Tech Stack', 'Projects', 'About', 'Contact'];
  const resumeHref = '/Pratyush-Jaiswal-Resume.md';

  const handleNavClick = (item: string) => {
    setIsMobileMenuOpen(false);
    // Small delay so menu closes before scroll
    setTimeout(() => {
      const el = document.getElementById(item.toLowerCase().replace(' ', '-'));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full flex justify-between items-center z-40 transition-all duration-500 ${
          scrolled 
            ? 'p-4 md:py-4 md:px-8 bg-[#0B0D10]/80 backdrop-blur-md border-b border-[#2D3442]/30 shadow-lg' 
            : 'p-6 md:p-8 bg-transparent border-b border-transparent'
        }`}
      >
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => onViewChange && onViewChange('home')}
        >
          <div className="text-[#EAEAF0] font-bold text-lg tracking-tight">
            PJ<span className="text-[#94A3B8]">.</span>
          </div>
          {/* Tech Divider */}
          <div className="hidden md:block w-[1px] h-4 bg-[#2D3442]"></div>
          {/* Coordinates/Time Display */}
          <div className="hidden md:flex flex-col text-[10px] font-mono text-[#555A6B] leading-tight">
            <span>LAT: 12.9716° N</span>
            <span>LNG: 77.5946° E</span>
          </div>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-[#EAEAF0] items-center">
          {currentView === 'home' && (
            <>
              {navItems.map((item) => {
                const isActive = activeSection === item.toLowerCase().replace(' ', '-');
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className={`relative py-1 font-mono text-xs tracking-wider transition-colors duration-300 ${
                      isActive ? 'text-[#EAEAF0]' : 'text-[#9AA0B2] hover:text-[#EAEAF0]'
                    }`}
                    data-cursor="hover"
                  >
                    {item}
                    {isActive && (
                      <motion.span
                        layoutId="active-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#94A3B8]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
              <button
                onClick={() => onViewChange && onViewChange('lab')}
                className="px-4 py-2 bg-[#141821] border border-[#2D3442] rounded text-xs font-mono uppercase tracking-wider hover:border-[#94A3B8] transition-colors text-[#94A3B8]"
                data-cursor="hover"
              >
                Motion Lab
              </button>
              <a
                href={resumeHref}
                download
                className="px-4 py-2 bg-[#EAEAF0] text-[#0B0D10] rounded text-xs font-mono uppercase tracking-wider hover:bg-white transition-colors"
                data-cursor="hover"
              >
                Resume
              </a>
            </>
          )}

          {/* Live Time Badge */}
          <div className="ml-4 px-3 py-1 bg-[#141821]/50 border border-[#2D3442] rounded-full text-[10px] font-mono text-[#94A3B8]">
            {time} UTC+5.30
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <motion.div
            animate={isMobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-[2px] bg-white origin-center"
          />
          <motion.div
            animate={isMobileMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-[2px] bg-white ml-auto"
          />
          <motion.div
            animate={isMobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-[2px] bg-white origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0B0D10]/95 backdrop-blur-xl z-30 flex flex-col items-center justify-center md:hidden"
          >
            <motion.div className="flex flex-col items-center gap-8">
              {currentView === 'home' && navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleNavClick(item)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl font-bold text-[#EAEAF0] hover:text-[#94A3B8] transition-colors"
                >
                  {item}
                </motion.a>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onViewChange && onViewChange(currentView === 'home' ? 'lab' : 'home');
                }}
                className="mt-4 px-6 py-3 bg-[#141821] border border-[#2D3442] rounded text-sm font-mono uppercase tracking-wider text-[#94A3B8] hover:border-[#94A3B8] transition-colors"
              >
                {currentView === 'home' ? 'Motion Lab' : '← Back Home'}
              </motion.button>

              <motion.a
                href={resumeHref}
                download
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.42, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="px-6 py-3 bg-[#EAEAF0] text-[#0B0D10] rounded text-sm font-mono uppercase tracking-wider font-bold"
              >
                Resume
              </motion.a>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-[10px] font-mono text-[#555A6B]"
              >
                {time} UTC+5.30
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
