precision highp float;
#pragma glslify: cnoise2 = require(glsl-noise/classic/2d)
//#pragma glslify: noise = require(glsl-noise/simplex/2d)
//#pragma glslify: ease = require(glsl-easings/sine-in)

uniform float u_time;
uniform vec2 resolution;
uniform vec2 pointer;
uniform sampler2D uTexture;

//varying vec2 v_texCoord;

vec2 effect(vec2 p) {
  p *= 1.0;

  float m = 0.2;
  float timedelta = 0.02 + pointer.y * 0.01;

  vec2 a = vec2(
    cnoise2(p + vec2(u_time * timedelta, u_time * timedelta) * m),
    cnoise2(p + vec2(1.6, 0.2) * m)
  );

  vec2 b = vec2(
    cnoise2(p + 10.0 * a + vec2(0.0 + u_time * timedelta, 0.0 + u_time * timedelta) * m),
    cnoise2(p * a + vec2(0.0 + u_time * timedelta, 0.0 + u_time * timedelta) * m)
  );

  return vec2(
    cnoise2(a + b)
  );
}

void main(void) {
  float xp = pointer.x;
  float yp = pointer.y;

  vec2 scale = vec2(1.0, 1.0);
  vec2 offset = vec2(0.0, 1.0);

  vec2 uv = (gl_FragCoord.xy / resolution.xy) * scale + offset;

  //uv = uv / step(-2.0, pointer);

  gl_FragColor = texture2D(uTexture,
    effect(1.0 - uv)
  );

  // float x = gl_FragCoord.x / resolution.x;

  // x = x * scale + offset;

  //gl_FragColor = mix(startColor, endColor, uv.x + (n * intensity));
}




// float pattern(vec2 p, out vec2 rs) {

//   vec2 q = vec2(perlin_noise(p + vec2(0* 0.1 + time, 0 * 0.1 + time) * perlinMult), perlin_noise(p + vec2(5.2, 1.3) * perlinMult));
//   vec2 r = vec2(perlin_noise(p + 4.0 * q + vec2(1.7 + time, 9.2 + time) * perlinMult), perlin_noise(p + 4.0 * q + vec2(8.2 + time, 2.8 + time) * perlinMult));

//   rs = vec2(r);
//   return perlin_noise(r * 1.0 + q);

// }


// vec3 makeColored(vec2 p) {

//   vec2 on = vec2(0.0);
//   float f = pattern(p * 0.5, on);
//   //float f = sPattern(p*10.0, on);

//   vec4 tex = texture2D(u_image, on.xy);

//   vec3 col = vec3(0.0);

//   col = clamp(tex.rgb * f * 2.5, 0.0, 1.0);

//   return col;

// }

// void main() {

//   vec3 nze = makeColored(vec2(gl_FragCoord.x / res.x - 0/ 5.0, gl_FragCoord.y / res.x + 0 / 5.0));

//   gl_FragColor = vec4(nze, 1.0);

// }
