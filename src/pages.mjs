// The site's pages: the landing page (one per language), a page per station, a page per country.
import { LANGS, T, langOf } from './i18n.mjs';
import {
  appStoreBadge,
  countryPath,
  esc,
  html,
  landingPath,
  nav,
  page,
  stationPath,
  waveSvg,
} from './html.mjs';
import { SITE } from './site.mjs';

/** Two tones per genre, as in the app's genre tiles. */
const PALETTES = {
  rap: ['#D8433A', '#5E1630'],
  hiphop: ['#D98B2B', '#7A2E12'],
  rnb: ['#B6449E', '#45206E'],
  pop: ['#E85A8C', '#8E2147'],
  rock: ['#56626F', '#1C2027'],
  electro: ['#1BA7B5', '#1A3A9E'],
  jazz: ['#C08A2E', '#4A2F0E'],
  classical: ['#9C8463', '#3A3127'],
  reggae: ['#3A944A', '#14492A'],
  afro: ['#E06A25', '#7A2410'],
  latin: ['#E5702F', '#A52457'],
  oldies: ['#4F9AA5', '#1F4452'],
  news: ['#3F6FE0', '#18245E'],
  talk: ['#7A68E0', '#2F2574'],
  sports: ['#2FAE6B', '#0F4A3A'],
  christmas: ['#D63A3A', '#1E5B33'],
  variety: ['#7D8692', '#2E333A'],
};
const palette = (genre) => PALETTES[genre] ?? PALETTES.variety;
const img = (name) => SITE.url(`/img/shots/${name}.webp`);
const LOCAL_SHOT = { en: 'en-uk', fr: 'fr-france', de: 'de-germany' };

function phone(src, alt, { cls = '', speed, eager = false } = {}) {
  return html`<div class="phone ${cls}"${speed ? ` data-speed="${speed}"` : ''}>
    <img src="${src}" alt="${esc(alt)}" width="923" height="2000"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}>
  </div>`;
}

/** A station's logo, or its initials on its genre's colours when it has none. */
export function logo(station, size, { eager = false } = {}) {
  if (station.logo) {
    return `<img class="logo" src="${esc(station.logo)}" alt="" width="${size}" height="${size}"${eager ? '' : ' loading="lazy"'} decoding="async">`;
  }
  const [from, to] = palette(station.genres[0]);
  const initials = station.name
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return `<span class="logo logo-text" style="--from:${from};--to:${to};width:${size}px;height:${size}px;font-size:${Math.round(size * 0.36)}px">${esc(initials || '♪')}</span>`;
}

const flag = (code, countries) => countries.find((c) => c.code === code)?.flag ?? '';

// ─── Landing ──────────────────────────────────────────────────────────────────────────────────────

