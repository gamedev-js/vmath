import { EPSILON } from './utils';

/**
 * NOTE: we use column-major matrix for all matrix calculation.
 *
 * This may lead to some confusion when referencing OpenGL documentation,
 * however, which represents out all matricies in column-major format.
 * This means that while in code a matrix may be typed out as:
 *
 * [1, 0, 0, 0,
 *  0, 1, 0, 0,
 *  0, 0, 1, 0,
 *  x, y, z, 0]
 *
 * The same matrix in the [OpenGL documentation](https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glTranslate.xml)
 * is written as:
 *
 *  1 0 0 x
 *  0 1 0 y
 *  0 0 1 z
 *  0 0 0 0
 *
 * Please rest assured, however, that they are the same thing!
 * This is not unique to glMatrix, either, as OpenGL developers have long been confused by the
 * apparent lack of consistency between the memory layout and the documentation.
 */

class _mat3 {
  constructor(m00, m01, m02, m03, m04, m05, m06, m07, m08) {
    this.m00 = m00;
    this.m01 = m01;
    this.m02 = m02;
    this.m03 = m03;
    this.m04 = m04;
    this.m05 = m05;
    this.m06 = m06;
    this.m07 = m07;
    this.m08 = m08;
  }
}

/**
 * @class 3x3 Matrix
 * @name mat3
 */
let mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function () {
  return new _mat3(
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  );
};

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
mat3.new = function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  return new _mat3(
    m00, m01, m02,
    m10, m11, m12,
    m20, m21, m22
  );
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function (a) {
  return new _mat3(
    a.m00, a.m01, a.m02,
    a.m03, a.m04, a.m05,
    a.m06, a.m07, a.m08
  );
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function (out, a) {
  out.m00 = a.m00;
  out.m01 = a.m01;
  out.m02 = a.m02;
  out.m03 = a.m03;
  out.m04 = a.m04;
  out.m05 = a.m05;
  out.m06 = a.m06;
  out.m07 = a.m07;
  out.m08 = a.m08;
  return out;
};

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
mat3.set = function (out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out.m00 = m00;
  out.m01 = m01;
  out.m02 = m02;
  out.m03 = m10;
  out.m04 = m11;
  out.m05 = m12;
  out.m06 = m20;
  out.m07 = m21;
  out.m08 = m22;
  return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function (out) {
  out.m00 = 1;
  out.m01 = 0;
  out.m02 = 0;
  out.m03 = 0;
  out.m04 = 1;
  out.m05 = 0;
  out.m06 = 0;
  out.m07 = 0;
  out.m08 = 1;
  return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function (out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    let a01 = a.m01, a02 = a.m02, a12 = a.m05;
    out.m01 = a.m03;
    out.m02 = a.m06;
    out.m03 = a01;
    out.m05 = a.m07;
    out.m06 = a02;
    out.m07 = a12;
  } else {
    out.m00 = a.m00;
    out.m01 = a.m03;
    out.m02 = a.m06;
    out.m03 = a.m01;
    out.m04 = a.m04;
    out.m05 = a.m07;
    out.m06 = a.m02;
    out.m07 = a.m05;
    out.m08 = a.m08;
  }

  return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function (out, a) {
  let a00 = a.m00, a01 = a.m01, a02 = a.m02,
      a10 = a.m03, a11 = a.m04, a12 = a.m05,
      a20 = a.m06, a21 = a.m07, a22 = a.m08;

  let b01 = a22 * a11 - a12 * a21;
  let b11 = -a22 * a10 + a12 * a20;
  let b21 = a21 * a10 - a11 * a20;

  // Calculate the determinant
  let det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out.m00 = b01 * det;
  out.m01 = (-a22 * a01 + a02 * a21) * det;
  out.m02 = (a12 * a01 - a02 * a11) * det;
  out.m03 = b11 * det;
  out.m04 = (a22 * a00 - a02 * a20) * det;
  out.m05 = (-a12 * a00 + a02 * a10) * det;
  out.m06 = b21 * det;
  out.m07 = (-a21 * a00 + a01 * a20) * det;
  out.m08 = (a11 * a00 - a01 * a10) * det;
  return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function (out, a) {
  let a00 = a.m00, a01 = a.m01, a02 = a.m02,
      a10 = a.m03, a11 = a.m04, a12 = a.m05,
      a20 = a.m06, a21 = a.m07, a22 = a.m08;

  out.m00 = (a11 * a22 - a12 * a21);
  out.m01 = (a02 * a21 - a01 * a22);
  out.m02 = (a01 * a12 - a02 * a11);
  out.m03 = (a12 * a20 - a10 * a22);
  out.m04 = (a00 * a22 - a02 * a20);
  out.m05 = (a02 * a10 - a00 * a12);
  out.m06 = (a10 * a21 - a11 * a20);
  out.m07 = (a01 * a20 - a00 * a21);
  out.m08 = (a00 * a11 - a01 * a10);
  return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
  let a00 = a.m00, a01 = a.m01, a02 = a.m02,
      a10 = a.m03, a11 = a.m04, a12 = a.m05,
      a20 = a.m06, a21 = a.m07, a22 = a.m08;

  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
  let a00 = a.m00, a01 = a.m01, a02 = a.m02,
      a10 = a.m03, a11 = a.m04, a12 = a.m05,
      a20 = a.m06, a21 = a.m07, a22 = a.m08;

  let b00 = b.m00, b01 = b.m01, b02 = b.m02;
  let b10 = b.m03, b11 = b.m04, b12 = b.m05;
  let b20 = b.m06, b21 = b.m07, b22 = b.m08;

  out.m00 = b00 * a00 + b01 * a10 + b02 * a20;
  out.m01 = b00 * a01 + b01 * a11 + b02 * a21;
  out.m02 = b00 * a02 + b01 * a12 + b02 * a22;

  out.m03 = b10 * a00 + b11 * a10 + b12 * a20;
  out.m04 = b10 * a01 + b11 * a11 + b12 * a21;
  out.m05 = b10 * a02 + b11 * a12 + b12 * a22;

  out.m06 = b20 * a00 + b21 * a10 + b22 * a20;
  out.m07 = b20 * a01 + b21 * a11 + b22 * a21;
  out.m08 = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function (out, a, v) {
  let a00 = a.m00, a01 = a.m01, a02 = a.m02,
      a10 = a.m03, a11 = a.m04, a12 = a.m05,
      a20 = a.m06, a21 = a.m07, a22 = a.m08;
  let x = v.x, y = v.y;

  out.m00 = a00;
  out.m01 = a01;
  out.m02 = a02;

  out.m03 = a10;
  out.m04 = a11;
  out.m05 = a12;

  out.m06 = x * a00 + y * a10 + a20;
  out.m07 = x * a01 + y * a11 + a21;
  out.m08 = x * a02 + y * a12 + a22;
  return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
  let a00 = a.m00, a01 = a.m01, a02 = a.m02,
      a10 = a.m03, a11 = a.m04, a12 = a.m05,
      a20 = a.m06, a21 = a.m07, a22 = a.m08;

  let s = Math.sin(rad);
  let c = Math.cos(rad);

  out.m00 = c * a00 + s * a10;
  out.m01 = c * a01 + s * a11;
  out.m02 = c * a02 + s * a12;

  out.m03 = c * a10 - s * a00;
  out.m04 = c * a11 - s * a01;
  out.m05 = c * a12 - s * a02;

  out.m06 = a20;
  out.m07 = a21;
  out.m08 = a22;
  return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function (out, a, v) {
  let x = v.x, y = v.y;

  out.m00 = x * a.m00;
  out.m01 = x * a.m01;
  out.m02 = x * a.m02;

  out.m03 = y * a.m03;
  out.m04 = y * a.m04;
  out.m05 = y * a.m05;

  out.m06 = a.m06;
  out.m07 = a.m07;
  out.m08 = a.m08;
  return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function (out, a) {
  out.m00 = a.m00;
  out.m01 = a.m01;
  out.m02 = a.m02;
  out.m03 = a.m04;
  out.m04 = a.m05;
  out.m05 = a.m06;
  out.m06 = a.m08;
  out.m07 = a.m09;
  out.m08 = a.m10;
  return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
mat3.fromTranslation = function (out, v) {
  out.m00 = 1;
  out.m01 = 0;
  out.m02 = 0;
  out.m03 = 0;
  out.m04 = 1;
  out.m05 = 0;
  out.m06 = v.x;
  out.m07 = v.y;
  out.m08 = 1;
  return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.fromRotation = function (out, rad) {
  let s = Math.sin(rad), c = Math.cos(rad);

  out.m00 = c;
  out.m01 = s;
  out.m02 = 0;

  out.m03 = -s;
  out.m04 = c;
  out.m05 = 0;

  out.m06 = 0;
  out.m07 = 0;
  out.m08 = 1;
  return out;
};

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
mat3.fromScaling = function (out, v) {
  out.m00 = v.x;
  out.m01 = 0;
  out.m02 = 0;

  out.m03 = 0;
  out.m04 = v.y;
  out.m05 = 0;

  out.m06 = 0;
  out.m07 = 0;
  out.m08 = 1;
  return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function (out, a) {
  out.m00 = a.m00;
  out.m01 = a.m01;
  out.m02 = 0;

  out.m03 = a.m02;
  out.m04 = a.m03;
  out.m05 = 0;

  out.m06 = a.m04;
  out.m07 = a.m05;
  out.m08 = 1;
  return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
  let x = q.x, y = q.y, z = q.z, w = q.w;
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let yx = y * x2;
  let yy = y * y2;
  let zx = z * x2;
  let zy = z * y2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  out.m00 = 1 - yy - zz;
  out.m03 = yx - wz;
  out.m06 = zx + wy;

  out.m01 = yx + wz;
  out.m04 = 1 - xx - zz;
  out.m07 = zy - wx;

  out.m02 = zx - wy;
  out.m05 = zy + wx;
  out.m08 = 1 - xx - yy;

  return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
  let a00 = a.m00, a01 = a.m01, a02 = a.m02, a03 = a.m03,
      a10 = a.m04, a11 = a.m05, a12 = a.m06, a13 = a.m07,
      a20 = a.m08, a21 = a.m09, a22 = a.m10, a23 = a.m11,
      a30 = a.m12, a31 = a.m13, a32 = a.m14, a33 = a.m15;

  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out.m01 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out.m02 = (a10 * b10 - a11 * b08 + a13 * b06) * det;

  out.m03 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out.m04 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out.m05 = (a01 * b08 - a00 * b10 - a03 * b06) * det;

  out.m06 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out.m07 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out.m08 = (a30 * b04 - a31 * b02 + a33 * b00) * det;

  return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
  return `mat3(${a.m00}, ${a.m01}, ${a.m02}, ${a.m03}, ${a.m04}, ${a.m05}, ${a.m06}, ${a.m07}, ${a.m08})`;
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
  return (Math.sqrt(Math.pow(a.m00, 2) + Math.pow(a.m01, 2) + Math.pow(a.m02, 2) + Math.pow(a.m03, 2) + Math.pow(a.m04, 2) + Math.pow(a.m05, 2) + Math.pow(a.m06, 2) + Math.pow(a.m07, 2) + Math.pow(a.m08, 2)));
};

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.add = function (out, a, b) {
  out.m00 = a.m00 + b.m00;
  out.m01 = a.m01 + b.m01;
  out.m02 = a.m02 + b.m02;
  out.m03 = a.m03 + b.m03;
  out.m04 = a.m04 + b.m04;
  out.m05 = a.m05 + b.m05;
  out.m06 = a.m06 + b.m06;
  out.m07 = a.m07 + b.m07;
  out.m08 = a.m08 + b.m08;
  return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.subtract = function (out, a, b) {
  out.m00 = a.m00 - b.m00;
  out.m01 = a.m01 - b.m01;
  out.m02 = a.m02 - b.m02;
  out.m03 = a.m03 - b.m03;
  out.m04 = a.m04 - b.m04;
  out.m05 = a.m05 - b.m05;
  out.m06 = a.m06 - b.m06;
  out.m07 = a.m07 - b.m07;
  out.m08 = a.m08 - b.m08;
  return out;
};

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
mat3.sub = mat3.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
mat3.multiplyScalar = function (out, a, b) {
  out.m00 = a.m00 * b;
  out.m01 = a.m01 * b;
  out.m02 = a.m02 * b;
  out.m03 = a.m03 * b;
  out.m04 = a.m04 * b;
  out.m05 = a.m05 * b;
  out.m06 = a.m06 * b;
  out.m07 = a.m07 * b;
  out.m08 = a.m08 * b;
  return out;
};

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
mat3.multiplyScalarAndAdd = function (out, a, b, scale) {
  out.m00 = a.m00 + (b.m00 * scale);
  out.m01 = a.m01 + (b.m01 * scale);
  out.m02 = a.m02 + (b.m02 * scale);
  out.m03 = a.m03 + (b.m03 * scale);
  out.m04 = a.m04 + (b.m04 * scale);
  out.m05 = a.m05 + (b.m05 * scale);
  out.m06 = a.m06 + (b.m06 * scale);
  out.m07 = a.m07 + (b.m07 * scale);
  out.m08 = a.m08 + (b.m08 * scale);
  return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.exactEquals = function (a, b) {
  return a.m00 === b.m00 && a.m01 === b.m01 && a.m02 === b.m02 &&
    a.m03 === b.m03 && a.m04 === b.m04 && a.m05 === b.m05 &&
    a.m06 === b.m06 && a.m07 === b.m07 && a.m08 === b.m08;
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.equals = function (a, b) {
  let a0 = a.m00, a1 = a.m01, a2 = a.m02, a3 = a.m03, a4 = a.m04, a5 = a.m05, a6 = a.m06, a7 = a.m07, a8 = a.m08;
  let b0 = b.m00, b1 = b.m01, b2 = b.m02, b3 = b.m03, b4 = b.m04, b5 = b.m05, b6 = b.m06, b7 = b.m07, b8 = b.m08;
  return (
    Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
    Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
    Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
    Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
    Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
    Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
    Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
    Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
    Math.abs(a8 - b8) <= EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8))
  );
};

export default mat3;