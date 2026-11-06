// The privacy policy and the support page, in each language. App Store Connect links to them
// (supportUrl and privacyPolicyUrl in the app's store.config.json and store.mac.config.json):
// keep their addresses (PRIVACY_PATHS and SUPPORT_PATHS in html.mjs).
import { LANGS } from './i18n.mjs';
import { PRIVACY_PATHS, SUPPORT_PATHS, esc, html, nav, page } from './html.mjs';
import { SITE } from './site.mjs';

const ISSUES = 'https://github.com/WndrLabs/airwaves-stations/issues';
const NEW_ISSUE = `${ISSUES}/new`;
const STATIONS_REPO = 'https://github.com/WndrLabs/airwaves-stations';
const UMAMI = 'https://umami.is/privacy';
const SCRUTER = 'https://scruter.net/privacy';
const UPDATED = '2026-11-06';

const link = (href, text) => `<a href="${href}">${text}</a>`;
const date = (lang) =>
  new Intl.DateTimeFormat({ en: 'en-US', fr: 'fr-FR', de: 'de-DE' }[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(UPDATED),
  );

const PRIVACY = {
  en: {
    title: 'Privacy policy',
    meta: 'Skywave collects no personal data: no account, no ads, no tracking, only anonymous statistics.',
    updated: (d) => `Last updated: ${d}`,
    body: () => html`
<p class="doc-lead">Skywave (iPhone, CarPlay and Mac) collects no personal data.</p>
<ul>
  <li><strong>No account, no ads, no tracking.</strong> The app contains no advertising SDK, and nothing follows you across other apps or websites.</li>
  <li><strong>Anonymous statistics.</strong> To know which stations are listened to and which features are used, the app (iPhone, CarPlay and Mac) counts a few events with ${link(UMAMI, 'Umami')}, and this website with ${link(SCRUTER, 'Scruter')} (French, hosted in France), both without cookies:
    <ul>
      <li>a station viewed, played or added to your favorites: its name, country and genre, where it was started from (genres, search, favorites, CarPlay, Siri, a link) and the platform (iPhone, CarPlay, Mac, Android or website);</li>
      <li>the app opened from a station link;</li>
      <li>on this website, the pages you view, how long and how far down, and the links you follow to other sites (the App Store, for instance);</li>
      <li>a search: what you searched for, cleaned and cut to its first 20 characters (without e-mail or web addresses, nor long numbers), and whether it found something.</li>
    </ul>
    <p>No identifier of you or your device is stored or sent. Umami and Scruter tell visits apart without cookies, from your IP address and browser or system, which they don’t keep. These statistics are not sold, not shared and not used for advertising.</p>
  </li>
  <li><strong>Your favorites, recent stations and settings stay on your device.</strong> They are never sent to us. On iPhone and Mac, your favorites are also kept in your own iCloud account, to find them on your other Apple devices and after reinstalling the app: Apple stores them, we never see them.</li>
  <li><strong>What the app connects to, and why:</strong>
    <ul>
      <li>the radio stations’ own streaming servers, to play the station you choose;</li>
      <li>our ${link(STATIONS_REPO, 'public station list')} (through jsDelivr or GitHub), to download the station list;</li>
      <li>Radio Browser (radio-browser.info), when you search for a station that isn’t in the list;</li>
      <li>the iTunes Search API (Apple), to show the cover of the song on air;</li>
      <li>Umami, for the anonymous statistics above.</li>
    </ul>
    <p>These requests carry no identifier of you or your device. Like any web request, they reach those servers from your IP address; their own privacy policies apply.</p>
  </li>
  <li><strong>Notifications (Mac):</strong> song banners are created on your Mac and are not sent anywhere.</li>
</ul>
<p>We don’t sell or share any data, and we don’t keep any data about you: the statistics above are anonymous counts.</p>
<p>Questions: ${link(ISSUES, 'open an issue')}.</p>`,
  },
  fr: {
    title: 'Politique de confidentialité',
    meta: 'Skywave ne collecte aucune donnée personnelle : sans compte, sans publicité, sans pistage, seulement des statistiques anonymes.',
    updated: (d) => `Dernière mise à jour : ${d}`,
    body: () => html`
<p class="doc-lead">Skywave (iPhone, CarPlay et Mac) ne collecte aucune donnée personnelle.</p>
<ul>
  <li><strong>Sans compte, sans publicité, sans pistage.</strong> L’app ne contient aucun outil publicitaire, et rien ne vous suit d’une app ou d’un site à l’autre.</li>
  <li><strong>Statistiques anonymes.</strong> Pour savoir quelles radios sont écoutées et quelles fonctions servent, l’app (iPhone, CarPlay et Mac) compte quelques événements avec ${link(UMAMI, 'Umami')}, et ce site avec ${link(SCRUTER, 'Scruter')} (français, hébergé en France), tous deux sans cookie :
    <ul>
      <li>une radio affichée, écoutée ou ajoutée aux favoris : son nom, son pays et son genre, d’où elle a été lancée (genres, recherche, favoris, CarPlay, Siri, un lien) et la plateforme (iPhone, CarPlay, Mac, Android ou site) ;</li>
      <li>l’ouverture de l’app depuis le lien d’une radio ;</li>
      <li>sur ce site, les pages vues, combien de temps et jusqu’où, et les liens suivis vers d’autres sites (l’App Store, par exemple) ;</li>
      <li>une recherche : ce que vous avez cherché, nettoyé et limité à ses 20 premiers caractères (sans adresse e-mail ou web, ni long numéro), et si elle a trouvé quelque chose.</li>
    </ul>
    <p>Aucun identifiant vous concernant, vous ou votre appareil, n’est conservé ni envoyé. Umami et Scruter distinguent les visites sans cookie, à partir de votre adresse IP et de votre navigateur ou système, qu’ils ne conservent pas. Ces statistiques ne sont ni vendues, ni partagées, ni utilisées pour de la publicité.</p>
  </li>
  <li><strong>Vos favoris, vos radios récentes et vos réglages restent sur votre appareil.</strong> Ils ne nous sont jamais envoyés. Sur iPhone et Mac, vos favoris sont aussi conservés dans votre propre compte iCloud, pour les retrouver sur vos autres appareils Apple et après une réinstallation de l’app : Apple les stocke, nous n’y avons jamais accès.</li>
  <li><strong>Ce à quoi l’app se connecte, et pourquoi :</strong>
    <ul>
      <li>les serveurs de diffusion des radios elles‑mêmes, pour écouter la radio choisie ;</li>
      <li>notre ${link(STATIONS_REPO, 'liste publique des radios')} (via jsDelivr ou GitHub), pour télécharger la liste des radios ;</li>
      <li>Radio Browser (radio-browser.info), quand vous cherchez une radio absente de la liste ;</li>
      <li>l’API iTunes Search (Apple), pour afficher la pochette du titre en cours ;</li>
      <li>Umami, pour les statistiques anonymes ci-dessus.</li>
    </ul>
    <p>Ces requêtes ne contiennent aucun identifiant vous concernant. Comme toute requête web, elles parviennent à ces serveurs depuis votre adresse IP ; leurs propres politiques de confidentialité s’appliquent.</p>
  </li>
  <li><strong>Notifications (Mac) :</strong> les bannières des titres sont créées sur votre Mac et ne sont envoyées nulle part.</li>
</ul>
<p>Nous ne vendons ni ne partageons aucune donnée, et ne conservons aucune donnée vous concernant : les statistiques ci-dessus sont des comptages anonymes.</p>
<p>Questions : ${link(ISSUES, 'ouvrez un ticket')}.</p>`,
  },
  de: {
    title: 'Datenschutzerklärung',
    meta: 'Skywave erhebt keine personenbezogenen Daten: kein Konto, keine Werbung, kein Tracking, nur anonyme Statistiken.',
    updated: (d) => `Zuletzt aktualisiert: ${d}`,
    body: () => html`
<p class="doc-lead">Skywave (iPhone, CarPlay und Mac) erhebt keine personenbezogenen Daten.</p>
<ul>
  <li><strong>Kein Konto, keine Werbung, kein Tracking.</strong> Die App enthält keine Werbe-SDKs, und nichts verfolgt dich über andere Apps oder Websites.</li>
  <li><strong>Anonyme Statistiken.</strong> Um zu wissen, welche Sender gehört und welche Funktionen genutzt werden, zählt die App (iPhone, CarPlay und Mac) einige Ereignisse mit ${link(UMAMI, 'Umami')}, und diese Website mit ${link(SCRUTER, 'Scruter')} (französisch, in Frankreich gehostet), beide ohne Cookies:
    <ul>
      <li>ein Sender, der angezeigt, abgespielt oder zu den Favoriten hinzugefügt wird: sein Name, Land und Genre, wo er gestartet wurde (Genres, Suche, Favoriten, CarPlay, Siri, ein Link) und die Plattform (iPhone, CarPlay, Mac, Android oder Website);</li>
      <li>das Öffnen der App über den Link eines Senders;</li>
      <li>auf dieser Website die angesehenen Seiten, wie lange und wie weit nach unten, und die Links zu anderen Websites (etwa zum App Store);</li>
      <li>eine Suche: wonach du gesucht hast, bereinigt und auf die ersten 20 Zeichen gekürzt (ohne E-Mail- oder Webadressen und lange Nummern), und ob sie etwas gefunden hat.</li>
    </ul>
    <p>Es wird keine Kennung von dir oder deinem Gerät gespeichert oder gesendet. Umami und Scruter unterscheiden Besuche ohne Cookies anhand deiner IP-Adresse und deines Browsers oder Systems, die sie nicht speichern. Diese Statistiken werden weder verkauft noch weitergegeben noch für Werbung genutzt.</p>
  </li>
  <li><strong>Deine Favoriten, zuletzt gehörten Sender und Einstellungen bleiben auf deinem Gerät.</strong> Sie werden nie an uns gesendet. Auf iPhone und Mac werden deine Favoriten außerdem in deinem eigenen iCloud-Konto gespeichert, damit du sie auf deinen anderen Apple-Geräten und nach einer Neuinstallation der App wiederfindest: Apple speichert sie, wir sehen sie nie.</li>
  <li><strong>Womit sich die App verbindet, und warum:</strong>
    <ul>
      <li>mit den Streaming-Servern der Sender selbst, um den gewählten Sender abzuspielen;</li>
      <li>mit unserer ${link(STATIONS_REPO, 'öffentlichen Senderliste')} (über jsDelivr oder GitHub), um die Senderliste zu laden;</li>
      <li>mit Radio Browser (radio-browser.info), wenn du einen Sender suchst, der nicht in der Liste ist;</li>
      <li>mit der iTunes Search API (Apple), um das Cover des laufenden Songs anzuzeigen;</li>
      <li>mit Umami, für die anonymen Statistiken oben.</li>
    </ul>
    <p>Diese Anfragen enthalten keine Kennung von dir oder deinem Gerät. Wie jede Webanfrage erreichen sie diese Server von deiner IP-Adresse aus; es gelten deren eigene Datenschutzerklärungen.</p>
  </li>
  <li><strong>Mitteilungen (Mac):</strong> Song-Banner werden auf deinem Mac erstellt und nirgendwohin gesendet.</li>
</ul>
<p>Wir verkaufen und teilen keine Daten und speichern keine Daten über dich: Die Statistiken oben sind anonyme Zählungen.</p>
<p>Fragen: ${link(ISSUES, 'eröffne ein Issue')}.</p>`,
  },
};

const SUPPORT = {
  en: {
    title: 'Support',
    meta: 'Need help with Skywave, found a bug, or a station is missing or doesn’t play? Tell us.',
    body: () => html`
<p class="doc-lead">Skywave plays 4,000 official live radio stations from 20 countries, on iPhone, CarPlay and Mac.</p>
<p><strong>Need help, found a bug, or a station is missing or doesn’t play?</strong> ${link(NEW_ISSUE, 'Open an issue')} and tell us the station name and country, your device and what happens.</p>
<p>The station list is refreshed every week; a station that stops working is usually fixed on the next update.</p>
<p>Privacy: Skywave collects no personal data. See the ${link(SITE.url(PRIVACY_PATHS.en), 'privacy policy')}.</p>`,
  },
  fr: {
    title: 'Assistance',
    meta: 'Besoin d’aide avec Skywave, un bug, une radio absente ou qui ne joue pas ? Dites‑le‑nous.',
    body: () => html`
<p class="doc-lead">Skywave diffuse 4 000 radios officielles en direct de 20 pays, sur iPhone, CarPlay et Mac.</p>
<p><strong>Besoin d’aide, un bug, une radio absente ou qui ne joue pas ?</strong> ${link(NEW_ISSUE, 'Ouvrez un ticket')} en précisant le nom de la radio et son pays, votre appareil et ce qui se passe.</p>
<p>La liste des radios est mise à jour chaque semaine : une radio qui ne fonctionne plus est en général corrigée à la mise à jour suivante.</p>
<p>Confidentialité : Skywave ne collecte aucune donnée personnelle. Voir la ${link(SITE.url(PRIVACY_PATHS.fr), 'politique de confidentialité')}.</p>`,
  },
  de: {
    title: 'Hilfe',
    meta: 'Brauchst du Hilfe mit Skywave, hast du einen Fehler gefunden, oder fehlt ein Sender oder spielt nicht? Sag es uns.',
    body: () => html`
<p class="doc-lead">Skywave spielt 4.000 offizielle Live-Radiosender aus 20 Ländern, auf iPhone, CarPlay und Mac.</p>
<p><strong>Brauchst du Hilfe, hast du einen Fehler gefunden, oder fehlt ein Sender oder spielt nicht?</strong> ${link(NEW_ISSUE, 'Eröffne ein Issue')} und nenne uns den Namen und das Land des Senders, dein Gerät und was passiert.</p>
<p>Die Senderliste wird jede Woche aktualisiert; ein Sender, der nicht mehr funktioniert, ist meist mit dem nächsten Update wieder da.</p>
<p>Datenschutz: Skywave erhebt keine personenbezogenen Daten. Siehe die ${link(SITE.url(PRIVACY_PATHS.de), 'Datenschutzerklärung')}.</p>`,
  },
};

function docPage(lang, paths, doc) {
  const alternates = { ...paths, 'x-default': paths.en };
  const body = html`
${nav(lang)}
<main class="doc">
  <h1>${esc(doc.title)}</h1>
  ${doc.updated ? `<p class="doc-date">${esc(doc.updated(date(lang)))}</p>` : ''}
  <div class="doc-body">${doc.body()}</div>
</main>`;
  return page({
    lang,
    path: paths[lang],
    title: `${doc.title} – Skywave`,
    description: doc.meta,
    body,
    alternates,
    bodyClass: 'doc-page',
    scripts: ['/js/site.js'],
  });
}

/** [path, html] of every privacy and support page. */
export const docPages = () =>
  LANGS.flatMap((lang) => [
    [PRIVACY_PATHS[lang], docPage(lang, PRIVACY_PATHS, PRIVACY[lang])],
    [SUPPORT_PATHS[lang], docPage(lang, SUPPORT_PATHS, SUPPORT[lang])],
  ]);
