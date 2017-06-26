/* global Mouse, Particle */

const canvas = document.querySelector('canvas')
const instructions = document.getElementById('instructions')
const ctx = canvas.getContext('2d')

let screen
let mouse = new Mouse()
const entities = [mouse]
let lastTime

function makeCanvasFillScreen () {
  const dpi = window.devicePixelRatio || 1
  const width = window.innerWidth * dpi
  const height = window.innerHeight * dpi

  canvas.width = width
  canvas.height = height
  canvas.style.width = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'

  screen = {
    dpi: dpi,
    width: width,
    height: height,
    thinner: Math.min(width, height),
    center: {
      x: Math.floor(width / 2),
      y: Math.floor(height / 2)
    }
  }
}
window.addEventListener('resize', makeCanvasFillScreen)
makeCanvasFillScreen()

document.body.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX * screen.dpi
  mouse.y = event.clientY * screen.dpi

  if (!mouse.hasEverMoved) {
    instructions.classList.add('hidden')
    mouse.hasEverMoved = true

    setTimeout(() => {
      if (!mouse.hasEverClicked) {
        instructions.innerHTML = 'try clicking'
        instructions.classList.remove('hidden')
      }
    }, 10000)
  }
})
document.body.addEventListener('mousedown', () => {
  canvas.style.backgroundColor = RED_COLOR
  mouse.isClicking = true
  mouse.hasEverClicked = true
  instructions.classList.add('hidden')
})
document.body.addEventListener('mouseup', () => {
  canvas.style.backgroundColor = PURPLE_COLOR
  mouse.isClicking = false
})
mouse.x = screen.center.x
mouse.y = screen.center.y

canvas.style.backgroundColor = PURPLE_COLOR
ctx.strokeStyle = '#ffffff'

function newParticle () {
  const p = new Particle({
    x: Math.random() * screen.width,
    y: Math.random() * screen.height
  })

  for (let i = 0; i < entities.length; i++) {
    if (entities[i].destroyed) {
      entities[i] = p
      return
    }
  }

  entities.push(p)
}

function tick (t) {
  let dt
  if (lastTime == null) {
    dt = 0
  } else {
    dt = t - lastTime
  }
  lastTime = t

  ctx.clearRect(0, 0, screen.width, screen.height)
  ctx.shadowBlur = screen.thinner / 50
  ctx.shadowColor = 'rgba(255, 255, 255, 0.7)'

  if (dt < 20) {
    newParticle()
  }

  const context = { dt, ctx, mouse, screen }
  entities.forEach((e) => {
    if (!e.destroyed) {
      e.tick(context)
    }
  })

  window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)
