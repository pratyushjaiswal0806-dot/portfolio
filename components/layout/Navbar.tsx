import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { navRoutes, labRoute, NavRoute } from '../../data/site';
import { personal } from '../../data/personal';
import { hasNotes } from '../../lib/notes';
import { useSiteUI } from '../../lib/site-ui';
import { useLocalTime } from '../../lib/useLocalTime';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);
export const paletteHint = isMac ? '⌘K' : 'Ctrl K';

/** Section links like "/#contact" scroll on the home page and navigate elsewhere. */
export const useNavTo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (to: string) => {
    const [path, hash] = to.split('#');
    if (hash && location.pathname === (path || '/')) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate(to, { viewTransition: true });
  };
};

export const isRouteActive = (pathname: string, route: NavRoute) =>
  !route.to.includes('#') && (pathname === route.to || pathname.startsWith(route.to + '/'));

const Navbar: React.FC = () => {
  const location = useLocation();
  const navTo = useNavTo();
  const { openPalette } = useSiteUI();
  const time = useLocalTime();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = navRoutes.filter((r) => !r.requiresNotes || hasNotes);
  const labActive = isRouteActive(location.pathname, labRoute);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleItemClick = (e: React.MouseEvent, to: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setIsMobileMenuOpen(false);
    // Small delay so the mobile menu closes before scrolling
    setTimeout(() => navTo(to), isMobileMenuOpen ? 100 : 0);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        data-inspect="Navbar"
        aria-label="Primary"
        className={`fixed top-0 left-0 w-full flex justify-between items-center z-[45] transition-all duration-500 ${
          scrolled
            ? 'p-4 md:py-4 md:px-8 bg-obsidian/85 backdrop-blur-md border-b border-line/40 shadow-lg'
            : 'p-5 sm:p-6 md:p-8 bg-transparent border-b border-transparent'
        }`}
        style={{
          paddingTop: `max(${scrolled ? '1rem' : '1.25rem'}, env(safe-area-inset-top))`,
          viewTransitionName: 'site-nav',
        }}
      >
        <Link to="/" viewTransition className="flex items-center gap-4" aria-label="Pratyush Jaiswal — home">
          <div className="text-ice font-bold text-lg tracking-tight">
            PJ<span className="text-accent">.</span>
          </div>
          {/* Tech Divider */}
          <div className="hidden lg:block w-[1px] h-4 bg-line"></div>
          {/* Coordinates */}
          <div className="hidden lg:flex flex-col text-[10px] font-mono text-muted leading-tight">
            <span>LAT: 12.9716° N</span>
            <span>LNG: 77.5946° E</span>
          </div>
        </Link>

        <div className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium text-ice items-center">
          {items.map((item) => {
            const isActive = isRouteActive(location.pathname, item);
            return (
              <a
                key={item.to}
                href={item.to}
                onClick={(e) => handleItemClick(e, item.to)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 font-mono text-xs tracking-wider transition-colors duration-300 ${
                  isActive ? 'text-ice' : 'text-body hover:text-ice'
                }`}
                data-cursor="hover"
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <Link
            to={labRoute.to}
            viewTransition
            aria-current={labActive ? 'page' : undefined}
            className={`px-4 py-2 bg-steel border rounded-sm text-xs font-mono uppercase tracking-wider transition-colors text-accent ${
              labActive ? 'border-accent' : 'border-line hover:border-accent'
            }`}
            data-cursor="hover"
          >
            {labRoute.label}
          </Link>
          <button
            type="button"
            onClick={openPalette}
            className="group flex items-center gap-2 px-3 py-2 border border-line rounded-sm text-[10px] font-mono uppercase tracking-wider text-body hover:text-ice hover:border-accent transition-colors"
            aria-label="Open command palette"
            aria-keyshortcuts="Meta+K Control+K"
            data-cursor="hover"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="font-mono">{paletteHint}</kbd>
          </button>
          <a
            href={personal.resume}
            download
            className="px-4 py-2 bg-ice text-obsidian rounded-sm text-xs font-mono uppercase tracking-wider hover:bg-white transition-colors"
            data-cursor="hover"
          >
            Resume
          </a>

          {/* Live Time Badge */}
          <div className="hidden xl:block ml-2 px-3 py-1 bg-steel/50 border border-line rounded-full text-[10px] font-mono text-accent" title="Local time in Bengaluru">
            {time} UTC+5.30
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
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
            className="fixed inset-0 bg-obsidian/95 backdrop-blur-2xl z-[44] flex flex-col items-center justify-center lg:hidden px-6"
            style={{
              paddingTop: 'max(2rem, env(safe-area-inset-top))',
              paddingBottom: 'max(2rem, env(safe-area-inset-bottom))'
            }}
          >
            <motion.div className="flex flex-col items-center gap-8">
              {[{ label: 'Home', to: '/' }, ...items].map((item, index) => (
                <motion.a
                  key={item.to}
                  href={item.to}
                  onClick={(e) => handleItemClick(e, item.to)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-3xl font-bold transition-colors ${
                    isRouteActive(location.pathname, item) || (item.to === '/' && location.pathname === '/')
                      ? 'text-accent'
                      : 'text-ice hover:text-accent'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 flex flex-wrap justify-center gap-3"
              >
                <Link
                  to={labRoute.to}
                  viewTransition
                  className="px-6 py-3 bg-steel border border-line rounded-sm text-sm font-mono uppercase tracking-wider text-accent hover:border-accent transition-colors"
                >
                  {labRoute.label}
                </Link>
                <a
                  href={personal.resume}
                  download
                  className="px-6 py-3 bg-ice text-obsidian rounded-sm text-sm font-mono uppercase tracking-wider font-bold"
                >
                  Resume
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-[10px] font-mono text-muted"
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
