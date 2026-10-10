import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import StackLayers from './StackLayers.astro';
import { stack } from '../data/stack';

describe('StackLayers', () => {
  it('renders every layer as a plate and a panel with its tools', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(StackLayers);
    const esc = (t: string) => t.replace(/&/g, '&amp;');
    for (const layer of stack) {
      expect(html).toContain(esc(layer.name));
      for (const item of layer.items) expect(html).toContain(esc(item));
    }
    expect((html.match(/data-layer=/g) ?? []).length).toBe(stack.length);
    expect((html.match(/data-panel=/g) ?? []).length).toBe(stack.length);
  });

  it('marks the default layer active', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(StackLayers, { props: { defaultIndex: 0 } });
    expect(html).toMatch(/aria-pressed="true"[^>]*aria-label="Frontend layer/);
  });
});
