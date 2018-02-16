'use strict'

import PixelCanvas from './src/canvas'
import Canvas from 'canvas'
import express from 'express'
import path from 'path'
import fs from 'fs'
import socketio from 'socket.io'
import favicon from 'serve-favicon'

const port = 9999
const app = express()
const server = app.listen(port)
const io = socketio.listen(server)

const config = {
  width: 128,
  height: 128,
}

const Image = Canvas.Image
const image = new PixelCanvas(new Canvas, config.width, config.height)
loadImage("last_image.png")

app.set('view engine', 'ejs')
app.use('/dist', express.static('dist'))
app.use('/archive', express.static('views/archive'));
app.use(favicon('views/images/favicon.ico'));
app.get('/', (req, res) => { res.render('index', {config}) })
app.get('/archive', function(req, res) {
    const folder = './views/archive/';

    fs.readdir(folder, function(err, files){
      res.render('archive', {files});
    })
});

function saveImage(path){
  fs.writeFileSync(path, image.toBuffer());
}

function loadImage(imagePath){
  fs.readFile( imagePath, function(err, data){
    if (err){
      throw err
    }

    let img = new Image
    img.src = data
    image.replace(img)
  })
}

io.on('connection', socket => {
  socket.emit('init', { config })
  socket.emit('reload', { buffer: image.buffer })

  socket.on('reload', _ => socket.emit('reload', { buffer: image.buffer }))

  // TODO(flupe): time validation

  socket.on('upload', input => {
    let buf8 = new Uint8Array(image.buffer)
    buf8.set(input.buffer)
    socket.broadcast.emit('reload', input)
  })

  socket.on('pixel', input => {
    let { x, y, color } = input
    image.pixel(x, y, color)
    socket.broadcast.emit('pixel', input)
  })

  socket.on('rect', input => {
    let { x, y, width, height, color } = input
    image.rect(x, y, width, height, color)
    socket.broadcast.emit('rect', input)
  })
})

function save(){
  let timestamp = Date.now()
  saveImage("last_image.png")
  //saveImage("views/archive/"+timestamp+".png")
}

setInterval(save, 1000*10)