// Every text of the site, per language. English is the reference; French and German have the
// same keys. Genre and country names come from the app (src/data.mjs). Runs in Node and in the
// browser (pages of the less popular stations are made there).
import { NAMES } from './data.mjs';

export const LANGS = ['en', 'fr', 'de'];

/** The language of a station's or country's page: the country's own, when the site has it. */
export const COUNTRY_LANG = { FR: 'fr', BE: 'fr', SN: 'fr', CI: 'fr', MA: 'fr', DE: 'de', CH: 'de' };
export const langOf = (country) => COUNTRY_LANG[country] ?? 'en';

const en = {
  locale: 'en_US',
  htmlLang: 'en',
  langName: 'English',
  appStore: 'Download on the App Store',
  appStoreShort: 'App Store',
  nav: { features: 'Features', carplay: 'CarPlay', mac: 'Mac', stations: 'Stations' },
  meta: {
    title: 'Skywave – World radio, made for CarPlay',
    description:
      '4,000 official radio stations from 20 countries, sorted by genre. Made for CarPlay, with a Mac menu bar app. No account, no ads, no tracking.',
  },
  hero: {
    kicker: 'Live radio for iPhone, CarPlay & Mac',
    title: ['Every station.', 'One tap away.'],
    text: '4,000 official radio streams from 20 countries, sorted by genre. In your pocket, on the road, in your menu bar.',
    free: 'Free · No account · No ads',
  },
  stats: [
    [4000, 'official stations'],
    [20, 'countries'],
    [17, 'genres'],
    [0, 'ads'],
  ],
  browse: {
    kicker: 'Browse',
    title: 'Sorted by genre. Local first.',
    text: 'Rap, jazz, news, electro, classical… Pick a country and its own stations come first, then the whole world. Every stream comes from the broadcaster itself and is checked every week.',
    points: [
      'Official streams, checked weekly',
      'Your country first, then the world',
      'Search by name, genre or country',
    ],
  },
  carplay: {
    kicker: 'CarPlay',
    title: 'Made for the road.',
    text: 'Big, simple lists designed for driving: Recents, Favorites, Browse. Plug in and your last station starts on its own, unless you paused it.',
    points: [
      'Starts your last station as you plug in',
      'Steering wheel and Siri controls',
      'Song and cover on the Now Playing screen',
    ],
  },
  signal: {
    kicker: 'Keeps playing',
    title: 'Tunnels? Dead zones? Keep listening.',
    text: 'Skywave reconnects on its own when the signal drops. HD streams play with a 30‑second buffer that bridges short drops without a gap.',
    tunnel: 'Tunnel',
    buffer: '30 s buffer',
  },
  song: {
    kicker: 'On air',
    title: 'See the song that’s playing.',
    text: 'Title, artist and cover, in the app, on the lock screen, in Control Center and in the car. Heard something you love? Open it in your music app from your song history.',
  },
  mac: {
    kicker: 'Mac',
    title: 'Lives in your menu bar.',
    text: 'One click on the wave, no window in the way. A discreet banner with the cover when the song changes, a sleep timer, AirPlay and the play/pause key on your keyboard.',
  },
  privacy: {
    title: 'No account. No ads. No tracking.',
    text: 'Your favorites stay on your devices. No data collected, no tracking: just the radio.',
  },
  countries: { title: 'Radio from 20 countries', text: 'Browse the stations of a country.' },
  cta: { title: 'Tune in.', text: 'Skywave is free on the App Store.' },
  footer: { privacy: 'Privacy', support: 'Support', made: 'Made with care by WndrLabs.' },
  station: {
    title: (name) => `${name} – Listen live`,
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
      `${name} is a radio station from ${country}. Listen live for free in Skywave, on iPhone, in your car with CarPlay and on your Mac. The stream comes from the broadcaster itself.`,
    more: (genre, country) => `More ${genre} in ${country}`,
    moreCountry: (country) => `More stations in ${country}`,
    allIn: (country) => `All stations in ${country}`,
    pitch: 'Skywave: 4,000 stations, made for CarPlay.',
  },
  country: {
    title: (country) => `${country} radio stations – Listen live`,
    description: (country, n) =>
      `${n} official radio stations from ${country}, sorted by genre. Listen live for free with Skywave on iPhone, CarPlay and Mac.`,
    heading: (country) => `Radio in ${country}`,
    count: (n) => `${n} stations`,
  },
  notFound: {
    title: 'Station not found',
    text: 'This page has moved, or the station is no longer on air. Find it, and 4,000 others, in Skywave.',
    home: 'Back to the home page',
  },
};

