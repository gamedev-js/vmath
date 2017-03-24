const tap = require('./tap');
const { vec2, mat2 } = require('../dist/vmath');

tap.test('mat2', t => {
  let out = mat2.create();
  let matA = mat2.create();
  let matB = mat2.create();
  let identity = mat2.create();
  let result = mat2.create();

  t.beforeEach(done => {
    out = mat2.new(0, 0, 0, 0);
    matA = mat2.new(1, 2, 3, 4);
    matB = mat2.new(5, 6, 7, 8);
    identity = mat2.new(1, 0, 0, 1);

    done();
  });

  t.test('create', t => {
    result = mat2.create();

    t.deepEqual(result, identity);

    t.end();
  });

  t.test('clone', t => {
    result = mat2.clone(matA);

    t.deepEqual(result, matA);

    t.end();
  });

  t.test('copy', t => {
    result = mat2.copy(out, matA);

    t.deepEqual(out, matA);
    t.equal(result, out);

    t.end();
  });

  t.test('identity', t => {
    result = mat2.identity(out);

    t.deepEqual(result, identity);
    t.equal(result, out);

    t.end();
  });

  t.test('transpose', t => {
    t.test('with a separate output matrix', t => {
      result = mat2.transpose(out, matA);

      t.equal_m2(out, [1, 3, 2, 4]);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat2.transpose(matA, matA);

      t.equal_m2(matA, [1, 3, 2, 4]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('invert', t => {
    t.test('with a separate output matrix', t => {
      result = mat2.invert(out, matA);

      t.equal_m2(out, [-2, 1, 1.5, -0.5]);
      t.equal(result, out);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat2.invert(matA, matA);

      t.equal_m2(matA, [-2, 1, 1.5, -0.5]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('adjoint', t => {
    t.test('with a separate output matrix', t => {
      result = mat2.adjoint(out, matA);

      t.equal_m2(out, [4, -2, -3, 1]);
      t.equal(result, out);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat2.adjoint(matA, matA);

      t.equal_m2(matA, [4, -2, -3, 1]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('determinant', t => {
    result = mat2.determinant(matA);

    t.equal(result, -2);

    t.end();
  });

  t.test('multiply', t => {
    t.equal(mat2.mul, mat2.multiply);

    t.test('with a separate output matrix', t => {
      result = mat2.multiply(out, matA, matB);

      t.equal_m2(out, [23, 34, 31, 46]);
      t.equal(result, out);
      t.equal_m2(matA, [1, 2, 3, 4]);
      t.equal_m2(matB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat2.multiply(matA, matA, matB);

      t.equal_m2(matA, [23, 34, 31, 46]);
      t.equal(result, matA);
      t.equal_m2(matB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat2.multiply(matB, matA, matB);

      t.equal_m2(matB, [23, 34, 31, 46]);
      t.equal(result, matB);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('rotate', t => {
    t.test('with a separate output matrix', t => {
      result = mat2.rotate(out, matA, Math.PI * 0.5);

      t.equal_m2(out, [3, 4, -1, -2]);
      t.equal(result, out);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat2.rotate(matA, matA, Math.PI * 0.5);

      t.equal_m2(matA, [3, 4, -1, -2]);
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
      result = mat2.scale(out, matA, vecA);

      t.equal_m2(out, [2, 4, 9, 12]);
      t.equal(result, out);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat2.scale(matA, matA, vecA);

      t.equal_m2(matA, [2, 4, 9, 12]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('str', t => {
    result = mat2.str(matA);

    t.equal(result, 'mat2(1, 2, 3, 4)');

    t.end();
  });

  t.test('array', t => {
    result = mat2.array([], matA);

    t.deepEqual(result, new Float32Array([1,2,3,4]));

    t.end();
  });

  t.test('frob', t => {
    result = mat2.frob(matA);

    t.equal(result, Math.sqrt(Math.pow(1, 2) + Math.pow(2, 2) + Math.pow(3, 2) + Math.pow(4, 2)));

    t.end();
  });

  t.test('LDU', t => {
    let L = mat2.create();
    let D = mat2.create();
    let U = mat2.create();
    mat2.LDU(L, D, U, mat2.new(4, 3, 6, 3));

    let L_result = mat2.create(); L_result.m02 = 1.5;
    let D_result = mat2.create();
    let U_result = mat2.create();
    U_result.m00 = 4; U_result.m01 = 3; U_result.m03 = -1.5;

    t.deepApprox(L, L_result);
    t.deepApprox(D, D_result);
    t.deepApprox(U, U_result);

    t.end();
  });

  t.test('add', t => {
    t.test('with a separate output matrix', t => {
      result = mat2.add(out, matA, matB);

      t.equal_m2(out, [6, 8, 10, 12]);
      t.equal(result, out);
      t.equal_m2(matA, [1, 2, 3, 4]);
      t.equal_m2(matB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat2.add(matA, matA, matB);

      t.equal_m2(matA, [6, 8, 10, 12]);
      t.equal(result, matA);
      t.equal_m2(matB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat2.add(matB, matA, matB);

      t.equal_m2(matB, [6, 8, 10, 12]);
      t.equal(result, matB);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('subtract', t => {
    t.equal(mat2.sub, mat2.subtract);

    t.test('with a separate output matrix', t => {
      result = mat2.subtract(out, matA, matB);

      t.equal_m2(out, [-4, -4, -4, -4]);
      t.equal(result, out);
      t.equal_m2(matA, [1, 2, 3, 4]);
      t.equal_m2(matB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat2.subtract(matA, matA, matB);

      t.equal_m2(matA, [-4, -4, -4, -4]);
      t.equal(result, matA);
      t.equal_m2(matB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat2.subtract(matB, matA, matB);

      t.equal_m2(matB, [-4, -4, -4, -4]);
      t.equal(result, matB);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('new', t => {
    result = mat2.new(1, 2, 3, 4);

    t.equal_m2(result, [1, 2, 3, 4]);

    t.end();
  });

  t.test('set', t => {
    result = mat2.set(out, 1, 2, 3, 4);

    t.equal(result, out);
    t.equal_m2(result, [1, 2, 3, 4]);

    t.end();
  });

  t.test('multiplyScalar', t => {
    t.test('with a separate output matrix', t => {
      result = mat2.multiplyScalar(out, matA, 2);

      t.equal_m2(out, [2, 4, 6, 8]);
      t.equal(result, out);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat2.multiplyScalar(matA, matA, 2);

      t.equal(result, matA);
      t.equal_m2(matA, [2, 4, 6, 8]);

      t.end();
    });

    t.end();
  });

  t.test('multiplyScalarAndAdd', t => {
    t.test('with a separate output matrix', t => {
      result = mat2.multiplyScalarAndAdd(out, matA, matB, 0.5);

      t.equal_m2(out, [3.5, 5, 6.5, 8]);
      t.equal(result, out);
      t.equal_m2(matA, [1, 2, 3, 4]);
      t.equal_m2(matB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat2.multiplyScalarAndAdd(matA, matA, matB, 0.5);

      t.equal_m2(matA, [3.5, 5, 6.5, 8]);
      t.equal(result, matA);
      t.equal_m2(matB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat2.multiplyScalarAndAdd(matB, matA, matB, 0.5);

      t.equal_m2(matB, [3.5, 5, 6.5, 8]);
      t.equal(result, matB);
      t.equal_m2(matA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('exactEquals', t => {
    mat2.set(matA, 0, 1, 2, 3);
    mat2.set(matB, 0, 1, 2, 3);
    let matC = mat2.new(1, 2, 3, 4);
    let r0 = mat2.exactEquals(matA, matB);
    let r1 = mat2.exactEquals(matA, matC);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal_m2(matA, [0, 1, 2, 3]);
    t.equal_m2(matB, [0, 1, 2, 3]);

    t.end();
  });

  t.test('equals', t => {
    mat2.set(matA, 0, 1, 2, 3);
    mat2.set(matB, 0, 1, 2, 3);
    let matC = mat2.new(1, 2, 3, 4);
    let matD = mat2.new(1e-16, 1, 2, 3);
    let r0 = mat2.equals(matA, matB);
    let r1 = mat2.equals(matA, matC);
    let r2 = mat2.equals(matA, matD);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal(r2, true);
    t.equal_m2(matA, [0, 1, 2, 3]);
    t.equal_m2(matB, [0, 1, 2, 3]);

    t.end();
  });

  t.end();
});
