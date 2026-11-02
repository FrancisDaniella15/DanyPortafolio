// Del hero a Proyectos con un solo gesto de scroll (variante «1 · Un gesto» de
// pruebas-scroll). Un movimiento de rueda, trackpad o teclado reproduce por tiempo la
// transición: la cámara se acerca al espacio vacío de la alfombrilla, la mesa se funde
// con el fondo y la sección de proyectos aparece en su sitio, de difuminada a nítida.
// Hacia arriba, desde el inicio de los proyectos, vuelve al hero.
// Solo en el diseño de escritorio y sin «reducir movimiento»; si no, la página es normal.
(function () {
  'use strict';

  const root = document.documentElement;
  const scrolly = document.getElementById('scrolly');
  const hero = document.getElementById('inicio');
  const home = document.getElementById('home');
  if (!scrolly || !hero || !window.DanyDesk) return;
  const desk = hero.querySelector('.desk');
  const content = hero.querySelector('.hero__content');
  const fill = document.getElementById('zoom-fill');
  const projects = document.getElementById('proyectos');
  // Espacio vacío de la alfombrilla en la foto (px): entre el monitor y el teclado.
  const EMPTY = { x: 720, y: 385, width: 760, height: 420 };
  const DURATION = 1500;
  const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  let active = false;
  let geo = null;
  let state = 0;          // 0: hero; 1: proyectos
  let busy = false;
  let cancel = null;

  const clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  const lerp = function (a, b, t) { return a + (b - a) * t; };
  const easeInOut = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  function phase(p, a, b) { return easeInOut(clamp((p - a) / (b - a), 0, 1)); }

  function measure() {
    const view = window.DanyDesk.view();
    const W = window.innerWidth;
    const H = window.innerHeight;
    geo = {
      W: W,
      H: H,
      // Centro del espacio vacío en pantalla y zoom con el que llena el visor.
      E: { x: view.tx + EMPTY.x * view.s, y: view.ty + EMPTY.y * view.s },
      Zf: Math.max(W / (EMPTY.width * view.s), H / (EMPTY.height * view.s)),
      // Scroll en el que la escena se suelta: ahí empieza la sección de proyectos.
      release: scrolly.offsetTop + scrolly.offsetHeight - H
    };
  }

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
    content.style.opacity = t ? (1 - t).toFixed(3) : '';
    content.style.transform = t ? 'translateY(' + (-40 * t).toFixed(2) + 'px)' : '';
    const r = easeInOut(clamp(c, 0, 1));
    projects.style.opacity = r.toFixed(3);
    projects.style.filter = r >= 1 ? '' : 'blur(' + (14 * (1 - r)).toFixed(2) + 'px)';
    projects.style.pointerEvents = r > .5 ? '' : 'none';
  }

  // Mientras la escena está fija, la sección de proyectos se mantiene quieta arriba; al
  // soltarse la escena, su posición natural coincide y sigue con el scroll normal.
  function pin() {
    const natural = projects.offsetTop - window.scrollY;
    projects.style.transform = natural > 0 ? 'translateY(' + (-natural) + 'px)' : '';
  }

  function clearStyles() {
    [desk, content, fill, projects].forEach(function (el) {
      el.style.transform = '';
      el.style.opacity = '';
      el.style.filter = '';
      el.style.pointerEvents = '';
    });
  }

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

  function setState(next) {
    state = next;
    render(next, next);
    pin();
  }

  function play(direction) {
    if (busy || direction === state) return;
    busy = true;
    // El scroll se coloca en el punto de llegada y la escena se reproduce por tiempo.
    window.scrollTo({ top: geo.release, behavior: 'instant' });
    pin();
    cancel = tween(state, direction, DURATION, function (k) {
      // Acercamiento en el primer 80 % del tiempo; proyectos en el último 35 %.
      render(k / .8, (k - .65) / .35);
    }, function () {
      state = direction;
      cancel = null;
      if (direction === 0) window.scrollTo({ top: 0, behavior: 'instant' });
      pin();
      // Pequeña espera para que la inercia del gesto no se lleve el contenido.
      window.setTimeout(function () { busy = false; }, 350);
    });
  }

  function blocked() {
    return !active || Boolean(root.dataset.intro) || home.hidden;
  }

  function intent(down, event) {
    if (blocked()) return;
    if (busy) { event.preventDefault(); return; }
    if (down && state === 0) { event.preventDefault(); play(1); }
    else if (!down && state === 1 && window.scrollY <= geo.release + 2) { event.preventDefault(); play(0); }
  }

  function onScroll() {
    if (!active) return;
    pin();
    if (busy) return;
    const y = window.scrollY;
    // De vuelta arriba por cualquier vía (por ejemplo, al repetir el HELLO): escena inicial.
    if (state === 1 && y <= 4) { setState(0); return; }
    if (blocked()) return;
    if (state === 0 && y > 4) {
      // Salto lejano (enlace a otra sección): llega sin animación. Si no, se reproduce.
      if (y > geo.release + 10) setState(1); else play(1);
    } else if (state === 1 && y < geo.release - 4) {
      play(0);
    }
  }

  function setActive(on) {
    if (cancel) { cancel(); cancel = null; }
    busy = false;
    active = on;
    root.classList.toggle('scroll-fx', on);
    window.DanyDesk.fit();
    if (!on) { clearStyles(); return; }
    measure();
    setState(window.scrollY >= geo.release - 4 ? 1 : 0);
  }

  function update() {
    const on = !reduceQuery.matches && !root.classList.contains('desk-compact');
    if (on !== active) setActive(on);
    else if (on) { window.DanyDesk.fit(); measure(); setState(state); }
  }

  window.addEventListener('wheel', function (event) {
    if (Math.abs(event.deltaY) >= 2) intent(event.deltaY > 0, event);
  }, { passive: false });

  let touchY = null;
  window.addEventListener('touchstart', function (event) { touchY = event.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchmove', function (event) {
    if (touchY === null) return;
    const dy = touchY - event.touches[0].clientY;
    if (Math.abs(dy) > 12) { intent(dy > 0, event); touchY = null; }
  }, { passive: false });

  window.addEventListener('keydown', function (event) {
    const target = event.target;
    if (target && /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(target.tagName) && event.key === ' ') return;
    if (['ArrowDown', 'PageDown', ' '].indexOf(event.key) >= 0) intent(true, event);
    else if (['ArrowUp', 'PageUp'].indexOf(event.key) >= 0) intent(false, event);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);

  // Navegación interna (site.js): Proyectos reproduce la transición; Inicio vuelve al hero.
  window.DanyScroll = {
    go: function (id, instant) {
      if (!active) return false;
      if (id === 'proyectos') {
        if (instant) { if (cancel) cancel(); busy = false; window.scrollTo({ top: geo.release, behavior: 'instant' }); setState(1); }
        else if (state === 0) play(1);
        else window.scrollTo({ top: geo.release, behavior: 'smooth' });
        return true;
      }
      if (id === 'inicio') {
        if (cancel) cancel();
        busy = false;
        if (state === 1 && !instant && window.scrollY <= geo.release + 2) { play(0); return true; }
        setState(0);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return true;
      }
      return false;
    }
  };

  update();
})();
