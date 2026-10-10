export interface LoopStep {
  name: string;
  caption: string;
}

// Clockwise from the top.
export const loopSteps: LoopStep[] = [
  {
    name: 'Perceive',
    caption:
      'Take in messy input: PDFs, scanned pages, chat history, live browser state.',
  },
  {
    name: 'Plan',
    caption:
      'Break a goal into ordered steps. I split work across role-based agents, so each one owns a single job.',
  },
  {
    name: 'Act',
    caption:
      'Call real tools: APIs, databases, a live browser. Retries, provider fallback and rate limits keep it running when a model or quota fails.',
  },
  {
    name: 'Observe',
    caption:
      'Check what came back, cache what is reusable, score it with evals, then feed the result into the next loop.',
  },
];
