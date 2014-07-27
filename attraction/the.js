var G, canvas, context, currentPlanet, planets, square;

square = function(n) {
  return n * n;
};

G = 1;

canvas = document.createElement("canvas");

context = canvas.getContext("2d");

$("body").append(canvas);

document.body.appendChild(canvas);

$(window).on("resize", function() {
  var height, pixelRatio, width;
  pixelRatio = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = width + "px";
  return canvas.style.height = height + "px";
});

$(window).trigger("resize");

currentPlanet = null;

$(canvas).on("mousedown", function(event) {
  currentPlanet = new Planet({
    x: event.clientX,
    y: event.clientY
  });
  return planets.push(currentPlanet);
});

$(canvas).on("mouseup", function() {
  return currentPlanet = null;
});

planets = [];

ticker(function(dt) {
  var accelerationA, accelerationB, angle, i, j, m1, m2, planetA, planetB, r2, xdiff, ydiff, _i, _len, _results;
  if (currentPlanet != null) {
    currentPlanet.grow(dt);
  }
  _results = [];
  for (i = _i = 0, _len = planets.length; _i < _len; i = ++_i) {
    planetA = planets[i];
    planetA.tick(dt);
    planetA.draw(context);
    _results.push((function() {
      var _j, _len1, _results1;
      _results1 = [];
      for (j = _j = 0, _len1 = planets.length; _j < _len1; j = ++_j) {
        planetB = planets[j];
        if (!(j > i)) {
          continue;
        }
        m1 = planetA.radius;
        m2 = planetB.radius;
        xdiff = planetA.x - planetB.x;
        ydiff = planetA.y - planetB.y;
        r2 = square(xdiff) + square(ydiff);
        angle = Math.sin(ydiff);
        accelerationA = G * m2 / r2;
        _results1.push(accelerationB = G * m1 / r2);
      }
      return _results1;
    })());
  }
  return _results;
});
