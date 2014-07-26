{ Shape, Point, Path, Color } = Isomer
{ Prism, Pyramid } = Shape

WORLD_RANGE = [0..8]

canvas = document.querySelector("canvas")
context = canvas.getContext "2d"

{ width, height } = canvas

boxes = []
for x in WORLD_RANGE
  for y in WORLD_RANGE
    boxes.push
      height: Math.random() * 7 + 1
      period: Math.random() / 1000
      shift: Math.random() * 2 * Math.PI
      location: Point(x, y, 0)
      color: new Color(Math.random() * 255,
                        Math.random() * 255,
                        Math.random() * 255)

distanceBetween = (a, b) ->
  x = a.x - b.x
  y = a.y - b.y
  Math.sqrt(x * x + y * y)

boxes.sort (a, b) ->
  frontNumber = WORLD_RANGE[WORLD_RANGE.length - 1]
  theFront = { x: frontNumber, y: frontNumber }
  aDist = distanceBetween(a.location, theFront)
  bDist = distanceBetween(b.location, theFront)
  return aDist - bDist

ticker (dt, t) ->

  context.clearRect(0, 0, canvas.width, canvas.height)
  iso = new Isomer canvas

  for box in boxes
    height = Math.max(Math.sin(box.period * t + box.shift) * box.height, 0.01)
    iso.add Prism(box.location, 1, 1, height), box.color
