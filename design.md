# Pratyush Jaiswal Portfolio — Design System & Visual Specification

This document defines the comprehensive visual language, design system tokens, layout architectures, motion guidelines, and developer implementation rules for the Pratyush Jaiswal Portfolio website. It is designed to ensure strict styling compliance across all pages, components, and future sub-modules.

---

## 1. Design Philosophy

### Overall Visual Style
The interface utilizes a **"Mechanical Blueprint"** or **"Architectural Console"** design aesthetic. It mimics high-end developer tools, engineering drawings, and command systems. It rejects overly soft, illustrative styles in favor of structured alignment, thin guide rules, data monitors, and precise coordinates. 

### Mood and Emotional Feel
*   **Structured & Technical:** Evokes accuracy, clarity, and structural integrity.
*   **Futuristic & Minimalist:** Sleek dark Obsidian background paired with thin Cool Slate guidelines.
*   **Liquid & Responsive:** Animations feel organic, using custom-tuned spring curves and mechanical eases.

### Intended User Experience
The user should feel like they are exploring an active IDE, terminal, or computer blueprint. Hovering reveals brand colors, scrolling compiles text dynamically, and mouse motion reacts with velocity-aware cursor changes, creating a premium, interactive environment.

### Core Design Principles
1.  **Clarity Over Clutter:** Form follows function. Non-text elements (grids, nodes, lines) exist to guide the eye or respond to user action.
2.  **Intentional Motion:** No movement for the sake of movement. Animations denote loading transitions, highlight interaction boundaries, or display scrolling progress.
3.  **Mechanical Precision:** Text reveals use decryption algorithms, elements snap into place with exponential decrescendo easing, and metadata panels display real-time variables.

### Target Audience
Tech leads, recruiters, developers, open-source contributors, and designers looking for technical depth, design maturity, and frontend craftsmanship.

---

## 2. Brand Identity

### Personality & Tone
*   **The Pragmatic Builder:** Directly showcases core skills, clean-cut project briefs, and measurable impacts (Role, Challenge, Result).
*   **Intellectual & Technical:** Minimal marketing jargon; emphasis on core languages (TypeScript, Python, SQL) and system frameworks (React, Supabase).
*   **Quietly Confident:** Uses muted defaults (grayscale, low opacity) and reserve vivid colors solely for interactive actions.

### Key Visual Themes
*   **Blueprint Grids:** System layouts aligned along `60px` vertical and horizontal coordinate grids.
*   **System Status Logs:** Bottom-aligned metadata displays (`VER: 2.5.0`, `STATUS: READY`, `TOTAL_DEPS: 18`) indicating a fully compiled app state.
*   **Interactive Spotlights:** Elements illuminate when hovered, casting custom-colored radial glows.

---

## 3. Color System

### Base Palette
The core brand relies on a highly restricted slate-to-obsidian range, creating a premium dark mode that minimizes eye strain and maximizes contrast.

| Color Token | Variable Name | Hex Value | RGB Value | Purpose & Recommended Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Dark Obsidian** | `--bg-obsidian` | `#0B0D10` | `rgb(11, 13, 16)` | Main background of the entire app. Deep black-gray. |
| **Midnight Steel** | `--bg-steel` | `#141821` | `rgb(20, 24, 33)` | Card backdrops, modal container, and sidebar panels. |
| **Steel Blue Line** | `--border-steel` | `#2D3442` | `rgb(45, 52, 66)` | Structural guides, borders, grids, and dividers. |
| **Muted Slate** | `--text-muted` | `#555A6B` | `rgb(85, 90, 107)` | System status logs, timestamps, coordinates, inactive tabs. |
| **Cool Slate** | `--text-secondary` | `#94A3B8` | `rgb(148, 163, 184)`| Accent headings, subtext, cursor outer ring, active indicator. |
| **Ice White** | `--text-primary` | `#EAEAF0` | `rgb(234, 234, 240)`| Primary headings, text, main interactive actions, logo. |

### Semantic Colors
*   **Success (Available):** `#4ADE80` (Green-400) / `#22C55E` (Green-500) — Used strictly in Availability Badges to denote active job-seeking status.
*   **Focus Ring / Interactive Outline:** `#94A3B8` (Cool Slate) — Standard focus indicators.

### Accent Brand Colors (Interactive Hover Glows)
In the Technology Stack, logos glow with their respective brand colors when hovered:
*   **TypeScript:** `#3178C6`
*   **JavaScript:** `#F7DF1E`
*   **Python:** `#3776AB`
*   **Java:** `#ED8B00`
*   **Node.js:** `#5FA04E`
*   **React:** `#61DAFB`
*   **Tailwind CSS:** `#06B6D4`
*   **Git:** `#F05032`
*   **Figma:** `#F24E1E`
*   **Postman:** `#FF6C37`
*   **Supabase:** `#3ECF8E`

