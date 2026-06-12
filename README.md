# The Way In ✳

A free, single-page site that welcomes complete beginners — teenagers to retirees — into agentic AI coding tools (Claude Code, OpenAI Codex, OpenCode, Hermes). The thesis: **if you can write a good chat message, you can already use an agent.**

What a visitor gets, in one scroll:

1. **Chat vs. agent**, felt side by side with the same request.
2. **A test drive** — a fully scripted, in-browser agent session where the visitor sends the message and personally clicks *Allow* (or *Not now*, which safely does nothing). Pure theater: every beat is data in `src/data/missions.ts`; nothing executes.
3. **Fear-calming, honestly** — agents ask first, practice lives in an empty folder, worst case you delete one folder. Plus a big red button that can't break anything.
4. **A tool picker** — a 2-tap quiz and four honest cards with verified links and costs.
5. **Three paste-ready starter prompts** with one-click copy.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # static production build → dist/
npm run preview    # serve the production build locally
```

Deploy by putting `dist/` on any static host (Netlify drop, Vercel, GitHub Pages, a plain web server). `base: './'` keeps it sub-path-proof. No server, no accounts, no database, no tracking.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · Motion — self-hosted variable fonts (Bricolage Grotesque, Instrument Sans, JetBrains Mono), zero raster images, hand-rolled confetti.

Accessibility and performance are first-class: full `prefers-reduced-motion` calm version (typed text renders instantly, the test drive becomes a step-through), transform/opacity-only animation, Lighthouse 100s, CLS 0.00.
