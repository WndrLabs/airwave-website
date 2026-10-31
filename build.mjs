#!/usr/bin/env node
// Builds the site into dist/: the landing page in each language, a page for each of the most
// popular stations (the others are made in the browser, see src/dynamic.mjs), a page per country,
// the sitemap, and the universal links file. Stations come from the weekly list the app uses.
//
//   node build.mjs                      fetches stations.json from the CDN
//   STATIONS_FILE=… node build.mjs      or reads a local copy
//   SITE_URL=https://… APPLE_TEAM_ID=… node build.mjs
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { STATIC_PAGES, prepare, relatedOf } from './src/catalog.mjs';
import { LANGS, T } from './src/i18n.mjs';
import { countryPath, landingPath, stationPath } from './src/html.mjs';
import { countryPage, landingPage, notFoundPage, stationPage } from './src/pages.mjs';
import { SITE, configureSite } from './src/site.mjs';

const OUT = 'dist';

// Changes with any stylesheet or script (the browser's copy of src/ included).
const version = createHash('sha1')
  .update(
    ['static/css', 'static/js', 'src']
      .flatMap((dir) => readdirSync(dir).map((f) => readFileSync(join(dir, f))))
      .join(''),
  )
  .digest('hex')
  .slice(0, 10);
configureSite({
  siteUrl: process.env.SITE_URL || 'https://skywave-radio.app',
  version,
  teamId: process.env.APPLE_TEAM_ID,
});

async function loadStations() {
  if (process.env.STATIONS_FILE) return JSON.parse(readFileSync(process.env.STATIONS_FILE, 'utf8'));
  const res = await fetch(SITE.stationsUrl);
  if (!res.ok) throw new Error(`stations.json: HTTP ${res.status}`);
  return res.json();
}

function write(path, content) {
  const file = join(OUT, path.endsWith('/') ? `${path}index.html` : path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

const { stations, byCountry, clashes } = prepare(await loadStations());
if (clashes) console.warn(`${clashes} station(s) left out: same name and id start as another`);
const genreOrder = Object.keys(T.en.genres);

rmSync(OUT, { recursive: true, force: true });
cpSync('static', OUT, { recursive: true });
// The templates, for the pages made in the browser.
cpSync('src', join(OUT, 'js/lib'), { recursive: true });

// Landing: two belts of logos, the most popular stations taken in turn from each country.
const withLogo = [...byCountry.values()].map((list) => list.filter((s) => s.logo));
const marquee = [];
for (let i = 0; marquee.length < 40 && withLogo.some((l) => l[i]); i++) {
  for (const list of withLogo) if (list[i] && marquee.length < 40) marquee.push(list[i]);
}
for (const lang of LANGS) {
  write(landingPath(lang), landingPage(lang, { marquee, byCountry, total: stations.length }));
}

const withPage = stations.slice(0, STATIC_PAGES);
for (const s of withPage) {
  write(stationPath(s.slug), stationPage(s, { related: relatedOf(s, byCountry), byCountry }));
}

for (const [code, list] of byCountry) {
  write(countryPath(code), countryPage(code, list, { genreOrder }));
}

write('404.html', notFoundPage());

// Universal links: /radio/… opens the app when it's installed (needs the site at a domain's root).
write(
  '.well-known/apple-app-site-association',
  JSON.stringify(
    {
      applinks: {
        details: [
          {
            appIDs: [`${SITE.teamId}.${SITE.bundleId}`],
            components: [{ '/': '/radio/*', comment: 'A station: opens and plays it in Skywave' }],
          },
        ],
      },
    },
    null,
    2,
  ),
);
// GitHub Pages: serve .well-known as is, and the custom domain when there is one.
write('.nojekyll', '');
if (SITE.base === '' && !/\.github\.io$|localhost|127\.0\.0\.1/.test(new URL(SITE.origin).hostname)) write('CNAME', `${new URL(SITE.origin).host}\n`);

const urls = [
  ...LANGS.map(landingPath),
  ...[...byCountry.keys()].map(countryPath),
  ...withPage.map((s) => stationPath(s.slug)),
];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${SITE.abs(u)}</loc></url>`).join('\n')}
</urlset>
`,
);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE.abs('/sitemap.xml')}\n`);

console.log(
  `${OUT}/: ${LANGS.length} landing pages, ${withPage.length} of ${stations.length} station pages (the others made in the browser), ${byCountry.size} countries · ${SITE.abs('/')}`,
);