export function landingPage(lang, { marquee, countries, byCountry, total }) {
  const t = T[lang];
  const alternates = Object.fromEntries(LANGS.map((l) => [l, landingPath(l)]));
  alternates['x-default'] = '/';
  const stats = t.stats.map(([n, label], i) => (i === 0 ? [Math.floor(total / 100) * 100, label] : [n, label]));
  const fmt = new Intl.NumberFormat(t.htmlLang);
  const half = Math.ceil(marquee.length / 2);
  const belt = (list, reverse) => html`<div class="belt${reverse ? ' belt-rev' : ''}"><div class="belt-track">
    ${[...list, ...list].map(
      (s, i) => `<a class="chip" href="${SITE.url(stationPath(s.slug))}"${i >= list.length ? ' tabindex="-1" aria-hidden="true"' : ''}>${logo(s, 36)}<span>${esc(s.name)}</span></a>`,
    )}
  </div></div>`;

  const body = html`
${nav(lang, { landing: true })}
<main>
  <section class="hero" id="top">
    <div class="sky" aria-hidden="true">
      <div class="stars stars-1" data-speed="0.15"></div>
      <div class="stars stars-2" data-speed="0.3"></div>
      <div class="stars stars-3" data-speed="0.5"></div>
      <div class="glow glow-a" data-speed="0.2"></div>
      <div class="glow glow-b" data-speed="0.35"></div>
    </div>
    <div class="hero-wave" data-speed="0.25">${waveSvg('hero')}</div>
    <div class="hero-copy">
      <p class="kicker reveal">${t.hero.kicker}</p>
      <h1 class="reveal"><span>${t.hero.title[0]}</span> <span class="grad">${t.hero.title[1]}</span></h1>
      <p class="lead reveal">${t.hero.text}</p>
      <div class="hero-cta reveal">${appStoreBadge(lang, { height: 56 })}<span class="free">${t.hero.free}</span></div>
    </div>
    <div class="hero-phones">
      ${phone(img(`${lang}-search`), '', { cls: 'phone-side phone-left', speed: '-0.08' })}
      ${phone(img(`${lang}-all`), t.browse.title, { cls: 'phone-main', speed: '-0.18', eager: true })}
      ${phone(img(`${lang}-player`), '', { cls: 'phone-side phone-right', speed: '-0.04' })}
    </div>
  </section>

  <section class="stats" aria-label="Skywave">
    ${stats.map(
      ([n, label]) => html`<div class="stat reveal"><b data-count="${n}">${fmt.format(n)}</b><span>${label}</span></div>`,
    )}
  </section>

  <section class="marquee" aria-label="${esc(t.nav.stations)}">
    ${belt(marquee.slice(0, half), false)}
    ${belt(marquee.slice(half), true)}
  </section>

  <section class="feature" id="features">
    <div class="feature-copy">
      <p class="kicker reveal">${t.browse.kicker}</p>
      <h2 class="reveal">${t.browse.title}</h2>
      <p class="lead reveal">${t.browse.text}</p>
      <ul class="points reveal">${t.browse.points.map((p) => `<li>${p}</li>`)}</ul>
    </div>
    <div class="feature-art duo">
      ${phone(img(`${lang}-country-list`), '', { cls: 'phone-back', speed: '0.06' })}
      ${phone(img(LOCAL_SHOT[lang]), t.browse.title, { cls: 'phone-front', speed: '-0.08' })}
    </div>
  </section>

  <section class="carplay" id="carplay">
    <div class="carplay-sticky">
      <div class="feature-copy center">
        <p class="kicker reveal">${t.carplay.kicker}</p>
        <h2 class="reveal">${t.carplay.title}</h2>
        <p class="lead reveal">${t.carplay.text}</p>
      </div>
      <div class="dash reveal">
        <div class="dash-screen">
          <img src="${img(`carplay-${lang}`)}" alt="${esc(t.carplay.title)}" width="2278" height="996" loading="lazy">
          <img class="dash-playing" src="${img(`carplay-${lang}-playing`)}" alt="" width="2278" height="996" loading="lazy">
        </div>
      </div>
      <ul class="points points-row reveal">${t.carplay.points.map((p) => `<li>${p}</li>`)}</ul>
    </div>
  </section>

  <section class="signal">
    <div class="feature-copy center">
      <p class="kicker reveal">${t.signal.kicker}</p>
      <h2 class="reveal">${t.signal.title}</h2>
      <p class="lead reveal">${t.signal.text}</p>
    </div>
    <div class="road reveal" aria-hidden="true">
      <div class="tunnel"><span>${t.signal.tunnel}</span></div>
      <svg class="road-svg" viewBox="0 0 1200 220" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rg" x1="0" x2="1"><stop offset="0" stop-color="#45E3FF"/><stop offset=".5" stop-color="#A27BFF"/><stop offset="1" stop-color="#FF6FB1"/></linearGradient>
        </defs>
        <path class="net" d=""/>
        <path class="music" d="" stroke="url(#rg)"/>
      </svg>
      <div class="buffer"><span>${t.signal.buffer}</span></div>
      <div class="car">
        <svg viewBox="0 0 64 28"><path d="M6 20h52c2 0 3-1 3-3v-3c0-2-1-3-3-4l-9-2-7-6c-1-1-2-1-4-1H22c-2 0-3 0-4 1l-7 6-6 2c-2 1-3 2-3 4v3c0 2 1 3 4 3z" fill="currentColor"/><circle cx="17" cy="21" r="5" fill="#0A0A1C" stroke="currentColor" stroke-width="2.5"/><circle cx="47" cy="21" r="5" fill="#0A0A1C" stroke="currentColor" stroke-width="2.5"/></svg>
      </div>
    </div>
  </section>

  <section class="feature reverse">
    <div class="feature-copy">
      <p class="kicker reveal">${t.song.kicker}</p>
      <h2 class="reveal">${t.song.title}</h2>
      <p class="lead reveal">${t.song.text}</p>
    </div>
    <div class="feature-art solo">
      <div class="halo" data-speed="0.1"></div>
      ${phone(img(`${lang}-player`), t.song.title, { cls: 'phone-tilt', speed: '-0.1' })}
    </div>
  </section>

  <section class="mac" id="mac">
    <div class="feature-copy center">
      <p class="kicker reveal">${t.mac.kicker}</p>
      <h2 class="reveal">${t.mac.title}</h2>
      <p class="lead reveal">${t.mac.text}</p>
    </div>
    <div class="mac-art">
      <div class="screen reveal" data-speed="-0.04"><img src="${img('mac-genres')}" alt="${esc(t.mac.title)}" width="1330" height="1110" loading="lazy"></div>
      <div class="screen screen-float reveal" data-speed="-0.14"><img src="${img('mac-banner')}" alt="" width="1288" height="672" loading="lazy"></div>
    </div>
  </section>

  <section class="privacy">
    <div class="lock reveal" aria-hidden="true">
      <svg viewBox="0 0 48 48"><rect x="9" y="21" width="30" height="22" rx="6" fill="none" stroke="url(#lg)" stroke-width="3"/><path d="M16 21v-6a8 8 0 0 1 16 0v6" fill="none" stroke="url(#lg)" stroke-width="3"/><defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#45E3FF"/><stop offset="1" stop-color="#FF6FB1"/></linearGradient></defs></svg>
    </div>
    <h2 class="reveal">${t.privacy.title}</h2>
    <p class="lead reveal">${t.privacy.text}</p>
  </section>

  <section class="countries" id="stations">
    <h2 class="reveal">${t.countries.title}</h2>
    <p class="lead reveal">${t.countries.text}</p>
    <div class="country-grid">
      ${countries
        .filter((c) => byCountry.get(c.code)?.length)
        .map(
          (c) => html`<a class="country reveal" href="${SITE.url(countryPath(c.code))}"><span class="flag">${c.flag}</span><span class="cname">${esc(t.countries[c.code] ?? c.name)}</span><span class="count">${fmt.format(byCountry.get(c.code).length)}</span></a>`,
        )}
    </div>
  </section>

  <section class="cta">
    <div class="cta-wave">${waveSvg('cta')}</div>
    <img class="cta-icon reveal" src="${SITE.url('/img/icon-256.png')}" alt="" width="128" height="128" loading="lazy">
    <h2 class="reveal">${t.cta.title}</h2>
    <p class="lead reveal">${t.cta.text}</p>
    <div class="reveal">${appStoreBadge(lang, { height: 60 })}</div>
  </section>
</main>`;

  return page({
    lang,
    path: landingPath(lang),
    title: t.meta.title,
    description: t.meta.description,
    body,
    alternates,
    bodyClass: 'landing',
    scripts: ['/js/site.js'],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'Skywave',
      operatingSystem: 'iOS',
      applicationCategory: 'MusicApplication',
      description: t.meta.description,
      downloadUrl: SITE.appStore,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  });
}

