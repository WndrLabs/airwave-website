#!/usr/bin/env node
// Tells the search engines that take IndexNow (Bing, and through it DuckDuckGo, Ecosia, Yahoo;
// Yandex, Naver, Seznam) which pages to crawl again: every page of dist/sitemap.xml, after a deploy
// (.github/workflows/deploy.yml, on a push or by hand, not on the daily rebuild). The key is public
// by design: the engines check it at its address on the site (static/<key>.txt). Never fails the
// deploy: a refusal is only reported.
//   node scripts/indexnow.mjs
import { readFileSync } from 'node:fs';

const KEY = '8376e5e1cd21c72d73bab68985e2ed72';
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) {
  console.warn('IndexNow: no address in dist/sitemap.xml');
  process.exit(0);
}
const { host, origin } = new URL(urlList[0]);
try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList }),
  });
  // 200 or 202: received. 403: the key file isn't online yet. 422: an address isn't the host's. 429: too often.
  console.log(`IndexNow: ${urlList.length} pages sent, HTTP ${res.status}`);
} catch (error) {
  console.warn(`IndexNow: not sent (${error.message})`);
}
