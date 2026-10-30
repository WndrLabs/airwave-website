// The station list, ready for the pages: slugs, most popular first, grouped by country. Shared by
// build.mjs and the pages made in the browser (dynamic.mjs).
import { stationSlug } from './links.mjs';

/** The most popular stations get a page of their own; the others are made in the browser. */
export const STATIC_PAGES = 200;
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
  return { stations, byCountry, clashes: catalog.stations.length - stations.length };
}

/** Stations to suggest on a station's page: same country, same genre first. */
export function relatedOf(station, byCountry) {
  const sameCountry = byCountry.get(station.country).filter((r) => r.id !== station.id);
  const main = station.genres[0];
  const sameGenre = main ? sameCountry.filter((r) => r.genres.includes(main)) : [];
  return [...new Set([...sameGenre, ...sameCountry])].slice(0, RELATED);
}