// ─── Station ──────────────────────────────────────────────────────────────────────────────────────

export function stationPage(station, { related, countries, byCountry }) {
  const lang = langOf(station.country);
  const t = T[lang];
  const s = t.station;
  const country = t.countries[station.country] ?? station.country;
  const genres = station.genres.map((g) => t.genres[g] ?? g);
  const path = stationPath(station.slug);
  const [from, to] = palette(station.genres[0]);
  const mainGenre = genres[0];
  const relatedTitle = mainGenre ? s.more(mainGenre, country) : s.moreCountry(country);
  const countryCount = byCountry.get(station.country)?.length ?? 0;

  const body = html`
${nav(lang)}
<main class="station-main">
  <section class="player" id="player" style="--from:${from};--to:${to}"
    data-stream="${esc(station.url)}" data-hls="${station.hls ? 1 : 0}" data-name="${esc(station.name)}"
    data-logo="${esc(station.logo ?? '')}" data-app="${esc(SITE.appLink(station.slug))}" data-store="${SITE.appStore}"
    data-t-play="${esc(s.play)}" data-t-pause="${esc(s.pause)}" data-t-loading="${esc(s.loading)}" data-t-live="${esc(s.live)}">
    <div class="player-bg" aria-hidden="true">${station.logo ? `<img src="${esc(station.logo)}" alt="">` : ''}</div>
    <div class="player-card">
      <div class="player-logo">${logo(station, 168, { eager: true })}</div>
      <div class="player-info">
        <h1>${esc(station.name)}</h1>
        <p class="player-meta"><span>${flag(station.country, countries)} ${esc(country)}</span>${genres.length ? `<span>${esc(genres.join(' · '))}</span>` : ''}</p>
        <div class="player-controls">
          <button class="play" type="button" aria-label="${esc(s.play)}">
            <svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>
            <svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4.5" height="14" rx="1.2"/><rect x="13.5" y="5" width="4.5" height="14" rx="1.2"/></svg>
            <span class="spinner" aria-hidden="true"></span>
          </button>
          <div class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
          <p class="status" role="status" aria-live="polite"><span class="dot"></span><span class="status-text">${esc(s.live)}</span></p>
        </div>
        <p class="unavailable" hidden>${esc(s.unavailable)}</p>
      </div>
    </div>
    <div class="player-actions">
      <a class="open-app" href="${esc(SITE.appLink(station.slug))}">
        <img src="${SITE.url('/img/icon-64.png')}" alt="" width="28" height="28">${esc(s.openApp)}
      </a>
      ${appStoreBadge(lang, { height: 48 })}
    </div>
  </section>

  <section class="about">
    <p>${esc(s.about(station.name, country))}</p>
    ${station.homepage ? `<p><a class="ext" href="${esc(station.homepage)}" rel="nofollow noopener">${esc(s.website)} ↗</a></p>` : ''}
  </section>

  ${related.length
    ? html`<section class="related">
    <h2>${esc(relatedTitle)}</h2>
    <div class="station-grid">
      ${related.map(
        (r) => `<a class="station-card" href="${SITE.url(stationPath(r.slug))}">${logo(r, 56)}<span>${esc(r.name)}</span></a>`,
      )}
    </div>
    <p><a class="more-link" href="${SITE.url(countryPath(station.country))}">${esc(s.allIn(country))} · ${esc(t.country.count(countryCount))} →</a></p>
  </section>`
    : ''}

  <section class="pitch">
    <a href="${SITE.url(landingPath(lang))}">${waveSvg('mini')}<span>${esc(s.pitch)}</span></a>
  </section>
</main>`;

  return page({
    lang,
    path,
    title: s.title(station.name),
    description: s.description(station.name, country, genres.join(', ')),
    image: station.logo ?? '/img/og.png',
    imageAlt: station.name,
    appArgument: SITE.abs(path),
    body,
    bodyClass: 'station',
    scripts: ['/js/site.js', '/js/station.js'],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'RadioStation',
      name: station.name,
      url: SITE.abs(path),
      ...(station.logo && { logo: station.logo, image: station.logo }),
      ...(station.homepage && { sameAs: [station.homepage] }),
      address: { '@type': 'PostalAddress', addressCountry: station.country },
    },
  });
}

