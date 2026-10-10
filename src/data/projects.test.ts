import { describe, it, expect } from 'vitest';
import { projects, getByPlacement } from './projects';

describe('projects data', () => {
  it('every project has the required fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(Array.isArray(p.tech)).toBe(true);
      expect(['hero', 'grid', 'about']).toContain(p.placement);
    }
  });

  it('every project with a live demo has a screenshot path', () => {
    for (const project of projects.filter((item) => item.liveUrl)) {
      expect(project.image, project.slug).toBeTruthy();
    }
  });

  it('has exactly 6 home projects in the requested order', () => {
    const heroes = getByPlacement('hero');
    expect(heroes.map((p) => p.slug)).toEqual([
      'finscope',
      'kvd',
      'collby',
      'mockmirror',
      'zenith',
      'hybrag',
    ]);
    expect(heroes.every((project) => project.figure)).toBe(true);
  });

  it('has exactly 8 more-work projects in the requested order', () => {
    const grid = getByPlacement('grid');
    expect(grid.map((p) => p.slug)).toEqual([
      'mcp-system-automation-agent',
      'vit-pyq-insight',
      'etch',
      'ai-job-tracker',
      'northstar',
      'polymath',
      'staffroom',
      'rattafy',
    ]);
  });

  it('has all 14 requested projects', () => {
    expect(projects).toHaveLength(14);
  });

  it('slugs are unique', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
