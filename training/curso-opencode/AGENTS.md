# AGENTS.md

## Project overview

Course repository (`curso-opencode`) with standalone browser projects. Each subdirectory is an independent, zero-dependency HTML/CSS/JS app — open `index.html` directly in a browser. No build step, no package manager, no tests, no linting.

## Structure

- `01-game/` — Neon Runner: 2D endless runner with Web Audio API sound. Files: `index.html`, `style.css`, `game.js`, `SPEC.md`
- `02-running/` — RunTracker: running dashboard. Single `index.html` with inline CSS/JS

## Key facts

- **Language:** UI text is in Spanish (es locale)
- **Persistence:** Both apps use `localStorage` for data (game high scores, run history)
- **No toolchain:** Vanilla JS only, no transpilation or bundling
- **Audio (01-game):** Uses Web Audio API exclusively — no external audio files
