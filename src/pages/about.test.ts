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
