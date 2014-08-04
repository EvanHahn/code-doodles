# load an image...

IMAGES = [
  'images/by_Samuel_Rohl_sm.png'
]
image = new Image
image.src = _.sample IMAGES
image.onload = ->

  drawPixel = (x, y, color) ->
    context.strokeStyle = color
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + 0.5, y + 0.5)
    context.stroke()
    context.closePath()

  # draw the initial image...

  { width, height } = image

  canvas = document.querySelector 'canvas'
  canvas.width = width
  canvas.height = height
  context = canvas.getContext '2d'
  context.lineWidth = 1

  context.drawImage(image, 0, 0)

  # format the data for the neural network

  rawData = context.getImageData(0, 0, width, height).data
  trainingSet = new Array(width * height)

  i = 0
  for y in [0...height]
    for x in [0...width]

      redLocation = ((width * y) + x) * 4
      greenLocation = redLocation + 1
      blueLocation = greenLocation + 1

      r = rawData[redLocation]
      g = rawData[greenLocation]
      b = rawData[blueLocation]

      trainingSet[i] =
        input: { x, y }
        output:
          r: r / 255
          g: g / 255
          b: b / 255
      i += 1

  # train your brain

  async.nextTick ->

    net = new brain.NeuralNetwork()
    net.train trainingSet

    console.log net.run { x: 0, y: 0 }
