# INSTRUCTIONS.md — Developer Guide

## Overview

HTTP 418 Teapot is a playful, fully client-side web application built with React, TypeScript, and Vite. It simulates an HTTP server that implements RFC 2324 — the Hyper Text Coffee Pot Control Protocol — by refusing all coffee requests with a 418 status code and offering tea instead.

The UI mimics a retro CRT terminal with amber-on-black colors, scanline effects, and glitch animations.

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

## Setup

```bash
git clone https://github.com/arnoldwender/http-418-teapot.git
cd http-418-teapot
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` with hot module replacement.

## Development Workflow

1. **Start the dev server** — `npm run dev`
2. **Make changes** — Vite provides instant HMR
3. **Check types** — `npm run typecheck`
4. **Lint** — `npm run lint`
5. **Build** — `npm run build`

## Project Architecture

### Entry Points

- `index.html` — HTML shell with meta tags and teapot favicon
- `src/main.tsx` — React DOM render into `#root`
- `src/App.tsx` — Root component that composes all UI

### Components (`src/components/`)

| Component | Responsibility |
|-----------|---------------|
| `CoffeeInput.tsx` | Terminal-style text input with brew submit button |
| `BrewLog.tsx` | Sequential log display with color-coded lines |
| `ResponseCard.tsx` | HTTP 418 response card with headers and refusal body |
| `TeaMenu.tsx` | Beverage grid — available teas and forbidden coffees |
| `TeapotIcon.tsx` | Teapot emoji with animated steam puffs |

### Hooks (`src/hooks/`)

| Hook | Responsibility |
|------|---------------|
| `useBrewProcess.ts` | State machine managing idle → processing → rejected flow. Handles both coffee rejection and tea brewing. |
| `useGlitchTitle.ts` | Periodically corrupts the title text with random characters every 4 seconds. |

### Data (`src/data/`)

`teapot-content.ts` contains all static content:
- `REFUSALS` — 12 themed rejection messages
- `BREW_LOG` — 10 sequential processing log lines
- `TEA_MENU` — 8 beverages (4 teas, 4 forbidden coffees)
- `GLITCH_CHARS` — Characters used for text corruption
- `glitchText()` / `randomRefusal()` — Utility functions

### Styling (`src/index.css`)

Custom CSS layered on top of Tailwind:
- **CSS variables** for the amber/red color theme
- **12+ keyframe animations** (blink, scandown, rise, shake, steam, glow, brew-progress, etc.)
- **CRT effects** — scanlines via pseudo-elements, vignette overlay, scanline bar animation

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite + React plugin, excludes lucide-react from optimizeDeps |
| `tsconfig.app.json` | TypeScript config for app code (strict mode) |
| `tsconfig.node.json` | TypeScript config for Node tooling (Vite config) |
| `tailwind.config.js` | Tailwind content paths |
| `postcss.config.js` | PostCSS with Tailwind and Autoprefixer |
| `eslint.config.js` | ESLint 9 flat config with TypeScript and React plugins |

## Production Build

```bash
npm run build
```

Outputs to `dist/`. Serve with any static file server or `npm run preview`.
