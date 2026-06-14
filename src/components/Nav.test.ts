import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Nav from './Nav.astro';

describe('Nav', () => {
  it('links to all four pages and the wordmark', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Nav);
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/projects"');
    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('BHAVYA VEER');
  });
});
