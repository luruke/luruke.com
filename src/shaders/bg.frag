precision highp float;
#pragma glslify: cnoise2 = require(glsl-noise/classic/2d)

uniform float u_time;
uniform vec2 resolution;
uniform vec2 pointer;
uniform sampler2D uTexture;

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

  gl_FragColor = texture2D(uTexture,
    effect(1.0 - uv)
  );
}
