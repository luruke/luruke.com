uniform vec2 resolution;

attribute vec3 position;
// attribute vec2 a_texCoord;
// varying vec2 v_texCoord;

void main() {
  // v_texCoord = a_texCoord;
  gl_Position = vec4(position, 1.0);
}
