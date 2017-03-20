const tap = require('./tap');
const { vec3, quat, mat3, mat4 } = require('../dist/vmath');

tap.test('quat', t => {
  let out = quat.create();
  let quatA = quat.create();
  let quatB = quat.create();
  let result = quat.create();
  let id = quat.create();
  let vec = vec3.create();
  let deg90 = Math.PI / 2;

  t.beforeEach(done => {
    quat.set(quatA, 1, 2, 3, 4);
    quat.set(quatB, 5, 6, 7, 8);
    quat.set(out, 0, 0, 0, 0);
    quat.set(id, 0, 0, 0, 1);
    vec3.set(vec, 1, 1, -1);
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

  // t.test('rotationTo', t => {
  //   let r;
  //   t.beforeEach(t => { r = vec3.create(); });

  //   t.test('at right angle', t => {
  //     t.beforeEach(t => {
  //       result = quat.rotationTo(out, [0, 1, 0], [1, 0, 0]);
  //     });

  //     it('should return out', t => { expect(result).toBe(out); });

  //     it('should calculate proper quaternion', t => {
  //       expect(out).toBeEqualish([0, 0, -0.707106, 0.707106]);
  //     });
  //   });

  //   t.test('when vectors are parallel', t => {
  //     t.beforeEach(t => {
  //       result = quat.rotationTo(out, [0, 1, 0], [0, 1, 0]);
  //     });

  //     it('should return out', t => { expect(result).toBe(out); });

  //     it('multiplying A should produce B', t => {
  //       expect(vec3.transformQuat(r, [0, 1, 0], out)).toBeEqualish([0, 1, 0]);
  //     });
  //   });

  //   t.test('when vectors are opposed X', t => {
  //     t.beforeEach(t => {
  //       result = quat.rotationTo(out, [1, 0, 0], [-1, 0, 0]);
  //     });

  //     it('should return out', t => { expect(result).toBe(out); });

  //     it('multiplying A should produce B', t => {
  //       expect(vec3.transformQuat(r, [1, 0, 0], out)).toBeEqualish([-1, 0, 0]);
  //     });
  //   });

  //   t.test('when vectors are opposed Y', t => {
  //     t.beforeEach(t => {
  //       result = quat.rotationTo(out, [0, 1, 0], [0, -1, 0]);
  //     });

  //     it('should return out', t => { expect(result).toBe(out); });

  //     it('multiplying A should produce B', t => {
  //       expect(vec3.transformQuat(r, [0, 1, 0], out)).toBeEqualish([0, -1, 0]);
  //     });
  //   });

  //   t.test('when vectors are opposed Z', t => {
  //     t.beforeEach(t => {
  //       result = quat.rotationTo(out, [0, 0, 1], [0, 0, -1]);
  //     });

  //     it('should return out', t => { expect(result).toBe(out); });

  //     it('multiplying A should produce B', t => {
  //       expect(vec3.transformQuat(r, [0, 0, 1], out)).toBeEqualish([0, 0, -1]);
  //     });
  //   });
  // });

  // t.test('create', t => {
  //   t.beforeEach(t => { result = quat.create(); });
  //   it('should return a 4 element array initialized to an identity quaternion', t => { expect(result).toBeEqualish([0, 0, 0, 1]); });
  // });

  // t.test('clone', t => {
  //   t.beforeEach(t => { result = quat.clone(quatA); });
  //   it('should return a 4 element array initialized to the values in quatA', t => { expect(result).toBeEqualish(quatA); });
  // });

  // t.test('fromValues', t => {
  //   t.beforeEach(t => { result = quat.fromValues(1, 2, 3, 4); });
  //   it('should return a 4 element array initialized to the values passed', t => { expect(result).toBeEqualish([1, 2, 3, 4]); });
  // });

  // t.test('copy', t => {
  //   t.beforeEach(t => { result = quat.copy(out, quatA); });
  //   it('should place values into out', t => { expect(out).toBeEqualish([1, 2, 3, 4]); });
  //   it('should return out', t => { expect(result).toBe(out); });
  // });

  // t.test('set', t => {
  //   t.beforeEach(t => { result = quat.set(out, 1, 2, 3, 4); });
  //   it('should place values into out', t => { expect(out).toBeEqualish([1, 2, 3, 4]); });
  //   it('should return out', t => { expect(result).toBe(out); });
  // });

  // t.test('identity', t => {
  //   t.beforeEach(t => { result = quat.identity(out); });
  //   it('should place values into out', t => { expect(result).toBeEqualish([0, 0, 0, 1]); });
  //   it('should return out', t => { expect(result).toBe(out); });
  // });

  // t.test('setAxisAngle', t => {
  //   t.beforeEach(t => { result = quat.setAxisAngle(out, [1, 0, 0], Math.PI * 0.5); });
  //   it('should place values into out', t => { expect(result).toBeEqualish([0.707106, 0, 0, 0.707106]); });
  //   it('should return out', t => { expect(result).toBe(out); });
  // });

  // t.test('getAxisAngle', t => {
  //   t.test('for a quaternion representing no rotation', t => {
  //     t.beforeEach(t => { result = quat.setAxisAngle(out, [0, 1, 0], 0.0); deg90 = quat.getAxisAngle(vec, out); });
  //     it('should return a multiple of 2*PI as the angle component', t => { expect(deg90 % (Math.PI * 2.0)).toBeEqualish(0.0); });
  //   });

  //   t.test('for a simple rotation about X axis', t => {
  //     t.beforeEach(t => { result = quat.setAxisAngle(out, [1, 0, 0], 0.7778); deg90 = quat.getAxisAngle(vec, out); });
  //     it('should return the same provided angle', t => { expect(deg90).toBeEqualish(0.7778); });
  //     it('should return the X axis as the angle', t => { expect(vec).toBeEqualish([1, 0, 0]); });
  //   });

  //   t.test('for a simple rotation about Y axis', t => {
  //     t.beforeEach(t => { result = quat.setAxisAngle(out, [0, 1, 0], 0.879546); deg90 = quat.getAxisAngle(vec, out); });
  //     it('should return the same provided angle', t => { expect(deg90).toBeEqualish(0.879546); });
  //     it('should return the X axis as the angle', t => { expect(vec).toBeEqualish([0, 1, 0]); });
  //   });

  //   t.test('for a simple rotation about Z axis', t => {
  //     t.beforeEach(t => { result = quat.setAxisAngle(out, [0, 0, 1], 0.123456); deg90 = quat.getAxisAngle(vec, out); });
  //     it('should return the same provided angle', t => { expect(deg90).toBeEqualish(0.123456); });
  //     it('should return the X axis as the angle', t => { expect(vec).toBeEqualish([0, 0, 1]); });
  //   });

  //   t.test('for a slightly irregular axis and right angle', t => {
  //     t.beforeEach(t => { result = quat.setAxisAngle(out, [0.707106, 0, 0.707106], Math.PI * 0.5); deg90 = quat.getAxisAngle(vec, out); });
  //     it('should place values into vec', t => { expect(vec).toBeEqualish([0.707106, 0, 0.707106]); });
  //     it('should return a numeric angle', t => { expect(deg90).toBeEqualish(Math.PI * 0.5); });
  //   });

  //   t.test('for a very irregular axis and negative input angle', t => {
  //     t.beforeEach(t => {
  //       quatA = quat.setAxisAngle(quatA, [0.65538555, 0.49153915, 0.57346237], 8.8888);
  //       deg90 = quat.getAxisAngle(vec, quatA);
  //       quatB = quat.setAxisAngle(quatB, vec, deg90);
  //     });
  //     it('should return an angle between 0 and 2*PI', t => { expect(deg90).toBeGreaterThan(0.0); expect(deg90).toBeLessThan(Math.PI * 2.0); });
  //     it('should create the same quaternion from axis and angle extracted', t => { expect(quatA).toBeEqualish(quatB); });
  //   });
  // });

  // t.test('add', t => {
  //   t.test('with a separate output quaternion', t => {
  //     t.beforeEach(t => { result = quat.add(out, quatA, quatB); });

  //     it('should place values into out', t => { expect(out).toBeEqualish([6, 8, 10, 12]); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //     it('should not modify quatA', t => { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
  //     it('should not modify quatB', t => { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
  //   });

  //   t.test('when quatA is the output quaternion', t => {
  //     t.beforeEach(t => { result = quat.add(quatA, quatA, quatB); });

  //     it('should place values into quatA', t => { expect(quatA).toBeEqualish([6, 8, 10, 12]); });
  //     it('should return quatA', t => { expect(result).toBe(quatA); });
  //     it('should not modify quatB', t => { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
  //   });

  //   t.test('when quatB is the output quaternion', t => {
  //     t.beforeEach(t => { result = quat.add(quatB, quatA, quatB); });

  //     it('should place values into quatB', t => { expect(quatB).toBeEqualish([6, 8, 10, 12]); });
  //     it('should return quatB', t => { expect(result).toBe(quatB); });
  //     it('should not modify quatA', t => { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
  //   });
  // });

  // t.test('multiply', t => {
  //   it('should have an alias called 'mul'', t => { expect(quat.mul).toEqual(quat.multiply); });

  //   t.test('with a separate output quaternion', t => {
  //     t.beforeEach(t => { result = quat.multiply(out, quatA, quatB); });

  //     it('should place values into out', t => { expect(out).toBeEqualish([24, 48, 48, -6]); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //     it('should not modify quatA', t => { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
  //     it('should not modify quatB', t => { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
  //   });

  //   t.test('when quatA is the output quaternion', t => {
  //     t.beforeEach(t => { result = quat.multiply(quatA, quatA, quatB); });

  //     it('should place values into quatA', t => { expect(quatA).toBeEqualish([24, 48, 48, -6]); });
  //     it('should return quatA', t => { expect(result).toBe(quatA); });
  //     it('should not modify quatB', t => { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
  //   });

  //   t.test('when quatB is the output quaternion', t => {
  //     t.beforeEach(t => { result = quat.multiply(quatB, quatA, quatB); });

  //     it('should place values into quatB', t => { expect(quatB).toBeEqualish([24, 48, 48, -6]); });
  //     it('should return quatB', t => { expect(result).toBe(quatB); });
  //     it('should not modify quatA', t => { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
  //   });
  // });

  // t.test('scale', t => {
  //   t.test('with a separate output quaternion', t => {
  //     t.beforeEach(t => { result = quat.scale(out, quatA, 2); });

  //     it('should place values into out', t => { expect(out).toBeEqualish([2, 4, 6, 8]); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //     it('should not modify quatA', t => { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
  //   });

  //   t.test('when quatA is the output quaternion', t => {
  //     t.beforeEach(t => { result = quat.scale(quatA, quatA, 2); });

  //     it('should place values into quatA', t => { expect(quatA).toBeEqualish([2, 4, 6, 8]); });
  //     it('should return quatA', t => { expect(result).toBe(quatA); });
  //   });
  // });

  // t.test('length', t => {
  //   it('should have an alias called 'len'', t => { expect(quat.len).toEqual(quat.length); });

  //   t.beforeEach(t => { result = quat.length(quatA); });

  //   it('should return the length', t => { expect(result).toBeCloseTo(5.477225); });
  // });

  // t.test('squaredLength', t => {
  //   it('should have an alias called 'sqrLen'', t => { expect(quat.sqrLen).toEqual(quat.squaredLength); });

  //   t.beforeEach(t => { result = quat.squaredLength(quatA); });

  //   it('should return the squared length', t => { expect(result).toEqual(30); });
  // });

  // t.test('normalize', t => {
  //   t.beforeEach(t => { quatA = [5, 0, 0, 0]; });

  //   t.test('with a separate output quaternion', t => {
  //     t.beforeEach(t => { result = quat.normalize(out, quatA); });

  //     it('should place values into out', t => { expect(out).toBeEqualish([1, 0, 0, 0]); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //     it('should not modify quatA', t => { expect(quatA).toBeEqualish([5, 0, 0, 0]); });
  //   });

  //   t.test('when quatA is the output quaternion', t => {
  //     t.beforeEach(t => { result = quat.normalize(quatA, quatA); });

  //     it('should place values into quatA', t => { expect(quatA).toBeEqualish([1, 0, 0, 0]); });
  //     it('should return quatA', t => { expect(result).toBe(quatA); });
  //   });
  // });

  // t.test('lerp', t => {
  //   t.test('with a separate output quaternion', t => {
  //     t.beforeEach(t => { result = quat.lerp(out, quatA, quatB, 0.5); });

  //     it('should place values into out', t => { expect(out).toBeEqualish([3, 4, 5, 6]); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //     it('should not modify quatA', t => { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
  //     it('should not modify quatB', t => { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
  //   });

  //   t.test('when quatA is the output quaternion', t => {
  //     t.beforeEach(t => { result = quat.lerp(quatA, quatA, quatB, 0.5); });

  //     it('should place values into quatA', t => { expect(quatA).toBeEqualish([3, 4, 5, 6]); });
  //     it('should return quatA', t => { expect(result).toBe(quatA); });
  //     it('should not modify quatB', t => { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
  //   });

  //   t.test('when quatB is the output quaternion', t => {
  //     t.beforeEach(t => { result = quat.lerp(quatB, quatA, quatB, 0.5); });

  //     it('should place values into quatB', t => { expect(quatB).toBeEqualish([3, 4, 5, 6]); });
  //     it('should return quatB', t => { expect(result).toBe(quatB); });
  //     it('should not modify quatA', t => { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
  //   });
  // });

  // /*t.test('slerp', function() {
  //     t.test('with a separate output quaternion', function() {
  //         t.beforeEach(function() { result = quat.slerp(out, quatA, quatB, 0.5); });

  //         it('should place values into out', function() { expect(out).toBeEqualish([3, 4, 5, 6]); });
  //         it('should return out', function() { expect(result).toBe(out); });
  //         it('should not modify quatA', function() { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
  //         it('should not modify quatB', function() { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
  //     });

  //     t.test('when quatA is the output quaternion', function() {
  //         t.beforeEach(function() { result = quat.slerp(quatA, quatA, quatB, 0.5); });

  //         it('should place values into quatA', function() { expect(quatA).toBeEqualish([3, 4, 5, 6]); });
  //         it('should return quatA', function() { expect(result).toBe(quatA); });
  //         it('should not modify quatB', function() { expect(quatB).toBeEqualish([5, 6, 7, 8]); });
  //     });

  //     t.test('when quatB is the output quaternion', function() {
  //         t.beforeEach(function() { result = quat.slerp(quatB, quatA, quatB, 0.5); });

  //         it('should place values into quatB', function() { expect(quatB).toBeEqualish([3, 4, 5, 6]); });
  //         it('should return quatB', function() { expect(result).toBe(quatB); });
  //         it('should not modify quatA', function() { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
  //     });
  // });*/

  // // TODO: slerp, calcuateW, rotateX, rotateY, rotateZ

  // t.test('invert', t => {
  //   t.test('with a separate output quaternion', t => {
  //     t.beforeEach(t => { result = quat.invert(out, quatA); });

  //     it('should place values into out', t => { expect(out).toBeEqualish([-0.033333, -0.066666, -0.1, 0.133333]); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //     it('should not modify quatA', t => { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
  //   });

  //   t.test('when quatA is the output quaternion', t => {
  //     t.beforeEach(t => { result = quat.invert(quatA, quatA); });

  //     it('should place values into quatA', t => { expect(quatA).toBeEqualish([-0.033333, -0.066666, -0.1, 0.133333]); });
  //     it('should return quatA', t => { expect(result).toBe(quatA); });
  //   });
  // });

  // t.test('conjugate', t => {
  //   t.test('with a separate output quaternion', t => {
  //     t.beforeEach(t => { result = quat.conjugate(out, quatA); });

  //     it('should place values into out', t => { expect(out).toBeEqualish([-1, -2, -3, 4]); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //     it('should not modify quatA', t => { expect(quatA).toBeEqualish([1, 2, 3, 4]); });
  //   });

  //   t.test('when quatA is the output quaternion', t => {
  //     t.beforeEach(t => { result = quat.conjugate(quatA, quatA); });

  //     it('should place values into quatA', t => { expect(quatA).toBeEqualish([-1, -2, -3, 4]); });
  //     it('should return quatA', t => { expect(result).toBe(quatA); });
  //   });
  // });

  // t.test('str', t => {
  //   t.beforeEach(t => { result = quat.str(quatA); });

  //   it('should return a string representation of the quaternion', t => { expect(result).toEqual('quat(1, 2, 3, 4)'); });
  // });

  // t.test('exactEquals', t => {
  //   let quatC, r0, r1;
  //   t.beforeEach(t => {
  //     quatA = [0, 1, 2, 3];
  //     quatB = [0, 1, 2, 3];
  //     quatC = [1, 2, 3, 4];
  //     r0 = quat.exactEquals(quatA, quatB);
  //     r1 = quat.exactEquals(quatA, quatC);
  //   });

  //   it('should return true for identical quaternions', t => { expect(r0).toBe(true); });
  //   it('should return false for different quaternions', t => { expect(r1).toBe(false); });
  //   it('should not modify quatA', t => { expect(quatA).toBeEqualish([0, 1, 2, 3]); });
  //   it('should not modify quatB', t => { expect(quatB).toBeEqualish([0, 1, 2, 3]); });
  // });

  // t.test('equals', t => {
  //   let quatC, quatD, r0, r1, r2;
  //   t.beforeEach(t => {
  //     quatA = [0, 1, 2, 3];
  //     quatB = [0, 1, 2, 3];
  //     quatC = [1, 2, 3, 4];
  //     quatD = [1e-16, 1, 2, 3];
  //     r0 = quat.equals(quatA, quatB);
  //     r1 = quat.equals(quatA, quatC);
  //     r2 = quat.equals(quatA, quatD);
  //   });
  //   it('should return true for identical quaternions', t => { expect(r0).toBe(true); });
  //   it('should return false for different quaternions', t => { expect(r1).toBe(false); });
  //   it('should return true for close but not identical quaternions', t => { expect(r2).toBe(true); });
  //   it('should not modify quatA', t => { expect(quatA).toBeEqualish([0, 1, 2, 3]); });
  //   it('should not modify quatB', t => { expect(quatB).toBeEqualish([0, 1, 2, 3]); });
  // });

  t.end();
});
