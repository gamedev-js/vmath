const tap = require('./tap');
const { bits } = require('../dist/vmath');

const INT_MAX = bits.INT_MAX, INT_MIN = bits.INT_MIN;

tap.test('bits', t => {
  t.test('sign', t => {
    t.equal(bits.sign(-100), -1);
    t.equal(bits.sign(100), 1);
    t.equal(bits.sign(0), 0);
    t.equal(bits.sign(bits.INT_MAX), 1);
    t.equal(bits.sign(bits.INT_MIN), -1);
    t.end();
  });

  t.test('abs', t => {
    t.equal(bits.abs(0), 0);
    t.equal(bits.abs(1), 1);
    t.equal(bits.abs(-1), 1);
    t.equal(bits.abs(bits.INT_MAX), bits.INT_MAX);
    t.equal(bits.abs(-bits.INT_MAX), bits.INT_MAX);
    t.end();
  });

  t.test('min', t => {
    t.equal(bits.min(0, 0), 0);
    t.equal(bits.min(-1, 1), -1);
    t.equal(bits.min(INT_MAX, INT_MAX), INT_MAX);
    t.equal(bits.min(INT_MIN, INT_MIN), INT_MIN);
    t.equal(bits.min(INT_MAX, INT_MIN), INT_MIN);
    t.end();
  });

  t.test('max', t => {
    t.equal(bits.max(0, 0), 0);
    t.equal(bits.max(-1, 1), 1);
    t.equal(bits.max(INT_MAX, INT_MAX), INT_MAX);
    t.equal(bits.max(INT_MIN, INT_MIN), INT_MIN);
    t.equal(bits.max(INT_MAX, INT_MIN), INT_MAX);
    t.end();
  });

  t.test('isPow2', t => {
    t.ok(!bits.isPow2(0));
    for (var i = 0; i < 31; ++i) {
      t.ok(bits.isPow2((1 << i)));
    }
    t.ok(!bits.isPow2(100));
    t.ok(!bits.isPow2(0x7fffffff));
    t.ok(!bits.isPow2(-1000000));
    t.end();
  });

  t.test('log2', t => {
    for (var i = 0; i < 31; ++i) {
      if (i > 0) {
        t.equal(bits.log2((1 << i) - 1), i - 1);
        t.equal(bits.log2((1 << i) + 1), i);
      }
      t.equal(bits.log2((1 << i)), i);
    }
    t.end();
  });

  t.test('popCount', t => {
    t.equal(bits.popCount(0), 0);
    t.equal(bits.popCount(1), 1);
    t.equal(bits.popCount(-1), 32);
    for (var i = 0; i < 31; ++i) {
      t.equal(bits.popCount(1 << i), 1);
      t.equal(bits.popCount((1 << i) - 1), i);
    }
    t.equal(bits.popCount(0xf0f00f0f), 16);
    t.end();
  });

  t.test('countTrailingZeros', t => {
    t.equal(bits.countTrailingZeros(0), 32);
    t.equal(bits.countTrailingZeros(1), 0);
    t.equal(bits.countTrailingZeros(-1), 0);
    for (var i = 0; i < 31; ++i) {
      t.equal(bits.countTrailingZeros(1 << i), i);
      if (i > 0) {
        t.equal(bits.countTrailingZeros((1 << i) - 1), 0);
      }
    }
    t.equal(bits.countTrailingZeros(0xf81700), 8);
    t.end();
  });

  t.test('nextPow2', t => {
    for (var i = 0; i < 31; ++i) {
      if (i !== 1) {
        t.equal(bits.nextPow2((1 << i) - 1), 1 << i);
      }
      t.equal(bits.nextPow2((1 << i)), 1 << i);
      if (i < 30) {
        t.equal(bits.nextPow2((1 << i) + 1), 1 << (i + 1));
      }
    }
    t.end();
  });

  t.test('prevPow2', t => {
    for (var i = 0; i < 31; ++i) {
      if (i > 0) {
        t.equal(bits.prevPow2((1 << i) - 1), 1 << (i - 1));
      }
      t.equal(bits.prevPow2((1 << i)), 1 << i);
      if (0 < i && i < 30) {
        t.equal(bits.prevPow2((1 << i) + 1), 1 << i, 'i=' + i + ', ' + ((1 << i) + 1));
      }
    }
    t.end();
  });

  t.test('parity', t => {
    t.equal(bits.parity(1), 1);
    t.equal(bits.parity(0), 0);
    t.equal(bits.parity(0xf), 0);
    t.equal(bits.parity(0x10f), 1);
    t.end();
  });

  t.test('reverse', t => {
    t.equal(bits.reverse(0), 0);
    t.equal(bits.reverse(-1), -1);
    t.end();
  });

  t.test('nextCombination', t => {
    t.equal(bits.nextCombination(1), 2);
    t.equal(bits.nextCombination(0x300), 0x401);
    t.end();
  });

  t.test('interleave2', t => {
    for (let x = 0; x < 5; ++x) {
      for (let y = 0; y < 5; ++y) {
        let h = bits.interleave2(x, y);
        t.equal(bits.deinterleave2(h, 0), x);
        t.equal(bits.deinterleave2(h, 1), y);
      }
    }
    t.end();
  });

  t.test('interleave3', t => {
    for (let x = 0; x <= 5; ++x) {
      for (let y = 0; y <= 5; ++y) {
        for (let z = 0; z <= 5; ++z) {
          let h = bits.interleave3(x, y, z);
          t.equal(bits.deinterleave3(h, 0), x);
          t.equal(bits.deinterleave3(h, 1), y);
          t.equal(bits.deinterleave3(h, 2), z);
        }
      }
    }
    t.end();
  });

  t.end();
});