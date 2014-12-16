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
    y: canvas.height
  width: 200
  direction: Math.PI / 2

updateBranch = (branch, dt) ->
  branch.update(dt)
  branch.draw(context)
  updateBranch(child, dt) for child in branch.children

ticker (dt) ->
  dt /= 1000
  context.clearRect(0, 0, canvas.width, canvas.height)
  updateBranch(trunk, dt)
