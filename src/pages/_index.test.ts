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
