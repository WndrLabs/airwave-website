// A station's public link: /radio/<name>-<key>/. The app builds the same link to share a station
// and reads it back to play one (src/domain/links.ts in the app repo): keep both in step.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-/i;

/**
 * Short, stable part of the link that finds the station again: the first 8 characters of a Radio
 * Browser id, or for the stations of the official feeds (readable ids like "radionova-hiphop",
 * whose whole id repeated the name in the link) a 7-character fingerprint of the id.
 */
export function linkKey(id) {
  if (UUID.test(id)) return id.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8);
  // FNV-1a, 32 bits, in base 36: short and the same everywhere (the app computes it too).
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 0x01000193) >>> 0;
  return h.toString(36).padStart(7, '0');
}

/** The key links to feed stations had before: their whole id. Shared links still use it. */
const legacyKey = (id) => (UUID.test(id) ? null : id.toLowerCase().replace(/[^a-z0-9]/g, ''));

/** The station's name as it reads in a link: "Radio Nova Lyon" → "radio-nova-lyon". */
export function slugify(name) {
  return (
    name
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48)
      .replace(/-+$/, '') || 'radio'
  );
}

export const stationSlug = (station) => `${slugify(station.name)}-${linkKey(station.id)}`;

/** The station a slug names, from its key; the name settles the (unlikely) case of two. */
export function findBySlug(slug, stations) {
  const key = slug.slice(slug.lastIndexOf('-') + 1);
  let found;
  for (const s of stations) {
    if (linkKey(s.id) !== key && legacyKey(s.id) !== key) continue;
    if (stationSlug(s) === slug) return s;
    found ??= s;
  }
  return found;
}
