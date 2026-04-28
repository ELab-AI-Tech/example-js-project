# AI Failure Modes — Cursor Demo Repo

Companion sample app for the *AI Failure Modes Cursor Examples* exercise. Each
of the five failure modes from the deck has a pre-staged target somewhere in
this repo. Open it in Cursor, run the bad prompt, watch it fail, then run the
fix.

## Setup

```bash
npm install
npm run dev
```

Browse to `http://localhost:5173`. Three pages: Dashboard, Orders, Users.

## Stack

Vite + React 18 (plain JavaScript) + react-router. Frontend only — mock data,
no backend, no database. Keeps the demo fast.

## What is deliberately missing

These omissions make the failure modes land. **Do not add them before the
workshop.**

- No `AGENTS.md` / `CLAUDE.md` — Cursor has zero project context.
- No glossary or `docs/ubiquitous-language.md`.
- No tests, no test runner.
- No spec for any feature.
- Pricing logic is split across three files on purpose.

## Demo map

### Failure mode 1 — AI didn't do what I wanted
**Target:** `src/pages/UsersPage.jsx`, `src/components/UserCard.jsx`
**Bad prompt:** *"Add a way for users to upload a profile picture."*
Cursor will pick storage, image size, format, upload UI, and DB schema for
you, all without asking. Then run the *Grill Me* prompt from the exercises
doc.

### Failure mode 2 — AI is too verbose
**Target:** `src/data/orders.js`, `src/services/cart.js`
**Bad prompt:** *"Add a way to refund a transaction."*
This codebase calls it a *credit*, not a *refund*, *void*, or *reversal*.
Cursor will invent its own term. After it does, ask Cursor to scan for
domain terms and write `docs/ubiquitous-language.md`, then re-run.

### Failure mode 3 — Built right, but it doesn't work
**Target:** `src/utils/dateRange.js` (stub — throws "Not implemented")
**Bad prompt:** *"Implement a function that returns true if two date ranges
overlap, and false otherwise."*
Cursor will write 30+ lines confidently and miss at least one edge case.
Drive the fix with the TDD prompt from the exercises doc.

### Failure mode 4 — Codebase is hard to test
**Target:** `src/services/cart.js`, `src/helpers/discount.js`,
`src/utils/calc.js`
**Bad prompt:** *"Add a 10% loyalty discount that stacks with existing
promotional discounts but caps the total discount at 30%."*
Watch Cursor edit three files. Then run the refactor prompt to consolidate
into a deep `src/pricing/` module with one public function.

### Failure mode 5 — My brain can't keep up
**Target:** `src/pages/DashboardPage.jsx` (the disabled "Export CSV" button)
**Bad prompt:** *"Add a CSV export feature to the orders dashboard. Users can
pick columns, the export runs in the background, and the result is emailed
to them."*
Cursor will dump ~600 lines across many files. Re-run with the
interface-first prompt — review only the public surface.

## Pre-workshop checklist

- [x] No `AGENTS.md` (mode 1 ready)
- [x] No glossary file (mode 2 ready)
- [x] `dateRangesOverlap` is an unimplemented stub, no tests (mode 3 ready)
- [x] Pricing split across `utils/`, `helpers/`, `services/` (mode 4 ready)
- [x] Disabled CSV export button on dashboard (mode 5 ready)
- [ ] Test each demo end-to-end the night before. Don't improvise on stage.

## Reset between demos

```bash
git stash    # before demo: stash any prior demo edits
git checkout .   # nuclear reset to staged state
```
