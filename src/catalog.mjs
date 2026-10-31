// The station list, ready for the pages: slugs, most popular first, grouped by country. Shared by
// build.mjs and the pages made in the browser (dynamic.mjs).
import { stationSlug } from './links.mjs';

/**
 * Stations with a page of their own (indexed by search engines): the most popular, the first few of
 * each country, and every Christmas station. The others are made in the browser.
 */
export const STATIC_PAGES = 200;
const STATIC_PER_COUNTRY = 10;
export const isChristmas = (s) => s.genres.includes('christmas');
const RELATED = 12;

export function prepare(catalog) {
  // Slugs are unique by construction (name + id key); a clash would be two stations with the same
  // name and the same id start, which the app couldn't tell apart either: the second is left out.
  const bySlug = new Map();
  for (const s of catalog.stations) {
    const slug = stationSlug(s);
    if (!bySlug.has(slug)) bySlug.set(slug, { ...s, genres: s.genres ?? [], slug });
  }
  const stations = [...bySlug.values()].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  const byCountry = new Map();
  for (const s of stations) byCountry.set(s.country, [...(byCountry.get(s.country) ?? []), s]);
  const christmas = stations.filter(isChristmas);
  return { stations, byCountry, christmas, clashes: catalog.stations.length - stations.length };
}

export function staticStations({ stations, byCountry, christmas }) {
  return [
    ...new Set([
      ...stations.slice(0, STATIC_PAGES),
      ...[...byCountry.values()].flatMap((list) => list.slice(0, STATIC_PER_COUNTRY)),
      ...christmas,
    ]),
  ];
}

/**
 * Stations to suggest on a station's page: same country, same genre first. For a Christmas
 * station, the other Christmas stations, wherever they are.
 */
export function relatedOf(station, { byCountry, christmas }) {
  if (isChristmas(station)) return christmas.filter((r) => r.id !== station.id).slice(0, RELATED);
  const sameCountry = byCountry.get(station.country).filter((r) => r.id !== station.id);
  const main = station.genres[0];
  const sameGenre = main ? sameCountry.filter((r) => r.genres.includes(main)) : [];
  return [...new Set([...sameGenre, ...sameCountry])].slice(0, RELATED);
}
