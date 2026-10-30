// A station's public link: /radio/<name>-<key>/. The app builds the same link to share a station
// and reads it back to play one (src/domain/links.ts in the app repo): keep both in step.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-/i;

/**
 * Short, stable part of the link that finds the station again: the first 8 characters of a Radio
 * Browser id, or the whole id (letters and digits only) for the stations added by hand.
 */
export function linkKey(id) {
  const plain = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return UUID.test(id) ? plain.slice(0, 8) : plain;
}

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
