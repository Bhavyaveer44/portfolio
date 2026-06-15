import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// `site` is the live Vercel production URL; drives absolute OG image / canonical URLs.
export default defineConfig({
  site: 'https://portfolio-rho-liart-78.vercel.app',
  vite: {
    plugins: [tailwindcss()],
  },
});
