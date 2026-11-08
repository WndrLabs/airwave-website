// The privacy policy and the support page, in each language. App Store Connect links to them
// (supportUrl and privacyPolicyUrl in the app's store.config.json and store.mac.config.json):
// keep their addresses (PRIVACY_PATHS and SUPPORT_PATHS in html.mjs).
import { LANGS } from './i18n.mjs';
import { PRIVACY_PATHS, SUPPORT_PATHS, esc, html, nav, page } from './html.mjs';
import { SITE } from './site.mjs';

const ISSUES = 'https://github.com/WndrLabs/airwaves-stations/issues';
const NEW_ISSUE = `${ISSUES}/new`;
const STATIONS_REPO = 'https://github.com/WndrLabs/airwaves-stations';
const SCRUTER = 'https://scruter.net/privacy';
const UPDATED = '2026-11-08';

const link = (href, text) => `<a href="${href}">${text}</a>`;
const date = (lang) =>
  new Intl.DateTimeFormat({ en: 'en-US', fr: 'fr-FR', de: 'de-DE', es: 'es-ES' }[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(
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
  <li><strong>Anonymous statistics.</strong> To know which stations are listened to and which features are used, the app (iPhone, CarPlay and Mac) and this website count a few events with ${link(SCRUTER, 'Scruter')} (French, hosted in France), without cookies:
    <ul>
      <li>a station viewed, played or added to your favorites: its name, country and genre, where it was started from (genres, search, favorites, CarPlay, Siri, a link) and the platform (iPhone, CarPlay, Mac, Android or website);</li>
      <li>the app opened, and from where (its icon, a station link, the widget, a shortcut);</li>
      <li>in the app, the screens you open (genres, a list, search, favorites…) and how long you stay on each: their names only, never what they show nor what you type;</li>
      <li>in the app, crash reports and performance measurements (such as its launch time), with the app and system versions, to find and fix bugs;</li>
      <li>on this website, the pages you view, how long and how far down, and the links you follow to other sites (the App Store, for instance);</li>
      <li>a search: what you searched for, cleaned and cut to its first 20 characters (without e-mail or web addresses, nor long numbers), and whether it found something;</li>
      <li>in the iPhone app, if you installed it from one of our ads: Apple’s anonymous attribution report (which campaign led to the install, never who you are), which iOS sends to Scruter.</li>
    </ul>
    <p>No account, advertising identifier or device identifier is used. To tell visits apart, the app draws a random identifier each day and forgets it at midnight (on your device, it only keeps the day it was installed). On this website, Scruter tells visits apart without cookies, from your IP address and browser. Scruter keeps no IP address: it only derives your country and city from it. These statistics are not sold, not shared and not used for advertising.</p>
  </li>
  <li><strong>Your favorites, recent stations and settings stay on your device.</strong> They are never sent to us. On iPhone and Mac, your favorites are also kept in your own iCloud account, to find them on your other Apple devices and after reinstalling the app: Apple stores them, we never see them.</li>
  <li><strong>What the app connects to, and why:</strong>
    <ul>
      <li>the radio stations’ own streaming servers, to play the station you choose;</li>
      <li>our ${link(STATIONS_REPO, 'public station list')} (through jsDelivr or GitHub), to download the station list;</li>
      <li>Radio Browser (radio-browser.info), when you search for a station that isn’t in the list;</li>
      <li>the iTunes Search API (Apple), to show the cover of the song on air;</li>
      <li>Scruter, for the anonymous statistics and crash reports above.</li>
    </ul>
    <p>These requests carry no identifier of you or your device (the statistics only carry the random identifier of the day). Like any web request, they reach those servers from your IP address; their own privacy policies apply.</p>
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
  <li><strong>Statistiques anonymes.</strong> Pour savoir quelles radios sont écoutées et quelles fonctions servent, l’app (iPhone, CarPlay et Mac) et ce site comptent quelques événements avec ${link(SCRUTER, 'Scruter')} (français, hébergé en France), sans cookie :
    <ul>
      <li>une radio affichée, écoutée ou ajoutée aux favoris : son nom, son pays et son genre, d’où elle a été lancée (genres, recherche, favoris, CarPlay, Siri, un lien) et la plateforme (iPhone, CarPlay, Mac, Android ou site) ;</li>
      <li>l’ouverture de l’app, et d’où (son icône, le lien d’une radio, le widget, un raccourci) ;</li>
      <li>dans l’app, les écrans ouverts (genres, une liste, recherche, favoris…) et le temps passé sur chacun : leur nom seulement, jamais ce qu’ils affichent ni ce que vous tapez ;</li>
      <li>dans l’app, les rapports de plantage et des mesures de performance (comme son temps de lancement), avec les versions de l’app et du système, pour trouver et corriger les bugs ;</li>
      <li>sur ce site, les pages vues, combien de temps et jusqu’où, et les liens suivis vers d’autres sites (l’App Store, par exemple) ;</li>
      <li>une recherche : ce que vous avez cherché, nettoyé et limité à ses 20 premiers caractères (sans adresse e-mail ou web, ni long numéro), et si elle a trouvé quelque chose ;</li>
      <li>dans l’app iPhone, si vous l’avez installée depuis une de nos publicités : le rapport d’attribution anonyme d’Apple (quelle campagne a mené à l’installation, jamais qui vous êtes), qu’iOS envoie à Scruter.</li>
    </ul>
    <p>Aucun compte, identifiant publicitaire ou identifiant d’appareil n’est utilisé. Pour distinguer les visites, l’app tire chaque jour un identifiant au hasard et l’oublie à minuit (sur votre appareil, elle ne garde que le jour de son installation). Sur ce site, Scruter distingue les visites sans cookie, à partir de votre adresse IP et de votre navigateur. Scruter ne conserve aucune adresse IP : il n’en déduit que votre pays et votre ville. Ces statistiques ne sont ni vendues, ni partagées, ni utilisées pour de la publicité.</p>
  </li>
  <li><strong>Vos favoris, vos radios récentes et vos réglages restent sur votre appareil.</strong> Ils ne nous sont jamais envoyés. Sur iPhone et Mac, vos favoris sont aussi conservés dans votre propre compte iCloud, pour les retrouver sur vos autres appareils Apple et après une réinstallation de l’app : Apple les stocke, nous n’y avons jamais accès.</li>
  <li><strong>Ce à quoi l’app se connecte, et pourquoi :</strong>
    <ul>
      <li>les serveurs de diffusion des radios elles‑mêmes, pour écouter la radio choisie ;</li>
      <li>notre ${link(STATIONS_REPO, 'liste publique des radios')} (via jsDelivr ou GitHub), pour télécharger la liste des radios ;</li>
      <li>Radio Browser (radio-browser.info), quand vous cherchez une radio absente de la liste ;</li>
      <li>l’API iTunes Search (Apple), pour afficher la pochette du titre en cours ;</li>
      <li>Scruter, pour les statistiques anonymes et les rapports de plantage ci-dessus.</li>
    </ul>
    <p>Ces requêtes ne contiennent aucun identifiant vous concernant (les statistiques ne portent que l’identifiant au hasard du jour). Comme toute requête web, elles parviennent à ces serveurs depuis votre adresse IP ; leurs propres politiques de confidentialité s’appliquent.</p>
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
  <li><strong>Anonyme Statistiken.</strong> Um zu wissen, welche Sender gehört und welche Funktionen genutzt werden, zählen die App (iPhone, CarPlay und Mac) und diese Website einige Ereignisse mit ${link(SCRUTER, 'Scruter')} (französisch, in Frankreich gehostet), ohne Cookies:
    <ul>
      <li>ein Sender, der angezeigt, abgespielt oder zu den Favoriten hinzugefügt wird: sein Name, Land und Genre, wo er gestartet wurde (Genres, Suche, Favoriten, CarPlay, Siri, ein Link) und die Plattform (iPhone, CarPlay, Mac, Android oder Website);</li>
      <li>das Öffnen der App, und von wo (ihr Symbol, der Link eines Senders, das Widget, ein Kurzbefehl);</li>
      <li>in der App die geöffneten Bildschirme (Genres, eine Liste, Suche, Favoriten …) und wie lange du auf jedem bleibst: nur ihr Name, nie ihr Inhalt und nie, was du eingibst;</li>
      <li>in der App Absturzberichte und Leistungsmessungen (etwa ihre Startzeit), mit der App- und Systemversion, um Fehler zu finden und zu beheben;</li>
      <li>auf dieser Website die angesehenen Seiten, wie lange und wie weit nach unten, und die Links zu anderen Websites (etwa zum App Store);</li>
      <li>eine Suche: wonach du gesucht hast, bereinigt und auf die ersten 20 Zeichen gekürzt (ohne E-Mail- oder Webadressen und lange Nummern), und ob sie etwas gefunden hat;</li>
      <li>in der iPhone-App, wenn du sie über eine unserer Anzeigen installiert hast: Apples anonymer Attributionsbericht (welche Kampagne zur Installation geführt hat, nie wer du bist), den iOS an Scruter sendet.</li>
    </ul>
    <p>Es werden weder ein Konto noch eine Werbe- oder Gerätekennung verwendet. Um Besuche zu unterscheiden, erzeugt die App jeden Tag eine zufällige Kennung und verwirft sie um Mitternacht (auf deinem Gerät behält sie nur den Tag der Installation). Auf dieser Website unterscheidet Scruter Besuche ohne Cookies anhand deiner IP-Adresse und deines Browsers. Scruter speichert keine IP-Adresse: Es leitet daraus nur dein Land und deine Stadt ab. Diese Statistiken werden weder verkauft noch weitergegeben noch für Werbung genutzt.</p>
  </li>
  <li><strong>Deine Favoriten, zuletzt gehörten Sender und Einstellungen bleiben auf deinem Gerät.</strong> Sie werden nie an uns gesendet. Auf iPhone und Mac werden deine Favoriten außerdem in deinem eigenen iCloud-Konto gespeichert, damit du sie auf deinen anderen Apple-Geräten und nach einer Neuinstallation der App wiederfindest: Apple speichert sie, wir sehen sie nie.</li>
  <li><strong>Womit sich die App verbindet, und warum:</strong>
    <ul>
      <li>mit den Streaming-Servern der Sender selbst, um den gewählten Sender abzuspielen;</li>
      <li>mit unserer ${link(STATIONS_REPO, 'öffentlichen Senderliste')} (über jsDelivr oder GitHub), um die Senderliste zu laden;</li>
      <li>mit Radio Browser (radio-browser.info), wenn du einen Sender suchst, der nicht in der Liste ist;</li>
      <li>mit der iTunes Search API (Apple), um das Cover des laufenden Songs anzuzeigen;</li>
      <li>mit Scruter, für die anonymen Statistiken und Absturzberichte oben.</li>
    </ul>
    <p>Diese Anfragen enthalten keine Kennung von dir oder deinem Gerät (die Statistiken nur die zufällige Kennung des Tages). Wie jede Webanfrage erreichen sie diese Server von deiner IP-Adresse aus; es gelten deren eigene Datenschutzerklärungen.</p>
  </li>
  <li><strong>Mitteilungen (Mac):</strong> Song-Banner werden auf deinem Mac erstellt und nirgendwohin gesendet.</li>
</ul>
<p>Wir verkaufen und teilen keine Daten und speichern keine Daten über dich: Die Statistiken oben sind anonyme Zählungen.</p>
<p>Fragen: ${link(ISSUES, 'eröffne ein Issue')}.</p>`,
  },
  es: {
    title: 'Política de privacidad',
    meta: 'Skywave no recopila datos personales: sin cuenta, sin anuncios, sin rastreo, solo estadísticas anónimas.',
    updated: (d) => `Última actualización: ${d}`,
    body: () => html`
<p class="doc-lead">Skywave (iPhone, CarPlay y Mac) no recopila datos personales.</p>
<ul>
  <li><strong>Sin cuenta, sin anuncios, sin rastreo.</strong> La app no contiene ningún SDK publicitario, y nada te sigue de una app o de un sitio web a otro.</li>
  <li><strong>Estadísticas anónimas.</strong> Para saber qué emisoras se escuchan y qué funciones se usan, la app (iPhone, CarPlay y Mac) y este sitio web cuentan algunos eventos con ${link(SCRUTER, 'Scruter')} (francés, alojado en Francia), sin cookies:
    <ul>
      <li>una emisora vista, escuchada o añadida a favoritas: su nombre, país y género, desde dónde se inició (géneros, búsqueda, favoritas, CarPlay, Siri, un enlace) y la plataforma (iPhone, CarPlay, Mac, Android o sitio web);</li>
      <li>la apertura de la app, y desde dónde (su icono, el enlace de una emisora, el widget, un atajo);</li>
      <li>en la app, las pantallas que abres (géneros, una lista, búsqueda, favoritas…) y el tiempo que pasas en cada una: solo sus nombres, nunca lo que muestran ni lo que escribes;</li>
      <li>en la app, los informes de fallos y medidas de rendimiento (como su tiempo de arranque), con las versiones de la app y del sistema, para encontrar y corregir errores;</li>
      <li>en este sitio web, las páginas que ves, cuánto tiempo y hasta dónde, y los enlaces que sigues hacia otros sitios (el App Store, por ejemplo);</li>
      <li>una búsqueda: lo que buscaste, limpio y recortado a sus 20 primeros caracteres (sin direcciones de correo o web, ni números largos), y si encontró algo;</li>
      <li>en la app de iPhone, si la instalaste desde uno de nuestros anuncios: el informe de atribución anónimo de Apple (qué campaña llevó a la instalación, nunca quién eres), que iOS envía a Scruter.</li>
    </ul>
    <p>No se usa ninguna cuenta, identificador publicitario ni identificador del dispositivo. Para distinguir las visitas, la app genera cada día un identificador aleatorio y lo olvida a medianoche (en tu dispositivo solo guarda el día en que se instaló). En este sitio web, Scruter distingue las visitas sin cookies, a partir de tu dirección IP y de tu navegador. Scruter no guarda ninguna dirección IP: solo deduce de ella tu país y tu ciudad. Estas estadísticas no se venden, no se comparten y no se usan para publicidad.</p>
  </li>
  <li><strong>Tus favoritas, tus emisoras recientes y tus ajustes se quedan en tu dispositivo.</strong> Nunca nos llegan. En iPhone y Mac, tus favoritas también se guardan en tu propia cuenta de iCloud, para encontrarlas en tus otros dispositivos Apple y después de reinstalar la app: Apple las almacena, nosotros nunca las vemos.</li>
  <li><strong>A qué se conecta la app, y por qué:</strong>
    <ul>
      <li>los servidores de streaming de las propias emisoras, para reproducir la emisora que eliges;</li>
      <li>nuestra ${link(STATIONS_REPO, 'lista pública de emisoras')} (a través de jsDelivr o GitHub), para descargar la lista de emisoras;</li>
      <li>Radio Browser (radio-browser.info), cuando buscas una emisora que no está en la lista;</li>
      <li>la API iTunes Search (Apple), para mostrar la portada de la canción al aire;</li>
      <li>Scruter, para las estadísticas anónimas y los informes de fallos de arriba.</li>
    </ul>
    <p>Estas solicitudes no llevan ningún identificador tuyo ni de tu dispositivo (las estadísticas solo llevan el identificador aleatorio del día). Como cualquier solicitud web, llegan a esos servidores desde tu dirección IP; se aplican sus propias políticas de privacidad.</p>
  </li>
  <li><strong>Notificaciones (Mac):</strong> los avisos de las canciones se crean en tu Mac y no se envían a ningún sitio.</li>
</ul>
<p>No vendemos ni compartimos ningún dato, y no guardamos ningún dato sobre ti: las estadísticas de arriba son recuentos anónimos.</p>
<p>Preguntas: ${link(ISSUES, 'abre una incidencia')}.</p>`,
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
  es: {
    title: 'Soporte',
    meta: '¿Necesitas ayuda con Skywave, encontraste un error, o falta una emisora o no suena? Cuéntanoslo.',
    body: () => html`
<p class="doc-lead">Skywave reproduce más de 4500 emisoras oficiales en vivo de 21 países, en iPhone, CarPlay y Mac.</p>
<p><strong>¿Necesitas ayuda, encontraste un error, o falta una emisora o no suena?</strong> ${link(NEW_ISSUE, 'Abre una incidencia')} y cuéntanos el nombre y el país de la emisora, tu dispositivo y qué ocurre.</p>
<p>La lista de emisoras se actualiza cada semana: una emisora que deja de funcionar suele quedar corregida en la siguiente actualización.</p>
<p>Privacidad: Skywave no recopila datos personales. Consulta la ${link(SITE.url(PRIVACY_PATHS.es), 'política de privacidad')}.</p>`,
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
