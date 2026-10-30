// Where the site lives, set by configureSite(): by build.mjs from its environment, and in the
// browser (pages made there) from the config the page carries. SITE_URL is the public address,
// without a trailing slash: a custom domain (https://skywave.example) or the GitHub Pages one
// (https://wndrlabs.github.io/airwave-website). The app shares links on the same address
// (SITE_URL in its app.config.ts): keep both in step.

export const SITE = {
  siteUrl: '',
  origin: '',
  base: '',
  /** Changes whenever a stylesheet or script changes, so browsers fetch the new one. */
  version: '',
  /** Apple Team ID, for the universal links file (not a secret: it's in every signed app). */
  teamId: 'TEAMID',
  /** Path on this site (with the GitHub Pages project folder, when there is one). */
  url: (path) => `${SITE.base}${path}`,
  /** Full address, for links shared outside (canonical, social cards, sitemap). */
  abs: (path) => `${SITE.siteUrl}${path}`,
  asset: (path) => `${SITE.base}${path}?v=${SITE.version}`,
  appId: '6822921195',
  appStore: 'https://apps.apple.com/app/id6822921195',
  /** Opens the app on a station (the app's URL scheme, see app.config.ts). */
  appLink: (slug) => `airwaves://radio/${slug}`,
  bundleId: 'com.wndrlabs.airwaves',
  privacy: 'https://github.com/WndrLabs/airwaves-stations/blob/main/PRIVACY.md',
  support: 'https://github.com/WndrLabs/airwaves-stations/blob/main/SUPPORT.md',
  stationsUrl: 'https://cdn.jsdelivr.net/gh/WndrLabs/airwaves-stations@main/stations.json',
};

export function configureSite({ siteUrl, version, teamId }) {
  SITE.siteUrl = siteUrl.replace(/\/+$/, '');
  SITE.origin = new URL(SITE.siteUrl).origin;
  SITE.base = new URL(SITE.siteUrl).pathname.replace(/\/+$/, '');
  SITE.version = version;
  if (teamId) SITE.teamId = teamId;
}

/** What the browser needs to make a page like build.mjs does. */
export const siteConfig = () => ({ siteUrl: SITE.siteUrl, version: SITE.version, teamId: SITE.teamId });
