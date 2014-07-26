square = (n) -> n * n

G = 1

canvas = document.createElement("canvas")
context = canvas.getContext "2d"
$("body").append canvas
document.body.appendChild(canvas)

$(window).on "resize", ->
  pixelRatio = window.devicePixelRatio or 1
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width * pixelRatio
  canvas.height = height * pixelRatio
  canvas.style.width = width + "px"
  canvas.style.height = height + "px"
$(window).trigger "resize"

currentPlanet = null
$(canvas).on "mousedown", (event) ->
  currentPlanet = new Planet
    x: event.clientX
    y: event.clientY
  planets.push currentPlanet
$(canvas).on "mouseup", ->
  currentPlanet = null

planets = []
ticker (dt) ->

  currentPlanet?.grow(dt)

  for planetA, i in planets

    planetA.tick(dt)
    planetA.draw(context)
    
    for planetB, j in planets when j > i

      m1 = planetA.radius
      m2 = planetB.radius

      xdiff = planetA.x - planetB.x
      ydiff = planetA.y - planetB.y
      r2 = square(xdiff) + square(ydiff)

      angle = Math.sin(ydiff)
      accelerationA = G * m2 / r2
      accelerationB = G * m1 / r2
