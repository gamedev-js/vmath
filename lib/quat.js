import vec3 from './vec3';
import vec4 from './vec4';
import mat3 from './mat3';

class _quat {
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}

/**
 * @class Quaternion
 * @name quat
 */
let quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function () {
  return new _quat(0, 0, 0, 1);
};

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.new = vec4.new;

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function (out) {
  out.x = 0;
  out.y = 0;
  out.z = 0;
  out.w = 1;
  return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function () {
  let tmpvec3 = vec3.create();
  let xUnitVec3 = vec3.new(1, 0, 0);
  let yUnitVec3 = vec3.new(0, 1, 0);

  return function (out, a, b) {
    let dot = vec3.dot(a, b);
    if (dot < -0.999999) {
      vec3.cross(tmpvec3, xUnitVec3, a);
      if (vec3.length(tmpvec3) < 0.000001) {
        vec3.cross(tmpvec3, yUnitVec3, a);
      }
      vec3.normalize(tmpvec3, tmpvec3);
      quat.fromAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out.x = 0;
      out.y = 0;
      out.z = 0;
      out.w = 1;
      return out;
    } else {
      vec3.cross(tmpvec3, a, b);
      out.x = tmpvec3.x;
      out.y = tmpvec3.y;
      out.z = tmpvec3.z;
      out.w = 1 + dot;
      return quat.normalize(out, out);
    }
  };
})();

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  fromAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
quat.getAxisAngle = function (out_axis, q) {
  let rad = Math.acos(q.w) * 2.0;
  let s = Math.sin(rad / 2.0);
  if (s != 0.0) {
    out_axis.x = q.x / s;
    out_axis.y = q.y / s;
    out_axis.z = q.z / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis.x = 1;
    out_axis.y = 0;
    out_axis.z = 0;
  }
  return rad;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function (out, a, b) {
  let ax = a.x, ay = a.y, az = a.z, aw = a.w,
      bx = b.x, by = b.y, bz = b.z, bw = b.w;

  out.x = ax * bw + aw * bx + ay * bz - az * by;
  out.y = ay * bw + aw * by + az * bx - ax * bz;
  out.z = az * bw + aw * bz + ax * by - ay * bx;
  out.w = aw * bw - ax * bx - ay * by - az * bz;
  return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
  rad *= 0.5;

  let ax = a.x, ay = a.y, az = a.z, aw = a.w,
      bx = Math.sin(rad), bw = Math.cos(rad);

  out.x = ax * bw + aw * bx;
  out.y = ay * bw + az * bx;
  out.z = az * bw - ay * bx;
  out.w = aw * bw - ax * bx;
  return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
  rad *= 0.5;

  let ax = a.x, ay = a.y, az = a.z, aw = a.w,
      by = Math.sin(rad), bw = Math.cos(rad);

  out.x = ax * bw - az * by;
  out.y = ay * bw + aw * by;
  out.z = az * bw + ax * by;
  out.w = aw * bw - ay * by;
  return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
  rad *= 0.5;

  let ax = a.x, ay = a.y, az = a.z, aw = a.w,
      bz = Math.sin(rad), bw = Math.cos(rad);

  out.x = ax * bw + ay * bz;
  out.y = ay * bw - ax * bz;
  out.z = az * bw + aw * bz;
  out.w = aw * bw - az * bz;
  return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
  let x = a.x, y = a.y, z = a.z;

  out.x = x;
  out.y = y;
  out.z = z;
  out.w = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations

  let ax = a.x, ay = a.y, az = a.z, aw = a.w,
      bx = b.x, by = b.y, bz = b.z, bw = b.w;

  let omega, cosom, sinom, scale0, scale1;

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  // adjust signs (if necessary)
  if (cosom < 0.0) {
    cosom = -cosom;
    bx = - bx;
    by = - by;
    bz = - bz;
    bw = - bw;
  }
  // calculate coefficients
  if ((1.0 - cosom) > 0.000001) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  }
  // calculate final values
  out.x = scale0 * ax + scale1 * bx;
  out.y = scale0 * ay + scale1 * by;
  out.z = scale0 * az + scale1 * bz;
  out.w = scale0 * aw + scale1 * bw;

  return out;
};

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
quat.sqlerp = (function () {
  let temp1 = quat.create();
  let temp2 = quat.create();

  return function (out, a, b, c, d, t) {
    quat.slerp(temp1, a, d, t);
    quat.slerp(temp2, b, c, t);
    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));

    return out;
  };
}());

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function (out, a) {
  let a0 = a.x, a1 = a.y, a2 = a.z, a3 = a.w;
  let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  let invDot = dot ? 1.0 / dot : 0;

  // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out.x = -a0 * invDot;
  out.y = -a1 * invDot;
  out.z = -a2 * invDot;
  out.w = a3 * invDot;
  return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
  out.x = -a.x;
  out.y = -a.y;
  out.z = -a.z;
  out.w = a.w;
  return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} xAxis the vector representing the local "right" direction
 * @param {vec3} yAxis the vector representing the local "up" direction
 * @param {vec3} zAxis the vector representing the viewing direction
 * @returns {quat} out
 */
