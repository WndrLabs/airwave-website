// The Christmas radio page, one per language (XMAS_PATHS): every Christmas station, by style, with
// a few answers to what people search for in December.
import { COUNTRIES } from './data.mjs';
import { LANGS, T } from './i18n.mjs';
import { XMAS_PATHS, appStoreBadge, esc, html, landingPath, nav, page, stationPath, waveSvg } from './html.mjs';
import { logo } from './pages.mjs';
import { SITE } from './site.mjs';

/** Is it the season? Christmas pages are put forward from November to Epiphany. */
export function isChristmasSeason(date = new Date()) {
  const m = date.getUTCMonth();
  return m === 10 || m === 11 || (m === 0 && date.getUTCDate() <= 6);
}

/** A Christmas station's style, from its name (they all share the one genre). */
const STYLES = [
  ['gospel', /gospel|christian|\bcbn\b|k-?love|worship|hymn/],
  ['classical', /classical|klassi|instrumental|choir|\bchor\b|orchestr|traditional/],
  ['jazz', /jazz|swing|lounge|smooth|crooner|standards/],
  ['country', /country/],
  ['oldies', /oldies|vinyl|retro|\b[5-9]0s\b|classics|nostalgi|80s80s/],
];
const ORDER = ['hits', 'oldies', 'jazz', 'classical', 'country', 'gospel'];
export const xmasStyle = (station) => {
  const name = station.name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  return STYLES.find(([, re]) => re.test(name))?.[0] ?? 'hits';
};

