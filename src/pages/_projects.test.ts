import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Projects from './projects.astro';

describe('projects page', () => {
  it('renders all six home projects and all eight more-work projects', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Projects);
    for (const name of [
      'FinScope', 'kvd', 'Collby', 'MockMirror', 'Zenith', 'Hybrag',
      'MCP System Automation Agent', 'VIT PYQ Insight', 'Etch',
      'AI-Powered Job Tracker', 'NorthStar', 'Polymath', 'Staffroom', 'Rattafy',
    ]) {
      expect(html).toContain(name);
    }
  });
});
