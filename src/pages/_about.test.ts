import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import About from './about.astro';

describe('about page', () => {
  it('renders the about content without a résumé link', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(About);
    expect(html).toContain("Hi, I'm Bhavyaveer.");
    expect(html).not.toContain('href="/resume.pdf"');
  });
});