---

## 4. Typography System

The typography system relies on two fonts connected to the architectural design language.

### Font Families
*   **Primary Font (Body, Paragraphs, Lists):** `'DM Sans', sans-serif` — Clean, legible, geometric sans-serif that balances modern style with neutral readability.
*   **Secondary Font (Headings, Buttons, Code, Statuses):** `'Space Grotesk', sans-serif` — Futuristic, high-tech engineering typeface featuring structural terminals and geometric proportions.
*   **Fallback Font:** `sans-serif`, `monospace` (where applicable)

### Type Scale

| Scale Role | Font Family | Size (Desktop) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Heading** | `Space Grotesk` | `72px` (`text-7xl`) | Bold (`700`) | `1.0` | `-0.025em` |
| **Section Heading** | `Space Grotesk` | `60px` (`text-6xl`) | Bold (`700`) | `1.1` | `-0.01em` |
| **Subheadings (Cards)** | `Space Grotesk` | `24px` (`text-2xl`) | Medium (`500`)| `1.2` | `normal` |
| **Body Text** | `DM Sans` | `18px` (`text-lg`) | Light (`300`) | `1.625` | `normal` |
| **Navigation Link** | `Space Grotesk` | `12px` (`text-xs`) | Medium (`500`)| `normal` | `0.1em` |
| **System Label / Stats**| `Space Grotesk` | `10px` | Bold (`700`) | `1.0` | `0.2em` (Wide) |

---

## 5. Layout System

### Grid Structure
*   **Desktop Max Container:** `1400px` (with standard side gutters `px-6 md:px-12 lg:px-24`).
*   **Section Layout:** Typical sections use vertical padding (`py-28 md:py-32`) to establish breathing room.
*   **Desktop Hero:** Split layout with a left-aligned identity block (`lg:col-span-7`) and right-aligned portrait card (`lg:col-span-5`).

### Alignment Rules
*   **Guide Lines:** Vertical guidelines are established at the borders of the max container to keep elements neatly structured.
*   **Visual Rhythm:** Content blocks (such as About and Contact) are strictly left-aligned or centered, avoiding organic offsets to keep the layout feeling structural.

---

## 6. Component Design Language

### Buttons

#### 1. Blueprint Open Button (Interactive Action)
*   **Style:** Transparent background, boxed by a thin Cool Slate (`#94A3B8`) line border that scales to Ice White on hover.
*   **Hover Effect:** An invisible inner mouse-glow is activated (spotlight card glow). The bounding borders slide to full size (`w-full`, `h-full`) to enclose the button.
*   **Easing:** Mechanical ease (`cubic-bezier(0.16, 1, 0.3, 1)`).

#### 2. Solid Action Button (e.g., "Get in Touch", "Resume")
*   **Style:** Solid Ice White (`#EAEAF0`) background, Dark Obsidian (`#0B0D10`) text. Rounded borders `rounded-sm`.
*   **Hover Effect:** Scales up slightly, transitions to full White (`#FFFFFF`) with a surrounding drop glow shadow (`rgba(148,163,184,0.25)`).

---

### Cards

#### 1. Horizontal Projects Card (Desktop Scroll)
*   **Structure:** `rounded-2xl` corners, boundary border (`border-[#2D3442]`), midnight steel background (`bg-[#141821]`).
*   **Interactive State:** Scaling/blur transformations. When hovered, the cursor ring expands and displays the text `"VIEW"` in its center.
*   **Gradients:** Deep dark gradient overlay (`bg-gradient-to-t from-[#0B0D10] to-transparent`) hides bottom descriptions until hover.

#### 2. Motion Lab Module Cards (Glassmorphism / 3D Tilt)
*   **Structure:** Translucent midnight steel backdrop (`bg-[#141821]/50`), thin outline (`border-[#2D3442]`), `rounded-lg` corners.
*   **Interaction:** 3D Tilt effect calculated dynamically via cursor relative position coordinates. Mouse glow spotlight sweeps are masked across the card structure on cursor movement.

---

### Navigation Header
*   **Structure:** Fixed header (`fixed top-0 left-0 w-full`), background opacity transitions from transparent to blur (`bg-[#0B0D10]/80 backdrop-blur-md border-b border-[#2D3442]/30`) when page scrolls past `40px`.
*   **Coordinates Display:** Active LAT/LNG coordinates of Bangalore (`LAT: 12.9716° N`, `LNG: 77.5946° E`) sit on the left, next to the logo divider line.
*   **Active Indicator:** Framer Motion spring-bound bottom border indicator (`layoutId="active-indicator"`), sliding horizontally when sections cross viewports.

---