const fr = {
  locale: 'fr_FR',
  htmlLang: 'fr',
  langName: 'Français',
  appStore: 'Télécharger dans l’App Store',
  appStoreShort: 'App Store',
  nav: { features: 'Fonctions', carplay: 'CarPlay', mac: 'Mac', stations: 'Radios' },
  meta: {
    title: 'Skywave – La radio du monde, pensée pour CarPlay',
    description:
      '4 000 radios officielles dans 20 pays, rangées par genre. Pensée pour CarPlay, avec une app dans la barre de menus du Mac. Sans compte, sans pub, sans pistage.',
  },
  hero: {
    kicker: 'La radio en direct sur iPhone, CarPlay et Mac',
    title: ['Toutes les radios.', 'En un geste.'],
    text: '4 000 flux officiels dans 20 pays, rangés par genre. Dans la poche, sur la route, dans la barre de menus.',
    free: 'Gratuit · Sans compte · Sans pub',
  },
  stats: [
    [4000, 'radios officielles'],
    [20, 'pays'],
    [17, 'genres'],
    [0, 'pub'],
  ],
  browse: {
    kicker: 'Parcourir',
    title: 'Rangées par genre. Le local d’abord.',
    text: 'Rap, jazz, info, électro, classique… Choisissez un pays : ses radios passent en premier, puis le monde entier. Chaque flux vient du diffuseur lui‑même et il est vérifié chaque semaine.',
    points: [
      'Des flux officiels, vérifiés chaque semaine',
      'Votre pays d’abord, puis le monde',
      'Recherche par nom, genre ou pays',
    ],
  },
  carplay: {
    kicker: 'CarPlay',
    title: 'Pensée pour la route.',
    text: 'Des listes simples et lisibles, conçues pour conduire : Récents, Favoris, Parcourir. Branchez le téléphone : votre dernière radio repart toute seule, sauf si vous l’aviez mise en pause.',
    points: [
      'Votre dernière radio repart au branchement',
      'Commandes au volant et Siri',
      'Titre et pochette sur l’écran « À l’écoute »',
    ],
  },
  signal: {
    kicker: 'La musique continue',
    title: 'Tunnel ? Zone blanche ? La radio continue.',
    text: 'Skywave se reconnecte tout seul quand le réseau coupe. Les flux HD jouent avec 30 secondes de réserve, pour franchir les courtes coupures sans un blanc.',
    tunnel: 'Tunnel',
    buffer: '30 s de réserve',
  },
  song: {
    kicker: 'À l’antenne',
    title: 'Voyez le titre qui passe.',
    text: 'Titre, artiste et pochette, dans l’app, sur l’écran verrouillé, dans le Centre de contrôle et dans la voiture. Un coup de cœur ? Retrouvez‑le dans votre app de musique depuis l’historique des titres.',
  },
  mac: {
    kicker: 'Mac',
    title: 'Dans la barre de menus.',
    text: 'Un clic sur l’onde, aucune fenêtre qui gêne. Une bannière discrète avec la pochette à chaque nouveau titre, une minuterie de veille, AirPlay et la touche lecture/pause du clavier.',
  },
  privacy: {
    title: 'Sans compte. Sans pub. Sans pistage.',
    text: 'Vos favoris restent sur vos appareils. Aucune donnée collectée, aucun suivi : juste la radio.',
  },
  countries: { title: 'La radio de 20 pays', text: 'Parcourez les radios d’un pays.' },
  cta: { title: 'À l’écoute.', text: 'Skywave est gratuite sur l’App Store.' },
  footer: { privacy: 'Confidentialité', support: 'Assistance', made: 'Fait avec soin par WndrLabs.' },
  station: {
    title: (name) => `${name} – Écouter en direct`,
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
    pitch: 'Skywave : 4 000 radios, pensée pour CarPlay.',
  },
  country: {
    title: (country) => `Radios ${country} – Écouter en direct`,
    description: (country, n) =>
      `${n} radios officielles (${country}), rangées par genre. Écoutez‑les gratuitement en direct avec Skywave sur iPhone, CarPlay et Mac.`,
    heading: (country) => `Radios · ${country}`,
    count: (n) => `${n} radios`,
  },
  notFound: {
    title: 'Radio introuvable',
    text: 'Cette page a changé d’adresse, ou la radio n’émet plus. Retrouvez‑la, et 4 000 autres, dans Skywave.',
    home: 'Retour à l’accueil',
  },
};

