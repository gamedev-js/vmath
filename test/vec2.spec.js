const tap = require('./tap');
const {vec2} = require('../dist/vmath');

tap.test('vec2', t => {
  let out, vecA, vecB, result;

  t.beforeEach(done => {
    vecA = vec2.fromValues(1,2);
    vecB = vec2.fromValues(3,4);
    out = vec2.fromValues(0,0);

    done();
  });

  t.test('create', t => {
    result = vec2.create();
    t.equal(result.x, 0.0);
    t.equal(result.y, 0.0);

    t.end();
  });

  t.test('clone', t => {
    result = vec2.clone(vecA);
    t.deepEqual(result, vecA);

    t.end();
  });

  t.test('fromValues', t => {
    result = vec2.fromValues(1, 2);
    t.equal(result.x, 1);
    t.equal(result.y, 2);

    t.end();
  });

  t.test('copy', t => {
    result = vec2.copy(out, vecA);
    t.deepEqual(result, vecA);
    t.deepEqual(out, vecA);

    t.end();
  });

  t.test('set', t => {
    result = vec2.set(out, 1, 2);
    t.equal(result.x, 1);
    t.equal(result.y, 2);
    t.equal(out.x, 1);
    t.equal(out.y, 2);

    t.end();
  });

  t.end();
});