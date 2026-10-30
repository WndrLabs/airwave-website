// Every page: the nav's background once scrolled, reveals, parallax, the animated wave. The landing
// page also gets the counters, the CarPlay switch and the tunnel.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  // First visit on the English home page with a French or German browser: that language instead.
  const langLinks = $$('.footer-langs a');
  langLinks.forEach((a) => a.addEventListener('click', () => remember(a.dataset.lang)));
  function remember(lang) {
    try { localStorage.setItem('lang', lang); } catch {}
  }
  if (document.body.classList.contains('landing') && document.documentElement.lang === 'en') {
    let saved = null;
    try { saved = localStorage.getItem('lang'); } catch {}
    const wanted = (navigator.languages || [navigator.language]).map((l) => l.slice(0, 2)).find((l) => ['en', 'fr', 'de'].includes(l));
    const target = langLinks.find((a) => a.dataset.lang === (saved || wanted));
    if (target && (saved || wanted) !== 'en') {
      location.replace(target.href);
      return;
    }
  }

  // A logo that fails: the station's initial on the app's colours instead of a broken image.
  addEventListener('error', (e) => {
    const img = e.target;
    if (!img.classList || !img.classList.contains('logo')) return;
    const name = (img.closest('a, .player')?.querySelector('span, h1')?.textContent || '').trim();
    const tile = document.createElement('span');
    tile.className = 'logo logo-text';
    tile.style.cssText = `--from:#5B5FD9;--to:#1F1F52;width:${img.width}px;height:${img.height}px;font-size:${Math.round(img.width * 0.4)}px`;
    tile.textContent = (name.match(/[\p{L}\p{N}]/u) || ['♪'])[0].toUpperCase();
    img.replaceWith(tile);
  }, true);

  const nav = document.getElementById('nav');
  const onScrollNav = () => nav && nav.classList.toggle('scrolled', scrollY > 30);

  // Reveals
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    $$('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  } else {
    $$('.reveal').forEach((el) => el.classList.add('in'));
  }

  // Parallax: each [data-speed] element moves by speed × its distance to the middle of the screen.
  const layers = reduced ? [] : $$('[data-speed]');
  const carplay = document.querySelector('.carplay');
  function frame() {
    onScrollNav();
    const mid = innerHeight / 2;
    for (const el of layers) {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) continue;
      const offset = (r.top + r.height / 2 - mid) * parseFloat(el.dataset.speed);
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
    if (carplay) {
      const r = carplay.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      carplay.style.setProperty('--p', p.toFixed(3));
    }
  }
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { frame(); ticking = false; });
  }, { passive: true });
  addEventListener('resize', frame);
  frame();

  // The icon's wave: three sines whose shape breathes, like a signal on air.
  const waves = $$('svg.wave');
  function wavePath(t, amp, phase, freq) {
    let d = '';
    for (let x = 0; x <= 1000; x += 10) {
      const k = x / 1000;
      const env = Math.sin(Math.PI * k) ** 1.4; // flat at both ends, tall in the middle
      const y = 150 + env * amp * Math.sin(k * Math.PI * freq + phase + t) * (0.75 + 0.25 * Math.sin(t * 0.7 + k * 3));
      d += `${x ? 'L' : 'M'}${x},${y.toFixed(1)}`;
    }
    return d;
  }
  function drawWaves(t) {
    for (const svg of waves) {
      const [w3, w2, w1] = svg.querySelectorAll('path');
      w1.setAttribute('d', wavePath(t, 120, 0, 5.2));
      w2.setAttribute('d', wavePath(t * 0.8, 105, 0.5, 5.2));
      w3.setAttribute('d', wavePath(t * 0.6, 90, 1, 5.2));
    }
  }
  drawWaves(0);
  if (!reduced && waves.length) {
    const visible = new Set();
    const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target))));
    waves.forEach((w) => io.observe(w));
    const loop = (ms) => {
      if (visible.size) drawWaves(ms / 900);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // Counters
  const fmt = new Intl.NumberFormat(document.documentElement.lang);
  const counters = $$('[data-count]');
  if (counters.length && !reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const end = Number(e.target.dataset.count);
      const start = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - start) / 1600);
        e.target.textContent = fmt.format(Math.round(end * (1 - (1 - k) ** 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }));
    counters.forEach((c) => { c.textContent = '0'; io.observe(c); });
  }

  // Tunnel: the network (dashed) is flat inside it; the music (gradient) never stops.
  const road = document.querySelector('.road-svg');
  if (road) {
    const line = (inTunnel) => {
      let d = '';
      for (let x = 0; x <= 1200; x += 8) {
        const tunnel = x > 456 && x < 744;
        const amp = inTunnel && tunnel ? 0 : 38;
        const y = 120 + amp * Math.sin(x / 34) * Math.sin(x / 210 + 1);
        d += `${x ? 'L' : 'M'}${x},${y.toFixed(1)}`;
      }
      return d;
    };
    road.querySelector('.net').setAttribute('d', line(true));
    road.querySelector('.music').setAttribute('d', line(false));
  }
})();
