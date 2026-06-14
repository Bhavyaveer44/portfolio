import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProjectCardCompact from './ProjectCardCompact.astro';
import type { Project } from '../data/projects';

const withLinks: Project = {
  slug: 'demo', name: 'Demo', blurb: 'Line.', problem: 'x',
  tech: ['Next.js'], image: '/images/projects/demo.png',
  liveUrl: 'https://example.com', repoUrl: 'https://github.com/x/y',
  placement: 'grid',
};
const noLinks: Project = { ...withLinks, liveUrl: undefined, repoUrl: undefined };

describe('ProjectCardCompact', () => {
  it('renders name, blurb, and both links when present', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCardCompact, { props: { project: withLinks } });
    expect(html).toContain('Demo');
    expect(html).toContain('Line.');
    expect(html).toContain('https://example.com');
    expect(html).toContain('https://github.com/x/y');
  });

  it('omits link anchors when URLs are missing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProjectCardCompact, { props: { project: noLinks } });
    expect(html).not.toContain('href="https://example.com"');
    expect(html).not.toContain('href="https://github.com/x/y"');
  });
});
