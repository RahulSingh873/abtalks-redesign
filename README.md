# ABTalks — 60-Day Challenge Redesign

A mobile-first prototype (390px primary target) for ABTalks, a 60-day public-build
challenge for Indian college students. Built with React + Vite + Tailwind CSS v4,
fully interactive, no backend or auth — all data is local/mocked.

## 1. Implemented routes

| Route | Purpose |
|---|---|
| `/` | Landing page — explains ABTalks to a first-time visitor |
| `/dashboard` | Student home — today's task, streak, Momentum, progress |
| `/day/12` | Challenge Day — brief, Definition of Done, GitHub + LinkedIn proof, completion state |

`/day/:dayNumber` is dynamic — "Continue to Day 13" after completing Day 12 actually
navigates to `/day/13` and renders a graceful fallback brief, since only Day 12 has
fully mocked content per the brief.

## 2. Running locally

```bash
npm install
npm run dev      # http://localhost:5173
```

To preview at the evaluation width, open dev tools, set the viewport to **390×844**
(or any mobile preset), and load `/`, `/dashboard`, `/day/12` in turn.

## 3. Building & deploying

```bash
npm run build     # outputs static site to dist/
npm run preview   # serve the production build locally
```

`dist/` is a static bundle — deploy it as-is to Netlify, Vercel, GitHub Pages, or any
static host. No environment variables or backend are required.

## 4. Design decisions

**Why not glassmorphism.** The brief explicitly asks to avoid excessive glassmorphism
and gradients, so the system leans on a disciplined dark surface stack instead
(`ink → surface → surface-2 → surface-3`) with a single accent color, ember orange,
doing almost all of the emotional work (streaks, momentum, today's task). Mint and
indigo are used narrowly and consistently — mint always means "GitHub / verified,"
indigo always means "LinkedIn / profile."

**Typography.** Sora (display) pairs with Inter (body) for a warm-but-technical voice,
and JetBrains Mono is reserved for anything numeric or data-like — day counts, streaks,
scores, proof URLs — so the interface visually distinguishes *narrative* text from
*status* text without needing extra color or iconography.

**Signature element — the Journey Rail.** Because the challenge is a genuine strict
sequence (Day 1 → Day 60, no reordering), a horizontal 60-dot rail is used as the
one true structural device: filled dots are shipped days, a pulsing ring marks today,
and outlined dots are ahead. It appears full-size on the landing page as the "60-day
journey," and in compact form on the dashboard as an at-a-glance recent-streak view.
This replaces generic numbered-step markers with something that encodes real state.

**Today's task dominates the dashboard.** Per the brief, it's the largest, highest-
contrast card on the screen, sits right under the streak strip, and is the only card
with a colored border and elevated shadow — everything else (Momentum, progress,
achievements) is visually quieter by design.

**Motion is restrained.** A single staggered rise-in on page load, a soft pulse on
today's day-dot, and a flicker on the hero flame icon — that's the full animation
budget. `prefers-reduced-motion` is respected globally.

## 5. The Momentum Score

Momentum is a single number (0–100) that answers "is this student actually
consistent right now?" — a question streak count alone can't fully answer (a 60-day-old
account with a 3-day current streak reads very differently from a fresh joiner).

In this prototype it's precomputed mock data (`82/100`) but the UI is built to explain
*any* score value:

- **0–39** → "Just getting started" (muted tone, no pressure copy)
- **40–74** → "Building momentum" (ember, encouraging)
- **75–100** → "Strong momentum" (ember, affirming)

The card also surfaces the three inputs that would feed a real score — current streak,
GitHub submissions, LinkedIn submissions — directly underneath, so the number never
feels opaque, and pairs it with one motivating, specific sentence ("3 more consistent
days unlocks your next milestone") rather than a full analytics breakdown, per the
brief's instruction to keep this simple rather than building an analytics dashboard.

## 6. Interactivity implemented

- Full navigation across all three routes, plus a bottom tab bar on `/dashboard` and
  `/day/:id` (landing intentionally omits it — a first-time visitor shouldn't see app
  chrome before joining).
- Today's task card is a real link into `/day/:currentDay`.
- GitHub and LinkedIn proof inputs with basic URL-shape validation (rejects clearly
  malformed URLs, accepts `github.com/...` and `linkedin.com/...` patterns) and a
  per-field verified state.
- Once both proofs are verified, the Day view transitions into a completion state
  with a real "Continue to Day 13" action.
- An interactive Definition-of-Done checklist (visual only, doesn't block submission —
  matches how the brief frames DoD as guidance, not a gate).
- A visible **"Preview a state"** control (bottom-right spark button) that switches the
  whole app between Day-12-in-progress, Day-1-fresh-start, streak-reset, and
  incomplete-profile — this is how the required edge cases below are actually reachable
  and testable rather than just described in code comments.

## 7. Edge cases handled

- **First day / zero completed days** — dashboard swaps in "Your journey starts
  today," the streak badge shows the day count without shaming an empty streak, and
  the Momentum copy explains the score builds from day one instead of showing a bare 0.
- **Missed day** — a dedicated banner reads "You missed yesterday. That's okay,"
  clarifies the streak reset without discarding completed-day progress, and sits above
  the fold without blocking today's task.
- **Empty/incomplete profile** — a lightweight, dismiss-style prompt appears above the
  streak strip; the student is never blocked from reaching today's task or submitting
  proof.
- **Malformed proof URLs** — inline, specific error text per field, not a generic
  "invalid input."

## 8. Testing instructions

1. `npm run dev`, open the app, set viewport to 390px width.
2. On `/`, confirm the hero, journey rail, and both CTAs route to `/dashboard`.
3. On `/dashboard`, tap the spark button (bottom-right) → try each of the four preview
   states and confirm the banners/copy change accordingly.
4. Tap the Day 12 card → confirm it opens `/day/12` with the full brief.
5. Paste a non-URL string into the GitHub field → confirm the inline validation error.
6. Paste `https://github.com/rahulsingh873/airsense` → confirm it verifies.
7. Paste `https://www.linkedin.com/posts/example` → confirm it verifies and the screen
   transitions to the completion state.
8. Tap "Continue to Day 13" → confirm navigation to `/day/13` with graceful fallback
   content.

## 9. Tech stack

- React 19 + Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`, CSS-first `@theme` token config — see
  `src/index.css`)
- `react-router-dom` for the three routes
- No UI kit — every component in `src/components/` is hand-built for this system
