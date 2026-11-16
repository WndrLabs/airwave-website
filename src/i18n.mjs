// Every text of the site, per language. English is the reference; French, German and Spanish have
// the same keys. Genre and country names come from the app (src/data.mjs). Runs in Node and in the
// browser (pages of the less popular stations are made there).
import { NAMES } from './data.mjs';

export const LANGS = ['en', 'fr', 'de', 'es'];

/** The language of a station's or country's page: the country's own, when the site has it. */
export const COUNTRY_LANG = { FR: 'fr', BE: 'fr', SN: 'fr', CI: 'fr', MA: 'fr', DE: 'de', CH: 'de', AT: 'de', ES: 'es', MX: 'es' };
export const langOf = (country) => COUNTRY_LANG[country] ?? 'en';

const cap = (text) => text.charAt(0).toUpperCase() + text.slice(1);
/** English: "in the United States", "in France". */
const EN_THE = { US: 'the United States', GB: 'the United Kingdom', NL: 'the Netherlands' };
const enPlace = (code) => EN_THE[code] ?? NAMES.en.countries[code] ?? code;
/** The same from a country's English name: "the United States", "France". */
const the = (name) => EN_THE[Object.keys(NAMES.en.countries).find((c) => NAMES.en.countries[c] === name)] ?? name;
/** French, for the countries whose pages are in French: "en France", "au Sénégal". */
const FR_IN = { FR: 'en France', BE: 'en Belgique', SN: 'au Sénégal', CI: 'en Côte d’Ivoire', MA: 'au Maroc' };
const frIn = (code) => FR_IN[code] ?? `(${NAMES.fr.countries[code] ?? code})`;
/** German: "aus der Schweiz", "in Österreich". */
const DE_AUS = { DE: 'aus Deutschland', CH: 'aus der Schweiz', AT: 'aus Österreich' };
const DE_IN = { DE: 'in Deutschland', CH: 'in der Schweiz', AT: 'in Österreich' };
const deAus = (code) => DE_AUS[code] ?? `aus ${NAMES.de.countries[code] ?? code}`;
const deIn = (code) => DE_IN[code] ?? `in ${NAMES.de.countries[code] ?? code}`;
/** Spanish: "en España", and "de España", "de México". */
const esEn = (code) => `en ${NAMES.es.countries[code] ?? code}`;
/** Spanish: "de España", "de México". */
const esDe = (code) => `de ${NAMES.es.countries[code] ?? code}`;

