canvas = document.querySelector('canvas')
context = canvas.getContext '2d'

makeCanvasFillScreen = ->
  dpr = window.devicePixelRatio or 1
  canvas.width = dpr * innerWidth
  canvas.height = dpr * innerHeight
  canvas.style.width = innerWidth + 'px'
  canvas.style.height = innerHeight + 'px'
makeCanvasFillScreen()
window.addEventListener 'resize', makeCanvasFillScreen

trunk = null
okayToMakeNewTrunk = false
newTrunk = ->
  trunk = new Branch
    color: Spectra.random()
    center:
      x: canvas.width / 2
      y: canvas.height
    width: 50
    maxHeight: canvas.height * Math.max(Math.random(), 0.5)
    direction: Math.PI / 2
  okayToMakeNewTrunk = false
  setTimeout ->
    okayToMakeNewTrunk = true
  , 1000

updateBranch = (branch, dt) ->
  if branch
    branch.update(dt)
    branch.draw(context)
    updateBranch(child, dt) for child in branch.children

newTrunk()
ticker (dt) ->
  dt /= 1000
  updateBranch(trunk, dt)
  newTrunk() if (trunk.children.length is 0) and okayToMakeNewTrunk
