(function () {
  'use strict';
  const hero = document.querySelector('.hero--bloom');
  const toggle = document.getElementById('hero-motion-toggle');
  if (!hero || !toggle) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pausedByUser = false;
  function updateMotion() {
    const paused = pausedByUser || reducedMotion.matches;
    hero.classList.toggle('motion-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = reducedMotion.matches ? 'Movimiento reducido' : paused ? 'Reanudar fondo' : 'Pausar fondo';
    toggle.disabled = reducedMotion.matches;
  }
  toggle.addEventListener('click', function () {
    pausedByUser = !pausedByUser;
    updateMotion();
  });
  reducedMotion.addEventListener('change', updateMotion);
  updateMotion();
})();