const XMAS = {
  en: {
    title: 'Christmas Radio – Listen live to Christmas music, free',
    description: (n) =>
      `${n} Christmas radio stations live, free: Christmas hits, carols, crooners and classics, 24/7. On iPhone, in the car with CarPlay and on Mac with Skywave.`,
    kicker: 'Christmas radio',
    h1: ['Christmas radio,', 'live and free.'],
    lead: (n, c) =>
      `${n} radio stations from ${c} countries playing nothing but Christmas songs, 24/7. Tap one to listen right here, or take them on the road with Skywave.`,
    top: 'Most listened',
    styles: {
      hits: 'Christmas hits',
      oldies: 'Christmas classics & oldies',
      jazz: 'Jazz, swing & crooners',
      classical: 'Classical & choirs',
      country: 'Country Christmas',
      gospel: 'Gospel & carols',
    },
    whyTitle: 'Christmas on the road',
    why: 'Driving home for Christmas? Skywave puts every Christmas station in CarPlay under Browse › Christmas, with big, simple lists made for the road. It reconnects on its own in tunnels and dead zones, and its sleep timer stops the music when the kids are asleep.',
    faqTitle: 'Questions',
    faq: (n, c, ex) => [
      ['Where can I listen to Christmas music non-stop?', `On Christmas radio stations: webradios that play only Christmas songs, day and night. Skywave gathers ${n} of them from ${c} countries, such as ${ex}.`],
      ['Is it free?', 'Yes. The stations are free to listen to, and so is Skywave: no account, and no ads in the app.'],
      ['Can I listen in the car?', 'Yes. With CarPlay, Skywave shows the Christmas stations under Browse › Christmas, and starts your last station as soon as you plug in your iPhone.'],
      ['When do Christmas radio stations start?', 'Many play all year round, others come back in November. Skywave checks every stream every week, so the list only holds stations that are on air.'],
      ['Can I fall asleep to Christmas music?', 'Yes: set the sleep timer in Skywave’s player (15 to 90 minutes) and the music stops on its own.'],
    ],
    cta: 'All the Christmas stations, in your pocket and your car.',
  },
  fr: {
    title: 'Radio de Noël – Écouter de la musique de Noël en direct, gratuit',
    description: (n) =>
      `${n} radios de Noël en direct et gratuites : tubes de Noël, chants, crooners et classiques, 24 h/24. Sur iPhone, en voiture avec CarPlay et sur Mac avec Skywave.`,
    kicker: 'Radios de Noël',
    h1: ['La radio de Noël,', 'en direct et gratuite.'],
    lead: (n, c) =>
      `${n} radios de ${c} pays qui ne passent que des chansons de Noël, 24 h/24. Touchez-en une pour l’écouter ici, ou emmenez-les sur la route avec Skywave.`,
    top: 'Les plus écoutées',
    styles: {
      hits: 'Tubes de Noël',
      oldies: 'Classiques et oldies de Noël',
      jazz: 'Jazz, swing et crooners',
      classical: 'Classique et chorales',
      country: 'Noël country',
      gospel: 'Gospel et chants',
    },
    whyTitle: 'Noël sur la route',
    why: 'En route pour le réveillon ? Skywave range toutes les radios de Noël dans CarPlay, sous Parcourir › Noël, avec de grandes listes simples pensées pour la conduite. La radio se reconnecte toute seule dans les tunnels et les zones blanches, et la minuterie de veille coupe la musique quand les enfants dorment.',
    faqTitle: 'Questions',
    faq: (n, c, ex) => [
      ['Où écouter de la musique de Noël en continu ?', `Sur les radios de Noël : des webradios qui ne passent que des chansons de Noël, jour et nuit. Skywave en réunit ${n}, de ${c} pays, comme ${ex}.`],
      ['Est-ce gratuit ?', 'Oui. Les radios sont gratuites, et Skywave aussi : sans compte, et sans pub dans l’app.'],
      ['Peut-on les écouter en voiture ?', 'Oui. Avec CarPlay, Skywave affiche les radios de Noël sous Parcourir › Noël, et relance votre dernière radio dès que vous branchez l’iPhone.'],
      ['Quand les radios de Noël commencent-elles ?', 'Beaucoup émettent toute l’année, d’autres reviennent en novembre. Skywave vérifie chaque flux chaque semaine : la liste ne contient que des radios à l’antenne.'],
      ['Peut-on s’endormir en musique ?', 'Oui : réglez la minuterie de veille dans le lecteur de Skywave (de 15 à 90 minutes) et la musique s’arrête toute seule.'],
    ],
    cta: 'Toutes les radios de Noël, dans la poche et dans la voiture.',
  },
  de: {
    title: 'Weihnachtsradio – Weihnachtsmusik kostenlos live hören',
    description: (n) =>
      `${n} Weihnachtsradios live und kostenlos: Weihnachtshits, Weihnachtslieder, Crooner und Klassiker, rund um die Uhr. Auf dem iPhone, im Auto mit CarPlay und auf dem Mac mit Skywave.`,
    kicker: 'Weihnachtsradio',
    h1: ['Weihnachtsradio,', 'live und kostenlos.'],
    lead: (n, c) =>
      `${n} Sender aus ${c} Ländern, die nur Weihnachtsmusik spielen, rund um die Uhr. Tippe auf einen, um gleich hier reinzuhören, oder nimm sie mit Skywave mit ins Auto.`,
    top: 'Am meisten gehört',
    styles: {
      hits: 'Weihnachtshits',
      oldies: 'Weihnachtsklassiker & Oldies',
      jazz: 'Jazz, Swing & Crooner',
      classical: 'Klassik & Chöre',
      country: 'Country-Weihnachten',
      gospel: 'Gospel & Lieder',
    },
    whyTitle: 'Weihnachten unterwegs',
    why: 'Auf dem Weg zur Familie? Skywave zeigt alle Weihnachtssender in CarPlay unter Entdecken › Weihnachten, mit großen, einfachen Listen fürs Fahren. Im Tunnel oder Funkloch verbindet es sich von selbst neu, und der Schlaf-Timer stoppt die Musik, wenn die Kinder schlafen.',
    faqTitle: 'Fragen',
    faq: (n, c, ex) => [
      ['Wo kann ich Weihnachtsmusik nonstop hören?', `Bei Weihnachtsradios: Webradios, die Tag und Nacht nur Weihnachtslieder spielen. Skywave vereint ${n} davon aus ${c} Ländern, zum Beispiel ${ex}.`],
      ['Ist das kostenlos?', 'Ja. Die Sender sind kostenlos, und Skywave auch: kein Konto, keine Werbung in der App.'],
      ['Kann ich sie im Auto hören?', 'Ja. Mit CarPlay zeigt Skywave die Weihnachtssender unter Entdecken › Weihnachten und startet deinen letzten Sender, sobald du das iPhone einsteckst.'],
      ['Wann starten die Weihnachtsradios?', 'Viele senden das ganze Jahr, andere kommen im November zurück. Skywave prüft jeden Stream jede Woche: Die Liste enthält nur Sender, die auf Sendung sind.'],
      ['Kann ich mit Weihnachtsmusik einschlafen?', 'Ja: Stell im Player von Skywave den Schlaf-Timer (15 bis 90 Minuten), und die Musik hört von selbst auf.'],
    ],
    cta: 'Alle Weihnachtssender, in der Tasche und im Auto.',
  },
};

