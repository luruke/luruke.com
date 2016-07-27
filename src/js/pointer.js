class Pointer {
  constructor() {
    this.coords = {
      x: 0,
      y: 0
    }

    this.bind();
  }

  bind() {
    this.onMouseMove = this.onMouseMove.bind(this)
    window.addEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove(e) {
    this.coords = {
      x: e.clientX,
      y: e.clientY
    }
  }
}

module.exports = Pointer
