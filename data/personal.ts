/* Everything personal lives here so it can be edited in one place.
   Lines marked TODO(pj) need Pratyush's own words. */

export const personal = {
  name: 'Pratyush Jaiswal',
  role: 'Frontend Developer',
  location: 'Bengaluru, India',
  timezone: 'Asia/Kolkata',
  email: 'pratyushjaiswal0806@gmail.com',
  phone: '+918770953990',
  phoneDisplay: '+91 877 095 3990',
  github: 'https://github.com/pratyushjaiswal0806-dot',
  githubHandle: '@pratyushjaiswal0806-dot',
  linkedin: 'https://www.linkedin.com/in/pratyush-jaiswal-ba0b6926a',
  resume: '/Pratyush.Jaiswal.pdf',
  repo: 'https://github.com/pratyushjaiswal0806-dot/portfolio',
};

/** The "Now" strip on the home and about pages. */
export const now = {
  updated: 'October 2026',
  items: [
    { label: 'Building', value: "Final touches on RoboFiesta'26 before the fest on 10–11 December, and version three of this site." },
    { label: 'Studying', value: 'B.E. in Computer Science at RVITM, second year.' },
    { label: 'Open to', value: 'Frontend internships and freelance builds.' },
    // TODO(pj): add what you're learning, reading or listening to, e.g.
    // { label: 'Learning', value: '…' },
  ],
};

/** About page, in order. Dates within 2026 need confirming. */
export const timeline: { when: string; title: string; body: string; href?: string }[] = [
  {
    when: '2025',
    title: 'Started Computer Science at RVITM',
    body: 'Moved into a B.E. in Computer Science at R V Institute of Technology and Management, Bengaluru (class of 2029).',
  },
  {
    when: '2026', // TODO(pj): month
    title: 'Fancall: first client frontend',
    body: 'Turned a celebrity–fan platform’s Figma screens into production React, under NDA.',
    href: '/work/fancall',
  },
  {
    when: '2026', // TODO(pj): month
    title: 'Tech Token Heist',
    body: 'Real-time matchmaking, a token economy and a live leaderboard for an inter-college competition.',
    href: '/work/tech-token-heist',
  },
  {
    when: '2026', // TODO(pj): month
    title: 'PromptCompiler',
    body: 'A local-first tool for trimming LLM prompts without losing the facts.',
    href: '/work/promptcompiler',
  },
  {
    when: '2026', // TODO(pj): month
    title: 'Pegasus',
    body: 'Designed and built the web development club’s site on my own, where code meets kala.',
    href: '/work/pegasus',
  },
  {
    when: '2026', // TODO(pj): month
    title: "RoboFiesta'26",
    body: 'Designed and built the arcade-themed site for RVITM’s annual robotics and tech fest on my own.',
    href: '/work/robofiesta-26',
  },
];

/** Shown on the about page only when it has entries.
 *  TODO(pj): 3–5 things you do away from the keyboard. */
export const offScreen: { label: string; body: string }[] = [];
