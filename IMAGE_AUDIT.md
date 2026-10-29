# Rufnix Studio — Image System & Asset Audit

This audit documents every image asset used across the Rufnix Studio portfolio, verifying dimensions, aspect ratios, component mappings, and presentation guidelines.

---

## 1. Asset Inventory & Technical Specifications

| Asset Path | Dimensions | Aspect Ratio | Format | File Size | Primary Subject & Verification |
|---|---|---|---|---|---|
| `public/assets/logo.jpg` | 1024 &times; 1024 | 1:1 (Square) | JPEG | 246.9 KB | **Rufnix Studio Official Logo & Monogram** — Verified circular emblem with RF monogram and tagline "Engineered by imagination." |
| `public/assets/projects/fr-beauty-studio.png` | 1024 &times; 491 | 2.09:1 (Ultra-Wide) | PNG | 445.1 KB | **F&R Beauty Studio** (*Status: In Development*) — Verified luxury salon multi-tenant management interface with booking advance verification. |
| `public/assets/projects/lifepilot.png` | 1024 &times; 486 | 2.11:1 (Ultra-Wide) | PNG | 178.3 KB | **LifePilot** (*Status: Active Project*) — Verified dark productivity cockpit dashboard with goals, overdue task alerts, and Groq AI workflow. |
| `public/assets/projects/bytemind.png` | 1024 &times; 543 | 1.89:1 (Wide) | PNG | 202.9 KB | **ByteMind AI** (*Status: Active Project*) — Verified conversational AI chatbot interface with live prompt stream and deductive logic. |

---

## 2. Component Mapping & Presentation Audit

### `public/assets/logo.jpg`
- **Current Components**: [Navbar.jsx](file:///d:/Portfolio/src/components/Navbar.jsx), [Footer.jsx](file:///d:/Portfolio/src/components/Footer.jsx), [index.html](file:///d:/Portfolio/index.html) (favicon & OG image).
- **Presentation Rule**: Displayed in circular pills with 1:1 aspect ratio. Accented with subtle emerald border glow (`shadow-glow-subtle`) and emerald status indicator.

### `public/assets/projects/fr-beauty-studio.png`
- **Current Components**: [ProductReveal3D.jsx](file:///d:/Portfolio/src/components/story/ProductReveal3D.jsx), [ProjectsOrbit3D.jsx](file:///d:/Portfolio/src/components/story/ProjectsOrbit3D.jsx), [Scene3D.jsx](file:///d:/Portfolio/src/components/canvas/Scene3D.jsx).
- **Aspect Ratio Handling**: Native ratio is **2.09:1**. Must be rendered with `object-fit: contain` or tailored `aspect-[21/10]` container with `object-position: top` to prevent cropping the navigation bar, headline ("Elevate your beauty business..."), or verified booking card.
- **Device Frame**: Custom titanium/emerald studio browser chrome with live URL indicator (`fr-studio.rufnix.internal`).

### `public/assets/projects/lifepilot.png`
- **Current Components**: [ProjectsOrbit3D.jsx](file:///d:/Portfolio/src/components/story/ProjectsOrbit3D.jsx), [Scene3D.jsx](file:///d:/Portfolio/src/components/canvas/Scene3D.jsx).
- **Aspect Ratio Handling**: Native ratio is **2.11:1**. Must use tailored `aspect-[21/10]` container with `object-position: top` to ensure the greeting ("Good morning, sara."), goal cards, and overdue alerts remain completely legible.
- **Device Frame**: Dark cockpit chassis with status indicator and telemetry badge.

### `public/assets/projects/bytemind.png`
- **Current Components**: [ProjectsOrbit3D.jsx](file:///d:/Portfolio/src/components/story/ProjectsOrbit3D.jsx), [Scene3D.jsx](file:///d:/Portfolio/src/components/canvas/Scene3D.jsx).
- **Aspect Ratio Handling**: Native ratio is **1.89:1**. Must use `aspect-[19/10]` with `object-position: top` so the chat conversation bubble and prompt input bar are crisply presented.
- **Device Frame**: High-tech terminal frame with live prompt indicator.

---

## 3. Mobbin-Inspired Layout Principles Applied

1. **Pixel-Perfect Device Chrome**: Wrapping genuine screenshots in interactive vector browser frames (macOS traffic-light controls, route capsule, SSL lock, live online pulse).
2. **True Aspect-Ratio Containers**: Containers dynamically adapt to native screenshot ratios without stretching, pixelation, or arbitrary cropping.
3. **Interactive Full-Resolution Lightbox**: Clicking any project image or the "Inspect UI" action launches a full-resolution inspection modal for examining every detail of the interface.
4. **Cinematic Depth & Motion**: Damped 3D perspective tilt reacting to cursor movements, emerald rim reflections, and smooth clip-path transitions.
