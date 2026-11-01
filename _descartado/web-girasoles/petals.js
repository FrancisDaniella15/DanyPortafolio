(function (root) {
  'use strict';
  const smooth = function (value) {
    const t = Math.max(0, Math.min(1, value));
    return t * t * (3 - 2 * t);
  };

  class Petals {
    constructor() {
      this.enabled = true;
      this.gaps = [];
      this.falling = [];
      this.lastRelease = -Infinity;
      this.serial = 0;
    }

    setEnabled(enabled) {
      this.enabled = enabled;
      if (!enabled) { this.gaps = []; this.falling = []; }
    }

    update(now) {
      this.falling = this.falling.filter(petal => now - petal.born < 5);
      this.gaps = this.gaps.filter(petal => now - petal.born < 7.5);
    }

    releaseNear(x, y, poses, now, tolerance) {
      this.update(now);
      if (!this.enabled || now - this.lastRelease < .75 || this.falling.length >= 3) return null;
      let nearest = null;
      poses.forEach(function (pose, flowerIndex) {
        const dx = x - pose.x;
        const dy = y - pose.y;
        const radius = Math.hypot(dx, dy);
        if (radius < pose.size * .29 || radius > pose.size * .51 + tolerance) return;
        const localAngle = Math.atan2(dy, dx) - pose.angle;
        const sector = ((Math.round(localAngle / (Math.PI * 2) * 28) % 28) + 28) % 28;
        const angle = sector / 28 * Math.PI * 2;
        const tipX = pose.x + Math.cos(pose.angle + angle) * pose.size * .43;
        const tipY = pose.y + Math.sin(pose.angle + angle) * pose.size * .43;
        const distance = Math.hypot(x - tipX, y - tipY);
        if (distance > tolerance + pose.size * .06) return;
        if (!nearest || distance < nearest.distance) nearest = { pose, flowerIndex, sector, angle, distance };
      });
      if (!nearest) return null;
      const occupied = this.gaps.filter(petal => petal.flowerIndex === nearest.flowerIndex);
      if (occupied.length >= 2 || occupied.some(petal => petal.sector === nearest.sector)) return null;
      const pose = nearest.pose;
      const rotation = pose.angle + nearest.angle;
      const rootRadius = pose.size * .265;
      const petal = {
        flowerIndex: nearest.flowerIndex, sector: nearest.sector, angle: nearest.angle,
        head: pose.head, size: pose.size, opacity: pose.opacity, born: now,
        rootX: pose.x + Math.cos(rotation) * rootRadius,
        rootY: pose.y + Math.sin(rotation) * rootRadius,
        rotation, direction: Math.cos(rotation) < 0 ? -1 : 1,
        phase: (this.serial++ * 2.399) % (Math.PI * 2)
      };
      this.gaps.push(petal);
      this.falling.push(petal);
      this.lastRelease = now;
      return petal;
    }

    removal(petal, now) {
      return 1 - smooth((now - petal.born - 4.7) / 2.8);
    }

    sample(petal, now) {
      const age = Math.max(0, now - petal.born);
      const drift = Math.sin(age * 1.7 + petal.phase) - Math.sin(petal.phase);
      return {
        x: petal.rootX + petal.direction * age * 5 + drift * 8 * (1 - Math.exp(-age)),
        y: petal.rootY + 6 * age + 13 * age * age,
        rotation: petal.rotation + petal.direction * (.12 * age + .18 * Math.sin(age * 1.35)),
        opacity: petal.opacity * (1 - smooth((age - 2.7) / 2.3))
      };
    }

    path(context, size) {
      const start = size * .265;
      const end = size * .475;
      const halfWidth = size * .025;
      context.beginPath();
      context.moveTo(start, -halfWidth * .3);
      context.bezierCurveTo(start + size * .05, -halfWidth, end - size * .04, -halfWidth, end, 0);
      context.bezierCurveTo(end - size * .04, halfWidth, start + size * .05, halfWidth, start, halfWidth * .3);
      context.closePath();
    }
  }

  root.DanyPetals = Petals;
  if (typeof module !== 'undefined' && module.exports) module.exports = Petals;
})(typeof window !== 'undefined' ? window : globalThis);
