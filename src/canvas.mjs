export default class Canvas {
  constructor(cvs, width, height) {
    this.cvs = cvs
    this.ctx = this.cvs.getContext('2d')

    this.cvs.width = width
    this.cvs.height = height

    this.data = this.ctx.createImageData(width, height)
    this.buffer = this.data.data.buffer
    this.buf32 = new Uint32Array(this.buffer)
  }

  updateCanvas() {
    this.ctx.putImageData(this.data, 0, 0)
  }

  updateBuffers() {
    this.data = this.ctx.getImageData(0, 0, this.cvs.width, this.cvs.height)
    this.buffer = this.data.data.buffer
    this.buf32 = new Uint32Array(this.buffer)
  }

  replace(img) {
    this.ctx.imageSmoothingEnabled = false
    this.ctx.drawImage(img, 0, 0, this.cvs.width, this.cvs.height)
    this.updateBuffers()
  }

  pixel(x, y, color) {
    let offset = x + y * this.cvs.width
    this.buf32[offset] = color.hex
    this.updateCanvas()
  }

  rect(x, y, width, height, color) {
    this.ctx.fillStyle = color.string
    this.ctx.fillRect(x, y, width, height)
    this.updateBuffers()
  }

  toBuffer(){
    return this.cvs.toBuffer();
  }
}


export let handler = methods => ({
  get: (target, name) => {
    if (Object.keys(methods).includes(name)) {
      console.log(name)
      return function(...args) {
        target[name](...args)
        methods[name](...args)
      }
    }
    else return target[name]
  }
})
