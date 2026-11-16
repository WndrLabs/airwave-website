// Guides: what people search for that Skywave answers (the radio on CarPlay, in the Mac's menu bar,
// from home while abroad), one page per language, and an index of them (GUIDES_INDEX). Their facts
// are the app's: keep them in step with what it does (the features in i18n.mjs, the app's
// CarPlay tabs, iOS 17 and macOS 14 at least). Station counts come from the station list.
import { LANGS, T } from './i18n.mjs';
import { GUIDES_INDEX, GUIDE_PATHS, countryPath, esc, genrePath, html, landingPath, nav, page, storeBadge, macAppStoreBadge, XMAS_PATHS } from './html.mjs';
import { SITE } from './site.mjs';

const ORDER = ['carplay', 'mac', 'abroad'];

/** A number in the language's way: 4 829, 4.829, 4,829. */
const num = (lang, n) => new Intl.NumberFormat(T[lang].htmlLang).format(n);

/**
 * Each guide in each language. `n(code)` is a country's station count, `total` all of them; `a(path,
 * text)` a link on the site. Sections hold paragraphs (p), steps (ol) or points (ul); faq is
 * [question, answer] pairs.
 */
const GUIDES = {
  en: {
    index: { title: 'Guides', meta: 'How to listen to live radio on CarPlay, in your Mac’s menu bar, and from home while you’re abroad, with Skywave.', kicker: 'Guides', faq: 'Questions' },
    carplay: ({ n, total, a }) => ({
      title: 'How to listen to live radio on CarPlay',
      meta: `Listen to live radio on CarPlay: ${total} official stations with Skywave, your last station back when you start the car, and how much data it uses.`,
      lead: `On the CarPlay screen, radio comes through an iPhone app and the internet, not the car’s FM. With Skywave you get ${total} official stations from 21 countries on your car’s screen, including ${n('US')} from the United States and ${n('GB')} from the UK, sorted by genre, with your favorites and recent stations.`,
      sections: [
        { h2: 'Step by step', ol: [
          'Install Skywave on your iPhone: it’s free and needs iOS 17 or later.',
          'Plug your iPhone into the car, or connect it wirelessly if the car allows: Skywave appears on the CarPlay screen.',
          'Pick a station in Browse (by country and genre), Favorites or Recents. Steering wheel controls and Siri work too.',
          'Add your favorite stations from the iPhone: they’re first in line on CarPlay.',
        ] },
        { h2: 'Made for the road', ul: [
          'Start the car: your last station plays again by itself.',
          'After a tunnel or a dead zone, it reconnects on its own, with up to 30 seconds in reserve on HD streams.',
          'The song on air shows on the car’s screen.',
        ] },
        { h2: 'How much data does it use?', p: [
          'A station at 128 kbps uses about 58 MB per hour, one at 64 kbps about 29 MB. An hour a day for a month comes to about 0.9 GB at 64 kbps and 1.7 GB at 128 kbps.',
        ] },
      ],
      faq: [
        ['Do I need a subscription?', 'No. Skywave is free, with no account and no ads in the app. It only uses your phone plan’s data.'],
        ['Can I listen to stations from another country?', `Yes: Skywave has stations from 21 countries, all in Browse. See for example ${a(countryPath('US'), 'the most listened stations in the United States')}.`],
      ],
    }),
    mac: ({ total }) => ({
      title: 'Live radio in your Mac’s menu bar',
      meta: `Listen to live radio from your Mac’s menu bar: ${total} stations, songs scrolling by, media keys, AirPods, AirPlay and Chromecast. Free.`,
      lead: 'Skywave for Mac opens no window: it lives in the menu bar, as its wave. One click to pick a station, and it keeps playing while you work.',
      sections: [
        { h2: 'Step by step', ol: [
          'Get Skywave on the Mac App Store: it’s free and needs macOS 14 or later.',
          'Click the wave in the menu bar: genres, search, your recent stations and favorites open in a small window.',
          'Pick a station: its name shows next to the wave, and each new song scrolls by there for a few seconds.',
        ] },
        { h2: 'What it does', ul: [
          'Your keyboard’s and headphones’ play, previous and next keys work: previous and next go through the list you played from.',
          'The Listen on menu sends the radio to your AirPods or headphones, the Mac’s speakers, a Chromecast or an AirPlay speaker.',
          'Your favorites sync with your iPhone through iCloud.',
          'Skywave can open when your Mac starts, if you tick that option.',
        ] },
      ],
      faq: [
        ['Is it the same app as on iPhone?', 'Yes, one download: Skywave is free on iPhone and Mac, and your favorites follow you from one to the other.'],
        ['Does the radio stop when I close the window?', 'No: the window closes, the radio plays on. To stop it, press pause or quit the app.'],
      ],
    }),
    abroad: ({ n, a }) => ({
      title: 'Listen to radio from home while you’re abroad',
      meta: `Living or traveling abroad? Listen live to ${n('US')} US and ${n('GB')} UK stations, and those of Canada, Australia and South Africa, on iPhone, Mac and CarPlay.`,
      lead: `Radio stations stream their programs on the internet, and most can be heard anywhere in the world. Skywave gathers their official streams: ${n('US')} from the United States, ${n('GB')} from the UK, ${n('CA')} from Canada, ${n('AU')} from Australia and ${n('ZA')} from South Africa, the most listened first.`,
      sections: [
        { h2: 'Step by step', ol: [
          'Install Skywave on your iPhone or Mac: it’s free.',
          'In Genres, choose the country you miss.',
          'Pick a genre, or search for a station by name.',
        ] },
        { h2: 'Good to know', ul: [
          'Live means home time: the 7 a.m. show in London airs at 2 a.m. in New York.',
          'A few stations cut some programs outside their country, most often sports, for rights reasons.',
          'A station at 128 kbps uses about 58 MB of data per hour.',
        ] },
      ],
      faq: [
        ['Is it free?', 'Yes: Skywave is free, with no account and no ads in the app.'],
        ['Which stations are there?', `${a(countryPath('US'), 'The United States')}, ${a(countryPath('GB'), 'the United Kingdom')}, ${a(countryPath('CA'), 'Canada')}, ${a(countryPath('AU'), 'Australia')}, and 17 more countries.`],
      ],
    }),
  },
  fr: {
    index: { title: 'Guides', meta: 'Écouter la radio en direct sur CarPlay, dans la barre des menus du Mac ou depuis l’étranger, avec Skywave.', kicker: 'Guides', faq: 'Questions fréquentes' },
    carplay: ({ n, total, a }) => ({
      title: 'Écouter la radio sur CarPlay, en direct et gratuitement',
      meta: `Comment écouter la radio en direct sur CarPlay : ${total} radios officielles avec Skywave, la reprise au démarrage, la reconnexion après un tunnel et la consommation de données.`,
      lead: `Sur l’écran CarPlay, la radio passe par une app de l’iPhone et par Internet, pas par la FM de la voiture. Avec Skywave, vous retrouvez sur l’écran de la voiture ${total} radios officielles de 21 pays, dont ${n('FR')} françaises, rangées par genre, avec vos favoris et vos radios récentes.`,
      sections: [
        { h2: 'Comment faire', ol: [
          'Installez Skywave sur votre iPhone : elle est gratuite et demande iOS 17 ou plus récent.',
          'Branchez l’iPhone à la voiture, ou connectez‑le sans fil si elle le permet : Skywave apparaît sur l’écran CarPlay.',
          'Choisissez une radio dans Parcourir (par pays et par genre), Favoris ou Récents. Les commandes au volant et Siri fonctionnent aussi.',
          'Ajoutez vos radios préférées en favoris depuis l’iPhone : elles sont en tête sur CarPlay.',
        ] },
        { h2: 'Pensée pour la route', ul: [
          'Au démarrage, votre dernière radio reprend toute seule.',
          'Après un tunnel ou une zone blanche, elle se reconnecte d’elle‑même, avec jusqu’à 30 secondes de réserve sur les flux HD.',
          'Le titre en cours s’affiche sur l’écran de la voiture.',
        ] },
        { h2: 'Combien de données ?', p: [
          'Une radio en 128 kb/s consomme environ 58 Mo par heure, une radio en 64 kb/s environ 29 Mo. Une heure par jour pendant un mois représente environ 0,9 Go en 64 kb/s et 1,7 Go en 128 kb/s.',
        ] },
      ],
      faq: [
        ['Faut‑il un abonnement ?', 'Non. Skywave est gratuite, sans compte et sans publicité dans l’app. Elle n’utilise que les données de votre forfait.'],
        ['Peut‑on écouter une radio d’un autre pays ?', `Oui : Skywave a des radios de 21 pays, toutes dans Parcourir. Par exemple ${a(countryPath('FR'), 'les radios les plus écoutées en France')} ou ${a(genrePath('FR', 'news'), 'les radios d’info')}.`],
      ],
    }),
    mac: ({ total }) => ({
      title: 'Une radio dans la barre des menus du Mac',
      meta: `Écoutez la radio en direct depuis la barre des menus du Mac : ${total} radios, les titres qui défilent, les touches multimédia, AirPods, AirPlay et Chromecast. Gratuit.`,
      lead: 'Skywave pour Mac n’ouvre aucune fenêtre : l’app vit dans la barre des menus, sous la forme de sa vague. Un clic suffit pour choisir une radio, et elle continue de jouer pendant que vous travaillez.',
      sections: [
        { h2: 'Comment faire', ol: [
          'Téléchargez Skywave sur le Mac App Store : elle est gratuite et demande macOS 14 ou plus récent.',
          'Cliquez sur la vague dans la barre des menus : les genres, la recherche, vos radios récentes et vos favoris s’ouvrent dans une petite fenêtre.',
          'Choisissez une radio : son nom s’affiche à côté de la vague, et chaque nouveau titre y défile quelques secondes.',
        ] },
        { h2: 'Ce qu’elle sait faire', ul: [
          'Les touches lecture/pause, précédent et suivant du clavier et des écouteurs fonctionnent : précédent et suivant parcourent la liste d’où vient la radio.',
          'Le menu Écouter sur envoie la radio vers vos AirPods ou un casque, les haut‑parleurs du Mac, un Chromecast ou une enceinte AirPlay.',
          'Vos favoris se synchronisent avec l’iPhone par iCloud.',
          'Skywave peut s’ouvrir au démarrage du Mac, si vous cochez l’option.',
        ] },
      ],
      faq: [
        ['Est‑ce la même app que sur iPhone ?', 'Oui, un seul téléchargement : Skywave est gratuite sur iPhone et sur Mac, et vos favoris passent de l’un à l’autre.'],
        ['La radio s’arrête‑t‑elle quand je ferme la fenêtre ?', 'Non : la fenêtre se referme, la radio continue. Pour l’arrêter, appuyez sur pause ou quittez l’app.'],
      ],
    }),
    abroad: ({ n, a }) => ({
      title: 'Écouter la radio française à l’étranger',
      meta: `Expatrié ou en voyage ? Écoutez en direct ${n('FR')} radios françaises, et celles de Belgique, de Suisse et du Canada, sur iPhone, Mac et CarPlay, avec leurs flux officiels.`,
      lead: `Les radios françaises diffusent leurs programmes sur Internet, et la plupart s’écoutent partout dans le monde. Skywave rassemble leurs flux officiels : ${n('FR')} radios françaises, les plus écoutées d’abord, des grandes radios nationales aux radios locales.`,
      sections: [
        { h2: 'Comment faire', ol: [
          'Installez Skywave sur votre iPhone ou votre Mac : elle est gratuite.',
          'Dans Genres, choisissez la France comme pays.',
          'Choisissez un genre, ou cherchez une radio par son nom.',
        ] },
        { h2: 'Bon à savoir', ul: [
          'Le direct est à l’heure française : la matinale de 7 h passe à 1 h du matin à New York.',
          'Quelques radios coupent certaines émissions hors de France, le plus souvent le sport, pour des questions de droits.',
          'Une radio en 128 kb/s consomme environ 58 Mo de données par heure.',
        ] },
      ],
      faq: [
        ['Est‑ce gratuit ?', 'Oui : Skywave est gratuite, sans compte et sans publicité dans l’app.'],
        ['Les radios belges, suisses ou québécoises y sont‑elles ?', `Oui : ${a(countryPath('BE'), `${n('BE')} radios de Belgique`)}, ${a(countryPath('CH'), `${n('CH')} de Suisse`)} et ${a(countryPath('CA'), `${n('CA')} du Canada`)}, ainsi que celles du Sénégal, de Côte d’Ivoire et du Maroc.`],
      ],
    }),
  },
  de: {
    index: { title: 'Ratgeber', meta: 'Radio live hören mit CarPlay, in der Menüleiste des Mac oder im Ausland – mit Skywave.', kicker: 'Ratgeber', faq: 'Häufige Fragen' },
    carplay: ({ n, total, a }) => ({
      title: 'Radio mit CarPlay hören – live und kostenlos',
      meta: `So hörst du Radio live mit CarPlay: ${total} offizielle Sender mit Skywave, dein Sender beim Start, Wiederverbindung nach dem Tunnel und der Datenverbrauch.`,
      lead: `Auf dem CarPlay-Bildschirm kommt das Radio über eine App auf dem iPhone und das Internet, nicht über das UKW-Radio des Autos. Mit Skywave hast du ${total} offizielle Sender aus 21 Ländern auf dem Bildschirm im Auto, davon ${n('DE')} aus Deutschland, nach Genre sortiert, mit deinen Favoriten und zuletzt gehörten Sendern.`,
      sections: [
        { h2: 'So geht’s', ol: [
          'Installiere Skywave auf deinem iPhone: kostenlos, ab iOS 17.',
          'Verbinde das iPhone mit dem Auto, per Kabel oder kabellos, wenn das Auto es kann: Skywave erscheint auf dem CarPlay-Bildschirm.',
          'Wähle einen Sender unter Entdecken (nach Land und Genre), Favoriten oder Zuletzt. Die Tasten am Lenkrad und Siri funktionieren auch.',
          'Füge deine Lieblingssender auf dem iPhone zu den Favoriten hinzu: In CarPlay stehen sie ganz vorn.',
        ] },
        { h2: 'Gemacht für die Straße', ul: [
          'Beim Start läuft dein letzter Sender von selbst weiter.',
          'Nach einem Tunnel oder Funkloch verbindet er sich von selbst neu, mit bis zu 30 Sekunden Reserve bei HD-Streams.',
          'Der laufende Titel steht auf dem Bildschirm im Auto.',
        ] },
        { h2: 'Wie viele Daten braucht das?', p: [
          'Ein Sender mit 128 kbit/s braucht etwa 58 MB pro Stunde, einer mit 64 kbit/s etwa 29 MB. Eine Stunde am Tag einen Monat lang sind etwa 0,9 GB bei 64 kbit/s und 1,7 GB bei 128 kbit/s.',
        ] },
      ],
      faq: [
        ['Brauche ich ein Abo?', 'Nein. Skywave ist kostenlos, ohne Konto und ohne Werbung in der App. Sie nutzt nur die Daten deines Mobilfunktarifs.'],
        ['Kann ich Sender aus anderen Ländern hören?', `Ja: Skywave hat Sender aus 21 Ländern, alle unter Entdecken. Zum Beispiel ${a(countryPath('DE'), 'die meistgehörten Sender in Deutschland')} oder ${a(genrePath('DE', 'news'), 'Nachrichtenradio')}.`],
      ],
    }),
    mac: ({ total }) => ({
      title: 'Radio in der Menüleiste des Mac',
      meta: `Radio live aus der Menüleiste des Mac: ${total} Sender, mitlaufende Titel, Medientasten, AirPods, AirPlay und Chromecast. Kostenlos.`,
      lead: 'Skywave für den Mac öffnet kein Fenster: Die App lebt in der Menüleiste, als ihre Welle. Ein Klick genügt, um einen Sender zu wählen, und er spielt weiter, während du arbeitest.',
      sections: [
        { h2: 'So geht’s', ol: [
          'Lade Skywave im Mac App Store: kostenlos, ab macOS 14.',
          'Klicke auf die Welle in der Menüleiste: Genres, Suche, zuletzt gehörte Sender und Favoriten öffnen sich in einem kleinen Fenster.',
          'Wähle einen Sender: Sein Name steht neben der Welle, und jeder neue Titel läuft dort ein paar Sekunden durch.',
        ] },
        { h2: 'Was sie kann', ul: [
          'Die Tasten für Wiedergabe/Pause, zurück und vor auf der Tastatur und am Kopfhörer funktionieren: zurück und vor gehen durch die Liste, aus der der Sender kommt.',
          'Das Menü „Hören auf“ schickt das Radio an deine AirPods oder Kopfhörer, die Lautsprecher des Mac, einen Chromecast oder einen AirPlay-Lautsprecher.',
          'Deine Favoriten gleichen sich per iCloud mit dem iPhone ab.',
          'Skywave kann beim Start des Mac öffnen, wenn du die Option ankreuzt.',
        ] },
      ],
      faq: [
        ['Ist es dieselbe App wie auf dem iPhone?', 'Ja, ein Download: Skywave ist auf iPhone und Mac kostenlos, und deine Favoriten wandern mit.'],
        ['Hört das Radio auf, wenn ich das Fenster schließe?', 'Nein: Das Fenster geht zu, das Radio läuft weiter. Zum Stoppen drückst du Pause oder beendest die App.'],
      ],
    }),
    abroad: ({ n, a }) => ({
      title: 'Deutsches Radio im Ausland hören',
      meta: `Im Ausland unterwegs oder ausgewandert? Höre ${n('DE')} deutsche Sender live, dazu Österreich und die Schweiz, auf iPhone, Mac und mit CarPlay – über ihre offiziellen Streams.`,
      lead: `Radiosender streamen ihr Programm im Internet, und die meisten sind überall auf der Welt zu hören. Skywave bündelt ihre offiziellen Streams: ${n('DE')} Sender aus Deutschland, die meistgehörten zuerst, dazu ${n('AT')} aus Österreich und ${n('CH')} aus der Schweiz.`,
      sections: [
        { h2: 'So geht’s', ol: [
          'Installiere Skywave auf deinem iPhone oder Mac: kostenlos.',
          'Wähle unter Genres Deutschland als Land.',
          'Wähle ein Genre, oder suche einen Sender nach seinem Namen.',
        ] },
        { h2: 'Gut zu wissen', ul: [
          'Live heißt deutsche Zeit: Die Morgensendung um 7 Uhr läuft auf Mallorca zur selben Zeit, in New York um 1 Uhr nachts.',
          'Einige Sender blenden im Ausland manche Sendungen aus, meist Sport, aus Rechtegründen.',
          'Ein Sender mit 128 kbit/s braucht etwa 58 MB Daten pro Stunde.',
        ] },
      ],
      faq: [
        ['Ist das kostenlos?', 'Ja: Skywave ist kostenlos, ohne Konto und ohne Werbung in der App.'],
        ['Welche Sender gibt es?', `${a(countryPath('DE'), 'Deutschland')}, ${a(countryPath('AT'), 'Österreich')}, ${a(countryPath('CH'), 'die Schweiz')} und 18 weitere Länder.`],
      ],
    }),
  },
  es: {
    index: { title: 'Guías', meta: 'Escuchar la radio en vivo en CarPlay, en la barra de menús del Mac o desde el extranjero, con Skywave.', kicker: 'Guías', faq: 'Preguntas frecuentes' },
    carplay: ({ n, total, a }) => ({
      title: 'Escuchar la radio en CarPlay, en vivo y gratis',
      meta: `Cómo escuchar la radio en vivo en CarPlay: ${total} emisoras oficiales con Skywave, tu emisora al arrancar, la reconexión tras un túnel y el consumo de datos.`,
      lead: `En la pantalla de CarPlay, la radio llega por una app del iPhone e Internet, no por la FM del coche. Con Skywave tienes en la pantalla del coche ${total} emisoras oficiales de 21 países, entre ellas ${n('MX')} de México y ${n('ES')} de España, ordenadas por género, con tus favoritas y las recientes.`,
      sections: [
        { h2: 'Paso a paso', ol: [
          'Instala Skywave en tu iPhone: es gratis y necesita iOS 17 o posterior.',
          'Conecta el iPhone al coche, con cable o sin cable si el coche lo permite: Skywave aparece en la pantalla de CarPlay.',
          'Elige una emisora en Explorar (por país y género), Favoritas o Recientes. Los mandos del volante y Siri también funcionan.',
          'Añade tus emisoras preferidas a favoritas desde el iPhone: en CarPlay salen las primeras.',
        ] },
        { h2: 'Pensada para la carretera', ul: [
          'Al arrancar, tu última emisora vuelve a sonar sola.',
          'Tras un túnel o una zona sin cobertura, se reconecta sola, con hasta 30 segundos de reserva en los streams HD.',
          'La canción en antena aparece en la pantalla del coche.',
        ] },
        { h2: '¿Cuántos datos consume?', p: [
          'Una emisora a 128 kbps consume unos 58 MB por hora, una a 64 kbps unos 29 MB. Una hora al día durante un mes son unos 0,9 GB a 64 kbps y 1,7 GB a 128 kbps.',
        ] },
      ],
      faq: [
        ['¿Hace falta una suscripción?', 'No. Skywave es gratis, sin cuenta y sin anuncios en la app. Solo usa los datos de tu plan.'],
        ['¿Puedo escuchar emisoras de otro país?', `Sí: Skywave tiene emisoras de 21 países, todas en Explorar. Por ejemplo, ${a(countryPath('MX'), 'las más escuchadas de México')} o ${a(countryPath('ES'), 'de España')}.`],
      ],
    }),
    mac: ({ total }) => ({
      title: 'La radio en la barra de menús del Mac',
      meta: `Escucha la radio en vivo desde la barra de menús del Mac: ${total} emisoras, las canciones pasando, las teclas multimedia, AirPods, AirPlay y Chromecast. Gratis.`,
      lead: 'Skywave para Mac no abre ninguna ventana: vive en la barra de menús, con la forma de su onda. Un clic basta para elegir una emisora, y sigue sonando mientras trabajas.',
      sections: [
        { h2: 'Paso a paso', ol: [
          'Descarga Skywave en el Mac App Store: es gratis y necesita macOS 14 o posterior.',
          'Haz clic en la onda de la barra de menús: los géneros, la búsqueda, tus emisoras recientes y tus favoritas se abren en una ventana pequeña.',
          'Elige una emisora: su nombre aparece junto a la onda, y cada canción nueva pasa por ahí unos segundos.',
        ] },
        { h2: 'Lo que hace', ul: [
          'Las teclas de reproducir/pausa, anterior y siguiente del teclado y de los auriculares funcionan: anterior y siguiente recorren la lista de la que viene la emisora.',
          'El menú Escuchar en envía la radio a tus AirPods o auriculares, los altavoces del Mac, un Chromecast o un altavoz AirPlay.',
          'Tus favoritas se sincronizan con el iPhone por iCloud.',
          'Skywave puede abrirse al encender el Mac, si marcas la opción.',
        ] },
      ],
      faq: [
        ['¿Es la misma app que en el iPhone?', 'Sí, una sola descarga: Skywave es gratis en iPhone y Mac, y tus favoritas pasan de uno a otro.'],
        ['¿La radio se para al cerrar la ventana?', 'No: la ventana se cierra y la radio sigue. Para pararla, pulsa pausa o sal de la app.'],
      ],
    }),
    abroad: ({ n, a }) => ({
      title: 'Escuchar la radio de México y España desde el extranjero',
      meta: `¿Vives o viajas fuera? Escucha en vivo ${n('MX')} emisoras de México y ${n('ES')} de España en iPhone, Mac y CarPlay, con sus streams oficiales.`,
      lead: `Las emisoras transmiten su programación por Internet, y la mayoría se puede escuchar en cualquier parte del mundo. Skywave reúne sus streams oficiales: ${n('MX')} emisoras de México y ${n('ES')} de España, las más escuchadas primero.`,
      sections: [
        { h2: 'Paso a paso', ol: [
          'Instala Skywave en tu iPhone o tu Mac: es gratis.',
          'En Géneros, elige el país que extrañas.',
          'Elige un género, o busca una emisora por su nombre.',
        ] },
        { h2: 'Conviene saber', ul: [
          'El directo va a la hora de su país: a las 7 de la mañana en Madrid es la 1 de la madrugada en Nueva York.',
          'Algunas emisoras cortan ciertos programas fuera de su país, casi siempre deportes, por cuestión de derechos.',
          'Una emisora a 128 kbps consume unos 58 MB de datos por hora.',
        ] },
      ],
      faq: [
        ['¿Es gratis?', 'Sí: Skywave es gratis, sin cuenta y sin anuncios en la app.'],
        ['¿Qué emisoras hay?', `${a(countryPath('MX'), 'México')}, ${a(countryPath('ES'), 'España')} y 19 países más, de Estados Unidos a Francia.`],
      ],
    }),
  },
};