## 7. Visual Effects

### Shadows & Elevation
*   **Level 0 (Flat):** Base sections (`#0B0D10`).
*   **Level 1 (Card):** Midnight steel panel border overlays (`border-[#2D3442]`).
*   **Level 2 (Active Glows):** Spotlights on cards and buttons (`rgba(148, 163, 184, 0.08)`).
*   **Level 3 (Modal Overlay):** Project detailed modals with high-intensity backdrop blurs (`backdrop-blur-md`) and box-shadow depth (`0 20px 40px rgba(0,0,0,0.4)`).

### Gradients
*   **Text Sweep Gradient:** Used on the Hero title. Transitions from `#EAEAF0` to `#94A3B8` and back to `#EAEAF0` using a dynamic linear background sweep.
*   **Ambient Glows:** Radial gradient orbs (`rgba(148, 163, 184, 0.06)`) centered in sections to break up uniform black fields.

---

## 8. Motion Design

Motion is designed around organic velocity physics and strict ease limits.

### Animations & Transitions

#### Mechanical Easing
*   **Timing Function:** `cubic-bezier(0.16, 1, 0.3, 1)` (Expo Out).
*   **Behavior:** Immediate velocity burst followed by an elegant deceleration. Used for modals, layout morphs, and header transitions.

```typescript
// Core System Transition Presets
export const PREMIUM_EASE = [0.16, 1, 0.3, 1];
```

#### Key Micro-Animations
1.  **Decrypted Text Reveal:** Character-by-character text replacement using randomized characters (`chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&^*=-+"`) cycling at `30ms` intervals until compiling into standard readable text.
2.  **Velocity Stretch Cursor:** The outer ring stretches dynamically based on cursor movement speed and direction (`scaleX` scales up, `scaleY` scales down, rotating along the coordinate angle).
3.  **Mouse Spotlight Pressure:** In the Hero section, a mouse-controlled blueprint grid reveals a thicker secondary grid pattern when hovering over active name spaces.
4.  **Kinetic Typography Skew:** Horizontal text banners skew dynamically based on scroll velocity (`skewX` mapping velocity to degree values).

---

## 9. Imagery Guidelines

*   **Portrait Photography:** Extreme crop, zoomed-in minimalist portrait of Pratyush Jaiswal. Default state is styled with low brightness (`brightness-95`). Hover transforms scale the image (`scale-135`) and boost brightness (`brightness-105`) with smooth transitions.
*   **Brand Logos:** Simple vector SVG silhouettes. Default state uses `grayscale(30%)` and `opacity(75%)`. Active state returns to full color and casts a subtle color glow drop-shadow.

---

## 10. Accessibility Standards

1.  **Text Contrast:** Contrast ratios between text and dark backdrops strictly adhere to WCAG AAA standards. Primary text maintains a contrast ratio of > 10:1.
2.  **Reduced Motion Support:** All transitions, springs, velocity cursors, and coordinate grids obey user preferences.
    *   `prefers-reduced-motion` blocks all active loops and falls back to clean, static typography reveals.
    *   Custom cursors are hidden; standard browser cursors are restored.
3.  **Semantic Navigation:** The main logo relies on a `.sr-only` class to hide static text from visual view while allowing search engine crawlers to read the full indexable name.

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 11. Design Tokens

### CSS Variables (Standard Implementation)
```css
:root {
  --bg-obsidian: #0B0D10;
  --bg-steel: #141821;
  --border-steel: #2D3442;
  --text-muted: #555A6B;
  --text-secondary: #94A3B8;
  --text-primary: #EAEAF0;

  --font-primary: 'DM Sans', sans-serif;
  --font-secondary: 'Space Grotesk', sans-serif;

  --ease-mechanical: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-system: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### Tailwind Config Tokens
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0D10',
        steel: '#141821',
        guide: '#2D3442',
        muted: '#555A6B',
        accent: '#94A3B8',
        ice: '#EAEAF0',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      transitionTimingFunction: {
        mechanical: 'cubic-bezier(0.16, 1, 0.3, 1)',
        system: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    }
  }
}
```

---

## 12. Developer Implementation Notes

*   **Critical Visuals:** Bounding border coordinates, grids, and alignment lines *must* not be removed. They establish the technical blueprint feel.
*   **Performance Checklist:** Velocity calculations must use lightweight tracking objects (like Framer Motion's `useVelocity` and `useSpring`) to avoid triggers of full component re-renders. Avoid modifying DOM inline directly on mouse events; instead, set CSS variables (`--mouse-x`, `--mouse-y`) and compile animations on GPU layers.
*   **Touch Fail-safe:** Always implement checks to verify touch-capabilities. Devices with touch interfaces must completely disable cursor trails to prevent broken overlays.
