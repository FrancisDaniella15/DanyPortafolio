// Escritorio del hero: teclado, macropad, encuadre responsive e intro HELLO.
(function () {
  'use strict';

  const root = document.documentElement;
  const hero = document.getElementById('inicio');
  const desk = document.getElementById('desk');
  const stage = document.getElementById('desk-stage');
  const keyboard = document.getElementById('keyboard');
  const macropad = document.getElementById('macropad');
  const intro = document.getElementById('intro');
  const STAGE_W = 1440;
  const STAGE_H = 900;

  // [etiqueta, ancho en unidades, código de tecla física, tipo]
  const ROWS = [
    [['esc', 1.5, 'escape', 'mod'], ['F1', 1, 'f1', 'fn'], ['F2', 1, 'f2', 'fn'], ['F3', 1, 'f3', 'fn'], ['F4', 1, 'f4', 'fn'], ['F5', 1, 'f5', 'fn'], ['F6', 1, 'f6', 'fn'], ['F7', 1, 'f7', 'fn'], ['F8', 1, 'f8', 'fn'], ['F9', 1, 'f9', 'fn'], ['F10', 1, 'f10', 'fn'], ['F11', 1, 'f11', 'fn'], ['F12', 1, 'f12', 'fn'], ['⏻', 1.5, '', 'fn']],
    [['`', 1, '`'], ['1', 1, '1'], ['2', 1, '2'], ['3', 1, '3'], ['4', 1, '4'], ['5', 1, '5'], ['6', 1, '6'], ['7', 1, '7'], ['8', 1, '8'], ['9', 1, '9'], ['0', 1, '0'], ['-', 1, '-'], ['=', 1, '='], ['delete', 2, 'backspace', 'mod']],
    [['tab', 1.5, 'tab', 'mod'], ['Q', 1, 'q'], ['W', 1, 'w'], ['E', 1, 'e'], ['R', 1, 'r'], ['T', 1, 't'], ['Y', 1, 'y'], ['U', 1, 'u'], ['I', 1, 'i'], ['O', 1, 'o'], ['P', 1, 'p'], ['[', 1, '['], [']', 1, ']'], ['\\', 1.5, '\\']],
    [['caps lock', 1.75, 'capslock', 'mod'], ['A', 1, 'a'], ['S', 1, 's'], ['D', 1, 'd'], ['F', 1, 'f'], ['G', 1, 'g'], ['H', 1, 'h'], ['J', 1, 'j'], ['K', 1, 'k'], ['L', 1, 'l'], [';', 1, ';'], ['\'', 1, '\''], ['return', 2.25, 'enter', 'mod']],
    [['shift', 2.25, 'shift', 'mod'], ['Z', 1, 'z'], ['X', 1, 'x'], ['C', 1, 'c'], ['V', 1, 'v'], ['B', 1, 'b'], ['N', 1, 'n'], ['M', 1, 'm'], [',', 1, ','], ['.', 1, '.'], ['/', 1, '/'], ['shift', 2.75, 'shift', 'mod']],
    [['control', 1.25, 'control', 'mod'], ['option', 1.25, 'alt', 'mod'], ['command', 1.5, 'meta', 'mod'], ['', 5.5, ' '], ['⌘', 1.25, 'meta', 'accent'], ['fn', 1.25, '', 'mod']]
  ];

  const TOOLS = [
    ['figma', 'Figma', '#F24E1E'],
    ['notion', 'Notion', 'currentColor'],
    ['openai', 'ChatGPT', 'currentColor'],
    ['claude', 'Claude', '#FFFFFF', true],
    ['googlegemini', 'Gemini', '#8E75B2'],
    ['spotify', 'Spotify', '#1DB954']
  ];

  function makeKey(label, width, type) {
    const key = document.createElement('span');
    key.className = 'key' + (type ? ' key--' + type : '');
    if (width !== 1) key.style.setProperty('--w', width);
    const cap = document.createElement('span');
    cap.className = 'key__cap';
    cap.textContent = label;
    key.appendChild(cap);
    return key;
  }

  const keysByCode = new Map();
  function register(code, key) {
    if (!code) return;
    if (!keysByCode.has(code)) keysByCode.set(code, []);
    keysByCode.get(code).push(key);
  }

  function buildKeyboard() {
    ROWS.forEach(function (row, rowIndex) {
      const line = document.createElement('div');
      line.className = 'kb-row';
      row.forEach(function (def) {
        const key = makeKey(def[0], def[1], def[3]);
        key.dataset.code = def[2];
        register(def[2], key);
        line.appendChild(key);
      });
      if (rowIndex === ROWS.length - 1) line.appendChild(buildArrows());
      keyboard.appendChild(line);
    });
  }

  // Flechas: ◀, ▲ y ▼ apiladas a media altura, ▶
  function buildArrows() {
    const arrow = function (label, code) {
      const key = makeKey(label, 1, 'fn');
      register(code, key);
      return key;
    };
    const arrows = document.createElement('div');
    arrows.className = 'kb-arrows';
    const stack = document.createElement('div');
    stack.className = 'kb-arrows__stack';
    stack.append(arrow('▲', 'arrowup'), arrow('▼', 'arrowdown'));
    arrows.append(arrow('◀', 'arrowleft'), stack, arrow('▶', 'arrowright'));
    return arrows;
  }

  function buildMacropad() {
    const icons = window.DanyIcons || {};
    TOOLS.forEach(function (tool) {
      const key = makeKey('', 1, tool[3] ? 'accent' : '');
      key.title = tool[1];
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', icons[tool[0]] || '');
      path.setAttribute('fill', tool[2]);
      svg.appendChild(path);
      key.firstChild.appendChild(svg);
      macropad.appendChild(key);
    });
  }

  // Encuadre: en escritorio el escenario cubre el hero; en pantallas estrechas
  // o verticales se muestra una franja con el teclado debajo del texto.
  function fit() {
    const width = hero.clientWidth;
    const compact = width < 900 || width / window.innerHeight < 1.05;
    root.classList.toggle('desk-compact', compact);
    let s, tx, ty;
    if (compact) {
      // Recorte centrado en las letras de HELLO: el teclado sangra por los lados.
      const x0 = width < 600 ? 420 : 340, x1 = width < 600 ? 1010 : 1100, y0 = 548;
      s = width / (x1 - x0);
      tx = -x0 * s;
      ty = -y0 * s;
      desk.style.setProperty('--desk-h', Math.round((STAGE_H - y0 - 10) * s) + 'px');
    } else {
      const height = hero.clientHeight;
      s = Math.max(width / STAGE_W, height / STAGE_H);
      tx = (width - STAGE_W * s) / 2;
      ty = height - STAGE_H * s;
    }
    stage.style.setProperty('--s', s.toFixed(4));
    stage.style.setProperty('--tx', tx.toFixed(1) + 'px');
    stage.style.setProperty('--ty', ty.toFixed(1) + 'px');
  }

  function press(key, duration) {
    key.classList.add('is-down');
    window.setTimeout(function () { key.classList.remove('is-down'); }, duration || 140);
  }

  // Teclado físico y puntero: las teclas del escritorio responden.
  function bindInteractions() {
    window.addEventListener('keydown', function (event) {
      if (root.dataset.intro) return;
      const target = event.target;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      const list = keysByCode.get(event.key.toLowerCase());
      if (list) list.forEach(function (key) { key.classList.add('is-down'); });
    });
    window.addEventListener('keyup', function (event) {
      const list = keysByCode.get(event.key.toLowerCase());
      if (list) list.forEach(function (key) { key.classList.remove('is-down'); });
    });
    [keyboard, macropad].forEach(function (pad) {
      pad.addEventListener('pointerdown', function (event) {
        const key = event.target.closest('.key');
        if (key) press(key, 160);
      });
    });
  }

  // ---------- Intro HELLO ----------

  let running = [];
  let finishing = false;

  function letterTarget(letter) {
    const list = keysByCode.get(letter);
    return list ? list[0] : null;
  }

  function isOnScreen(rect) {
    return rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
  }

  function markAccent() {
    const l = letterTarget('l');
    if (l) l.classList.add('key--accent');
  }

  function finish() {
    if (finishing) return;
    finishing = true;
    running.forEach(function (animation) { animation.cancel(); });
    running = [];
    markAccent();
    delete root.dataset.intro;
    intro.querySelectorAll('.key').forEach(function (key) { key.style.visibility = ''; });
    try { sessionStorage.setItem('fd-hello', '1'); } catch (error) {}
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
    const l = letterTarget('l');
    if (l) l.classList.remove('key--accent');
    fit();
    document.addEventListener('keydown', onSkipKey);

    const keys = Array.from(intro.querySelectorAll('.intro__word .key'));
    keys.forEach(function (key) { key.style.visibility = ''; });

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
    await wait(480);
    if (finishing) return;

    // 2. Cada tecla vuela a su lugar en el teclado mientras aparece el hero.
    root.dataset.intro = 'reveal';
    const flights = keys.map(function (key, i) {
      const target = letterTarget(key.dataset.letter);
      const from = key.getBoundingClientRect();
      const to = target ? target.getBoundingClientRect() : null;
      let frames;
      if (to && isOnScreen(to)) {
        const k = to.width / from.width;
        frames = [
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
          { transform: 'translate(' + (to.left - from.left) + 'px, ' + (to.top - from.top) + 'px) scale(' + k + ')', opacity: 1 }
        ];
      } else {
        frames = [
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
          { transform: 'translate(0, -40px) scale(.9)', opacity: 0 }
        ];
      }
      const animation = key.animate(frames, { duration: 950, delay: i * 70, easing: 'cubic-bezier(.65,0,.3,1)', fill: 'forwards' });
      running.push(animation);
      return animation.finished.then(function () {
        if (!target) return;
        if (key.classList.contains('key--accent')) markAccent();
        key.style.visibility = 'hidden';
        press(target, 150);
      });
    });
    try { await Promise.all(flights); } catch (error) { return; }
    await wait(700);
    finish();
  }

  function init() {
    buildKeyboard();
    buildMacropad();
    fit();
    bindInteractions();
    window.addEventListener('resize', fit);
    document.getElementById('intro-skip').addEventListener('click', finish);
    intro.addEventListener('click', function (event) {
      if (event.target === intro || event.target.classList.contains('intro__bg')) finish();
    });

    if (root.dataset.intro === 'play') {
      const start = function () { playIntro(); };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
      else start();
    } else {
      markAccent();
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