const en = {
  locale: 'en_US',
  kbps: 'kbps',
  htmlLang: 'en',
  langName: 'English',
  appStore: 'Download on the App Store',
  appStoreShort: 'App Store',
  nav: {
    features: 'Features',
    carplay: 'CarPlay',
    mac: 'Mac',
    stations: 'Stations',
    xmas: 'Christmas',
    xmasFooter: 'Christmas radio',
  },
  xmasBanner: { title: 'Christmas radio is on', text: 'Carols, crooners and Christmas hits, live from around the world.', cta: 'Listen' },
  meta: {
    title: 'Skywave Radio – Live radio for iPhone, CarPlay & Mac',
    description:
      '4,500+ official radio stations from 21 countries, the most listened first. Made for CarPlay, with a home screen widget and a Mac menu bar app. No account, no ads, no tracking.',
  },
  hero: {
    kicker: 'Live radio for iPhone, CarPlay & Mac',
    title: ['Every station.', 'One tap away.'],
    text: '4,500+ official radio streams from 21 countries, sorted by genre. In your pocket, on the road, in your menu bar.',
    free: 'Free · No account · No ads',
  },
  stats: [
    [0, 'official stations'],
    [0, 'countries'],
    [0, 'genres'],
    [0, 'ads'],
  ],
  features: {
    carplay: {
      kicker: 'CarPlay',
      title: ['Start the car.', 'Your radio’s on.'],
      text: 'Skywave picks up your last station as soon as you start the car, and reconnects on its own after a tunnel or a dead zone, with a 30‑second buffer on HD streams.',
      points: ['Your last station as you start', 'Reconnects on its own', 'Steering wheel and Siri controls'],
    },
    widget: {
      kicker: 'Widget',
      title: ['Your favorites,', 'one tap away.'],
      text: 'The widget starts your favorite station right from the Home Screen, without opening the app. One more tap pauses it.',
    },
    songs: {
      kicker: 'On air',
      title: ['What’s', 'this song?'],
      text: 'Title, artist and cover, live: in the app, on the Lock Screen and in the car. Find them in Recent Songs and play them again in Spotify or Apple Music.',
    },
    world: {
      kicker: 'Browse',
      title: ['4,500+ stations.', 'Most listened first.'],
      text: '21 countries, sorted by genre and ranked by each country’s real audience. Every stream comes from the broadcaster itself and is checked every week.',
      points: ['Official streams, checked weekly', 'Your country first, then the world', 'Search by name, genre or country'],
    },
    mac: {
      kicker: 'Mac',
      title: ['In your', 'menu bar, too.'],
      text: 'One click on the wave, no window in the way. Songs scroll by in the menu bar, and your favorites sync between your iPhone and your Mac through iCloud.',
    },
  },
  more: {
    title: 'And more.',
    items: [
      ['siri', 'Siri & Shortcuts', 'Ask Siri for a station, or start one from Spotlight and Shortcuts.'],
      ['cast', 'Chromecast & AirPlay', 'Send the radio to a Chromecast or an AirPlay speaker.'],
      ['moon', 'Sleep timer', 'The radio stops on its own after 15 to 90 minutes.'],
      ['cloud', 'Favorites in iCloud', 'They follow you on iPhone and Mac, even after reinstalling the app.'],
    ],
  },
  soon: 'Android · coming soon',
  macAppStore: 'Download on the Mac App Store',
  privacy: {
    title: 'No account. No ads. No tracking.',
    text: 'Your favorites stay on your devices and in your own iCloud. No account, no tracking: only anonymous listening statistics.',
  },
  countrySection: { title: 'Radio from 21 countries', text: 'Browse the stations of a country.' },
  cta: { title: 'Tune in.', text: 'Skywave is free on the App Store, for iPhone and Mac.' },
  footer: { privacy: 'Privacy', support: 'Support', guides: 'Guides', made: 'Made with care by WndrLabs.' },
  /** Links to the guides (src/guides.mjs) from the landing page. */
  guideLinks: { carplay: 'The CarPlay guide', mac: 'The Mac menu bar guide', abroad: 'Radio from home while you’re abroad' },
  station: {
    title: (name) => `${name} – Listen live`,
    titleXmas: (name) => `${name} – Christmas radio, listen live free`,
    description: (name, country, genres) =>
      `Listen to ${name} live, the official stream from ${country}${genres ? ` (${genres})` : ''}. Free on iPhone, CarPlay and Mac with Skywave.`,
    live: 'Live',
    play: 'Play',
    pause: 'Pause',
    loading: 'Connecting…',
    unavailable: 'This stream plays in the Skywave app.',
    openApp: 'Listen in Skywave',
    getApp: 'Get Skywave, free',
    website: 'Station website',
    about: (name, country) =>
      `${name} is a radio station from ${the(country)}. Listen live for free in Skywave, on iPhone, in your car with CarPlay and on your Mac. The stream comes from the broadcaster itself.`,
    more: (genre, country) => `More ${genre} in ${the(country)}`,
    moreCountry: (country) => `More stations in ${the(country)}`,
    allIn: (country) => `All stations in ${the(country)}`,
    /** Its place in Skywave's lists (the most listened first), in its country and its genre there. */
    rank: (code, rank, total, g, grank, gtotal) =>
      `In Skywave, where the most listened stations come first, it is number ${rank} of ${total} in ${enPlace(code)}${g ? `, and number ${grank} of ${gtotal} for ${g}` : ''}.`,
    quality: (q) => `Stream: ${q}.`,
    pitch: 'Skywave: 4,000 stations, made for CarPlay.',
  },
  country: {
    title: (country) => `${country} radio stations – Listen live`,
    description: (country, n) =>
      `${n} official radio stations from ${the(country)}, sorted by genre. Listen live for free with Skywave on iPhone, CarPlay and Mac.`,
    heading: (country) => `Radio in ${the(country)}`,
    intro: (country, n, top) =>
      `Listen live to ${n} radio stations from ${the(country)}, free: ${top} and many more, sorted by genre. Every stream comes from the broadcaster itself and is checked every week. In Skywave, they play on iPhone, in the car with CarPlay and on Mac.`,
    count: (n) => `${n} stations`,
  },
  /** A country's genre (/radios/france/jazz/): `g` is the genre as said before "radio". */
  genrePage: {
    phrase: {
      rap: 'rap', hiphop: 'hip-hop', rnb: 'R&B and soul', pop: 'pop', rock: 'rock', country: 'country',
      electro: 'electronic', jazz: 'jazz', classical: 'classical', reggae: 'reggae', afro: 'Afro', latin: 'Latin',
      oldies: 'oldies', news: 'news', talk: 'talk', sports: 'sports', kids: 'kids', variety: 'variety',
    },
    title: (g, code) => `${cap(g)} radio in ${enPlace(code)} – Listen live`,
    description: (g, code, n) =>
      `${n} ${g} radio stations from ${enPlace(code)}, live and free, the most listened first. Listen here, or with Skywave on iPhone, CarPlay and Mac.`,
    heading: (g, code) => `${cap(g)} radio in ${enPlace(code)}`,
    intro: (g, code, n, top) =>
      `Listen live to ${n} ${g} radio stations from ${enPlace(code)}, free: ${top} and more, the most listened first. Tap one to listen right here, or take them everywhere with Skywave on iPhone, in the car with CarPlay and on Mac.`,
    otherGenres: (code) => `More radio in ${enPlace(code)}`,
    elsewhere: (g) => `${cap(g)} radio in other countries`,
    seeAll: (g, n) => `All ${n} ${g} stations`,
  },
  notFound: {
    title: 'Station not found',
    text: 'This page has moved, or the station is no longer on air. Find it, and 4,000 others, in Skywave.',
    home: 'Back to the home page',
  },
};

