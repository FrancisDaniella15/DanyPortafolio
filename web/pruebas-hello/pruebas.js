// Formas de entrar al hero: A (cámara), B (teclas reales), D (revelado) y E (zoom en la O).
(function () {
  'use strict';

  const root = document.documentElement;
  const hero = document.getElementById('inicio');
  const stage = document.getElementById('desk-stage');
  const typed = document.getElementById('typed');
  const typedText = typed.querySelector('.typed__text');
  const overlay = document.getElementById('overlay');
  const overlayBg = overlay.querySelector('.overlay__bg');
  const realKeys = Array.from(overlay.querySelectorAll('.real-key'));
  const note = document.getElementById('note');
  const keyRow = document.getElementById('real-keys');
  const detailO = document.getElementById('detail-o');
  const PHOTO_W = 1536;
  const PHOTO_H = 1024;
  const KEYBOARD = { x0: 455, x1: 1150, cx: 802, cy: 737 };
  // Letra O en la foto (px de la imagen original) y en la tecla HELLO (fracción de la imagen),
  // para que el cruce alinee las letras y no los bordes de las teclas.
  const PHOTO_O = { cx: 929.8, cy: 708.85, glyph: 9.5 };
  const HELLO_O = { cx: .5, cy: .46, glyph: .2888 };

  const NOTES = {
    a: 'A · Primer plano del teclado de la foto: se pulsan H-E-L-L-O y la cámara se aleja hasta el hero.',
    b: 'B · Tus teclas HELLO reales caen, esperan y vuelan en curva hasta su letra del teclado.',
    d: 'D · Tus teclas HELLO aparecen, la L naranja hace de Enter y un círculo abre el hero desde ella.',
    e: 'E1 · Zoom: HELLO entra de derecha a izquierda, la cámara se acerca a la O, se funde con la O del teclado y se aleja.',
    e2: 'E2 · Portal: las demás letras siguen hacia la izquierda y la cara de la O se abre como una ventana que crece hasta ser el escritorio.',
    e3: 'E3 · La O cae: las demás letras siguen hacia la izquierda, aparece el escritorio y la O vuela hasta encajar en su tecla.'
  };

  let running = [];
  let timers = [];
  let current = 'a';

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
    typed.classList.remove('is-on');
    typedText.textContent = '';
    overlay.classList.remove('is-on', 'overlay--mask');
    detailO.classList.remove('is-on');
    stage.parentElement.style.clipPath = '';
    hero.style.zIndex = '';
    realKeys.forEach(function (key) { key.style.opacity = ''; });
    window.scrollTo(0, 0);
  }

  function finalView() {
    const width = hero.clientWidth;
    const height = hero.clientHeight;
    const s = Math.max(width / PHOTO_W, height / PHOTO_H);
    return { s: s, tx: (width - PHOTO_W * s) / 2, ty: height - PHOTO_H * s };
  }

  function closeView() {
    const width = hero.clientWidth;
    const height = hero.clientHeight;
    const s = Math.min(width * .94 / (KEYBOARD.x1 - KEYBOARD.x0), height * 1.35 / 300);
    return { s: s, tx: width / 2 - KEYBOARD.cx * s, ty: height * .64 - KEYBOARD.cy * s };
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

  // ---------- A · Cámara desde el teclado ----------

  async function playA() {
    root.dataset.intro = 'play';
    const close = closeView();
    const end = finalView();
    applyView(end);
    stage.style.transform = toTransform(close);
    typed.classList.add('is-on');
    track(typed.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' }));
    await wait(450);

    for (const letter of 'hello') {
      pressPhotoKey(letter, true);
      typedText.textContent += letter;
      await wait(200);
    }
    await wait(380);

    revealHero();
    track(typed.animate([
      { opacity: 1, transform: 'translateY(0) scale(1)' },
      { opacity: 0, transform: 'translateY(-30px) scale(.9)' }
    ], { duration: 520, easing: 'ease-in', fill: 'forwards' }));
    const zoom = track(stage.animate([
      { transform: toTransform(close) },
      { transform: toTransform(end) }
    ], { duration: 1500, easing: 'cubic-bezier(.65,0,.2,1)', fill: 'forwards' }));
    later(function () {
      stage.querySelectorAll('.photo-key').forEach(function (key) { key.classList.remove('is-lit'); });
    }, 900);
    try { await zoom.finished; } catch (error) { return; }
    stage.style.transform = '';
    zoom.cancel();
    typed.classList.remove('is-on');
  }

  // ---------- B · Teclas reales que vuelan ----------

  async function dropKeys(fast) {
    const drops = realKeys.map(function (key, i) {
      const tilt = [-5, 3, -2, 4, -3][i];
      const frames = fast
        ? [{ opacity: 0, transform: 'translateY(18%)' }, { opacity: 1, transform: 'translateY(0)' }]
        : [
            { opacity: 0, transform: 'translateY(-130%) rotate(' + tilt + 'deg)' },
            { opacity: 1, transform: 'translateY(4%) rotate(0deg) scaleY(.96)', offset: .68 },
            { opacity: 1, transform: 'translateY(-4%) scaleY(1.01)', offset: .84 },
            { opacity: 1, transform: 'translateY(0) scaleY(1)' }
          ];
      return track(key.animate(frames, {
        duration: fast ? 420 : 640,
        delay: 200 + i * (fast ? 90 : 130),
        easing: fast ? 'cubic-bezier(.2,.7,.2,1)' : 'cubic-bezier(.3,.6,.3,1)',
        fill: 'forwards'
      })).finished;
    });
    await Promise.all(drops);
  }

  async function playB() {
    root.dataset.intro = 'play';
    applyView(finalView());
    setRealKeySources();
    overlay.classList.add('is-on');
    try { await dropKeys(false); } catch (error) { return; }
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

  // ---------- D · Revelado desde la L naranja ----------

  async function playD() {
    root.dataset.intro = 'play';
    const end = finalView();
    applyView(end);
    setRealKeySources();
    overlay.classList.add('is-on');
    try { await dropKeys(true); } catch (error) { return; }
    await wait(420);

    const accent = realKeys[2];
    try {
      await track(accent.animate([
        { transform: 'translateY(0) scale(1)', filter: 'brightness(1)' },
        { transform: 'translateY(5%) scale(.97)', filter: 'brightness(.92)', offset: .45 },
        { transform: 'translateY(0) scale(1)', filter: 'brightness(1)' }
      ], { duration: 260, easing: 'ease-out' })).finished;
    } catch (error) { return; }

    const rect = accent.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy)) + 40;
    overlay.style.setProperty('--cx', cx + 'px');
    overlay.style.setProperty('--cy', cy + 'px');
    overlay.classList.add('overlay--mask');
    revealHero();
    track(stage.animate([
      { transform: 'translate(' + (end.tx - (cx - end.tx) * .06) + 'px, ' + (end.ty - (cy - end.ty) * .06) + 'px) scale(' + end.s * 1.06 + ')' },
      { transform: toTransform(end) }
    ], { duration: 1400, easing: 'cubic-bezier(.2,.7,.2,1)' }));
    realKeys.forEach(function (key) {
      track(key.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.06)' }], { duration: 500, easing: 'ease-in', fill: 'forwards' }));
    });
    const opening = track(overlay.animate([{ '--r': '0px' }, { '--r': radius + 'px' }], { duration: 1150, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }));
    try { await opening.finished; } catch (error) { return; }
    overlay.classList.remove('is-on', 'overlay--mask');
    opening.cancel();
  }

  // ---------- E · Zoom en la O que se convierte en el teclado ----------

  // Preparación común de E: HELLO entra de derecha a izquierda, la H primero.
  async function slideHello() {
    root.dataset.intro = 'play';
    const view = finalView();
    applyView(view);
    setRealKeySources();
    const theme = root.dataset.theme === 'claro' ? 'claro' : 'calido';
    const keyO = realKeys[4];
    keyO.src = '../assets/hello/' + theme + '-o-grande.webp';
    detailO.src = '../assets/hero/escritorio-' + theme + '-detalle-o.webp';
    overlay.classList.add('is-on');
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

    // 2. La cámara se acerca a la O hasta el tamaño de la O del teclado en primer plano.
    const height = window.innerHeight;
    const target = Math.min(width * .3, height * .42);
    const o = keyO.getBoundingClientRect();
    const row = keyRow.getBoundingClientRect();
    const k = target / o.width;
    const ox = o.left + o.width * HELLO_O.cx;
    const oy = o.top + o.height * HELLO_O.cy;
    const tx = width / 2 - row.left - (ox - row.left) * k;
    const ty = height / 2 - row.top - (oy - row.top) * k;
    keyRow.style.transformOrigin = '0 0';
    realKeys.slice(0, 4).forEach(function (key) {
      track(key.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 120, easing: 'ease', fill: 'forwards' }));
    });
    const zoomIn = track(keyRow.animate([
      { transform: 'translate(0, 0) scale(1)' },
      { transform: 'translate(' + tx + 'px, ' + ty + 'px) scale(' + k + ')' }
    ], { duration: 850, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' }));
    try { await zoomIn.finished; } catch (error) { return; }

    // 3. La O se funde con la O del teclado (misma posición y tamaño) y la cámara se aleja.
    const s = target * HELLO_O.glyph / PHOTO_O.glyph;
    const close = { s: s, tx: width / 2 - PHOTO_O.cx * s, ty: height / 2 - PHOTO_O.cy * s };
    stage.style.transform = toTransform(close);
    track(overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: 'ease', fill: 'forwards' }));
    await wait(160);
    revealHero();
    const zoomOut = track(stage.animate([
      { transform: toTransform(close) },
      { transform: toTransform(end) }
    ], { duration: 1650, easing: 'cubic-bezier(.6,0,.2,1)', fill: 'forwards' }));
    try { await zoomOut.finished; } catch (error) { return; }
    stage.style.transform = '';
    zoomOut.cancel();
    overlay.classList.remove('is-on');
    detailO.classList.remove('is-on');
  }

  // ---------- E2 · La cara de la O se abre como un portal ----------

  async function playE2() {
    let setup;
    try { setup = await slideHello(); } catch (error) { return; }
    const keyO = setup.keyO;
    const end = setup.end;

    sweepOthersLeft();
    try {
      await track(keyO.animate([
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(4%) scale(.97)', offset: .45 },
        { transform: 'translateY(0) scale(1)' }
      ], { duration: 240, delay: 120, easing: 'ease-out' })).finished;
    } catch (error) { return; }

    // La foto se coloca detrás de la O con su letra exactamente debajo.
    const glyph = helloGlyph(keyO);
    const s = glyph.rect.width * HELLO_O.glyph / PHOTO_O.glyph;
    const close = { s: s, tx: glyph.x - PHOTO_O.cx * s, ty: glyph.y - PHOTO_O.cy * s };
    stage.style.transform = toTransform(close);
    detailO.classList.add('is-on');

    const deskEl = stage.parentElement;
    const box = deskEl.getBoundingClientRect();
    const o = glyph.rect;
    const from = 'inset(' +
      (o.top - box.top + o.height * .07) + 'px ' +
      (box.right - o.right + o.width * .11) + 'px ' +
      (box.bottom - o.bottom + o.height * .2) + 'px ' +
      (o.left - box.left + o.width * .11) + 'px round ' + (o.width * .16) + 'px)';
    hero.style.zIndex = '90';
    deskEl.style.clipPath = from;
    later(revealHero, 650);
    // La ventana se abre antes de que la cámara empiece a alejarse, para que la O
    // no se desplace dentro de una ventana todavía pequeña.
    const opening = track(deskEl.animate([
      { clipPath: from },
      { clipPath: 'inset(0px 0px 0px 0px round 0px)' }
    ], { duration: 1050, easing: 'cubic-bezier(.55,0,.15,1)', fill: 'forwards' }));
    const zoomOut = track(stage.animate([
      { transform: toTransform(close) },
      { transform: toTransform(end) }
    ], { duration: 1500, delay: 220, easing: 'cubic-bezier(.6,0,.2,1)', fill: 'both' }));
    try { await zoomOut.finished; } catch (error) { return; }
    overlay.classList.remove('is-on');
    deskEl.style.clipPath = '';
    hero.style.zIndex = '';
    stage.style.transform = '';
    opening.cancel();
    zoomOut.cancel();
    detailO.classList.remove('is-on');
  }

  // ---------- E3 · La O vuela hasta encajar en su tecla ----------

  async function playE3() {
    let setup;
    try { setup = await slideHello(); } catch (error) { return; }
    const keyO = setup.keyO;
    const end = setup.end;

    sweepOthersLeft();
    await wait(480);
    revealHero();
    track(overlayBg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 750, easing: 'ease', fill: 'forwards' }));

    const glyph = helloGlyph(keyO);
    const o = glyph.rect;
    const k = PHOTO_O.glyph * end.s / (HELLO_O.glyph * o.width);
    const gx = end.tx + PHOTO_O.cx * end.s;
    const gy = end.ty + PHOTO_O.cy * end.s;
    const dx = gx - o.left - o.width * HELLO_O.cx * k;
    const dy = gy - o.top - o.height * HELLO_O.cy * k;
    const lift = -Math.min(140, Math.abs(dy) * .5);
    const duration = 1200;
    later(function () { pressPhotoKey('o', false); }, duration * .86);
    const flight = track(keyO.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: 'translate(' + dx * .4 + 'px, ' + (dy * .4 + lift) + 'px) scale(' + (1 + k) / 2 + ') rotate(-6deg)', opacity: 1, offset: .45 },
      { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + k + ') rotate(0deg)', opacity: 1, offset: .86 },
      { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + k + ') rotate(0deg)', opacity: 0 }
    ], { duration: duration, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'forwards' }));
    try { await flight.finished; } catch (error) { return; }
    overlay.classList.remove('is-on');
  }

  // ---------- Controles ----------

  const variants = { a: playA, b: playB, d: playD, e: playE, e2: playE2, e3: playE3 };

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
    play(variants[requested] ? requested : 'a');
  });
})();