quat.fromAxes = (function () {
  let matr = mat3.create();

  return function (out, xAxis, yAxis, zAxis) {
    mat3.set(
      matr,
      xAxis.x, xAxis.y, xAxis.z,
      yAxis.x, yAxis.y, yAxis.z,
      zAxis.x, zAxis.y, zAxis.z
    );
    return quat.normalize(out, quat.fromMat3(out, matr));
  };
})();

/**
* Calculates a quaternion from view direction and up direction
*
* @param {quat} out mat3 receiving operation result
* @param {vec3} view view direction (must be normalized)
* @param {vec3} [up] up direction, default is (0,1,0) (must be normalized)
*
* @returns {quat} out
*/
quat.fromViewUp = (function () {
  let matr = mat3.create();

  return function (out, view, up) {
    mat3.fromViewUp(matr, view, up);
    if (!matr) {
      return null;
    }

    return quat.normalize(out, quat.fromMat3(out, matr));
  };
})();

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.fromAxisAngle = function (out, axis, rad) {
  rad = rad * 0.5;
  let s = Math.sin(rad);
  out.x = s * axis.x;
  out.y = s * axis.y;
  out.z = s * axis.z;
  out.w = Math.cos(rad);
  return out;
};

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function (out, m) {
  // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

  let m00 = m.m00, m01 = m.m03, m02 = m.m06,
      m10 = m.m01, m11 = m.m04, m12 = m.m07,
      m20 = m.m02, m21 = m.m05, m22 = m.m08;

  let trace = m00 + m11 + m22;

  if (trace > 0) {
    let s = 0.5 / Math.sqrt(trace + 1.0);

    out.w = 0.25 / s;
    out.x = (m21 - m12) * s;
    out.y = (m02 - m20) * s;
    out.z = (m10 - m01) * s;

  } else if ((m00 > m11) && (m00 > m22)) {
    let s = 2.0 * Math.sqrt(1.0 + m00 - m11 - m22);

    out.w = (m21 - m12) / s;
    out.x = 0.25 * s;
    out.y = (m01 + m10) / s;
    out.z = (m02 + m20) / s;

  } else if (m11 > m22) {
    let s = 2.0 * Math.sqrt(1.0 + m11 - m00 - m22);

    out.w = (m02 - m20) / s;
    out.x = (m01 + m10) / s;
    out.y = 0.25 * s;
    out.z = (m12 + m21) / s;

  } else {
    let s = 2.0 * Math.sqrt(1.0 + m22 - m00 - m11);

    out.w = (m10 - m01) / s;
    out.x = (m02 + m20) / s;
    out.y = (m12 + m21) / s;
    out.z = 0.25 * s;
  }

  return out;
};

/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */
quat.fromEuler = function (out, x, y, z) {
  let halfToRad = 0.5 * Math.PI / 180.0;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;

  let sx = Math.sin(x);
  let cx = Math.cos(x);
  let sy = Math.sin(y);
  let cy = Math.cos(y);
  let sz = Math.sin(z);
  let cz = Math.cos(z);

  out.x = sx * cy * cz - cx * sy * sz;
  out.y = cx * sy * cz + sx * cy * sz;
  out.z = cx * cy * sz - sx * sy * cz;
  out.w = cx * cy * cz + sx * sy * sz;

  return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
  return `quat(${a.x}, ${a.y}, ${a.z}, ${a.w})`;
};

/**
 * Returns typed array
 *
 * @param {array} out
 * @param {quat} q
 * @returns {array}
 */
quat.array = function (out, q) {
  out[0] = q.x;
  out[1] = q.y;
  out[2] = q.z;
  out[3] = q.w;

  return out;
};

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.exactEquals = vec4.exactEquals;

/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.equals = vec4.equals;

export default quat;