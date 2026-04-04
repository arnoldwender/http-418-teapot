# CLAUDE.md — Instructions for Claude Code

This file provides context for Claude Code when working on this repository.

## Project Overview

HTTP 418 Teapot is a React + TypeScript single-page application themed around RFC 2324. It renders a retro CRT terminal UI where users submit coffee brew requests that are always rejected with HTTP 418 responses. Users can also browse a tea menu and brew available teas.

## Tech Stack

- **React 18** with functional components and hooks
- **TypeScript 5** with strict mode (`tsconfig.app.json`)
- **Vite 5** as build tool and dev server
- **Tailwind CSS 3** for utility classes plus extensive custom CSS in `src/index.css`
- **ESLint 9** with TypeScript ESLint and React Hooks plugins

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Production build → dist/
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run typecheck  # TypeScript type-check (tsc --noEmit)
```

## Architecture

- **No routing** — Single-page app, all UI in `App.tsx`
- **No backend** — Fully client-side, no API calls
- **No state library** — React hooks only (`useState`, `useEffect`, `useCallback`)
- **Custom hooks** drive all interactive behavior:
  - `useBrewProcess` — state machine: idle → processing → rejected
  - `useGlitchTitle` — periodic title text corruption every 4 seconds

## Key Conventions

- All styling uses Tailwind utility classes combined with CSS custom properties defined in `src/index.css`
- Color theme uses amber (`#ff9900`) and red (`#ff0000`) CSS variables with multiple opacity levels
- Components use ARIA attributes (`role`, `aria-label`, `aria-busy`, `aria-hidden`) for accessibility
- Content strings (refusals, brew logs, tea menu) live in `src/data/teapot-content.ts`, not inline
- Animations are defined as `@keyframes` in `src/index.css` and applied via Tailwind arbitrary values or CSS classes

## File Layout

```
src/
├── App.tsx                  # Root component with CRT overlay
├── main.tsx                 # Entry point
├── index.css                # Theme variables, animations, CRT effects
├── components/              # UI components (BrewLog, CoffeeInput, ResponseCard, TeaMenu, TeapotIcon)
├── data/                    # Static content and utility functions
└── hooks/                   # Custom React hooks (useBrewProcess, useGlitchTitle)
```

## Notes

- `@supabase/supabase-js` is listed as a dependency but is **not used** in the codebase — it was included by the Bolt template
- `lucide-react` is listed as a dependency and excluded from Vite's optimizeDeps but is **not currently imported** in any component
- The `.bolt/` directory contains Bolt.new scaffold configuration and is not part of the application
