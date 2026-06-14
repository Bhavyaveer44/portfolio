export type Placement = 'hero' | 'grid' | 'about';

export interface Project {
  slug: string;
  name: string;
  blurb: string; // plain-English one-liner (recruiter)
  problem: string; // what it solves / your role (engineer)
  tech: string[]; // stack tags
  liveUrl?: string;
  repoUrl?: string;
  image: string; // path under /public
  placement: Placement;
}

export const projects: Project[] = [
  {
    slug: 'rattafy-ai',
    name: 'RattafyAI',
    blurb: 'AI cram planner — turns a syllabus + deadline into a day-by-day study plan.',
    problem:
      'Students cramming for exams have no structure. I designed a planner that takes a syllabus and a date and produces an ordered, realistic study schedule.',
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
    problem:
      'A multi-agent system where each agent owns a role and they coordinate to manage a classroom workflow.',
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
    problem:
      'I needed to manage my own internship search, so I built a tracker that uses AI to organize applications and status.',
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
    problem:
      'Free LLM API tiers run out. This routes each task to an available provider, tracks quota, and falls back automatically.',
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
    problem:
      'Turns daily walks/journals into collectible AI-generated objects laid along a visual path.',
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
    problem:
      'Reads a Telegram class group, answers questions from context (RAG), extracts deadlines, and posts digests.',
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
    problem:
      'Helps students discover relevant National Scholarship Portal options without manual searching.',
    tech: ['Next.js 16', 'Clerk', 'Neon', 'Groq'],
    liveUrl: 'https://scholar-saathi.vercel.app',
    repoUrl: 'https://github.com/Bhavyaveer44/scholar-saathi',
    image: '/images/projects/scholar-saathi.png',
    placement: 'grid',
  },
  {
    slug: 'mock-mirror',
    name: 'MockMirror',
    blurb:
      'An interview coach that analyzes body language in the browser — video never leaves your device.',
    problem:
      'On-device MediaPipe analyzes posture/expressions locally (privacy), while Groq Whisper + LLM handle speech feedback.',
    tech: ['Next.js 16', 'MediaPipe', 'Groq Whisper'],
    liveUrl: undefined, // not deployed — link a demo video or deploy
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
    problem:
      'A Playwright worker takes natural-language goals and operates a live browser, streamed to a Next.js UI over WebSocket.',
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
