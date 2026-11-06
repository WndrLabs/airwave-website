// Every text of the site, per language. English is the reference; French and German have the
// same keys. Genre and country names come from the app (src/data.mjs). Runs in Node and in the
// browser (pages of the less popular stations are made there).
import { NAMES } from './data.mjs';

export const LANGS = ['en', 'fr', 'de'];

/** The language of a station's or country's page: the country's own, when the site has it. */
export const COUNTRY_LANG = { FR: 'fr', BE: 'fr', SN: 'fr', CI: 'fr', MA: 'fr', DE: 'de', CH: 'de', AT: 'de' };
export const langOf = (country) => COUNTRY_LANG[country] ?? 'en';

const en = {
  locale: 'en_US',
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
    title: 'Skywave – World radio, made for CarPlay',
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
  countries: { title: 'Radio from 21 countries', text: 'Browse the stations of a country.' },
  cta: { title: 'Tune in.', text: 'Skywave is free on the App Store, for iPhone and Mac.' },
  footer: { privacy: 'Privacy', support: 'Support', made: 'Made with care by WndrLabs.' },
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
    intro: (country, n, top) =>
      `Listen live to ${n} radio stations from ${country}, free: ${top} and many more, sorted by genre. Every stream comes from the broadcaster itself and is checked every week. In Skywave, they play on iPhone, in the car with CarPlay and on Mac.`,
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
    title: 'Skywave – La radio du monde, pensée pour CarPlay',
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
  countries: { title: 'La radio de 21 pays', text: 'Parcourez les radios d’un pays.' },
  cta: { title: 'À l’écoute.', text: 'Skywave est gratuite sur l’App Store, pour iPhone et Mac.' },
  footer: { privacy: 'Confidentialité', support: 'Assistance', made: 'Fait avec soin par WndrLabs.' },
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
    title: 'Skywave – Radio weltweit, gemacht für CarPlay',
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
  countries: { title: 'Radio aus 21 Ländern', text: 'Entdecke die Sender eines Landes.' },
  cta: { title: 'Einschalten.', text: 'Skywave ist kostenlos im App Store, für iPhone und Mac.' },
  footer: { privacy: 'Datenschutz', support: 'Hilfe', made: 'Mit Sorgfalt gemacht von WndrLabs.' },
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
  notFound: {
    title: 'Sender nicht gefunden',
    text: 'Diese Seite ist umgezogen, oder der Sender ist nicht mehr auf Sendung. Finde ihn – und 4.000 weitere – in Skywave.',
    home: 'Zur Startseite',
  },
};

export const T = Object.fromEntries(
  Object.entries({ en, fr, de }).map(([lang, t]) => [lang, { ...t, ...NAMES[lang] }]),
);
