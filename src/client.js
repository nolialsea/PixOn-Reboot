import io from 'socket.io-client'
import Canvas, { handler } from './canvas'
import Palette from './palette'

const { round, max, min, floor, abs } = Math
const on = (target, ...args) => target.addEventListener(...args)

const WIDTH = 128
const HEIGHT = 128


const image = new Canvas(document.createElement('canvas'), WIDTH, HEIGHT)
const socket = io.connect(window.location.host)

// TODO(flupe): temporary, factor this out as soon as I can
// (noli): some work done, still not right

let palette
let squares =  []


function loadPalette(pal) {
  palette = pal.map(([r, g, b]) => ({
    hex: 0xff000000 | b << 16 | g << 8 | r,
    string: `rgba(${r},${g},${b},1)`
  }))

  palette.primary = 1
  palette.secondary = 0

  squares = []
  let paletteElement = document.getElementById('palette')
  while (paletteElement.hasChildNodes()) {
      paletteElement.removeChild(paletteElement.lastChild);
  }
  
  let container = new DocumentFragment

  palette.forEach((c, k) => {

    let square = document.createElement('span')
    square.className = 'square'
    squares.push(square)
    if (k == palette.primary)
      square.className += ' primary'
    if (k == palette.secondary)
      square.className += ' secondary'
    square.style.background = c.string
    container.appendChild(square)
    on(square, 'click', e => {
      e.preventDefault();
      if (e.ctrlKey) {
        squares[palette.secondary].className='square'+(palette.secondary==palette.primary?' primary':'')
        squares[k].className += ' secondary'
        palette.secondary = k
      }
      else {
        squares[palette.primary].className='square'+(palette.secondary==palette.primary?' secondary':'')
        squares[k].className += ' primary'
        palette.primary = k
      }
    })
  })

  document.getElementById('palette').appendChild(container)
}
loadPalette(Palette.palette)

let color = b => palette[b ? palette.secondary : palette.primary]


const proxy = new Proxy(image, handler({
  rect: (x, y, width, height, color) => {
    socket.emit('rect', { x, y, width, height, color })
  },
  pixel: (x, y, color) => {
    socket.emit('pixel', { x, y, color })
  },
  replace: _ => {
    socket.emit('upload', { buffer: image.buffer })
  }
}))


const viewport = {
  setCursor(type) {
    this.cvs.style.cursor = type
    this.cvs.style.cursor = '-webkit-' + type
  },
  offset: { x: 0, y: 0 },
  flip: { x: 1, y: 1 },
  scale: 3,
}

viewport.cvs = document.createElement('canvas')
viewport.ctx = viewport.cvs.getContext('2d')

viewport.resize = _ => {
  viewport.cvs.width = window.innerWidth
  viewport.cvs.height = window.innerHeight
  viewport.update()
}

viewport.update = function() {
  let { ctx, cvs, offset, flip, scale } = viewport

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, cvs.width, cvs.height)

  ctx.save()
  ctx.translate(cvs.width / 2 + offset.x | 0, cvs.height / 2 + offset.y | 0)
  ctx.scale(scale * flip.x, scale * flip.y)
  ctx.translate(- WIDTH / 2, - HEIGHT / 2)

  ctx.imageSmoothingEnabled = false
  ctx.drawImage(image.cvs, 0, 0, WIDTH, HEIGHT)

  ctx.globalCompositeOperation = 'xor'
  ctx.strokeStyle = '#fff'
  ctx.strokeRect(0 - .5, 0 - .5, WIDTH + 1, HEIGHT + 1)

  tool.dispatch('render')

  ctx.restore()
}

document.body.appendChild(viewport.cvs)


const pointer = { x: 0, y: 0, down: false }

pointer.update = e => {
  let { cvs, offset, flip, scale } = viewport
  pointer.x = floor((e.pageX - cvs.width / 2 - offset.x) / scale * flip.x + WIDTH / 2)
  pointer.y = floor((e.pageY - cvs.height / 2 - offset.y) / scale * flip.y + HEIGHT / 2)
}


const tool = {}
let current = null

tool.dispatch = (method, ...args) => {
  if (current && current[method]) {
    current[method].apply(current, args)
  }
}

function switchTool(next) {
  let previous = current
  current = next
  tool.dispatch('init', previous)
}

tool.pen = {
  init: _ => viewport.setCursor('crosshair'),
  mousemove: e => {
    if (!pointer.down) return

    let { cvs, offset, flip, scale } = viewport
    let { x, y } = pointer

    if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
      proxy.pixel(x, y, color(e.ctrlKey))
      viewport.update()
    }
  },
  keydown: ({key}) => { if (key == 'Alt') switchTool(tool.translate) }
}


