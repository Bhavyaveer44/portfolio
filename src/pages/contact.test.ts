import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Contact from './contact.astro';

describe('contact page', () => {
  it('renders a Web3Forms form with email + GitHub fallbacks', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Contact);
    expect(html).toContain('https://api.web3forms.com/submit');
    expect(html).toContain('name="access_key"');
    expect(html).toContain('mailto:bhavyaveer@gmail.com');
    expect(html).toContain('github.com/Bhavyaveer44');
  });
});
