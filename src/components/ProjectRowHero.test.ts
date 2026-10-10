import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProjectRowHero from './ProjectRowHero.astro';
import type { Project } from '../data/projects';

const sample: Project = {
  slug: 'demo', name: 'Demo Project',
  description: 'The project description.',
  tech: ['Astro', 'Groq'], image: '/images/projects/demo.png',
  placement: 'hero',
};

describe('ProjectRowHero', () => {
  it('renders the index, name, description, and tech tags', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectRowHero, {
      props: { project: sample, index: 1 },
    });
    expect(html).toContain('01');
    expect(html).toContain('Demo Project');
    expect(html).toContain('The project description.');
    expect(html).toContain('Astro');
    expect(html).toContain('Groq');
  });

  it('renders a Hairline animation when the project has a figure', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectRowHero, {
      props: { project: { ...sample, figure: 'riffle' }, index: 1 },
    });
    expect(html).toContain('class="hairline-fig w-full"');
    expect(html).toContain('data-kind="riffle"');
    expect(html).not.toContain('demo.png');
  });
});
