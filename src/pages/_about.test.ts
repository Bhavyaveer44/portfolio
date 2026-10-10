import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import About from './about.astro';

describe('about page', () => {
  it('renders the interactive stack and LeetCode profile without a separate tools section or résumé link', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(About);
    expect(html).toContain("Hi, I'm Bhavyaveer.");
    expect(html).toContain('Frontend');
    expect(html).toContain('Agents / LLMs');
    expect(html).toContain('Evals');
    expect(html).toContain('Go concurrency');
    expect(html).toContain('PyTorch');
    expect(html).toContain('href="https://leetcode.com/u/ouVzXXzr/"');
    expect(html).toContain('Languages:');
    expect(html).not.toContain('Tools I work with');
    expect(html).not.toContain('href="/resume.pdf"');
  });
});
