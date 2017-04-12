export * from './lib/utils';

// NOTE: there is no syntax for: export {* as bits} from './lib/bits';
import * as bits_ from './lib/bits';
export let bits = bits_;

export { default as vec2 } from './lib/vec2';
export { default as vec3 } from './lib/vec3';
export { default as vec4 } from './lib/vec4';
export { default as quat } from './lib/quat';
export { default as mat2 } from './lib/mat2';
export { default as mat23 } from './lib/mat23';
export { default as mat3 } from './lib/mat3';
export { default as mat4 } from './lib/mat4';