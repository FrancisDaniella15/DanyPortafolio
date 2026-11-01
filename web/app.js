(function () {
  'use strict';

  const root = document.getElementById('dany-portfolio');
  const projects = window.DanyProjects || {};
  const home = document.getElementById('wf-home');
  const caseView = document.getElementById('wf-case');
  const career = document.getElementById('wf-more-career');
  const careerToggle = document.getElementById('wf-career-toggle');
  const nextButton = document.getElementById('wf-next-project');
  const copyStatus = document.getElementById('wf-copy-status');
  const hero = document.getElementById('wf-inicio');
  const image = document.getElementById('hero-image');
  let currentProject = null;

  function focusAndScroll(element) {
    if (!element) return;
    element.scrollIntoView({ behavior: 'auto', block: 'start' });
    element.focus({ preventScroll: true });
  }

  function setHash(hash) {
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
  }

  function showHome(targetId, options) {
    const settings = options || {};
    home.hidden = false;
    caseView.hidden = true;
    document.title = 'Dany Design — Primer prototipo';
    if (settings.updateHash) setHash('#' + targetId);
    if (settings.focus !== false) focusAndScroll(document.getElementById(targetId));
  }

  function showProject(id, options) {
    const settings = options || {};
    const project = projects[id];
    if (!project) {
      showHome('wf-inicio', settings);
      return;
    }
    currentProject = id;
    document.getElementById('wf-case-title').textContent = project.name;
    document.getElementById('wf-case-description').textContent = project.description;
    document.getElementById('wf-case-summary').textContent = project.summary;

    const list = document.getElementById('wf-case-contributions');
    list.replaceChildren();
    project.contributions.forEach(function (text) {
      const item = document.createElement('li');
      item.textContent = text;
      list.appendChild(item);
    });

    const stages = document.getElementById('wf-case-stages');
    stages.replaceChildren();
    project.stages.forEach(function (stage) {
      const item = document.createElement('div');
      item.className = 'wf-case-stage';
      const heading = document.createElement('h3');
      const description = document.createElement('p');
      heading.textContent = stage[0];
      description.textContent = stage[1];
      item.append(heading, description);
      stages.appendChild(item);
    });

    document.getElementById('wf-case-delivery-title').textContent = project.deliveryTitle;
    document.getElementById('wf-case-delivery').textContent = project.delivery;
    nextButton.textContent = 'Siguiente proyecto: ' + projects[project.next].name;
    nextButton.dataset.next = project.next;
    home.hidden = true;
    caseView.hidden = false;
    document.title = project.name + ' — Dany Design';
    if (settings.updateHash) setHash('#proyecto-' + id);
    if (settings.focus !== false) focusAndScroll(document.getElementById('wf-case-title'));
  }

  function readLocation(focus) {
    const hash = window.location.hash.slice(1);
    if (hash.indexOf('proyecto-') === 0 && projects[hash.slice(9)]) {
      showProject(hash.slice(9), { focus: focus });
      return;
    }
    const target = document.getElementById(hash);
    showHome(target && home.contains(target) ? hash : 'wf-inicio', { focus: focus });
  }

  root.querySelectorAll('[data-project]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showProject(link.dataset.project, { updateHash: true });
    });
  });

  root.querySelectorAll('[data-home-target]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showHome(link.dataset.homeTarget, { updateHash: true });
    });
  });

  root.querySelectorAll('[data-back]').forEach(function (button) {
    button.addEventListener('click', function () {
      showHome('wf-proyectos', { updateHash: true });
      const opener = root.querySelector('#wf-proyectos [data-project="' + currentProject + '"]');
      if (opener) opener.focus({ preventScroll: true });
    });
  });

  nextButton.addEventListener('click', function () {
    showProject(nextButton.dataset.next, { updateHash: true });
  });

  careerToggle.addEventListener('click', function () {
    const expanded = careerToggle.getAttribute('aria-expanded') === 'true';
    career.hidden = expanded;
    careerToggle.setAttribute('aria-expanded', String(!expanded));
    careerToggle.textContent = expanded ? 'Ver toda mi trayectoria' : 'Mostrar menos';
  });

  document.getElementById('wf-copy').addEventListener('click', async function () {
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText('cova.francis15@gmail.com');
      copyStatus.textContent = 'Correo copiado';
    } catch (error) {
      copyStatus.textContent = 'No se pudo copiar. Puedes seleccionar el correo y copiarlo.';
    }
  });

  function imageFallback() {
    hero.classList.add('image-unavailable');
  }
  if (image) {
    image.addEventListener('error', imageFallback);
    if (image.complete && image.naturalWidth === 0) imageFallback();
  }
  window.addEventListener('hashchange', function () { readLocation(true); });
  readLocation(Boolean(window.location.hash));
})();
