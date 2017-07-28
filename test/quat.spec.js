const tap = require('./tap');
const { vec3, quat, mat3, mat4, toRadian } = require('../dist/vmath');

tap.test('quat', t => {
  let out = quat.create();
  let quatA = quat.create();
  let quatB = quat.create();
  let result = quat.create();
  let id = quat.create();
  let vec = vec3.create();
  let deg90 = Math.PI / 2;
  let deg45 = Math.PI / 4;
  let deg30 = Math.PI / 6;

  t.beforeEach(done => {
    quatA = quat.new(1, 2, 3, 4);
    quatB = quat.new(5, 6, 7, 8);
    out = quat.new(0, 0, 0, 0);
    id = quat.new(0, 0, 0, 1);
    vec = vec3.new(1, 1, -1);
    deg90 = Math.PI / 2;

    done();
  });

  t.test('slerp', t => {
    t.test('the normal case', t => {
      result = quat.slerp(out, quat.new(0, 0, 0, 1), quat.new(0, 1, 0, 0), 0.5);

      t.equal(result, out);
      t.equal_v4(result, [0, 0.707106, 0, 0.707106]);

      t.end();
    });

    t.test('where a == b', t => {
      result = quat.slerp(out, quat.new(0, 0, 0, 1), quat.new(0, 0, 0, 1), 0.5);

      t.equal(result, out);
      t.equal_v4(result, [0, 0, 0, 1]);

      t.end();
    });

    t.test('where theta == 180deg', t => {
      quat.rotateX(quatA, quat.new(1, 0, 0, 0), Math.PI); // 180 deg
      result = quat.slerp(out, quat.new(1, 0, 0, 0), quatA, 1);

      t.equal_v4(result, [0, 0, 0, -1]);

      t.end();
    });

    t.test('where a == -b', t => {
      result = quat.slerp(out, quat.new(1, 0, 0, 0), quat.new(-1, 0, 0, 0), 0.5);

      t.equal(result, out);
      t.equal_v4(result, [1, 0, 0, 0]);

      t.end();
    });

    t.end();
  });

  t.test('rotateX', t => {
    result = quat.rotateX(out, id, deg90);

    t.equal(result, out);
    vec3.transformQuat(vec, vec3.new(0, 0, -1), out);
    t.equal_v3(vec, [0, 1, 0]);

    t.end();
  });

  t.test('rotateY', t => {
    result = quat.rotateY(out, id, deg90);

    t.equal(result, out);
    vec3.transformQuat(vec, vec3.new(0, 0, -1), out);
    t.equal_v3(vec, [-1, 0, 0]);

    t.end();
  });

  t.test('rotateZ', t => {
    result = quat.rotateZ(out, id, deg90);

    t.equal(result, out);
    vec3.transformQuat(vec, vec3.new(0, 1, 0), out);
    t.equal_v3(vec, [-1, 0, 0]);

    t.end();
  });

  t.test('rotateAround', t => {
    let rotx = quat.create();
    let roty = quat.create();

    quat.rotateX(rotx, id, deg30);
    quat.rotateY(roty, id, deg45);
    quat.mul(quatA, roty, rotx);
    quat.rotateAround(quatA, quatA, vec3.new(0,1,0), -deg90);

    quat.rotateX(rotx, id, deg30);
    quat.rotateY(roty, id, -deg45);
    quat.mul(quatB, roty, rotx);

    let r0 = quat.equals(quatA, quatB);
    t.equal(r0, true);

    t.end();
  });

  t.test('rotateAroundLocal', t => {
    let rotx = quat.create();

    quat.rotateX(rotx, id, deg30);
    quat.rotateY(quatA, rotx, deg45);

    quat.rotateX(rotx, id, deg30);
    quat.rotateAroundLocal(quatB, rotx, vec3.new(0,1,0), deg45);

    let r0 = quat.equals(quatA, quatB);
    t.equal(r0, true);

    t.end();
  });

  t.test('fromMat3', t => {
    t.test('legacy', t => {
      let matr = mat3.new(
        1, 0, 0,
        0, 0, -1,
        0, 1, 0
      );
      result = quat.fromMat3(out, matr);

      t.equal_v4(result, [-0.707106, 0, 0, 0.707106]);

      t.end();
    });

    t.test('where trace > 0', t => {
      let matr = mat3.new(
        1, 0, 0,
        0, 0, -1,
        0, 1, 0
      );
      result = quat.fromMat3(out, matr);

      t.equal(result, out);
      result = vec3.transformQuat(vec3.create(), vec3.new(0, 1, 0), out);

      t.equal_v3(result, [0, 0, -1]);

      t.end();
    });

    t.test('from a normal matrix looking "backward"', t => {
      let matr = mat3.create();
      mat3.transpose(matr,
        mat3.invert(matr,
          mat3.fromMat4(matr,
            mat4.lookAt(
              mat4.create(),
              vec3.new(0, 0, 0),
              vec3.new(0, 0, 1),
              vec3.new(0, 1, 0)
            )
          )
        )
      );
      result = quat.fromMat3(out, matr);

      t.equal(result, out);
      t.deepApprox(
        vec3.transformQuat(vec3.create(), vec3.new(3, 2, -1), quat.normalize(out, out)),
        vec3.transformMat3(vec3.create(), vec3.new(3, 2, -1), matr)
      );

      t.end();
    });

    t.test('from a normal matrix looking "left" and "upside down"', t => {
      let matr = mat3.create();
      mat3.transpose(matr,
        mat3.invert(matr,
          mat3.fromMat4(matr,
            mat4.lookAt(
              mat4.create(),
              vec3.new(0, 0, 0),
              vec3.new(-1, 0, 0),
              vec3.new(0, -1, 0)
            )
          )
        )
      );
      result = quat.fromMat3(out, matr);

      t.equal(result, out);
      t.deepApprox(
        vec3.transformQuat(vec3.create(), vec3.new(3, 2, -1), quat.normalize(out, out)),
        vec3.transformMat3(vec3.create(), vec3.new(3, 2, -1), matr)
      );

      t.end();
    });

    t.test('from a normal matrix looking "upside down"', t => {
      let matr = mat3.create();
      mat3.transpose(matr,
        mat3.invert(matr,
          mat3.fromMat4(matr,
            mat4.lookAt(
              mat4.create(),
              vec3.new(0, 0, 0),
              vec3.new(0, 0, -1),
              vec3.new(0, -1, 0)
            )
          )
        )
      );
      result = quat.fromMat3(out, matr);

      t.equal(result, out);
      t.deepApprox(
        vec3.transformQuat(vec3.create(), vec3.new(3, 2, -1), quat.normalize(out, out)),
        vec3.transformMat3(vec3.create(), vec3.new(3, 2, -1), matr)
      );

      t.end();
    });

    t.end();
  });

  t.test('fromEuler', t => {
    t.test('legacy', t => {
      result = quat.fromEuler(out, -90, 0, 0);

      t.equal_v4(result, [-0.707106, 0, 0, 0.707106]);

      t.end();
    });

    t.test('where trace > 0', t => {
      result = quat.fromEuler(out, -90, 0, 0);

      t.equal(result, out);
      t.equal_v3(
        vec3.transformQuat(vec3.create(), vec3.new(0, 1, 0), out),
        [0, 0, -1]
      );

      t.end();
    });

    t.end();
  });

  t.test('fromAxes', t => {
    t.test('given opengl defaults', t => {
      let xAxis = vec3.new(1, 0, 0);
      let yAxis = vec3.new(0, 1, 0);
      let zAxis = vec3.new(0, 0, 1);
      result = quat.fromAxes(out, xAxis, yAxis, zAxis);

      t.equal(result, out);
      t.equal_v4(out, [0, 0, 0, 1]);

      t.end();
    });

    t.test('looking left', t => {
      let xAxis = vec3.new( 0, 0, 1);
      let yAxis = vec3.new( 0, 1, 0);
      let zAxis = vec3.new(-1, 0, 0);
      result = quat.fromAxes(out, xAxis, yAxis, zAxis);

      t.equal(result, out);
      t.equal_v4(out, [0, -0.707106, 0, 0.707106]);

      t.end();
    });

    t.test('legacy example', t => {
      let xAxis = vec3.new(1,  0,  0);
      let yAxis = vec3.new(0,  0,  1);
      let zAxis = vec3.new(0, -1,  0);
      result = quat.fromAxes(out, xAxis, yAxis, zAxis);

      t.equal(result, out);
      t.equal_v4(out, [0.707106, 0, 0, 0.707106]);

      t.end();
    });

    t.end();
  });

  t.test('fromViewUp', t => {
    let v = vec3.new(0.5, 0, 0.5);
    vec3.normalize(v,v);
    result = quat.fromViewUp(out, v);

    let q = quat.create();
    quat.rotateY(q, q, toRadian(45));

    t.assert(result !== null);
    t.equal(result, out);
    t.equal_v4(out, quat.array([], q));

    t.end();
  });

  t.test('rotationTo', t => {
    let r;
    t.beforeEach(done => {
      r = vec3.create();
      done();
    });

    t.test('at right angle', t => {
      result = quat.rotationTo(out, vec3.new(0, 1, 0), vec3.new(1, 0, 0));

      t.equal(result, out);
      t.equal_v4(out, [0, 0, -0.707106, 0.707106]);

      t.end();
    });

    t.test('when vectors are parallel', t => {
      result = quat.rotationTo(out, vec3.new(0, 1, 0), vec3.new(0, 1, 0));
      vec3.transformQuat(r, vec3.new(0, 1, 0), out);

      t.equal(result, out);
      t.equal_v3(r, [0, 1, 0]);

      t.end();
    });

    t.test('when vectors are opposed X', t => {
      result = quat.rotationTo(out, vec3.new(1, 0, 0), vec3.new(-1, 0, 0));
      vec3.transformQuat(r, vec3.new(1, 0, 0), out);

      t.equal(result, out);
      t.equal_v3(r, [-1, 0, 0]);

      t.end();
    });

    t.test('when vectors are opposed Y', t => {
      result = quat.rotationTo(out, vec3.new(0, 1, 0), vec3.new(0, -1, 0));
      vec3.transformQuat(r, vec3.new(0, 1, 0), out);

      t.equal(result, out);
      t.equal_v3(r, [0, -1, 0]);

      t.end();
    });

    t.test('when vectors are opposed Z', t => {
      result = quat.rotationTo(out, vec3.new(0, 0, 1), vec3.new(0, 0, -1));
      vec3.transformQuat(r, vec3.new(0, 0, 1), out);

      t.equal(result, out);
      t.equal_v3(r, [0, 0, -1]);

      t.end();
    });

    t.end();
  });

  t.test('create', t => {
    result = quat.create();

    t.equal_v4(result, [0, 0, 0, 1]);

    t.end();
  });

  t.test('clone', t => {
    result = quat.clone(quatA);

    t.deepEqual(result, quatA);

    t.end();
  });

  t.test('new', t => {
    result = quat.new(1, 2, 3, 4);

    t.equal_v4(result, [1, 2, 3, 4]);

    t.end();
  });

  t.test('copy', t => {
    result = quat.copy(out, quatA);

    t.equal(result, out);
    t.equal_v4(result, [1, 2, 3, 4]);

    t.end();
  });

  t.test('set', t => {
    result = quat.set(out, 1, 2, 3, 4);

    t.equal(result, out);
    t.equal_v4(out, [1, 2, 3, 4]);

    t.end();
  });

  t.test('identity', t => {
    result = quat.identity(out);

    t.equal(result, out);
    t.equal_v4(result, [0, 0, 0, 1]);

    t.end();
  });

  t.test('fromAxisAngle', t => {
    result = quat.fromAxisAngle(out, vec3.new(1, 0, 0), Math.PI * 0.5);

    t.equal(result, out);
    t.equal_v4(result, [0.707106, 0, 0, 0.707106]);

    t.end();
  });

  t.test('getAxisAngle', t => {
    t.test('for a quaternion representing no rotation', t => {
      result = quat.fromAxisAngle(out, vec3.new(0, 1, 0), 0.0);
      deg90 = quat.getAxisAngle(vec, out);

      t.equal(deg90 % (Math.PI * 2.0), 0.0);

      t.end();
    });

    t.test('for a simple rotation about X axis', t => {
      result = quat.fromAxisAngle(out, vec3.new(1, 0, 0), 0.7778);
      deg90 = quat.getAxisAngle(vec, out);

      t.equal(deg90, 0.7778);
      t.equal_v3(vec, [1, 0, 0]);

      t.end();
    });

    t.test('for a simple rotation about Y axis', t => {
      result = quat.fromAxisAngle(out, vec3.new(0, 1, 0), 0.879546);
      deg90 = quat.getAxisAngle(vec, out);

      t.approx(deg90, 0.879546);
      t.equal_v3(vec, [0, 1, 0]);

      t.end();
    });

    t.test('for a simple rotation about Z axis', t => {
      result = quat.fromAxisAngle(out, vec3.new(0, 0, 1), 0.123456);
      deg90 = quat.getAxisAngle(vec, out);

      t.approx(deg90, 0.123456);
      t.equal_v3(vec, [0, 0, 1]);

      t.end();
    });

    t.test('for a slightly irregular axis and right angle', t => {
      result = quat.fromAxisAngle(out, vec3.new(0.707106, 0, 0.707106), Math.PI * 0.5);
      deg90 = quat.getAxisAngle(vec, out);

      t.equal_v3(vec, [0.707106, 0, 0.707106]);
      t.equal(deg90, Math.PI * 0.5);

      t.end();
    });

    t.test('for a very irregular axis and negative input angle', t => {
      quatA = quat.fromAxisAngle(quatA, quat.new(0.65538555, 0.49153915, 0.57346237), 8.8888);
      deg90 = quat.getAxisAngle(vec, quatA);
      quatB = quat.fromAxisAngle(quatB, vec, deg90);

      t.assert(deg90 > 0.0 && deg90 < Math.PI * 2.0);
      t.deepEqual(quatA, quatB);

      t.end();
    });

    t.end();
  });

  // t.test('add', t => {
  //   t.test('with a separate output quaternion', t => {
  //     result = quat.add(out, quatA, quatB);

  //     t.equal_v4(out, [6, 8, 10, 12]);
  //     t.equal(result, out);
  //     t.equal_v4(quatA, [1, 2, 3, 4]);
  //     t.equal_v4(quatB, [5, 6, 7, 8]);

  //     t.end();
  //   });

  //   t.test('when quatA is the output quaternion', t => {
  //     result = quat.add(quatA, quatA, quatB);

  //     t.equal_v4(quatA, [6, 8, 10, 12]);
  //     t.equal(result, quatA);
  //     t.equal_v4(quatB, [5, 6, 7, 8]);

  //     t.end();
  //   });

  //   t.test('when quatB is the output quaternion', t => {
  //     result = quat.add(quatB, quatA, quatB);

  //     t.equal_v4(quatB, [6, 8, 10, 12]);
  //     t.equal(result, quatB);
  //     t.equal_v4(quatA, [1, 2, 3, 4]);

  //     t.end();
  //   });

  //   t.end();
  // });

  t.test('multiply', t => {
    t.equal(quat.mul, quat.multiply);

    t.test('with a separate output quaternion', t => {
      result = quat.multiply(out, quatA, quatB);

      t.equal_v4(out, [24, 48, 48, -6]);
      t.equal(result, out);
      t.equal_v4(quatA, [1, 2, 3, 4]);
      t.equal_v4(quatB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when quatA is the output quaternion', t => {
      result = quat.multiply(quatA, quatA, quatB);

      t.equal_v4(quatA, [24, 48, 48, -6]);
      t.equal(result, quatA);
      t.equal_v4(quatB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when quatB is the output quaternion', t => {
      result = quat.multiply(quatB, quatA, quatB);

      t.equal_v4(quatB, [24, 48, 48, -6]);
      t.equal(result, quatB);
      t.equal_v4(quatA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('scale', t => {
    t.test('with a separate output quaternion', t => {
      result = quat.scale(out, quatA, 2);

      t.equal_v4(out, [2, 4, 6, 8]);
      t.equal(result, out);
      t.equal_v4(quatA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when quatA is the output quaternion', t => {
      result = quat.scale(quatA, quatA, 2);

      t.equal_v4(quatA, [2, 4, 6, 8]);
      t.equal(result, quatA);

      t.end();
    });

    t.end();
  });

  t.test('length', t => {
    t.equal(quat.len, quat.length);

    result = quat.length(quatA);

    t.approx(result, 5.477225);

    t.end();
  });

  t.test('squaredLength', t => {
    t.equal(quat.sqrLen, quat.squaredLength);

    result = quat.squaredLength(quatA);

    t.equal(result, 30);

    t.end();
  });

  t.test('normalize', t => {
    t.beforeEach(done => {
      quat.set(quatA, 5, 0, 0, 0);
      done();
    });

    t.test('with a separate output quaternion', t => {
      result = quat.normalize(out, quatA);

      t.equal_v4(out, [1, 0, 0, 0]);
      t.equal(result, out);
      t.equal_v4(quatA, [5, 0, 0, 0]);

      t.end();
    });

    t.test('when quatA is the output quaternion', t => {
      result = quat.normalize(quatA, quatA);

      t.equal(result, quatA);
      t.equal_v4(quatA, [1, 0, 0, 0]);

      t.end();
    });

    t.end();
  });

  t.test('lerp', t => {
    t.test('with a separate output quaternion', t => {
      result = quat.lerp(out, quatA, quatB, 0.5);

      t.equal_v4(out, [3, 4, 5, 6]);
      t.equal(result, out);
      t.equal_v4(quatA, [1, 2, 3, 4]);
      t.equal_v4(quatB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when quatA is the output quaternion', t => {
      result = quat.lerp(quatA, quatA, quatB, 0.5);

      t.equal_v4(quatA, [3, 4, 5, 6]);
      t.equal(result, quatA);
      t.equal_v4(quatB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when quatB is the output quaternion', t => {
      result = quat.lerp(quatB, quatA, quatB, 0.5);

      t.equal_v4(quatB, [3, 4, 5, 6]);
      t.equal(result, quatB);
      t.equal_v4(quatA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  /*t.test('slerp', function() {
      t.test('with a separate output quaternion', function() {
          t.beforeEach(function() { result = quat.slerp(out, quatA, quatB, 0.5); });

          it('should place values into out', function() { expect(out).toBeEqualish([3, 4, 5, 6]); });
          it('should return out', function() { expect(result).toBe(out); });
          it('should not modify quatA', function() { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
          it('should not modify quatB', function() { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
      });

      t.test('when quatA is the output quaternion', function() {
          t.beforeEach(function() { result = quat.slerp(quatA, quatA, quatB, 0.5); });

          it('should place values into quatA', function() { expect(quatA).toBeEqualish([3, 4, 5, 6]); });
          it('should return quatA', function() { expect(result).toBe(quatA); });
          it('should not modify quatB', function() { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
      });

      t.test('when quatB is the output quaternion', function() {
          t.beforeEach(function() { result = quat.slerp(quatB, quatA, quatB, 0.5); });

          it('should place values into quatB', function() { expect(quatB).toBeEqualish([3, 4, 5, 6]); });
          it('should return quatB', function() { expect(result).toBe(quatB); });
          it('should not modify quatA', function() { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
      });
  });*/

  // TODO: slerp, calcuateW, rotateX, rotateY, rotateZ

  t.test('invert', t => {
    t.test('with a separate output quaternion', t => {
      result = quat.invert(out, quatA);

      t.equal_v4(out, [-0.033333, -0.066666, -0.1, 0.133333]);
      t.equal(result, out);
      t.equal_v4(quatA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when quatA is the output quaternion', t => {
      result = quat.invert(quatA, quatA);

      t.equal_v4(quatA, [-0.033333, -0.066666, -0.1, 0.133333]);
      t.equal(result, quatA);

      t.end();
    });

    t.end();
  });

  t.test('conjugate', t => {
    t.test('with a separate output quaternion', t => {
      result = quat.conjugate(out, quatA);

      t.equal_v4(out, [-1, -2, -3, 4]);
      t.equal(result, out);
      t.equal_v4(quatA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when quatA is the output quaternion', t => {
      result = quat.conjugate(quatA, quatA);

      t.equal_v4(quatA, [-1, -2, -3, 4]);
      t.equal(result, quatA);

      t.end();
    });

    t.end();
  });

  t.test('str', t => {
    result = quat.str(quatA);

    t.equal(result, 'quat(1, 2, 3, 4)');

    t.end();
  });

  t.test('array', t => {
    result = quat.array([], quatA);

    t.deepEqual(result, new Float32Array([1, 2, 3, 4]));

    t.end();
  });

  t.test('exactEquals', t => {
    quat.set(quatA, 0, 1, 2, 3);
    quat.set(quatB, 0, 1, 2, 3);
    let quatC = quat.new(1, 2, 3, 4);
    let r0 = quat.exactEquals(quatA, quatB);
    let r1 = quat.exactEquals(quatA, quatC);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal_v4(quatA, [0, 1, 2, 3]);
    t.equal_v4(quatB, [0, 1, 2, 3]);

    t.end();
  });

  t.test('equals', t => {
    quat.set(quatA, 0, 1, 2, 3);
    quat.set(quatB, 0, 1, 2, 3);
    let quatC = quat.new(1, 2, 3, 4);
    let quatD = quat.new(1e-16, 1, 2, 3);
    let r0 = quat.equals(quatA, quatB);
    let r1 = quat.equals(quatA, quatC);
    let r2 = quat.equals(quatA, quatD);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal(r2, true);
    t.equal_v4(quatA, [0, 1, 2, 3]);
    t.equal_v4(quatB, [0, 1, 2, 3]);

    t.end();
  });

  t.test('JSON.stringify', t => {
    t.equal(
      JSON.stringify({ quatA, quatB }),
      '{"quatA":[1,2,3,4],"quatB":[5,6,7,8]}'
    );

    t.end();
  });

  t.end();
});
