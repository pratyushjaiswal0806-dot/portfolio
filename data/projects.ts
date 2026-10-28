import type { Project, ProjectKind } from '../types';

/* Copy is first person. Lines marked TODO(pj) are drafts written from the
   live sites and need Pratyush's confirmation before they're final. */

export const projects: Project[] = [
  {
    slug: 'robofiesta-26',
    title: "RoboFiesta'26",
    tagline: "An arcade-themed site for RVITM's annual robotics and tech fest: boot screen, arenas, countdown and all.",
    category: 'Event website',
    kind: ['Event', 'Community'],
    year: '2026',
    role: 'Solo: design & frontend',
    featured: true,
    accent: { base: '#9BE7FF', glow: '#6C2BD9' },
    links: { live: 'https://robofiesta26.vercel.app/' },
    cover: { src: '/work/robofiesta-26/cover.webp', alt: "RoboFiesta'26 homepage: pixel-art logo, a robot mascot and a full moon on a purple night sky" },
    mobile: { src: '/work/robofiesta-26/mobile.webp', alt: "RoboFiesta'26 homepage on a phone" },
    gallery: [
      { src: '/work/robofiesta-26/arenas.webp', alt: 'Choose your arena: a carousel of event posters', caption: 'Choose your arena: a poster carousel where every card opens that event’s own page.' },
      { src: '/work/robofiesta-26/timeline.webp', alt: 'Mission timeline with day tabs and grouped events', caption: 'Mission timeline: the two fest days as tabs, events grouped into Technical, Auxiliary and E-games, plus the treasure-hunt mini-game.' },
      { src: '/work/robofiesta-26/countdown.webp', alt: 'The arena is open panel with fest stats and a countdown', caption: 'The arena is open: fest stats and a live countdown to day one.' },
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'SVG'],
    overview:
      "RoboFiesta is RVITM's annual robotics and tech fest: two days, 19 arena challenges, 1500+ participants and a ₹1 lakh+ prize pool. I designed and built the whole site on my own, from the brand world and event pages to the schedule and the registration flow.",
    problem:
      "A fest site has two jobs. It has to feel like an event worth showing up to, and it has to get hundreds of teams from “what is this?” to “registered and paid” without a help desk. Most college fest sites only manage one of them.",
    decisions: [
      {
        title: 'Make it a game, everywhere',
        body: 'Everything uses the same language: a “LOADING → LEVEL READY” boot screen, arenas instead of events, a mission timeline, player onboarding. Display type is Press Start 2P, and anything you have to actually read is in DM Sans.',
      },
      {
        // TODO(pj): confirm the reasoning behind the scroll-driven sky.
        title: 'A sky that changes as you scroll',
        body: 'The background moves from night-time purple through a sunset into daylight blue as you go down the page. It gives the page a sense of progress, so reaching the register button feels like arriving at fest day.',
      },
      {
        title: 'Three steps to enter',
        body: 'Registration is cut down to three steps: choose an arena, register your team, pay and upload the proof (UTR plus a screenshot). Fees, rules and timings live on each arena’s own page, so the homepage works as a launcher instead of a rulebook.',
      },
      {
        title: 'Small moments of play',
        body: 'There’s a treasure-hunt mini-game, a sound toggle and a themed cookie check. They make the site feel like the event, and none of them get in the way of registering.',
      },
    ],
    frontendNotes: [
      { label: 'Accessibility', body: 'Every section is labelled by its heading, the two-day schedule is a real tablist with tab panels, and the page uses header, nav, main and footer landmarks.' },
      { label: 'Routing', body: 'Built on the Next.js App Router with a page per arena (e.g. /events/robo-race), so every event has its own shareable URL.' },
      { label: 'Illustration', body: 'The robot, moon, clouds and pixel decorations are CSS and inline SVG, so they stay sharp on any screen density.' },
      { label: 'Motion', body: 'Animations respect prefers-reduced-motion.' },
    ],
    outcome:
      "The site is live for RoboFiesta'26 (10–11 December 2026) and is where teams register, check the schedule and read the event rules.",
    facts: [
      { label: 'Arena challenges', value: '19' },
      { label: 'Participants', value: '1500+' },
      { label: 'Prize pool', value: '₹1L+' },
      { label: 'Fest days', value: '2' },
    ],
  },
  {
    slug: 'pegasus',
    title: 'Pegasus',
    tagline: "The website for RVITM's web development club, where code meets kala. Indian folk art, drawn in SVG.",
    category: 'Club website',
    kind: ['Community'],
    year: '2026',
    role: 'Solo: design & frontend',
    featured: true,
    accent: { base: '#FFC21A', glow: '#C4145A' },
    links: { live: 'https://pegasus-six-olive.vercel.app/' },
    cover: { src: '/work/pegasus/cover.webp', alt: 'Pegasus homepage: a marigold wordmark and an illustrated flying horse with a code-bracket saddle on rani pink' },
    mobile: { src: '/work/pegasus/mobile.webp', alt: 'Pegasus homepage on a phone' },
    gallery: [
      { src: '/work/pegasus/karya.webp', alt: 'Karya section with Warli figures and three activity cards', caption: 'Karya: what the club does. Weekly Pathshala workshops, Hack Mela hackathons and year-round Karkhana project teams.' },
      { src: '/work/pegasus/utsav.webp', alt: 'Utsav section with event tickets', caption: 'Utsav: upcoming events as festival tickets, each with one-tap registration.' },
      { src: '/work/pegasus/chitra.webp', alt: 'Chitra section with arch-shaped gallery frames', caption: 'Chitra: the project gallery, framed in temple-arch windows.' },
    ],
    stack: ['Next.js', 'React', 'CSS', 'SVG'],
    overview:
      "Pegasus is RVITM's web development club. I designed and built its website on my own, from the visual identity to every section between the origin story and the join form.",
    problem:
      'Most club sites are a logo, a list of events and a Google Form. Pegasus needed a site that gives students a reason to join and feels like a place with its own personality, while still being the practical home for workshops, hackathons, projects and sign-ups.',
    decisions: [
      {
        title: 'Where code meets kala',
        body: 'The identity mixes the web with Indian folk art: Warli figures, rangoli, mandalas, diyas, paisley and a flying Pegasus with a </> saddle. Sections are named in Hindi (Katha, Karya, Utsav, Chitra, Toli), with the Devanagari set alongside.',
      },
      {
        title: 'Every section is its own world',
        body: 'Each section gets its own colour field: rani pink, teal, vermilion, indigo and green. Scrolling feels like walking through a mela, and you always know where you are.',
      },
      {
        title: 'Practical underneath',
        body: 'Under the decoration it’s a working club site. Events have “Save a seat” and “Register a team” actions, the project gallery shows stack tags, the team gets a page, and the join form asks only for what the club needs: USN, year, college email and interests.',
      },
    ],
    frontendNotes: [
      { label: 'Illustration as code', body: 'Every illustration (the Pegasus, the Warli figures, mandalas and diyas) is inline SVG. There isn’t a single raster image, and the whole page is about 0.9 MB over the wire.' },
      { label: 'Type', body: 'Sarpanch for display and Mukta for body. Mukta covers both Latin and Devanagari, so the Hindi labels sit on the same baseline as the English.' },
      { label: 'Motion', body: 'Falling marigold petals and hover nudges on the gallery frames, all behind prefers-reduced-motion.' },
      { label: 'Responsive', body: 'On a phone the hero illustration moves below the copy and the event tickets stack into a single column.' },
    ],
    outcome: "It's live as the club's home on the web, with events, projects, the team and sign-ups all in one place.",
    facts: [
      { label: 'Raster images', value: '0' },
      { label: 'Inline SVGs', value: '73' },
      { label: 'Page weight', value: '~0.9 MB' },
      { label: 'Sections', value: '6' },
    ],
  },
  {
    slug: 'tech-token-heist',
    title: 'Tech Token Heist',
    tagline: 'A real-time matchmaking and token-economy game for an inter-college tech competition.',
    category: 'Web application',
    kind: ['Realtime', 'Event'],
    year: '2026',
    role: 'React UI & real-time flows',
    featured: true,
    accent: { base: '#D6B738', glow: '#A15C37' },
    links: { live: 'https://tech-toke-nheist.vercel.app/' },
    cover: { src: '/work/tech-token-heist/cover.webp', alt: 'Tech Token Heist game interface' },
    gallery: [],
    stack: ['React', 'Supabase', 'Real-time'],
    overview:
      'A real-time gamified matchmaking platform for an inter-college tech competition, with team queues, token-economy flows, domain selection, gameplay phases and a live leaderboard. I built the React interface, the Supabase-backed real-time flows, the matchmaking screens, the gameplay state views and the leaderboard.',
    problem:
      'The core challenge was keeping fast-moving game state understandable for many teams at once without the interface feeling chaotic.',
    decisions: [
      {
        title: 'Game state as explicit phases',
        body: 'Queue, match and gameplay are separate phases, each with its own screen and rules, so every team always knows what is happening and what to do next.',
      },
      {
        title: 'Real-time by default',
        body: 'Supabase real-time channels push queue, match and leaderboard changes to every client as they happen. Nobody needs a refresh button during a live event.',
      },
    ],
    frontendNotes: [
      { label: 'Real-time', body: 'Supabase real-time channels drive queues, match state and the leaderboard.' },
      { label: 'Scale', body: 'Structured to support up to 24 teams, with rules specific to each phase.' },
    ],
    outcome:
      'A competition-ready product structure that supports up to 24 teams, rules for each phase, and live event operations.',
    facts: [{ label: 'Teams supported', value: '24' }],
  },
  {
    slug: 'promptcompiler',
    title: 'PromptCompiler',
    tagline: 'A local-first workbench that trims LLM prompts without losing the facts that matter.',
    category: 'Developer tool',
    kind: ['Tools'],
    year: '2026',
    role: 'Design & build',
    featured: true,
    accent: { base: '#CCFB5C', glow: '#4B582C' },
    links: { code: 'https://github.com/pratyushjaiswal0806-dot/promp-t.git' },
    cover: { src: '/work/promptcompiler/cover.webp', alt: 'PromptCompiler workbench interface' },
    gallery: [],
    stack: ['React', 'TypeScript', 'LLM'],
    overview:
      'A local-first workbench for analysing and shrinking LLM prompts while keeping the important facts: IDs, dates, URLs and constraints. I built the inspection workflow, the deterministic reduction logic, the fact-preservation checks and an optional summarisation path that uses NVIDIA NIM.',
    problem:
      'Prompt compression can easily delete useful context, so the interface had to show exactly what changed and protect the critical details.',
    decisions: [
      { title: 'Show the diff', body: 'Every reduction is visible, so you can see exactly what was removed before anything is sent to a model.' },
      { title: 'Deterministic first', body: 'Reduction works offline and deterministically by default. The NVIDIA NIM summarisation path is opt-in.' },
      { title: 'Protect the facts', body: 'IDs, dates, URLs and constraints are detected and survive every reduction.' },
    ],
    frontendNotes: [
      { label: 'Local-first', body: 'Runs offline by default. Nothing leaves the machine unless you opt in to NIM.' },
      { label: 'Token analysis', body: 'An inspection view breaks a prompt down before and after reduction.' },
    ],
    outcome:
      'A local tool for cutting wasted tokens before content goes to an LLM, deterministic and offline by default.',
  },
  {
    slug: 'fancall',
    title: 'Fancall',
    tagline: 'Production frontend for a celebrity–fan engagement platform, from Figma to responsive React.',
    category: 'Client work',
    kind: ['Client'],
    year: '2026',
    role: 'Frontend developer',
    featured: false,
    accent: { base: '#F5A430', glow: '#8D5B7A' },
    links: {},
    nda: true,
    cover: { src: '/work/fancall/cover.webp', alt: 'Fancall interface screens' },
    gallery: [],
    stack: ['React', 'TypeScript', 'Tailwind'],
    overview:
      'A production frontend for a celebrity–fan engagement platform. I turned detailed Figma screens into responsive React interfaces.',
    problem:
      'The main constraint was matching polished visual details while keeping components scalable across desktop, tablet and mobile.',
    decisions: [
      { title: 'Components first', body: 'Design files became reusable React components instead of one-off screens, so new pages could be put together rather than rebuilt.' },
      { title: 'Ready for the backend', body: 'UI states were prepared up front so backend integration could slot in without redesigning screens.' },
    ],
    frontendNotes: [
      { label: 'Responsive', body: 'Layouts hold up across desktop, tablet and mobile.' },
      { label: 'Performance', body: 'Optimised for production, with cleaner component reuse and fewer one-off styles.' },
    ],
    outcome: 'Delivered NDA-safe frontend work with consistent layouts, cleaner component reuse and production-ready interaction states.',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectKinds: ProjectKind[] = ['Client', 'Community', 'Event', 'Realtime', 'Tools'];

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
};
