# Pratyush Jaiswal — Frontend Developer Portfolio

![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

The personal site of Pratyush Jaiswal, a frontend developer in Bengaluru. It's a multi-page React app built around a **"Mechanical Blueprint"** visual language: architectural grids, system readouts, decryption type and spring physics.

---

## ⚡ Highlights

* **Boot loader**: the blueprint grid draws itself on the first visit of a session (`sessionStorage: pj-loader-seen`). It's skipped on refresh, on deep links later in the session, and under reduced motion. You can replay it from ⌘K.
* **Real pages**: Home, Work, a case study per project (`/work/:slug`), About, Notes, Motion Lab, Colophon and a 404, all on React Router 7's data router with route-level code splitting.
* **Page transitions**: the View Transitions API wipes each new page in over a blueprint grid. Project images morph from their card (or the cursor preview on `/work`) into the case-study hero.
* **⌘K command palette** (`cmdk`, lazy-loaded): jump to pages and projects, copy the email address, download the résumé, toggle inspect mode, or replay the loader.
* **Blueprint inspect mode**: outlines and labels every major component, devtools-style, with live size and padding on hover. Toggle it from ⌘K or the footer.
* **Motion Lab**: every animation on the site taken apart: a spring tuner with a live response graph, a draggable cubic-bezier editor, the cursor's velocity stretch, click-origin stagger, layout animation and view transitions. Each one has real controls and its code one tab away.
* **Colophon**: live design tokens read from CSS, easing-curve plots, dependency versions and the build commit.
* **Per-project accents**: each case study borrows one colour from that project's own site.
* **Accessible by default**: reduced-motion fallbacks everywhere, a skip link, landmarks, and keyboard support for the palette and nav. Lighthouse scores 100 for accessibility, best practices and SEO.

---

## 🛠️ Stack

| Category | Technology |
| :--- | :--- |
| UI | React 19, TypeScript 5.8 |
| Routing | React Router 7 (data router, `lazy` routes, `viewTransition`) |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`), tokens in `index.css` |
| Motion | Framer Motion 12, React Spring 10, `@use-gesture/react` |
| Content | MDX notes (`@mdx-js/rollup`) with build-time Shiki highlighting |
| Build | Vite 6, deployed on Vercel (`vercel.json` SPA rewrite) |

---

## 📂 Structure

```text
portfolio/
├── router.tsx                 # Route table (home eager, everything else lazy)
├── App.tsx                    # <RouterProvider>
├── data/
│   ├── projects.ts            # All project + case-study content
│   ├── personal.ts            # Links, Now strip, timeline, off-screen list
│   ├── toolkit.ts             # Technologies and how the about page groups them
│   └── site.ts                # Nav routes, build info
├── content/
│   ├── notes/                 # Published MDX notes
│   └── drafts/                # Drafts: dev only, never in a production build
├── pages/                     # Home, Work, CaseStudy, About, Lab, Notes, Note, Colophon, NotFound
├── components/
│   ├── layout/                # RootLayout, Navbar, Footer, MobileThumbDock
│   ├── sections/              # Home sections: Hero, Intro, FeaturedWork, WhatIDo, NowStrip, LatestNote, Contact
│   ├── about/                 # SpecPortrait (annotated portrait), Journey, HowIWork, Toolkit
│   ├── lab/                   # Motion Lab experiments: springs, easing, velocity, stagger, layout, view transitions, decrypt
│   └── ui/                    # BootLoader, Cursor, CommandPalette, InspectOverlay, DecryptedText, PageHeader, Magnetic, motion.ts
├── lib/                       # notes loader, page meta, storage, media-query & time hooks
└── public/work/<slug>/        # Project screenshots (WebP)
```

---

## ✏️ Editing content

* **Projects:** edit `data/projects.ts`. Screenshots go in `public/work/<slug>/`. Lines marked `TODO(pj)` are drafts to confirm.
* **About, Now and timeline:** edit `data/personal.ts`. The off-screen section stays hidden until it has entries.
* **Notes:** write `content/drafts/<slug>.mdx` with `title`, `date`, `summary` and `tags` frontmatter, and preview it with `npm run dev`. Move it to `content/notes/` to publish. The Notes nav item appears once a published note exists.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18.0.0 or higher) and npm installed on your system:
```bash
node -v
npm -v
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pratyushjaiswal0806-dot/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Production Build

Compile and bundle the application for production deployment:
```bash
npm run build
```
To preview the production bundle locally:
```bash
npm run preview
```
Type-check with:
```bash
npm run typecheck
```

---

## 📜 Documentation

* **Product Requirement Document**: See [`prd.md`](prd.md) for full product specifications, user journeys, and feature matrices.
* **Design System Specification**: See [`design.md`](design.md) for complete brand tokens, typography rules, and motion curves.

---

## 👤 Author

**Pratyush Jaiswal**
* Website: [pratyushjaiswal.vercel.app](https://pratyushjaiswal.vercel.app/)
* GitHub: [@pratyushjaiswal0806-dot](https://github.com/pratyushjaiswal0806-dot)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
