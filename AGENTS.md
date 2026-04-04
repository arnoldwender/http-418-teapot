# AGENTS.md — Guide for AI Coding Agents

Instructions for AI agents (Claude Code, Copilot, Cursor, Cody, etc.) working on this repository.

## Quick Context

This is a React 18 + TypeScript + Vite single-page app. It renders a retro CRT terminal that rejects coffee brew requests with HTTP 418 responses (per RFC 2324) and offers tea instead. There is no backend, no routing, no state management library, and no database integration.

## Build & Verify

```bash
npm install          # Install dependencies
npm run build        # Must succeed with zero errors
npm run lint         # Must pass with zero warnings/errors
npm run typecheck    # Must pass (tsc --noEmit)
```

Always run `npm run build` and `npm run typecheck` after making changes to verify nothing is broken.

## Code Style

- **TypeScript strict mode** — no `any` types, no type assertions unless absolutely necessary
- **Functional components only** — no class components
- **React hooks** for all state and effects — no external state libraries
- **Tailwind CSS** utilities for styling — avoid inline `style` props except for dynamic values
- **CSS custom properties** in `src/index.css` for theming — do not hardcode color values
- **Content separation** — all static strings (refusals, log lines, menu items) go in `src/data/teapot-content.ts`
- **Accessibility** — maintain ARIA attributes on interactive and dynamic elements

## Architecture Rules

1. Keep the app fully client-side with no external API calls
2. All animations must be CSS-based (`@keyframes` in `src/index.css`)
3. New interactive behaviors should be implemented as custom hooks in `src/hooks/`
4. Components in `src/components/` should be presentational — logic lives in hooks
5. The CRT overlay (scanlines, vignette) is rendered in `App.tsx` and should not be duplicated

## File Map

| Path | Purpose |
|------|---------|
| `src/App.tsx` | Root component, layout, CRT overlay |
| `src/main.tsx` | React DOM mount |
| `src/index.css` | Theme, animations, CRT effects |
| `src/components/*.tsx` | Presentational UI components |
| `src/data/teapot-content.ts` | Static content, glitch utility |
| `src/hooks/*.ts` | Custom hooks for interactive behavior |

## Unused Dependencies

These are installed but not imported — do not remove without confirming intent:
- `@supabase/supabase-js` — from Bolt template, not integrated
- `lucide-react` — available for icons, not currently used
