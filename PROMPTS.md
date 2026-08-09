\# PROMPTS.md — Build Log



This project was built through an iterative conversation with Claude (Anthropic),

starting from the ABTalks PRD and ending in the deployed prototype. This log

documents the real sequence of prompts and decisions, organized by phase, so

the build process is verifiable.



\---



\## Phase 1 — Initial build



\*\*Prompt:\*\* Provided the full ABTalks PRD (landing page, dashboard, challenge

day, mock data, edge cases, design constraints) and asked for a competition-quality,

mobile-first (390px) prototype using React + Vite + Tailwind.



\*\*What Claude did:\*\* Scaffolded the Vite/React/Tailwind v4 project, designed a

custom dark design system (ink/surface/ember palette, Sora/Inter/JetBrains Mono

type pairing — deliberately avoiding glassmorphism and generic gradients per the

brief), and built all three required routes (`/`, `/dashboard`, `/day/12`) with

the Momentum Score as the signature feature, full mock data, and all three

required edge cases (first day, missed day, empty profile) wired to an

interactive "preview a state" switcher rather than just described in comments.



\---



\## Phase 2 — Deployment and repo setup



\*\*Prompts:\*\*

\- "how can i push it to my github repo abtalks-redisgn and test it by running cmd"

\- "what if i have to make it the same place where airsene is in"

\- Troubleshooting `git push` rejections, Windows `cmd` vs Unix command

&#x20; differences (`cp` vs `copy`), and Notepad-related file corruption issues



\*\*What Claude did:\*\* Walked through `git init`/`add`/`commit`/`push`, resolved

a diverged-history push rejection with `git pull --allow-unrelated-histories`,

and helped debug several file-corruption issues caused by Notepad's autocorrect

mangling JSX syntax — eventually recommending a move to VS Code.



\---



\## Phase 3 — Standing out among \~8,000 submissions



\*\*Prompt:\*\* "as a senior frontend developer, ui ux designer, suggest me some

ways to stand out my project in front of 8000 participants"



\*\*What Claude did:\*\* Gave a ranked set of differentiation ideas (specific mock

data over generic placeholders, a second thoughtful feature beyond the required

one, real API calls instead of pure mocks, a demo video). This informed several

features built in later phases.



\---



\## Phase 4 — Breeth memory integration



\*\*Prompt:\*\* "they also suggested us to use breeth in this hackathon can you

explain me the use of breeth in this" → "show me the ways to do both breeth

as well as the upper instructions"



\*\*What Claude did:\*\* Researched Breeth's actual REST API (`/v1/episodes`,

`/v1/search`) via web search, then built a client (`src/lib/breeth.js`) that

writes an episode on day completion and a `MemoryCard` that recalls it on the

dashboard. When direct browser calls hit a CORS wall (confirmed via a live

console error screenshot), Claude diagnosed the cause and rebuilt the

integration behind a Netlify Function proxy (`netlify/functions/breeth-proxy.js`)

so the API key stays server-side and browser calls go same-origin.



\---



\## Phase 5 — Fixing a UX gap



\*\*Prompt:\*\* "why profile and home section are same in this" → "like nothing

happens" → "ok i'll go with option b"



\*\*What Claude did:\*\* Diagnosed that the Profile bottom-nav tab pointed to the

same route as Home with a dead `#profile` anchor. Built a genuine fourth route,

`/profile` (a bonus beyond the 3 required routes), with real account details,

progress snapshot, and standing summary.



\---



\## Phase 6 — Accessibility audit fixes



\*\*Prompt:\*\* Shared a screenshot of a Snapsite accessibility/usability audit

(5 findings: vague cohort date, unlabeled journey dots, low-contrast text in

two places, missing pricing info, no skip-navigation link) and asked Claude to

address them.



\*\*What Claude did:\*\* Fixed all five — computed an actual next-Monday date,

added Day 1/Day 60 anchor labels to the journey rail, lightened the muted-text

color tokens globally, added a "Free to join" line, and added a real

skip-to-content link with `id="main-content"` on every page.



\---



\## Phase 7 — Engagement/motivation features



\*\*Prompt:\*\* "what else thing would you suggest adding that will increase

engagement of students and make them feel motivated" → "ok start"



\*\*What Claude did:\*\* Proposed and built, in priority order:

1\. A "why today matters" line per challenge day, tying the task back to a

&#x20;  concrete recruiting reason

2\. A reflection prompt on day completion (saved to `localStorage`, resurfaced

&#x20;  automatically on a later day — "You, on Day X")

3\. \*\*Proof Tier\*\* — Bronze/Silver/Gold/Platinum badges framed in

&#x20;  recruiter-legible language, with a "Copy caption for LinkedIn" button that

&#x20;  closes the loop back to ABTalks' actual purpose (visibility), not just

&#x20;  in-app gamification

4\. A late-night (9pm–3am) "Still time tonight" nudge on the dashboard



\---



\## Phase 8 — Prompt Vault (user's own idea)



\*\*Prompt:\*\* "can you make a Collect Prompt section inside it where users can

store their prompts like they copy there" → clarified via a quick multiple-choice

question that this meant AI prompts used while building



\*\*What Claude did:\*\* Built a local "Prompt Vault" (`src/lib/prompts.js`,

`src/components/PromptVault.jsx`) on the Challenge Day screen, letting a

student save, copy, and delete AI prompts that worked well while building —

genuinely tied to how a challenge like this is actually completed in 2026.



\---



\## Phase 9 — Certificate feature



\*\*Prompt:\*\* Shared a reference screenshot of a GfG-style certificate/progress

UI and described wanting a progress-gated, claimable certificate section →

"add some creativity to it... make it look standout"



\*\*What Claude did:\*\* Built a `CertificateCard` on the Profile page: a locked/

grey state with a padlocked medallion icon while incomplete, an ember glow and

gold medallion once all 60 days are done, and an ornamental certificate

preview (double border, corner flourishes) with its own shareable caption once

claimed. Added a 5th demo scenario ("Day 60 · certificate ready") to the

existing preview switcher so the unlocked state is actually reachable without

waiting 60 real days.



\---



\## Notes on working method



Every feature above went through the same loop: Claude implemented and

built/tested the change in its own sandbox first, then handed over exact file

contents for manual paste into the person's local VS Code project (rather than

assuming automated file sync), followed by `git add / commit / push` to deploy.

Several rounds involved debugging real runtime errors from live screenshots

(a JSX syntax break from Notepad, a live CORS error in the browser console,

a `git push` rejection) rather than working from assumptions.

