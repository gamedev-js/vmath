const tap = require('./tap');
const { vec2, mat23 } = require('../dist/vmath');

tap.test('mat23', t => {
  let out = mat23.create();
  let matA = mat23.create();
  let matB = mat23.create();
  let identity = mat23.create();
  let result = mat23.create();
  let oldA = mat23.create();
  let oldB = mat23.create();

  t.beforeEach(done => {
    matA = mat23.new(
      1, 2,
      3, 4,
      5, 6
    );

    oldA = mat23.new(
      1, 2,
      3, 4,
      5, 6
    );

    matB = mat23.new(
      7, 8,
      9, 10,
      11, 12
    );

    oldB = mat23.new(
      7, 8,
      9, 10,
      11, 12
    );

    out = mat23.new(
      0, 0,
      0, 0,
      0, 0
    );

    identity = mat23.new(
      1, 0,
      0, 1,
      0, 0
    );

    done();
  });

  t.test('create', t => {
    result = mat23.create();

    t.deepEqual(result, identity);

    t.end();
  });

  t.test('clone', t => {
    result = mat23.clone(matA);

    t.deepEqual(result, matA);

    t.end();
  });

  t.test('copy', t => {
    result = mat23.copy(out, matA);

    t.deepEqual(out, matA);
    t.equal(result, out);

    t.end();
  });

  t.test('identity', t => {
    result = mat23.identity(out);

    t.deepEqual(result, identity);
    t.equal(result, out);

    t.end();
  });

  t.test('invert', t => {
    t.test('with a separate output matrix', t => {
      result = mat23.invert(out, matA);

      t.equal_m23(out, [-2, 1, 1.5, -0.5, 1, -2]);
      t.equal(result, out);
      t.deepEqual(matA, oldA);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat23.invert(matA, matA);

      t.equal_m23(matA, [-2, 1, 1.5, -0.5, 1, -2]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('determinant', t => {
    result = mat23.determinant(matA);

    t.equal(result, -2);

    t.end();
  });

  t.test('multiply', t => {
    t.equal(mat23.mul, mat23.multiply);

    t.test('with a separate output matrix', t => {
      result = mat23.multiply(out, matA, matB);

      t.equal_m23(out, [31, 46, 39, 58, 52, 76]);
      t.equal(result, out);
      t.deepEqual(matA, oldA);
      t.deepEqual(matB, oldB);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat23.multiply(matA, matA, matB);

      t.equal_m23(matA, [31, 46, 39, 58, 52, 76]);
      t.equal(result, matA);
      t.deepEqual(matB, oldB);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat23.multiply(matB, matA, matB);

      t.equal_m23(matB, [31, 46, 39, 58, 52, 76]);
      t.equal(result, matB);
      t.deepEqual(matA, oldA);

      t.end();
    });

    t.end();
  });

  t.test('rotate', t => {
    t.test('with a separate output matrix', t => {
      result = mat23.rotate(out, matA, Math.PI * 0.5);

      t.equal_m23(out, [3, 4, -1, -2, 5, 6]);
      t.equal(result, out);
      t.deepEqual(matA, oldA);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat23.rotate(matA, matA, Math.PI * 0.5);

      t.equal_m23(matA, [3, 4, -1, -2, 5, 6]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('scale', t => {
    let vecA = vec2.create();
    t.beforeEach(done => {
      vec2.set(vecA, 2, 3);
      done();
    });

    t.test('with a separate output matrix', t => {
      result = mat23.scale(out, matA, vecA);

      t.equal_m23(out, [2, 4, 9, 12, 5, 6]);
      t.equal(result, out);
      t.deepEqual(matA, oldA);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat23.scale(matA, matA, vecA);

      t.equal_m23(matA, [2, 4, 9, 12, 5, 6]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('translate', t => {
    let vecA = vec2.create();
    t.beforeEach(done => {
      vec2.set(vecA, 2, 3);
      done();
    });

    t.test('with a separate output matrix', t => {
      result = mat23.translate(out, matA, vecA);

      t.equal_m23(out, [1, 2, 3, 4, 16, 22]);
      t.equal(result, out);
      t.deepEqual(matA, oldA);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat23.translate(matA, matA, vecA);

      t.equal_m23(matA, [1, 2, 3, 4, 16, 22]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('str', t => {
    result = mat23.str(matA);

    t.equal(result, 'mat23(1, 2, 3, 4, 5, 6)');

    t.end();
  });

  t.test('frob', t => {
    result = mat23.frob(matA);

    t.equal(result, Math.sqrt(Math.pow(1, 2) + Math.pow(2, 2) + Math.pow(3, 2) + Math.pow(4, 2) + Math.pow(5, 2) + Math.pow(6, 2) + 1));

    t.end();
  });

  t.test('add', t => {
    t.test('with a separate output matrix', t => {
      result = mat23.add(out, matA, matB);

      t.equal_m23(out, [8, 10, 12, 14, 16, 18]);
      t.equal(result, out);
      t.deepEqual(matA, oldA);
      t.deepEqual(matB, oldB);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat23.add(matA, matA, matB);

      t.equal_m23(matA, [8, 10, 12, 14, 16, 18]);
      t.equal(result, matA);
      t.deepEqual(matB, oldB);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat23.add(matB, matA, matB);

      t.equal_m23(matB, [8, 10, 12, 14, 16, 18]);
      t.equal(result, matB);
      t.deepEqual(matA, oldA);

      t.end();
    });

    t.end();
  });

  t.test('subtract', t => {
    t.equal(mat23.sub, mat23.subtract);

    t.test('with a separate output matrix', t => {
      result = mat23.subtract(out, matA, matB);

      t.equal_m23(out, [-6, -6, -6, -6, -6, -6]);
      t.equal(result, out);
      t.deepEqual(matA, oldA);
      t.deepEqual(matB, oldB);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat23.subtract(matA, matA, matB);

      t.equal_m23(matA, [-6, -6, -6, -6, -6, -6]);
      t.equal(result, matA);
      t.deepEqual(matB, oldB);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat23.subtract(matB, matA, matB);

      t.equal_m23(matB, [-6, -6, -6, -6, -6, -6]);
      t.equal(result, matB);
      t.deepEqual(matA, oldA);

      t.end();
    });

    t.end();
  });

  t.test('new', t => {
    result = mat23.new(1, 2, 3, 4, 5, 6);

    t.equal_m23(result, [1, 2, 3, 4, 5, 6]);

    t.end();
  });

  t.test('set', t => {
    result = mat23.set(out, 1, 2, 3, 4, 5, 6);

    t.equal_m23(out, [1, 2, 3, 4, 5, 6]);
    t.equal(result, out);

    t.end();
  });

  t.test('multiplyScalar', t => {
    t.test('with a separate output matrix', t => {
      result = mat23.multiplyScalar(out, matA, 2);

      t.equal_m23(out, [2, 4, 6, 8, 10, 12]);
      t.equal(result, out);
      t.equal_m23(matA, [1, 2, 3, 4, 5, 6]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat23.multiplyScalar(matA, matA, 2);

      t.equal_m23(matA, [2, 4, 6, 8, 10, 12]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('multiplyScalarAndAdd', t => {
    t.test('with a separate output matrix', t => {
      result = mat23.multiplyScalarAndAdd(out, matA, matB, 0.5);

      t.equal_m23(out, [4.5, 6, 7.5, 9, 10.5, 12]);
      t.equal(result, out);
      t.equal_m23(matA, [1, 2, 3, 4, 5, 6]);
      t.equal_m23(matB, [7, 8, 9, 10, 11, 12]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat23.multiplyScalarAndAdd(matA, matA, matB, 0.5);

      t.equal_m23(matA, [4.5, 6, 7.5, 9, 10.5, 12]);
      t.equal(result, matA);
      t.equal_m23(matB, [7, 8, 9, 10, 11, 12]);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat23.multiplyScalarAndAdd(matB, matA, matB, 0.5);

      t.equal_m23(matB, [4.5, 6, 7.5, 9, 10.5, 12]);
      t.equal(result, matB);
      t.equal_m23(matA, [1, 2, 3, 4, 5, 6]);

      t.end();
    });

    t.end();
  });

  t.test('exactEquals', t => {
    mat23.set(matA, 0, 1, 2, 3, 4, 5);
    mat23.set(matB, 0, 1, 2, 3, 4, 5);
    let matC = mat23.new(1, 2, 3, 4, 5, 6);
    let r0 = mat23.exactEquals(matA, matB);
    let r1 = mat23.exactEquals(matA, matC);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal_m23(matA, [0, 1, 2, 3, 4, 5]);
    t.equal_m23(matB, [0, 1, 2, 3, 4, 5]);

    t.end();
  });

  t.test('equals', t => {
    mat23.set(matA, 0, 1, 2, 3, 4, 5);
    mat23.set(matB, 0, 1, 2, 3, 4, 5);
    let matC = mat23.new(1, 2, 3, 4, 5, 6);
    let matD = mat23.new(1e-16, 1, 2, 3, 4, 5);
    let r0 = mat23.equals(matA, matB);
    let r1 = mat23.equals(matA, matC);
    let r2 = mat23.equals(matA, matD);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal(r2, true);
    t.equal_m23(matA, [0, 1, 2, 3, 4, 5]);
    t.equal_m23(matB, [0, 1, 2, 3, 4, 5]);

    t.end();
  });

  t.end();
});
