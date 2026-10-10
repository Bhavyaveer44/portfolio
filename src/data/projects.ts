export type Placement = 'hero' | 'grid' | 'about';

export interface Project {
  slug: string;
  name: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  placement: Placement;
  figure?: 'riffle' | 'terrain' | 'exploded' | 'phosphor' | 'slow' | 'turntable' | 'terminal' | 'sieve';
}

export const projects: Project[] = [
  {
    slug: 'finscope',
    name: 'FinScope',
    description:
      'An autonomous equity research agent that plans multi-step financial research tasks, retrieves and synthesizes market data, and generates structured investment reports through advanced LLM-driven agentic workflows.',
    tech: ['Python', 'Groq (Llama 3.3 70B)', 'FastAPI', 'Supabase', 'Next.js'],
    liveUrl: 'https://fin-scope-seven.vercel.app/',
    repoUrl: 'https://github.com/Bhavyaveer44/FinScope',
    image: '/images/projects/finscope.png',
    placement: 'hero',
    figure: 'riffle',
  },
  {
    slug: 'kvd',
    name: 'kvd',
    description:
      'A Redis-protocol-compatible (RESP v2) key-value store built entirely from scratch in Go using the standard library, featuring a 256-shard FNV-1a partitioned store for lock contention elimination and a write-ahead log for zero-data-loss durability.',
    tech: ['Go', 'RESP Protocol', 'WAL', 'Concurrent Systems', 'TCP Networking'],
    repoUrl: 'https://github.com/Bhavyaveer44/kvd',
    placement: 'hero',
    figure: 'exploded',
  },
  {
    slug: 'collby',
    name: 'Collby',
    description:
      'An offline-first collaborative rich-text editor implementing a Replicated Growable Array (RGA) CRDT and Peritext model from scratch in TypeScript, ensuring Strong Eventual Consistency across concurrent clients without a central server.',
    tech: ['TypeScript', 'React', 'WebSockets', 'PostgreSQL', 'CRDT'],
    liveUrl: 'https://collby-alpha.vercel.app/',
    repoUrl: 'https://github.com/Bhavyaveer44/collby',
    image: '/images/projects/collby.png',
    placement: 'hero',
    figure: 'terminal',
  },
  {
    slug: 'mockmirror',
    name: 'MockMirror',
    description:
      'A privacy-first AI video and speech coaching tool that combines client-side MediaPipe computer vision for real-time posture and eye-contact tracking with Groq Whisper and LLM inference for instant transcription and feedback, ensuring raw video never leaves the device.',
    tech: [
      'Next.js 16 (App Router)',
      'Tailwind v4',
      'Clerk v7',
      'Neon Postgres',
      'Drizzle ORM',
      'Groq',
      'MediaPipe Tasks Vision',
      'Recharts',
    ],
    liveUrl: 'https://mockmirror-five.vercel.app/',
    repoUrl: 'https://github.com/Bhavyaveer44/mockmirror',
    image: '/images/projects/mock-mirror.png',
    placement: 'hero',
    figure: 'phosphor',
  },
  {
    slug: 'zenith',
    name: 'Zenith',
    description:
      'A structured self-reflection tool featuring an advanced six-agent pipeline with an adversarial Verifier enforcing strict evidentiary bars, typed state-machine protocols, and a deterministic safety sentinel for risk screening.',
    tech: ['Next.js', 'TypeScript', 'LLM Agents', 'pgvector', 'Adversarial Verification'],
    liveUrl: 'https://zenith-red-one.vercel.app/',
    repoUrl: 'https://github.com/Bhavyaveer44/zenith',
    image: '/images/projects/zenith.png',
    placement: 'hero',
    figure: 'turntable',
  },
  {
    slug: 'hybrag',
    name: 'Hybrag',
    description:
      'A robust hybrid retrieval RAG pipeline fusing BM25 and FAISS vector retrieval via Reciprocal Rank Fusion, evaluated rigorously using RAGAS with trap questions, query classification, and a cross-encoder reranker.',
    tech: ['Python', 'FAISS', 'BM25', 'Cross-Encoder', 'RAGAS', 'Groq'],
    repoUrl: 'https://github.com/Bhavyaveer44/hybrag',
    placement: 'hero',
    figure: 'sieve',
  },
  {
    slug: 'mcp-system-automation-agent',
    name: 'MCP System Automation Agent',
    description:
      'A local agent that translates natural-language commands into file and shell operations using Model Context Protocol (MCP) and Ollama, securely confined to a jailed workspace with shell allowlists and local user confirmation.',
    tech: ['Python', 'MCP SDK (FastMCP)', 'Ollama (mistral)', 'PyYAML'],
    repoUrl: 'https://github.com/Bhavyaveer44/MCP-SystemAgent',
    placement: 'grid',
  },
  {
    slug: 'vit-pyq-insight',
    name: 'VIT PYQ Insight',
    description:
      'An end-to-end agentic AI RAG workflow using LangChain and LangGraph state machines to scrape, parse, and semantically retrieve academic exam documents, drastically reducing student study-guide generation time.',
    tech: ['Python', 'LangChain', 'LangGraph', 'Ollama', 'ChromaDB', 'RAG', 'NLP', 'Playwright'],
    repoUrl: 'https://github.com/Bhavyaveer44/vit-pyq-insight',
    placement: 'grid',
  },
  {
    slug: 'etch',
    name: 'Etch',
    description:
      'A system-wide background desktop utility and personalized vocabulary vault that captures highlighted text via global hotkeys, generates AI-powered mnemonic word cards, and reinforces long-term retention using a spaced repetition system.',
    tech: ['Tauri', 'Rust', 'React', 'TypeScript', 'Groq API'],
    repoUrl: 'https://github.com/Bhavyaveer44/etch',
    placement: 'grid',
  },
  {
    slug: 'ai-job-tracker',
    name: 'AI-Powered Job Tracker',
    description:
      'A full-stack Kanban-style job application tracker featuring an agentic resume-rewrite loop powered by Groq to tailor resume content per listing alongside comprehensive funnel analytics.',
    tech: ['Python', 'Groq', 'Supabase', 'React', 'Node.js'],
    liveUrl: 'https://ai-job-tracker-dun.vercel.app/',
    repoUrl: 'https://github.com/Bhavyaveer44/ai-job-tracker',
    image: '/images/projects/job-tracker.png',
    placement: 'grid',
  },
  {
    slug: 'northstar',
    name: 'NorthStar',
    description:
      'A proactive goal-keeper system that distills goal rationales into reusable reminders, exposes one next action at a time to reduce friction, and runs automated cron resurfacers for untouched goals.',
    tech: ['Next.js', 'LLM Agents', 'Cron', 'Vercel'],
    liveUrl: 'https://northstar-six-theta.vercel.app/',
    repoUrl: 'https://github.com/Bhavyaveer44/northstar',
    image: '/images/projects/northstar.png',
    placement: 'grid',
  },
  {
    slug: 'polymath',
    name: 'Polymath',
    description:
      'A personal knowledge graph and capture-to-recall pipeline that distills freeform notes into structured knowledge cards, embeds them into pgvector, and powers cross-domain semantic connections and spaced repetition.',
    tech: ['Next.js', 'pgvector', 'RAG', 'LLM Agents'],
    liveUrl: 'https://polymath-red.vercel.app/',
    repoUrl: 'https://github.com/Bhavyaveer44/polymath',
    image: '/images/projects/polymath.png',
    placement: 'grid',
  },
  {
    slug: 'staffroom',
    name: 'Staffroom',
    description:
      'A multi-agent simulation modeling classroom dynamics through independent LLM-driven agents to explore emergent interaction patterns between simulated participants.',
    tech: ['Python', 'LLM Agents'],
    liveUrl: 'https://staffroom-ten.vercel.app/',
    repoUrl: 'https://github.com/Bhavyaveer44/staffroom',
    image: '/images/projects/staffroom.png',
    placement: 'grid',
  },
  {
    slug: 'rattafy',
    name: 'Rattafy',
    description:
      'A fast, opinionated exam-prep assistant that turns a syllabus, study hours, and past-question papers into a ruthless study plan with predictive question breakdowns and model answers for last-minute preparation.',
    tech: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'PDF.js',
      'Upstash Redis',
      'Multi-API rotation (Groq, Hugging Face, Fireworks.ai)',
    ],
    liveUrl: 'https://rattafy.vercel.app/',
    repoUrl: 'https://github.com/Bhavyaveer44/rattafy',
    image: '/images/projects/rattafy.png',
    placement: 'grid',
  },
];

export function getByPlacement(placement: Placement): Project[] {
  return projects.filter((project) => project.placement === placement);
}