/** The text of a guide in a language, with the station list's counts. */
function guideText(lang, key, byCountry, total) {
  const n = (code) => num(lang, byCountry.get(code)?.length ?? 0);
  const a = (path, text) => `<a href="${SITE.url(path)}">${text}</a>`;
  return GUIDES[lang][key]({ n, total: num(lang, Math.floor(total / 100) * 100), a });
}

function guidePage(lang, key, byCountry, total) {
  const g = guideText(lang, key, byCountry, total);
  const idx = GUIDES[lang].index;
  const alternates = { ...GUIDE_PATHS[key], 'x-default': GUIDE_PATHS[key].en };
  const section = (s) => html`<h2>${esc(s.h2)}</h2>
    ${(s.p ?? []).map((p) => `<p>${p}</p>`)}
    ${s.ol ? `<ol>${s.ol.map((li) => `<li>${li}</li>`).join('')}</ol>` : ''}
    ${s.ul ? `<ul>${s.ul.map((li) => `<li>${li}</li>`).join('')}</ul>` : ''}`;
  const badge = key === 'mac' ? macAppStoreBadge(lang, { height: 54 }) : storeBadge(lang, { height: 54 });
  const others = ORDER.filter((k) => k !== key);
  const body = html`
${nav(lang)}
<main class="doc guide">
  <p class="kicker"><a href="${SITE.url(GUIDES_INDEX[lang])}">${esc(idx.kicker)}</a></p>
  <h1>${esc(g.title)}</h1>
  <div class="doc-body">
    <p class="doc-lead">${g.lead}</p>
    <div class="guide-cta">${badge}</div>
    ${g.sections.map(section)}
    <h2>${esc(idx.faq)}</h2>
    ${g.faq.map(([q, ans]) => `<h3>${esc(q)}</h3><p>${ans}</p>`)}
    <div class="guide-cta">${badge}</div>
    <p class="more-links">${others.map((k) => `<a class="more-link" href="${SITE.url(GUIDE_PATHS[k][lang])}">${esc(guideText(lang, k, byCountry, total).title)} →</a>`).join(' ')}</p>
  </div>
</main>`;
  return page({
    lang,
    path: GUIDE_PATHS[key][lang],
    title: `${g.title} – Skywave Radio`,
    description: g.meta,
    body,
    alternates,
    bodyClass: 'doc-page',
    scripts: ['/js/site.js'],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        ['Skywave Radio', landingPath(lang)],
        [idx.title, GUIDES_INDEX[lang]],
        [g.title, GUIDE_PATHS[key][lang]],
      ].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE.abs(path) })),
    },
  });
}

