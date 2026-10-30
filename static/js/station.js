// A station's page: the mini player, and "Listen in Skywave", which opens the app on the station
// or, when the app isn't installed, the App Store.
(() => {
  const root = document.getElementById('player');
  if (!root) return;
  const d = root.dataset;
  const button = root.querySelector('.play');
  const statusText = root.querySelector('.status-text');
  const unavailable = root.querySelector('.unavailable');
  const audio = new Audio();
  audio.preload = 'none';
  let hls = null;
  let state = 'idle';

  // An http stream can't play on an https page: try its https address, else the app plays it.
  const stream = location.protocol === 'https:' && d.stream.startsWith('http:') ? `https:${d.stream.slice(5)}` : d.stream;

  function setState(next) {
    state = next;
    root.dataset.state = next;
    button.setAttribute('aria-label', next === 'playing' ? d.tPause : d.tPlay);
    statusText.textContent = next === 'loading' ? d.tLoading : d.tLive;
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = next === 'playing' ? 'playing' : 'paused';
  }

  function fail() {
    stop();
    root.classList.add('failed');
    unavailable.hidden = false;
  }

  function stop() {
    if (hls) { hls.destroy(); hls = null; }
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    setState('idle');
  }

  function loadHls() {
    return new Promise((resolve, reject) => {
      if (window.Hls) return resolve(window.Hls);
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.13/hls.min.js';
      s.onload = () => resolve(window.Hls);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function play() {
    setState('loading');
    unavailable.hidden = true;
    root.classList.remove('failed');
    try {
      // Live radio: start from the live edge each time, never where it was paused.
      if (d.hls === '1' && !audio.canPlayType('application/vnd.apple.mpegurl')) {
        const Hls = await loadHls();
        if (!Hls || !Hls.isSupported()) return fail();
        hls = new Hls({ liveDurationInfinity: true });
        hls.on(Hls.Events.ERROR, (_, e) => e.fatal && fail());
        hls.loadSource(stream);
        hls.attachMedia(audio);
      } else {
        audio.src = stream;
      }
      await audio.play();
    } catch (e) {
      if (e && e.name === 'NotAllowedError') setState('idle');
      else fail();
    }
  }

  audio.addEventListener('playing', () => setState('playing'));
  audio.addEventListener('waiting', () => state !== 'idle' && setState('loading'));
  audio.addEventListener('error', () => state !== 'idle' && fail());
  button.addEventListener('click', () => (state === 'idle' ? play() : stop()));

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: d.name,
      artist: 'Skywave',
      artwork: d.logo ? [{ src: d.logo, sizes: '512x512' }] : [],
    });
    navigator.mediaSession.setActionHandler('play', play);
    navigator.mediaSession.setActionHandler('pause', stop);
    navigator.mediaSession.setActionHandler('stop', stop);
  }

  // "Listen in Skywave": on iPhone, the app's link; if the page is still showing a moment later,
  // the app isn't installed, so the App Store. Elsewhere, the App Store (and the phone's camera
  // or a link sent to oneself does the rest).
  const open = root.querySelector('.open-app');
  const iOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (!iOS) {
    open.href = d.store;
    return;
  }
  open.addEventListener('click', (e) => {
    e.preventDefault();
    stop();
    const started = Date.now();
    const timer = setTimeout(() => {
      if (!document.hidden && Date.now() - started < 3000) location.href = d.store;
    }, 1600);
    document.addEventListener('visibilitychange', () => document.hidden && clearTimeout(timer), { once: true });
    location.href = d.app;
  });
})();
