import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Cpu, FolderGit2, User, Mail, FileDown } from 'lucide-react';

interface MobileThumbDockProps {
  onSectionClick?: (sectionId: string) => void;
}

const navItems = [
  { id: 'tech-stack', label: 'Stack', icon: Cpu },
  { id: 'projects', label: 'Work', icon: FolderGit2 },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const MobileThumbDock: React.FC<MobileThumbDockProps> = ({ onSectionClick }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const diff = latest - lastScrollY;
      // Hide on intentional downward scroll past hero, reveal on upward scroll
      if (latest > 180 && diff > 8) {
        setIsVisible(false);
      } else if (diff < -6 || latest < 120) {
        setIsVisible(true);
      }
      setLastScrollY(latest);

      // Section tracking for active tab
      const sections = ['tech-stack', 'projects', 'about', 'contact'];
      const scrollPosition = latest + window.innerHeight * 0.45;

      let currentActive = '';
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
    });
  }, [scrollY, lastScrollY]);

  const handleNavClick = (sectionId: string) => {
    if (onSectionClick) {
      onSectionClick(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="fixed bottom-3 inset-x-3 z-40 md:hidden max-w-sm mx-auto pointer-events-auto"
          style={{
            paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
          }}
          aria-label="Quick mobile navigation dock"
        >
          <div className="flex items-center justify-between gap-1 p-1.5 bg-[#141821]/90 backdrop-blur-xl border border-[#2D3442]/80 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.65)] ring-1 ring-white/5">
            {/* Navigation pills */}
            <div className="flex items-center gap-0.5 flex-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 active:scale-95 ${
                      isActive
                        ? 'text-[#EAEAF0]'
                        : 'text-[#818C9D] hover:text-[#CCD2DE]'
                    }`}
                    aria-label={`Jump to ${item.label}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-thumb-pill"
                        className="absolute inset-0 bg-[#252C38] rounded-xl border border-[#3E4756]/60 shadow-inner"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <Icon className="relative z-10 w-4 h-4 mb-0.5" />
                    <span className="relative z-10 font-mono text-[9px] uppercase tracking-wider font-semibold">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Subtle Divider */}
            <div className="w-[1px] h-7 bg-[#2D3442]/80 my-auto mx-1" />

            {/* Quick Resume Download Action */}
            <a
              href="/Pratyush.Jaiswal.pdf"
              download
              className="flex items-center justify-center gap-1 px-3 py-2.5 bg-[#EAEAF0] active:bg-white text-[#0B0D10] rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95 shrink-0"
              aria-label="Download Resume PDF"
            >
              <span>CV</span>
              <FileDown className="w-3.5 h-3.5 text-[#0B0D10]" />
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default MobileThumbDock;
