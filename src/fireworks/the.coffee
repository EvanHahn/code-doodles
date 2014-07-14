@canvas = bigOlCanvas()
@context = canvas.getContext "2d"
$("body").append canvas

@pool = []
pool.add = (obj) ->
  insertAt = pool.indexOf null
  if insertAt isnt -1
    pool[insertAt] = obj
  else
    pool.push obj

shootTo = (x, y) ->
  pool.add new Rocket(destination: [x, y])

userHasShotEver = no
$(window).on "click", (event) ->
  shootTo event.clientX, event.clientY
  if not userHasShotEver
    $("#instructions")
    .css("opacity", 1)
    .animate({ opacity: 0 }, 1000)
    userHasShotEver = yes

ticker (dt) ->
  for entity in pool when entity?
    entity.draw context
    entity.tick dt

$("#content").show()

$output = $("#output")
theEnd = Date.create("July 3, 2014")
update = ->
  if theEnd.isToday()
    $output.text "Today's the day!"
  else if theEnd.isPast()
    $output.text "Why are you still here?"
  else
    duration = theEnd.millisecondsFromNow()
    duration = Math.floor(duration / 1000) * 1000
    $output.text "See you in #{humanizeDuration duration}!"

update()
setInterval(update, 1000)
