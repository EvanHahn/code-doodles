# load an image...

IMAGES = [
  'images/by_Samuel_Rohl_tiny.gif'
]
image = new Image
image.src = _.sample IMAGES
image.onload = ->

  drawPixel = (x, y, color) ->
    context.fillStyle = color
    context.fillRect(x, y, x + 1, y + 1)

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

  console.time 'Building training set...'

  i = 0
  for y in [0...height]
    for x in [0...width]

      redLocation = ((width * y) + x) * 4
      greenLocation = redLocation + 1
      blueLocation = greenLocation + 1

      r = rawData[redLocation]
      g = rawData[greenLocation]
      b = rawData[blueLocation]

      lightness = (b + (g * 0x100) + (r * 0x10000)) / 0xffffff

      trainingSet[i] =
        input: { x, y }
        output: [lightness]
      i += 1

  console.timeEnd 'Building training set...'

  # train your brain

  setTimeout ->

    console.time 'Training set...'

    net = new brain.NeuralNetwork()
    net.train trainingSet,
      iterations: 800

    console.timeEnd 'Training set...'

    console.time 'Drawing pixels...'

    for y in [0...height]
      for x in [0...width]

        result = net.run({ x, y })[0]
        r = Math.floor(result * 255)
        g = Math.floor(result * 255)
        b = Math.floor(result * 255)
        color = "rgb(#{r}, #{g}, #{b})"

        drawPixel(x, y, color)

    console.timeEnd 'Drawing pixels...'

  , 1000
