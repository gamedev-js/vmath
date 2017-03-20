const tap = require('./tap');
const { vec3, vec4 } = require('../dist/vmath');

tap.test('vec4', t => {
  let out, vecA, vecB, result;

  t.beforeEach(done => {
    vecA = vec4.new(1, 2, 3, 4);
    vecB = vec4.new(5, 6, 7, 8);
    out = vec4.new(0, 0, 0, 0);

    done();
  });

  t.test('create', t => {
    result = vec4.create();

    t.equal_v4(result, [0, 0, 0, 0]);

    t.end();
  });

  t.test('clone', t => {
    result = vec4.clone(vecA);

    t.deepEqual(result, vecA);

    t.end();
  });

  t.test('new', t => {
    result = vec4.new(1, 2, 3, 4);

    t.equal_v4(result, [1, 2, 3, 4]);

    t.end();
  });

  t.test('copy', t => {
    result = vec4.copy(out, vecA);

    t.equal_v4(out, [1, 2, 3, 4]);
    t.equal(result, out);

    t.end();
  });

  t.test('set', t => {
    result = vec4.set(out, 1, 2, 3, 4);

    t.equal_v4(out, [1, 2, 3, 4]);
    t.equal(result, out);

    t.end();
  });

  t.test('add', t => {
    t.test('with a separate output vector', t => {
      result = vec4.add(out, vecA, vecB);

      t.equal_v4(out, [6, 8, 10, 12]);
      t.equal(result, out);
      t.equal_v4(vecA, [1, 2, 3, 4]);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.add(vecA, vecA, vecB);

      t.equal_v4(vecA, [6, 8, 10, 12]);
      t.equal(result, vecA);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec4.add(vecB, vecA, vecB);

      t.equal_v4(vecB, [6, 8, 10, 12]);
      t.equal(result, vecB);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('subtract', t => {
    t.equal(vec4.sub, vec4.subtract);

    t.test('with a separate output vector', t => {
      result = vec4.subtract(out, vecA, vecB);

      t.equal_v4(out, [-4, -4, -4, -4]);
      t.equal(result, out);
      t.equal_v4(vecA, [1, 2, 3, 4]);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.subtract(vecA, vecA, vecB);

      t.equal_v4(vecA, [-4, -4, -4, -4]);
      t.equal(result, vecA);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec4.subtract(vecB, vecA, vecB);

      t.equal_v4(vecB, [-4, -4, -4, -4]);
      t.equal(result, vecB);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('multiply', t => {
    t.equal(vec4.mul, vec4.multiply);

    t.test('with a separate output vector', t => {
      result = vec4.multiply(out, vecA, vecB);

      t.equal_v4(out, [5, 12, 21, 32]);
      t.equal(result, out);
      t.equal_v4(vecA, [1, 2, 3, 4]);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.multiply(vecA, vecA, vecB);

      t.equal_v4(vecA, [5, 12, 21, 32]);
      t.equal(result, vecA);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec4.multiply(vecB, vecA, vecB);

      t.equal_v4(vecB, [5, 12, 21, 32]);
      t.equal(result, vecB);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('divide', t => {
    t.equal(vec4.div, vec4.divide);

    t.test('with a separate output vector', t => {
      result = vec4.divide(out, vecA, vecB);

      t.equal_v4(out, [0.2, 0.333333, 0.428571, 0.5]);
      t.equal(result, out);
      t.equal_v4(vecA, [1, 2, 3, 4]);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.divide(vecA, vecA, vecB);

      t.equal_v4(vecA, [0.2, 0.333333, 0.428571, 0.5]);
      t.equal(result, vecA);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec4.divide(vecB, vecA, vecB);

      t.equal_v4(vecB, [0.2, 0.333333, 0.428571, 0.5]);
      t.equal(result, vecB);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('ceil', t => {
    t.beforeEach(done => {
      vec4.set(vecA, Math.E, Math.PI, Math.SQRT2, Math.SQRT1_2);
      done();
    });

    t.test('with a separate output vector', t => {
      result = vec4.ceil(out, vecA);

      t.equal_v4(out, [3, 4, 2, 1]);
      t.equal(result, out);
      t.equal_v4(vecA, [Math.E, Math.PI, Math.SQRT2, Math.SQRT1_2]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.ceil(vecA, vecA);

      t.equal_v4(vecA, [3, 4, 2, 1]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('floor', t => {
    t.beforeEach(done => {
      vec4.set(vecA, Math.E, Math.PI, Math.SQRT2, Math.SQRT1_2);
      done();
    });

    t.test('with a separate output vector', t => {
      result = vec4.floor(out, vecA);

      t.equal_v4(out, [2, 3, 1, 0]);
      t.equal(result, out);
      t.equal_v4(vecA, [Math.E, Math.PI, Math.SQRT2, Math.SQRT1_2]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.floor(vecA, vecA);

      t.equal_v4(vecA, [2, 3, 1, 0]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('min', t => {
    t.beforeEach(done => {
      vec4.set(vecA, 1, 3, 1, 3);
      vec4.set(vecB, 3, 1, 3, 1);

      done();
    });

    t.test('with a separate output vector', t => {
      result = vec4.min(out, vecA, vecB);

      t.equal_v4(out, [1, 1, 1, 1]);
      t.equal(result, out);
      t.equal_v4(vecA, [1, 3, 1, 3]);
      t.equal_v4(vecB, [3, 1, 3, 1]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.min(vecA, vecA, vecB);

      t.equal_v4(vecA, [1, 1, 1, 1]);
      t.equal(result, vecA);
      t.equal_v4(vecB, [3, 1, 3, 1]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec4.min(vecB, vecA, vecB);

      t.equal_v4(vecB, [1, 1, 1, 1]);
      t.equal(result, vecB);
      t.equal_v4(vecA, [1, 3, 1, 3]);

      t.end();
    });

    t.end();
  });

  t.test('max', t => {
    t.beforeEach(done => {
      vec4.set(vecA, 1, 3, 1, 3);
      vec4.set(vecB, 3, 1, 3, 1);
      done();
    });

    t.test('with a separate output vector', t => {
      result = vec4.max(out, vecA, vecB);

      t.equal_v4(out, [3, 3, 3, 3]);
      t.equal(result, out);
      t.equal_v4(vecA, [1, 3, 1, 3]);
      t.equal_v4(vecB, [3, 1, 3, 1]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.max(vecA, vecA, vecB);

      t.equal_v4(vecA, [3, 3, 3, 3]);
      t.equal(result, vecA);
      t.equal_v4(vecB, [3, 1, 3, 1]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec4.max(vecB, vecA, vecB);

      t.equal_v4(vecB, [3, 3, 3, 3]);
      t.equal(result, vecB);
      t.equal_v4(vecA, [1, 3, 1, 3]);

      t.end();
    });

    t.end();
  });

  t.test('round', t => {
    t.beforeEach(done => {
      vec4.set(vecA, Math.E, Math.PI, Math.SQRT2, Math.SQRT1_2);
      done();
    });

    t.test('with a separate output vector', t => {
      result = vec4.round(out, vecA);

      t.equal_v4(out, [3, 3, 1, 1]);
      t.equal(result, out);
      t.equal_v4(vecA, [Math.E, Math.PI, Math.SQRT2, Math.SQRT1_2]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.round(vecA, vecA);

      t.equal_v4(vecA, [3, 3, 1, 1]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('scale', t => {
    t.test('with a separate output vector', t => {
      result = vec4.scale(out, vecA, 2);

      t.equal_v4(out, [2, 4, 6, 8]);
      t.equal(result, out);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.scale(vecA, vecA, 2);

      t.equal_v4(vecA, [2, 4, 6, 8]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('scaleAndAdd', t => {
    t.test('with a separate output vector', t => {
      result = vec4.scaleAndAdd(out, vecA, vecB, 0.5);

      t.equal_v4(out, [3.5, 5, 6.5, 8]);
      t.equal(result, out);
      t.equal_v4(vecA, [1, 2, 3, 4]);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.scaleAndAdd(vecA, vecA, vecB, 0.5);

      t.equal_v4(vecA, [3.5, 5, 6.5, 8]);
      t.equal(result, vecA);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec4.scaleAndAdd(vecB, vecA, vecB, 0.5);

      t.equal_v4(vecB, [3.5, 5, 6.5, 8]);
      t.equal(result, vecB);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('distance', t => {
    t.equal(vec4.dist, vec4.distance);

    result = vec4.distance(vecA, vecB);

    t.approx(result, 8);

    t.end();
  });

  t.test('squaredDistance', t => {
    t.equal(vec4.sqrDist, vec4.squaredDistance);

    result = vec4.squaredDistance(vecA, vecB);

    t.equal(result, 64);

    t.end();
  });

  t.test('length', t => {
    t.equal(vec4.len, vec4.length);

    result = vec4.length(vecA);

    t.approx(result, 5.477225);

    t.end();
  });

  t.test('squaredLength', t => {
    t.equal(vec4.sqrLen, vec4.squaredLength);

    result = vec4.squaredLength(vecA);

    t.equal(result, 30);

    t.end();
  });

  t.test('negate', t => {
    t.test('with a separate output vector', t => {
      result = vec4.negate(out, vecA);

      t.equal_v4(out, [-1, -2, -3, -4]);
      t.equal(result, out);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.negate(vecA, vecA);

      t.equal_v4(vecA, [-1, -2, -3, -4]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('inverse', t => {
    vec4.set(vecA, 0.1, 0.2, 0.3, 0.4);

    result = vec4.inverse(out, vecA);

    t.equal_v4(out, [10, 5, 10 / 3, 2.5]);
    t.equal(result, out);

    t.end();
  });

  t.test('inverseSafe', t => {
    vec4.set(vecA, 0.1, 0.2, 0.3, 0.4);
    vec4.set(vecB, 0.0000000001, -0.0000000001, 0.1, 0.2);

    result = vec4.inverseSafe(out, vecA);
    t.equal_v4(out, [10, 5, 10 / 3, 2.5]);
    t.equal(result, out);

    result = vec4.inverseSafe(out, vecB);
    t.equal_v4(out, [0, 0, 10, 5]);
    t.equal(result, out);

    t.end();
  });

  t.test('normalize', t => {
    t.beforeEach(done => {
      vec4.set(vecA, 5, 0, 0, 0);
      done();
    });

    t.test('with a separate output vector', t => {
      result = vec4.normalize(out, vecA);

      t.equal_v4(out, [1, 0, 0, 0]);
      t.equal(result, out);
      t.equal_v4(vecA, [5, 0, 0, 0]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.normalize(vecA, vecA);

      t.equal_v4(vecA, [1, 0, 0, 0]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('dot', t => {
    result = vec4.dot(vecA, vecB);

    t.equal(result, 70);
    t.equal_v4(vecA, [1, 2, 3, 4]);
    t.equal_v4(vecB, [5, 6, 7, 8]);

    t.end();
  });

  t.test('lerp', t => {
    t.test('with a separate output vector', t => {
      result = vec4.lerp(out, vecA, vecB, 0.5);

      t.equal_v4(out, [3, 4, 5, 6]);
      t.equal(result, out);
      t.equal_v4(vecA, [1, 2, 3, 4]);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec4.lerp(vecA, vecA, vecB, 0.5);

      t.equal_v4(vecA, [3, 4, 5, 6]);
      t.equal(result, vecA);
      t.equal_v4(vecB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec4.lerp(vecB, vecA, vecB, 0.5);

      t.equal_v4(vecB, [3, 4, 5, 6]);
      t.equal(result, vecB);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('random', t => {
    t.test('with no scale', t => {
      result = vec4.random(out);

      t.approx(vec4.length(out), 1.0);
      t.equal(result, out);

      t.end();
    });

    t.test('with a scale', t => {
      result = vec4.random(out, 5.0);

      t.approx(vec4.length(out), 5.0);
      t.equal(result, out);

      t.end();
    });

    t.end();
  });

  t.test('forEach', t => {
    let vecArray;

    t.beforeEach(done => {
      vecArray = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        0, 0, 0, 0
      ];

      done();
    });

    t.test('when performing operations that take no extra arguments', t => {
      result = vec4.forEach(vecArray, 0, 0, 0, vec4.normalize);

      t.approxArray(vecArray, [
        0.182574, 0.365148, 0.547722, 0.730296,
        0.379049, 0.454858, 0.530668, 0.606478,
        0, 0, 0, 0
      ]);
      t.equal(result, vecArray);

      t.end();
    });

    t.test('when performing operations that takes one extra arguments', t => {
      result = vec4.forEach(vecArray, 0, 0, 0, vec4.add, vecA);

      t.approxArray(vecArray, [
        2, 4, 6, 8,
        6, 8, 10, 12,
        1, 2, 3, 4
      ]);
      t.equal(result, vecArray);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when specifying an offset', t => {
      result = vec4.forEach(vecArray, 0, 4, 0, vec4.add, vecA);

      t.approxArray(vecArray, [
        1, 2, 3, 4,
        6, 8, 10, 12,
        1, 2, 3, 4
      ]);
      t.equal(result, vecArray);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when specifying a count', t => {
      result = vec4.forEach(vecArray, 0, 0, 2, vec4.add, vecA);

      t.approxArray(vecArray, [
        2, 4, 6, 8,
        6, 8, 10, 12,
        0, 0, 0, 0
      ]);
      t.equal(result, vecArray);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when specifying a stride', t => {
      result = vec4.forEach(vecArray, 8, 0, 0, vec4.add, vecA);

      t.approxArray(vecArray, [
        2, 4, 6, 8,
        5, 6, 7, 8,
        1, 2, 3, 4
      ]);
      t.equal(result, vecArray);
      t.equal_v4(vecA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when calling a function that does not modify the out variable', t => {
      result = vec3.forEach(vecArray, 0, 0, 0, function (out, vec) { });

      t.approxArray(vecArray, [
        1, 2, 3, 4,
        5, 6, 7, 8,
        0, 0, 0, 0
      ]);
      t.equal(result, vecArray);

      t.end();
    });

    t.end();
  });

  t.test('str', t => {
    result = vec4.str(vecA);

    t.equal(result, 'vec4(1, 2, 3, 4)');

    t.end();
  });

  t.test('exactEquals', t => {
    vec4.set(vecA, 0, 1, 2, 3);
    vec4.set(vecB, 0, 1, 2, 3);
    let vecC = vec4.new(1, 2, 3, 4);
    let r0 = vec4.exactEquals(vecA, vecB);
    let r1 = vec4.exactEquals(vecA, vecC);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal_v4(vecA, [0, 1, 2, 3]);
    t.equal_v4(vecB, [0, 1, 2, 3]);

    t.end();
  });

  t.test('equals', t => {
    vec4.set(vecA, 0, 1, 2, 3);
    vec4.set(vecB, 0, 1, 2, 3);

    let vecC = vec4.new(1, 2, 3, 4);
    let vecD = vec4.new(1e-16, 1, 2, 3);
    let r0 = vec4.equals(vecA, vecB);
    let r1 = vec4.equals(vecA, vecC);
    let r2 = vec4.equals(vecA, vecD);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal(r2, true);
    t.equal_v4(vecA, [0, 1, 2, 3]);
    t.equal_v4(vecB, [0, 1, 2, 3]);

    t.end();
  });

  t.end();
});