const flag = (code) => COUNTRIES.find((c) => c.code === code)?.flag ?? '';

function card(s, lang) {
  const country = T[lang].countries[s.country] ?? s.country;
  return `<a class="station-card" href="${SITE.url(stationPath(s.slug))}">${logo(s, 56)}<span>${esc(s.name)}</span><small>${flag(s.country)} ${esc(country)}</small></a>`;
}

/** `stations`: the Christmas stations, most popular first. */
export function christmasPage(lang, stations) {
  const x = XMAS[lang];
  const fmt = new Intl.NumberFormat(T[lang].htmlLang);
  const n = fmt.format(stations.length);
  const countries = new Set(stations.map((s) => s.country)).size;
  const examples = stations
    .slice(0, 3)
    .map((s) => s.name)
    .join(', ');
  const faq = x.faq(n, countries, examples);
  const top = stations.slice(0, 8);
  const groups = new Map(ORDER.map((k) => [k, []]));
  for (const s of stations.slice(8)) groups.get(xmasStyle(s)).push(s);
  const alternates = Object.fromEntries(LANGS.map((l) => [l, XMAS_PATHS[l]]));
  alternates['x-default'] = XMAS_PATHS.en;

  const body = html`
${nav(lang)}
<main class="xmas-main">
  <section class="xmas-hero">
    <div class="snow" aria-hidden="true"></div>
    <p class="kicker reveal">${x.kicker}</p>
    <h1 class="reveal"><span>${x.h1[0]}</span> <span class="grad-xmas">${x.h1[1]}</span></h1>
    <p class="lead reveal">${x.lead(n, countries)}</p>
    <div class="reveal">${appStoreBadge(lang, { height: 54 })}</div>
  </section>

  <section class="related">
    <h2>${x.top}</h2>
    <div class="station-grid station-grid-big">${top.map((s) => card(s, lang))}</div>
  </section>

  ${ORDER.filter((k) => groups.get(k).length).map(
    (k) => html`<section class="related" id="${k}">
    <h2>${x.styles[k]} <small>${groups.get(k).length}</small></h2>
    <div class="station-grid">${groups.get(k).map((s) => card(s, lang))}</div>
  </section>`,
  )}

  <section class="xmas-why">
    <h2>${x.whyTitle}</h2>
    <p>${x.why}</p>
  </section>

  <section class="faq">
    <h2>${x.faqTitle}</h2>
    ${faq.map(([q, a]) => html`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`)}
  </section>

  <section class="cta cta-small">
    <div class="cta-wave">${waveSvg('cta')}</div>
    <h2 class="reveal">${x.cta}</h2>
    <div class="reveal">${appStoreBadge(lang, { height: 56 })}</div>
    <p><a class="more-link" href="${SITE.url(landingPath(lang))}">Skywave →</a></p>
  </section>
</main>`;

  return page({
    lang,
    path: XMAS_PATHS[lang],
    title: x.title,
    description: x.description(n),
    image: '/img/og-christmas.png',
    body,
    alternates,
    bodyClass: 'xmas',
    scripts: ['/js/site.js'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: x.kicker,
        itemListElement: stations.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: SITE.abs(stationPath(s.slug)),
          name: s.name,
        })),
      },
    ],
  });
}
