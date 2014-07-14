CANVAS_SIZE = 200
INTERVALS = "second minute hour day week month year".split " "
COLORS = [
  "#fa8072"
  "#faad72"
  "#fada72"
  "#ecfa72"
  "#87ceeb"
  "#87aceb"
  "#a4b7eb"
]

crel = (el) -> document.createElement el

intervals = []

do ->

  fragment = document.createDocumentFragment()

  timelist = crel "ul"

  for interval, i in INTERVALS

    wrapper = crel "li"
    canvas = crel "canvas"
    wrapper.appendChild canvas
    timelist.appendChild wrapper

    canvas.width = canvas.height = CANVAS_SIZE * 2
    canvas.style.width = canvas.style.height = CANVAS_SIZE + "px"

    toAdd =
      name: interval
      color: COLORS[i]
      ms: moment.duration(1, interval).asMilliseconds()
      canvas: canvas
      context: canvas.getContext "2d"
    toAdd.context.fillStyle = toAdd.color
    intervals.push toAdd

  fragment.appendChild(timelist)
  document.body.appendChild(fragment)

draw = (interval) ->

  diff = moment().endOf(interval.name).diff(moment())
  percent = diff / interval.ms

  size = interval.canvas.width
  center = size / 2
  ctx = interval.context

  ctx.clearRect(0, 0, size, size)

  ctx.beginPath()
  ctx.moveTo(center, center)
  ctx.arc(center, center, center - 1, 0, 2 * Math.PI * percent)
  ctx.fill()

do ->

  # seconds and minutes have to be done as fast as possible.
  # the rest can be drawn much less frequently, for performance

  oneHour = 3600000
  oneDay = 86400000
  oneWeek = 604800000
  oneMonth = 2419200000 # 28 days
  oneYear = 31557600000

  do secondsAndMinutes = ->
    draw intervals[0] # s
    draw intervals[1] # m
    requestAnimationFrame(secondsAndMinutes)

  startInterval (-> draw intervals[2]), oneHour / 200
  startInterval (-> draw intervals[3]), oneDay / 200
  startInterval (-> draw intervals[4]), oneWeek / 200
  startInterval (-> draw intervals[5]), oneMonth / 200
  startInterval (-> draw intervals[6]), oneYear / 200
