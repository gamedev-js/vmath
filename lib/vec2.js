import { EPSILON, random } from './utils';

class _vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
let vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function () {
  return new _vec2(0, 0);
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.new = function (x, y) {
  return new _vec2(x, y);
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function (a) {
  return new _vec2(a.x, a.y);
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function (out, a) {
  out.x = a.x;
  out.y = a.y;
  return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function (out, x, y) {
  out.x = x;
  out.y = y;
  return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function (out, a, b) {
  out.x = a.x + b.x;
  out.y = a.y + b.y;
  return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function (out, a, b) {
  out.x = a.x - b.x;
  out.y = a.y - b.y;
  return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function (out, a, b) {
  out.x = a.x * b.x;
  out.y = a.y * b.y;
  return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function (out, a, b) {
  out.x = a.x / b.x;
  out.y = a.y / b.y;
  return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
vec2.ceil = function (out, a) {
  out.x = Math.ceil(a.x);
  out.y = Math.ceil(a.y);
  return out;
};

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
vec2.floor = function (out, a) {
  out.x = Math.floor(a.x);
  out.y = Math.floor(a.y);
  return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function (out, a, b) {
  out.x = Math.min(a.x, b.x);
  out.y = Math.min(a.y, b.y);
  return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function (out, a, b) {
  out.x = Math.max(a.x, b.x);
  out.y = Math.max(a.y, b.y);
  return out;
};

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
vec2.round = function (out, a) {
  out.x = Math.round(a.x);
  out.y = Math.round(a.y);
  return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function (out, a, b) {
  out.x = a.x * b;
  out.y = a.y * b;
  return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function (out, a, b, scale) {
  out.x = a.x + (b.x * scale);
  out.y = a.y + (b.y * scale);
  return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function (a, b) {
  let x = b.x - a.x,
      y = b.y - a.y;
  return Math.sqrt(x * x + y * y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function (a, b) {
  let x = b.x - a.x,
      y = b.y - a.y;
  return x * x + y * y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
  let x = a.x,
      y = a.y;
  return Math.sqrt(x * x + y * y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
  let x = a.x,
      y = a.y;
  return x * x + y * y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function (out, a) {
  out.x = -a.x;
  out.y = -a.y;
  return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverse = function (out, a) {
  out.x = 1.0 / a.x;
  out.y = 1.0 / a.y;
  return out;
};

/**
 * Returns the inverse of the components of a vec2 safely
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverseSafe = function (out, a) {
  let x = a.x,
      y = a.y;

  if (Math.abs(x) < EPSILON) {
    out.x = 0;
  } else {
    out.x = 1.0 / x;
  }

  if (Math.abs(y) < EPSILON) {
    out.y = 0;
  } else {
    out.y = 1.0 / a.y;
  }

  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function (out, a) {
  let x = a.x,
      y = a.y;
  let len = x * x + y * y;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out.x = a.x * len;
    out.y = a.y * len;
  }
  return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
  return a.x * b.x + a.y * b.y;
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function (out, a, b) {
  let z = a.x * b.y - a.y * b.x;
  out.x = out.y = 0;
  out.z = z;
  return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
  let ax = a.x,
      ay = a.y;
  out.x = ax + t * (b.x - ax);
  out.y = ay + t * (b.y - ay);
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
  scale = scale || 1.0;
  let r = random() * 2.0 * Math.PI;
  out.x = Math.cos(r) * scale;
  out.y = Math.sin(r) * scale;
  return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function (out, a, m) {
  let x = a.x,
      y = a.y;
  out.x = m.m00 * x + m.m02 * y;
  out.y = m.m01 * x + m.m03 * y;
  return out;
};

/**
 * Transforms the vec2 with a mat23
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat23} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat23 = function (out, a, m) {
  let x = a.x,
      y = a.y;
  out.x = m.m00 * x + m.m02 * y + m.m04;
  out.y = m.m01 * x + m.m03 * y + m.m05;
  return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function (out, a, m) {
  let x = a.x,
      y = a.y;
  out.x = m.m00 * x + m.m03 * y + m.m06;
  out.y = m.m01 * x + m.m04 * y + m.m07;
  return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function (out, a, m) {
  let x = a.x,
      y = a.y;
  out.x = m.m00 * x + m.m04 * y + m.m12;
  out.y = m.m01 * x + m.m05 * y + m.m13;
  return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function () {
  let vec = vec2.create();

  return function (a, stride, offset, count, fn, arg) {
    let i, l;
    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min((count * stride) + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec.x = a[i]; vec.y = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec.x; a[i + 1] = vec.y;
    }

    return a;
  };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
  return `vec2(${a.x}, ${a.y})`;
};

/**
 * Returns typed array
 *
 * @param {array} out
 * @param {vec2} v
 * @returns {array}
 */
vec2.array = function (out, v) {
  out[0] = v.x;
  out[1] = v.y;

  return out;
};

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.exactEquals = function (a, b) {
  return a.x === b.x && a.y === b.y;
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.equals = function (a, b) {
  let a0 = a.x, a1 = a.y;
  let b0 = b.x, b1 = b.y;
  return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
    Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)));
};

export default vec2;