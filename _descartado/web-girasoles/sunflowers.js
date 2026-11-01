(function () {
  'use strict';
  const hero = document.querySelector('.hero--sunflowers');
  if (!hero) return;
  const canvas = document.getElementById('sunflower-canvas');
  const context = canvas.getContext('2d');
  const skyCanvas = document.getElementById('sunflower-sky');
  const skyContext = skyCanvas.getContext('2d');
  const toggle = document.getElementById('hero-motion-toggle');
  const title = document.getElementById('hero-title');
  const sideGarden = hero.classList.contains('hero--floral-sides');
  const compactGarden = window.matchMedia('(max-width: 850px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const image = new Image();
  const cycle = 8;
  const skyStyle = getComputedStyle(hero);
  const skyDefaults = ['#b9dce9', '#d9eaf0', '#edf3ee', '#f7f5e9'];
  const skyColors = skyDefaults.map(function (fallback, index) {
    return skyStyle.getPropertyValue('--sky-' + index).trim() || fallback;
  });
  const fullTitle = title.textContent.trim();
  const characters = [];
  const petals = new window.DanyPetals();
  const headBuffer = document.createElement('canvas');
  const headContext = headBuffer.getContext('2d');
  headBuffer.width = headBuffer.height = 640;
  let poses = [];
  let userPaused = false;
  let frame = 0;
  let previousTime = 0;
  let elapsed = 0;
  let width = 720;
  let height = 780;
  let ready = false;
  let inView = true;
  let revealCount = -1;
  let lastSkyTime = -Infinity;

  // Keep the complete heading available to assistive technology and reserve
  // every word's space before revealing its letters. No live announcements.
  title.setAttribute('aria-label', fullTitle);
  const visualTitle = document.createElement('span');
  visualTitle.setAttribute('aria-hidden', 'true');
  visualTitle.append(...Array.from(title.childNodes));
  title.appendChild(visualTitle);
  const walker = document.createTreeWalker(visualTitle, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(function (node) {
    const fragment = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).filter(Boolean).forEach(function (word) {
      if (/^\s+$/.test(word)) {
        fragment.appendChild(document.createTextNode(word));
        return;
      }
      const wordElement = document.createElement('span');
      wordElement.className = 'type-word';
      Array.from(word).forEach(function (letter) {
        const character = document.createElement('span');
        character.className = 'type-character';
        character.textContent = letter;
        characters.push(character);
        wordElement.appendChild(character);
      });
      fragment.appendChild(wordElement);
    });
    node.replaceWith(fragment);
  });

  function revealTitle(count) {
    if (count === revealCount) return;
    revealCount = count;
    characters.forEach(function (character, index) {
      character.classList.toggle('is-written', index < count);
      character.classList.toggle('is-writing', index === count - 1 && count < characters.length);
    });
  }
  revealTitle(reducedMotion.matches ? characters.length : 0);

  // Floral motion is periodic over exactly 8 seconds. Each bloom has its own
  // phase; stems and leaves are redrawn at their joints, not moved as a photo.
  const flowers = [
    { x: 365, y: 175, size: 160, base: 400, phase: 5.2, amplitude: 12, head: 0, angle: -.08, opacity: .9 },
    { x: 675, y: 330, size: 180, base: 665, phase: 2.1, amplitude: 14, head: 1, angle: .18, opacity: .94 },
    { x: 365, y: 570, size: 150, base: 390, phase: 3.8, amplitude: 11, head: 1, angle: -.12, opacity: .96 },
    { x: 530, y: 80, size: 240, base: 540, phase: 1.3, amplitude: 13, head: 1, angle: .12, opacity: .96 },
    { x: 186, y: 330, size: 250, base: 260, phase: 3.1, amplitude: 16, head: 0, angle: -.16, opacity: 1 },
    { x: 495, y: 270, size: 275, base: 550, phase: .4, amplitude: 20, head: 1, angle: .08, opacity: 1 },
    { x: 705, y: 530, size: 220, base: 680, phase: 4.4, amplitude: 12, head: 0, angle: -.18, opacity: 1 }
  ];

  function leaf(x, y, direction, size, rotation) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    context.scale(direction, 1);
    const color = context.createLinearGradient(0, 0, size, -size * .7);
    color.addColorStop(0, '#526a34');
    color.addColorStop(.55, '#82954e');
    color.addColorStop(1, '#b6bf78');
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(0, 0);
    context.bezierCurveTo(size * .06, -size * .61, size * .68, -size * .85, size, -size * .73);
    context.bezierCurveTo(size * .76, -size * .03, size * .3, size * .08, 0, 0);
    context.fill();
    context.strokeStyle = 'rgba(223,224,161,.45)';
    context.lineWidth = 1.3;
    context.beginPath();
    context.moveTo(0, 0);
    context.quadraticCurveTo(size * .48, -size * .37, size * .92, -size * .69);
    context.stroke();
    context.restore();
  }

  function draw(time) {
    petals.update(elapsed);
    const fallingCount = String(petals.falling.length);
    const regeneratingCount = String(petals.gaps.length);
    if (canvas.dataset.fallingPetals !== fallingCount) canvas.dataset.fallingPetals = fallingCount;
    if (canvas.dataset.regeneratingPetals !== regeneratingCount) canvas.dataset.regeneratingPetals = regeneratingCount;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);
    if (Math.abs(time - lastSkyTime) > 1 / 15) {
      drawSky(time);
      lastSkyTime = time;
    }
    const scale = sideGarden ? 1 : Math.min(width / 720, height / 780);
    if (!sideGarden) context.translate((width - 720 * scale) / 2, height - 780 * scale);
    context.scale(scale, scale);
    const theta = (time % cycle) / cycle * Math.PI * 2;
    poses = [];
    const activeFlowers = sideGarden ? window.DanyGardenLayout(width, height, compactGarden.matches) : flowers;
    activeFlowers.forEach(function (flower, flowerIndex) {
      const wave = Math.sin(theta + flower.phase);
      const secondWave = Math.sin(theta * 2 + flower.phase) * .18;
      const headX = flower.x + (wave + secondWave) * flower.amplitude;
      const headY = flower.y + Math.cos(theta + flower.phase) * 3;
      const headAngle = flower.angle + wave * .025;
      poses.push({ x: headX, y: headY, size: flower.size, angle: headAngle, head: flower.head, opacity: flower.opacity });
      const stemTop = headY + flower.size * .34;
      const bend = (headX - flower.base) * .38;
      context.save();
      context.globalAlpha = flower.opacity;
      const stem = context.createLinearGradient(flower.base - 12, 0, flower.base + 12, 0);
      stem.addColorStop(0, '#5e7139');
      stem.addColorStop(.5, '#8c9e56');
      stem.addColorStop(1, '#536a35');
      context.strokeStyle = stem;
      context.lineWidth = 10;
      context.lineCap = 'round';
      context.beginPath();
      if (sideGarden) {
        const rootY = height + flower.size * .4;
        const stemLength = rootY - stemTop;
        context.moveTo(flower.base, rootY);
        context.bezierCurveTo(flower.base + bend, rootY - stemLength * .35,
          headX + bend * .6, stemTop + stemLength * .3, headX, stemTop);
        context.stroke();
        leaf(flower.base + bend * .6, rootY - stemLength * .3, -1, flower.size * .48, wave * .04 - .12);
        leaf(flower.base + bend, rootY - stemLength * .58, 1, flower.size * .4, wave * .05 + .2);
      } else {
        context.moveTo(flower.base, 835);
        context.bezierCurveTo(flower.base + bend, 630, headX + bend * .6, 480, headX, stemTop);
        context.stroke();
        leaf(flower.base + bend * .6, 675, -1, 143, wave * .04 - .12);
        leaf(flower.base + bend, 570, 1, 117, wave * .05 + .2);
      }
      context.translate(headX, headY);
      context.rotate(headAngle);
      const cellWidth = image.naturalWidth / 2;
      const headHeight = flower.size * image.naturalHeight / cellWidth;
      const gaps = petals.gaps.filter(petal => petal.flowerIndex === flowerIndex);
      if (gaps.length) {
        // Remove only the sampled petal, on a separate head layer so the
        // mask cannot erase stems or other flowers behind it.
        const bufferSize = headBuffer.width;
        const bufferScale = bufferSize / flower.size;
        headContext.setTransform(1, 0, 0, 1, 0, 0);
        headContext.clearRect(0, 0, bufferSize, bufferSize);
        headContext.globalAlpha = 1;
        headContext.globalCompositeOperation = 'source-over';
        headContext.drawImage(image, flower.head * cellWidth, 0, cellWidth, image.naturalHeight, 0, 0, bufferSize, bufferSize);
        headContext.translate(bufferSize / 2, bufferSize / 2);
        headContext.scale(bufferScale, bufferScale);
        gaps.forEach(function (petal) {
          headContext.save();
          headContext.rotate(petal.angle);
          headContext.globalCompositeOperation = 'destination-out';
          headContext.globalAlpha = petals.removal(petal, elapsed);
          petals.path(headContext, flower.size);
          headContext.fill();
          headContext.restore();
        });
        context.drawImage(headBuffer, -flower.size / 2, -headHeight / 2, flower.size, headHeight);
      } else {
        context.drawImage(image, flower.head * cellWidth, 0, cellWidth, image.naturalHeight,
          -flower.size / 2, -headHeight / 2, flower.size, headHeight);
      }
      context.restore();
    });
    petals.falling.forEach(function (petal) {
      const state = petals.sample(petal, elapsed);
      context.save();
      context.globalAlpha = state.opacity;
      context.translate(state.x, state.y);
      context.rotate(state.rotation);
      context.translate(-petal.size * .265, 0);
      petals.path(context, petal.size);
      context.clip();
      context.rotate(-petal.angle);
      const cellWidth = image.naturalWidth / 2;
      context.drawImage(image, petal.head * cellWidth, 0, cellWidth, image.naturalHeight,
        -petal.size / 2, -petal.size / 2, petal.size, petal.size);
      context.restore();
    });
  }

  function drawSky(time) {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const skyWidth = skyCanvas.width / ratio;
    const skyHeight = skyCanvas.height / ratio;
    skyContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    skyContext.clearRect(0, 0, skyWidth, skyHeight);
    const sky = skyContext.createLinearGradient(0, 0, 0, skyHeight);
    sky.addColorStop(0, skyColors[0]);
    sky.addColorStop(.48, skyColors[1]);
    sky.addColorStop(.8, skyColors[2]);
    sky.addColorStop(1, skyColors[3]);
    skyContext.fillStyle = sky;
    skyContext.fillRect(0, 0, skyWidth, skyHeight);
    const clouds = [
      {x:.1,y:.14,size:.21,opacity:.64},
      {x:.66,y:.27,size:.25,opacity:.72},
      {x:1.1,y:.47,size:.17,opacity:.42}
    ];
    const drift = (time % 96) / 96;
    clouds.forEach(function (cloud) {
      const radius = skyWidth * cloud.size;
      const travel = skyWidth + radius * 4;
      const cloudX = ((cloud.x * skyWidth + drift * travel + radius * 2) % travel) - radius * 2;
      // Soft radial puffs have no hard outline; grain and refraction are
      // applied by the art-only filter, never by a filter on the hero text.
      [[-.65,.12,.65],[-.2,-.16,.85],[.32,-.05,.72],[.72,.16,.48],[.02,.25,.95]].forEach(function (puff) {
        skyContext.save();
        skyContext.translate(cloudX + puff[0] * radius, cloud.y * skyHeight + puff[1] * radius * .35);
        skyContext.scale(1, .43);
        const r = radius * puff[2];
        const light = skyContext.createRadialGradient(0, 0, r * .1, 0, 0, r);
        light.addColorStop(0, 'rgba(255,255,250,' + cloud.opacity + ')');
        light.addColorStop(.48, 'rgba(255,255,250,' + cloud.opacity * .6 + ')');
        light.addColorStop(1, 'rgba(255,255,250,0)');
        skyContext.fillStyle = light;
        skyContext.fillRect(-r, -r, r * 2, r * 2);
        skyContext.restore();
      });
    });
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    lastSkyTime = -Infinity;
    const skyBounds = skyCanvas.getBoundingClientRect();
    skyCanvas.width = Math.round(skyBounds.width * ratio);
    skyCanvas.height = Math.round(skyBounds.height * ratio);
    if (ready) draw(elapsed);
  }

  function tick(now) {
    frame = 0;
    if (!ready || userPaused || reducedMotion.matches || document.hidden || !inView) return;
    const delta = previousTime ? Math.min((now - previousTime) / 1000, .05) : 0;
    previousTime = now;
    elapsed += delta;
    // The title writes first; the floral motion gains amplitude smoothly.
    const count = Math.min(characters.length, Math.floor(Math.max(0, elapsed - .15) / 1.65 * characters.length));
    revealTitle(Math.max(revealCount, count));
    const entrance = Math.min(1, Math.max(0, (elapsed - 1.1) / 1.4));
    const easedEntrance = entrance * entrance * (3 - 2 * entrance);
    draw(elapsed * easedEntrance);
    frame = window.requestAnimationFrame(tick);
  }

  function syncMotion() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    const paused = userPaused || reducedMotion.matches;
    petals.setEnabled(!reducedMotion.matches);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = reducedMotion.matches ? 'Movimiento reducido' : paused ? 'Reanudar animación' : 'Pausar animación';
    toggle.disabled = reducedMotion.matches;
    if (paused) revealTitle(characters.length);
    if (ready && reducedMotion.matches) draw(0);
    if (ready && !paused && !document.hidden && inView) frame = window.requestAnimationFrame(tick);
  }

  toggle.addEventListener('click', function () { userPaused = !userPaused; syncMotion(); });
  function releasePetal(event) {
    if (!ready || userPaused || reducedMotion.matches || !inView || elapsed < 2) return;
    if (event.target.closest('a, button, input') || (!sideGarden && event.target.closest('.hero-content'))) return;
    const bounds = canvas.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return;
    const scale = sideGarden ? 1 : Math.min(width / 720, height / 780);
    const x = (event.clientX - bounds.left - (sideGarden ? 0 : (width - 720 * scale) / 2)) / scale;
    const y = (event.clientY - bounds.top - (sideGarden ? 0 : height - 780 * scale)) / scale;
    petals.releaseNear(x, y, poses, elapsed, Math.min(42, 22 / scale));
  }
  hero.addEventListener('pointermove', function (event) {
    if (event.pointerType !== 'touch') releasePetal(event);
  }, { passive: true });
  hero.addEventListener('pointerdown', releasePetal, { passive: true });
  reducedMotion.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(function (entries) { inView = entries[0].isIntersecting; syncMotion(); }).observe(hero);
  image.onload = function () {
    ready = true;
    hero.classList.add('sunflowers-ready');
    resize();
    syncMotion();
  };
  image.onerror = function () {
    hero.classList.add('image-unavailable');
    revealTitle(characters.length);
  };
  image.src = 'assets/girasoles-naturales-v2.png';
  syncMotion();
})();
