canvas = document.querySelector('canvas')
context = canvas.getContext '2d'

trunk = null

main = ->

  dpr = window.devicePixelRatio or 1
  canvas.width = dpr * innerWidth
  canvas.height = dpr * innerHeight
  canvas.style.width = innerWidth + 'px'
  canvas.style.height = innerHeight + 'px'

  trunk = new Branch
    color: Spectra.random()
    center:
      x: canvas.width / 2
      y: canvas.height
    width: 50
    maxHeight: canvas.height / 2
    direction: Math.PI / 2

  document.documentElement.style.backgroundColor = trunk.color.lighten(40).hex()

updateBranch = (branch, dt) ->
  branch.update(dt)
  branch.draw(context)
  updateBranch(child, dt) for child in branch.children

main()
addEventListener 'click', main

ticker (dt) ->
  return unless trunk?
  dt /= 1000
  updateBranch(trunk, dt)
