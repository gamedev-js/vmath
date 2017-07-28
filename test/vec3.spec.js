const tap = require('./tap');
const {vec3, mat3, mat4} = require('../dist/vmath');

tap.test('vec3', t => {
  let out, vecA, vecB, result;

  t.beforeEach(done => {
    vecA = vec3.new(1, 2, 3);
    vecB = vec3.new(4, 5, 6);
    out = vec3.new(0, 0, 0);

    done();
  });

  t.test('rotateX', t => {
    t.test('rotation around world origin [0, 0, 0]', t => {
      vec3.set(vecA, 0, 1, 0);
      vec3.set(vecB, 0, 0, 0);
      result = vec3.rotateX(out, vecA, vecB, Math.PI);

      t.equal_v3(result, [0, -1, 0]);

      t.end();
    });

    t.test('rotation around an arbitrary origin', t => {
      vec3.set(vecA, 2, 7, 0);
      vec3.set(vecB, 2, 5, 0);
      result = vec3.rotateX(out, vecA, vecB, Math.PI);

      t.equal_v3(result, [2, 3, 0]);

      t.end();
    });

    t.end();
  });

  t.test('rotateY', t => {
    t.test('rotation around world origin [0, 0, 0]', t => {
      vec3.set(vecA, 1, 0, 0);
      vec3.set(vecB, 0, 0, 0);
      result = vec3.rotateY(out, vecA, vecB, Math.PI);

      t.equal_v3(result, [-1, 0, 0]);

      t.end();
    });

    t.test('rotation around an arbitrary origin', t => {
      vec3.set(vecA, -2, 3, 10);
      vec3.set(vecB, -4, 3, 10);
      result = vec3.rotateY(out, vecA, vecB, Math.PI);

      t.equal_v3(result, [-6, 3, 10]);

      t.end();
    });

    t.end();
  });

  t.test('rotateZ', t => {
    t.test('rotation around world origin [0, 0, 0]', t => {
      vec3.set(vecA, 0, 1, 0);
      vec3.set(vecB, 0, 0, 0);
      result = vec3.rotateZ(out, vecA, vecB, Math.PI);

      t.equal_v3(result, [0, -1, 0]);

      t.end();
    });

    t.test('rotation around an arbitrary origin', t => {
      vec3.set(vecA, 0, 6, -5);
      vec3.set(vecB, 0, 0, -5);
      result = vec3.rotateZ(out, vecA, vecB, Math.PI);

      t.equal_v3(result, [0, -6, -5]);

      t.end();
    });

    t.end();
  });

  t.test('transformMat4', t => {
    t.test('with an identity', t => {
      let matr = mat4.new(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      );
      result = vec3.transformMat4(out, vecA, matr);

      t.equal_v3(out, [1, 2, 3]);
      t.equal(result, out);

      t.end();
    });

    t.test('with a lookAt', t => {
      let matr = mat4.lookAt(
        mat4.create(),
        vec3.new(5, 6, 7),
        vec3.new(2, 6, 7),
        vec3.new(0, 1, 0)
      );
      result = vec3.transformMat4(out, vecA, matr);

      t.equal_v3(out, [4, -4, -4]);
      t.equal(out, result);

      t.end();
    });

    t.test('with a perspective matrix (#92)', t => {
      let matr = mat4.new(
        0.750, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, -1.02, -1,
        0, 0, -2.02, 0
      );
      result = vec3.transformMat4(mat4.create(), vec3.new(10, 20, 30), matr);

      t.equal_v3(result, [-0.25, -0.666666, 1.087333]);

      t.end();
    });

    t.end();
  });

  t.test('transformMat3', t => {
    t.test('with an identity', t => {
      let matr = mat3.new(
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      );
      result = vec3.transformMat3(out, vecA, matr);

      t.equal_v3(out, [1, 2, 3]);
      t.equal(result, out);

      t.end();
    });

    t.test('with 90deg about X', t => {
      result = vec3.transformMat3(out, vec3.new(0,1,0), mat3.new(1, 0, 0, 0, 0, 1, 0, -1, 0));

      t.equal_v3(out, [0, 0, 1]);

      t.end();
    });

    t.test('with 90deg about Y', t => {
      result = vec3.transformMat3(out, vec3.new(1, 0, 0), mat3.new(0, 0, -1, 0, 1, 0, 1, 0, 0));

      t.equal_v3(out, [0, 0, -1]);

      t.end();
    });

    t.test('with 90deg about Z', t => {
      result = vec3.transformMat3(out, vec3.new(1, 0, 0), mat3.new(0, 1, 0, -1, 0, 0, 0, 0, 1));

      t.equal_v3(out, [0, 1, 0]);

      t.end();
    });

    t.test('with a lookAt normal matrix', t => {
      let matr = mat4.lookAt(mat4.create(), vec3.new(5, 6, 7), vec3.new(2, 6, 7), vec3.new(0, 1, 0));
      let n = mat3.create();
      matr = mat3.transpose(n, mat3.invert(n, mat3.fromMat4(n, matr)));
      result = vec3.transformMat3(out, vec3.new(1, 0, 0), matr);

      t.equal_v3(out, [0, 0, 1]);
      t.equal(result, out);

      t.end();
    });

    t.end();
  });

  t.test('create', t => {
    result = vec3.create();

    t.equal_v3(result, [0, 0, 0]);

    t.end();
  });

  t.test('clone', t => {
    result = vec3.clone(vecA);

    t.deepEqual(result, vecA);

    t.end();
  });

  t.test('new', t => {
    result = vec3.new(1, 2, 3);

    t.equal_v3(result, [1, 2, 3]);

    t.end();
  });

  t.test('copy', t => {
    result = vec3.copy(out, vecA);

    t.equal_v3(out, [1, 2, 3]);
    t.equal(result, out);

    t.end();
  });

  t.test('set', t => {
    result = vec3.set(out, 1, 2, 3);

    t.equal_v3(out, [1, 2, 3]);
    t.equal(result, out);

    t.end();
  });

  t.test('add', t => {
    t.test('with a separate output vector', t => {
      result = vec3.add(out, vecA, vecB);

      t.equal_v3(out, [5, 7, 9]);
      t.equal(result, out);
      t.equal_v3(vecA, [1, 2, 3]);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.add(vecA, vecA, vecB);

      t.equal_v3(vecA, [5, 7, 9]);
      t.equal(result, vecA);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec3.add(vecB, vecA, vecB);

      t.equal_v3(vecB, [5, 7, 9]);
      t.equal(result, vecB);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });

  t.test('subtract', t => {
    t.equal(vec3.sub, vec3.subtract);

    t.test('with a separate output vector', t => {
      result = vec3.subtract(out, vecA, vecB);

      t.equal_v3(out, [-3, -3, -3]);
      t.equal(result, out);
      t.equal_v3(vecA, [1, 2, 3]);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.subtract(vecA, vecA, vecB);

      t.equal_v3(vecA, [-3, -3, -3]);
      t.equal(result, vecA);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec3.subtract(vecB, vecA, vecB);

      t.equal_v3(vecB, [-3, -3, -3]);
      t.equal(result, vecB);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });

  t.test('multiply', t => {
    t.equal(vec3.mul, vec3.multiply);

    t.test('with a separate output vector', t => {
      result = vec3.multiply(out, vecA, vecB);

      t.equal_v3(out, [4, 10, 18]);
      t.equal(result, out);
      t.equal_v3(vecA, [1, 2, 3]);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.multiply(vecA, vecA, vecB);

      t.equal_v3(vecA, [4, 10, 18]);
      t.equal(result, vecA);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec3.multiply(vecB, vecA, vecB);

      t.equal_v3(vecB, [4, 10, 18]);
      t.equal(result, vecB);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });

  t.test('divide', t => {
    t.equal(vec3.div, vec3.divide);

    t.test('with a separate output vector', t => {
      result = vec3.divide(out, vecA, vecB);

      t.equal_v3(out, [0.25, 0.4, 0.5]);
      t.equal(result, out);
      t.equal_v3(vecA, [1, 2, 3]);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.divide(vecA, vecA, vecB);

      t.equal_v3(vecA, [0.25, 0.4, 0.5]);
      t.equal(result, vecA);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec3.divide(vecB, vecA, vecB);

      t.equal_v3(vecB, [0.25, 0.4, 0.5]);
      t.equal(result, vecB);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });

  t.test('ceil', t => {
    t.beforeEach(done => {
      vec3.set(vecA, Math.E, Math.PI, Math.SQRT2);
      done();
    });

    t.test('with a separate output vector', t => {
      result = vec3.ceil(out, vecA);

      t.equal_v3(out, [3, 4, 2]);
      t.equal(result, out);
      t.equal_v3(vecA, [Math.E, Math.PI, Math.SQRT2]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.ceil(vecA, vecA);

      t.equal_v3(vecA, [3, 4, 2]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('floor', t => {
    t.beforeEach(done => {
      vec3.set(vecA, Math.E, Math.PI, Math.SQRT2);
      done();
    });

    t.test('with a separate output vector', t => {
      result = vec3.floor(out, vecA);

      t.equal_v3(out, [2, 3, 1]);
      t.equal(result, out);
      t.equal_v3(vecA, [Math.E, Math.PI, Math.SQRT2]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.floor(vecA, vecA);

      t.equal_v3(vecA, [2, 3, 1]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('min', t => {
    t.beforeEach(done => {
      vec3.set(vecA, 1, 3, 1);
      vec3.set(vecB, 3, 1, 3);

      done();
    });

    t.test('with a separate output vector', t => {
      result = vec3.min(out, vecA, vecB);

      t.equal_v3(out, [1, 1, 1]);
      t.equal(result, out);
      t.equal_v3(vecA, [1, 3, 1]);
      t.equal_v3(vecB, [3, 1, 3]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.min(vecA, vecA, vecB);

      t.equal_v3(vecA, [1, 1, 1]);
      t.equal(result, vecA);
      t.equal_v3(vecB, [3, 1, 3]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec3.min(vecB, vecA, vecB);

      t.equal_v3(vecB, [1, 1, 1]);
      t.equal(result, vecB);
      t.equal_v3(vecA, [1, 3, 1]);

      t.end();
    });

    t.end();
  });

  t.test('max', t => {
    t.beforeEach(done => {
      vec3.set(vecA, 1, 3, 1);
      vec3.set(vecB, 3, 1, 3);

      done();
    });

    t.test('with a separate output vector', t => {
      result = vec3.max(out, vecA, vecB);

      t.equal_v3(out, [3, 3, 3]);
      t.equal(result, out);
      t.equal_v3(vecA, [1, 3, 1]);
      t.equal_v3(vecB, [3, 1, 3]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.max(vecA, vecA, vecB);

      t.equal_v3(vecA, [3, 3, 3]);
      t.equal(result, vecA);
      t.equal_v3(vecB, [3, 1, 3]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec3.max(vecB, vecA, vecB);

      t.equal_v3(vecB, [3, 3, 3]);
      t.equal(result, vecB);
      t.equal_v3(vecA, [1, 3, 1]);

      t.end();
    });

    t.end();
  });

  t.test('round', t => {
    t.beforeEach(done => {
      vec3.set(vecA, Math.E, Math.PI, Math.SQRT2);
      done();
    });

    t.test('with a separate output vector', t => {
      result = vec3.round(out, vecA);

      t.equal_v3(out, [3, 3, 1]);
      t.equal(result, out);
      t.equal_v3(vecA, [Math.E, Math.PI, Math.SQRT2]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.round(vecA, vecA);

      t.equal_v3(vecA, [3, 3, 1]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('scale', t => {
    t.test('with a separate output vector', t => {
      result = vec3.scale(out, vecA, 2);

      t.equal_v3(out, [2, 4, 6]);
      t.equal(result, out);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.scale(vecA, vecA, 2);

      t.equal_v3(vecA, [2, 4, 6]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('scaleAndAdd', t => {
    t.test('with a separate output vector', t => {
      result = vec3.scaleAndAdd(out, vecA, vecB, 0.5);

      t.equal_v3(out, [3, 4.5, 6]);
      t.equal(result, out);
      t.equal_v3(vecA, [1, 2, 3]);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.scaleAndAdd(vecA, vecA, vecB, 0.5);

      t.equal_v3(vecA, [3, 4.5, 6]);
      t.equal(result, vecA);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec3.scaleAndAdd(vecB, vecA, vecB, 0.5);

      t.equal_v3(vecB, [3, 4.5, 6]);
      t.equal(result, vecB);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });

  t.test('distance', t => {
    t.equal(vec3.dist, vec3.distance);

    result = vec3.distance(vecA, vecB);

    t.approx(result, 5.196152);

    t.end();
  });

  t.test('squaredDistance', t => {
    t.equal(vec3.sqrDist, vec3.squaredDistance);

    result = vec3.squaredDistance(vecA, vecB);

    t.equal(result, 27);

    t.end();
  });

  t.test('length', t => {
    t.equal(vec3.len, vec3.length);

    result = vec3.length(vecA);

    t.approx(result, 3.741657);

    t.end();
  });

  t.test('squaredLength', t => {
    t.equal(vec3.sqrLen, vec3.squaredLength);

    result = vec3.squaredLength(vecA);

    t.equal(result, 14);

    t.end();
  });

  t.test('negate', t => {
    t.test('with a separate output vector', t => {
      result = vec3.negate(out, vecA);

      t.equal_v3(out, [-1, -2, -3]);
      t.equal(result, out);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.negate(vecA, vecA);

      t.equal_v3(vecA, [-1, -2, -3]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('inverse', t => {
    vec3.set(vecA, 0.1, 0.2, 0.3);
    vec3.inverse(out, vecA);

    t.equal_v3(out, [10, 5, 10 / 3]);

    t.end();
  });

  t.test('inverseSafe', t => {
    vec3.set(vecA, 0.1, 0.2, 0.3);
    vec3.set(vecB, 0.0000000001, -0.0000000001, 0.1);

    vec3.inverseSafe(out, vecA);
    t.equal_v3(out, [10, 5, 10 / 3]);

    vec3.inverseSafe(out, vecB);
    t.equal_v3(out, [0, 0, 10]);

    t.end();
  });

  t.test('normalize', t => {
    t.beforeEach(done => {
      vec3.set(vecA, 5, 0, 0);
      done();
    });

    t.test('with a separate output vector', t => {
      result = vec3.normalize(out, vecA);

      t.equal_v3(out, [1, 0, 0]);
      t.equal(result, out);
      t.equal_v3(vecA, [5, 0, 0]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.normalize(vecA, vecA);

      t.equal_v3(vecA, [1, 0, 0]);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('dot', t => {
    result = vec3.dot(vecA, vecB);

    t.equal(result, 32);
    t.equal_v3(vecA, [1, 2, 3]);
    t.equal_v3(vecB, [4, 5, 6]);

    t.end();
  });

  t.test('cross', t => {
    t.test('with a separate output vector', t => {
      result = vec3.cross(out, vecA, vecB);

      t.equal_v3(out, [-3, 6, -3]);
      t.equal(result, out);
      t.equal_v3(vecA, [1, 2, 3]);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.cross(vecA, vecA, vecB);

      t.equal_v3(vecA, [-3, 6, -3]);
      t.equal(result, vecA);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec3.cross(vecB, vecA, vecB);

      t.equal_v3(vecB, [-3, 6, -3]);
      t.equal(result, vecB);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });

  t.test('lerp', t => {
    t.test('with a separate output vector', t => {
      result = vec3.lerp(out, vecA, vecB, 0.5);

      t.equal_v3(out, [2.5, 3.5, 4.5]);
      t.equal(result, out);
      t.equal_v3(vecA, [1, 2, 3]);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec3.lerp(vecA, vecA, vecB, 0.5);

      t.equal_v3(vecA, [2.5, 3.5, 4.5]);
      t.equal(result, vecA);
      t.equal_v3(vecB, [4, 5, 6]);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec3.lerp(vecB, vecA, vecB, 0.5);

      t.equal_v3(vecB, [2.5, 3.5, 4.5]);
      t.equal(result, vecB);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });

  t.test('random', t => {
    t.test('with no scale', t => {
      result = vec3.random(out);

      t.approx(vec3.length(out), 1.0);
      t.equal(result, out);

      t.end();
    });

    t.test('with a scale', t => {
      result = vec3.random(out, 5.0);

      t.approx(vec3.length(out), 5.0);
      t.equal(result, out);

      t.end();
    });

    t.end();
  });

  t.test('forEach', t => {
    let vecArray;

    t.beforeEach(done => {
      vecArray = [
        1, 2, 3,
        4, 5, 6,
        0, 0, 0
      ];

      done();
    });

    t.test('when performing operations that take no extra arguments', t => {
      result = vec3.forEach(vecArray, 0, 0, 0, vec3.normalize);

      t.approxArray(vecArray, [
        0.267261, 0.534522, 0.801783,
        0.455842, 0.569802, 0.683763,
        0, 0, 0
      ]);
      t.equal(result, vecArray);

      t.end();
    });

    t.test('when performing operations that takes one extra arguments', t => {
      result = vec3.forEach(vecArray, 0, 0, 0, vec3.add, vecA);

      t.approxArray(vecArray, [
        2, 4, 6,
        5, 7, 9,
        1, 2, 3
      ]);
      t.equal(result, vecArray);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.test('when specifying an offset', t => {
      result = vec3.forEach(vecArray, 0, 3, 0, vec3.add, vecA);

      t.approxArray(vecArray, [
        1, 2, 3,
        5, 7, 9,
        1, 2, 3
      ]);
      t.equal(result, vecArray);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.test('when specifying a count', t => {
      result = vec3.forEach(vecArray, 0, 0, 2, vec3.add, vecA);

      t.approxArray(vecArray, [
        2, 4, 6,
        5, 7, 9,
        0, 0, 0
      ]);
      t.equal(result, vecArray);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.test('when specifying a stride', t => {
      result = vec3.forEach(vecArray, 6, 0, 0, vec3.add, vecA);

      t.approxArray(vecArray, [
        2, 4, 6,
        4, 5, 6,
        1, 2, 3
      ]);
      t.equal(result, vecArray);
      t.equal_v3(vecA, [1, 2, 3]);

      t.end();
    });

    t.test('when calling a function that does not modify the out letiable', t => {
      result = vec3.forEach(vecArray, 0, 0, 0, function (out, vec) { });

      t.approxArray(vecArray, [
        1, 2, 3,
        4, 5, 6,
        0, 0, 0
      ]);
      t.equal(result, vecArray);

      t.end();
    });

    t.end();
  });

  t.test('angle', t => {
    result = vec3.angle(vecA, vecB);

    t.approx(result, 0.225726);
    t.equal_v3(vecA, [1, 2, 3]);
    t.equal_v3(vecB, [4, 5, 6]);

    t.end();
  });

  t.test('str', t => {
    result = vec3.str(vecA);
    t.equal(result, 'vec3(1, 2, 3)');

    t.end();
  });

  t.test('array', t => {
    result = vec3.array([], vecA);

    t.deepEqual(result, new Float32Array([1, 2, 3]));

    t.end();
  });

  t.test('exactEquals', t => {
    let vecC, r0, r1;
    vec3.set(vecA, 0, 1, 2);
    vec3.set(vecB, 0, 1, 2);
    vecC = vec3.new(1, 2, 3);
    r0 = vec3.exactEquals(vecA, vecB);
    r1 = vec3.exactEquals(vecA, vecC);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal_v3(vecA, [0, 1, 2]);
    t.equal_v3(vecB, [0, 1, 2]);

    t.end();
  });

  t.test('equals', t => {
    let vecC, vecD, r0, r1, r2;
    vec3.set(vecA, 0, 1, 2);
    vec3.set(vecB, 0, 1, 2);
    vecC = vec3.new(1, 2, 3);
    vecD = vec3.new(1e-16, 1, 2);
    r0 = vec3.equals(vecA, vecB);
    r1 = vec3.equals(vecA, vecC);
    r2 = vec3.equals(vecA, vecD);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal(r2, true);
    t.equal_v3(vecA, [0, 1, 2]);
    t.equal_v3(vecB, [0, 1, 2]);

    t.end();
  });

  t.test('JSON.stringify', t => {
    t.equal(
      JSON.stringify({ vecA, vecB }),
      '{"vecA":[1,2,3],"vecB":[4,5,6]}'
    );

    t.end();
  });

  t.end();
});