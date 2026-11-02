// Formas de entrar al hero: B (teclas reales), E1 (zoom en la O) y E3 (la O cae).
(function () {
  'use strict';

  const root = document.documentElement;
  const hero = document.getElementById('inicio');
  const stage = document.getElementById('desk-stage');
  const overlay = document.getElementById('overlay');
  const overlayBg = overlay.querySelector('.overlay__bg');
  const realKeys = Array.from(overlay.querySelectorAll('.real-key'));
  const note = document.getElementById('note');
  const keyRow = document.getElementById('real-keys');
  const detailO = document.getElementById('detail-o');
  const PHOTO_W = 1536;
  const PHOTO_H = 1024;
  // Letra O en la foto (px de la imagen original) y en la tecla HELLO (fracción de la imagen),
  // para que el cruce alinee las letras y no los bordes de las teclas.
  const PHOTO_O = { cx: 929.8, cy: 708.85, glyph: 9.5 };
  const HELLO_O = { cx: .5, cy: .46, glyph: .2888 };
  // Ancho de la tecla O en la foto (px de la imagen original), para que la O aterrice a su tamaño.
  const PHOTO_KEY_W = 45;

  const NOTES = {
    b: 'B · Tus teclas HELLO reales caen, esperan y vuelan en curva hasta su letra del teclado.',
    e: 'E1 · Zoom: HELLO entra de derecha a izquierda; mientras la cámara se acerca a la O, el teclado va apareciendo a su alrededor. Luego la cámara se aleja hasta el hero.',
    e3: 'E3 · La O cae: HELLO se detiene con la O encima de su tecla, H-E-L-L siguen hacia la izquierda y la O cae hacia abajo con gravedad, rebota y encaja en la O del teclado.'
  };

  let running = [];
  let timers = [];
  let current = 'e3';

  // ---------- Utilidades ----------

  function track(animation) { running.push(animation); return animation; }
  function later(fn, ms) { timers.push(window.setTimeout(fn, ms)); }
  function wait(ms) { return new Promise(function (resolve) { later(resolve, ms); }); }

  function reset() {
    running.forEach(function (animation) { animation.cancel(); });
    timers.forEach(window.clearTimeout);
    running = [];
    timers = [];
    stage.style.transform = '';
    stage.querySelectorAll('.photo-key').forEach(function (key) { key.className = 'photo-key'; });
    overlay.classList.remove('is-on');
    overlayBg.classList.remove('overlay__bg--hole');
    stage.parentElement.style.filter = '';
    detailO.classList.remove('is-on');
    realKeys.forEach(function (key) { key.style.opacity = ''; });
    keyRow.style.transform = '';
    keyRow.style.removeProperty('--k');
    stage.parentElement.getAnimations().forEach(function (animation) { animation.cancel(); });
    window.scrollTo(0, 0);
  }

  function finalView() {
    const width = hero.clientWidth;
    const height = hero.clientHeight;
    const s = Math.max(width / PHOTO_W, height / PHOTO_H);
    return { s: s, tx: (width - PHOTO_W * s) / 2, ty: height - PHOTO_H * s };
  }

  function toTransform(view) {
    return 'translate(' + view.tx.toFixed(1) + 'px, ' + view.ty.toFixed(1) + 'px) scale(' + view.s.toFixed(4) + ')';
  }

  function applyView(view) {
    stage.style.setProperty('--s', view.s.toFixed(4));
    stage.style.setProperty('--tx', view.tx.toFixed(1) + 'px');
    stage.style.setProperty('--ty', view.ty.toFixed(1) + 'px');
  }

  function photoKey(letter) {
    return stage.querySelector('.photo-key[data-key="' + letter + '"]');
  }

  function pressPhotoKey(letter, lit) {
    const key = photoKey(letter);
    if (!key) return;
    key.classList.add('is-down');
    later(function () {
      key.classList.remove('is-down');
      if (lit) key.classList.add('is-lit');
    }, 150);
  }

  function setRealKeySources() {
    const theme = root.dataset.theme === 'claro' ? 'claro' : 'calido';
    realKeys.forEach(function (img, i) {
      const name = i === 2 ? 'l-acento' : img.dataset.letter;
      img.src = '../assets/hello/' + theme + '-' + name + '.webp';
    });
  }

  function revealHero() {
    root.dataset.intro = 'reveal';
    later(function () { delete root.dataset.intro; }, 1900);
  }

  // ---------- B · Teclas reales que vuelan ----------

  async function dropKeys() {
    const drops = realKeys.map(function (key, i) {
      const tilt = [-5, 3, -2, 4, -3][i];
      return track(key.animate([
        { opacity: 0, transform: 'translateY(-130%) rotate(' + tilt + 'deg)' },
        { opacity: 1, transform: 'translateY(4%) rotate(0deg) scaleY(.96)', offset: .68 },
        { opacity: 1, transform: 'translateY(-4%) scaleY(1.01)', offset: .84 },
        { opacity: 1, transform: 'translateY(0) scaleY(1)' }
      ], { duration: 640, delay: 200 + i * 130, easing: 'cubic-bezier(.3,.6,.3,1)', fill: 'forwards' })).finished;
    });
    await Promise.all(drops);
  }

  async function playB() {
    root.dataset.intro = 'play';
    applyView(finalView());
    setRealKeySources();
    overlay.classList.add('is-on');
    try { await dropKeys(); } catch (error) { return; }
    await wait(450);

    revealHero();
    track(overlayBg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 900, delay: 150, easing: 'ease', fill: 'forwards' }));
    const flights = realKeys.map(function (key, i) {
      const target = photoKey(key.dataset.letter);
      const from = key.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const k = to.width / from.width;
      const dx = to.left - from.left;
      const dy = to.top - from.top;
      const lift = -Math.min(120, Math.abs(dy) * .45);
      const tilt = i % 2 ? 5 : -5;
      const duration = 1150;
      const delay = i * 85;
      later(function () { pressPhotoKey(key.dataset.letter, false); }, delay + duration * .86);
      return track(key.animate([
        { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
        { transform: 'translate(' + dx * .45 + 'px, ' + (dy * .45 + lift) + 'px) scale(' + (1 + k) / 2 + ') rotate(' + tilt + 'deg)', opacity: 1, offset: .45 },
        { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + k + ') rotate(0deg)', opacity: 1, offset: .86 },
        { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + k + ') rotate(0deg)', opacity: 0 }
      ], { duration: duration, delay: delay, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'forwards' })).finished;
    });
    try { await Promise.all(flights); } catch (error) { return; }
    overlay.classList.remove('is-on');
  }

  // ---------- E · Zoom en la O que se convierte en el teclado ----------

  // Preparación común de E: HELLO entra de derecha a izquierda, la H primero.
  // options.keyWidth: ancho de cada tecla en px. options.anchorO(view): punto de pantalla
  // donde debe quedar el centro de la letra O cuando HELLO se detiene.
  async function slideHello(options) {
    const settings = options || {};
    root.dataset.intro = 'play';
    const view = finalView();
    applyView(view);
    setRealKeySources();
    const theme = root.dataset.theme === 'claro' ? 'claro' : 'calido';
    const keyO = realKeys[4];
    keyO.src = '../assets/hello/' + theme + '-o-grande.webp';
    detailO.src = '../assets/hero/escritorio-' + theme + '-detalle-o.webp';
    if (settings.keyWidth) keyRow.style.setProperty('--k', settings.keyWidth + 'px');
    overlay.classList.add('is-on');
    if (settings.anchorO) {
      const anchor = settings.anchorO(view);
      const glyph = helloGlyph(keyO);
      keyRow.style.transform = 'translate(' + (anchor.x - glyph.x).toFixed(1) + 'px, ' + (anchor.y - glyph.y).toFixed(1) + 'px)';
    }
    const width = window.innerWidth;
    const slides = realKeys.map(function (key, i) {
      const distance = width - key.getBoundingClientRect().left + 40;
      return track(key.animate([
        { opacity: 1, transform: 'translateX(' + distance + 'px)' },
        { opacity: 1, transform: 'translateX(-3%)', offset: .82 },
        { opacity: 1, transform: 'translateX(0)' }
      ], { duration: 820, delay: 150 + i * 95, easing: 'cubic-bezier(.2,.75,.25,1)', fill: 'forwards' })).finished;
    });
    await Promise.all(slides);
    await wait(280);
    return { end: view, keyO: keyO, width: width, height: window.innerHeight };
  }

  // Las letras H, E, L, L siguen su camino hacia la izquierda y salen de la pantalla.
  function sweepOthersLeft() {
    // Misma distancia para todas: la palabra sale entera, sin que las letras se monten.
    const distance = realKeys[3].getBoundingClientRect().right + 60;
    realKeys.slice(0, 4).forEach(function (key, i) {
      track(key.animate([
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 1, transform: 'translateX(' + -distance + 'px)' }
      ], { duration: 720, delay: i * 35, easing: 'cubic-bezier(.55,0,.75,.4)', fill: 'forwards' }));
    });
  }

  // Centro de la letra O de la tecla HELLO en pantalla.
  function helloGlyph(keyO) {
    const o = keyO.getBoundingClientRect();
    return { rect: o, x: o.left + o.width * HELLO_O.cx, y: o.top + o.height * HELLO_O.cy };
  }

  async function playE() {
    let setup;
    try { setup = await slideHello(); } catch (error) { return; }
    const width = setup.width;
    const end = setup.end;
    const keyO = setup.keyO;
    detailO.classList.add('is-on');

    // 2. La cámara se acerca a la O y, mientras tanto, el teclado de la foto va
    //    apareciendo alrededor de ella. La foto se mueve en sincronía con la O
    //    (misma duración y curva), con la letra de la foto siempre bajo la de la tecla.
    const height = window.innerHeight;
    // Tope: la O de la foto no pasa de ~6 px de pantalla por px de la imagen original,
    // el máximo que la foto escalada con IA aguanta sin verse pintada.
    const target = Math.min(width * .24, height * .36, 6 * PHOTO_O.glyph / HELLO_O.glyph);
    const glyph = helloGlyph(keyO);
    const o = glyph.rect;
    const row = keyRow.getBoundingClientRect();
    const k = target / o.width;
    const tx = width / 2 - row.left - (glyph.x - row.left) * k;
    const ty = height / 2 - row.top - (glyph.y - row.top) * k;
    const s0 = o.width * HELLO_O.glyph / PHOTO_O.glyph;
    const s1 = target * HELLO_O.glyph / PHOTO_O.glyph;
    const photoFrom = { s: s0, tx: glyph.x - PHOTO_O.cx * s0, ty: glyph.y - PHOTO_O.cy * s0 };
    const photoTo = { s: s1, tx: width / 2 - PHOTO_O.cx * s1, ty: height / 2 - PHOTO_O.cy * s1 };
    const duration = 1500;
    const easing = 'cubic-bezier(.6,0,.35,1)';

    keyRow.style.transformOrigin = '0 0';
    stage.style.transform = toTransform(photoFrom);
    overlayBg.classList.add('overlay__bg--hole');
    realKeys.slice(0, 4).forEach(function (key) {
      track(key.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, easing: 'ease', fill: 'forwards' }));
    });
    track(keyRow.animate([
      { transform: 'translate(0, 0) scale(1)' },
      { transform: 'translate(' + tx + 'px, ' + ty + 'px) scale(' + k + ')' }
    ], { duration: duration, easing: easing, fill: 'forwards' }));
    track(stage.animate([
      { transform: toTransform(photoFrom) },
      { transform: toTransform(photoTo) }
    ], { duration: duration, easing: easing, fill: 'forwards' }));
    // Profundidad de campo: la tecla HELLO enfocada y el teclado algo desenfocado.
    const deskEl = stage.parentElement;
    track(deskEl.animate([{ filter: 'blur(1.5px)' }, { filter: 'blur(3.5px)' }], { duration: duration, easing: easing, fill: 'forwards' }));
    // El fondo se abre desde la O hacia fuera y deja ver el teclado.
    const opening = track(overlayBg.animate([
      { '--mx': glyph.x + 'px', '--my': glyph.y + 'px', '--r': (o.width * .35) + 'px' },
      { '--mx': width / 2 + 'px', '--my': height / 2 + 'px', '--r': Math.hypot(width, height) + 'px' }
    ], { duration: duration, easing: 'cubic-bezier(.45,0,.4,1)', fill: 'forwards' }));
    try { await opening.finished; } catch (error) { return; }

    // 3. Cambio de foco: la tecla HELLO se funde, el teclado se enfoca y la cámara se aleja.
    track(keyO.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: 'ease', fill: 'forwards' }));
    track(deskEl.animate([{ filter: 'blur(3.5px)' }, { filter: 'blur(0px)' }], { duration: 700, easing: 'ease-out', fill: 'forwards' }));
    await wait(120);
    revealHero();
    const zoomOut = track(stage.animate([
      { transform: toTransform(photoTo) },
      { transform: toTransform(end) }
    ], { duration: 1650, easing: 'cubic-bezier(.6,0,.2,1)', fill: 'forwards' }));
    try { await zoomOut.finished; } catch (error) { return; }
    stage.style.transform = '';
    zoomOut.cancel();
    overlay.classList.remove('is-on');
    overlayBg.classList.remove('overlay__bg--hole');
    detailO.classList.remove('is-on');
  }

  // ---------- E3 · La O cae sobre su tecla ----------
  // HELLO se detiene con la O justo encima de su tecla. H-E-L-L siguen hacia la
  // izquierda, aparece el escritorio y la O cae en 2D (eje Y) con gravedad y rebota.

  // Centro de la letra O del teclado de la foto, en pantalla.
  function photoGlyph(view) {
    return { x: view.tx + PHOTO_O.cx * view.s, y: view.ty + PHOTO_O.cy * view.s };
  }

  async function playE3() {
    const view = finalView();
    const target = photoGlyph(view);
    const height = window.innerHeight;
    // Teclas de HELLO del mismo tamaño que las del teclado: la O cae sin cambiar de tamaño.
    const keyWidth = Math.round(PHOTO_KEY_W * view.s);
    // La O espera en la misma vertical que su tecla, a un tercio de la altura.
    const hoverY = Math.max(140, Math.min(height * .3, target.y - 200));
    let setup;
    try {
      setup = await slideHello({ keyWidth: keyWidth, anchorO: function () { return { x: target.x, y: hoverY }; } });
    } catch (error) { return; }
    const keyO = setup.keyO;
    const end = setup.end;

    // Aparece el escritorio y las demás letras siguen su camino.
    track(overlayBg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, easing: 'ease', fill: 'forwards' }));
    await wait(250);
    sweepOthersLeft();
    await wait(650);

    const glyph = helloGlyph(keyO);
    const o = glyph.rect;
    const px = o.width * HELLO_O.cx;
    const py = o.height * HELLO_O.cy;
    // Coloca el centro de la letra en (x, y) con la escala indicada.
    function at(scale, x, y) {
      return 'translate(' + (x - o.left - px * scale).toFixed(2) + 'px, ' + (y - o.top - py * scale).toFixed(2) + 'px) scale(' + scale.toFixed(4) + ')';
    }
    // Ajuste fino para que la tecla mida exactamente lo mismo que la de la foto.
    const k = PHOTO_KEY_W * end.s / o.width;
    const gx = target.x;
    const gy = target.y;
    const fall = gy - glyph.y;

    // Tiempos (ms): caída y dos rebotes que pierden altura, como un objeto real.
    const T = { fall: 760, up1: 210, down1: 210, up2: 105, down2: 105 };
    const total = T.fall + T.up1 + T.down1 + T.up2 + T.down2;
    let elapsed = 0;
    function mark(ms) { elapsed += ms; return elapsed / total; }
    const gravity = 'cubic-bezier(.55,.085,.68,.53)';   // acelera (caída)
    const rise = 'cubic-bezier(.25,.46,.45,.94)';       // frena (subida)
    later(function () { pressPhotoKey('o', false); revealHero(); }, T.fall);

    const drop = track(keyO.animate([
      { transform: at(1, gx, glyph.y), easing: gravity },
      { transform: at(k, gx, gy), offset: mark(T.fall), easing: rise },
      { transform: at(k, gx, gy - fall * .1), offset: mark(T.up1), easing: gravity },
      { transform: at(k, gx, gy), offset: mark(T.down1), easing: rise },
      { transform: at(k, gx, gy - fall * .025), offset: mark(T.up2), easing: gravity },
      { transform: at(k, gx, gy) }
    ], { duration: total, fill: 'forwards' }));
    try { await drop.finished; } catch (error) { return; }

    // La tecla HELLO se funde con la del teclado.
    const melt = track(keyO.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, easing: 'ease', fill: 'forwards' }));
    try { await melt.finished; } catch (error) { return; }
    overlay.classList.remove('is-on');
  }

  // ---------- Controles ----------

  const variants = { b: playB, e: playE, e3: playE3 };

  function play(name) {
    reset();
    current = name;
    document.querySelectorAll('[data-variant]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.variant === name));
    });
    note.textContent = NOTES[name];
    try { history.replaceState(null, '', '?v=' + name); } catch (error) {}
    variants[name]();
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll('[data-theme-option]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.themeOption === theme));
    });
    try { localStorage.setItem('fd-theme', theme); } catch (error) {}
  }

  document.querySelectorAll('[data-variant]').forEach(function (button) {
    button.addEventListener('click', function () { play(button.dataset.variant); });
  });
  document.getElementById('replay').addEventListener('click', function () { play(current); });
  document.querySelectorAll('[data-theme-option]').forEach(function (button) {
    button.addEventListener('click', function () {
      setTheme(button.dataset.themeOption);
      play(current);
    });
  });
  window.addEventListener('resize', function () {
    if (!root.dataset.intro) applyView(finalView());
  });

  setTheme(root.dataset.theme === 'claro' ? 'claro' : 'calido');
  setRealKeySources();
  const requested = new URLSearchParams(location.search).get('v');
  const photos = Array.from(stage.querySelectorAll('.desk__photo')).map(function (img) {
    return img.decode ? img.decode().catch(function () {}) : null;
  });
  Promise.all([document.fonts ? document.fonts.ready : null].concat(photos)).then(function () {
    play(variants[requested] ? requested : 'e3');
  });
})();
