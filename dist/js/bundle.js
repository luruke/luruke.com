/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(7);

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WebGiel = __webpack_require__(3);
	var BgFrag = __webpack_require__(5);
	var BgVert = __webpack_require__(6);
	//const imageSrc = require('file!../images/bg.jpg')

	var Bg = function () {
	  function Bg() {
	    _classCallCheck(this, Bg);

	    this.canvas = document.querySelector('.bg-canvas');
	    this.webgiel = new WebGiel(this.canvas, BgFrag, BgVert);
	    this.loadTexture();
	  }

	  _createClass(Bg, [{
	    key: 'loadTexture',
	    value: function loadTexture() {
	      var _this = this;

	      var gl = this.webgiel.gl;
	      var image = new Image();
	      var texture = gl.createTexture();

	      image.onload = function () {
	        var texture = gl.createTexture();
	        gl.bindTexture(gl.TEXTURE_2D, texture);

	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

	        _this.webgiel.render();
	      };

	      image.src = 'static/bg.jpg';
	    }
	  }]);

	  return Bg;
	}();

	new Bg();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Pointer = __webpack_require__(4);
	var PointerInstance = new Pointer();

	var WebGiel = function () {
	  function WebGiel(canvas, fragment, vertex) {
	    _classCallCheck(this, WebGiel);

	    this.canvas = canvas;
	    this.gl = this.initGL();
	    this.fragment = this.createShader(this.gl.FRAGMENT_SHADER, fragment);
	    this.vertex = this.createShader(this.gl.VERTEX_SHADER, vertex);
	    this.program = this.createProgram(this.fragment, this.vertex);

	    this.init();
	    this.onResize();
	    window.addEventListener('resize', this.onResize.bind(this));

	    // Init render
	    this.render = this.render.bind(this);
	    this.startTime = new Date().getTime();
	  }

	  _createClass(WebGiel, [{
	    key: 'initGL',
	    value: function initGL() {
	      var gl = void 0;

	      try {
	        gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
	      } catch (e) {}

	      if (!gl) {
	        console.error('WebGL not supported?');
	        gl = null;
	      }

	      return gl;
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	      // this.gl.enable(this.gl.DEPTH_TEST)
	      // this.gl.depthFunc(this.gl.LEQUAL)
	      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	      // this.gl.viewport(0, 0, this.width, this.height)

	      // Create vertex buffer (2 triangles covering whole viewport)
	      var buffer = this.gl.createBuffer();
	      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
	      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]), this.gl.STATIC_DRAW);

	      var vertex_position = this.gl.getAttribLocation(this.program, 'position');
	      this.gl.enableVertexAttribArray(vertex_position);
	      this.gl.vertexAttribPointer(vertex_position, 2, this.gl.FLOAT, false, 0, 0);
	    }
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	      this.width = window.innerWidth;
	      this.height = window.innerHeight;

	      this.canvas.width = this.width;
	      this.canvas.height = this.height;
	      this.gl.viewport(0, 0, this.width, this.height);
	    }
	  }, {
	    key: 'createProgram',
	    value: function createProgram(fragment, vertex) {
	      var program = this.gl.createProgram();
	      this.gl.attachShader(program, fragment);
	      this.gl.attachShader(program, vertex);
	      // this.gl.bindAttribLocation(program, 0, 'position')
	      this.gl.linkProgram(program);

	      // Delete shader after attached them?

	      if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
	        console.error(this.gl.getProgramInfoLog(program));
	        return;
	      }

	      this.gl.useProgram(program);

	      return program;
	    }
	  }, {
	    key: 'createShader',
	    value: function createShader(type, source) {
	      var shader = this.gl.createShader(type);

	      this.gl.shaderSource(shader, source);
	      this.gl.compileShader(shader);

	      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
	        console.error(this.gl.getShaderInfoLog(shader));
	        return;
	      }

	      return shader;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      window.requestAnimationFrame(this.render);

	      this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_time'), (new Date().getTime() - this.startTime) / 1000);
	      this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'resolution'), this.width, this.height);

	      var x = PointerInstance.coords.x / this.width;
	      var y = PointerInstance.coords.y / this.height;

	      this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'pointer'), x, y);

	      // Render geometry
	      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	    }
	  }]);

	  return WebGiel;
	}();

	module.exports = WebGiel;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Pointer = function () {
	  function Pointer() {
	    _classCallCheck(this, Pointer);

	    this.coords = {
	      x: 0,
	      y: 0
	    };

	    this.bind();
	  }

	  _createClass(Pointer, [{
	    key: 'bind',
	    value: function bind() {
	      this.onMouseMove = this.onMouseMove.bind(this);
	      window.addEventListener('mousemove', this.onMouseMove);
	    }
	  }, {
	    key: 'onMouseMove',
	    value: function onMouseMove(e) {
	      this.coords = {
	        x: e.clientX,
	        y: e.clientY
	      };
	    }
	  }]);

	  return Pointer;
	}();

	module.exports = Pointer;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "precision highp float;\n#define GLSLIFY 1\n//\n// GLSL textureless classic 2D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_1_0(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_1(vec4 x)\n{\n  return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_2(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade_1_3(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise_1_4(vec2 P)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod289_1_0(Pi); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute_1_1(permute_1_1(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy_1_5 = abs(gx) - 0.5 ;\n  vec4 tx_1_6 = floor(gx + 0.5);\n  gx = gx - tx_1_6;\n\n  vec2 g00 = vec2(gx.x,gy_1_5.x);\n  vec2 g10 = vec2(gx.y,gy_1_5.y);\n  vec2 g01 = vec2(gx.z,gy_1_5.z);\n  vec2 g11 = vec2(gx.w,gy_1_5.w);\n\n  vec4 norm = taylorInvSqrt_1_2(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade_1_3(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\n\n\n//#pragma glslify: noise = require(glsl-noise/simplex/2d)\n//#pragma glslify: ease = require(glsl-easings/sine-in)\n\nuniform float u_time;\nuniform vec2 resolution;\nuniform vec2 pointer;\nuniform sampler2D uTexture;\n\n//varying vec2 v_texCoord;\n\nvec2 effect(vec2 p) {\n  p *= 1.0;\n\n  float m = 0.2;\n  float timedelta = 0.02 + pointer.y * 0.01;\n\n  vec2 a = vec2(\n    cnoise_1_4(p + vec2(u_time * timedelta, u_time * timedelta) * m),\n    cnoise_1_4(p + vec2(1.6, 0.2) * m)\n  );\n\n  vec2 b = vec2(\n    cnoise_1_4(p + 10.0 * a + vec2(0.0 + u_time * timedelta, 0.0 + u_time * timedelta) * m),\n    cnoise_1_4(p * a + vec2(0.0 + u_time * timedelta, 0.0 + u_time * timedelta) * m)\n  );\n\n  return vec2(\n    cnoise_1_4(a + b)\n  );\n}\n\nvoid main(void) {\n  float xp = pointer.x;\n  float yp = pointer.y;\n\n  vec2 scale = vec2(1.0, 1.0);\n  vec2 offset = vec2(0.0, 1.0);\n\n  vec2 uv = (gl_FragCoord.xy / resolution.xy) * scale + offset;\n\n  //uv = uv / step(-2.0, pointer);\n\n  gl_FragColor = texture2D(uTexture,\n    effect(1.0 - uv)\n  );\n\n  // float x = gl_FragCoord.x / resolution.x;\n\n  // x = x * scale + offset;\n\n  //gl_FragColor = mix(startColor, endColor, uv.x + (n * intensity));\n}\n\n\n\n\n// float pattern(vec2 p, out vec2 rs) {\n\n//   vec2 q = vec2(perlin_noise(p + vec2(0* 0.1 + time, 0 * 0.1 + time) * perlinMult), perlin_noise(p + vec2(5.2, 1.3) * perlinMult));\n//   vec2 r = vec2(perlin_noise(p + 4.0 * q + vec2(1.7 + time, 9.2 + time) * perlinMult), perlin_noise(p + 4.0 * q + vec2(8.2 + time, 2.8 + time) * perlinMult));\n\n//   rs = vec2(r);\n//   return perlin_noise(r * 1.0 + q);\n\n// }\n\n\n// vec3 makeColored(vec2 p) {\n\n//   vec2 on = vec2(0.0);\n//   float f = pattern(p * 0.5, on);\n//   //float f = sPattern(p*10.0, on);\n\n//   vec4 tex = texture2D(u_image, on.xy);\n\n//   vec3 col = vec3(0.0);\n\n//   col = clamp(tex.rgb * f * 2.5, 0.0, 1.0);\n\n//   return col;\n\n// }\n\n// void main() {\n\n//   vec3 nze = makeColored(vec2(gl_FragCoord.x / res.x - 0/ 5.0, gl_FragCoord.y / res.x + 0 / 5.0));\n\n//   gl_FragColor = vec4(nze, 1.0);\n\n// }\n"

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform vec2 resolution;\n\nattribute vec3 position;\n// attribute vec2 a_texCoord;\n// varying vec2 v_texCoord;\n\nvoid main() {\n  // v_texCoord = a_texCoord;\n  gl_Position = vec4(position, 1.0);\n}\n"

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WebGiel = __webpack_require__(3);
	var frag = __webpack_require__(8);
	var vert = __webpack_require__(9);

	var Fog = function Fog() {
	  _classCallCheck(this, Fog);

	  this.canvas = document.querySelector('.fog-canvas');
	  this.webgiel = new WebGiel(this.canvas, frag, vert);
	  this.webgiel.render();
	};

	new Fog();

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\n#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_1(vec4 x) {\n     return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_2(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_4 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_5 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_5;\n  vec3 i1 = min( g_1_5.xyz, l.zxy );\n  vec3 i2 = max( g_1_5.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_4.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_0(i);\n  vec4 p = permute_1_1( permute_1_1( permute_1_1(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_4.wyz - D_1_4.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_6 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_7 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_6.xy,h.z);\n  vec3 p3 = vec3(a1_1_6.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_2(vec4(dot(p0_1_7,p0_1_7), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_7 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_7,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\nfloat quadraticIn_2_8(float t) {\n  return t * t;\n}\n\n\n\nuniform float u_time;\nuniform vec2 resolution;\n\nvec4 blue = vec4(0.0, 0.0, 0.0, 0.0);\nvec4 white = vec4(1.0, 1.0, 1.0, 1.0);\n\nvec2 scale = vec2(1.3, 1.3);\nvec2 offset = vec2(0.1, 0.1);\nfloat amount = 1.0;\nfloat persistence = 0.5;\nfloat speed = 10.0;\n\nfloat total;\nvec3 pos;\nfloat adjust;\n\nfloat slope = 1.0;\n\nvoid main(void) {\n  offset *= u_time;\n  pos = vec3((gl_FragCoord.xy / resolution.xy) * scale + offset, u_time / speed);\n\n  for(float i = 0.0; i < 3.0; i++) { // octaves\n    float frequency = pow(2.0, i);\n    float amplitude = pow(persistence, i);\n    adjust += amplitude;\n    total += snoise_1_3(pos * frequency) * amplitude;\n  }\n\n  total *= amount / adjust;\n  total = (total + 1.0) / 2.0;\n\n  //blue.a -= u_time * 0.16;\n  // if (u_time > 5.0) {\n  //   white -= (u_time - 3.0) * 0.1;\n  // }\n\n  slope = max(0.2, 2.3 - ((u_time) * 0.2));\n  vec4 color = mix(blue, white, total);\n  gl_FragColor = color * quadraticIn_2_8(slope);\n}\n"

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\n#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n  gl_Position = vec4(position, 1.0);\n}\n"

/***/ }
/******/ ]);