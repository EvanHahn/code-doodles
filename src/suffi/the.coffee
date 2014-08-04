IMAGES = [
  'images/by_Samuel_Rohl.jpg'
]

image = new Image
image.src = _.sample IMAGES
image.onload = ->

  { width, height } = image

  canvas = document.querySelector 'canvas'
  canvas.width = width
  canvas.height = height
  context = canvas.getContext '2d'

  context.drawImage(image, 0, 0)
  rawData = context.getImageData(0, 0, image.width, image.height).data

  for y in [0...height]
    for x in [0...width]
      start = ((width * y) + x) * 4
      red = rawData[start]
      green = rawData[start + 1]
      blue = rawData[start + 2]
      alpha = rawData[start + 3]
