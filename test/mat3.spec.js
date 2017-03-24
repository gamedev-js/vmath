const tap = require('./tap');
const { vec2, vec3, quat, mat3, mat4 } = require('../dist/vmath');

tap.test('mat3', t => {
  let out = mat3.create();
  let matA = mat3.create();
  let matB = mat3.create();
  let identity = mat3.create();
  let result = mat3.create();

  t.beforeEach(done => {
    matA = mat3.new(
      1, 0, 0,
      0, 1, 0,
      1, 2, 1
    );

    matB = mat3.new(
      1, 0, 0,
      0, 1, 0,
      3, 4, 1
    );

    out = mat3.new(
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    );

    identity = mat3.new(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    );

    done();
  });

  t.test('normalFromMat4', t => {
    matA = mat4.new(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
    result = mat3.normalFromMat4(out, matA);

    t.equal(result, out);

    mat4.translate(matA, matA, vec3.new(2, 4, 6));
    mat4.rotateX(matA, matA, Math.PI / 2);
    result = mat3.normalFromMat4(out, matA);

    t.equal_m3(result, [
      1, 0, 0,
      0, 0, 1,
      0,-1, 0
    ]);

    mat4.scale(matA, matA, vec3.new(2, 3, 4));
    result = mat3.normalFromMat4(out, matA);

    t.equal_m3(result, [
      0.5, 0,    0,
      0,   0,    0.333333,
      0,  -0.25, 0
    ]);

    t.end();
  });

  t.test('fromQuat', t => {
    let q = quat.new(0, -0.7071067811865475, 0, 0.7071067811865475);
    result = mat3.fromQuat(out, q);

    t.equal(result, out);
    t.deepApprox(
      vec3.transformMat3(vec3.create(), vec3.new(0, 0, -1), out),
      vec3.transformQuat(vec3.create(), vec3.new(0, 0, -1), q)
    );
    t.equal_v3(
      vec3.transformMat3(vec3.create(), vec3.new(0, 0, -1), out),
      [1, 0, 0]
    );

    t.end();
  });

  t.test('fromMat4', t => {
    result = mat3.fromMat4(out, mat4.new(
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, 16
    ));

    t.equal(result, out);
    t.equal_m3(out, [
      1, 2, 3,
      5, 6, 7,
      9, 10, 11
    ]);

    t.end();
  });

  t.test('scale', t => {
    result = mat3.scale(out, matA, vec2.new(2, 2));

    t.equal(result, out);
    t.equal_m3(out, [
      2, 0, 0,
      0, 2, 0,
      1, 2, 1
    ]);

    t.end();
  });

  t.test('create', t => {
    result = mat3.create();

    t.deepEqual(result, identity);

    t.end();
  });

  t.test('clone', t => {
    result = mat3.clone(matA);

    t.deepEqual(result, matA);

    t.end();
  });

  t.test('copy', t => {
    result = mat3.copy(out, matA);

    t.deepEqual(out, matA);
    t.equal(result, out);

    t.end();
  });

  t.test('identity', t => {
    result = mat3.identity(out);

    t.deepEqual(result, identity);
    t.equal(result, out);

    t.end();
  });

  t.test('transpose', t => {
    t.test('with a separate output matrix', t => {
      result = mat3.transpose(out, matA);

      t.equal_m3(out, [
        1, 0, 1,
        0, 1, 2,
        0, 0, 1
      ]);
      t.equal(result, out);
      t.equal_m3(matA, [
        1, 0, 0,
        0, 1, 0,
        1, 2, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat3.transpose(matA, matA);

      t.equal_m3(matA, [
        1, 0, 1,
        0, 1, 2,
        0, 0, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('invert', t => {
    t.test('with a separate output matrix', t => {
      result = mat3.invert(out, matA);

      t.equal_m3(out, [
        1, 0, 0,
        0, 1, 0,
        -1, -2, 1
      ]);
      t.equal(result, out);
      t.equal_m3(matA, [
        1, 0, 0,
        0, 1, 0,
        1, 2, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat3.invert(matA, matA);

      t.equal_m3(matA, [
        1, 0, 0,
        0, 1, 0,
        -1, -2, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('adjoint', t => {
    t.test('with a separate output matrix', t => {
      result = mat3.adjoint(out, matA);

      t.equal_m3(out, [
        1, 0, 0,
        0, 1, 0,
        -1, -2, 1
      ]);
      t.equal(result, out);
      t.equal_m3(matA, [
        1, 0, 0,
        0, 1, 0,
        1, 2, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat3.adjoint(matA, matA);

      t.equal_m3(matA, [
        1, 0, 0,
        0, 1, 0,
        -1, -2, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('determinant', t => {
    result = mat3.determinant(matA);

    t.equal(result, 1);

    t.end();
  });

  t.test('multiply', t => {
    t.equal(mat3.mul, mat3.multiply);

    t.test('with a separate output matrix', t => {
      result = mat3.multiply(out, matA, matB);

      t.equal_m3(out, [
        1, 0, 0,
        0, 1, 0,
        4, 6, 1
      ]);
      t.equal(result, out);
      t.equal_m3(matA, [
        1, 0, 0,
        0, 1, 0,
        1, 2, 1
      ]);
      t.equal_m3(matB, [
        1, 0, 0,
        0, 1, 0,
        3, 4, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat3.multiply(matA, matA, matB);

      t.equal_m3(matA, [
        1, 0, 0,
        0, 1, 0,
        4, 6, 1
      ]);
      t.equal(result, matA);
      t.equal_m3(matB, [
        1, 0, 0,
        0, 1, 0,
        3, 4, 1
      ]);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat3.multiply(matB, matA, matB);

      t.equal_m3(matB, [
        1, 0, 0,
        0, 1, 0,
        4, 6, 1
      ]);
      t.equal_m3(matA, [
        1, 0, 0,
        0, 1, 0,
        1, 2, 1
      ]);

      t.end();
    });

    t.end();
  });

  t.test('str', t => {
    result = mat3.str(matA);

    t.equal(result, 'mat3(1, 0, 0, 0, 1, 0, 1, 2, 1)');

    t.end();
  });

  t.test('array', t => {
    result = mat3.array(matA);

    t.deepEqual(result, new Float32Array([1, 0, 0, 0, 1, 0, 1, 2, 1]));

    t.end();
  });

  t.test('frob', t => {
    result = mat3.frob(matA);

    t.equal(result, Math.sqrt(Math.pow(1, 2) + Math.pow(0, 2) + Math.pow(0, 2) + Math.pow(0, 2) + Math.pow(1, 2) + Math.pow(0, 2) + Math.pow(1, 2) + Math.pow(2, 2) + Math.pow(1, 2)));

    t.end();
  });

  t.test('add', t => {
    t.beforeEach(done => {
      mat3.set(matA, 1, 2, 3, 4, 5, 6, 7, 8, 9);
      mat3.set(matB, 10, 11, 12, 13, 14, 15, 16, 17, 18);

      done();
    });

    t.test('with a separate output matrix', t => {
      result = mat3.add(out, matA, matB);

      t.equal_m3(out, [11, 13, 15, 17, 19, 21, 23, 25, 27]);
      t.equal(result, out);
      t.equal_m3(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      t.equal_m3(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat3.add(matA, matA, matB);

      t.equal_m3(matA, [11, 13, 15, 17, 19, 21, 23, 25, 27]);
      t.equal(result, matA);
      t.equal_m3(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat3.add(matB, matA, matB);

      t.equal_m3(matB, [11, 13, 15, 17, 19, 21, 23, 25, 27]);
      t.equal(result, matB);
      t.equal_m3(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

      t.end();
    });

    t.end();
  });

  t.test('subtract', t => {
    t.beforeEach(done => {
      mat3.set(matA, 1, 2, 3, 4, 5, 6, 7, 8, 9);
      mat3.set(matB, 10, 11, 12, 13, 14, 15, 16, 17, 18);

      done();
    });

    t.equal(mat3.sub, mat3.subtract);

    t.test('with a separate output matrix', t => {
      result = mat3.subtract(out, matA, matB);

      t.equal_m3(out, [-9, -9, -9, -9, -9, -9, -9, -9, -9]);
      t.equal(result, out);
      t.equal_m3(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      t.equal_m3(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat3.subtract(matA, matA, matB);

      t.equal_m3(matA, [-9, -9, -9, -9, -9, -9, -9, -9, -9]);
      t.equal(result, matA);
      t.equal_m3(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat3.subtract(matB, matA, matB);

      t.equal_m3(matB, [-9, -9, -9, -9, -9, -9, -9, -9, -9]);
      t.equal(result, matB);
      t.equal_m3(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

      t.end();
    });

    t.end();
  });

  t.test('new', t => {
    result = mat3.new(1, 2, 3, 4, 5, 6, 7, 8, 9);

    t.equal_m3(result, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

    t.end();
  });

  t.test('set', t => {
    result = mat3.set(out, 1, 2, 3, 4, 5, 6, 7, 8, 9);

    t.equal_m3(out, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    t.equal(result, out);

    t.end();
  });

  t.test('multiplyScalar', t => {
    t.beforeEach(done => {
      mat3.set(matA, 1, 2, 3, 4, 5, 6, 7, 8, 9);

      done();
    });

    t.test('with a separate output matrix', t => {
      result = mat3.multiplyScalar(out, matA, 2);

      t.equal_m3(out, [2, 4, 6, 8, 10, 12, 14, 16, 18]);
      t.equal(result, out);
      t.equal_m3(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat3.multiplyScalar(matA, matA, 2);

      t.equal_m3(matA, [2, 4, 6, 8, 10, 12, 14, 16, 18]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('multiplyScalarAndAdd', t => {
    t.beforeEach(done => {
      mat3.set(matA, 1, 2, 3, 4, 5, 6, 7, 8, 9);
      mat3.set(matB, 10, 11, 12, 13, 14, 15, 16, 17, 18);

      done();
    });

    t.test('with a separate output matrix', t => {
      result = mat3.multiplyScalarAndAdd(out, matA, matB, 0.5);

      t.equal_m3(out, [6, 7.5, 9, 10.5, 12, 13.5, 15, 16.5, 18]);
      t.equal(result, out);
      t.equal_m3(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      t.equal_m3(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat3.multiplyScalarAndAdd(matA, matA, matB, 0.5);

      t.equal_m3(matA, [6, 7.5, 9, 10.5, 12, 13.5, 15, 16.5, 18]);
      t.equal(result, matA);
      t.equal_m3(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat3.multiplyScalarAndAdd(matB, matA, matB, 0.5);

      t.equal_m3(matB, [6, 7.5, 9, 10.5, 12, 13.5, 15, 16.5, 18]);
      t.equal(result, matB);
      t.equal_m3(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

      t.end();
    });

    t.end();
  });

  t.test('exactEquals', t => {
    mat3.set(matA, 0, 1, 2, 3, 4, 5, 6, 7, 8);
    mat3.set(matB, 0, 1, 2, 3, 4, 5, 6, 7, 8);
    let matC = mat3.new(1, 2, 3, 4, 5, 6, 7, 8, 9);
    let r0 = mat3.exactEquals(matA, matB);
    let r1 = mat3.exactEquals(matA, matC);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal_m3(matA, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    t.equal_m3(matB, [0, 1, 2, 3, 4, 5, 6, 7, 8]);

    t.end();
  });

  t.test('equals', t => {
    mat3.set(matA, 0, 1, 2, 3, 4, 5, 6, 7, 8);
    mat3.set(matB, 0, 1, 2, 3, 4, 5, 6, 7, 8);
    let matC = mat3.new(1, 2, 3, 4, 5, 6, 7, 8, 9);
    let matD = mat3.new(1e-16, 1, 2, 3, 4, 5, 6, 7, 8);
    let r0 = mat3.equals(matA, matB);
    let r1 = mat3.equals(matA, matC);
    let r2 = mat3.equals(matA, matD);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal(r2, true);
    t.equal_m3(matA, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    t.equal_m3(matB, [0, 1, 2, 3, 4, 5, 6, 7, 8]);

    t.end();
  });

  t.end();
});
