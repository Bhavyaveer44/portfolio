import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProjectRowHero from './ProjectRowHero.astro';
import type { Project } from '../data/projects';

const sample: Project = {
  slug: 'demo', name: 'Demo Project',
  blurb: 'A short recruiter line.', problem: 'x',
  tech: ['Astro', 'Groq'], image: '/images/projects/demo.png',
  placement: 'hero',
};

describe('ProjectRowHero', () => {
  it('renders the index, name, blurb, and tech tags', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectRowHero, {
      props: { project: sample, index: 1 },
    });
    expect(html).toContain('01');
    expect(html).toContain('Demo Project');
    expect(html).toContain('A short recruiter line.');
    expect(html).toContain('Astro');
    expect(html).toContain('Groq');
  });
});
