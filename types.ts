/** Case-study themes borrowed from a project's own design system. */
export type ProjectTheme = 'pixel' | 'folk';

export type ProjectKind = 'Client' | 'Community' | 'Event' | 'Tools' | 'Realtime';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectAnalytics {
  period: string;
  source: string;
  /** ISO date of the first entry in `daily`. */
  startDate: string;
  headline: { label: string; value: string }[];
  daily: number[];
  rolling: number[];
  /** Index in `daily` of the launch-day spike. */
  launchDay: number;
  channels: { label: string; value: number }[];
  geo: { local: { label: string; value: number }; total: number; cities: { label: string; value: number }[]; countries: number };
  engagement: { label: string; value: number }[];
  engagementNote?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One line, shown on cards and under the case-study title. */
  tagline: string;
  category: string;
  kind: ProjectKind[];
  year: string;
  /** Short role line for meta grids, e.g. "Solo — design & frontend". */
  role: string;
  featured: boolean;
  /** Optional theme the case study switches into after it opens. */
  theme?: ProjectTheme;
  /** Borrowed from the project's own site. Only used on its card and case study. */
  accent: { base: string; glow: string };
  links: { live?: string; code?: string };
  nda?: boolean;
  cover: ProjectImage;
  mobile?: ProjectImage;
  gallery: ProjectImage[];
  stack: string[];
  overview: string;
  problem: string;
  decisions: { title: string; body: string }[];
  frontendNotes: { label: string; body: string }[];
  outcome: string;
  facts?: { label: string; value: string }[];
  analytics?: ProjectAnalytics;
}
