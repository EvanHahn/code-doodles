canvas = document.querySelector('canvas')
context = canvas.getContext '2d'

do ->
  dpr = window.devicePixelRatio or 1
  canvas.width = dpr * innerWidth
  canvas.height = dpr * innerHeight
  canvas.style.width = innerWidth + 'px'
  canvas.style.height = innerHeight + 'px'

trunk = new Branch
  center: { x: 300, y:300 }
#    x: canvas.width / 2
#    y: canvas.height
  width: 200
  direction: Math.PI / 2

ticker (dt) ->
  dt /= 1000
  trunk.draw(context)
  trunk.direction += 0.01
