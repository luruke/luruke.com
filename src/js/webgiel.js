const Pointer = require('./pointer')
const PointerInstance = new Pointer()

class WebGiel {
  constructor(canvas, fragment, vertex) {
    this.canvas = canvas
    this.gl = this.initGL()
    this.fragment = this.createShader(this.gl.FRAGMENT_SHADER, fragment)
    this.vertex = this.createShader(this.gl.VERTEX_SHADER, vertex)
    this.program = this.createProgram(this.fragment, this.vertex)

    this.init()
    this.onResize()
    window.addEventListener('resize', this.onResize.bind(this))

    // Init render
    this.render = this.render.bind(this)
    this.startTime = new Date().getTime()
  }

  initGL() {
    let gl

    try {
      gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl')
    } catch(e) {}


    if (!gl) {
      console.error('WebGL not supported?')
      gl = null
    }

    return gl
  }

  init() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
    // this.gl.enable(this.gl.DEPTH_TEST)
    // this.gl.depthFunc(this.gl.LEQUAL)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    // this.gl.viewport(0, 0, this.width, this.height)

    // Create vertex buffer (2 triangles covering whole viewport)
    const buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER,
        new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
             1.0, -1.0,
             1.0,  1.0,
            -1.0,  1.0
        ]),
        this.gl.STATIC_DRAW
    )

    const vertex_position = this.gl.getAttribLocation(this.program, 'position')
    this.gl.enableVertexAttribArray(vertex_position)
    this.gl.vertexAttribPointer(vertex_position, 2, this.gl.FLOAT, false, 0, 0)
  }

  onResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.canvas.width = this.width
    this.canvas.height = this.height
    this.gl.viewport(0, 0, this.width, this.height)
  }

  createProgram(fragment, vertex) {
    const program = this.gl.createProgram()
    this.gl.attachShader(program, fragment)
    this.gl.attachShader(program, vertex)
    // this.gl.bindAttribLocation(program, 0, 'position')
    this.gl.linkProgram(program)

    // Delete shader after attached them?

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error(this.gl.getProgramInfoLog(program))
      return
    }

    this.gl.useProgram(program)

    return program
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type)

    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(shader))
      return
    }

    return shader
  }

  render() {
    window.requestAnimationFrame(this.render)

    this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'u_time'), ((new Date().getTime()) - this.startTime) / 1000)
    this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'resolution'), this.width, this.height)

    const x = PointerInstance.coords.x / this.width
    const y = PointerInstance.coords.y / this.height

    this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'pointer'), x, y)

    // Render geometry
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
  }
}

module.exports = WebGiel;
