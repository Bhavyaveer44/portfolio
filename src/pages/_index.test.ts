import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Index from './index.astro';

describe('home page', () => {
  it('renders the tagline and all six home projects', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Index);
    expect(html).toContain('Engineering systems that think.');
    for (const name of ['FinScope', 'kvd', 'Collby', 'MockMirror', 'Zenith', 'Hybrag']) {
      expect(html).toContain(name);
    }
    expect(html).toContain('8 more shipped projects');
    expect(html).not.toContain('href="/resume.pdf"');
  });
});
