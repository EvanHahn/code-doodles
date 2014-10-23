var IMAGES, image;

IMAGES = ['images/dice.gif'];

image = new Image;

image.src = _.sample(IMAGES);

image.onload = function() {
  var b, blueLocation, canvas, context, darkNumber, drawPixel, g, greenLocation, height, i, isDark, r, rawData, redLocation, trainingSet, width, x, y, _i, _j;
  drawPixel = function(x, y, color) {
    context.fillStyle = color;
    return context.fillRect(x, y, x + 1, y + 1);
  };
  width = image.width, height = image.height;
  canvas = document.querySelector('canvas');
  canvas.width = width;
  canvas.height = height;
  context = canvas.getContext('2d');
  context.lineWidth = 1;
  context.drawImage(image, 0, 0);
  rawData = context.getImageData(0, 0, width, height).data;
  trainingSet = new Array(width * height);
  console.time('Building training set...');
  i = 0;
  for (y = _i = 0; 0 <= height ? _i < height : _i > height; y = 0 <= height ? ++_i : --_i) {
    for (x = _j = 0; 0 <= width ? _j < width : _j > width; x = 0 <= width ? ++_j : --_j) {
      redLocation = ((width * y) + x) * 4;
      greenLocation = redLocation + 1;
      blueLocation = greenLocation + 1;
      r = rawData[redLocation];
      g = rawData[greenLocation];
      b = rawData[blueLocation];
      isDark = ((r * 299) + (g * 587) + (b * 144)) < 131500;
      if (isDark) {
        darkNumber = 0;
      } else {
        darkNumber = 1;
      }
      trainingSet[i] = {
        input: {
          x: x,
          y: y
        },
        output: [darkNumber]
      };
      i += 1;
    }
  }
  console.timeEnd('Building training set...');
  return setTimeout(function() {
    var color, net, result, _k, _l;
    console.time('Training set...');
    net = new brain.NeuralNetwork();
    net.train(trainingSet, {
      errorThresh: 0.05
    });
    console.timeEnd('Training set...');
    console.time('Drawing pixels...');
    for (y = _k = 0; 0 <= height ? _k < height : _k > height; y = 0 <= height ? ++_k : --_k) {
      for (x = _l = 0; 0 <= width ? _l < width : _l > width; x = 0 <= width ? ++_l : --_l) {
        result = net.run({
          x: x,
          y: y
        })[0];
        r = Math.floor(result * 255);
        g = Math.floor(result * 255);
        b = Math.floor(result * 255);
        color = "rgb(" + r + ", " + g + ", " + b + ")";
        drawPixel(x, y, color);
      }
    }
    return console.timeEnd('Drawing pixels...');
  }, 1000);
};
