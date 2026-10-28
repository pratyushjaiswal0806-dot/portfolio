import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Home, FolderGit2, User, FlaskConical, Search, FileDown } from 'lucide-react';
import { personal } from '../../data/personal';
import { useSiteUI } from '../../lib/site-ui';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/work', label: 'Work', icon: FolderGit2 },
  { to: '/about', label: 'About', icon: User },
  { to: '/lab', label: 'Lab', icon: FlaskConical },
];

const isActive = (pathname: string, to: string) =>
  to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(to + '/');

const MobileThumbDock: React.FC = () => {
  const location = useLocation();
  const { openPalette } = useSiteUI();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const diff = latest - lastScrollY.current;
      // Hide on intentional downward scroll past hero, reveal on upward scroll
      if (latest > 180 && diff > 8) {
        setIsVisible(false);
      } else if (diff < -6 || latest < 120) {
        setIsVisible(true);
      }
      lastScrollY.current = latest;
    });
  }, [scrollY]);

  useEffect(() => {
    setIsVisible(true);
  }, [location.pathname]);

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
            viewTransitionName: 'site-dock',
          }}
          aria-label="Quick mobile navigation dock"
        >
          <div className="flex items-center justify-between gap-1 p-1.5 bg-steel/90 backdrop-blur-xl border border-line/80 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.65)] ring-1 ring-white/5">
            {/* Navigation pills */}
            <nav className="flex items-center gap-0.5 flex-1" aria-label="Pages">
              {navItems.map((item) => {
                const active = isActive(location.pathname, item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    viewTransition
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 active:scale-95 ${
                      active ? 'text-ice' : 'text-[#818C9D] hover:text-[#CCD2DE]'
                    }`}
                  >
                    {active && (
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
                  </Link>
                );
              })}
            </nav>

            {/* Subtle Divider */}
            <div className="w-[1px] h-7 bg-line/80 my-auto mx-0.5" />

            <button
              type="button"
              onClick={openPalette}
              className="flex items-center justify-center w-10 h-10 rounded-xl text-[#818C9D] active:bg-[#252C38] active:scale-95 transition-transform shrink-0"
              aria-label="Search pages, projects and actions"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick Resume Download Action */}
            <a
              href={personal.resume}
              download
              className="flex items-center justify-center gap-1 px-3 py-2.5 bg-ice active:bg-white text-obsidian rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs transition-transform active:scale-95 shrink-0"
              aria-label="Download Resume PDF"
            >
              <span>CV</span>
              <FileDown className="w-3.5 h-3.5 text-obsidian" />
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default MobileThumbDock;