const fr = {
  locale: 'fr_FR',
  kbps: 'kb/s',
  htmlLang: 'fr',
  langName: 'Français',
  appStore: 'Télécharger dans l’App Store',
  appStoreShort: 'App Store',
  nav: {
    features: 'Fonctions',
    carplay: 'CarPlay',
    mac: 'Mac',
    stations: 'Radios',
    xmas: 'Noël',
    xmasFooter: 'Radios de Noël',
  },
  xmasBanner: { title: 'Les radios de Noël sont là', text: 'Chants de Noël, crooners et tubes de fêtes, en direct du monde entier.', cta: 'Écouter' },
  meta: {
    title: 'Skywave Radio – Écouter la radio en direct sur iPhone, CarPlay et Mac',
    description:
      'Plus de 4 500 radios officielles dans 21 pays, les plus écoutées d’abord. Pensée pour CarPlay, avec un widget et une app dans la barre des menus du Mac. Sans compte, sans pub, sans pistage.',
  },
  hero: {
    kicker: 'La radio en direct sur iPhone, CarPlay et Mac',
    title: ['Toutes les radios.', 'En un geste.'],
    text: 'Plus de 4 500 flux officiels dans 21 pays, rangés par genre. Dans la poche, sur la route, dans la barre des menus.',
    free: 'Gratuit · Sans compte · Sans pub',
  },
  stats: [
    [0, 'radios officielles'],
    [0, 'pays'],
    [0, 'genres'],
    [0, 'pub'],
  ],
  features: {
    carplay: {
      kicker: 'CarPlay',
      title: ['Mettez le contact,', 'c’est parti.'],
      text: 'Skywave reprend votre dernière radio dès que vous démarrez, et se reconnecte toute seule après un tunnel ou une zone blanche, avec 30 secondes de réserve sur les flux HD.',
      points: ['Votre dernière radio au démarrage', 'Se reconnecte toute seule', 'Commandes au volant et Siri'],
    },
    widget: {
      kicker: 'Widget',
      title: ['Vos favoris', 'en un geste.'],
      text: 'Le widget lance votre radio préférée depuis l’écran d’accueil, sans ouvrir l’app. Un geste de plus la met en pause.',
    },
    songs: {
      kicker: 'À l’antenne',
      title: ['Ce titre,', 'c’est quoi ?'],
      text: 'Titre, artiste et pochette en direct : dans l’app, sur l’écran verrouillé et dans la voiture. Retrouvez-les dans Titres récents et réécoutez-les dans Spotify ou Apple Music.',
    },
    world: {
      kicker: 'Parcourir',
      title: ['Plus de 4 500 radios.', 'Les plus écoutées d’abord.'],
      text: '21 pays, triées par genre et classées selon l’audience réelle de chaque pays. Chaque flux vient de la radio elle-même et il est vérifié chaque semaine.',
      points: ['Des flux officiels, vérifiés chaque semaine', 'Votre pays d’abord, puis le monde', 'Recherche par nom, genre ou pays'],
    },
    mac: {
      kicker: 'Mac',
      title: ['Aussi dans votre', 'barre des menus.'],
      text: 'Un clic sur la vague, aucune fenêtre dans le chemin. Les titres défilent dans la barre des menus, et vos favoris se synchronisent entre iPhone et Mac par iCloud.',
    },
  },
  more: {
    title: 'Et aussi.',
    items: [
      ['siri', 'Siri et Raccourcis', 'Demandez une radio à Siri, ou lancez-la depuis Spotlight et Raccourcis.'],
      ['cast', 'Chromecast et AirPlay', 'Envoyez la radio sur un Chromecast ou une enceinte AirPlay.'],
      ['moon', 'Minuterie de veille', 'La radio s’arrête toute seule au bout de 15 à 90 minutes.'],
      ['cloud', 'Favoris dans iCloud', 'Ils vous suivent sur iPhone et Mac, même après une réinstallation.'],
    ],
  },
  soon: 'Android · bientôt',
  macAppStore: 'Télécharger dans le Mac App Store',
  privacy: {
    title: 'Sans compte. Sans pub. Sans pistage.',
    text: 'Vos favoris restent sur vos appareils et dans votre propre iCloud. Sans compte, sans pistage : seulement des statistiques d’écoute anonymes.',
  },
  countrySection: { title: 'La radio de 21 pays', text: 'Parcourez les radios d’un pays.' },
  cta: { title: 'À l’écoute.', text: 'Skywave est gratuite sur l’App Store, pour iPhone et Mac.' },
  footer: { privacy: 'Confidentialité', support: 'Assistance', guides: 'Guides', made: 'Fait avec soin par WndrLabs.' },
  guideLinks: { carplay: 'Le guide CarPlay', mac: 'Le guide de la barre des menus', abroad: 'Écouter la radio française à l’étranger' },
  station: {
    title: (name) => `${name} – Écouter en direct`,
    titleXmas: (name) => `${name} – Radio de Noël en direct et gratuite`,
    description: (name, country, genres) =>
      `Écoutez ${name} en direct, le flux officiel (${country}${genres ? `, ${genres}` : ''}). Gratuit sur iPhone, CarPlay et Mac avec Skywave.`,
    live: 'En direct',
    play: 'Écouter',
    pause: 'Pause',
    loading: 'Connexion…',
    unavailable: 'Ce flux s’écoute dans l’app Skywave.',
    openApp: 'Écouter dans Skywave',
    getApp: 'Obtenir Skywave, gratuit',
    website: 'Site de la radio',
    about: (name, country) =>
      `${name} est une radio (${country}). Écoutez‑la gratuitement en direct dans Skywave, sur iPhone, en voiture avec CarPlay et sur Mac. Le flux vient du diffuseur lui‑même.`,
    more: (genre, country) => `Plus de ${genre} · ${country}`,
    moreCountry: (country) => `Autres radios · ${country}`,
    allIn: (country) => `Toutes les radios · ${country}`,
    rank: (code, rank, total, g, grank, gtotal) =>
      `Dans Skywave, où les radios les plus écoutées passent en premier, elle est n°${rank} sur ${total} ${frIn(code)}${g ? `, et n°${grank} sur ${gtotal} parmi les radios ${g}` : ''}.`,
    quality: (q) => `Flux : ${q}.`,
    pitch: 'Skywave : 4 000 radios, pensée pour CarPlay.',
  },
  country: {
    title: (country) => `Radios ${country} – Écouter en direct`,
    description: (country, n) =>
      `${n} radios officielles (${country}), rangées par genre. Écoutez‑les gratuitement en direct avec Skywave sur iPhone, CarPlay et Mac.`,
    heading: (country) => `Radios · ${country}`,
    intro: (country, n, top) =>
      `Écoutez gratuitement ${n} radios en direct (${country}) : ${top} et bien d’autres, rangées par genre. Chaque flux vient du diffuseur lui‑même et il est vérifié chaque semaine. Dans Skywave, elles s’écoutent sur iPhone, en voiture avec CarPlay et sur Mac.`,
    count: (n) => `${n} radios`,
  },
  /** A country's genre (/radios/france/jazz/): `g` is the genre as said after « Radios ». */
  genrePage: {
    phrase: {
      rap: 'rap', hiphop: 'hip-hop', rnb: 'R&B et soul', pop: 'pop', rock: 'rock', country: 'country',
      electro: 'électro', jazz: 'jazz', classical: 'de musique classique', reggae: 'reggae', afro: 'afro',
      latin: 'latino', oldies: 'rétro', news: 'd’info', talk: 'talk', sports: 'de sport', kids: 'pour enfants',
      variety: 'de variétés',
    },
    title: (g, code) => `Radios ${g} ${frIn(code)} – Écouter en direct`,
    description: (g, code, n) =>
      `${n} radios ${g} ${frIn(code)}, en direct et gratuites, les plus écoutées d’abord. Écoutez‑les ici ou avec Skywave sur iPhone, CarPlay et Mac.`,
    heading: (g, code) => `Radios ${g} ${frIn(code)}`,
    intro: (g, code, n, top) =>
      `Écoutez gratuitement ${n} radios ${g} en direct ${frIn(code)} : ${top} et d’autres, les plus écoutées d’abord. Touchez une radio pour l’écouter ici, ou emportez‑les partout avec Skywave sur iPhone, en voiture avec CarPlay et sur Mac.`,
    otherGenres: (code) => `Autres radios ${frIn(code)}`,
    elsewhere: (g) => `Radios ${g} dans d’autres pays`,
    seeAll: (g, n) => `Les ${n} radios ${g}`,
  },
  notFound: {
    title: 'Radio introuvable',
    text: 'Cette page a changé d’adresse, ou la radio n’émet plus. Retrouvez‑la, et 4 000 autres, dans Skywave.',
    home: 'Retour à l’accueil',
  },
};

