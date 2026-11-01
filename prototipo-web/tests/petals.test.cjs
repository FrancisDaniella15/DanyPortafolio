const test = require('node:test');
const assert = require('node:assert/strict');
const Petals = require('../petals.js');
const poses = [
  {x:100,y:100,size:100,angle:0,head:0,opacity:1},
  {x:400,y:100,size:100,angle:0,head:1,opacity:.9}
];
test('only nearby petals respond; the center and empty space do not', () => {
  const petals = new Petals();
  assert.equal(petals.releaseNear(100,100,poses,2,10),null);
  assert.equal(petals.releaseNear(900,900,poses,2,10),null);
  assert.ok(petals.releaseNear(143,100,poses,2,10));
  assert.equal(petals.releaseNear(100,143,poses,2.1,10),null);
});
test('at most two gaps per flower and three falling petals in total', () => {
  const petals = new Petals();
  assert.ok(petals.releaseNear(143,100,poses,2,10));
  assert.ok(petals.releaseNear(100,143,poses,3,10));
  assert.equal(petals.releaseNear(57,100,poses,4,10),null);
  assert.ok(petals.releaseNear(443,100,poses,4,10));
  assert.equal(petals.releaseNear(400,143,poses,5,10),null);
  assert.equal(petals.falling.length,3);
});
test('the petal starts exactly at its attachment, falls and fades', () => {
  const petals = new Petals();
  const petal = petals.releaseNear(143,100,poses,2,10);
  const start=petals.sample(petal,2);
  assert.equal(start.x,petal.rootX);
  assert.equal(start.y,petal.rootY);
  assert.equal(start.rotation,petal.rotation);
  assert.equal(start.opacity,1);
  assert.ok(petals.sample(petal,4).y > start.y);
  assert.equal(petals.sample(petal,7).opacity,0);
});
test('regeneration is gradual and the same location becomes available again', () => {
  const petals = new Petals();
  const petal=petals.releaseNear(143,100,poses,2,10);
  assert.equal(petals.removal(petal,6.7),1);
  assert.ok(Math.abs(petals.removal(petal,8.1)-.5)<1e-10);
  assert.equal(petals.removal(petal,9.5),0);
  petals.update(9.5);
  assert.equal(petals.gaps.length,0);
  assert.ok(petals.releaseNear(143,100,poses,9.5,10));
});
test('reducing motion clears falling petals and restores flower volume', () => {
  const petals=new Petals();
  petals.releaseNear(143,100,poses,2,10);
  petals.setEnabled(false);
  assert.equal(petals.gaps.length,0);
  assert.equal(petals.falling.length,0);
  assert.equal(petals.releaseNear(143,100,poses,4,10),null);
});
