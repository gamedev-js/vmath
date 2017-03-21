const tap = require('./tap');
const utils = require('../dist/vmath');

tap.test('utils', t => {
  t.test('equals', t => {
    let r0 = utils.equals(1.0, 0.0);
    let r1 = utils.equals(1.0, 1.0);
    let r2 = utils.equals(1.0 + utils.EPSILON / 2, 1.0);

    t.equal(r0, false);
    t.equal(r1, true);
    t.equal(r2, true);

    t.end();
  });

  t.test('approx', t => {
    let r0 = utils.approx(1.0, 0.0);
    let r1 = utils.approx(1.0, 1.01, 0.1);
    let r2 = utils.approx(1.0 + utils.EPSILON / 2, 1.0);

    t.equal(r0, false);
    t.equal(r1, true);
    t.equal(r2, true);

    t.end();
  });

  t.test('clamp', t => {
    t.equal(utils.clamp(0, -1, 1), 0);
    t.equal(utils.clamp(10, -1, 1), 1);
    t.equal(utils.clamp(-10, -1, 1), -1);

    t.end();
  });

  t.test('clamp01', t => {
    t.equal(utils.clamp01(0), 0);
    t.equal(utils.clamp01(10), 1);
    t.equal(utils.clamp01(-10), 0);

    t.end();
  });

  t.test('powof2', t => {
    t.equal(utils.powof2(100), false);
    t.equal(utils.powof2(64), true);
    t.equal(utils.powof2(2), true);

    t.end();
  });

  t.test('lerp', t => {
    t.equal(utils.lerp(0, 1, 0.2), 0.2);
    t.equal(utils.lerp(-10, 10, 0.5), 0);
    t.equal(utils.lerp(0, 1, 1), 1);
    t.equal(utils.lerp(0, 1, 0), 0);

    t.end();
  });

  t.test('toRadian', t => {
    t.approx(utils.toRadian(180), Math.PI);
    t.end();
  });

  t.test('toDegree', t => {
    t.approx(utils.toDegree(Math.PI), 180);
    t.end();
  });

  t.test('randomRange', t => {
    let r = utils.randomRange(-10, 10);
    t.assert(r >= -10 && r <= 10);
    t.end();
  });

  t.test('randomRangeInt', t => {
    let r = utils.randomRangeInt(-10, 10);
    t.assert(r >= -10 && r <= 10);
    t.end();
  });

  t.end();
});

