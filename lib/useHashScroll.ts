import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** Scroll to `#id` after a page mounts, e.g. links like "/#contact" or "/about#toolkit". */
export const useHashScroll = () => {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150);
    return () => clearTimeout(timer);
  }, [location.hash, location.key]);
};
