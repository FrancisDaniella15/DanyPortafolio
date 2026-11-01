(function (root) {
  'use strict';
  function gardenLayout(width, height, compact) {
    const size = compact ? Math.min(126, width * .22) : Math.min(190, Math.max(100, width * .12));
    const positions = compact ? [
      [.065,.18,.80],[.225,.23,.88],[.055,.38,.94],[.24,.43,.76],
      [.07,.58,1.02],[.225,.65,.92],[.035,.78,.90],[.24,.83,.78]
    ] : [
      [.055,.16,.78],[.145,.27,.96],[.035,.38,.90],[.15,.49,1.08],
      [.055,.61,.92],[.16,.71,.82],[.025,.78,1.02],[.14,.86,.74]
    ];
    const flowers = [];
    [-1, 1].forEach(function (side) {
      positions.forEach(function (position, index) {
        const x = (side < 0 ? position[0] : 1 - position[0]) * width;
        const flowerSize = size * position[2];
        flowers.push({
          x: x, y: height * position[1], size: flowerSize,
          group: side < 0 ? 'left' : 'right',
          base: x - side * flowerSize * .2,
          phase: index * 1.8 + (side < 0 ? .3 : 2.2),
          amplitude: flowerSize * .055,
          head: (index + (side > 0 ? 1 : 0)) % 2,
          angle: side * (index === 1 ? .10 : -.08), opacity: 1
        });
      });
    });
    [[.36,.85,.48],[.46,.78,.54],[.57,.87,.44],[.66,.79,.51]].forEach(function (position, index) {
      const x = width * position[0];
      const flowerSize = size * position[2];
      flowers.push({
        x: x, y: height * position[1], size: flowerSize, group: 'center',
        base: x + (index % 2 ? -1 : 1) * flowerSize * .15,
        phase: index * 1.5 + .8, amplitude: flowerSize * .045,
        head: index % 2, angle: index % 2 ? .08 : -.10, opacity: 1
      });
    });
    return flowers;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = gardenLayout;
  else root.DanyGardenLayout = gardenLayout;
})(typeof window !== 'undefined' ? window : globalThis);
