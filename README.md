# RUTHLESS — Make It Last.

A reference-led reinterpretation of SweetTape for a fictional CD/DVD brand: highlighter pink, original disc labels and sleeves, reflective WebGL discs, scroll-driven typography, and a draggable physics footer.

## Run

```sh
npm install
npm run dev
```

Development: http://localhost:5173

Production: https://ruthless-memory.vercel.app

Vercel project: `ruthless-memory`, team `ruthless5`. The initial production deployment was created from a reviewed 26-file source bundle through Vercel MCP, excluding audit screenshots, the reference video, local MCP configuration, and installed dependencies. `vercel.json` provides the Vite build settings and SPA deep-link rewrite; `.vercelignore` keeps local-only files out of future CLI uploads.

```sh
npm run build
npm run preview
```

Deploy `dist/` to a static host with an SPA fallback to `index.html` for deep links.

## Pages

- `/` — animated hero, six-edition selector, pinned horizontal journey, closing, physics footer.
- `/about` — brand story, moving conveyors, manifesto, pinned values.
- `/products` — interactive six-disc collection.
- `/products/after-hours`, `/products/love-letter`, `/products/no-signal`, `/products/daydream`, `/products/replay`, `/products/forever` — six individual editions, 3D intro, finish preview, features, photo reel, next edition.
- `/news` — filterable journal.
- `/news/a-little-disc-a-lot-of-feeling`, `/news/the-art-of-a-really-good-mixtape` — complete articles, sharing, related story.
- `/contact` — validated contact form that prepares an email draft.
- `/credits` — visible image credits and concept disclaimer.
- Unknown paths show a custom 404.

## Stack and implementation

React, TypeScript, Vite, React Router, GSAP / ScrollTrigger, Lenis, Three.js, Matter.js, Lucide.

- Disc geometry, labels, holographic rim shader, paper texture and sleeves are original. No tape models or SweetTape product images are used.
- Three.js is dynamically loaded only where the 3D scene is rendered. Canvas rendering pauses when offscreen or the document is hidden; render resolution is capped.
- Hover effects have touch alternatives. `prefers-reduced-motion` disables pinning, route wipes, automatic spinning and physics, retaining readable static layouts.
- UI sound is synthesized locally with the Web Audio API; it starts off and needs a deliberate user toggle. No original-site audio is copied.
- Font files are self-hosted from `@fontsource/anton` and `@fontsource/dm-sans` (SIL Open Font License).

## Before public launch

This is a functional frontend concept, not a connected shop or production business backend.

1. Confirm the six edition names, product formats/capacities, copy, articles and dates in `src/data.ts`.
2. Replace `site.email` (demo: `hello@ruthless.studio`) in `src/data.ts`. The form opens a `mailto:` draft; it does not send to an API and never claims delivery. Email entered in the form is not transmitted to a server.
3. Replace `site.instagram` in `src/data.ts` with the actual brand profile, or remove the footer link.
4. Connect a real form endpoint only when the destination, privacy policy and delivery requirements are supplied. No SweetTape form endpoints or analytics are used.
5. Validate on physical Safari/iOS and intended low-power devices before deployment. Current visual and interaction testing uses Chromium desktop and emulated touch viewports.

## Art direction and assets

Direction: **Loud and flat**, seed **710843566**. The brief's audited SweetTape composition takes precedence over generic direction-sheet layouts: the curved section edges, overlapping oversized type, label-like headings, print shadows, spring motion and long pinned journeys are intentional reference-specific decisions. The user explicitly asked to intensify the motion rather than simplify it.

Idea: **RUTHLESS turns the physical disc into a place for memories that should not disappear.** The primary live interaction lets visitors select a feeling, preview printed/silver/sleeved artwork, and handle the discs in the footer.

Photography is contextual, not presented as RUTHLESS customers or manufactured products. All four source photographs are CC0, retained in `public/images/credits.json` and credited visibly at `/credits`:

| Image                        | Creator / source  | Source                                                     |
| ---------------------------- | ----------------- | ---------------------------------------------------------- |
| Music Concert Crowd          | via rawpixel, CC0 | https://www.rawpixel.com/image/5970282/music-concert-crowd |
| Girl in headphones (cropped) | Bruce Mars, CC0   | https://commons.wikimedia.org/w/index.php?curid=79385330   |
| Compact disc album           | Taras, CC0        | https://commons.wikimedia.org/w/index.php?curid=116190144  |
| Audio Compact Disc           | liam, CC0         | https://commons.wikimedia.org/w/index.php?curid=142519248  |

`disc-surface.webp` is an optimized derivative of the CC0 disc photograph. The album photograph appears as an archival reference, not as a RUTHLESS product. No generated photographs or borrowed branding are represented as original photography.

The frontend design checker is deliberately stricter than this reference-led brief. Its first run flags the brief's typographic overlaps, label headings, physical print shadows, CD artwork microtype, star-shaped artwork and long pinned journeys. These are documented style exceptions, not passing accessibility or performance claims. The closing title was shortened to two lines after inspection. There is no stock background video: interactive 3D, image parallax and motion are the media layer.

## Verification

`npm run build` checks TypeScript and the production bundle. Browser checks cover every main/content route, edition previews, journal filtering, empty/filled form validity without submitting, internal route transitions/back navigation, mobile collection controls, menu behavior, viewport overflow, image loading, and reduced-motion layouts. Screenshots and design-checker measurements are in `.playwright-mcp/` and `.taste-skill/`.
