DAY_COLOR = Spectra('#c8caf9')
NIGHT_COLOR = Spectra('#3a224a')
SUN_COLOR = '#faac00'
NUM_TRIANGLES = 10

clamp = (n, min, max) ->
  if n < min
    return min
  else if n > max
    return max
  else
    return n

canvas = document.createElement("canvas")
context = canvas.getContext "2d"
$("body").append canvas
document.body.appendChild(canvas)

pixelRatio = window.devicePixelRatio or 1
$(window).on "resize", ->
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width * pixelRatio
  canvas.height = height * pixelRatio
  canvas.style.width = width + "px"
  canvas.style.height = height + "px"
$(window).trigger "resize"

mouse = mouseTracker(startX: canvas.width / 2, startY: canvas.height / 2)

ticker ->

  pyramidSize = Math.floor(canvas.width / NUM_TRIANGLES)
  bottom = canvas.height

  percentNight = (mouse.y / bottom) * 100
  context.fillStyle = DAY_COLOR.mix(NIGHT_COLOR, percentNight).hex()
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = SUN_COLOR
  context.beginPath()
  context.arc(mouse.x, mouse.y, pyramidSize / 3, 0, 2 * Math.PI)
  context.fill()

  context.fillStyle = Spectra('white').mix(Spectra('black'), percentNight).hex()

  for i in [0...NUM_TRIANGLES]

    leftSide = i * pyramidSize
    rightSide = leftSide + pyramidSize
    middle = leftSide + (pyramidSize / 2)

    topX = clamp(mouse.x, leftSide, rightSide)
    topY = clamp(mouse.y, bottom - pyramidSize, bottom)

    context.beginPath()
    context.moveTo(leftSide, bottom)
    context.lineTo(rightSide, bottom)
    context.lineTo(topX, topY)
    context.lineTo(i * pyramidSize, bottom)
    context.fill()
