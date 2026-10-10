import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProjectCardHero from './ProjectCardHero.astro';
import type { Project } from '../data/projects';

const sample: Project = {
  slug: 'demo', name: 'Demo', description: 'The project description.',
  tech: ['Astro'], liveUrl: 'https://example.com',
  placement: 'hero',
};

describe('ProjectCardHero', () => {
  it('renders name, description, an id anchor, and the live button', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCardHero, { props: { project: sample } });
    expect(html).toContain('id="demo"');
    expect(html).toContain('Demo');
    expect(html).toContain('The project description.');
    expect(html).toContain('https://example.com');
  });
});
