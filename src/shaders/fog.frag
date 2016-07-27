precision mediump float;
#pragma glslify: noise = require(glsl-noise/simplex/3d)
#pragma glslify: ease = require(glsl-easings/quadratic-in)
uniform float u_time;
uniform vec2 resolution;

vec4 blue = vec4(0.0, 0.0, 0.0, 0.0);
vec4 white = vec4(1.0, 1.0, 1.0, 1.0);

vec2 scale = vec2(1.3, 1.3);
vec2 offset = vec2(0.1, 0.1);
float amount = 1.0;
float persistence = 0.5;
float speed = 10.0;

float total;
vec3 pos;
float adjust;

float slope = 1.0;

void main(void) {
  offset *= u_time;
  pos = vec3((gl_FragCoord.xy / resolution.xy) * scale + offset, u_time / speed);

  for(float i = 0.0; i < 3.0; i++) { // octaves
    float frequency = pow(2.0, i);
    float amplitude = pow(persistence, i);
    adjust += amplitude;
    total += noise(pos * frequency) * amplitude;
  }

  total *= amount / adjust;
  total = (total + 1.0) / 2.0;

  //blue.a -= u_time * 0.16;
  // if (u_time > 5.0) {
  //   white -= (u_time - 3.0) * 0.1;
  // }

  slope = max(0.2, 2.3 - ((u_time) * 0.2));
  vec4 color = mix(blue, white, total);
  gl_FragColor = color * ease(slope);
}
