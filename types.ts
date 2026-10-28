export type ProjectKind = 'Client' | 'Community' | 'Event' | 'Tools' | 'Realtime';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
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
}
