# Product Requirement Document (PRD)
## Pratyush Jaiswal Portfolio & Architectural Motion Lab

---

## 1. Executive Summary & Product Vision

### 1.1 Product Vision
The **Pratyush Jaiswal Portfolio & Architectural Motion Lab** is a high-performance web application engineered to serve as both a professional software developer showcase and an interactive motion engineering playground. 

Constructed around a **"Mechanical Blueprint"** visual methodology, the interface blends software development aesthetics—such as structural coordinate lines, system logs, decryption sequences, and developer tools UI—with fluid, velocity-aware micro-interactions.

### 1.2 Core Objectives
* **Engineering Craftsman Showcase**: Highlight high-impact projects (Tech Token Heist, Fancall, PromptCompiler) utilizing structured **Role → Challenge → Impact** analytical breakdowns.
* **Mechanical Blueprint Visual System**: Deliver a cohesive visual identity relying on high-contrast Obsidian dark mode (`#0B0D10`), structural Steel guide lines (`#2D3442`), Cool Slate accents (`#94A3B8`), and custom exponential decrescendo eases (`cubic-bezier(0.16, 1, 0.3, 1)`).
* **Interactive Motion Sandbox**: Provide a dedicated "Animation Lab" view where visitors can experiment in real-time with 3D tilt mechanics, decryption speeds, kinetic scroll skew, and Framer Motion spring physics parameters.
* **Uncompromised Performance & Accessibility**: Achieve 60fps animations via GPU-accelerated CSS variables, zero layout shift (CLS), full screen-reader compliance, and instant fallbacks for touch hardware and `prefers-reduced-motion`.

---

## 2. Target Audience & User Journeys

### 2.1 Primary User Personas
1. **Engineering Managers & CTOs**: Evaluate technical depth, frontend architecture, component structure, performance optimizations, and design system discipline.
2. **Technical Recruiters**: Seek clear summaries of technical skills, role contributions, project impact metrics, live links, and fast contact methods.
3. **Frontend Engineers & Designers**: Explore interactive motion mechanics, custom cursor velocity physics, 3D tilt formulas, and creative visual implementation.

### 2.2 Core User Scenarios

#### Scenario A: The Recruiter / Manager Fast-Track
```
[ Land on Site ] ──> [ BootLoader Decryption ] ──> [ Identity & Status ] 
        │
        └──> [ Horizontal Project Showcase ] ──> [ Open Project Modal ] ──> [ Contact / Resume ]
```

#### Scenario B: The Motion Engineer Deep-Dive
```
[ Land on Site ] ──> [ Navbar View Switcher ] ──> [ Enter Motion Lab ] 
        │
        └──> [ Test Decryption Speed ] ──> [ Tweak Spring Physics Sliders ] ──> [ Inspect 3D Tilt ]
```

---

## 3. Visual Design System & Aesthetics

### 3.1 Design Philosophy: Mechanical Blueprint
The visual interface rejects soft, overly illustrative web tropes in favor of structural precision. Key visual markers include:
* **Coordinate Markers & Logs**: Real-time geolocation coordinates (`LAT: 12.9716° N`, `LNG: 77.5946° E`) and compiled system status indicators (`VER: 2.5.0`, `STATUS: READY`).
* **Guide Rules & Bounding Grids**: Subtle 60px coordinate lines and grid overlays that respond dynamically to cursor movement.
* **Spotlight Illumination**: Muted default states illuminated by brand-colored radial mouse glows upon interaction.

### 3.2 Color Tokens & System Palette

| Token Name | Variable | Hex | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| **Dark Obsidian** | `--bg-obsidian` | `#0B0D10` | Primary application canvas background |
| **Midnight Steel** | `--bg-steel` | `#141821` | Card containers, modal backdrops, sidebars |
| **Steel Blue Line** | `--border-steel` | `#2D3442` | Structural grid lines, borders, dividers |
| **Muted Slate** | `--text-muted` | `#555A6B` | System labels, coordinate logs, inactive tabs |
| **Cool Slate** | `--text-secondary` | `#94A3B8` | Subtitles, interactive outer ring, scroll progress |
| **Ice White** | `--text-primary` | `#EAEAF0` | Main headlines, body copy, active text |
| **Status Green** | `--status-green` | `#4ADE80` | Availability status badge ("Available for Opportunities") |

