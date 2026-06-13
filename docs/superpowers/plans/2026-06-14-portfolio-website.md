# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fast, static multi-page portfolio site ("Editorial Bold" design) that shows range to recruiters and engineers, deployable free on Vercel.

**Architecture:** Astro 5 static site (SSG). Tailwind v4 via the official `@tailwindcss/vite` plugin, with design tokens defined in a `@theme` block. All project data lives in one typed `src/data/projects.ts` file consumed by every page. Presentational `.astro` components are verified with Vitest + the Astro Container API; data logic is verified with plain Vitest unit tests; the build + `astro check` act as integration gates.

**Tech Stack:** Astro 5, Tailwind CSS v4 (`@tailwindcss/vite`), TypeScript (strict), Fontsource (Inter + Space Grotesk variable fonts), Vitest, Web3Forms (contact form, no backend), Vercel (static deploy).

---

## File Structure

```
portfolio/
  package.json              # scripts + deps
  astro.config.mjs          # site URL + tailwind vite plugin
  tsconfig.json             # extends astro strict
  vitest.config.ts          # getViteConfig so Container API works in tests
  src/
    env.d.ts
    data/
      projects.ts           # Project type, data array, placement helpers
      projects.test.ts      # unit tests for helpers
    styles/
      global.css            # tailwind import + @theme tokens + base styles
    layouts/
      BaseLayout.astro      # <html> shell, SEO/OG meta, fonts, Nav + Footer
    components/
      Nav.astro
      Footer.astro
      Button.astro
      SectionHeading.astro
      ProjectRowHero.astro      # numbered home rows (01–03)
      ProjectCardHero.astro     # detailed /projects cards
      ProjectCardCompact.astro  # grid tile
      *.test.ts                 # Container API render tests
    pages/
      index.astro           # home
      projects.astro
      about.astro
      contact.astro
      404.astro
  public/
    images/projects/        # screenshots (placeholder until assets provided)
    images/me.jpg           # headshot placeholder
    resume.pdf              # placeholder
```

**Note on `projects.ts`:** the spec used a `featured: boolean`. This plan refines it to a `placement: 'hero' | 'grid' | 'about'` field, because there are three buckets (3 heroes, 6 grid, Pilot on About). This is the single change from the spec's data shape.

---

## Task 1: Scaffold the Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`

