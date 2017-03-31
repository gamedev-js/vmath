## vmath

[![Travis CI Status](https://travis-ci.org/gamedev-js/vmath.svg?branch=master)](https://travis-ci.org/gamedev-js/vmath)

Yet another gl-matrix but smaller (without SIMD) and faster (use Hidden class instead of Float32Array).

## Why?

  - Hidden classes + inline caching is much faster than Array/Float32Array.
  - Remove SIMD for smaller footprint.
  - Make sure using the column-major matrix for all calculation.

## Install

```bash
npm install vmath
```

## Documentation

TODO

## License

MIT © 2017 Johnny Wu