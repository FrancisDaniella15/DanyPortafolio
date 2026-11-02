// Hero con la foto del escritorio: encuadre responsive e intro HELLO.
(function () {
  'use strict';

  const root = document.documentElement;
  const hero = document.getElementById('inicio');
  const desk = document.getElementById('desk');
  const stage = document.getElementById('desk-stage');
  const intro = document.getElementById('intro');
  const introBg = intro.querySelector('.intro__bg');
  const word = document.getElementById('intro-word');
  const introKeys = Array.from(word.querySelectorAll('.intro-key'));
  const PHOTO_W = 1536;
  const PHOTO_H = 1024;
  // Medidas en la foto original (px): letra O y ancho de una tecla.
  const PHOTO_O = { x: 930.3, y: 709.5 };
  const PHOTO_KEY_W = 46.5;
  // Centro de la letra O dentro de la imagen de la tecla HELLO (fracción del ancho y alto).
  const HELLO_O = { x: .5, y: .46 };
  let view = { s: 1, tx: 0, ty: 0 };

  // Encuadre: en escritorio la foto cubre el hero y el texto cae sobre la
  // alfombrilla libre. En pantallas estrechas o verticales el texto va arriba
  // y debajo se muestra un recorte de la foto (en coordenadas de la imagen).
  function fit() {
    const width = hero.clientWidth;
    const compact = width < 1100 || width / window.innerHeight < 1.05;
    root.classList.toggle('desk-compact', compact);
    let s, tx, ty;
    if (compact) {
      const crop = width < 600
        ? { x0: 430, x1: 1010, y0: 560, y1: 925 }   // letras de HELLO
        : { x0: 250, x1: 1500, y0: 150, y1: 960 };  // teclado, bandeja y macropad
      s = width / (crop.x1 - crop.x0);
      tx = -crop.x0 * s;
      ty = -crop.y0 * s;
      desk.style.setProperty('--desk-h', Math.round((crop.y1 - crop.y0) * s) + 'px');
    } else {
      const height = hero.clientHeight;
      s = Math.max(width / PHOTO_W, height / PHOTO_H);
      tx = (width - PHOTO_W * s) / 2;
      ty = height - PHOTO_H * s;
    }
    view = { s: s, tx: tx, ty: ty };
    stage.style.setProperty('--s', s.toFixed(4));
    stage.style.setProperty('--tx', tx.toFixed(1) + 'px');
    stage.style.setProperty('--ty', ty.toFixed(1) + 'px');
  }

  // ---------- Intro HELLO ----------
  // HELLO entra de derecha a izquierda y se detiene con la O justo encima de su tecla.
  // H-E-L-L se disuelven, la O cae en vertical con gravedad, da un rebote y encaja en
  // la O del teclado, mientras la escena pasa de desenfocada a nítida.

  let running = [];
  let timers = [];
  let finishing = false;

  function track(animation) { running.push(animation); return animation; }
  function later(fn, ms) { timers.push(window.setTimeout(fn, ms)); }
  function wait(ms) { return new Promise(function (resolve) { later(resolve, ms); }); }

  function setKeySources() {
    const theme = root.dataset.theme === 'claro' ? 'claro' : 'calido';
    introKeys.forEach(function (img) {
      const name = img.hasAttribute('data-accent') ? 'l-acento' : img.dataset.letter;
      img.src = 'assets/hello/' + theme + '-' + name + '.webp';
    });
  }

  // Centro de la letra O del teclado de la foto, en pantalla.
  function photoGlyph() {
    const box = desk.getBoundingClientRect();
    return { x: box.left + view.tx + PHOTO_O.x * view.s, y: box.top + view.ty + PHOTO_O.y * view.s };
  }

  function helloGlyph(img) {
    const r = img.getBoundingClientRect();
    return { rect: r, x: r.left + r.width * HELLO_O.x, y: r.top + r.height * HELLO_O.y };
  }

  function finish() {
    if (finishing) return;
    finishing = true;
    running.forEach(function (animation) { animation.cancel(); });
    timers.forEach(window.clearTimeout);
    running = [];
    timers = [];
    word.style.transform = '';
    delete root.dataset.intro;
    document.removeEventListener('keydown', onSkipKey);
  }

  function onSkipKey(event) {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      finish();
    }
  }

  async function playIntro() {
    finishing = false;
    root.dataset.intro = 'play';
    window.scrollTo(0, 0);
    fit();
    document.addEventListener('keydown', onSkipKey);
    setKeySources();
    word.style.transform = '';

    const target = photoGlyph();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const keyWidth = Math.max(26, Math.round(PHOTO_KEY_W * view.s));
    word.style.setProperty('--k', keyWidth + 'px');
    const keyO = introKeys[4];
    // Si la tecla no queda a la vista (pantallas muy bajas), HELLO va centrado y la
    // O se desvanece en lugar de caer.
    const canDrop = target.y > 120 && target.y < height - 10 && target.x > 0 && target.x < width;
    if (canDrop) {
      const glyph = helloGlyph(keyO);
      const hoverY = Math.max(110, Math.min(height * .3, target.y - 200));
      word.style.transform = 'translate(' + (target.x - glyph.x).toFixed(1) + 'px, ' + (hoverY - glyph.y).toFixed(1) + 'px)';
    }

    // 1. HELLO entra desde la derecha con una frenada suave.
    const slides = introKeys.map(function (key, i) {
      const distance = width - key.getBoundingClientRect().left + 40;
      return track(key.animate([
        { opacity: 0, transform: 'translateX(' + distance * .55 + 'px)' },
        { opacity: 1, transform: 'translateX(' + distance * .12 + 'px)', offset: .4 },
        { opacity: 1, transform: 'translateX(0)' }
      ], { duration: 1000, delay: 120 + i * 70, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' })).finished;
    });
    try { await Promise.all(slides); } catch (error) { return; }
    await wait(220);
    if (finishing) return;

    // 2. H-E-L-L se disuelven en onda desde la O; la O empieza a caer casi a la vez.
    introKeys.slice(0, 4).forEach(function (key, i) {
      track(key.animate([
        { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)' },
        { opacity: 0, transform: 'translateY(-10px) scale(.96)', filter: 'blur(5px)' }
      ], { duration: 480, delay: (3 - i) * 60, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }));
    });
    await wait(90);
    if (finishing) return;

    const T = { fall: 760, up: 200, down: 200 };
    const total = T.fall + T.up + T.down;
    const reveal = T.fall + 900;

    // La escena aparece entera, de desenfocada a nítida, mientras la O cae.
    track(desk.animate([{ filter: 'blur(26px)' }, { filter: 'blur(0px)' }], {
      duration: reveal, easing: 'cubic-bezier(.3,0,.2,1)', fill: 'forwards'
    }));
    track(introBg.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: reveal * .8, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards'
    }));

    let drop;
    if (canDrop) {
      // 3. La O cae en vertical (gravedad), da un solo rebote y se asienta en su tecla.
      const glyph = helloGlyph(keyO);
      const o = glyph.rect;
      const px = o.width * HELLO_O.x;
      const py = o.height * HELLO_O.y;
      const k = PHOTO_KEY_W * view.s / o.width;
      const at = function (y) {
        return 'translate(' + (target.x - o.left - px * k).toFixed(2) + 'px, ' + (y - o.top - py * k).toFixed(2) + 'px) scale(' + k.toFixed(4) + ')';
      };
      const start = 'translate(' + (target.x - o.left - px).toFixed(2) + 'px, 0px) scale(1)';
      const bounce = (target.y - glyph.y) * .08;
      const gravity = 'cubic-bezier(.55,.085,.68,.53)';
      const rise = 'cubic-bezier(.25,.46,.45,.94)';
      drop = track(keyO.animate([
        { transform: start, easing: gravity },
        { transform: at(target.y), offset: T.fall / total, easing: rise },
        { transform: at(target.y - bounce), offset: (T.fall + T.up) / total, easing: gravity },
        { transform: at(target.y) }
      ], { duration: total, fill: 'forwards' }));
      track(keyO.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 320, delay: T.fall + T.up + T.down * .5, easing: 'ease', fill: 'forwards'
      }));
      later(function () { if (!finishing) root.dataset.intro = 'reveal'; }, T.fall);
    } else {
      drop = track(keyO.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, delay: 200, easing: 'ease', fill: 'forwards' }));
      root.dataset.intro = 'reveal';
    }
    try { await drop.finished; } catch (error) { return; }
    // Deja terminar la entrada del texto y del header antes de retirar la intro.
    await wait(1700);
    finish();
  }

  function init() {
    fit();
    window.addEventListener('resize', fit);
    document.getElementById('intro-skip').addEventListener('click', finish);
    intro.addEventListener('click', function (event) {
      if (event.target === intro || event.target.classList.contains('intro__bg')) finish();
    });
    if (root.dataset.intro === 'play') {
      const ready = [document.fonts ? document.fonts.ready : null].concat(
        Array.from(stage.querySelectorAll('.desk__photo')).map(function (img) {
          return img.decode ? img.decode().catch(function () {}) : null;
        })
      );
      Promise.all(ready).then(playIntro);
    }
  }

  window.DanyDesk = {
    // Encuadre actual de la foto (escala y desplazamiento) y recálculo, para scroll-fx.js.
    view: function () { return view; },
    fit: fit,
    replay: function () {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      playIntro();
    }
  };

  init();
})();
