{ Shape, Point, Path, Color } = Isomer
{ Prism, Pyramid, Cylinder } = Shape

WORLD_RANGE = [0..8]

canvas = document.querySelector("canvas")
context = canvas.getContext "2d"

{ width, height } = canvas

randomHeight = -> Math.random() * 3 + 1
randomColor = -> new Color(Math.random() * 255,
                           Math.random() * 255,
                           Math.random() * 255)

boxes = []
for x in WORLD_RANGE
  for y in WORLD_RANGE
    boxes.push
      location: Point(x, y, 0)
      height: randomHeight()
      color: randomColor()

distanceBetween = (a, b) ->
  x = a.x - b.x
  y = a.y - b.y
  Math.sqrt(x * x + y * y)

frontNumber = WORLD_RANGE[WORLD_RANGE.length - 1]
theFront = { x: frontNumber, y: frontNumber }
distanceFromFront = (point) -> distanceBetween(theFront, point)

centerNumber = Math.round(frontNumber / 2)
theCenter = { x: centerNumber, y: centerNumber }
distanceFromCenter = (point) -> distanceBetween(theCenter, point)

boxes.sort (a, b) ->
  aDist = distanceFromFront(a.location)
  bDist = distanceFromFront(b.location)
  return aDist - bDist

ticker (dt, t) ->

  context.clearRect(0, 0, canvas.width, canvas.height)
  iso = new Isomer canvas

  for box in boxes

    height = Math.max(
      Math.sin(t / 1000 - distanceFromCenter(box.location)) * box.height,
      .1
    )
    if height is .1
      box.height = randomHeight()

    scalar = height / box.height
    alpha = Math.max(scalar, 0.2)
    box.color.a = alpha

    iso.add Pyramid(box.location, .9, .9, height), box.color
