// Small helpers shared by the page templates.
import { LANGS, T } from './i18n.mjs';
import { SITE } from './site.mjs';

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** Joins a template's parts, dropping the empty ones. */
export const html = (strings, ...values) =>
  strings.reduce((out, s, i) => {
    const v = values[i - 1];
    return out + (Array.isArray(v) ? v.join('') : (v ?? (v === 0 ? '0' : ''))) + s;
  });

export const landingPath = (lang) => (lang === 'en' ? '/' : `/${lang}/`);
export const countryPath = (code) => `/country/${code.toLowerCase()}/`;
export const stationPath = (slug) => `/radio/${slug}/`;

/** Apple's own App Store badge, in the page's language; a drawn one if Apple's can't load. */
export function appStoreBadge(lang, { height = 54 } = {}) {
  const region = { en: 'en-us', fr: 'fr-fr', de: 'de-de' }[lang];
  const label = T[lang].appStore;
  const [small, big] = { en: ['Download on the', 'App Store'], fr: ['Télécharger dans', 'l’App Store'], de: ['Laden im', 'App Store'] }[lang];
  return html`<a class="badge" href="${SITE.appStore}" aria-label="${esc(label)}" style="--h:${height}px">
    <img src="https://tools.applemarketingtools.com/api/badges/download-on-the-app-store/black/${region}" alt="" height="${height}" onerror="this.remove()">
    <span class="badge-text" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg><span><small>${small}</small>${big}</span></span>
  </a>`;
}

/** The wave of the app icon, as a line that can be animated. */
export const waveSvg = (cls = '') => html`<svg class="wave wave-${cls}" viewBox="0 0 1000 300" aria-hidden="true" preserveAspectRatio="none">
  <defs>
    <linearGradient id="wg${cls}" x1="0" x2="1">
      <stop offset="0" stop-color="#45E3FF"/><stop offset=".5" stop-color="#A27BFF"/><stop offset="1" stop-color="#FF6FB1"/>
    </linearGradient>
  </defs>
  <path class="w w3" stroke="url(#wg${cls})"/>
  <path class="w w2" stroke="url(#wg${cls})"/>
  <path class="w w1" stroke="url(#wg${cls})"/>
</svg>`;

/** A page: head (meta, social cards, the App Store banner), body, footer. */
export function page({
  lang,
  path,
  title,
  description,
  image = '/img/og.png',
  imageAlt,
  body,
  appArgument,
  alternates,
  jsonLd,
  scripts = [],
  bodyClass = '',
  noindex = false,
  head = '',
}) {
  const t = T[lang];
  const url = SITE.abs(path);
  const img = image.startsWith('http') ? image : SITE.abs(image);
  return html`<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${alternates ? Object.entries(alternates).map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${SITE.abs(p)}">`) : ''}
${noindex ? '<meta name="robots" content="noindex">' : ''}
${head}
<meta name="apple-itunes-app" content="app-id=${SITE.appId}${appArgument ? `, app-argument=${esc(appArgument)}` : ''}">
<meta name="theme-color" content="#0A0A1C">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Skywave">
<meta property="og:locale" content="${t.locale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${esc(img)}">
${imageAlt ? `<meta property="og:image:alt" content="${esc(imageAlt)}">` : ''}
<meta name="twitter:card" content="${image === '/img/og.png' ? 'summary_large_image' : 'summary'}">
<link rel="icon" href="${SITE.url('/img/icon-64.png')}" type="image/png">
<link rel="apple-touch-icon" href="${SITE.url('/img/icon-180.png')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${SITE.asset('/css/site.css')}">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}
</head>
<body class="${bodyClass}">
${body}
${footer(lang, alternates)}
${scripts.map((s) => `<script src="${SITE.asset(s)}" defer></script>`)}
</body>
</html>
`;
}

export function nav(lang, { landing = false } = {}) {
  const t = T[lang];
  const home = SITE.url(landingPath(lang));
  const anchor = (id) => (landing ? `#${id}` : `${home}#${id}`);
  return html`<header class="nav" id="nav">
  <a class="brand" href="${home}"><img src="${SITE.url('/img/icon-64.png')}" alt="" width="32" height="32"><span>Skywave</span></a>
  <nav class="nav-links" aria-label="Skywave">
    <a href="${anchor('features')}">${t.nav.features}</a>
    <a href="${anchor('carplay')}">${t.nav.carplay}</a>
    <a href="${anchor('mac')}">${t.nav.mac}</a>
    <a href="${anchor('stations')}">${t.nav.stations}</a>
  </nav>
  <a class="nav-cta" href="${SITE.appStore}">${t.appStoreShort}</a>
</header>`;
}

function footer(lang, alternates) {
  const t = T[lang];
  const langs = Object.fromEntries(LANGS.map((l) => [l, alternates?.[l] ?? landingPath(l)]));
  return html`<footer class="footer">
  <div class="footer-in">
    <a class="brand" href="${SITE.url(landingPath(lang))}"><img src="${SITE.url('/img/icon-64.png')}" alt="" width="28" height="28"><span>Skywave</span></a>
    <nav class="footer-links">
      <a href="${SITE.privacy}">${t.footer.privacy}</a>
      <a href="${SITE.support}">${t.footer.support}</a>
      <a href="${SITE.appStore}">${t.appStoreShort}</a>
    </nav>
    <nav class="footer-langs" aria-label="Language">
      ${Object.entries(langs).map(
        ([l, p]) => `<a href="${SITE.url(p)}" hreflang="${l}" data-lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${T[l].langName}</a>`,
      )}
    </nav>
    <p class="footer-note">© 2026 WndrLabs. ${t.footer.made} Apple, the Apple logo, CarPlay, iPhone and Mac are trademarks of Apple Inc.</p>
  </div>
</footer>`;
}
