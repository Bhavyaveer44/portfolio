import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// NOTE: update `site` to the real deploy URL once the Vercel project exists.
export default defineConfig({
  site: 'https://bhavyaveer.vercel.app',
  vite: {
    plugins: [tailwindcss()],
  },
});
