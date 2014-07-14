INTERVALS = "second minute hour day week month year".split " "
CANVAS_SIZE = 200

crel = (el) -> document.createElement el

intervals = []

do ->

  fragment = document.createDocumentFragment()

  timelist = crel "ul"

  for interval in INTERVALS

    wrapper = crel "li"
    canvas = crel "canvas"
    wrapper.appendChild canvas
    timelist.appendChild wrapper

    canvas.width = canvas.height = CANVAS_SIZE * 2
    canvas.style.width = canvas.style.height = CANVAS_SIZE + "px"

    intervals.push
      name: interval
      color: "#ffffff"
      canvas: canvas
      context: canvas.getContext "2d"

  fragment.appendChild(timelist)
  document.body.appendChild(fragment)

draw = (interval) ->

  percent = 0.8

  center = interval.canvas.width / 2
  ctx = interval.context

  ctx.fillStyle = interval.color
  ctx.beginPath()
  ctx.moveTo(center, center)
  ctx.arc(center, center, center - 1, 0, 2 * Math.PI * percent)
  ctx.fill()

draw interval for interval in intervals