const de = {
  locale: 'de_DE',
  htmlLang: 'de',
  langName: 'Deutsch',
  appStore: 'Laden im App Store',
  appStoreShort: 'App Store',
  nav: { features: 'Funktionen', carplay: 'CarPlay', mac: 'Mac', stations: 'Sender' },
  meta: {
    title: 'Skywave – Radio weltweit, gemacht für CarPlay',
    description:
      '4.000 offizielle Radiosender aus 20 Ländern, nach Genre sortiert. Gemacht für CarPlay, mit einer Mac-App in der Menüleiste. Kein Konto, keine Werbung, kein Tracking.',
  },
  hero: {
    kicker: 'Live-Radio für iPhone, CarPlay & Mac',
    title: ['Alle Sender.', 'Ein Tipp.'],
    text: '4.000 offizielle Streams aus 20 Ländern, nach Genre sortiert. In der Tasche, im Auto, in der Menüleiste.',
    free: 'Kostenlos · Kein Konto · Keine Werbung',
  },
  stats: [
    [4000, 'offizielle Sender'],
    [20, 'Länder'],
    [17, 'Genres'],
    [0, 'Werbung'],
  ],
  browse: {
    kicker: 'Entdecken',
    title: 'Nach Genre sortiert. Lokal zuerst.',
    text: 'Rap, Jazz, Nachrichten, Electro, Klassik… Wähle ein Land: zuerst seine eigenen Sender, dann die ganze Welt. Jeder Stream kommt direkt vom Sender und wird jede Woche geprüft.',
    points: [
      'Offizielle Streams, jede Woche geprüft',
      'Dein Land zuerst, dann die Welt',
      'Suche nach Name, Genre oder Land',
    ],
  },
  carplay: {
    kicker: 'CarPlay',
    title: 'Gemacht für unterwegs.',
    text: 'Große, einfache Listen fürs Fahren: Zuletzt, Favoriten, Entdecken. Einstecken – dein letzter Sender startet von selbst, außer du hattest pausiert.',
    points: [
      'Startet deinen letzten Sender beim Einstecken',
      'Lenkrad- und Siri-Steuerung',
      'Titel und Cover auf „Läuft gerade“',
    ],
  },
  signal: {
    kicker: 'Spielt weiter',
    title: 'Tunnel? Funkloch? Einfach weiterhören.',
    text: 'Skywave verbindet sich selbst neu, wenn das Netz abreißt. HD-Streams laufen mit 30 Sekunden Puffer, der kurze Aussetzer lückenlos überbrückt.',
    tunnel: 'Tunnel',
    buffer: '30 s Puffer',
  },
  song: {
    kicker: 'On Air',
    title: 'Sieh, welcher Song läuft.',
    text: 'Titel, Interpret und Cover – in der App, auf dem Sperrbildschirm, im Kontrollzentrum und im Auto. Ein Lieblingssong? Öffne ihn aus dem Verlauf in deiner Musik-App.',
  },
  mac: {
    kicker: 'Mac',
    title: 'Wohnt in deiner Menüleiste.',
    text: 'Ein Klick auf die Welle, kein Fenster im Weg. Ein dezentes Banner mit Cover bei jedem neuen Song, Schlaf-Timer, AirPlay und die Play/Pause-Taste der Tastatur.',
  },
  privacy: {
    title: 'Kein Konto. Keine Werbung. Kein Tracking.',
    text: 'Deine Favoriten bleiben auf deinen Geräten. Keine Daten, kein Tracking – einfach nur Radio.',
  },
  countries: { title: 'Radio aus 20 Ländern', text: 'Entdecke die Sender eines Landes.' },
  cta: { title: 'Einschalten.', text: 'Skywave ist kostenlos im App Store.' },
  footer: { privacy: 'Datenschutz', support: 'Hilfe', made: 'Mit Sorgfalt gemacht von WndrLabs.' },
  station: {
    title: (name) => `${name} – Live hören`,
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
    pitch: 'Skywave: 4.000 Sender, gemacht für CarPlay.',
  },
  country: {
    title: (country) => `Radiosender ${country} – Live hören`,
    description: (country, n) =>
      `${n} offizielle Radiosender (${country}), nach Genre sortiert. Kostenlos live hören mit Skywave auf iPhone, CarPlay und Mac.`,
    heading: (country) => `Radio · ${country}`,
    count: (n) => `${n} Sender`,
  },
  notFound: {
    title: 'Sender nicht gefunden',
    text: 'Diese Seite ist umgezogen, oder der Sender ist nicht mehr auf Sendung. Finde ihn – und 4.000 weitere – in Skywave.',
    home: 'Zur Startseite',
  },
};

export const T = Object.fromEntries(
  Object.entries({ en, fr, de }).map(([lang, t]) => [lang, { ...t, ...NAMES[lang] }]),
);
