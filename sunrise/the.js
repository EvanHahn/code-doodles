var DAY_COLOR, NIGHT_COLOR, NUM_TRIANGLES, SUN_COLOR, canvas, clamp, context, mouse, pixelRatio;

DAY_COLOR = Spectra('#c8caf9');

NIGHT_COLOR = Spectra('#3a224a');

SUN_COLOR = '#faac00';

NUM_TRIANGLES = 10;

clamp = function(n, min, max) {
  if (n < min) {
    return min;
  } else if (n > max) {
    return max;
  } else {
    return n;
  }
};

canvas = document.createElement("canvas");

context = canvas.getContext("2d");

$("body").append(canvas);

document.body.appendChild(canvas);

pixelRatio = window.devicePixelRatio || 1;

$(window).on("resize", function() {
  var height, width;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = width + "px";
  return canvas.style.height = height + "px";
});

$(window).trigger("resize");

mouse = mouseTracker({
  startX: canvas.width / 2,
  startY: canvas.height / 2
});

ticker(function() {
  var bottom, i, leftSide, middle, percentNight, pyramidSize, rightSide, topX, topY, _i, _results;
  pyramidSize = Math.floor(canvas.width / NUM_TRIANGLES);
  bottom = canvas.height;
  percentNight = (mouse.y / bottom) * 100;
  context.fillStyle = DAY_COLOR.mix(NIGHT_COLOR, percentNight).hex();
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = SUN_COLOR;
  context.beginPath();
  context.arc(mouse.x, mouse.y, pyramidSize / 3, 0, 2 * Math.PI);
  context.fill();
  context.fillStyle = Spectra('white').mix(Spectra('black'), percentNight).hex();
  _results = [];
  for (i = _i = 0; 0 <= NUM_TRIANGLES ? _i < NUM_TRIANGLES : _i > NUM_TRIANGLES; i = 0 <= NUM_TRIANGLES ? ++_i : --_i) {
    leftSide = i * pyramidSize;
    rightSide = leftSide + pyramidSize;
    middle = leftSide + (pyramidSize / 2);
    topX = clamp(mouse.x, leftSide, rightSide);
    topY = clamp(mouse.y, bottom - pyramidSize, bottom);
    context.beginPath();
    context.moveTo(leftSide, bottom);
    context.lineTo(rightSide, bottom);
    context.lineTo(topX, topY);
    context.lineTo(i * pyramidSize, bottom);
    _results.push(context.fill());
  }
  return _results;
});
