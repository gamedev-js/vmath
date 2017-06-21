const tap = require('./tap');
const { color4 } = require('../dist/vmath');

tap.test('color4', t => {
  let out, colorA, colorB, result;

  t.beforeEach(done => {
    colorA = color4.new(1, 2, 3, 4);
    colorB = color4.new(5, 6, 7, 8);
    out = color4.new(0, 0, 0, 0);

    done();
  });

  t.test('create', t => {
    result = color4.create();

    t.equal_c4(result, [1, 1, 1, 1]);

    t.end();
  });

  t.test('clone', t => {
    result = color4.clone(colorA);

    t.deepEqual(result, colorA);

    t.end();
  });

  t.test('new', t => {
    result = color4.new(1, 2, 3, 4);

    t.equal_c4(result, [1, 2, 3, 4]);

    t.end();
  });

  t.test('copy', t => {
    result = color4.copy(out, colorA);

    t.equal_c4(out, [1, 2, 3, 4]);
    t.equal(result, out);

    t.end();
  });

  t.test('set', t => {
    result = color4.set(out, 1, 2, 3, 4);

    t.equal_c4(out, [1, 2, 3, 4]);
    t.equal(result, out);

    t.end();
  });

  t.test('fromHex', t => {
    result = color4.fromHex(out, 0x7fff7fff);

    t.equal_c4(out, [127/255, 1, 127/255, 1]);
    t.equal(result, out);

    t.end();
  });

  t.test('add', t => {
    t.test('with a separate output color', t => {
      result = color4.add(out, colorA, colorB);

      t.equal_c4(out, [6, 8, 10, 12]);
      t.equal(result, out);
      t.equal_c4(colorA, [1, 2, 3, 4]);
      t.equal_c4(colorB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color4.add(colorA, colorA, colorB);

      t.equal_c4(colorA, [6, 8, 10, 12]);
      t.equal(result, colorA);
      t.equal_c4(colorB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when colorB is the output color', t => {
      result = color4.add(colorB, colorA, colorB);

      t.equal_c4(colorB, [6, 8, 10, 12]);
      t.equal(result, colorB);
      t.equal_c4(colorA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('subtract', t => {
    t.equal(color4.sub, color4.subtract);

    t.test('with a separate output color', t => {
      result = color4.subtract(out, colorA, colorB);

      t.equal_c4(out, [-4, -4, -4, -4]);
      t.equal(result, out);
      t.equal_c4(colorA, [1, 2, 3, 4]);
      t.equal_c4(colorB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color4.subtract(colorA, colorA, colorB);

      t.equal_c4(colorA, [-4, -4, -4, -4]);
      t.equal(result, colorA);
      t.equal_c4(colorB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when colorB is the output color', t => {
      result = color4.subtract(colorB, colorA, colorB);

      t.equal_c4(colorB, [-4, -4, -4, -4]);
      t.equal(result, colorB);
      t.equal_c4(colorA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('multiply', t => {
    t.equal(color4.mul, color4.multiply);

    t.test('with a separate output color', t => {
      result = color4.multiply(out, colorA, colorB);

      t.equal_c4(out, [5, 12, 21, 32]);
      t.equal(result, out);
      t.equal_c4(colorA, [1, 2, 3, 4]);
      t.equal_c4(colorB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color4.multiply(colorA, colorA, colorB);

      t.equal_c4(colorA, [5, 12, 21, 32]);
      t.equal(result, colorA);
      t.equal_c4(colorB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when colorB is the output color', t => {
      result = color4.multiply(colorB, colorA, colorB);

      t.equal_c4(colorB, [5, 12, 21, 32]);
      t.equal(result, colorB);
      t.equal_c4(colorA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('divide', t => {
    t.equal(color4.div, color4.divide);

    t.test('with a separate output color', t => {
      result = color4.divide(out, colorA, colorB);

      t.equal_c4(out, [0.2, 0.333333, 0.428571, 0.5]);
      t.equal(result, out);
      t.equal_c4(colorA, [1, 2, 3, 4]);
      t.equal_c4(colorB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color4.divide(colorA, colorA, colorB);

      t.equal_c4(colorA, [0.2, 0.333333, 0.428571, 0.5]);
      t.equal(result, colorA);
      t.equal_c4(colorB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when colorB is the output color', t => {
      result = color4.divide(colorB, colorA, colorB);

      t.equal_c4(colorB, [0.2, 0.333333, 0.428571, 0.5]);
      t.equal(result, colorB);
      t.equal_c4(colorA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('scale', t => {
    t.test('with a separate output color', t => {
      result = color4.scale(out, colorA, 2);

      t.equal_c4(out, [2, 4, 6, 8]);
      t.equal(result, out);
      t.equal_c4(colorA, [1, 2, 3, 4]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color4.scale(colorA, colorA, 2);

      t.equal_c4(colorA, [2, 4, 6, 8]);
      t.equal(result, colorA);

      t.end();
    });

    t.end();
  });

  t.test('lerp', t => {
    t.test('with a separate output color', t => {
      result = color4.lerp(out, colorA, colorB, 0.5);

      t.equal_c4(out, [3, 4, 5, 6]);
      t.equal(result, out);
      t.equal_c4(colorA, [1, 2, 3, 4]);
      t.equal_c4(colorB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when colorA is the output color', t => {
      result = color4.lerp(colorA, colorA, colorB, 0.5);

      t.equal_c4(colorA, [3, 4, 5, 6]);
      t.equal(result, colorA);
      t.equal_c4(colorB, [5, 6, 7, 8]);

      t.end();
    });

    t.test('when colorB is the output color', t => {
      result = color4.lerp(colorB, colorA, colorB, 0.5);

      t.equal_c4(colorB, [3, 4, 5, 6]);
      t.equal(result, colorB);
      t.equal_c4(colorA, [1, 2, 3, 4]);

      t.end();
    });

    t.end();
  });

  t.test('str', t => {
    result = color4.str(colorA);

    t.equal(result, 'color4(1, 2, 3, 4)');

    t.end();
  });

  t.test('array', t => {
    result = color4.array([], colorA);

    t.deepEqual(result, new Float32Array([1, 2, 3, 4]));

    t.end();
  });

  t.test('exactEquals', t => {
    color4.set(colorA, 0, 1, 2, 3);
    color4.set(colorB, 0, 1, 2, 3);
    let colorC = color4.new(1, 2, 3, 4);
    let r0 = color4.exactEquals(colorA, colorB);
    let r1 = color4.exactEquals(colorA, colorC);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal_c4(colorA, [0, 1, 2, 3]);
    t.equal_c4(colorB, [0, 1, 2, 3]);

    t.end();
  });

  t.test('equals', t => {
    color4.set(colorA, 0, 1, 2, 3);
    color4.set(colorB, 0, 1, 2, 3);

    let colorC = color4.new(1, 2, 3, 4);
    let vecD = color4.new(1e-16, 1, 2, 3);
    let r0 = color4.equals(colorA, colorB);
    let r1 = color4.equals(colorA, colorC);
    let r2 = color4.equals(colorA, vecD);

    t.equal(r0, true);
    t.equal(r1, false);
    t.equal(r2, true);
    t.equal_c4(colorA, [0, 1, 2, 3]);
    t.equal_c4(colorB, [0, 1, 2, 3]);

    t.end();
  });

  t.test('hex', t => {
    color4.set(colorA, 0.5, 1, 0.5, 1);

    t.equal(color4.hex(colorA), 0x7fff7fff);

    color4.set(colorA, 1, 1, 1, 0);

    t.equal(color4.hex(colorA), 0xffffff00);

    t.end();
  });

  t.end();
});
