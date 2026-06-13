# Portfolio Website — Design Spec

**Date:** 2026-06-14
**Owner:** Bhavya Veer
**Status:** Approved design, pending spec review

## Goal

A personal portfolio website to support a **broad-net internship hunt**. Its job is to
show **range** (many shipped products) and **learning velocity**, while reading well to
two audiences in one visit:

- **Non-technical recruiter** doing a ~20-second skim — needs the gist instantly.
- **Engineer** clicking in — needs depth: tech stack, live demos, source.

Every project leads with a plain-English one-liner (recruiter) and *then* exposes tech
tags + live/repo links (engineer). Skim-readable up top, depth on demand.

## Positioning & Honesty

- **Tagline:** *"Engineering intelligent software from the ground up."*
- The projects are built with heavy AI assistance (Claude does much of the code). This
  is framed openly as the differentiator: shipping real, working products by directing
  AI is a genuine, in-demand skill. Copy must stay **defensible in a technical interview** —
  state what each product does and the decisions behind it; do not imply every line was
  hand-written. A small, optional "built with AI" note per project keeps the workflow
  transparent rather than hidden.

## Tech Stack

- **Astro + Tailwind CSS**, static (SSG). Fast loads, strong SEO, free hosting.
- **Deploy:** Vercel free tier (custom domain optional, later).
- **Contact form:** free no-backend service (Formspree or Web3Forms).
- **Fonts:** self-hosted, free — a bold display face for headlines (Clash Display or
  Space Grotesk) + Inter for body.

## Visual System — "Editorial Bold"

- **Palette:** cream base `#f5f2ec`, near-black ink `#111111`, accent **vermilion `#ff3b00`**,
  dark contrast band `#111111`.
- **Hallmarks:** oversized headlines, thin black rules dividing sections, numbered
  editorial-index project rows (01–03), one accent color, generous whitespace.
- **Motion:** subtle only — fade-up on scroll, accent underline that draws in on hover.
  Nothing that slows the page or distracts a recruiter.
- **Responsive:** mobile-first (recruiters often open links on phones).

## Site Structure (multi-page)

- **`/` Home** — editorial hero (tagline + headline, accent on one word) → "Selected work"
  (the 3 heroes as numbered rows: plain-English line + tech tags + screenshot) → dark
  "+ 6 more shipped projects" band → footer CTA (résumé + contact).
- **`/projects`** — the 3 heroes with rich detail (screenshot, problem solved, your role,
  tech, **Live demo** + **GitHub** buttons), then a **6-tile compact grid (2×3)** for the rest.
- **`/about`** — photo, story (student, fast learner, why you build), skills list, a small
  "also built" line (Pilot), and **résumé download** (PDF).
- **`/contact`** — contact form + direct email, GitHub, LinkedIn links as fallback.

## Projects

**Heroes (featured: true)**
1. **RattafyAI** — AI cram planner; turns a syllabus + deadline into a day-by-day study plan. *(Next.js · Groq · Vercel)*
2. **Staffroom** — multi-agent AI faculty (warden, registrar, planner, tutor) that runs a class. *(Next 16 · Clerk · Neon · AI SDK)*
3. **AI Job Tracker** — tracks job applications and uses AI to organize the hunt. *(Live · Next.js · Vercel)* — https://ai-job-tracker-dun.vercel.app/ · https://github.com/Bhavyaveer44/ai-job-tracker

**Compact grid (6)**
4. **LLM Queue** — task inbox routed across free LLM tiers with quota tracking + fallback. *(Live)* — llm-queue-xi.vercel.app
5. **Memory Lane** — gamified walking journal; days become AI-forged objects on a path. *(Live)* — memory-lane-phi-sage.vercel.app
6. **Group Brain** — agentic bot reads a class group chat (Telegram); Q&A + deadline extraction + digest. *(Next 16 · Neon/pgvector · Groq · Gemini)*
7. **ScholarSaathi** — agent finds NSP scholarships for students. *(Next 16 · Clerk · Neon · Groq)*
8. **MockMirror** — interview video coach; in-browser MediaPipe body-language analysis (video never leaves device) + Groq Whisper. *(builds, not deployed)*
9. **NotesBoard** — *(Live)* — https://notesboard-89ks.onrender.com/ · https://github.com/Bhavyaveer44/notesboard

**Mentioned on About ("also built")**
- **Pilot** — general AI browser agent; Playwright worker + Groq + Next.js UI. *(Live)* — pilot-browser-agent.vercel.app

## Data Model

Single source of truth in **`src/data/projects.ts`** — adding/editing a project is a
one-place change; layout never touched.

```ts
type Project = {
  slug: string;
  name: string;
  blurb: string;      // plain-English one-liner (recruiter)
  problem: string;    // what problem it solves / your role
  tech: string[];     // stack tags (engineer)
  liveUrl?: string;
  repoUrl?: string;
  image: string;      // screenshot path
  featured: boolean;  // true => hero (top 3)
};
```

Both heroes and grid read from this array; `featured: true` selects the 3 heroes.

## Components (reused across pages)

`Nav`, `Footer`, `ProjectRowHero` (numbered home rows), `ProjectCardHero`
(detailed /projects cards), `ProjectCardCompact` (grid tile), `SectionHeading`, `Button`.

## Quality Bars

- Responsive, mobile-first.
- Lighthouse 95+ (Astro's near-zero JS makes this realistic).
- Accessible: semantic HTML, alt text on all images, keyboard navigation, sufficient contrast.
- SEO: meta description, OpenGraph + Twitter cards so shared links preview well.

## Assets To Provide (content collection — not a design gap)

- Screenshots for each of the 9 grid/hero projects.
- Confirmed live URLs + repo URLs for RattafyAI, Staffroom, Group Brain, ScholarSaathi
  (only some are recorded so far).
- Résumé PDF, headshot/photo, short bio text, LinkedIn URL, contact email.

## Out of Scope (YAGNI)

- Blog / CMS, analytics dashboards, dark-mode toggle, i18n, a backend/database.
- Custom domain (optional later, not required to ship).
