const WebGiel = require('./webgiel')
const BgFrag = require('../shaders/bg.frag')
const BgVert = require('../shaders/bg.vert')
//const imageSrc = require('file!../images/bg.jpg')

class Bg {
  constructor() {
    this.canvas = document.querySelector('.bg-canvas')
    this.webgiel = new WebGiel(this.canvas, BgFrag, BgVert)
    this.loadTexture()
  }

  loadTexture() {
    const gl = this.webgiel.gl
    const image = new Image()
    const texture = gl.createTexture()

    image.onload = () => {
      var texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

      this.webgiel.render()
    }

    image.src = 'static/bg.jpg'
  }
}

new Bg()
