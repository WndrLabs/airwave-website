// The page of a station without one of its own (beyond the most popular, see STATIC_PAGES): GitHub
// Pages answers its link with 404.html, which makes the page here from the station list, with the
// same template as build.mjs. A link whose station is gone keeps the "not found" page.
import { prepare, relatedOf } from './catalog.mjs';
import { stationPath } from './html.mjs';
import { findBySlug } from './links.mjs';
import { stationPage } from './pages.mjs';
import { SITE, configureSite } from './site.mjs';

export const slugInPath = (path) => /\/radio\/([a-z0-9-]+)\/?$/i.exec(path)?.[1]?.toLowerCase() ?? null;

export async function renderStation(config) {
  const slug = slugInPath(location.pathname);
  if (!slug) return;
  configureSite(config);
  try {
    const res = await fetch(SITE.stationsUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const catalog = prepare(await res.json());
    const { stations, byCountry } = catalog;
    const station = findBySlug(slug, stations);
    if (!station) throw new Error('No such station');
    // A renamed station: its current link.
    if (station.slug !== slug) history.replaceState(null, '', SITE.url(stationPath(station.slug)));
    const page = stationPage(station, { related: relatedOf(station, catalog), byCountry });
    document.open();
    document.write(page);
    document.close();
  } catch {
    document.documentElement.classList.remove('making');
  }
}
