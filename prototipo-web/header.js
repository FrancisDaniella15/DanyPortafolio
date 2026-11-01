(function () {
  'use strict';
  const header = document.querySelector('.header-preview .wf-header');
  const nav = header && header.querySelector('.wf-nav');
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll('.wf-header-link'));
  const indicator = nav.querySelector('.wf-nav-indicator');
  const staticLinks = header.hasAttribute('data-static-links');
  if (!links.length) return;
  // The active header stays fixed; only its background changes after scrolling.
  if (staticLinks && document.body.classList.contains('header-split')) {
    let scrollUpdatePending = false;
    function syncScrollState() {
      header.toggleAttribute('data-scrolled', window.scrollY > 12);
      scrollUpdatePending = false;
    }
    window.addEventListener('scroll', function () {
      if (scrollUpdatePending) return;
      scrollUpdatePending = true;
      requestAnimationFrame(syncScrollState);
    }, { passive: true });
    window.addEventListener('pageshow', syncScrollState);
    syncScrollState();
  }
  let pointerLink = null;
  let focusLink = null;

  function update() {
    if (staticLinks || !indicator) return;
    const target = pointerLink || focusLink;
    if (!target) {
      nav.removeAttribute('data-highlight');
      return;
    }
    const area = nav.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    const entering = !nav.hasAttribute('data-highlight');
    if (entering) indicator.style.transition = 'none';
    indicator.style.width = box.width + 'px';
    indicator.style.height = box.height + 'px';
    indicator.style.transform = 'translate(' + (box.left - area.left) + 'px,' + (box.top - area.top) + 'px)';
    nav.setAttribute('data-highlight', '');
    if (entering) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { indicator.style.removeProperty('transition'); });
      });
    }
  }

  if (!staticLinks && indicator) {
    links.forEach(function (link) {
      link.addEventListener('pointerenter', function (event) {
        if (event.pointerType === 'touch') return;
        pointerLink = link;
        update();
      });
      link.addEventListener('focus', function () {
        focusLink = link;
        update();
      });
      link.addEventListener('blur', function (event) {
        const next = event.relatedTarget && event.relatedTarget.closest('.wf-header-link');
        focusLink = next && nav.contains(next) ? next : null;
        update();
      });
    });
    nav.addEventListener('pointerleave', function () {
      pointerLink = null;
      update();
    });
    nav.querySelectorAll('button, .pending-controls').forEach(function (control) {
      control.addEventListener('pointerenter', function () {
        pointerLink = null;
        update();
      });
    });
    // No motion is required to use the navigation; CSS also handles reduced motion.
    window.addEventListener('resize', update);
    if (window.ResizeObserver) new ResizeObserver(update).observe(nav);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
  }
  const menuToggle = header.querySelector('.wf-header-menu-toggle');
  if (menuToggle) {
    const compact = window.matchMedia('(max-width: 720px)');
    function closeMenu(restoreFocus) {
      header.removeAttribute('data-menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      pointerLink = null;
      focusLink = null;
      update();
      if (restoreFocus) menuToggle.focus();
    }
    menuToggle.hidden = false;
    header.classList.add('header-menu-ready');
    menuToggle.addEventListener('click', function () {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open));
      header.toggleAttribute('data-menu-open', open);
    });
    header.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.hasAttribute('data-menu-open')) {
        closeMenu(true);
      }
    });
    document.addEventListener('pointerdown', function (event) {
      if (!header.contains(event.target)) closeMenu(false);
    });
    header.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (compact.matches) closeMenu(false);
      });
    });
    compact.addEventListener('change', function () {
      // Keep keyboard focus on a visible control when switching to compact mode.
      const wasInside = nav.contains(document.activeElement);
      closeMenu(compact.matches && wasInside);
    });
  }
  if (!staticLinks) nav.setAttribute('data-hover-ready', '');
})();