// ─── Country ──────────────────────────────────────────────────────────────────────────────────────

export function countryPage(code, stations, { countries, genreOrder }) {
  const lang = langOf(code);
  const t = T[lang];
  const name = t.countries[code] ?? code;
  const groups = new Map();
  for (const s of stations) {
    const g = s.genres[0] ?? 'variety';
    groups.set(g, [...(groups.get(g) ?? []), s]);
  }
  const order = [...groups.keys()].sort((a, b) => genreOrder.indexOf(a) - genreOrder.indexOf(b));

  const body = html`
${nav(lang)}
<main class="country-main">
  <header class="country-head">
    <span class="big-flag">${flag(code, countries)}</span>
    <h1>${esc(t.country.heading(name))}</h1>
    <p class="lead">${esc(t.country.count(stations.length))}</p>
    <nav class="genre-jump">
      ${order.map((g) => `<a href="#${g}" style="--from:${palette(g)[0]};--to:${palette(g)[1]}">${esc(t.genres[g] ?? g)}</a>`)}
    </nav>
  </header>
  ${order.map(
    (g) => html`<section class="related" id="${g}">
    <h2>${esc(t.genres[g] ?? g)} <small>${groups.get(g).length}</small></h2>
    <div class="station-grid">
      ${groups.get(g).map(
        (s) => `<a class="station-card" href="${SITE.url(stationPath(s.slug))}">${logo(s, 56)}<span>${esc(s.name)}</span></a>`,
      )}
    </div>
  </section>`,
  )}
  <section class="pitch">
    <a href="${SITE.url(landingPath(lang))}">${waveSvg('mini')}<span>${esc(t.station.pitch)}</span></a>
  </section>
</main>`;

  return page({
    lang,
    path: countryPath(code),
    title: t.country.title(name),
    description: t.country.description(name, stations.length),
    body,
    bodyClass: 'country-page',
    scripts: ['/js/site.js'],
  });
}

// ─── 404 ──────────────────────────────────────────────────────────────────────────────────────────

export function notFoundPage() {
  const lang = 'en';
  const t = T[lang];
  const body = html`
${nav(lang)}
<main class="lost">
  <div class="lost-wave">${waveSvg('lost')}</div>
  <h1>${t.notFound.title}</h1>
  <p class="lead">${t.notFound.text}</p>
  <div class="lost-cta">${appStoreBadge(lang, { height: 54 })}<a class="more-link" href="${SITE.url('/')}">${t.notFound.home} →</a></div>
</main>`;
  return page({
    lang,
    path: '/404.html',
    title: `${t.notFound.title} – Skywave`,
    description: t.notFound.text,
    body,
    noindex: true,
    scripts: ['/js/site.js'],
  });
}
