import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProjectCardHero from './ProjectCardHero.astro';
import type { Project } from '../data/projects';

const sample: Project = {
  slug: 'demo', name: 'Demo', blurb: 'Recruiter line.',
  problem: 'The deeper problem this solves.', tech: ['Astro'],
  image: '/images/projects/demo.png', liveUrl: 'https://example.com',
  placement: 'hero',
};

describe('ProjectCardHero', () => {
  it('renders name, problem text, an id anchor, and the live button', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCardHero, { props: { project: sample } });
    expect(html).toContain('id="demo"');
    expect(html).toContain('Demo');
    expect(html).toContain('The deeper problem this solves.');
    expect(html).toContain('https://example.com');
  });
});