function indexPage(lang, byCountry, total) {
  const idx = GUIDES[lang].index;
  const alternates = { ...GUIDES_INDEX, 'x-default': GUIDES_INDEX.en };
  const body = html`
${nav(lang)}
<main class="doc guide">
  <h1>${esc(idx.title)}</h1>
  <div class="doc-body">
    <p class="doc-lead">${esc(idx.meta)}</p>
    <ul class="guide-list">
      ${ORDER.map((k) => {
        const g = guideText(lang, k, byCountry, total);
        return `<li><a href="${SITE.url(GUIDE_PATHS[k][lang])}">${esc(g.title)}</a><p>${esc(g.meta)}</p></li>`;
      })}
    </ul>
    ${SITE.season ? `<p><a class="more-link" href="${SITE.url(XMAS_PATHS[lang])}">🎄 ${esc(T[lang].nav.xmasFooter)} →</a></p>` : ''}
  </div>
</main>`;
  return page({
    lang,
    path: GUIDES_INDEX[lang],
    title: `${idx.title} – Skywave Radio`,
    description: idx.meta,
    body,
    alternates,
    bodyClass: 'doc-page',
    scripts: ['/js/site.js'],
  });
}

/** [path, html] of every guide and guides index, in every language. */
export const guidePages = (byCountry, total) =>
  LANGS.flatMap((lang) => [
    [GUIDES_INDEX[lang], indexPage(lang, byCountry, total)],
    ...ORDER.map((k) => [GUIDE_PATHS[k][lang], guidePage(lang, k, byCountry, total)]),
  ]);
