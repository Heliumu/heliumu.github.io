// javascript
import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';

const LANGS = ['en','zh_cn','zh','ja','ko','de','fr'];
const ROUTES = [
  '', // 根
  'api_explorer',
  'api_explorer/quickstart',
  'api_explorer/future/ohlc_latest',
  'api_explorer/stock/ohlc_latest'
];

const BASE_URL = 'http://localhost:3000';
const DIST_DIR = path.resolve(process.cwd(), 'dist');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);

  for (const lang of LANGS) {
    for (const route of ROUTES) {
      const routePath = route === '' ? '' : `/${route}`;
      const url = `${BASE_URL}/${lang}${routePath}`;
      console.log('Rendering', url);
      try {
        await page.goto(url, { waitUntil: 'networkidle0' });
        const html = await page.content();
        const outDir = path.join(DIST_DIR, lang, route);
        await fs.mkdir(outDir, { recursive: true });
        const outFile = path.join(outDir, 'index.html');
        await fs.writeFile(outFile, html, 'utf8');
        console.log('Saved', outFile);
      } catch (err) {
        console.error('Failed to render', url, err.message);
      }
    }
  }

  await browser.close();
  console.log('Prerender complete.');
})();
