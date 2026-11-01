// The privacy policy and the support page, in each language. App Store Connect links to them
// (supportUrl and privacyPolicyUrl in the app's store.config.json and store.mac.config.json):
// keep their addresses (PRIVACY_PATHS and SUPPORT_PATHS in html.mjs).
import { LANGS } from './i18n.mjs';
import { PRIVACY_PATHS, SUPPORT_PATHS, esc, html, nav, page } from './html.mjs';
import { SITE } from './site.mjs';

const ISSUES = 'https://github.com/WndrLabs/airwaves-stations/issues';
const NEW_ISSUE = `${ISSUES}/new`;
const STATIONS_REPO = 'https://github.com/WndrLabs/airwaves-stations';
const UPDATED = '2026-11-01';

const link = (href, text) => `<a href="${href}">${text}</a>`;
const date = (lang) =>
  new Intl.DateTimeFormat({ en: 'en-US', fr: 'fr-FR', de: 'de-DE' }[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(UPDATED),
  );

const PRIVACY = {
  en: {
    title: 'Privacy policy',
    meta: 'Skywave collects no personal data: no account, no ads, no analytics, no tracking.',
    updated: (d) => `Last updated: ${d}`,
    body: () => html`
<p class="doc-lead">Skywave (iPhone, CarPlay and Mac) collects no personal data.</p>
<ul>
  <li><strong>No account, no ads, no analytics, no tracking.</strong> The app contains no advertising or analytics SDK.</li>
  <li><strong>Your favorites, recent stations and settings stay on your device.</strong> They are never sent to us.</li>
  <li><strong>What the app connects to, and why:</strong>
    <ul>
      <li>the radio stations’ own streaming servers, to play the station you choose;</li>
      <li>our ${link(STATIONS_REPO, 'public station list')} (through jsDelivr or GitHub), to download the station list;</li>
      <li>Radio Browser (radio-browser.info), when you search for a station that isn’t in the list;</li>
      <li>the iTunes Search API (Apple), to show the cover of the song on air.</li>
    </ul>
    <p>These requests carry no identifier of you or your device. Like any web request, they reach those servers from your IP address; their own privacy policies apply.</p>
  </li>
  <li><strong>Notifications (Mac):</strong> song banners are created on your Mac and are not sent anywhere.</li>
</ul>
<p>We don’t sell, share or store any data about you, because we don’t have any.</p>
<p>Questions: ${link(ISSUES, 'open an issue')}.</p>`,
  },
  fr: {
    title: 'Politique de confidentialité',
    meta: 'Skywave ne collecte aucune donnée personnelle : sans compte, sans publicité, sans statistiques, sans pistage.',
    updated: (d) => `Dernière mise à jour : ${d}`,
    body: () => html`
<p class="doc-lead">Skywave (iPhone, CarPlay et Mac) ne collecte aucune donnée personnelle.</p>
<ul>
  <li><strong>Sans compte, sans publicité, sans statistiques, sans pistage.</strong> L’app ne contient aucun outil de publicité ni de mesure d’audience.</li>
  <li><strong>Vos favoris, vos radios récentes et vos réglages restent sur votre appareil.</strong> Ils ne nous sont jamais envoyés.</li>
  <li><strong>Ce à quoi l’app se connecte, et pourquoi :</strong>
    <ul>
      <li>les serveurs de diffusion des radios elles‑mêmes, pour écouter la radio choisie ;</li>
      <li>notre ${link(STATIONS_REPO, 'liste publique des radios')} (via jsDelivr ou GitHub), pour télécharger la liste des radios ;</li>
      <li>Radio Browser (radio-browser.info), quand vous cherchez une radio absente de la liste ;</li>
      <li>l’API iTunes Search (Apple), pour afficher la pochette du titre en cours.</li>
    </ul>
    <p>Ces requêtes ne contiennent aucun identifiant vous concernant. Comme toute requête web, elles parviennent à ces serveurs depuis votre adresse IP ; leurs propres politiques de confidentialité s’appliquent.</p>
  </li>
  <li><strong>Notifications (Mac) :</strong> les bannières des titres sont créées sur votre Mac et ne sont envoyées nulle part.</li>
</ul>
<p>Nous ne vendons, ne partageons ni ne conservons aucune donnée vous concernant : nous n’en avons pas.</p>
<p>Questions : ${link(ISSUES, 'ouvrez un ticket')}.</p>`,
  },
  de: {
    title: 'Datenschutzerklärung',
    meta: 'Skywave erhebt keine personenbezogenen Daten: kein Konto, keine Werbung, keine Statistiken, kein Tracking.',
    updated: (d) => `Zuletzt aktualisiert: ${d}`,
    body: () => html`
<p class="doc-lead">Skywave (iPhone, CarPlay und Mac) erhebt keine personenbezogenen Daten.</p>
<ul>
  <li><strong>Kein Konto, keine Werbung, keine Statistiken, kein Tracking.</strong> Die App enthält keine Werbe- oder Analyse-SDKs.</li>
  <li><strong>Deine Favoriten, zuletzt gehörten Sender und Einstellungen bleiben auf deinem Gerät.</strong> Sie werden nie an uns gesendet.</li>
  <li><strong>Womit sich die App verbindet, und warum:</strong>
    <ul>
      <li>mit den Streaming-Servern der Sender selbst, um den gewählten Sender abzuspielen;</li>
      <li>mit unserer ${link(STATIONS_REPO, 'öffentlichen Senderliste')} (über jsDelivr oder GitHub), um die Senderliste zu laden;</li>
      <li>mit Radio Browser (radio-browser.info), wenn du einen Sender suchst, der nicht in der Liste ist;</li>
      <li>mit der iTunes Search API (Apple), um das Cover des laufenden Songs anzuzeigen.</li>
    </ul>
    <p>Diese Anfragen enthalten keine Kennung von dir oder deinem Gerät. Wie jede Webanfrage erreichen sie diese Server von deiner IP-Adresse aus; es gelten deren eigene Datenschutzerklärungen.</p>
  </li>
  <li><strong>Mitteilungen (Mac):</strong> Song-Banner werden auf deinem Mac erstellt und nirgendwohin gesendet.</li>
</ul>
<p>Wir verkaufen, teilen und speichern keine Daten über dich – wir haben keine.</p>
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