We set up manually (not `npm create astro`) because the wizard is interactive and the repo already contains `docs/` and `.git`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "portfolio",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run"
  },
  "dependencies": {
    "astro": "^5.2.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "@fontsource-variable/inter": "^5.1.0",
    "@fontsource-variable/space-grotesk": "^5.1.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// NOTE: update `site` to the real deploy URL once the Vercel project exists.
export default defineConfig({
  site: 'https://bhavyaveer.vercel.app',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Create `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
```

- [ ] **Step 5: Install dependencies**

Run: `npm install`
Expected: completes without errors; `node_modules/` created (already gitignored).

- [ ] **Step 6: Verify the toolchain builds**

Create a throwaway `src/pages/index.astro` containing only `<h1>hi</h1>`, then run:
Run: `npm run build`
Expected: "Complete!" with one page built to `dist/`. Delete the throwaway file afterward (real `index.astro` comes in Task 11).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/env.d.ts
git commit -m "chore: scaffold Astro project with Tailwind v4"
```

---

## Task 2: Design tokens & global styles

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `src/styles/global.css`**

```css
@import "tailwindcss";

/* Editorial Bold design tokens — generate utilities like bg-cream, text-vermilion, font-display */
@theme {
  --color-cream: #f5f2ec;
  --color-ink: #111111;
  --color-vermilion: #ff3b00;

  --font-display: "Space Grotesk Variable", system-ui, sans-serif;
  --font-sans: "Inter Variable", system-ui, sans-serif;
}

@layer base {
  html {
    font-family: var(--font-sans);
    background-color: var(--color-cream);
    color: var(--color-ink);
    scroll-behavior: smooth;
  }
  h1, h2, h3 {
    font-family: var(--font-display);
    letter-spacing: -0.02em;
    line-height: 0.95;
  }
  /* Editorial thin rule used to divide sections */
  .rule { border-top: 1px solid var(--color-ink); }
  /* Subtle fade-up on scroll (toggled by IntersectionObserver in BaseLayout) */
  .fade-up { opacity: 0; transform: translateY(16px); transition: opacity .5s ease, transform .5s ease; }
  .fade-up.in { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) {
    .fade-up { opacity: 1; transform: none; transition: none; }
  }
}
```

- [ ] **Step 2: Verify Tailwind compiles the tokens**

Temporarily add `<div class="bg-cream text-vermilion font-display">x</div>` to the throwaway index (recreate it if deleted), import the stylesheet with `import '../styles/global.css'` in the frontmatter, then:
Run: `npm run build`
Expected: build succeeds; inspect `dist/` CSS contains `#ff3b00`. Remove the throwaway after.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add editorial design tokens and global styles"
```

---

## Task 3: Project data + helpers (TDD)

**Files:**
- Create: `src/data/projects.ts`
- Test: `src/data/projects.test.ts`

- [ ] **Step 1: Configure Vitest** — create `vitest.config.ts`

```ts
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 2: Write the failing test** — `src/data/projects.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { projects, getByPlacement, type Project } from './projects';

describe('projects data', () => {
  it('every project has the required fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.blurb).toBeTruthy();
      expect(Array.isArray(p.tech)).toBe(true);
      expect(['hero', 'grid', 'about']).toContain(p.placement);
    }
  });

  it('has exactly 3 heroes in spec order', () => {
    const heroes = getByPlacement('hero');
    expect(heroes.map((p) => p.slug)).toEqual([
      'rattafy-ai',
      'staffroom',
      'ai-job-tracker',
    ]);
  });

  it('has exactly 6 grid projects', () => {
    expect(getByPlacement('grid')).toHaveLength(6);
  });

  it('slugs are unique', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot find module `./projects`.

- [ ] **Step 4: Write `src/data/projects.ts`**

```ts
export type Placement = 'hero' | 'grid' | 'about';

export interface Project {
  slug: string;
  name: string;
  blurb: string;       // plain-English one-liner (recruiter)
  problem: string;     // what it solves / your role (engineer)
  tech: string[];      // stack tags
  liveUrl?: string;
  repoUrl?: string;
  image: string;       // path under /public
  placement: Placement;
}

export const projects: Project[] = [
  {
    slug: 'rattafy-ai',
    name: 'RattafyAI',
    blurb: 'AI cram planner — turns a syllabus + deadline into a day-by-day study plan.',
    problem: 'Students cramming for exams have no structure. I designed a planner that takes a syllabus and a date and produces an ordered, realistic study schedule.',
    tech: ['Next.js', 'Groq', 'Vercel'],
    liveUrl: 'https://rattafy.vercel.app',
    repoUrl: 'https://github.com/Bhavyaveer44/rattafy',
    image: '/images/projects/rattafy.png',
    placement: 'hero',
  },
  {
    slug: 'staffroom',
    name: 'Staffroom',
    blurb: 'A team of AI faculty agents — warden, registrar, planner, tutor — that run a class.',
    problem: 'A multi-agent system where each agent owns a role and they coordinate to manage a classroom workflow.',
    tech: ['Next.js 16', 'Clerk', 'Neon', 'AI SDK'],
    liveUrl: 'https://staffroom-ten.vercel.app',
    repoUrl: 'https://github.com/Bhavyaveer44/staffroom',
    image: '/images/projects/staffroom.png',
    placement: 'hero',
  },
  {
    slug: 'ai-job-tracker',
    name: 'AI Job Tracker',
    blurb: 'Tracks job applications and uses AI to organize the hunt. (Yes — I built my own.)',
    problem: 'I needed to manage my own internship search, so I built a tracker that uses AI to organize applications and status.',
    tech: ['Next.js', 'Vercel'],
    liveUrl: 'https://ai-job-tracker-dun.vercel.app/',
    repoUrl: 'https://github.com/Bhavyaveer44/ai-job-tracker',
    image: '/images/projects/job-tracker.png',
    placement: 'hero',
  },
  {
    slug: 'llm-queue',
    name: 'LLM Queue',
    blurb: 'A task inbox routed across free LLM tiers with quota tracking and fallback.',
    problem: 'Free LLM API tiers run out. This routes each task to an available provider, tracks quota, and falls back automatically.',
    tech: ['Next.js', 'Vercel'],
    liveUrl: 'https://llm-queue-xi.vercel.app',
    repoUrl: undefined,
    image: '/images/projects/llm-queue.png',
    placement: 'grid',
  },
  {
    slug: 'memory-lane',
    name: 'Memory Lane',
    blurb: 'A gamified walking journal where each day becomes an AI-forged object on a path.',
    problem: 'Turns daily walks/journals into collectible AI-generated objects laid along a visual path.',
    tech: ['Next.js', 'AI', 'Vercel'],
    liveUrl: 'https://memory-lane-phi-sage.vercel.app',
    repoUrl: undefined,
    image: '/images/projects/memory-lane.png',
    placement: 'grid',
  },
  {
    slug: 'group-brain',
    name: 'Group Brain',
    blurb: 'An agentic bot that reads a class group chat — Q&A, deadline extraction, digests.',
    problem: 'Reads a Telegram class group, answers questions from context (RAG), extracts deadlines, and posts digests.',
    tech: ['Next.js 16', 'Neon/pgvector', 'Groq', 'Gemini'],
    liveUrl: 'https://group-brain.vercel.app',
    repoUrl: 'https://github.com/Bhavyaveer44/group-brain',
    image: '/images/projects/group-brain.png',
    placement: 'grid',
  },
  {
    slug: 'scholar-saathi',
    name: 'ScholarSaathi',
    blurb: 'An agent that finds NSP scholarships matched to a student.',
    problem: 'Helps students discover relevant National Scholarship Portal options without manual searching.',
    tech: ['Next.js 16', 'Clerk', 'Neon', 'Groq'],
    liveUrl: 'https://scholar-saathi.vercel.app',
    repoUrl: 'https://github.com/Bhavyaveer44/scholar-saathi',
    image: '/images/projects/scholar-saathi.png',
    placement: 'grid',
  },
  {
    slug: 'mock-mirror',
    name: 'MockMirror',
    blurb: 'An interview coach that analyzes body language in the browser — video never leaves your device.',
    problem: 'On-device MediaPipe analyzes posture/expressions locally (privacy), while Groq Whisper + LLM handle speech feedback.',
    tech: ['Next.js 16', 'MediaPipe', 'Groq Whisper'],
    liveUrl: undefined,        // not deployed — link a demo video or deploy
    repoUrl: undefined,
    image: '/images/projects/mock-mirror.png',
    placement: 'grid',
  },
  {
    slug: 'notesboard',
    name: 'NotesBoard',
    blurb: 'A collaborative notes board.',
    problem: 'A shareable board for organizing notes.',
    tech: ['Web', 'Render'],
    liveUrl: 'https://notesboard-89ks.onrender.com/',
    repoUrl: 'https://github.com/Bhavyaveer44/notesboard',
    image: '/images/projects/notesboard.png',
    placement: 'grid',
  },
  {
    slug: 'pilot',
    name: 'Pilot',
    blurb: 'A general AI browser agent that drives a real browser to complete tasks.',
    problem: 'A Playwright worker takes natural-language goals and operates a live browser, streamed to a Next.js UI over WebSocket.',
    tech: ['Playwright', 'Groq', 'Next.js', 'Render'],
    liveUrl: 'https://pilot-browser-agent.vercel.app',
    repoUrl: undefined,
    image: '/images/projects/pilot.png',
    placement: 'about',
  },
];

export function getByPlacement(placement: Placement): Project[] {
  return projects.filter((p) => p.placement === placement);
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — all 4 tests green.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts src/data/projects.ts src/data/projects.test.ts
git commit -m "feat: add typed project data with placement helpers (TDD)"
```

---

## Task 4: BaseLayout (shell, SEO/OG, fonts, scroll animation)

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Test: `src/layouts/BaseLayout.test.ts`

- [ ] **Step 1: Write the failing render test** — `src/layouts/BaseLayout.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import BaseLayout from './BaseLayout.astro';

describe('BaseLayout', () => {
  it('renders title, meta description, and OG tags', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(BaseLayout, {
      props: { title: 'Test Title', description: 'Test desc' },
      slots: { default: '<p>body</p>' },
    });
    expect(html).toContain('<title>Test Title</title>');
    expect(html).toContain('name="description" content="Test desc"');
    expect(html).toContain('property="og:title" content="Test Title"');
    expect(html).toContain('<p>body</p>');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test src/layouts/BaseLayout.test.ts`
Expected: FAIL — cannot find `./BaseLayout.astro`.

- [ ] **Step 3: Write `src/layouts/BaseLayout.astro`**

```astro
---
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
}
const { title, description = 'Bhavya Veer — engineering intelligent software from the ground up.' } = Astro.props;
const og = new URL('/og.png', Astro.site).toString();
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={og} />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body class="bg-cream text-ink antialiased">
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
    <script>
      const els = document.querySelectorAll('.fade-up');
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      }, { threshold: 0.15 });
      els.forEach((el) => io.observe(el));
    </script>
  </body>
</html>
```

> This imports `Nav` and `Footer`, which are created in Task 5. If executing strictly in order, create empty placeholder files (`<nav></nav>` / `<footer></footer>`) first so this compiles, then flesh them out in Task 5.

- [ ] **Step 4: Run to verify it passes**

Run: `npm test src/layouts/BaseLayout.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro src/layouts/BaseLayout.test.ts src/components/Nav.astro src/components/Footer.astro
git commit -m "feat: add BaseLayout with SEO/OG meta and scroll animation"
```

---

## Task 5: Nav + Footer (TDD)

**Files:**
- Create/replace: `src/components/Nav.astro`, `src/components/Footer.astro`
- Test: `src/components/Nav.test.ts`

- [ ] **Step 1: Write the failing test** — `src/components/Nav.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Nav from './Nav.astro';

describe('Nav', () => {
  it('links to all four pages and the wordmark', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Nav);
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/projects"');
    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('BHAVYA VEER');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test src/components/Nav.test.ts`
Expected: FAIL — assertions fail (placeholder Nav has no links).

- [ ] **Step 3: Write `src/components/Nav.astro`**

```astro
---
const links = [
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
const path = Astro.url.pathname;
---
<nav class="flex items-center justify-between border-b border-ink px-6 py-4 text-sm md:px-10">
  <a href="/" class="font-display font-bold tracking-wide">BHAVYA VEER</a>
  <div class="flex gap-5">
    {links.map((l) => (
      <a
        href={l.href}
        class:list={[
          'transition-colors hover:text-vermilion',
          path === l.href && 'text-vermilion',
        ]}
      >{l.label}</a>
    ))}
  </div>
</nav>
```

- [ ] **Step 4: Write `src/components/Footer.astro`**

```astro
---
const year = new Date().getFullYear();
---
<footer class="mt-24 border-t border-ink px-6 py-10 text-sm md:px-10">
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <span class="font-display text-lg font-bold">Let's build something.</span>
    <div class="flex gap-5">
      <a class="hover:text-vermilion" href="mailto:bhavyaveer@gmail.com">Email</a>
      <a class="hover:text-vermilion" href="https://github.com/Bhavyaveer44">GitHub</a>
      <a class="hover:text-vermilion" href="/contact">Contact</a>
    </div>
  </div>
  <p class="mt-6 text-xs text-ink/50">© {year} Bhavya Veer.</p>
</footer>
```

- [ ] **Step 5: Run to verify it passes**

Run: `npm test src/components/Nav.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Nav.astro src/components/Footer.astro src/components/Nav.test.ts
git commit -m "feat: add Nav and Footer components (TDD)"
```

---

## Task 6: Button + SectionHeading primitives

**Files:**
- Create: `src/components/Button.astro`, `src/components/SectionHeading.astro`

- [ ] **Step 1: Write `src/components/Button.astro`**

```astro
---
interface Props {
  href: string;
  variant?: 'solid' | 'outline';
}
const { href, variant = 'solid' } = Astro.props;
const base = 'inline-block px-5 py-2.5 text-sm font-bold transition-colors';
const styles =
  variant === 'solid'
    ? 'bg-ink text-cream hover:bg-vermilion'
    : 'border border-ink hover:border-vermilion hover:text-vermilion';
const external = href.startsWith('http');
---
<a
  href={href}
  class:list={[base, styles]}
  {...external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
>
  <slot />
</a>
```

- [ ] **Step 2: Write `src/components/SectionHeading.astro`**

```astro
---
interface Props {
  title: string;
  index?: string; // e.g. "01 — 03"
}
const { title, index } = Astro.props;
---
<div class="mb-6 flex items-baseline justify-between">
  <h2 class="text-2xl font-bold md:text-3xl">{title}</h2>
  {index && <span class="text-xs text-ink/50">{index}</span>}
</div>
```

- [ ] **Step 3: Verify the project still type-checks and builds**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Button.astro src/components/SectionHeading.astro
git commit -m "feat: add Button and SectionHeading primitives"
```

---

## Task 7: ProjectRowHero (numbered home rows, TDD)

**Files:**
- Create: `src/components/ProjectRowHero.astro`
- Test: `src/components/ProjectRowHero.test.ts`

- [ ] **Step 1: Write the failing test** — `src/components/ProjectRowHero.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProjectRowHero from './ProjectRowHero.astro';
import type { Project } from '../data/projects';

const sample: Project = {
  slug: 'demo', name: 'Demo Project',
  blurb: 'A short recruiter line.', problem: 'x',
  tech: ['Astro', 'Groq'], image: '/images/projects/demo.png',
  placement: 'hero',
};

describe('ProjectRowHero', () => {
  it('renders the index, name, blurb, and tech tags', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectRowHero, {
      props: { project: sample, index: 1 },
    });
    expect(html).toContain('01');
    expect(html).toContain('Demo Project');
    expect(html).toContain('A short recruiter line.');
    expect(html).toContain('Astro');
    expect(html).toContain('Groq');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test src/components/ProjectRowHero.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/ProjectRowHero.astro`**

```astro
---
import type { Project } from '../data/projects';
interface Props { project: Project; index: number; }
const { project, index } = Astro.props;
const num = String(index).padStart(2, '0');
---
<a
  href={`/projects#${project.slug}`}
  class="fade-up grid grid-cols-[2rem_1fr] items-center gap-5 border-t border-ink py-5 transition-colors hover:bg-ink/[0.03] md:grid-cols-[3rem_1fr_10rem]"
>
  <span class="font-display text-sm font-bold text-vermilion">{num}</span>
  <div>
    <h3 class="text-xl font-bold md:text-2xl">{project.name}</h3>
    <p class="mt-1 max-w-prose text-sm text-ink/70">{project.blurb}</p>
    <p class="mt-2 text-[0.65rem] uppercase tracking-widest text-ink/40">
      {project.tech.join(' · ')}
    </p>
  </div>
  <div class="hidden h-16 items-center justify-center border border-ink bg-ink/5 text-xs text-ink/40 md:flex">
    <img src={project.image} alt={`${project.name} screenshot`} class="h-full w-full object-cover" loading="lazy" />
  </div>
</a>
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test src/components/ProjectRowHero.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectRowHero.astro src/components/ProjectRowHero.test.ts
git commit -m "feat: add ProjectRowHero numbered home row (TDD)"
```

---

## Task 8: ProjectCardCompact (grid tile, TDD)

**Files:**
- Create: `src/components/ProjectCardCompact.astro`
- Test: `src/components/ProjectCardCompact.test.ts`

- [ ] **Step 1: Write the failing test** — `src/components/ProjectCardCompact.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProjectCardCompact from './ProjectCardCompact.astro';
import type { Project } from '../data/projects';

const withLinks: Project = {
  slug: 'demo', name: 'Demo', blurb: 'Line.', problem: 'x',
  tech: ['Next.js'], image: '/images/projects/demo.png',
  liveUrl: 'https://example.com', repoUrl: 'https://github.com/x/y',
  placement: 'grid',
};
const noLinks: Project = { ...withLinks, liveUrl: undefined, repoUrl: undefined };

describe('ProjectCardCompact', () => {
  it('renders name, blurb, and both links when present', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCardCompact, { props: { project: withLinks } });
    expect(html).toContain('Demo');
    expect(html).toContain('Line.');
    expect(html).toContain('https://example.com');
    expect(html).toContain('https://github.com/x/y');
  });

  it('omits link anchors when URLs are missing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCardCompact, { props: { project: noLinks } });
    expect(html).not.toContain('href="https://example.com"');
    expect(html).not.toContain('href="https://github.com/x/y"');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test src/components/ProjectCardCompact.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/ProjectCardCompact.astro`**

```astro
---
import type { Project } from '../data/projects';
interface Props { project: Project; }
const { project } = Astro.props;
---
<article class="fade-up flex flex-col border border-ink">
  <div class="aspect-video bg-ink/5">
    <img src={project.image} alt={`${project.name} screenshot`} class="h-full w-full object-cover" loading="lazy" />
  </div>
  <div class="flex flex-1 flex-col p-5">
    <h3 class="text-lg font-bold">{project.name}</h3>
    <p class="mt-1 flex-1 text-sm text-ink/70">{project.blurb}</p>
    <p class="mt-3 text-[0.65rem] uppercase tracking-widest text-ink/40">{project.tech.join(' · ')}</p>
    <div class="mt-4 flex gap-4 text-sm font-bold">
      {project.liveUrl && (
        <a class="text-vermilion hover:underline" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live →</a>
      )}
      {project.repoUrl && (
        <a class="hover:underline" href={project.repoUrl} target="_blank" rel="noopener noreferrer">Code</a>
      )}
    </div>
  </div>
</article>
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test src/components/ProjectCardCompact.test.ts`
Expected: PASS (both tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCardCompact.astro src/components/ProjectCardCompact.test.ts
git commit -m "feat: add ProjectCardCompact grid tile (TDD)"
```

---

## Task 9: ProjectCardHero (detailed /projects card, TDD)

**Files:**
- Create: `src/components/ProjectCardHero.astro`
- Test: `src/components/ProjectCardHero.test.ts`

- [ ] **Step 1: Write the failing test** — `src/components/ProjectCardHero.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProjectCardHero from './ProjectCardHero.astro';
import type { Project } from '../data/projects';

const sample: Project = {
  slug: 'demo', name: 'Demo', blurb: 'Recruiter line.',
  problem: 'The deeper problem this solves.', tech: ['Astro'],
  image: '/images/projects/demo.png', liveUrl: 'https://example.com',
  placement: 'hero',
};

describe('ProjectCardHero', () => {
  it('renders name, problem text, an id anchor, and the live button', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCardHero, { props: { project: sample } });
    expect(html).toContain('id="demo"');
    expect(html).toContain('Demo');
    expect(html).toContain('The deeper problem this solves.');
    expect(html).toContain('https://example.com');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test src/components/ProjectCardHero.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/components/ProjectCardHero.astro`**

```astro
---
import type { Project } from '../data/projects';
import Button from './Button.astro';
interface Props { project: Project; }
const { project } = Astro.props;
---
<article id={project.slug} class="fade-up grid scroll-mt-24 gap-8 border-t border-ink py-12 md:grid-cols-2">
  <div class="aspect-video border border-ink bg-ink/5">
    <img src={project.image} alt={`${project.name} screenshot`} class="h-full w-full object-cover" loading="lazy" />
  </div>
  <div class="flex flex-col">
    <h2 class="text-3xl font-bold md:text-4xl">{project.name}</h2>
    <p class="mt-2 text-lg text-ink/80">{project.blurb}</p>
    <p class="mt-4 max-w-prose text-ink/70">{project.problem}</p>
    <p class="mt-4 text-xs uppercase tracking-widest text-ink/40">{project.tech.join(' · ')}</p>
    <div class="mt-6 flex gap-3">
      {project.liveUrl && <Button href={project.liveUrl}>Live demo →</Button>}
      {project.repoUrl && <Button href={project.repoUrl} variant="outline">GitHub</Button>}
    </div>
  </div>
</article>
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test src/components/ProjectCardHero.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCardHero.astro src/components/ProjectCardHero.test.ts
git commit -m "feat: add ProjectCardHero detailed card (TDD)"
```

---

## Task 10: Home page (`/`)

**Files:**
- Create: `src/pages/index.astro`
- Test: `src/pages/index.test.ts`

- [ ] **Step 1: Write the failing test** — `src/pages/index.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Index from './index.astro';

describe('home page', () => {
  it('renders the tagline and all three hero names', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Index);
    expect(html).toContain('Engineering intelligent software from the ground up.');
    expect(html).toContain('RattafyAI');
    expect(html).toContain('Staffroom');
    expect(html).toContain('AI Job Tracker');
    expect(html).toContain('6 more shipped projects');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test src/pages/index.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeading from '../components/SectionHeading.astro';
import ProjectRowHero from '../components/ProjectRowHero.astro';
import Button from '../components/Button.astro';
import { getByPlacement } from '../data/projects';

const heroes = getByPlacement('hero');
---
<BaseLayout title="Bhavya Veer — Developer">
  <!-- HERO -->
  <section class="border-b border-ink px-6 py-16 md:px-10 md:py-24">
    <p class="mb-4 text-xs uppercase tracking-[0.2em] text-ink/50">Engineering intelligent software from the ground up.</p>
    <h1 class="text-5xl font-bold md:text-7xl">
      Built to <span class="text-vermilion">ship</span>,<br />not to sit in a repo.
    </h1>
    <div class="mt-8 flex flex-wrap gap-3">
      <Button href="/projects">See the work →</Button>
      <Button href="/resume.pdf" variant="outline">Download résumé</Button>
    </div>
  </section>

  <!-- SELECTED WORK -->
  <section class="px-6 py-14 md:px-10">
    <SectionHeading title="Selected work" index="01 — 03" />
    {heroes.map((project, i) => <ProjectRowHero project={project} index={i + 1} />)}
    <div class="border-t border-ink"></div>
  </section>

  <!-- MORE WORK BAND -->
  <a href="/projects" class="flex items-center justify-between bg-ink px-6 py-8 text-cream md:px-10">
    <span class="font-display text-2xl font-bold">+ 6 more shipped projects</span>
    <span class="text-sm font-bold text-vermilion">Browse all →</span>
  </a>
</BaseLayout>
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test src/pages/index.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/pages/index.test.ts
git commit -m "feat: add home page"
```

---

## Task 11: Projects page (`/projects`)

**Files:**
- Create: `src/pages/projects.astro`
- Test: `src/pages/projects.test.ts`

- [ ] **Step 1: Write the failing test** — `src/pages/projects.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Projects from './projects.astro';

describe('projects page', () => {
  it('renders all 3 heroes and all 6 grid projects', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Projects);
    for (const name of ['RattafyAI', 'Staffroom', 'AI Job Tracker',
      'LLM Queue', 'Memory Lane', 'Group Brain', 'ScholarSaathi', 'MockMirror', 'NotesBoard']) {
      expect(html).toContain(name);
    }
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test src/pages/projects.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/pages/projects.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeading from '../components/SectionHeading.astro';
import ProjectCardHero from '../components/ProjectCardHero.astro';
import ProjectCardCompact from '../components/ProjectCardCompact.astro';
import { getByPlacement } from '../data/projects';

const heroes = getByPlacement('hero');
const grid = getByPlacement('grid');
---
<BaseLayout title="Work — Bhavya Veer" description="Selected projects by Bhavya Veer.">
  <section class="px-6 py-14 md:px-10">
    <h1 class="text-5xl font-bold md:text-6xl">Work</h1>
    <p class="mt-3 max-w-prose text-ink/70">
      Products I designed and shipped — built with AI as the engine, driven by me. Each ships a real, working thing.
    </p>
  </section>

  <section class="px-6 md:px-10">
    {heroes.map((project) => <ProjectCardHero project={project} />)}
  </section>

  <section class="px-6 py-16 md:px-10">
    <SectionHeading title="More work" index={`01 — 0${grid.length}`} />
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {grid.map((project) => <ProjectCardCompact project={project} />)}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test src/pages/projects.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/projects.astro src/pages/projects.test.ts
git commit -m "feat: add projects page with heroes and grid"
```

---

## Task 12: About page (`/about`)

**Files:**
- Create: `src/pages/about.astro`
- Test: `src/pages/about.test.ts`

- [ ] **Step 1: Write the failing test** — `src/pages/about.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import About from './about.astro';

describe('about page', () => {
  it('renders the résumé link and the "also built" Pilot mention', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(About);
    expect(html).toContain('href="/resume.pdf"');
    expect(html).toContain('Pilot');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test src/pages/about.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/pages/about.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Button from '../components/Button.astro';
import { getByPlacement } from '../data/projects';

const alsoBuilt = getByPlacement('about');
const skills = ['Next.js', 'Astro', 'TypeScript', 'AI SDK / LLMs', 'Neon / Postgres', 'Tailwind', 'Vercel'];
---
<BaseLayout title="About — Bhavya Veer" description="About Bhavya Veer.">
  <section class="grid gap-10 px-6 py-14 md:grid-cols-[280px_1fr] md:px-10">
    <img src="/images/me.jpg" alt="Bhavya Veer" class="aspect-square w-full border border-ink object-cover" />
    <div>
      <h1 class="text-4xl font-bold md:text-5xl">Hi, I'm Bhavya.</h1>
      <p class="mt-4 max-w-prose text-lg text-ink/80">
        I'm a college student who builds real, working products — fast. I direct AI to do the heavy lifting,
        make the product and architecture decisions, and ship things people can actually use. I learn whatever
        the next project needs (this site is built in Astro, which I picked up for it).
      </p>
      <div class="mt-6 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span class="border border-ink px-3 py-1 text-xs uppercase tracking-wide">{s}</span>
        ))}
      </div>
      <p class="mt-6 text-sm text-ink/60">
        Also built: {alsoBuilt.map((p, i) => (
          <>{i > 0 && ', '}<a class="text-vermilion hover:underline" href={p.liveUrl} target="_blank" rel="noopener noreferrer">{p.name}</a></>
        ))}.
      </p>
      <div class="mt-8">
        <Button href="/resume.pdf">Download résumé</Button>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test src/pages/about.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/about.astro src/pages/about.test.ts
git commit -m "feat: add about page"
```

---

## Task 13: Contact page (`/contact`) with Web3Forms

**Files:**
- Create: `src/pages/contact.astro`
- Test: `src/pages/contact.test.ts`

Web3Forms posts to `https://api.web3forms.com/submit` with an `access_key` — no backend needed. The key is public-safe (it only routes to your inbox). Sign up at web3forms.com to get the key; store it in `PUBLIC_WEB3FORMS_KEY` in `.env` and on Vercel.

- [ ] **Step 1: Write the failing test** — `src/pages/contact.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Contact from './contact.astro';

describe('contact page', () => {
  it('renders a Web3Forms form with email + GitHub fallbacks', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Contact);
    expect(html).toContain('https://api.web3forms.com/submit');
    expect(html).toContain('name="access_key"');
    expect(html).toContain('mailto:bhavyaveer@gmail.com');
    expect(html).toContain('github.com/Bhavyaveer44');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test src/pages/contact.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/pages/contact.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY ?? 'YOUR_WEB3FORMS_KEY';
---
<BaseLayout title="Contact — Bhavya Veer" description="Get in touch with Bhavya Veer.">
  <section class="grid gap-10 px-6 py-14 md:grid-cols-2 md:px-10">
    <div>
      <h1 class="text-4xl font-bold md:text-5xl">Get in touch.</h1>
      <p class="mt-4 max-w-prose text-ink/70">Open to internships. Fastest ways to reach me:</p>
      <div class="mt-6 flex flex-col gap-3 text-lg">
        <a class="hover:text-vermilion" href="mailto:bhavyaveer@gmail.com">bhavyaveer@gmail.com</a>
        <a class="hover:text-vermilion" href="https://github.com/Bhavyaveer44" target="_blank" rel="noopener noreferrer">github.com/Bhavyaveer44</a>
        <a class="hover:text-vermilion" href="https://www.linkedin.com/in/bhavyaveer-kumar/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
    <form action="https://api.web3forms.com/submit" method="POST" class="flex flex-col gap-4">
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value="Portfolio contact form" />
      <input class="border border-ink bg-transparent px-4 py-3" type="text" name="name" placeholder="Your name" required />
      <input class="border border-ink bg-transparent px-4 py-3" type="email" name="email" placeholder="Your email" required />
      <textarea class="border border-ink bg-transparent px-4 py-3" name="message" rows="5" placeholder="Message" required></textarea>
      <button type="submit" class="bg-ink px-5 py-3 text-sm font-bold text-cream transition-colors hover:bg-vermilion">Send →</button>
    </form>
  </section>
</BaseLayout>
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test src/pages/contact.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/contact.astro src/pages/contact.test.ts
git commit -m "feat: add contact page with Web3Forms"
```

---

## Task 14: 404 page, favicon, placeholder assets

**Files:**
- Create: `src/pages/404.astro`, `public/favicon.svg`, placeholder images under `public/images/`

- [ ] **Step 1: Write `src/pages/404.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Button from '../components/Button.astro';
---
<BaseLayout title="404 — Bhavya Veer">
  <section class="px-6 py-32 text-center md:px-10">
    <h1 class="text-7xl font-bold text-vermilion">404</h1>
    <p class="mt-4 text-ink/70">That page doesn't exist.</p>
    <div class="mt-8"><Button href="/">Back home</Button></div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Add `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#111111"/>
  <text x="16" y="22" font-family="sans-serif" font-size="18" font-weight="700" fill="#ff3b00" text-anchor="middle">B</text>
</svg>
```

- [ ] **Step 3: Add placeholder assets so images resolve**

Create a 1600×900 neutral placeholder PNG at each `image` path referenced in `projects.ts`
(`public/images/projects/rattafy.png`, `staffroom.png`, `job-tracker.png`, `llm-queue.png`,
`memory-lane.png`, `group-brain.png`, `scholar-saathi.png`, `mock-mirror.png`, `notesboard.png`),
plus `public/images/me.jpg` and a placeholder `public/resume.pdf` and `public/og.png`.
These get replaced with real screenshots from the spec's "Assets To Provide" list.

Run: `npm run build`
Expected: build succeeds with no missing-asset warnings.

- [ ] **Step 4: Commit**

```bash
git add src/pages/404.astro public/
git commit -m "feat: add 404 page, favicon, and placeholder assets"
```

---

## Task 15: Full verification + Vercel deploy

**Files:**
- Create: `vercel.json` (optional), `.env.example`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all tests across data, components, layout, and pages PASS.

- [ ] **Step 2: Type-check and build**

Run: `npm run check && npm run build`
Expected: 0 type errors; static site emitted to `dist/`.

- [ ] **Step 3: Manual smoke test**

Run: `npm run preview` and open the printed URL. Verify in the browser:
- Home: tagline, hero headline, 3 numbered rows, dark "+6" band, nav highlights, fade-up animation on scroll.
- `/projects`: 3 detailed heroes + 6-tile grid, live/code buttons open in new tabs.
- `/about`: photo, bio, skills, "also built: Pilot", résumé button.
- `/contact`: form fields + email/GitHub/LinkedIn links.
- Resize to mobile width — layout stays readable, grid collapses to one column.

- [ ] **Step 4: Add `.env.example` and local `.env`**

`.env.example` (committed):
```
PUBLIC_WEB3FORMS_KEY=your-web3forms-access-key
```

Create `.env` (gitignored) with the real key so the local build/preview wires up the form:
```
PUBLIC_WEB3FORMS_KEY=5e3e1991-433f-4bf7-94a4-a93d533dc6c9
```
(Web3Forms access keys are public-safe — they only route to the owner's inbox.)

- [ ] **Step 5: Deploy to Vercel**

```bash
npx vercel        # link/create project, preview deploy
npx vercel --prod # production deploy
```
Set `PUBLIC_WEB3FORMS_KEY=5e3e1991-433f-4bf7-94a4-a93d533dc6c9` in the Vercel project's Environment Variables. Astro is auto-detected — no adapter needed for a static build. Update `site` in `astro.config.mjs` to the real deploy URL once known, then redeploy. (Real `resume.pdf` and project screenshots get dropped into `public/` whenever they're ready — placeholders ship fine until then.)

- [ ] **Step 6: Commit**

```bash
git add vercel.json .env.example
git commit -m "chore: add deploy config and env example"
```

---

## Self-Review

**Spec coverage:**
- Goal / dual-audience (blurb + tech tags) — Tasks 3, 7, 8, 9 ✓
- Tagline — Task 10 ✓
- Astro + Tailwind v4, Vercel free — Tasks 1, 2, 15 ✓
- Editorial Bold visual system (cream/ink/vermilion, rules, numbered rows, subtle motion) — Tasks 2, 4, 7, 10 ✓
- Multi-page (/ /projects /about /contact) — Tasks 10–13 ✓
- 3 heroes + 6 grid, Pilot on About — Tasks 3, 11, 12 ✓
- projects.ts single source — Task 3 ✓
- Contact (Web3Forms + direct links) — Task 13 ✓
- Quality: responsive, a11y (alt text, semantic, keyboard via real anchors), SEO/OG — Tasks 4, 14, 15 ✓
- Fonts (Space Grotesk + Inter) — Tasks 2, 4 ✓

**Placeholder scan:** The `undefined` URLs and placeholder images in Task 3/14 are intentional content slots (the spec's "Assets To Provide"), clearly marked, not plan gaps. No "TBD/implement later" steps; all code steps include complete code.

**Type consistency:** `Project` / `Placement` / `getByPlacement` are defined in Task 3 and used identically in Tasks 7–13. `placement: 'hero' | 'grid' | 'about'` is consistent everywhere. `Button` props (`href`, `variant`) match between Task 6 and its consumers.