### 3.3 Typography & Motion Tokens
* **Primary Body Typeface**: `DM Sans` (Clean, geometric, highly legible sans-serif)
* **Secondary Monospace / Title Typeface**: `Space Grotesk` (Futuristic architectural font with sharp geometric terminals)
* **Mechanical Easing Preset**: `PREMIUM_EASE = [0.16, 1, 0.3, 1]` (High initial launch velocity followed by smooth decrescendo deceleration)

---

## 4. Architectural & Component Functional Specifications

```
                       ┌────────────────────────────────────────┐
                       │               App.tsx                  │
                       └───────────────────┬────────────────────┘
                                           │
         ┌─────────────────────────────────┴─────────────────────────────────┐
         ▼                                                                   ▼
┌──────────────────┐                                               ┌──────────────────┐
│  BootLoader.tsx  │ (Session check & Decryption Sequence)         │    Navbar.tsx    │ (View Switcher & Progress)
└──────────────────┘                                               └─────────┬────────┘
                                                                             │
                         ┌───────────────────────────────────────────────────┴───────────────────────────────────┐
                         ▼                                                                                       ▼
           ┌───────────────────────────┐                                                           ┌───────────────────────────┐
           │      Home View            │                                                           │     Motion Lab View       │
           ├───────────────────────────┤                                                           ├───────────────────────────┤
           │ • Hero.tsx                │                                                           │ • AnimationLab.tsx        │
           │ • Intro.tsx               │                                                           │   - Decryption Sandbox    │
           │ • TechStack.tsx           │                                                           │   - 3D Tilt Controller    │
           │ • Projects.tsx (Modal)    │                                                           │   - Kinetic Skew Engine   │
           │ • About.tsx               │                                                           │   - Spring Physics Tuner  │
           │ • Contact.tsx             │                                                           └───────────────────────────┘
           │ • Footer.tsx              │
           └───────────────────────────┘
```

### 4.1 BootLoader Component (`components/ui/BootLoader.tsx`)
* **Functionality**: Full-screen startup sequence mimicking a command console initialization.
* **Character Decryption Logic**: Cycles randomized ASCII characters (`@#$%&*+-=`) at 30ms step intervals before locking onto final string literals (`"PRATYUSH JAISWAL"`, `"SYSTEM INIT"`).
* **Zero-Flash Synchronous Initialization**: `shouldShowLoader()` evaluates `sessionStorage.getItem('pj-loader-seen')` and `prefers-reduced-motion` synchronously prior to the first render pass, preventing unstyled content flashes.

### 4.2 Dynamic Velocity Cursor & Magnetic Tracking (`components/ui/Cursor.tsx`, `Magnetic.tsx`)
* **Velocity Stretch Physics**: Spring-damped follower ring that dynamically scales and skews along its motion vector based on mouse velocity.
* **Contextual States**: Expands and overlays `"VIEW"` label when hovering project cards (`data-cursor="project-card"`), contracts to a compact dot over interactive buttons.
* **Touch Device Protection**: Automatically disabled when touch capabilities (`ontouchstart` or `maxTouchPoints > 0`) are detected.

### 4.3 Global Navigation & Progress Bar (`components/layout/Navbar.tsx`)
* **Scroll Progress**: Fixed top 1px indicator linked to `useScroll` with a smooth spring filter (`stiffness: 100`, `damping: 30`).
* **Architectural Readout**: Displays live geolocation coordinates (`LAT: 12.9716° N`, `LNG: 77.5946° E`), system status indicator, and active section spring highlight via Framer Motion `layoutId="active-indicator"`.
* **View Switcher**: Seamlessly toggles between main portfolio view (`home`) and motion interactive laboratory (`lab`).

