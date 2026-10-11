import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import OutsideCode from './OutsideCode.astro';
import { interests } from '../data/interests';

describe('OutsideCode', () => {
  it('renders a chip per interest and the pop button', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(OutsideCode);
    for (const it of interests) expect(html).toContain(it.name);
    expect((html.match(/data-chip=/g) ?? []).length).toBe(interests.length);
    expect(html).toContain('data-pop');
    expect(html).toContain('<canvas');
  });
});
