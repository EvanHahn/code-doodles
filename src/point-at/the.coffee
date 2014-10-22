canvas = document.createElement("canvas")
context = canvas.getContext "2d"
$("body").append canvas
document.body.appendChild(canvas)

pixelRatio = window.devicePixelRatio or 1
$(window).on "resize", ->
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width * pixelRatio
  canvas.height = height * pixelRatio
  canvas.style.width = width + "px"
  canvas.style.height = height + "px"
$(window).trigger "resize"