### 4.4 Showcase & Project Detail Modal (`components/sections/Projects.tsx`)
* **Horizontal Scroll Experience**: Desktop layout maps `h-[300vh]` vertical page scroll to `0%` -> `-75%` horizontal X axis shift.
* **Adaptive Fallback**: Renders vertical grid layouts automatically on mobile viewports (<768px) or when reduced motion is preferred.
* **Shared Layout Morphing Modal**: Card click triggers a seamless spring transformation (`layoutId`) into a detailed project drawer.
* **Data Schema**: Includes Category, Title, Image, Description, **Role**, **Technical Challenge**, **Impact/Result**, Deliverables List, Tech Tags, Live Link, and NDA badges.

### 4.5 Interactive Motion Lab (`components/sections/AnimationLab.tsx`)
* **Decryption Module**: Interactive input allowing users to test string decryption speeds and character sets.
* **3D Tilt & Light Sweep Module**: Card reacting to cursor position by calculating pitch/roll angles and applying a dynamic specular glare overlay.
* **Kinetic Typography Module**: Text banner whose horizontal skew and marquee speed scale proportionally with scroll velocity.
* **Physics Spring Tuner**: Real-time slider controls for stiffness, damping, and mass to observe spring physics curve behavior live.

### 4.6 Contact & System Footer (`components/sections/Contact.tsx`, `components/layout/Footer.tsx`)
* **Architectural Form**: Styled inputs with subtle line focus indicators, field validation, and status feedback.
* **System Footer**: Blueprint coordinate footer with version tags, social link logs, copyright information, and scroll-to-top execution button.

---

## 5. Non-Functional Requirements & Performance Standards

### 5.1 Performance Criteria
* **Target Frame Rate**: Consistent 60fps animations across modern desktop and mobile browsers.
* **GPU Offloading**: Mouse position tracking relies on CSS custom variable updates (`--mouse-x`, `--mouse-y`) to prevent unnecessary React virtual DOM recalculations.
* **Bundle Optimization**: Tree-shaken Lucide icons, WebP image formats, lazy loading (`loading="lazy"`), and clean component modularization.

### 5.2 Accessibility & Compatibility (WCAG AAA)
* **Contrast Compliance**: Minimum 10:1 contrast ratio between primary body copy (`#EAEAF0`) and Obsidian background (`#0B0D10`).
* **Reduced Motion Compliance**: Complete respect for `prefers-reduced-motion: reduce`. Disables velocity cursors, sticky horizontal scroll transformations, and continuous animation loops.
* **Screen Reader Optimization**: Native semantic elements (`<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`) paired with `.sr-only` utility classes for accessible labels.

---

## 6. Technology Stack Reference

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **UI Framework** | React 19 (`react`, `react-dom`) | Component architecture and UI state management |
| **Language** | TypeScript (~5.8.2) | Type definitions, interfaces, and strict build checking |
| **Bundler & Server** | Vite (^6.2.0) | ESM development server and production build pipeline |
| **Animation Engine** | Framer Motion (^12.23.26) | Layout morphing, spring physics, scroll transforms, gestures |
| **Iconography** | Lucide React (^0.561.0) | Scalable vector icon set |
| **Styling** | Vanilla CSS + Tailwind CSS | Blueprint tokens, grid systems, custom animations, variables |

---

## 7. Version History & Roadmap

### Completed Milestones
- [x] **v1.0.0**: Core portfolio structure, initial hero, and static project cards.
- [x] **v2.0.0**: Framer Motion horizontal scroll integration and shared layout modal drawers.
- [x] **v2.2.0**: Implementation of Mechanical Blueprint design tokens, color palette, and Space Grotesk typography.
- [x] **v2.4.0**: Custom vSnap-inspired BootLoader sequence with character decryption logic.
- [x] **v2.5.0**: Added interactive Motion Lab sandbox, velocity-aware cursor stretch, touch fail-safes, and zero-flash synchronous loader checks.

### Future Enhancements
- [ ] **v3.0.0**: Interactive terminal CLI command interface inside the Motion Lab.
- [ ] **v3.1.0**: Live Supabase telemetry logger for project view metrics and interaction logs.
