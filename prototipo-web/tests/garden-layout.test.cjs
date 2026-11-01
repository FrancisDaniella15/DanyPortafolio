const test = require('node:test');
const assert = require('node:assert/strict');
const layout = require('../garden-layout.js');
const Petals = require('../petals.js');

test('low garden keeps eight flowers per side and four smaller central flowers', () => {
  for (const [width, height, compact] of [[1920,520,false],[1440,520,false],[851,520,false],[768,330,true],[390,330,true],[320,330,true]]) {
    const flowers = layout(width,height,compact);
    assert.equal(flowers.length,20);
    assert.equal(flowers.filter(f=>f.group==='left').length,8);
    assert.equal(flowers.filter(f=>f.group==='right').length,8);
    assert.equal(flowers.filter(f=>f.group==='center').length,4);
    for (const f of flowers) {
      assert.ok(f.size>0 && Number.isFinite(f.base));
      assert.ok(f.y-f.size/2>0 && f.y+f.size/2<height);
      if (f.group==='center') {
        assert.ok(f.y-f.size/2>height*.64);
        assert.ok(f.size<Math.max(...flowers.filter(f=>f.group==='left').map(f=>f.size))*.6);
      } else {
        const innerEdge=f.x<width/2?f.x+f.size/2:f.x-f.size/2;
        assert.ok(f.x<width/2?innerEdge<width*.4:innerEdge>width*.6);
      }
    }
  }
});

test('petals can detach from every flower using the displayed coordinates', () => {
  for (const compact of [false,true]) {
    const width=compact?390:1440, height=compact?330:520;
    const poses=layout(width,height,compact);
    poses.forEach((pose,index)=>{
      const petals=new Petals();
      const angle=pose.angle+(pose.x<width/2?Math.PI:0);
      const petal=petals.releaseNear(pose.x+Math.cos(angle)*pose.size*.43,pose.y+Math.sin(angle)*pose.size*.43,poses,3,22);
      assert.ok(petal);
      assert.equal(petal.flowerIndex,index);
      assert.equal(petals.falling.length,1);
    });
  }
});

test('reduced motion prevents falling petals in the dense garden',()=>{
  const petals=new Petals();petals.setEnabled(false);
  const poses=layout(1440,520,false), f=poses[0];
  assert.equal(petals.releaseNear(f.x+f.size*.43,f.y,poses,3,22),null);
  assert.equal(petals.falling.length,0);
});
