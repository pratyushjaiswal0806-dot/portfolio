export const SITE_URL = 'https://pratyushjaiswal.vercel.app';

export interface NavRoute {
  label: string;
  to: string;
  /** Hidden from the nav when there is nothing to show (e.g. no published notes). */
  requiresNotes?: boolean;
}

/** Primary navigation, shared by the navbar, mobile menu, footer and ⌘K palette. */
export const navRoutes: NavRoute[] = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Notes', to: '/notes', requiresNotes: true },
  { label: 'Contact', to: '/#contact' },
];

export const labRoute: NavRoute = { label: 'Motion Lab', to: '/lab' };
export const colophonRoute: NavRoute = { label: 'Colophon', to: '/colophon' };

export const buildInfo = {
  sha: __BUILD_SHA__,
  date: new Date(__BUILD_DATE__),
};

export const formatBuildDate = (date: Date) =>
  date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
