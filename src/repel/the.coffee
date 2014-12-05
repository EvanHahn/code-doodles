canvas = document.querySelector('canvas')
context = canvas.getContext '2d'
dots = []

do ->
  dpr = window.devicePixelRatio or 1
  canvas.width = dpr * innerWidth
  canvas.height = dpr * innerHeight
  canvas.style.width = innerWidth + 'px'
  canvas.style.height = innerHeight + 'px'

do ->
  for x in [30...innerWidth] by 60
    for y in [30...innerHeight] by 60
      dots.push new Dot(x, y, 15)

for dot in dots
  dot.draw(context)
