const tap = require('./tap');
const {vec2} = require('../dist/vmath');

tap.test('vec2', t => {
  let out, vecA, vecB, result;

  t.beforeEach(done => {
    vecA = vec2.new(1,2);
    vecB = vec2.new(3,4);
    out = vec2.new(0,0);

    done();
  });

  t.test('create', t => {
    result = vec2.create();
    t.equal_v2(result, [0, 0]);

    t.end();
  });

  t.test('new', t => {
    result = vec2.new(1, 2);
    t.equal_v2(result, [1, 2]);

    t.end();
  });

  t.test('clone', t => {
    result = vec2.clone(vecA);
    t.deepEqual(result, vecA);

    t.end();
  });

  t.test('copy', t => {
    result = vec2.copy(out, vecA);
    t.deepEqual(result, vecA);
    t.equal(out, result);

    t.end();
  });

  t.test('set', t => {
    result = vec2.set(out, 1, 2);
    t.equal_v2(result, [1, 2]);
    t.equal(result, out);

    t.end();
  });

  t.test('add', t => {
    t.test('with a separate output vector', t => {
      result = vec2.add(out, vecA, vecB);
      t.equal_v2(out, [4, 6]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 2]);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.add(vecA, vecA, vecB);
      t.equal_v2(vecA, [4, 6]);
      t.equal(result, vecA);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.add(vecB, vecA, vecB);
      t.equal_v2(vecB, [4, 6]);
      t.equal(result, vecB);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.end();
  });

  t.test('subtract', t => {
    t.equal(vec2.sub, vec2.subtract);

    t.test('with a separate output vector', t => {
      result = vec2.sub(out, vecA, vecB);
      t.equal_v2(out, [-2, -2]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 2]);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.sub(vecA, vecA, vecB);
      t.equal_v2(vecA, [-2, -2]);
      t.equal(result, vecA);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.sub(vecB, vecA, vecB);
      t.equal_v2(vecB, [-2, -2]);
      t.equal(result, vecB);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.end();
  });

  t.test('multiply', t => {
    t.equal(vec2.mul, vec2.multiply);

    t.test('with a separate output vector', t => {
      result = vec2.mul(out, vecA, vecB);
      t.equal_v2(out, [3, 8]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 2]);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.mul(vecA, vecA, vecB);
      t.equal_v2(vecA, [3, 8]);
      t.equal(result, vecA);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.mul(vecB, vecA, vecB);
      t.equal_v2(vecB, [3, 8]);
      t.equal(result, vecB);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.end();
  });

  t.test('divide', t => {
    t.equal(vec2.div, vec2.divide);

    t.test('with a separate output vector', t => {
      result = vec2.div(out, vecA, vecB);
      t.equal_v2(out, [0.3333333, 0.5]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 2]);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.div(vecA, vecA, vecB);
      t.equal_v2(vecA, [0.3333333, 0.5]);
      t.equal(result, vecA);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.div(vecB, vecA, vecB);
      t.equal_v2(vecB, [0.3333333, 0.5]);
      t.equal(result, vecB);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.end();
  });

  t.test('ceil', t => {
    t.test('with a separate output vector', t => {
      vec2.set(vecA, Math.E, Math.PI);
      result = vec2.ceil(out, vecA);

      t.equal_v2(out, [3, 4]);
      t.equal(result, out);
      t.equal_v2(vecA, [Math.E, Math.PI]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      vec2.set(vecA, Math.E, Math.PI);
      result = vec2.ceil(vecA, vecA);

      t.equal_v2(vecA, [3, 4]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('floor', t => {
    t.test('with a separate output vector', t => {
      vec2.set(vecA, Math.E, Math.PI);
      result = vec2.floor(out, vecA);

      t.equal_v2(out, [2, 3]);
      t.equal(result, out);
      t.equal_v2(vecA, [Math.E, Math.PI]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      vec2.set(vecA, Math.E, Math.PI);
      result = vec2.floor(vecA, vecA);

      t.equal_v2(vecA, [2, 3]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('min', t => {
    t.beforeEach(done => {
      vec2.set(vecA, 1, 4);
      vec2.set(vecB, 3, 2);

      done();
    });

    t.test('with a separate output vector', t => {
      result = vec2.min(out, vecA, vecB);

      t.equal_v2(out, [1, 2]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 4]);
      t.equal_v2(vecB, [3, 2]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.min(vecA, vecA, vecB);

      t.equal_v2(vecA, [1, 2]);
      t.equal(result, vecA);
      t.equal_v2(vecB, [3, 2]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.min(vecB, vecA, vecB);

      t.equal_v2(vecB, [1, 2]);
      t.equal(result, vecB);
      t.equal_v2(vecA, [1, 4]);

      t.end();
    });

    t.end();
  });

  t.test('max', t => {
    t.beforeEach(done => {
      vec2.set(vecA, 1, 4);
      vec2.set(vecB, 3, 2);

      done();
    });

    t.test('with a separate output vector', t => {
      result = vec2.max(out, vecA, vecB);

      t.equal_v2(out, [3, 4]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 4]);
      t.equal_v2(vecB, [3, 2]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.max(vecA, vecA, vecB);

      t.equal_v2(vecA, [3, 4]);
      t.equal(result, vecA);
      t.equal_v2(vecB, [3, 2]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.max(vecB, vecA, vecB);

      t.equal_v2(vecB, [3, 4]);
      t.equal(result, vecB);
      t.equal_v2(vecA, [1, 4]);

      t.end();
    });

    t.end();
  });

  t.test('round', t => {
    t.beforeEach(done => {
      vec2.set(vecA, Math.E, Math.PI);

      done();
    });

    t.test('with a separate output vector', t => {
      result = vec2.round(out, vecA);

      t.equal_v2(out, [3, 3]);
      t.equal(result, out);
      t.equal_v2(vecA, [Math.E, Math.PI]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.round(vecA, vecA);

      t.equal_v2(vecA, [3, 3]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('scale', t => {
    t.test('with a separate output vector', t => {
      result = vec2.scale(out, vecA, 2);

      t.equal_v2(out, [2, 4]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.scale(vecA, vecA, 2);

      t.equal_v2(vecA, [2, 4]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('scaleAndAdd', t => {
    t.test('with a separate output vector', t => {
      result = vec2.scaleAndAdd(out, vecA, vecB, 0.5);

      t.equal_v2(out, [2.5, 4]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 2]);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.scaleAndAdd(vecA, vecA, vecB, 0.5);

      t.equal_v2(vecA, [2.5, 4]);
      t.equal(result, vecA);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.scaleAndAdd(vecB, vecA, vecB, 0.5);

      t.equal_v2(vecB, [2.5, 4]);
      t.equal(result, vecB);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.end();
  });

  t.test('distance', t => {
    t.equal(vec2.dist, vec2.distance);

    result = vec2.distance(vecA, vecB);
    t.approx(result, 2.828427);

    t.end();
  });

  t.test('squaredDistance', t => {
    t.equal(vec2.sqrDist, vec2.squaredDistance);

    result = vec2.squaredDistance(vecA, vecB);
    t.approx(result, 8);

    t.end();
  });

  t.test('length', t => {
    t.equal(vec2.len, vec2.length);

    result = vec2.length(vecA);
    t.approx(result, 2.236067);

    t.end();
  });

  t.test('squaredLength', t => {
    t.equal(vec2.sqrLen, vec2.squaredLength);

    result = vec2.squaredLength(vecA);
    t.equal(result, 5);

    t.end();
  });

  t.test('negate', t => {
    t.test('with a separate output vector', t => {
      result = vec2.negate(out, vecA);

      t.equal_v2(out, [-1, -2]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.negate(vecA, vecA);

      t.equal_v2(vecA, [-1, -2]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('inverse', t => {
    vec2.set(vecA, 0.1, 0.2);

    result = vec2.inverse(out, vecA);
    t.equal_v2(out, [10, 5]);
    t.equal(result, out);
    t.equal_v2(vecA, [0.1, 0.2]);

    t.end();
  });

  t.test('inverseSafe', t => {
    vec2.set(vecA, 0.1, 0.2);
    vec2.set(vecB, 0.0000000001, -0.0000000001);

    result = vec2.inverseSafe(out, vecA);
    t.equal_v2(out, [10, 5]);
    t.equal(result, out);
    t.equal_v2(vecA, [0.1, 0.2]);

    result = vec2.inverseSafe(out, vecB);
    t.equal_v2(out, [0, 0]);
    t.equal(result, out);
    t.equal_v2(vecB, [0.0000000001, -0.0000000001]);

    t.end();
  });

  t.test('normalize', t => {
    t.beforeEach(done => {
      vec2.set(vecA, 5, 0);
      done();
    });

    t.test('with a separate output vector', t => {
      result = vec2.normalize(out, vecA);

      t.equal_v2(out, [1, 0]);
      t.equal(result, out);
      t.equal_v2(vecA, [5, 0]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.normalize(vecA, vecA);

      t.equal_v2(vecA, [1, 0]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('dot', t => {
    result = vec2.dot(vecA, vecB);
    t.equal(result, 11);
    t.equal_v2(vecA, [1, 2]);
    t.equal_v2(vecB, [3, 4]);

    t.end();
  });

  t.test('cross', t => {
    let out3 = {};
    result = vec2.cross(out3, vecA, vecB);

    t.deepEqual(out3, { x: 0, y: 0, z: -2});
    t.equal(result, out3);
    t.equal_v2(vecA, [1, 2]);
    t.equal_v2(vecB, [3, 4]);

    t.end();
  });

  t.test('lerp', t => {
    t.test('with a separate output vector', t => {
      result = vec2.lerp(out, vecA, vecB, 0.5);

      t.equal_v2(out, [2, 3]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 2]);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.lerp(vecA, vecA, vecB, 0.5);

      t.equal_v2(vecA, [2, 3]);
      t.equal(result, vecA);
      t.equal_v2(vecB, [3, 4]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.lerp(vecB, vecA, vecB, 0.5);

      t.equal_v2(vecB, [2, 3]);
      t.equal(result, vecB);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.end();
  });

  t.test('random', t => {
    t.test('with no scale', t => {
      result = vec2.random(out);

      t.approx(vec2.length(out), 1.0);
      t.equal(result, out);

      t.end();
    });

    t.test('with a scale', t => {
      result = vec2.random(out, 5.0);

      t.approx(vec2.length(out), 5.0);
      t.equal(result, out);

      t.end();
    });

    t.end();
  });

  t.test('transformMat2', t => {
    let matA = {
      m00: 1, m01: 2, m02: 3, m03: 4
    };

    t.test('with a separate output vector', t => {
      result = vec2.transformMat2(out, vecA, matA);

      t.equal_v2(out, [7, 10]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 2]);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.transformMat2(vecA, vecA, matA);

      t.equal_v2(vecA, [7, 10]);
      t.equal(result, vecA);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('transformMat23', t => {
    let matA = {
      m00: 1, m01: 2, m02: 3, m03: 4, m04: 5, m05: 6
    };

    t.test('with a separate output vector', t => {
      result = vec2.transformMat23(out, vecA, matA);

      t.equal_v2(out, [12, 16]);
      t.equal(result, out);
      t.equal_v2(vecA, [1, 2]);
      t.equal_m23(matA, [1, 2, 3, 4, 5, 6]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.transformMat23(vecA, vecA, matA);

      t.equal_v2(vecA, [12, 16]);
      t.equal(result, vecA);
      t.equal_m23(matA, [1, 2, 3, 4, 5, 6]);

      t.end();
    });

    t.end();
  });

  t.test('forEach', t => {
    let vecArray = [];
    t.beforeEach(done => {
      vecArray = [
        1, 2,
        3, 4,
        0, 0
      ];

      done();
    });

    t.test('when performing operations that take no extra arguments', t => {
      result = vec2.forEach(vecArray, 0, 0, 0, vec2.normalize);

      t.approxArray(vecArray, [
        0.447214, 0.894427,
        0.6, 0.8,
        0, 0
      ]);
      t.equal(result, vecArray);

      t.end();
    });

    t.test('when performing operations that takes one extra arguments', t => {
      result = vec2.forEach(vecArray, 0, 0, 0, vec2.add, vecA);

      t.deepEqual(vecArray, [
        2, 4,
        4, 6,
        1, 2
      ]);
      t.equal(result, vecArray);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.test('when specifying an offset', t => {
      result = vec2.forEach(vecArray, 0, 2, 0, vec2.add, vecA);

      t.deepEqual(vecArray, [
        1, 2,
        4, 6,
        1, 2
      ]);
      t.equal(result, vecArray);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.test('when specifying a count', t => {
      result = vec2.forEach(vecArray, 0, 0, 2, vec2.add, vecA);

      t.deepEqual(vecArray, [
        2, 4,
        4, 6,
        0, 0
      ]);
      t.equal(result, vecArray);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.test('when specifying a stride', t => {
      result = vec2.forEach(vecArray, 4, 0, 0, vec2.add, vecA);

      t.deepEqual(vecArray, [
        2, 4,
        3, 4,
        1, 2
      ]);
      t.equal(result, vecArray);
      t.equal_v2(vecA, [1, 2]);

      t.end();
    });

    t.test('when calling a function that does not modify the out variable', t => {
      result = vec2.forEach(vecArray, 0, 0, 0, function (out, vec) { });

      t.deepEqual(vecArray, [
        1, 2,
        3, 4,
        0, 0,
      ]);
      t.equal(result, vecArray);

      t.end();
    });

    t.end();
  });

  t.test('str', t => {
    result = vec2.str(vecA);

    t.equal(result, 'vec2(1, 2)');
    t.end();
  });

  t.test('array', t => {
    result = vec2.array(vecA);

    t.deepEqual(result, new Float32Array([1, 2]));

    t.end();
  });

  t.test('exactEquals', t => {
    vec2.set(vecA, 0, 1);
    vec2.set(vecB, 0, 1);
    let vecC = vec2.new(0, 1);

    let r0 = vec2.exactEquals(vecA, vecB);
    let r1 = vec2.exactEquals(vecA, vecC);

    t.equal(r0, true);
    t.equal(r1, true);
    t.equal_v2(vecA, [0, 1]);
    t.equal_v2(vecB, [0, 1]);

    t.end();
  });

  t.test('equals', t => {
    vec2.set(vecA, 0, 1);
    vec2.set(vecB, 0, 1);
    let vecC = vec2.new(1, 2);
    let vecD = vec2.new(1e-16, 1);
    let r0 = vec2.equals(vecA, vecB);
    let r1 = vec2.equals(vecA, vecC);
    let r2 = vec2.equals(vecA, vecD);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal(r2, true);
    t.equal_v2(vecA, [0, 1]);
    t.equal_v2(vecB, [0, 1]);

    t.end();
  });

  t.end();
});