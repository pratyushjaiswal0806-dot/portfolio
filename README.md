# Pratyush Jaiswal — Architectural Developer Portfolio & Motion Lab

![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

A high-performance personal portfolio website and interactive motion engineering laboratory. Built around a **"Mechanical Blueprint"** visual methodology, the interface combines architectural guide rules, developer tools aesthetics, character decryption engines, and velocity-aware 60fps spring physics.

---

## ⚡ Highlights & Key Features

* **Terminal BootLoader (`BootLoader.tsx`)**: Full-screen startup sequence inspired by high-tech command consoles. Decrypts text strings character-by-character while preventing unstyled content flashes via synchronous session storage checks (`pj-loader-seen`).
* **Horizontal Parallax Showcase (`Projects.tsx`)**: Desktop view transforms vertical page scrolling into a smooth horizontal parallax translation, complete with shared layout spring morphing project modals (**Role → Challenge → Impact**).
* **Interactive Motion Lab (`AnimationLab.tsx`)**: Dedicated sandbox view where visitors can test micro-interactions, 3D tilt physics, real-time string decryption speeds, scroll velocity skew, and spring stiffness/damping controls live.
* **Velocity-Aware Dynamic Cursor (`Cursor.tsx`)**: Spring-damped outer ring that stretches dynamically along its movement angle based on cursor speed, featuring contextual hover states (`"VIEW"`, buttons, project cards) and automatic touch device detection.
* **Interactive Blueprint Grid (`Hero.tsx`)**: Mouse-controlled blueprint coordinate system displaying real-time Bangalore location coordinates (`LAT: 12.9716° N`, `LNG: 77.5946° E`) and spotlight grid illumination via custom CSS variables (`--mouse-x`, `--mouse-y`).
* **Technology Brand Matrix (`TechStack.tsx`)**: Interactive skill grid casting brand-specific radial color glows upon hover (TypeScript, React, Supabase, Python, Tailwind, Node.js).
* **Zero-Compromise Accessibility & Performance**: WCAG AAA contrast compliance, full `prefers-reduced-motion` fallbacks, screen-reader `.sr-only` support, and GPU-accelerated CSS variables.

---

## 🛠️ Tech Stack & Architecture

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | **React 19** | Modern functional component architecture with `React.useCallback`, `useState`, `useEffect` |
| **Language** | **TypeScript 5.8** | Strict type safety, interface definitions (`Project`, `Skill`, `ViewState`) |
| **Build System** | **Vite 6.2** | Blazing-fast HMR dev server and optimized ESM production bundling |
| **Animation Engine** | **Framer Motion 12** | Layout morphing, spring physics, scroll transforms, `AnimatePresence` |
| **Icons** | **Lucide React** | Clean, scalable UI icon library |
| **Styling** | **Tailwind CSS & Vanilla CSS** | Custom blueprint design system tokens, keyframe animations, CSS custom variables |

---

## 📂 Project Directory Structure

```text
portfolio/
├── components/
│   ├── assets/              # Compressed WebP / PNG project screenshots & assets
│   ├── layout/
│   │   ├── Navbar.tsx       # Top bar, progress indicator, location readout & view switcher
│   │   └── Footer.tsx       # System log footer, version info & back-to-top button
│   ├── sections/
│   │   ├── Hero.tsx         # Blueprint grid spotlight, headline sweep & portrait card
│   │   ├── Intro.tsx        # Personal narrative, core principles & availability badge
│   │   ├── TechStack.tsx    # Interactive skill matrix with brand hover glows
│   │   ├── Projects.tsx     # Horizontal sticky scroll & morphing project drawer modal
│   │   ├── About.tsx        # Background, methodology, & design philosophy breakdown
│   │   ├── Contact.tsx      # Architectural contact form with validation & social links
│   │   └── AnimationLab.tsx # Motion sandbox (Decryption, 3D Tilt, Skew, Spring Tuner)
│   └── ui/
│       ├── BootLoader.tsx   # vSnap-inspired character decryption startup overlay
│       ├── Cursor.tsx       # Velocity-aware spring cursor with contextual state morphs
│       ├── Magnetic.tsx     # Magnetic pull physics wrapper component
│       └── motion.ts        # Reusable mechanical easing curves & motion presets
├── App.tsx                  # Root application orchestrator & state manager
├── index.css                # Design tokens, custom scrollbars & CSS utility classes
├── index.html               # Entry HTML with preloaded Google Fonts (DM Sans, Space Grotesk)
├── design.md                # Comprehensive design system & visual specification
├── prd.md                   # Product Requirement Document (PRD)
├── types.ts                 # TypeScript interfaces and schema types
├── vite.config.ts           # Vite bundler configuration & React plugin setup
└── package.json             # Dependencies, scripts & build configuration
```

---

## 🎨 Visual Design System Tokens

The application strictly adheres to the **Mechanical Blueprint** visual specification outlined in [`design.md`](file:///home/p/proj/portfolio/design.md):

* **Dark Obsidian (`#0B0D10`)**: Deep base canvas background.
* **Midnight Steel (`#141821`)**: Card surfaces, modal containers, sidebars.
* **Steel Blue Line (`#2D3442`)**: Structural grid lines, borders, dividers.
* **Cool Slate (`#94A3B8`)**: Secondary accents, active indicators, cursor rings.
* **Ice White (`#EAEAF0`)**: Primary headlines, body copy, active buttons.
* **Mechanical Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (High launch velocity with exponential decrescendo deceleration).

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
Open your browser and navigate to `http://localhost:5173`.

### Production Build

Compile and bundle the application for production deployment:
```bash
npm run build
```
To preview the production bundle locally:
```bash
npm run preview
```

---

## ♿ Accessibility & Performance Guidelines

* **WCAG AAA Compliance**: Maintains high contrast ratios (> 10:1) on dark Obsidian surfaces.
* **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`. Disables sticky horizontal scroll shifts, velocity cursors, and infinite marquee loops.
* **Touch Device Detection**: Automatically disables custom cursor overlays on touchscreens (`ontouchstart` / `maxTouchPoints > 0`) to prevent interface obstruction.
* **Zero Layout Shift (CLS)**: Skeleton-safe layout structures and pre-calculated container dimensions.

---

## 📜 Documentation

* **Product Requirement Document**: See [`prd.md`](file:///home/p/proj/portfolio/prd.md) for full product specifications, user journeys, and feature matrices.
* **Design System Specification**: See [`design.md`](file:///home/p/proj/portfolio/design.md) for complete brand tokens, typography rules, and motion curves.

---

## 👤 Author

**Pratyush Jaiswal**
* Website: [Portfolio](https://tech-toke-nheist.vercel.app/)
* GitHub: [@pratyushjaiswal0806-dot](https://github.com/pratyushjaiswal0806-dot)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
