canvas = document.querySelector('canvas')
context = canvas.getContext '2d'

do ->
  dpr = window.devicePixelRatio or 1
  canvas.width = dpr * innerWidth
  canvas.height = dpr * innerHeight
  canvas.style.width = innerWidth + 'px'
  canvas.style.height = innerHeight + 'px'

trunk = new Branch
  center:
    x: canvas.width / 2
    y: canvas.height / 2  # TODO this is temporary
  width: 200
  direction: Math.PI / 2

ticker (dt) ->
  dt /= 1000
  trunk.draw(context)