const de = {
  locale: 'de_DE',
  kbps: 'kbit/s',
  htmlLang: 'de',
  langName: 'Deutsch',
  appStore: 'Laden im App Store',
  appStoreShort: 'App Store',
  nav: {
    features: 'Funktionen',
    carplay: 'CarPlay',
    mac: 'Mac',
    stations: 'Sender',
    xmas: 'Weihnachten',
    xmasFooter: 'Weihnachtsradio',
  },
  xmasBanner: { title: 'Weihnachtsradio ist da', text: 'Weihnachtslieder, Crooner und Hits zum Fest – live aus aller Welt.', cta: 'Reinhören' },
  meta: {
    title: 'Skywave Radio – Radio live hören auf iPhone, CarPlay & Mac',
    description:
      'Über 4.500 offizielle Radiosender aus 21 Ländern, die beliebtesten zuerst. Gemacht für CarPlay, mit Widget und einer Mac-App in der Menüleiste. Kein Konto, keine Werbung, kein Tracking.',
  },
  hero: {
    kicker: 'Live-Radio für iPhone, CarPlay & Mac',
    title: ['Alle Sender.', 'Ein Tipp.'],
    text: 'Über 4.500 offizielle Streams aus 21 Ländern, nach Genre sortiert. In der Tasche, im Auto, in der Menüleiste.',
    free: 'Kostenlos · Kein Konto · Keine Werbung',
  },
  stats: [
    [0, 'offizielle Sender'],
    [0, 'Länder'],
    [0, 'Genres'],
    [0, 'Werbung'],
  ],
  features: {
    carplay: {
      kicker: 'CarPlay',
      title: ['Motor an,', 'Radio läuft.'],
      text: 'Skywave startet deinen letzten Sender, sobald du losfährst, und verbindet sich nach Tunneln und Funklöchern von selbst neu – mit 30 Sekunden Puffer bei HD-Streams.',
      points: ['Dein letzter Sender beim Losfahren', 'Verbindet sich von selbst neu', 'Lenkrad- und Siri-Steuerung'],
    },
    widget: {
      kicker: 'Widget',
      title: ['Deine Favoriten,', 'ein Tipp.'],
      text: 'Das Widget startet deinen Lieblingssender direkt vom Home-Bildschirm, ohne die App zu öffnen. Ein weiterer Tipp pausiert ihn.',
    },
    songs: {
      kicker: 'On Air',
      title: ['Welcher Song', 'ist das?'],
      text: 'Titel, Interpret und Cover live: in der App, auf dem Sperrbildschirm und im Auto. Finde sie unter „Zuletzt“ und hör sie in Spotify oder Apple Music nochmal.',
    },
    world: {
      kicker: 'Entdecken',
      title: ['Über 4.500 Sender.', 'Die beliebtesten zuerst.'],
      text: '21 Länder, nach Genre sortiert und nach der echten Reichweite im jeweiligen Land gereiht. Jeder Stream kommt vom Sender selbst und wird jede Woche geprüft.',
      points: ['Offizielle Streams, jede Woche geprüft', 'Dein Land zuerst, dann die Welt', 'Suche nach Name, Genre oder Land'],
    },
    mac: {
      kicker: 'Mac',
      title: ['Auch in deiner', 'Menüleiste.'],
      text: 'Ein Klick auf die Welle, kein Fenster im Weg. Die Titel laufen durch die Menüleiste, und deine Favoriten synchronisieren sich über iCloud zwischen iPhone und Mac.',
    },
  },
  more: {
    title: 'Und noch mehr.',
    items: [
      ['siri', 'Siri & Kurzbefehle', 'Frag Siri nach einem Sender oder starte ihn über Spotlight und Kurzbefehle.'],
      ['cast', 'Chromecast & AirPlay', 'Schick das Radio an einen Chromecast oder einen AirPlay-Lautsprecher.'],
      ['moon', 'Schlaf-Timer', 'Das Radio stoppt nach 15 bis 90 Minuten von selbst.'],
      ['cloud', 'Favoriten in iCloud', 'Sie begleiten dich auf iPhone und Mac, auch nach einer Neuinstallation.'],
    ],
  },
  soon: 'Android · bald verfügbar',
  macAppStore: 'Laden im Mac App Store',
  privacy: {
    title: 'Kein Konto. Keine Werbung. Kein Tracking.',
    text: 'Deine Favoriten bleiben auf deinen Geräten und in deiner eigenen iCloud. Kein Konto, kein Tracking – nur anonyme Hörstatistiken.',
  },
  countrySection: { title: 'Radio aus 21 Ländern', text: 'Entdecke die Sender eines Landes.' },
  cta: { title: 'Einschalten.', text: 'Skywave ist kostenlos im App Store, für iPhone und Mac.' },
  footer: { privacy: 'Datenschutz', support: 'Hilfe', guides: 'Ratgeber', made: 'Mit Sorgfalt gemacht von WndrLabs.' },
  guideLinks: { carplay: 'Der CarPlay-Ratgeber', mac: 'Der Ratgeber zur Menüleiste', abroad: 'Deutsches Radio im Ausland hören' },
  station: {
    title: (name) => `${name} – Live hören`,
    titleXmas: (name) => `${name} – Weihnachtsradio kostenlos live hören`,
    description: (name, country, genres) =>
      `Höre ${name} live, der offizielle Stream (${country}${genres ? `, ${genres}` : ''}). Kostenlos auf iPhone, CarPlay und Mac mit Skywave.`,
    live: 'Live',
    play: 'Abspielen',
    pause: 'Pause',
    loading: 'Verbinde…',
    unavailable: 'Dieser Stream läuft in der Skywave-App.',
    openApp: 'In Skywave hören',
    getApp: 'Skywave laden, kostenlos',
    website: 'Website des Senders',
    about: (name, country) =>
      `${name} ist ein Radiosender (${country}). Höre ihn kostenlos live in Skywave – auf dem iPhone, im Auto mit CarPlay und auf dem Mac. Der Stream kommt direkt vom Sender.`,
    more: (genre, country) => `Mehr ${genre} · ${country}`,
    moreCountry: (country) => `Weitere Sender · ${country}`,
    allIn: (country) => `Alle Sender · ${country}`,
    rank: (code, rank, total, g, grank, gtotal, genreName) =>
      `In Skywave, wo die meistgehörten Sender zuerst kommen, belegt er Platz ${rank} von ${total} ${deIn(code)}${g ? ` und Platz ${grank} von ${gtotal} im Genre ${genreName}` : ''}.`,
    quality: (q) => `Stream: ${q}.`,
    pitch: 'Skywave: 4.000 Sender, gemacht für CarPlay.',
  },
  country: {
    title: (country) => `Radiosender ${country} – Live hören`,
    description: (country, n) =>
      `${n} offizielle Radiosender (${country}), nach Genre sortiert. Kostenlos live hören mit Skywave auf iPhone, CarPlay und Mac.`,
    heading: (country) => `Radio · ${country}`,
    intro: (country, n, top) =>
      `Höre ${n} Radiosender (${country}) kostenlos live: ${top} und viele mehr, nach Genre sortiert. Jeder Stream kommt direkt vom Sender und wird jede Woche geprüft. In Skywave laufen sie auf dem iPhone, im Auto mit CarPlay und auf dem Mac.`,
    count: (n) => `${n} Sender`,
  },
  /** A country's genre (/radios/germany/jazz/): `g` is the genre's radio, "Jazz-Radio". */
  genrePage: {
    phrase: {
      rap: 'Rap-Radio', hiphop: 'Hip-Hop-Radio', rnb: 'R&B- und Soul-Radio', pop: 'Pop-Radio', rock: 'Rock-Radio',
      country: 'Country-Radio', electro: 'Electro-Radio', jazz: 'Jazz-Radio', classical: 'Klassik-Radio',
      reggae: 'Reggae-Radio', afro: 'Afro-Radio', latin: 'Latin-Radio', oldies: 'Oldies-Radio', news: 'Nachrichtenradio',
      talk: 'Talkradio', sports: 'Sportradio', kids: 'Kinderradio', variety: 'Unterhaltungsradio',
    },
    title: (g, code) => `${g} ${deAus(code)} – live hören`,
    description: (g, code, n) =>
      `${g} ${deAus(code)}: ${n} Sender live und kostenlos, die beliebtesten zuerst. Hier reinhören oder mit Skywave auf iPhone, CarPlay und Mac.`,
    heading: (g, code) => `${g} ${deAus(code)}`,
    intro: (g, code, n, top) =>
      `Höre ${n} Sender kostenlos live: ${top} und weitere, die beliebtesten zuerst. Tippe auf einen Sender, um ihn hier zu hören, oder nimm sie mit Skywave überallhin mit – auf dem iPhone, im Auto mit CarPlay und auf dem Mac.`,
    otherGenres: (code) => `Mehr Radio ${deIn(code)}`,
    elsewhere: (g) => `${g} aus anderen Ländern`,
    seeAll: (g, n) => `Alle ${n} Sender: ${g}`,
  },
  notFound: {
    title: 'Sender nicht gefunden',
    text: 'Diese Seite ist umgezogen, oder der Sender ist nicht mehr auf Sendung. Finde ihn – und 4.000 weitere – in Skywave.',
    home: 'Zur Startseite',
  },
};

