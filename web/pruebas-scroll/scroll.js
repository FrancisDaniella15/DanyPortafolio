// Transición del hero a Proyectos: la cámara se acerca al espacio vacío de la alfombrilla,
// la mesa se funde con el fondo y los proyectos aparecen en su sitio. Tres formas de
// controlarla con el scroll, para comparar:
//   gesto: un solo gesto reproduce toda la transición y se detiene en los proyectos.
//   iman:  el acercamiento sigue al scroll; al final la página se imanta a los proyectos
//          y estos aparecen por tiempo.
//   pausa: sigue al scroll; los proyectos se enfocan antes y quedan fijos un tramo.
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
    gesto: '1 · Un gesto: un movimiento de rueda o trackpad reproduce toda la transición y se detiene en los proyectos, ya nítidos. Hacia arriba vuelve al hero.',
    iman: '2 · Imán: el acercamiento sigue al scroll; al final la página se imanta a los proyectos y estos aparecen por tiempo.',
    pausa: '3 · Pausa: sigue al scroll; los proyectos se enfocan antes y quedan fijos un tramo antes de seguir.'
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let variant = 'gesto';
  let geo = null;

  // ---------- Utilidades ----------

  const clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  const lerp = function (a, b, t) { return a + (b - a) * t; };
  const easeInOut = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  // Tramo de p entre a y b, con aceleración y frenado suaves.
  function phase(p, a, b) { return easeInOut(clamp((p - a) / (b - a), 0, 1)); }

  function measure() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const s = Math.max(W / PHOTO_W, H / PHOTO_H);
    const view = { s: s, tx: (W - PHOTO_W * s) / 2, ty: H - PHOTO_H * s };
    stage.style.setProperty('--s', s.toFixed(4));
    stage.style.setProperty('--tx', view.tx.toFixed(1) + 'px');
    stage.style.setProperty('--ty', view.ty.toFixed(1) + 'px');
    geo = {
      W: W,
      H: H,
      // Centro del espacio vacío en pantalla y zoom con el que llena el visor.
      E: { x: view.tx + EMPTY.x * s, y: view.ty + EMPTY.y * s },
      Zf: Math.max(W / (EMPTY.width * s), H / (EMPTY.height * s)),
      // Scroll en el que la escena se suelta: ahí empieza la sección de proyectos.
      release: scrolly.offsetTop + scrolly.offsetHeight - H
    };
  }

  // ---------- Dibujo ----------

  // z: avance del acercamiento (0 hero, 1 hueco llenando el visor). c: aparición de proyectos.
  function render(z, c) {
    const g = geo;
    const a = easeInOut(clamp(z, 0, 1));
    const Z = Math.exp(lerp(0, Math.log(g.Zf), a));
    const rot = 9 * Math.sin(Math.PI * a);
    const Sx = lerp(g.E.x, g.W / 2, a);
    const Sy = lerp(g.E.y, g.H / 2, a);
    desk.style.transform = 'translate(' + Sx.toFixed(2) + 'px, ' + Sy.toFixed(2) + 'px) rotateX(' + rot.toFixed(3) + 'deg) scale(' + Z.toFixed(4) + ') translate(' + (-g.E.x).toFixed(2) + 'px, ' + (-g.E.y).toFixed(2) + 'px)';
    fill.style.opacity = phase(z, .72, 1).toFixed(3);
    const t = phase(z, 0, .18);
    content.style.opacity = (1 - t).toFixed(3);
    content.style.transform = 'translateY(' + (-40 * t).toFixed(2) + 'px)';
    const r = easeInOut(clamp(c, 0, 1));
    projects.style.opacity = r.toFixed(3);
    projects.style.filter = r >= 1 ? '' : 'blur(' + (14 * (1 - r)).toFixed(2) + 'px)';
    projects.style.pointerEvents = r > .5 ? '' : 'none';
  }

  // Mientras la escena está fija, la sección de proyectos se mantiene quieta arriba; al
  // soltarse la escena, su posición natural coincide y sigue con el scroll normal.
  function pinProjects() {
    const natural = projects.offsetTop - window.scrollY;
    projects.style.transform = natural > 0 ? 'translateY(' + (-natural) + 'px)' : '';
  }

  // Animación por tiempo de un valor (devuelve una función para cancelarla).
  function tween(from, to, duration, onFrame, onDone) {
    const start = performance.now();
    let id = 0;
    function step(now) {
      const k = clamp((now - start) / duration, 0, 1);
      onFrame(lerp(from, to, k));
      if (k < 1) id = requestAnimationFrame(step);
      else if (onDone) onDone();
    }
    id = requestAnimationFrame(step);
    return function () { cancelAnimationFrame(id); };
  }

  // ---------- 1 · Un gesto ----------

  const gesto = { state: 0, busy: false, cancel: null };

  function playGesto(direction) {
    if (gesto.busy || direction === gesto.state) return;
    gesto.busy = true;
    // Se coloca el scroll en el punto de llegada y la escena se reproduce por tiempo.
    window.scrollTo({ top: geo.release, behavior: 'instant' });
    pinProjects();
    gesto.cancel = tween(gesto.state, direction, 1500, function (k) {
      // Acercamiento en el primer 80 % del tiempo, proyectos en el último 35 %.
      render(k / .8, (k - .65) / .35);
    }, function () {
      gesto.state = direction;
      if (direction === 0) window.scrollTo({ top: 0, behavior: 'instant' });
      pinProjects();
      // Pequeña espera para que la inercia del gesto no se lleve el contenido.
      window.setTimeout(function () { gesto.busy = false; }, 350);
    });
  }

  function gestoIntent(down, event) {
    const atHero = gesto.state === 0;
    const atProjectsTop = gesto.state === 1 && window.scrollY <= geo.release + 2;
    if (gesto.busy) { if (event) event.preventDefault(); return; }
    if (down && atHero) { if (event) event.preventDefault(); playGesto(1); }
    else if (!down && atProjectsTop) { if (event) event.preventDefault(); playGesto(0); }
  }

  // ---------- 2 · Imán y 3 · Pausa (siguen al scroll) ----------

  const follow = { target: 0, current: 0, frame: null, reveal: 0, revealing: null, idle: null };

  function scrollProgress() {
    return clamp(window.scrollY / geo.release, 0, 1);
  }

  function followTick() {
    // La cámara persigue la posición del scroll con suavizado.
    follow.current += (follow.target - follow.current) * .1;
    if (Math.abs(follow.target - follow.current) < .0004) follow.current = follow.target;
    const p = follow.current;
    if (variant === 'iman') render(p / .85, follow.reveal);
    else render(p / .6, (p - .55) / .2);   // pausa: nítido en .75; de .75 a 1 queda fijo
    follow.frame = follow.current === follow.target ? null : requestAnimationFrame(followTick);
  }

  function onFollowScroll() {
    pinProjects();
    follow.target = scrollProgress();
    if (!follow.frame) follow.frame = requestAnimationFrame(followTick);
    if (variant !== 'iman') return;
    // Los proyectos aparecen por tiempo al llegar y se ocultan al volver atrás.
    if (follow.target > .92 && follow.reveal < 1 && !follow.revealing) revealProjects(1);
    if (follow.target < .7 && follow.reveal > 0 && !follow.revealing) revealProjects(0);
    // Imán: al dejar de hacer scroll dentro del tramo, la página se coloca en un extremo.
    window.clearTimeout(follow.idle);
    follow.idle = window.setTimeout(function () {
      const p = scrollProgress();
      if (p > 0 && p < 1) window.scrollTo({ top: p > .45 ? geo.release : 0, behavior: 'smooth' });
    }, 140);
  }

  function revealProjects(to) {
    const stop = tween(follow.reveal, to, to ? 700 : 300, function (v) {
      follow.reveal = v;
      render(follow.current / .85, v);
    }, function () { follow.revealing = null; });
    follow.revealing = stop;
  }

  // ---------- Entrada y controles ----------

  function onWheel(event) {
    if (variant !== 'gesto' || Math.abs(event.deltaY) < 2) return;
    gestoIntent(event.deltaY > 0, event);
  }

  let touchY = null;
  function onTouchStart(event) { touchY = event.touches[0].clientY; }
  function onTouchMove(event) {
    if (variant !== 'gesto' || touchY === null) return;
    const dy = touchY - event.touches[0].clientY;
    if (Math.abs(dy) > 12) { gestoIntent(dy > 0, event); touchY = null; }
    else if (gesto.busy || gesto.state === 0) event.preventDefault();
  }

  function onKey(event) {
    if (variant !== 'gesto') return;
    if (['ArrowDown', 'PageDown', ' '].indexOf(event.key) >= 0) gestoIntent(true, event);
    else if (['ArrowUp', 'PageUp'].indexOf(event.key) >= 0) gestoIntent(false, event);
  }

  function onScroll() {
    if (variant === 'gesto') {
      pinProjects();
      // Barra de desplazamiento u otro movimiento dentro del tramo: completa la transición.
      if (!gesto.busy) {
        const y = window.scrollY;
        if (gesto.state === 0 && y > 4) playGesto(1);
        else if (gesto.state === 1 && y < geo.release - 4) playGesto(0);
      }
      return;
    }
    onFollowScroll();
  }

  function setVariant(name) {
    variant = name;
    ['gesto', 'iman', 'pausa'].forEach(function (v) { root.classList.toggle('v-' + v, v === name); });
    document.querySelectorAll('[data-variant]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.variant === name));
    });
    note.textContent = NOTES[name];
    try { history.replaceState(null, '', '?v=' + name); } catch (error) {}
    if (gesto.cancel) gesto.cancel();
    if (follow.revealing) follow.revealing();
    gesto.state = 0;
    gesto.busy = false;
    follow.target = follow.current = follow.reveal = 0;
    follow.revealing = null;
    measure();
    window.scrollTo({ top: 0, behavior: 'instant' });
    pinProjects();
    render(0, 0);
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
  setVariant(NOTES[requested] ? requested : 'gesto');
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('keydown', onKey);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    measure();
    pinProjects();
    if (variant === 'gesto') render(gesto.state, gesto.state);
    else onFollowScroll();
  });
})();
