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
    t.equal(out, result);

    t.end();
  });

  t.test('set', t => {
    result = vec2.set(out, 1, 2);
    t.equal(result.x, 1);
    t.equal(result.y, 2);
    t.equal(result, out);

    t.end();
  });

  t.test('add', t => {
    t.test('with a separate output vector', t => {
      result = vec2.add(out, vecA, vecB);
      t.equal(out.x, 4);
      t.equal(out.y, 6);
      t.equal(result, out);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 4);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.add(vecA, vecA, vecB);
      t.equal(vecA.x, 4);
      t.equal(vecA.y, 6);
      t.equal(result, vecA);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 4);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.add(vecB, vecA, vecB);
      t.equal(vecB.x, 4);
      t.equal(vecB.y, 6);
      t.equal(result, vecB);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);

      t.end();
    });

    t.end();
  });

  t.test('subtract', t => {
    t.equal(vec2.sub, vec2.subtract);

    t.test('with a separate output vector', t => {
      result = vec2.sub(out, vecA, vecB);
      t.equal(out.x, -2);
      t.equal(out.y, -2);
      t.equal(result, out);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 4);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.sub(vecA, vecA, vecB);
      t.equal(vecA.x, -2);
      t.equal(vecA.y, -2);
      t.equal(result, vecA);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 4);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.sub(vecB, vecA, vecB);
      t.equal(vecB.x, -2);
      t.equal(vecB.y, -2);
      t.equal(result, vecB);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);

      t.end();
    });

    t.end();
  });

  t.test('multiply', t => {
    t.equal(vec2.mul, vec2.multiply);

    t.test('with a separate output vector', t => {
      result = vec2.mul(out, vecA, vecB);
      t.equal(out.x, 3);
      t.equal(out.y, 8);
      t.equal(result, out);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 4);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.mul(vecA, vecA, vecB);
      t.equal(vecA.x, 3);
      t.equal(vecA.y, 8);
      t.equal(result, vecA);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 4);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.mul(vecB, vecA, vecB);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 8);
      t.equal(result, vecB);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);

      t.end();
    });

    t.end();
  });

  t.test('divide', t => {
    t.equal(vec2.div, vec2.divide);

    t.test('with a separate output vector', t => {
      result = vec2.div(out, vecA, vecB);
      t.approx(out.x, 0.3333333);
      t.equal(out.y, 0.5);
      t.equal(result, out);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 4);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.div(vecA, vecA, vecB);
      t.approx(vecA.x, 0.3333333);
      t.equal(vecA.y, 0.5);
      t.equal(result, vecA);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 4);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.div(vecB, vecA, vecB);
      t.approx(vecB.x, 0.3333333);
      t.equal(vecB.y, 0.5);
      t.equal(result, vecB);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);

      t.end();
    });

    t.end();
  });

  t.test('ceil', t => {
    t.test('with a separate output vector', t => {
      vec2.set(vecA, Math.E, Math.PI);
      result = vec2.ceil(out, vecA);

      t.equal(out.x, 3);
      t.equal(out.y, 4);
      t.equal(result, out);
      t.equal(vecA.x, Math.E);
      t.equal(vecA.y, Math.PI);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      vec2.set(vecA, Math.E, Math.PI);
      result = vec2.ceil(vecA, vecA);

      t.equal(vecA.x, 3);
      t.equal(vecA.y, 4);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('floor', t => {
    t.test('with a separate output vector', t => {
      vec2.set(vecA, Math.E, Math.PI);
      result = vec2.floor(out, vecA);

      t.equal(out.x, 2);
      t.equal(out.y, 3);
      t.equal(result, out);
      t.equal(vecA.x, Math.E);
      t.equal(vecA.y, Math.PI);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      vec2.set(vecA, Math.E, Math.PI);
      result = vec2.floor(vecA, vecA);

      t.equal(vecA.x, 2);
      t.equal(vecA.y, 3);
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

      t.equal(out.x, 1);
      t.equal(out.y, 2);
      t.equal(result, out);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 4);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 2);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.min(vecA, vecA, vecB);

      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);
      t.equal(result, vecA);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 2);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.min(vecB, vecA, vecB);

      t.equal(vecB.x, 1);
      t.equal(vecB.y, 2);
      t.equal(result, vecB);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 4);

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

      t.equal(out.x, 3);
      t.equal(out.y, 4);
      t.equal(result, out);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 4);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 2);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.max(vecA, vecA, vecB);

      t.equal(vecA.x, 3);
      t.equal(vecA.y, 4);
      t.equal(result, vecA);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 2);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.max(vecB, vecA, vecB);

      t.equal(vecB.x, 3);
      t.equal(vecB.y, 4);
      t.equal(result, vecB);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 4);

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

      t.equal(out.x, 3);
      t.equal(out.y, 3);
      t.equal(result, out);
      t.equal(vecA.x, Math.E);
      t.equal(vecA.y, Math.PI);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.round(vecA, vecA);

      t.equal(vecA.x, 3);
      t.equal(vecA.y, 3);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('scale', t => {
    t.test('with a separate output vector', t => {
      result = vec2.scale(out, vecA, 2);

      t.equal(out.x, 2);
      t.equal(out.y, 4);
      t.equal(result, out);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.scale(vecA, vecA, 2);

      t.equal(vecA.x, 2);
      t.equal(vecA.y, 4);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('scaleAndAdd', t => {
    t.test('with a separate output vector', t => {
      result = vec2.scaleAndAdd(out, vecA, vecB, 0.5);

      t.equal(out.x, 2.5);
      t.equal(out.y, 4);
      t.equal(result, out);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 4);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.scaleAndAdd(vecA, vecA, vecB, 0.5);

      t.equal(vecA.x, 2.5);
      t.equal(vecA.y, 4);
      t.equal(result, vecA);
      t.equal(vecB.x, 3);
      t.equal(vecB.y, 4);

      t.end();
    });

    t.test('when vecB is the output vector', t => {
      result = vec2.scaleAndAdd(vecB, vecA, vecB, 0.5);

      t.equal(vecB.x, 2.5);
      t.equal(vecB.y, 4);
      t.equal(result, vecB);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);

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

      t.equal(out.x, -1);
      t.equal(out.y, -2);
      t.equal(result, out);
      t.equal(vecA.x, 1);
      t.equal(vecA.y, 2);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.negate(vecA, vecA);

      t.equal(vecA.x, -1);
      t.equal(vecA.y, -2);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  t.test('inverse', t => {
    vec2.set(vecA, 0.1, 0.2);

    result = vec2.inverse(out, vecA);
    t.equal(out.x, 10);
    t.equal(out.y, 5);
    t.equal(result, out);
    t.equal(vecA.x, 0.1);
    t.equal(vecA.y, 0.2);

    t.end();
  });

  t.test('inverseSafe', t => {
    vec2.set(vecA, 0.1, 0.2);
    vec2.set(vecB, 0.0000000001, -0.0000000001);

    result = vec2.inverseSafe(out, vecA);
    t.equal(out.x, 10);
    t.equal(out.y, 5);
    t.equal(result, out);
    t.equal(vecA.x, 0.1);
    t.equal(vecA.y, 0.2);

    result = vec2.inverseSafe(out, vecB);
    t.equal(out.x, 0);
    t.equal(out.y, 0);
    t.equal(result, out);
    t.equal(vecB.x, 0.0000000001);
    t.equal(vecB.y, -0.0000000001);

    t.end();
  });

  t.test('normalize', t => {
    t.beforeEach(done => {
      vec2.set(vecA, 5, 0);
      done();
    });

    t.test('with a separate output vector', t => {
      result = vec2.normalize(out, vecA);

      t.equal(out.x, 1);
      t.equal(out.y, 0);
      t.equal(result, out);
      t.equal(vecA.x, 5);
      t.equal(vecA.y, 0);

      t.end();
    });

    t.test('when vecA is the output vector', t => {
      result = vec2.normalize(vecA, vecA);

      t.equal(vecA.x, 1);
      t.equal(vecA.y, 0);
      t.equal(result, vecA);

      t.end();
    });

    t.end();
  });

  // t.test('dot', t => {
  //   beforeEach(t => { result = vec2.dot(vecA, vecB); });

  //   it('should return the dot product', t => { expect(result).toEqual(11); });
  //   it('should not modify vecA', t => { expect(vecA).toBeEqualish([1, 2]); });
  //   it('should not modify vecB', t => { expect(vecB).toBeEqualish([3, 4]); });
  // });

  // t.test('cross', t => {
  //   var out3;

  //   beforeEach(t => {
  //     out3 = [0, 0, 0];
  //     result = vec2.cross(out3, vecA, vecB);
  //   });

  //   it('should place values into out', t => { expect(out3).toBeEqualish([0, 0, -2]); });
  //   it('should return out', t => { expect(result).toBe(out3); });
  //   it('should not modify vecA', t => { expect(vecA).toBeEqualish([1, 2]); });
  //   it('should not modify vecB', t => { expect(vecB).toBeEqualish([3, 4]); });
  // });

  // t.test('lerp', t => {
  //   t.test('with a separate output vector', t => {
  //     beforeEach(t => { result = vec2.lerp(out, vecA, vecB, 0.5); });

  //     it('should place values into out', t => { expect(out).toBeEqualish([2, 3]); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //     it('should not modify vecA', t => { expect(vecA).toBeEqualish([1, 2]); });
  //     it('should not modify vecB', t => { expect(vecB).toBeEqualish([3, 4]); });
  //   });

  //   t.test('when vecA is the output vector', t => {
  //     beforeEach(t => { result = vec2.lerp(vecA, vecA, vecB, 0.5); });

  //     it('should place values into vecA', t => { expect(vecA).toBeEqualish([2, 3]); });
  //     it('should return vecA', t => { expect(result).toBe(vecA); });
  //     it('should not modify vecB', t => { expect(vecB).toBeEqualish([3, 4]); });
  //   });

  //   t.test('when vecB is the output vector', t => {
  //     beforeEach(t => { result = vec2.lerp(vecB, vecA, vecB, 0.5); });

  //     it('should place values into vecB', t => { expect(vecB).toBeEqualish([2, 3]); });
  //     it('should return vecB', t => { expect(result).toBe(vecB); });
  //     it('should not modify vecA', t => { expect(vecA).toBeEqualish([1, 2]); });
  //   });
  // });

  // t.test('random', t => {
  //   t.test('with no scale', t => {
  //     beforeEach(t => { result = vec2.random(out); });

  //     it('should result in a unit length vector', t => { expect(vec2.length(out)).toBeCloseTo(1.0); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //   });

  //   t.test('with a scale', t => {
  //     beforeEach(t => { result = vec2.random(out, 5.0); });

  //     it('should result in a unit length vector', t => { expect(vec2.length(out)).toBeCloseTo(5.0); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //   });
  // });

  // t.test('transformMat2', t => {
  //   var matA;
  //   beforeEach(t => { matA = [1, 2, 3, 4]; });

  //   t.test('with a separate output vector', t => {
  //     beforeEach(t => { result = vec2.transformMat2(out, vecA, matA); });

  //     it('should place values into out', t => { expect(out).toBeEqualish([7, 10]); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //     it('should not modify vecA', t => { expect(vecA).toBeEqualish([1, 2]); });
  //     it('should not modify matA', t => { expect(matA).toBeEqualish([1, 2, 3, 4]); });
  //   });

  //   t.test('when vecA is the output vector', t => {
  //     beforeEach(t => { result = vec2.transformMat2(vecA, vecA, matA); });

  //     it('should place values into vecA', t => { expect(vecA).toBeEqualish([7, 10]); });
  //     it('should return vecA', t => { expect(result).toBe(vecA); });
  //     it('should not modify matA', t => { expect(matA).toBeEqualish([1, 2, 3, 4]); });
  //   });
  // });

  // t.test('transformMat2d', t => {
  //   var matA;
  //   beforeEach(t => { matA = [1, 2, 3, 4, 5, 6]; });

  //   t.test('with a separate output vector', t => {
  //     beforeEach(t => { result = vec2.transformMat2d(out, vecA, matA); });

  //     it('should place values into out', t => { expect(out).toBeEqualish([12, 16]); });
  //     it('should return out', t => { expect(result).toBe(out); });
  //     it('should not modify vecA', t => { expect(vecA).toBeEqualish([1, 2]); });
  //     it('should not modify matA', t => { expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6]); });
  //   });

  //   t.test('when vecA is the output vector', t => {
  //     beforeEach(t => { result = vec2.transformMat2d(vecA, vecA, matA); });

  //     it('should place values into vecA', t => { expect(vecA).toBeEqualish([12, 16]); });
  //     it('should return vecA', t => { expect(result).toBe(vecA); });
  //     it('should not modify matA', t => { expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6]); });
  //   });
  // });

  // t.test('forEach', t => {
  //   var vecArray;

  //   beforeEach(t => {
  //     vecArray = [
  //       1, 2,
  //       3, 4,
  //       0, 0
  //     ];
  //   });

  //   t.test('when performing operations that take no extra arguments', t => {
  //     beforeEach(t => { result = vec2.forEach(vecArray, 0, 0, 0, vec2.normalize); });

  //     it('should update all values', t => {
  //       expect(vecArray).toBeEqualish([
  //         0.447214, 0.894427,
  //         0.6, 0.8,
  //         0, 0
  //       ]);
  //     });
  //     it('should return vecArray', t => { expect(result).toBe(vecArray); });
  //   });

  //   t.test('when performing operations that takes one extra arguments', t => {
  //     beforeEach(t => { result = vec2.forEach(vecArray, 0, 0, 0, vec2.add, vecA); });

  //     it('should update all values', t => {
  //       expect(vecArray).toBeEqualish([
  //         2, 4,
  //         4, 6,
  //         1, 2
  //       ]);
  //     });
  //     it('should return vecArray', t => { expect(result).toBe(vecArray); });
  //     it('should not modify vecA', t => { expect(vecA).toBeEqualish([1, 2]); });
  //   });

  //   t.test('when specifying an offset', t => {
  //     beforeEach(t => { result = vec2.forEach(vecArray, 0, 2, 0, vec2.add, vecA); });

  //     it('should update all values except the first vector', t => {
  //       expect(vecArray).toBeEqualish([
  //         1, 2,
  //         4, 6,
  //         1, 2
  //       ]);
  //     });
  //     it('should return vecArray', t => { expect(result).toBe(vecArray); });
  //     it('should not modify vecA', t => { expect(vecA).toBeEqualish([1, 2]); });
  //   });

  //   t.test('when specifying a count', t => {
  //     beforeEach(t => { result = vec2.forEach(vecArray, 0, 0, 2, vec2.add, vecA); });

  //     it('should update all values except the last vector', t => {
  //       expect(vecArray).toBeEqualish([
  //         2, 4,
  //         4, 6,
  //         0, 0
  //       ]);
  //     });
  //     it('should return vecArray', t => { expect(result).toBe(vecArray); });
  //     it('should not modify vecA', t => { expect(vecA).toBeEqualish([1, 2]); });
  //   });

  //   t.test('when specifying a stride', t => {
  //     beforeEach(t => { result = vec2.forEach(vecArray, 4, 0, 0, vec2.add, vecA); });

  //     it('should update all values except the second vector', t => {
  //       expect(vecArray).toBeEqualish([
  //         2, 4,
  //         3, 4,
  //         1, 2
  //       ]);
  //     });
  //     it('should return vecArray', t => { expect(result).toBe(vecArray); });
  //     it('should not modify vecA', t => { expect(vecA).toBeEqualish([1, 2]); });
  //   });

  //   t.test('when calling a function that does not modify the out variable', t => {
  //     beforeEach(t => {
  //       result = vec2.forEach(vecArray, 0, 0, 0, function (out, vec) { });
  //     });

  //     it('values should remain unchanged', t => {
  //       expect(vecArray).toBeEqualish([
  //         1, 2,
  //         3, 4,
  //         0, 0,
  //       ]);
  //     });
  //     it('should return vecArray', t => { expect(result).toBe(vecArray); });
  //   });
  // });

  // t.test('str', t => {
  //   beforeEach(t => { result = vec2.str(vecA); });

  //   it('should return a string representation of the vector', t => { expect(result).toEqual('vec2(1, 2)'); });
  // });

  // t.test('exactEquals', t => {
  //   var vecC, r0, r1;
  //   beforeEach(t => {
  //     vecA = [0, 1];
  //     vecB = [0, 1];
  //     vecC = [1, 2];
  //     r0 = vec2.exactEquals(vecA, vecB);
  //     r1 = vec2.exactEquals(vecA, vecC);
  //   });

  //   it('should return true for identical vectors', t => { expect(r0).toBe(true); });
  //   it('should return false for different vectors', t => { expect(r1).toBe(false); });
  //   it('should not modify vecA', t => { expect(vecA).toBeEqualish([0, 1]); });
  //   it('should not modify vecB', t => { expect(vecB).toBeEqualish([0, 1]); });
  // });

  // t.test('equals', t => {
  //   var vecC, vecD, r0, r1, r2;
  //   beforeEach(t => {
  //     vecA = [0, 1];
  //     vecB = [0, 1];
  //     vecC = [1, 2];
  //     vecD = [1e-16, 1];
  //     r0 = vec2.equals(vecA, vecB);
  //     r1 = vec2.equals(vecA, vecC);
  //     r2 = vec2.equals(vecA, vecD);
  //   });
  //   it('should return true for identical vectors', t => { expect(r0).toBe(true); });
  //   it('should return false for different vectors', t => { expect(r1).toBe(false); });
  //   it('should return true for close but not identical vectors', t => { expect(r2).toBe(true); });
  //   it('should not modify vecA', t => { expect(vecA).toBeEqualish([0, 1]); });
  //   it('should not modify vecB', t => { expect(vecB).toBeEqualish([0, 1]); });
  // });

  t.end();
});