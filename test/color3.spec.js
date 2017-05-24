const tap = require('./tap');
const {color3} = require('../dist/vmath');

tap.test('color3', t => {
  let out, colorA, colorB, result;

  t.beforeEach(done => {
    colorA = color3.new(1, 2, 3);
    colorB = color3.new(4, 5, 6);
    out = color3.new(0, 0, 0);

    done();
  });

  t.test('create', t => {
    result = color3.create();

    t.equal_c3(result, [1, 1, 1]);

    t.end();
  });

  t.test('clone', t => {
    result = color3.clone(colorA);

    t.deepEqual(result, colorA);

    t.end();
  });

  t.test('new', t => {
    result = color3.new(1, 2, 3);

    t.equal_c3(result, [1, 2, 3]);

    t.end();
  });

  t.test('copy', t => {
    result = color3.copy(out, colorA);

    t.equal_c3(out, [1, 2, 3]);
    t.equal(result, out);

    t.end();
  });

  t.test('set', t => {
    result = color3.set(out, 1, 2, 3);

    t.equal_c3(out, [1, 2, 3]);
    t.equal(result, out);

    t.end();
  });

  t.test('add', t => {
    t.test('with a separate output color', t => {
      result = color3.add(out, colorA, colorB);

      t.equal_c3(out, [5, 7, 9]);
      t.equal(result, out);
      t.equal_c3(colorA, [1, 2, 3]);
      t.equal_c3(colorB, [4, 5, 6]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color3.add(colorA, colorA, colorB);

      t.equal_c3(colorA, [5, 7, 9]);
      t.equal(result, colorA);
      t.equal_c3(colorB, [4, 5, 6]);

      t.end();
    });

    t.test('when colorB is the output color', t => {
      result = color3.add(colorB, colorA, colorB);

      t.equal_c3(colorB, [5, 7, 9]);
      t.equal(result, colorB);
      t.equal_c3(colorA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });

  t.test('subtract', t => {
    t.equal(color3.sub, color3.subtract);

    t.test('with a separate output color', t => {
      result = color3.subtract(out, colorA, colorB);

      t.equal_c3(out, [-3, -3, -3]);
      t.equal(result, out);
      t.equal_c3(colorA, [1, 2, 3]);
      t.equal_c3(colorB, [4, 5, 6]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color3.subtract(colorA, colorA, colorB);

      t.equal_c3(colorA, [-3, -3, -3]);
      t.equal(result, colorA);
      t.equal_c3(colorB, [4, 5, 6]);

      t.end();
    });

    t.test('when colorB is the output color', t => {
      result = color3.subtract(colorB, colorA, colorB);

      t.equal_c3(colorB, [-3, -3, -3]);
      t.equal(result, colorB);
      t.equal_c3(colorA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });

  t.test('multiply', t => {
    t.equal(color3.mul, color3.multiply);

    t.test('with a separate output color', t => {
      result = color3.multiply(out, colorA, colorB);

      t.equal_c3(out, [4, 10, 18]);
      t.equal(result, out);
      t.equal_c3(colorA, [1, 2, 3]);
      t.equal_c3(colorB, [4, 5, 6]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color3.multiply(colorA, colorA, colorB);

      t.equal_c3(colorA, [4, 10, 18]);
      t.equal(result, colorA);
      t.equal_c3(colorB, [4, 5, 6]);

      t.end();
    });

    t.test('when colorB is the output color', t => {
      result = color3.multiply(colorB, colorA, colorB);

      t.equal_c3(colorB, [4, 10, 18]);
      t.equal(result, colorB);
      t.equal_c3(colorA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });

  t.test('divide', t => {
    t.equal(color3.div, color3.divide);

    t.test('with a separate output color', t => {
      result = color3.divide(out, colorA, colorB);

      t.equal_c3(out, [0.25, 0.4, 0.5]);
      t.equal(result, out);
      t.equal_c3(colorA, [1, 2, 3]);
      t.equal_c3(colorB, [4, 5, 6]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color3.divide(colorA, colorA, colorB);

      t.equal_c3(colorA, [0.25, 0.4, 0.5]);
      t.equal(result, colorA);
      t.equal_c3(colorB, [4, 5, 6]);

      t.end();
    });

    t.test('when colorB is the output color', t => {
      result = color3.divide(colorB, colorA, colorB);

      t.equal_c3(colorB, [0.25, 0.4, 0.5]);
      t.equal(result, colorB);
      t.equal_c3(colorA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });


  t.test('scale', t => {
    t.test('with a separate output color', t => {
      result = color3.scale(out, colorA, 2);

      t.equal_c3(out, [2, 4, 6]);
      t.equal(result, out);
      t.equal_c3(colorA, [1, 2, 3]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color3.scale(colorA, colorA, 2);

      t.equal_c3(colorA, [2, 4, 6]);
      t.equal(result, colorA);

      t.end();
    });

    t.end();
  });

  t.test('lerp', t => {
    t.test('with a separate output color', t => {
      result = color3.lerp(out, colorA, colorB, 0.5);

      t.equal_c3(out, [2.5, 3.5, 4.5]);
      t.equal(result, out);
      t.equal_c3(colorA, [1, 2, 3]);
      t.equal_c3(colorB, [4, 5, 6]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color3.lerp(colorA, colorA, colorB, 0.5);

      t.equal_c3(colorA, [2.5, 3.5, 4.5]);
      t.equal(result, colorA);
      t.equal_c3(colorB, [4, 5, 6]);

      t.end();
    });

    t.test('when colorB is the output color', t => {
      result = color3.lerp(colorB, colorA, colorB, 0.5);

      t.equal_c3(colorB, [2.5, 3.5, 4.5]);
      t.equal(result, colorB);
      t.equal_c3(colorA, [1, 2, 3]);

      t.end();
    });

    t.end();
  });

  t.test('str', t => {
    result = color3.str(colorA);
    t.equal(result, 'color3(1, 2, 3)');

    t.end();
  });

  t.test('array', t => {
    result = color3.array([], colorA);

    t.deepEqual(result, new Float32Array([1, 2, 3]));

    t.end();
  });

  t.test('exactEquals', t => {
    let vecC, r0, r1;
    color3.set(colorA, 0, 1, 2);
    color3.set(colorB, 0, 1, 2);
    vecC = color3.new(1, 2, 3);
    r0 = color3.exactEquals(colorA, colorB);
    r1 = color3.exactEquals(colorA, vecC);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal_c3(colorA, [0, 1, 2]);
    t.equal_c3(colorB, [0, 1, 2]);

    t.end();
  });

  t.test('equals', t => {
    let vecC, vecD, r0, r1, r2;
    color3.set(colorA, 0, 1, 2);
    color3.set(colorB, 0, 1, 2);
    vecC = color3.new(1, 2, 3);
    vecD = color3.new(1e-16, 1, 2);
    r0 = color3.equals(colorA, colorB);
    r1 = color3.equals(colorA, vecC);
    r2 = color3.equals(colorA, vecD);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal(r2, true);
    t.equal_c3(colorA, [0, 1, 2]);
    t.equal_c3(colorB, [0, 1, 2]);

    t.end();
  });

  t.end();
});