/**
 * Spanish, for Spain and Latin America alike (Mexico first). Station and country pages say "en
 * directo" for Spain, where people search for that, and "en vivo" elsewhere.
 */
const vivo = (country) => (country === NAMES.es.countries.ES ? 'en directo' : 'en vivo');

const es = {
  locale: 'es_ES',
  kbps: 'kbps',
  htmlLang: 'es',
  langName: 'Español',
  appStore: 'Descárgalo en el App Store',
  appStoreShort: 'App Store',
  nav: {
    features: 'Funciones',
    carplay: 'CarPlay',
    mac: 'Mac',
    stations: 'Emisoras',
    xmas: 'Navidad',
    xmasFooter: 'Radio de Navidad',
  },
  xmasBanner: { title: 'Llega la radio de Navidad', text: 'Villancicos, crooners y éxitos navideños, en vivo desde todo el mundo.', cta: 'Escuchar' },
  meta: {
    title: 'Skywave Radio – Radio en vivo en iPhone, CarPlay y Mac',
    description:
      'Más de 4500 emisoras oficiales de 21 países, las más escuchadas primero. Pensada para CarPlay, con widget y una app en la barra de menús del Mac. Sin cuenta, sin anuncios, sin rastreo.',
  },
  hero: {
    kicker: 'Radio en vivo en iPhone, CarPlay y Mac',
    title: ['Todas las emisoras.', 'A un toque.'],
    text: 'Más de 4500 streams oficiales de 21 países, ordenados por género. En el bolsillo, en la carretera y en la barra de menús.',
    free: 'Gratis · Sin cuenta · Sin anuncios',
  },
  stats: [
    [0, 'emisoras oficiales'],
    [0, 'países'],
    [0, 'géneros'],
    [0, 'anuncios'],
  ],
  features: {
    carplay: {
      kicker: 'CarPlay',
      title: ['Arranca el coche.', 'Tu radio ya suena.'],
      text: 'Skywave retoma tu última emisora en cuanto arrancas y se reconecta sola después de un túnel o una zona sin cobertura, con 30 segundos de reserva en los streams HD.',
      points: ['Tu última emisora al arrancar', 'Se reconecta sola', 'Mandos del volante y Siri'],
    },
    widget: {
      kicker: 'Widget',
      title: ['Tus favoritas,', 'a un toque.'],
      text: 'El widget pone tu emisora favorita desde la pantalla de inicio, sin abrir la app. Otro toque la pausa.',
    },
    songs: {
      kicker: 'Al aire',
      title: ['¿Qué canción', 'es esta?'],
      text: 'Título, artista y portada, en vivo: en la app, en la pantalla bloqueada y en el coche. Encuéntralas en Recientes y vuelve a escucharlas en Spotify o Apple Music.',
    },
    world: {
      kicker: 'Explorar',
      title: ['Más de 4500 emisoras.', 'Las más escuchadas, primero.'],
      text: '21 países, ordenados por género y por la audiencia real de cada país. Cada stream viene de la propia emisora y se revisa cada semana.',
      points: ['Streams oficiales, revisados cada semana', 'Tu país primero, después el mundo', 'Busca por nombre, género o país'],
    },
    mac: {
      kicker: 'Mac',
      title: ['También en', 'la barra de menús.'],
      text: 'Un clic en la onda, sin ventanas de por medio. Las canciones pasan por la barra de menús y tus favoritas se sincronizan entre tu iPhone y tu Mac con iCloud.',
    },
  },
  more: {
    title: 'Y más.',
    items: [
      ['siri', 'Siri y Atajos', 'Pídele una emisora a Siri, o ponla desde Spotlight y Atajos.'],
      ['cast', 'Chromecast y AirPlay', 'Envía la radio a un Chromecast o a un altavoz AirPlay.'],
      ['moon', 'Temporizador', 'La radio se apaga sola al cabo de 15 a 90 minutos.'],
      ['cloud', 'Favoritas en iCloud', 'Te siguen en el iPhone y en el Mac, incluso si reinstalas la app.'],
    ],
  },
  soon: 'Android · próximamente',
  macAppStore: 'Descárgalo en el Mac App Store',
  privacy: {
    title: 'Sin cuenta. Sin anuncios. Sin rastreo.',
    text: 'Tus favoritas se quedan en tus dispositivos y en tu propio iCloud. Sin cuenta ni rastreo: solo estadísticas de escucha anónimas.',
  },
  countrySection: { title: 'Radio de 21 países', text: 'Explora las emisoras de un país.' },
  cta: { title: 'Sintoniza.', text: 'Skywave es gratis en el App Store, para iPhone y Mac.' },
  footer: { privacy: 'Privacidad', support: 'Soporte', guides: 'Guías', made: 'Hecho con cariño por WndrLabs.' },
  guideLinks: { carplay: 'La guía de CarPlay', mac: 'La guía de la barra de menús', abroad: 'Escuchar la radio desde el extranjero' },
  station: {
    title: (name, country) => `${name} – Escuchar ${vivo(country)}`,
    titleXmas: (name) => `${name} – Radio de Navidad en vivo y gratis`,
    description: (name, country, genres) =>
      `Escucha ${name} ${vivo(country)}, el stream oficial (${country}${genres ? `, ${genres}` : ''}). Gratis en iPhone, CarPlay y Mac con Skywave.`,
    live: 'En vivo',
    play: 'Escuchar',
    pause: 'Pausa',
    loading: 'Conectando…',
    unavailable: 'Este stream se escucha en la app Skywave.',
    openApp: 'Escuchar en Skywave',
    getApp: 'Descarga Skywave gratis',
    website: 'Web de la emisora',
    about: (name, country) =>
      `${name} es una emisora de radio de ${country}. Escúchala ${vivo(country)} y gratis en Skywave: en el iPhone, en el coche con CarPlay y en el Mac. El stream viene de la propia emisora.`,
    more: (genre, country) => `Más ${genre} · ${country}`,
    moreCountry: (country) => `Más emisoras de ${country}`,
    allIn: (country) => `Todas las emisoras de ${country}`,
    rank: (code, rank, total, g, grank, gtotal) =>
      `En Skywave, donde las emisoras más escuchadas van primero, ocupa el puesto ${rank} de ${total} ${esEn(code)}${g ? ` y el ${grank} de ${gtotal} en ${g}` : ''}.`,
    quality: (q) => `Stream: ${q}.`,
    pitch: 'Skywave: 4000 emisoras, pensada para CarPlay.',
  },
  country: {
    title: (country) => `Emisoras de radio de ${country} – Escuchar ${vivo(country)}`,
    description: (country, n) =>
      `${n} emisoras de radio oficiales de ${country}, ordenadas por género. Escúchalas ${vivo(country)} y gratis con Skywave en iPhone, CarPlay y Mac.`,
    heading: (country) => `Radio de ${country}`,
    intro: (country, n, top) =>
      `Escucha ${vivo(country)} y gratis ${n} emisoras de radio de ${country}: ${top} y muchas más, ordenadas por género. Cada stream viene de la propia emisora y se revisa cada semana. En Skywave suenan en el iPhone, en el coche con CarPlay y en el Mac.`,
    count: (n) => `${n} emisoras`,
  },
  /** A country's genre (/radios/mexico/rock/): `g` is the genre as said after « Emisoras de ». */
  genrePage: {
    phrase: {
      rap: 'rap', hiphop: 'hip-hop', rnb: 'R&B y soul', pop: 'pop', rock: 'rock', country: 'country',
      electro: 'música electrónica', jazz: 'jazz', classical: 'música clásica', reggae: 'reggae', afro: 'música afro',
      latin: 'música latina', oldies: 'música retro', news: 'noticias', talk: 'tertulias', sports: 'deportes',
      kids: 'música infantil', variety: 'variedades',
    },
    title: (g, code) => `Emisoras de ${g} ${esDe(code)} – Escuchar ${vivo(NAMES.es.countries[code])}`,
    description: (g, code, n) =>
      `${n} emisoras de ${g} ${esDe(code)}, ${vivo(NAMES.es.countries[code])} y gratis, las más escuchadas primero. Escúchalas aquí o con Skywave en iPhone, CarPlay y Mac.`,
    heading: (g, code) => `Emisoras de ${g} ${esDe(code)}`,
    intro: (g, code, n, top) =>
      `Escucha ${vivo(NAMES.es.countries[code])} y gratis ${n} emisoras de ${g} ${esDe(code)}: ${top} y más, las más escuchadas primero. Toca una para escucharla aquí, o llévalas a todas partes con Skywave en el iPhone, en el coche con CarPlay y en el Mac.`,
    otherGenres: (code) => `Más radio ${esDe(code)}`,
    elsewhere: (g) => `Emisoras de ${g} de otros países`,
    seeAll: (g, n) => `Las ${n} emisoras de ${g}`,
  },
  notFound: {
    title: 'Emisora no encontrada',
    text: 'Esta página cambió de dirección, o la emisora ya no emite. Encuéntrala, y otras 4000, en Skywave.',
    home: 'Volver al inicio',
  },
};

export const T = Object.fromEntries(
  Object.entries({ en, fr, de, es }).map(([lang, t]) => [lang, { ...t, ...NAMES[lang] }]),
);
