var DIVIDER = 330

var canvas = document.createElement('canvas')
var context = canvas.getContext('2d')
var center = { x: null, y: null }
var mouse = { x: null, y: null }
var scalar, radius

// utilities

function formatColorPiece (n) {
  var result = Math.floor(n * 0xff).toString(16)

  if (result.length === 1) {
    return '0' + result
  } else {
    return result
  }
}

function generateColor (t) {
  var red = (Math.sin((t / DIVIDER) + 5) + 1) / 2
  var green = (Math.sin((t / DIVIDER) + 10) + 1) / 2
  var blue = (Math.sin((t / DIVIDER) + 15) + 1) / 2

  return '#' +
    formatColorPiece(red) +
    formatColorPiece(green) +
    formatColorPiece(blue)
}

// "make canvas fill screen" bits

function makeCanvasFillScreen () {
  var dpi = window.devicePixelRatio

  canvas.width = window.innerWidth * dpi
  canvas.height = window.innerHeight * dpi
  canvas.style.width = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'

  center.x = Math.round(window.innerWidth / 2)
  center.y = Math.round(window.innerHeight / 2)

  scalar = Math.min(window.innerWidth, window.innerHeight)
}

document.body.appendChild(canvas)
makeCanvasFillScreen()
window.addEventListener('resize', makeCanvasFillScreen, false)

// update mouse stuff

mouse.x = center.x
mouse.y = center.y

document.body.addEventListener('mousemove', function (event) {
  mouse.x = event.clientX
  mouse.y = event.clientY
}, false)

canvas.addEventListener('click', function () {
  context.clearRect(0, 0, canvas.width, canvas.height)
}, false)

// tick

function tick (t) {
  var angle = (t / DIVIDER) % (2 * Math.PI)

  var dx = mouse.x - center.x
  var dy = mouse.y - center.y
  radius = Math.sqrt(dx * dx + dy * dy)

  context.strokeStyle = generateColor(t)
  context.lineWidth = scalar / 50

  context.beginPath()
  context.arc(center.x, center.y, radius, angle, angle + 1)
  context.stroke()

  window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)
