const tap = require('./tap');
const { vec3, vec4, quat, mat3, mat4 } = require('../dist/vmath');

tap.test('mat4', t => {
  let out = mat4.create();
  let matA = mat4.create();
  let matB = mat4.create();
  let identity = mat4.create();
  let result = mat4.create();

  t.beforeEach(done => {
    matA = mat4.new(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      1, 2, 3, 1
    );

    matB = mat4.new(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      4, 5, 6, 1
    );

    out = mat4.new(
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    );

    identity = mat4.new(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );

    done();
  });

  t.test('create', t => {
    result = mat4.create();

    t.deepEqual(result, identity);

    t.end();
  });

  t.test('clone', t => {
    result = mat4.clone(matA);

    t.deepEqual(result, matA);

    t.end();
  });

  t.test('copy', t => {
    result = mat4.copy(out, matA);

    t.deepEqual(out, matA);
    t.equal(result, out);

    t.end();
  });

  t.test('identity', t => {
    result = mat4.identity(out);

    t.deepEqual(result, identity);
    t.equal(result, out);

    t.end();
  });

  t.test('transpose', t => {
    t.test('with a separate output matrix', t => {
      result = mat4.transpose(out, matA);

      t.equal_m4(out, [
        1, 0, 0, 1,
        0, 1, 0, 2,
        0, 0, 1, 3,
        0, 0, 0, 1
      ]);
      t.equal(result, out);
      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat4.transpose(matA, matA);

      t.equal_m4(matA, [
        1, 0, 0, 1,
        0, 1, 0, 2,
        0, 0, 1, 3,
        0, 0, 0, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('invert', t => {
    t.test('with a separate output matrix', t => {
      result = mat4.invert(out, matA);

      t.equal_m4(out, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -1, -2, -3, 1
      ]);
      t.equal(result, out);
      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat4.invert(matA, matA);

      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -1, -2, -3, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('adjoint', t => {
    t.test('with a separate output matrix', t => {
      result = mat4.adjoint(out, matA);

      t.equal_m4(out, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -1, -2, -3, 1
      ]);
      t.equal(result, out);
      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat4.adjoint(matA, matA);

      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -1, -2, -3, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('determinant', t => {
    result = mat4.determinant(matA);

    t.equal(result, 1);

    t.end();
  });

  t.test('multiply', t => {
    t.equal(mat4.mul, mat4.multiply);

    t.test('with a separate output matrix', t => {
      result = mat4.multiply(out, matA, matB);

      t.equal_m4(out, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        5, 7, 9, 1
      ]);
      t.equal(result, out);
      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);
      t.equal_m4(matB, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        4, 5, 6, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat4.multiply(matA, matA, matB);

      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        5, 7, 9, 1
      ]);
      t.equal(result, matA);
      t.equal_m4(matB, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        4, 5, 6, 1
      ]);

      t.end();
    });

    t.test('when matB is the output matrix', t => {
      result = mat4.multiply(matB, matA, matB);

      t.equal_m4(matB, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        5, 7, 9, 1
      ]);
      t.equal(result, matB);
      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);

      t.end();
    });

    t.end();
  });

  t.test('translate', t => {
    t.test('with a separate output matrix', t => {
      result = mat4.translate(out, matA, vec3.new(4, 5, 6));

      t.equal_m4(out, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        5, 7, 9, 1
      ]);
      t.equal(result, out);
      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat4.translate(matA, matA, vec3.new(4, 5, 6));

      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        5, 7, 9, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('scale', t => {
    t.test('with a separate output matrix', t => {
      result = mat4.scale(out, matA, vec3.new(4, 5, 6));

      t.equal_m4(out, [
        4, 0, 0, 0,
        0, 5, 0, 0,
        0, 0, 6, 0,
        1, 2, 3, 1
      ]);
      t.equal(result, out);
      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat4.scale(matA, matA, vec3.new(4, 5, 6));

      t.equal_m4(matA, [
        4, 0, 0, 0,
        0, 5, 0, 0,
        0, 0, 6, 0,
        1, 2, 3, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('rotate', t => {
    let rad = Math.PI * 0.5;
    let axis = vec3.new(1, 0, 0);

    t.test('with a separate output matrix', t => {
      result = mat4.rotate(out, matA, rad, axis);

      t.equal_m4(out, [
        1, 0, 0, 0,
        0, Math.cos(rad), Math.sin(rad), 0,
        0, -Math.sin(rad), Math.cos(rad), 0,
        1, 2, 3, 1
      ]);
      t.equal(result, out);
      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat4.rotate(matA, matA, rad, axis);

      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, Math.cos(rad), Math.sin(rad), 0,
        0, -Math.sin(rad), Math.cos(rad), 0,
        1, 2, 3, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('rotateX', t => {
    var rad = Math.PI * 0.5;

    t.test('with a separate output matrix', t => {
      result = mat4.rotateX(out, matA, rad);

      t.equal_m4(out, [
        1, 0, 0, 0,
        0, Math.cos(rad), Math.sin(rad), 0,
        0, -Math.sin(rad), Math.cos(rad), 0,
        1, 2, 3, 1
      ]);
      t.equal(result, out);
      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat4.rotateX(matA, matA, rad);

      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, Math.cos(rad), Math.sin(rad), 0,
        0, -Math.sin(rad), Math.cos(rad), 0,
        1, 2, 3, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('rotateY', t => {
    let rad = Math.PI * 0.5;

    t.test('with a separate output matrix', t => {
      result = mat4.rotateY(out, matA, rad);

      t.equal_m4(out, [
        Math.cos(rad), 0, -Math.sin(rad), 0,
        0, 1, 0, 0,
        Math.sin(rad), 0, Math.cos(rad), 0,
        1, 2, 3, 1
      ]);
      t.equal(result, out);
      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat4.rotateY(matA, matA, rad);

      t.equal_m4(matA, [
        Math.cos(rad), 0, -Math.sin(rad), 0,
        0, 1, 0, 0,
        Math.sin(rad), 0, Math.cos(rad), 0,
        1, 2, 3, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  t.test('rotateZ', t => {
    let rad = Math.PI * 0.5;

    t.test('with a separate output matrix', t => {
      result = mat4.rotateZ(out, matA, rad);

      t.equal_m4(out, [
        Math.cos(rad), Math.sin(rad), 0, 0,
        -Math.sin(rad), Math.cos(rad), 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);
      t.equal(result, out);
      t.equal_m4(matA, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);

      t.end();
    });

    t.test('when matA is the output matrix', t => {
      result = mat4.rotateZ(matA, matA, rad);

      t.equal_m4(matA, [
        Math.cos(rad), Math.sin(rad), 0, 0,
        -Math.sin(rad), Math.cos(rad), 0, 0,
        0, 0, 1, 0,
        1, 2, 3, 1
      ]);
      t.equal(result, matA);

      t.end();
    });

    t.end();
  });

  // TODO: fromRT

  t.test('getTranslation', t => {
    t.test('from the identity matrix', t => {
      result = vec3.new(1, 2, 3);
      out = vec3.new(1, 2, 3);
      result = mat4.getTranslation(out, identity);

      t.equal(result, out);
      t.equal_v3(result, [0, 0, 0]);

      t.end();
    });

    t.test('from a translation-only matrix', t => {
      result = vec3.new(1, 2, 3);
      out = vec3.new(1, 2, 3);
      result = mat4.getTranslation(out, matB);

      t.equal_v3(out, [4, 5, 6]);

      t.end();
    });

    t.test('from a translation and rotation matrix', t => {
      let q = quat.create();
      let v = vec3.new(5, 6, 7);
      q = quat.fromAxisAngle(q, [0.26726124, 0.534522474, 0.8017837], 0.55);
      mat4.fromRT(out, q, v);

      result = vec3.create();
      mat4.getTranslation(result, out);

      t.equal_v3(result, [5, 6, 7]);

      t.end();
    });

    t.end();
  });

  t.test('getScaling', t => {
    t.test('from the identity matrix', t => {
      result = mat4.getScaling(out, identity);

      t.equal(result, out);
      t.equal_v3(result, [1, 1, 1]);

      t.end();
    });

    t.test('from a scale-only matrix', t => {
      let v = vec3.new(4, 5, 6);
      result = vec3.new(1, 2, 3);
      out = vec3.new(1, 2, 3);
      mat4.fromScaling(matA, v);
      result = mat4.getScaling(out, matA);

      t.equal_v3(out, [4, 5, 6]);

      t.end();
    });

    t.test('from a translation and rotation matrix', t => {
      let q = quat.create();
      let v = vec3.new(5, 6, 7);
      q = quat.fromAxisAngle(q, vec3.new(1, 0, 0), 0.5);
      mat4.fromRT(out, q, v);

      result = vec3.new(1, 2, 3);
      mat4.getScaling(result, out);

      t.equal_v3(result, [1, 1, 1]);

      t.end();
    });

    t.test('from a translation, rotation and scale matrix', t => {
      let R = quat.create();
      let T = vec3.new(1, 2, 3);
      let S = vec3.new(5, 6, 7);
      R = quat.fromAxisAngle(R, vec3.new(0, 1, 0), 0.7);
      mat4.fromRTS(out, R, T, S);
      result = vec3.new(5, 6, 7);
      mat4.getScaling(result, out);

      t.equal_v3(result, [5, 6, 7]);

      t.end();
    });

    t.end();
  });

  t.test('getRotation', t => {
    t.test('from the identity matrix', t => {
      result = quat.new(1, 2, 3, 4);
      out = quat.new(1, 2, 3, 4);
      result = mat4.getRotation(out, identity);

      t.equal(result, out);

      let unitQuat = quat.create();
      quat.identity(unitQuat);
      t.deepEqual(result, unitQuat);

      t.end();
    });

    t.test('from a translation-only matrix', t => {
      result = quat.new(1, 2, 3, 4);
      out = quat.new(1, 2, 3, 4);
      result = mat4.getRotation(out, matB);

      let unitQuat = quat.create();
      quat.identity(unitQuat);
      t.deepEqual(result, unitQuat);

      t.end();
    });

    t.test('from a translation and rotation matrix', t => {
      let q = quat.create();
      let outVec = vec3.new(5, 6, 7);
      let testVec = vec3.new(1, 5, 2);
      let ang = 0.78972;

      vec3.normalize(testVec, testVec);
      q = quat.fromAxisAngle(q, testVec, ang);
      mat4.fromRT(out, q, outVec);

      result = quat.new(2, 3, 4, 6);
      mat4.getRotation(result, out);

      let outaxis = vec3.create();
      let outangle = quat.getAxisAngle(outaxis, result);

      t.deepApprox(outaxis, testVec);
      t.deepApprox(outangle, ang);

      t.end();
    });

    t.end();
  });

  t.test('frustum', t => {
    result = mat4.frustum(out, -1, 1, -1, 1, -1, 1);

    t.equal_m4(result, [
      -1, 0, 0, 0,
      0, -1, 0, 0,
      0, 0, 0, -1,
      0, 0, 1, 0
    ]);
    t.equal(result, out);

    t.end();
  });

  t.test('perspective', t => {
    let fovy = Math.PI * 0.5;
    result = mat4.perspective(out, fovy, 1, 0, 1);

    t.equal_m4(result, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, -1, -1,
      0, 0, 0, 0
    ]);
    t.equal(result, out);

    result = mat4.perspective(out, 45 * Math.PI / 180.0, 640 / 480, 0.1, 200);
    t.equal_m4(result, [
      1.81066, 0, 0, 0,
      0, 2.414213, 0, 0,
      0, 0, -1.001, -1,
      0, 0, -0.2001, 0
    ]);

    t.end();
  });

  t.test('ortho', t => {
    result = mat4.ortho(out, -1, 1, -1, 1, -1, 1);

    t.equal_m4(result, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, -1, 0,
      0, 0, 0, 1
    ]);
    t.equal(result, out);

    t.end();
  });

  t.test('lookAt', t => {
    let eye = vec3.new(0, 0, 1);
    let center = vec3.new(0, 0, -1);
    let up = vec3.new(0, 1, 0);
    let view = vec3.new(0, 0, 1);
    let right = vec3.new(1, 0, 0);

    t.test('looking down', t => {
      view = vec3.new(0, -1, 0);
      up = vec3.new(0, 0, -1);
      right = vec3.new(1, 0, 0);
      result = mat4.lookAt(out, vec3.new(0, 0, 0), view, up);

      t.equal(result, out);

      result = vec3.transformMat4(vec3.create(), view, out);
      t.equal_v3(result, [0, 0, -1]);

      result = vec3.transformMat4(vec3.create(), up, out);
      t.equal_v3(result, [0, 1, 0]);

      result = vec3.transformMat4(vec3.create(), right, out);
      t.equal_v3(result, [1, 0, 0]);

      t.end();
    });

    t.test('#74', t => {
      mat4.lookAt(out,
        vec3.new(0, 2, 0),
        vec3.new(0, 0.6, 0),
        vec3.new(0, 0, -1)
      );

      result = vec3.transformMat4(vec3.create(), vec3.new(0, 2, -1), out);
      t.equal_v3(result, [0, 1, 0]);

      result = vec3.transformMat4(vec3.create(), vec3.new(1, 2, 0), out);
      t.equal_v3(result, [1, 0, 0]);

      result = vec3.transformMat4(vec3.create(), vec3.new(0, 1, 0), out);
      t.equal_v3(result, [0, 0, -1]);

      t.end();
    });

    eye = vec3.new(0, 0, 1);
    center = vec3.new(0, 0, -1);
    up = vec3.new(0, 1, 0);
    result = mat4.lookAt(out, eye, center, up);

    t.equal(result, out);
    t.equal_m4(result, [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, -1, 1
    ]);

    t.end();
  });

  t.test('str', t => {
    result = mat4.str(matA);

    t.equal(result, 'mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1)');

    t.end();
  });

  t.test('array', t => {
    result = mat4.array([], matA);

    t.deepEqual(result, new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1]));

    t.end();
  });

  t.test('frob', t => {
    result = mat4.frob(matA);

    t.equal(result, Math.sqrt(Math.pow(1, 2) + Math.pow(1, 2) + Math.pow(1, 2) + Math.pow(1, 2) + Math.pow(1, 2) + Math.pow(2, 2) + Math.pow(3, 2)));

    t.end();
  });

  t.test('JSON.stringify', t => {
    t.equal(
      JSON.stringify({ matA, matB }),
      '{"matA":[1,0,0,0,0,1,0,0,0,0,1,0,1,2,3,1],"matB":[1,0,0,0,0,1,0,0,0,0,1,0,4,5,6,1]}'
    );

    t.end();
  });

  t.end();
});
