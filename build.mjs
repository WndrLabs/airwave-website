#!/usr/bin/env node
// Builds the site into dist/: the landing page in each language, the privacy policy and support
// page, a page for each of the most popular stations (the others are made in the browser, see src/dynamic.mjs), a page per country,
// the sitemap, and the universal links file. Stations come from the weekly list the app uses.
//
//   node build.mjs                      fetches stations.json from the CDN
//   STATIONS_FILE=… node build.mjs      or reads a local copy
//   SITE_URL=https://… APPLE_TEAM_ID=… node build.mjs
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { prepare, relatedOf, staticStations } from './src/catalog.mjs';
import { christmasPage, isChristmasSeason } from './src/christmas.mjs';
import { docPages } from './src/docs.mjs';
import { LANGS, T } from './src/i18n.mjs';
import { XMAS_PATHS, countryPath, esc, landingPath, legacyCountryPath, stationPath } from './src/html.mjs';
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
  // SEASON=1 or 0 forces it (to preview the site out of season).
  season: process.env.SEASON ? process.env.SEASON === '1' : isChristmasSeason(),
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

const catalog = prepare(await loadStations());
const { stations, byCountry, christmas, clashes } = catalog;
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

const withPage = staticStations(catalog);
for (const s of withPage) {
  write(stationPath(s.slug), stationPage(s, { related: relatedOf(s, catalog), byCountry }));
}

for (const lang of LANGS) write(XMAS_PATHS[lang], christmasPage(lang, christmas));

for (const [code, list] of byCountry) {
  write(countryPath(code), countryPage(code, list, { genreOrder }));
  // The first address of country pages (/country/jp/) leads to the new one.
  const to = SITE.abs(countryPath(code));
  write(
    legacyCountryPath(code),
    `<!doctype html><meta charset="utf-8"><title>Skywave</title><link rel="canonical" href="${esc(to)}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${esc(to)}"><script>location.replace(${JSON.stringify(to)})</script><a href="${esc(to)}">${esc(to)}</a>\n`,
  );
}

for (const [path, content] of docPages()) write(path, content);

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
  ...LANGS.map((l) => XMAS_PATHS[l]),
  ...docPages().map(([path]) => path),
  ...[...byCountry.keys()].map(countryPath),
  ...withPage.map((s) => stationPath(s.slug)),
];
const today = new Date().toISOString().slice(0, 10);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${SITE.abs(u)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`,
);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE.abs('/sitemap.xml')}\n`);

console.log(
  `${OUT}/: ${LANGS.length} landing pages, ${withPage.length} of ${stations.length} station pages (the others made in the browser), ${christmas.length} Christmas stations${SITE.season ? ' (in season)' : ''}, ${byCountry.size} countries · ${SITE.abs('/')}`,
);
