import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import BaseLayout from './BaseLayout.astro';

describe('BaseLayout', () => {
  it('renders title, meta description, and OG tags', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(BaseLayout, {
      props: { title: 'Test Title', description: 'Test desc' },
      slots: { default: '<p>body</p>' },
    });
    expect(html).toContain('<title>Test Title</title>');
    expect(html).toContain('name="description" content="Test desc"');
    expect(html).toContain('property="og:title" content="Test Title"');
    expect(html).toContain('<p>body</p>');
  });
});
