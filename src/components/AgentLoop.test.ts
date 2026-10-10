import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import AgentLoop from './AgentLoop.astro';
import { loopSteps } from '../data/loop';

describe('AgentLoop', () => {
  it('renders every step as a node and a caption', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AgentLoop);
    for (const s of loopSteps) {
      expect(html).toContain(s.name);
      expect(html).toContain(s.caption);
    }
    expect((html.match(/data-node=/g) ?? []).length).toBe(loopSteps.length);
    expect((html.match(/data-step=/g) ?? []).length).toBe(loopSteps.length);
  });

  it('marks the default step active', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AgentLoop, { props: { defaultIndex: 0 } });
    expect(html).toMatch(/aria-pressed="true"[^>]*aria-label="Perceive/);
  });
});
