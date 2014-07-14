$body = $(document.body)

canvas = bigOlCanvas()
context = canvas.getContext "2d"
$body.append canvas

pool = new Poolboy()
mouse = mouseTracker()
colorIndex = -1
backgroundColor = "#ffffff"

makeDroplet = (x, y) ->
  pool.create(Droplet, colorIndex, mouse.x, mouse.y)

mouseDown = no
$body.on "mousedown", ->
  mouseDown = yes
  colorIndex += 1
  backgroundColor = makeColor(colorIndex + 1).lighten(30).hex()
$body.on "mouseup", ->
  mouseDown = no

new Ticker (dt) ->

  $body.css("background-color", backgroundColor)
  context.clearRect(0, 0, canvas.width, canvas.height)

  pool.each (swimmer) ->
    swimmer.tick(dt)
    swimmer.draw(context)

  pool.create(Droplet, colorIndex, mouse.x, mouse.y) if mouseDown
