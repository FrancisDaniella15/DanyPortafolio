// Scroll con cambio de perspectiva desde el hero hasta los proyectos.
// "monitor": la cámara levanta la vista hacia el monitor, se acerca y entra en la pantalla.
// "mesa": el escritorio se inclina hacia atrás y los proyectos suben por encima.
(function () {
  'use strict';

  const root = document.documentElement;
  const scrolly = document.getElementById('scrolly');
  const hero = document.getElementById('inicio');
  const desk = hero.querySelector('.desk');
  const stage = document.getElementById('desk-stage');
  const content = hero.querySelector('.hero__content');
  const site = document.getElementById('screen-site');
  const note = document.getElementById('note');
  const PHOTO_W = 1536;
  const PHOTO_H = 1024;
  // Pantalla del monitor en la foto (px): borde inferior centrado y ancho del área visible.
  const MONITOR = { x: 854, y: 46, width: 1004 };
  const NOTES = {
    monitor: 'Hacia el monitor: la cámara levanta la vista, se acerca y entra en la pantalla.',
    mesa: 'La mesa se inclina: el escritorio se tumba hacia atrás y los proyectos suben encima.'
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let variant = 'monitor';
  let geo = null;
  let target = 0;
  let current = 0;
  let frame = null;

  // ---------- Utilidades ----------

  const clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  const lerp = function (a, b, t) { return a + (b - a) * t; };
  // Tramo de p entre a y b, con aceleración y frenado suaves.
  function phase(p, a, b) {
    const t = clamp((p - a) / (b - a), 0, 1);
    return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function measure() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const s = Math.max(W / PHOTO_W, H / PHOTO_H);
    const view = { s: s, tx: (W - PHOTO_W * s) / 2, ty: H - PHOTO_H * s };
    stage.style.setProperty('--s', s.toFixed(4));
    stage.style.setProperty('--tx', view.tx.toFixed(1) + 'px');
    stage.style.setProperty('--ty', view.ty.toFixed(1) + 'px');
    // Borde inferior del monitor en pantalla (origen de la cámara).
    const M = { x: view.tx + MONITOR.x * s, y: view.ty + MONITOR.y * s };
    // Zoom final: la pantalla del monitor llena el visor.
    const total = Math.max(W / MONITOR.width, H / 1300);
    const Zf = total / s;
    // Centro del área de pantalla que queda a la vista al final.
    const C = { x: M.x, y: view.ty + (MONITOR.y - 8 - (H / total) / 2) * s };
    // Alto de la pantalla dibujada: proporción de monitor real, o lo justo para llenar el visor.
    const screen = document.getElementById('screen');
    screen.style.setProperty('--screen-h', Math.round(Math.max(630, H / total + 24)) + 'px');
    // Distancia de scroll en la que transcurre la animación.
    const span = scrolly.offsetHeight - H * 1.35;
    geo = { W: W, H: H, s: s, M: M, C: C, Zf: Zf, span: span, top: scrolly.offsetTop };
  }

  // translate(T) · translate(M) · rotateX · scale · translate(−M), con origen 0 0.
  function cameraTransform(Tx, Ty, rot, Z) {
    const M = geo.M;
    return 'translate(' + Tx.toFixed(2) + 'px, ' + Ty.toFixed(2) + 'px) translate(' + M.x.toFixed(2) + 'px, ' + M.y.toFixed(2) +
      'px) rotateX(' + rot.toFixed(3) + 'deg) scale(' + Z.toFixed(4) + ') translate(' + (-M.x).toFixed(2) + 'px, ' + (-M.y).toFixed(2) + 'px)';
  }

  // ---------- Variantes ----------

  function renderMonitor(p) {
    const g = geo;
    // 1. La cámara levanta la vista: el monitor baja hacia el centro y la mesa toma perspectiva.
    const a = phase(p, 0, .42);
    // 2. Se acerca y se endereza hasta que la pantalla ocupa todo el visor.
    const b = phase(p, .36, .9);
    // Punto de la foto que se enfoca y dónde se coloca en pantalla.
    const F = { x: lerp(g.M.x, g.C.x, b), y: lerp(g.M.y, g.C.y, b) };
    const S = { x: lerp(lerp(g.M.x, g.W / 2, a), g.W / 2, b), y: lerp(lerp(g.M.y, g.H * .42, a), g.H / 2, b) };
    // Zoom con interpolación logarítmica: el acercamiento se siente constante.
    const Z = Math.exp(lerp(Math.log(lerp(1, 1.08, a)), Math.log(g.Zf), b));
    const rot = lerp(lerp(0, 24, a), 0, b);
    const Tx = S.x - g.M.x - Z * (F.x - g.M.x);
    const Ty = S.y - g.M.y - Z * (F.y - g.M.y);
    desk.style.transform = cameraTransform(Tx, Ty, rot, Z);
    desk.style.opacity = '';
    // 3. La pantalla se enciende con el fondo de la web.
    site.style.opacity = phase(p, .74, .96).toFixed(3);
    fadeHeroText(p);
  }

  function renderMesa(p) {
    const g = geo;
    const a = phase(p, 0, 1);
    const rot = lerp(0, 52, a);
    const Z = lerp(1, .9, a);
    // Origen en el borde inferior: la parte de arriba se aleja.
    const ox = g.W / 2;
    const oy = g.H;
    desk.style.transform = 'translate(' + ox + 'px, ' + (oy - g.H * .06 * a).toFixed(2) + 'px) rotateX(' + rot.toFixed(3) + 'deg) scale(' + Z.toFixed(4) + ') translate(' + (-ox) + 'px, ' + (-oy) + 'px)';
    desk.style.opacity = lerp(1, .55, phase(p, .3, 1)).toFixed(3);
    site.style.opacity = '0';
    fadeHeroText(p);
  }

  function fadeHeroText(p) {
    const t = phase(p, 0, .14);
    content.style.opacity = (1 - t).toFixed(3);
    content.style.transform = 'translateY(' + (-40 * t).toFixed(2) + 'px)';
  }

  // ---------- Bucle con inercia ----------

  function readScroll() {
    target = clamp((window.scrollY - geo.top) / geo.span, 0, 1);
    if (!frame) frame = requestAnimationFrame(tick);
  }

  function tick() {
    // La cámara persigue la posición del scroll con suavizado: los saltos de la rueda
    // del ratón se convierten en un movimiento continuo.
    current += (target - current) * .1;
    if (Math.abs(target - current) < .0004) current = target;
    (variant === 'mesa' ? renderMesa : renderMonitor)(current);
    frame = current === target ? null : requestAnimationFrame(tick);
  }

  // ---------- Controles ----------

  function setVariant(name) {
    variant = name;
    root.classList.toggle('v-monitor', name === 'monitor');
    root.classList.toggle('v-mesa', name === 'mesa');
    document.querySelectorAll('[data-variant]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.variant === name));
    });
    note.textContent = NOTES[name];
    try { history.replaceState(null, '', '?v=' + name); } catch (error) {}
    measure();
    window.scrollTo(0, 0);
    target = current = 0;
    (variant === 'mesa' ? renderMesa : renderMonitor)(0);
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll('[data-theme-option]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.themeOption === theme));
    });
    try { localStorage.setItem('fd-theme', theme); } catch (error) {}
  }

  document.querySelectorAll('[data-variant]').forEach(function (button) {
    button.addEventListener('click', function () { setVariant(button.dataset.variant); });
  });
  document.querySelectorAll('[data-theme-option]').forEach(function (button) {
    button.addEventListener('click', function () { setTheme(button.dataset.themeOption); });
  });

  setTheme(root.dataset.theme === 'claro' ? 'claro' : 'calido');
  if (reduce) {
    root.classList.add('reduce');
    measure();
    return;
  }
  const requested = new URLSearchParams(location.search).get('v');
  setVariant(requested === 'mesa' ? 'mesa' : 'monitor');
  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); readScroll(); });
})();
