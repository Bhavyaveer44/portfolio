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
