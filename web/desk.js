// Hero con la foto del escritorio: encuadre responsive e intro HELLO.
(function () {
  'use strict';

  const root = document.documentElement;
  const hero = document.getElementById('inicio');
  const desk = document.getElementById('desk');
  const stage = document.getElementById('desk-stage');
  const intro = document.getElementById('intro');
  const PHOTO_W = 1536;
  const PHOTO_H = 1024;

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
    stage.style.setProperty('--s', s.toFixed(4));
    stage.style.setProperty('--tx', tx.toFixed(1) + 'px');
    stage.style.setProperty('--ty', ty.toFixed(1) + 'px');
  }

  // ---------- Intro HELLO ----------

  let running = [];
  let finishing = false;

  function letterTarget(letter) {
    return stage.querySelector('.desk__key[data-key="' + letter + '"]');
  }

  function isOnScreen(rect) {
    return rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
  }

  function finish() {
    if (finishing) return;
    finishing = true;
    running.forEach(function (animation) { animation.cancel(); });
    running = [];
    delete root.dataset.intro;
    document.removeEventListener('keydown', onSkipKey);
  }

  function onSkipKey(event) {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      finish();
    }
  }

  function wait(ms) {
    return new Promise(function (resolve) { window.setTimeout(resolve, ms); });
  }

  async function playIntro() {
    finishing = false;
    root.dataset.intro = 'play';
    window.scrollTo(0, 0);
    fit();
    document.addEventListener('keydown', onSkipKey);
    const keys = Array.from(intro.querySelectorAll('.intro__word .key'));

    // 1. Las teclas se escriben una a una.
    const typing = keys.map(function (key, i) {
      const animation = key.animate([
        { opacity: 0, transform: 'translateY(-38%) scale(1.04)' },
        { opacity: 1, transform: 'translateY(7%) scale(1)', offset: .62 },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { duration: 420, delay: 260 + i * 170, easing: 'cubic-bezier(.3,.7,.3,1)', fill: 'forwards' });
      running.push(animation);
      return animation.finished;
    });
    try { await Promise.all(typing); } catch (error) { return; }
    await wait(520);
    if (finishing) return;

    // 2. Cada tecla vuela a su letra en el teclado de la foto y se funde con ella
    //    mientras aparece el hero.
    root.dataset.intro = 'reveal';
    const flights = keys.map(function (key, i) {
      const target = letterTarget(key.dataset.letter);
      const from = key.getBoundingClientRect();
      const to = target ? target.getBoundingClientRect() : null;
      let frames;
      if (to && isOnScreen(to)) {
        const k = to.width / from.width;
        const dx = to.left - from.left;
        const dy = to.top - from.top;
        frames = [
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
          { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + k + ')', opacity: 1, offset: .8 },
          { transform: 'translate(' + dx + 'px, ' + (dy + to.height * .08) + 'px) scale(' + k + ')', opacity: 0 }
        ];
      } else {
        frames = [
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
          { transform: 'translate(0, -40px) scale(.9)', opacity: 0 }
        ];
      }
      const animation = key.animate(frames, { duration: 1150, delay: i * 70, easing: 'cubic-bezier(.65,0,.3,1)', fill: 'forwards' });
      running.push(animation);
      return animation.finished;
    });
    try { await Promise.all(flights); } catch (error) { return; }
    await wait(600);
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
    replay: function () {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      playIntro();
    }
  };

  init();
})();
