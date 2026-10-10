import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { basename } from 'node:path';
import { projects } from '../src/data/projects';

const out = 'public/images/projects';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
let failures = 0;

try {
  for (const p of projects) {
    if (!p.liveUrl) {
      console.log('skip', p.slug, '(no live URL)');
      continue;
    }
    try {
      await page.goto(p.liveUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
      await page.waitForTimeout(1500);
      const filename = p.image ? basename(p.image) : `${p.slug}.png`;
      const path = `${out}/${filename}`;
      await page.screenshot({ path });
      console.log('ok  ', p.slug, '->', path);
    } catch (error) {
      failures += 1;
      console.error('FAIL', p.slug, error);
    }
  }
} finally {
  await browser.close();
}

if (failures > 0) {
  process.exitCode = 1;
}