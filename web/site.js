// Navegación, casos de estudio, modos de color y detalles de la página.
(function () {
  'use strict';

  const root = document.documentElement;
  const projects = window.DanyProjects || {};
  const home = document.getElementById('home');
  const caseView = document.getElementById('case');
  const header = document.getElementById('site-header');
  const nextButton = document.getElementById('next-project');
  const EMAIL = 'cova.francis15@gmail.com';
  const HOME_TITLE = 'Francis Daniella — Product Designer';
  let currentProject = null;

  // ---------- Modos de color ----------

  const themeButtons = document.querySelectorAll('[data-theme-option]');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.themeOption === theme));
    });
    if (themeColor) themeColor.content = getComputedStyle(root).getPropertyValue('--bg').trim();
    try { localStorage.setItem('fd-theme', theme); } catch (error) {}
  }

  themeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const theme = button.dataset.themeOption;
      if (theme === root.dataset.theme) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (document.startViewTransition && !reduce) document.startViewTransition(function () { applyTheme(theme); });
      else applyTheme(theme);
    });
  });
  applyTheme(root.dataset.theme === 'claro' ? 'claro' : 'calido');

  // ---------- Header ----------
  // La firma gana un fondo al desplazarse; la navegación vive en el dock inferior.

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Inicio y casos de estudio ----------

  function setHash(hash) {
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
  }

  function focusAndScroll(element, smooth) {
    if (!element) return;
    // Inicio y Proyectos pasan por la transición del hero (scroll-fx.js) cuando está activa.
    if (window.DanyScroll && window.DanyScroll.go(element.id, !smooth)) {
      element.focus({ preventScroll: true });
      return;
    }
    element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    element.focus({ preventScroll: true });
  }

  function showHome(targetId, options) {
    const settings = options || {};
    const wasCase = !caseView.hidden;
    home.hidden = false;
    caseView.hidden = true;
    document.title = HOME_TITLE;
    if (settings.updateHash) setHash('#' + targetId);
    if (settings.focus !== false) focusAndScroll(document.getElementById(targetId), !wasCase);
  }

  function showProject(id, options) {
    const settings = options || {};
    const project = projects[id];
    if (!project) {
      showHome('inicio', settings);
      return;
    }
    currentProject = id;
    document.getElementById('case-title').textContent = project.name;
    document.getElementById('case-description').textContent = project.description;
    document.getElementById('case-summary').textContent = project.summary;

    const list = document.getElementById('case-contributions');
    list.replaceChildren();
    project.contributions.forEach(function (text) {
      const item = document.createElement('li');
      item.textContent = text;
      list.appendChild(item);
    });

    const stages = document.getElementById('case-stages');
    stages.replaceChildren();
    project.stages.forEach(function (stage, i) {
      const item = document.createElement('div');
      item.className = 'case-stage';
      const number = document.createElement('span');
      number.className = 'case-stage__n';
      number.textContent = String(i + 1).padStart(2, '0');
      const heading = document.createElement('h3');
      heading.textContent = stage[0];
      const description = document.createElement('p');
      description.textContent = stage[1];
      item.append(number, heading, description);
      stages.appendChild(item);
    });

    document.getElementById('case-delivery-title').textContent = project.deliveryTitle;
    document.getElementById('case-delivery').textContent = project.delivery;
    nextButton.textContent = 'Siguiente: ' + projects[project.next].name;
    nextButton.dataset.next = project.next;
    home.hidden = true;
    caseView.hidden = false;
    document.title = project.name + ' — Francis Daniella';
    if (settings.updateHash) setHash('#proyecto-' + id);
    if (settings.focus !== false) {
      window.scrollTo(0, 0);
      document.getElementById('case-title').focus({ preventScroll: true });
    }
  }

  function readLocation(focus) {
    const hash = window.location.hash.slice(1);
    if (hash.indexOf('proyecto-') === 0 && projects[hash.slice(9)]) {
      showProject(hash.slice(9), { focus: focus });
      return;
    }
    const target = document.getElementById(hash);
    showHome(target && home.contains(target) ? hash : 'inicio', { focus: focus });
  }

  function plainClick(event) {
    return !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0);
  }

  document.querySelectorAll('[data-project]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (!plainClick(event)) return;
      event.preventDefault();
      showProject(link.dataset.project, { updateHash: true });
    });
  });

  document.querySelectorAll('[data-home-target]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (!plainClick(event)) return;
      event.preventDefault();
      showHome(link.dataset.homeTarget, { updateHash: true });
    });
  });

  document.querySelectorAll('[data-back]').forEach(function (button) {
    button.addEventListener('click', function () {
      showHome('proyectos', { updateHash: true });
      const opener = document.querySelector('#proyectos [data-project="' + currentProject + '"]');
      if (opener) opener.focus({ preventScroll: true });
    });
  });

  nextButton.addEventListener('click', function () {
    showProject(nextButton.dataset.next, { updateHash: true });
  });

  window.addEventListener('popstate', function () { readLocation(true); });
  readLocation(Boolean(window.location.hash));

  // ---------- Trayectoria, correo e intro ----------

  const career = document.getElementById('more-career');
  const careerToggle = document.getElementById('career-toggle');
  careerToggle.addEventListener('click', function () {
    const expanded = careerToggle.getAttribute('aria-expanded') === 'true';
    career.hidden = expanded;
    careerToggle.setAttribute('aria-expanded', String(!expanded));
    careerToggle.textContent = expanded ? 'Ver toda mi trayectoria' : 'Mostrar menos';
  });

  const copyStatus = document.getElementById('copy-status');
  document.getElementById('copy-email').addEventListener('click', async function () {
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(EMAIL);
      copyStatus.textContent = 'Correo copiado';
    } catch (error) {
      copyStatus.textContent = 'No se pudo copiar. Puedes seleccionar el correo y copiarlo.';
    }
  });

  document.getElementById('replay-intro').addEventListener('click', function () {
    if (!caseView.hidden) showHome('inicio', { updateHash: true, focus: false });
    if (window.DanyDesk) window.DanyDesk.replay();
  });

  // ---------- Aparición suave de secciones ----------

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }
})();
