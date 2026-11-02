// Scroll con cambio de perspectiva desde el hero hasta los proyectos.
// "zoom": la cámara se acerca al espacio vacío de la alfombrilla y ahí aparecen los proyectos.
// "mesa": el escritorio se inclina hacia atrás y los proyectos suben por encima.
(function () {
  'use strict';

  const root = document.documentElement;
  const scrolly = document.getElementById('scrolly');
  const hero = document.getElementById('inicio');
  const desk = hero.querySelector('.desk');
  const stage = document.getElementById('desk-stage');
  const content = hero.querySelector('.hero__content');
  const fill = document.getElementById('zoom-fill');
  const projects = document.getElementById('proyectos');
  const note = document.getElementById('note');
  const PHOTO_W = 1536;
  const PHOTO_H = 1024;
  // Espacio vacío de la alfombrilla en la foto (px): entre el monitor y el teclado.
  const EMPTY = { x: 720, y: 385, width: 760, height: 420 };
  const NOTES = {
    zoom: 'Al espacio en blanco: la cámara se acerca al hueco libre de la alfombrilla y ahí aparecen los proyectos.',
    mesa: 'La mesa se inclina: el escritorio se tumba hacia atrás y los proyectos suben encima.'
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let variant = 'zoom';
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
    // Centro del espacio vacío en pantalla (punto al que se acerca la cámara).
    const E = { x: view.tx + EMPTY.x * s, y: view.ty + EMPTY.y * s };
    // Zoom final: el espacio vacío llena el visor.
    const Zf = Math.max(W / (EMPTY.width * s), H / (EMPTY.height * s));
    // Distancia de scroll en la que transcurre la animación.
    // Toda la parte en la que la escena está fija.
    const span = scrolly.offsetHeight - H;
    geo = { W: W, H: H, s: s, E: E, Zf: Zf, span: span, top: scrolly.offsetTop };
  }

  // ---------- Variantes ----------

  function renderZoom(p) {
    const g = geo;
    // La cámara se acerca al hueco con un leve cambio de perspectiva que se endereza
    // al llegar; el hueco termina centrado y llenando el visor.
    const a = phase(p, .02, .78);
    const Z = Math.exp(lerp(0, Math.log(g.Zf), a));
    const rot = 9 * Math.sin(Math.PI * a);
    const Sx = lerp(g.E.x, g.W / 2, a);
    const Sy = lerp(g.E.y, g.H / 2, a);
    // translate(S) · rotateX · scale · translate(−E): el punto E va a S.
    desk.style.transform = 'translate(' + Sx.toFixed(2) + 'px, ' + Sy.toFixed(2) + 'px) rotateX(' + rot.toFixed(3) + 'deg) scale(' + Z.toFixed(4) + ') translate(' + (-g.E.x).toFixed(2) + 'px, ' + (-g.E.y).toFixed(2) + 'px)';
    desk.style.opacity = '';
    // Al final, la alfombrilla se funde con el fondo de la web.
    fill.style.opacity = phase(p, .6, .82).toFixed(3);
    // Los proyectos aparecen en su sitio: de difuminados y transparentes a nítidos.
    const c = phase(p, .8, 1);
    projects.style.opacity = c.toFixed(3);
    // Invisible no bloquea los clics del hero.
    projects.style.pointerEvents = c > .5 ? '' : 'none';
    projects.style.filter = c >= 1 ? '' : 'blur(' + (14 * (1 - c)).toFixed(2) + 'px)';
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
    fill.style.opacity = '0';
    projects.style.opacity = '';
    projects.style.filter = '';
    projects.style.pointerEvents = '';
    fadeHeroText(p);
  }

  function fadeHeroText(p) {
    const t = phase(p, 0, .14);
    content.style.opacity = (1 - t).toFixed(3);
    content.style.transform = 'translateY(' + (-40 * t).toFixed(2) + 'px)';
  }

  // ---------- Bucle con inercia ----------

  // Mientras la escena está fija, la sección de proyectos se mantiene quieta arriba;
  // al soltarse la escena, su posición natural coincide y sigue con el scroll normal.
  function pinProjects() {
    if (variant !== 'zoom') { projects.style.transform = ''; return; }
    const natural = projects.offsetTop - window.scrollY;
    projects.style.transform = natural > 0 ? 'translateY(' + (-natural) + 'px)' : '';
  }

  function readScroll() {
    pinProjects();
    target = clamp((window.scrollY - geo.top) / geo.span, 0, 1);
    if (!frame) frame = requestAnimationFrame(tick);
  }

  function tick() {
    // La cámara persigue la posición del scroll con suavizado: los saltos de la rueda
    // del ratón se convierten en un movimiento continuo.
    current += (target - current) * .1;
    if (Math.abs(target - current) < .0004) current = target;
    (variant === 'mesa' ? renderMesa : renderZoom)(current);
    frame = current === target ? null : requestAnimationFrame(tick);
  }

  // ---------- Controles ----------

  function setVariant(name) {
    variant = name;
    root.classList.toggle('v-zoom', name === 'zoom');
    root.classList.toggle('v-mesa', name === 'mesa');
    document.querySelectorAll('[data-variant]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.variant === name));
    });
    note.textContent = NOTES[name];
    try { history.replaceState(null, '', '?v=' + name); } catch (error) {}
    measure();
    window.scrollTo(0, 0);
    pinProjects();
    target = current = 0;
    (variant === 'mesa' ? renderMesa : renderZoom)(0);
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
  setVariant(requested === 'mesa' ? 'mesa' : 'zoom');
  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); readScroll(); });
})();
