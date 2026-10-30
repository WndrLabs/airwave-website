// Where the site lives. SITE_URL is the public address, without a trailing slash: a custom domain
// (https://skywave.example) or the GitHub Pages one (https://wndrlabs.github.io/airwave-website).
// The app shares links on the same address (SITE_URL in src/domain/links.ts): keep both in step.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';

const SITE_URL = (process.env.SITE_URL || 'https://wndrlabs.github.io/airwave-website').replace(/\/+$/, '');
const base = new URL(SITE_URL).pathname.replace(/\/+$/, '');

/** Changes whenever a stylesheet or script changes, so browsers fetch the new one. */
const STATIC = new URL('../static/', import.meta.url);
const version = createHash('sha1')
  .update(
    ['css', 'js']
      .flatMap((dir) => readdirSync(new URL(`${dir}/`, STATIC)).map((f) => readFileSync(new URL(`${dir}/${f}`, STATIC))))
      .join(''),
  )
  .digest('hex')
  .slice(0, 10);

export const SITE = {
  origin: new URL(SITE_URL).origin,
  base,
  /** Path on this site (with the GitHub Pages project folder, when there is one). */
  url: (path) => `${base}${path}`,
  /** Full address, for links shared outside (canonical, social cards, sitemap). */
  abs: (path) => `${SITE_URL}${path}`,
  asset: (path) => `${base}${path}?v=${version}`,
  appId: '6822921195',
  appStore: 'https://apps.apple.com/app/id6822921195',
  /** Opens the app on a station (the app's URL scheme, see app.config.ts). */
  appLink: (slug) => `airwaves://radio/${slug}`,
  bundleId: 'com.wndrlabs.airwaves',
  /** Apple Team ID, for the universal links file (not a secret: it's in every signed app). */
  teamId: process.env.APPLE_TEAM_ID || 'TEAMID',
  privacy: 'https://github.com/WndrLabs/airwaves-stations/blob/main/PRIVACY.md',
  support: 'https://github.com/WndrLabs/airwaves-stations/blob/main/SUPPORT.md',
  stationsUrl: 'https://cdn.jsdelivr.net/gh/WndrLabs/airwaves-stations@main/stations.json',
};