// TODO(flupe): remove this as a tool
//              and rather make it a tool `modifier`
tool.translate = {
  origin: { x: 0, y: 0 },
  moving: false,
  previous: null,
  init: function(previous) {
    viewport.setCursor('grab')
    this.previous = previous
  },
  mousedown: function({ pageX, pageY }) {
    viewport.setCursor('grabbing')
    this.moving = true
    this.origin.x = pageX
    this.origin.y = pageY
  },
  mouseup: function() {
    viewport.setCursor('grab')
    this.moving = false
  },
  mousemove: function({ pageX, pageY }) {
    if (!this.moving) return
    viewport.offset.x += pageX - this.origin.x
    viewport.offset.y += pageY - this.origin.y
    this.origin.x = pageX
    this.origin.y = pageY
    viewport.update()
  },
  keyup: function({ key }) {
    if (key == 'Alt') {
      switchTool(this.previous)
    }
  }
}


// TODO(flupe): GUI
tool.rectangle = {
  init: _ => viewport.setCursor('crosshair'),
  origin: { x: 0, y: 0 },
  drawing: false,
  mousedown: function(e) {
    this.drawing = true
    this.origin.x = pointer.x
    this.origin.y = pointer.y
  },
  mouseup: function(e) {
    if (!this.drawing) return
    this.drawing = false

    let x = max(min(this.origin.x, pointer.x), 0)
    let y = max(min(this.origin.y, pointer.y), 0)
    let width = min(max(this.origin.x, pointer.x), image.cvs.width - 1) - x + 1
    let height = min(max(this.origin.y, pointer.y), image.cvs.height - 1) - y + 1

    proxy.rect(x, y, width, height, color(e.ctrlKey))
    viewport.update()
  },
  render: function() {
    if (!this.drawing) return

    let x = max(min(this.origin.x, pointer.x), 0)
    let y = max(min(this.origin.y, pointer.y), 0)
    let width = min(max(this.origin.x, pointer.x), image.cvs.width - 1) - x
    let height = min(max(this.origin.y, pointer.y), image.cvs.height - 1) - y

    let { ctx } = viewport

    // TODO(flupe): for the life of me figure out why xor is not working
    ctx.strokeStyle = '#fff'
    ctx.globalCompositeOperation = 'xor'
    ctx.strokeRect(x + .5, y + .5, width, height)
  }
}


switchTool(tool.pen)

socket.on('reload', ({ buffer }) => {
  image.buf32.set(new Uint32Array(buffer))
  image.updateCanvas()
  viewport.update()
})

socket.on('pixel', ({ x, y, color }) => {
  image.pixel(x, y, color)
  viewport.update()
})

socket.on('rect', ({ x, y, width, height, color }) => {
  image.rect(x, y, width, height, color)
  viewport.update()
})


// TODO(flupe): add touch gestures
//              apparently the Pointer API is far from mature yet
on(window, 'mousemove', e => {
  pointer.update(e)
  tool.dispatch('mousemove', e)
  viewport.update()
})

on(window, 'mousedown', e => {
  pointer.update(e)
  pointer.down = true
  tool.dispatch('mousedown', e)
})

on(window, 'mouseup', e => {
  pointer.update(e)
  pointer.down = false
  tool.dispatch('mouseup', e)
})

on(window, 'keydown', e => {
  
  if (e.key == '+' && e.ctrlKey) {
    e.preventDefault()
    viewport.scale += 1
    viewport.update()
  }
  else if (e.key == '-' && e.ctrlKey) {
    e.preventDefault()
    viewport.scale = max(viewport.scale - 1, 1)
    viewport.update()
  }
  else if (e.key == '+'){
    loadPalette(Palette.nextPalette)
  }
  else if (e.key == '-'){
    loadPalette(Palette.prevPalette)
  }
  else if (e.key == 'r')
    switchTool(tool.rectangle)
  else if (e.key == 'b')
    switchTool(tool.pen)

  else if (e.key == 'f') {
    viewport.flip.x *= -1
    viewport.update()
  }
  else if (e.key == 'F') {
    viewport.flip.y *= -1
    viewport.update()
  }

  else tool.dispatch('keydown', e)
})

on(window, 'keyup', e => tool.dispatch('keyup', e))
on(window, 'resize', viewport.resize)
on(window, 'dragover', e => e.preventDefault())
on(window, 'drop', e => {
  e.preventDefault()
  let dt = e.dataTransfer
  let item = dt.items ? dt.items[0] : dt.files[0]
  if (!item.type.startsWith('image/')) return
  let reader = new FileReader()
  on(reader, 'load', e => {
    let img = new Image()
    on(img, 'load', _ => {
      proxy.replace(img)
      viewport.update()
    })
    img.src = e.target.result
  })
  reader.readAsDataURL(item.getAsFile())
})

viewport.resize()
