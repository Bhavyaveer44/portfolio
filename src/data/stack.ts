export interface StackLayer {
  name: string;
  items: string[];
}

// Top of the stack -> bottom. Edit freely; the diagram redraws from this.
export const stack: StackLayer[] = [
  { name: 'Frontend', items: ['Next.js', 'React', 'Astro', 'Tailwind', 'Tauri', 'TypeScript / JavaScript'] },
  { name: 'API', items: ['FastAPI', 'Node / Express', 'REST', 'SSE / WebSocket', 'JWT', 'Clerk'] },
  {
    name: 'Agents / LLMs',
    items: ['Groq', 'OpenRouter', 'Gemini', 'Ollama', 'LangChain', 'LangGraph', 'AI SDK', 'MCP', 'CrewAI', 'LlamaIndex', 'Playwright', 'RAG', 'Multi-agent systems'],
  },
  { name: 'Data', items: ['Postgres', 'Supabase', 'Neon', 'pgvector', 'SQLite', 'Redis'] },
  {
    name: 'Infra',
    items: ['Vercel', 'Render', 'Docker', 'Linux', 'Git / GitHub', 'CI', 'Go concurrency', 'WAL', 'Sharding', 'CRDTs', 'Sandboxing', 'Circuit breakers'],
  },
  {
    name: 'Evals & ML',
    items: ['RAGAS', 'MLflow', 'SHAP', 'Vitest', 'PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'Hugging Face', 'OpenCV', 'MediaPipe'],
  },
];

export const languages = ['Java', 'Python', 'TypeScript / JavaScript', 'Go', 'Rust', 'SQL', 'C / C++'];
