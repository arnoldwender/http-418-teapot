# HTTP 418 — I'm A Teapot

A retro CRT terminal-styled interactive web app celebrating [RFC 2324](https://datatracker.ietf.org/doc/html/rfc2324) (Hyper Text Coffee Pot Control Protocol). The app simulates an HTTP 418 server that refuses all coffee requests and offers tea instead.

## Features

- **Coffee Request Rejection** — Submit brew requests and receive themed 418 refusals with mock HTTP response headers
- **Tea Menu** — Browse available teas (Earl Grey, English Breakfast, Green Tea, Chamomile) and forbidden coffees
- **Brew Log Terminal** — Watch sequential processing logs render in real time
- **CRT Visual Effects** — Scanlines, vignette overlay, glitch text, amber-on-black color scheme
- **Steam Animation** — Animated teapot steam puffs on each rejection
- **Refusal Counter** — Tracks total coffee refusals across the session
- **Accessible** — ARIA roles, labels, and live regions throughout

## Tech Stack

| Layer        | Technology                                  |
| ------------ | ------------------------------------------- |
| Framework    | React 18 + TypeScript 5                     |
| Build        | Vite 5                                      |
| Styling      | Tailwind CSS 3 + custom CSS animations      |
| Linting      | ESLint 9 + TypeScript ESLint + React Hooks  |
| Icons        | Lucide React (available, not currently used) |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type-check
npm run typecheck
```

## Project Structure

```
src/
├── App.tsx                  # Root component — layout, CRT overlay, orchestration
├── main.tsx                 # React DOM entry point
├── index.css                # Tailwind base + CRT theme + 12 keyframe animations
├── components/
│   ├── BrewLog.tsx          # Terminal-style sequential log viewer
│   ├── CoffeeInput.tsx      # Terminal prompt input for coffee requests
│   ├── ResponseCard.tsx     # HTTP 418 response with headers and refusal message
│   ├── TeaMenu.tsx          # Beverage grid (available teas / forbidden coffees)
│   └── TeapotIcon.tsx       # Teapot emoji with conditional steam animation
├── data/
│   └── teapot-content.ts    # Refusal messages, brew log lines, tea menu, glitch utility
└── hooks/
    ├── useBrewProcess.ts    # State machine for request → process → reject flow
    └── useGlitchTitle.ts    # Periodic title text corruption effect
```

## Available Scripts

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start Vite dev server with HMR           |
| `npm run build`    | Production build to `dist/`              |
| `npm run preview`  | Serve production build locally           |
| `npm run lint`     | Run ESLint across the project            |
| `npm run typecheck`| Type-check with TypeScript (no emit)     |

## License

This project is provided as-is for educational and entertainment purposes.
