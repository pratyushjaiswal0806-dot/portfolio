import type { ProjectTheme } from '../../../types';

/**
 * Per-project case-study themes. Each one borrows its project's own design
 * system (see that project's DESIGN.md). Tokens are exposed as --th-* custom
 * properties by the theme class in index.css; the copy here is the voice the
 * theme speaks in.
 */
export interface CaseTheme {
  id: ProjectTheme;
  /** Root class that scopes the theme's CSS. */
  className: string;
  /** Rotating accent tones, as CSS values, for nodes, tiles and cards. */
  tones: string[];
  /** Colour used for the highlighted series in analytics charts. */
  chartTone: string;
  /** Large numerals for numbered steps. */
  numeral: (n: number) => string;
  copy: {
    hudLoading: string;
    hudReady: string;
    frameStatus: string;
    toc: string;
    step: (n: number) => string;
    outcome: string;
    next: string;
    liveImpact: string;
  };
  /** Optional second-script subtitles for section kickers, keyed by label. */
  kickerSubs?: Record<string, string>;
}

const pad = (n: number) => String(n).padStart(2, '0');
const roman = (n: number) => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][n - 1] ?? String(n);

export const caseThemes: Record<ProjectTheme, CaseTheme> = {
  // RoboFiesta: 8-bit pixel console.
  pixel: {
    id: 'pixel',
    className: 'theme-pixel',
    tones: ['var(--th-yellow)', 'var(--th-blue)', 'var(--th-pink)', 'var(--th-orange)'],
    chartTone: '#FF8B78',
    numeral: pad,
    copy: {
      hudLoading: 'Loading RoboFiesta',
      hudReady: 'Level ready',
      frameStatus: 'Signal online',
      toc: 'Level select',
      step: (n) => `Level ${pad(n)}`,
      outcome: 'Mission complete',
      next: 'Next level',
      liveImpact: 'Live impact',
    },
  },
  // Pegasus: Indian folk art, ink outlines, parchment and marigold.
  folk: {
    id: 'folk',
    className: 'theme-folk',
    tones: ['var(--th-yellow)', 'var(--th-blue)', 'var(--th-pink)', 'var(--th-orange)'],
    chartTone: '#FFC21A',
    numeral: roman,
    copy: {
      hudLoading: 'Mixing the colours',
      hudReady: 'Swagat!',
      frameStatus: 'Chitra · चित्र',
      toc: 'Wander',
      step: (n) => `Chapter ${roman(n)}`,
      outcome: 'Phal · the result',
      next: 'Next katha',
      liveImpact: 'Live impact',
    },
    kickerSubs: {
      'Case study': 'कथा',
      Overview: 'सार',
      'The problem': 'समस्या',
      'Key decisions': 'निर्णय',
      'Frontend notes': 'टिप्पणी',
      Outcome: 'परिणाम',
      Gallery: 'चित्र',
      'Live impact': 'प्रभाव',
    },
  },
};
