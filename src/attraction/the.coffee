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
  entities.push currentPlanet
$(canvas).on "mouseup", ->
  currentPlanet = null

entities = []
ticker (dt) ->

  currentPlanet?.grow(dt)

  for entity in entities
    entity.tick?(dt)
    entity.draw?(context)
