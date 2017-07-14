import * as utils from './lib/utils';

// NOTE: there is no syntax for: export {* as bits} from './lib/bits';
import * as bits from './lib/bits';
import vec2 from './lib/vec2';
import vec3 from './lib/vec3';
import vec4 from './lib/vec4';
import quat from './lib/quat';
import mat2 from './lib/mat2';
import mat23 from './lib/mat23';
import mat3 from './lib/mat3';
import mat4 from './lib/mat4';
import color3 from './lib/color3';
import color4 from './lib/color4';

let vmath = {
  bits,
  vec2,
  vec3,
  vec4,
  quat,
  mat2,
  mat23,
  mat3,
  mat4,
  color3,
  color4,
};
Object.assign(vmath, utils);

export default vmath;