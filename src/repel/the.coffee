canvas = document.querySelector('canvas')
context = canvas.getContext '2d'
dots = []
mouse = { x: -1000, y: -1000 }

do ->
  dpr = window.devicePixelRatio or 1
  canvas.width = dpr * innerWidth
  canvas.height = dpr * innerHeight
  canvas.style.width = innerWidth + 'px'
  canvas.style.height = innerHeight + 'px'

do ->
  step = 35
  radius = (step / 2) - 2
  for x in [(step / 2)...(innerWidth + step * 2)] by step
    for y in [0...(innerHeight + step * 2)] by step
      dots.push new Dot(x, y, radius)

canvas.addEventListener 'mousemove', (event) ->
  [mouse.x, mouse.y] = [event.clientX, event.clientY]

ticker (dtRaw) ->
  dt = dtRaw / 1000
  context.clearRect(0, 0, canvas.width, canvas.height)
  for dot in dots
    dot.update(dt)
    dot.draw(context)
