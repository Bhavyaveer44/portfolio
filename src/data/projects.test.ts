import { describe, it, expect } from 'vitest';
import { projects, getByPlacement, type Project } from './projects';

describe('projects data', () => {
  it('every project has the required fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.blurb).toBeTruthy();
      expect(Array.isArray(p.tech)).toBe(true);
      expect(['hero', 'grid', 'about']).toContain(p.placement);
    }
  });

  it('has exactly 3 heroes in spec order', () => {
    const heroes = getByPlacement('hero');
    expect(heroes.map((p) => p.slug)).toEqual([
      'rattafy-ai',
      'staffroom',
      'ai-job-tracker',
    ]);
  });

  it('has exactly 6 grid projects', () => {
    expect(getByPlacement('grid')).toHaveLength(6);
  });

  it('slugs are unique', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
