const WebGiel = require('./webgiel')
const frag = require('../shaders/fog.frag')
const vert = require('../shaders/fog.vert')

class Fog {
  constructor() {
    this.canvas = document.querySelector('.fog-canvas')
    this.webgiel = new WebGiel(this.canvas, frag, vert)
    this.webgiel.render()
  }
}

new Fog()
