var Color, Cylinder, Path, Point, Prism, Pyramid, Shape, WORLD_RANGE, boxes, building, buildingSize, canvas, centerNumber, context, distanceBetween, distanceFromCenter, distanceFromFront, frontNumber, height, randomColor, randomHeight, theCenter, theFront, width, x, y, _i, _j, _len, _len1;

Shape = Isomer.Shape, Point = Isomer.Point, Path = Isomer.Path, Color = Isomer.Color;

Prism = Shape.Prism, Pyramid = Shape.Pyramid, Cylinder = Shape.Cylinder;

WORLD_RANGE = [0, 1, 2, 3, 4, 5, 6, 7, 8];

canvas = document.querySelector("canvas");

context = canvas.getContext("2d");

width = canvas.width, height = canvas.height;

randomHeight = function() {
  return Math.random() * 3 + 1;
};

randomColor = function() {
  return new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
};

boxes = [];

for (_i = 0, _len = WORLD_RANGE.length; _i < _len; _i++) {
  x = WORLD_RANGE[_i];
  for (_j = 0, _len1 = WORLD_RANGE.length; _j < _len1; _j++) {
    y = WORLD_RANGE[_j];
    boxes.push({
      location: Point(x, y, 0),
      height: randomHeight(),
      color: randomColor()
    });
  }
}

distanceBetween = function(a, b) {
  x = a.x - b.x;
  y = a.y - b.y;
  return Math.sqrt(x * x + y * y);
};

frontNumber = WORLD_RANGE[WORLD_RANGE.length - 1];

theFront = {
  x: frontNumber,
  y: frontNumber
};

distanceFromFront = function(point) {
  return distanceBetween(theFront, point);
};

centerNumber = Math.round(frontNumber / 2);

theCenter = {
  x: centerNumber,
  y: centerNumber
};

distanceFromCenter = function(point) {
  return distanceBetween(theCenter, point);
};

boxes.sort(function(a, b) {
  var aDist, bDist;
  aDist = distanceFromFront(a.location);
  bDist = distanceFromFront(b.location);
  return aDist - bDist;
});

buildingSize = (WORLD_RANGE.length + 1) * .9;

building = Pyramid(Point.ORIGIN, buildingSize, buildingSize, -10);

ticker(function(dt, t) {
  var alpha, box, iso, scalar, _k, _len2, _results;
  context.clearRect(0, 0, canvas.width, canvas.height);
  iso = new Isomer(canvas);
  iso.add(building, new Color(20, 20, 20));
  _results = [];
  for (_k = 0, _len2 = boxes.length; _k < _len2; _k++) {
    box = boxes[_k];
    height = Math.max(Math.sin(t / 1000 - distanceFromCenter(box.location)) * box.height, .1);
    if (height === .1) {
      box.height = randomHeight();
    }
    scalar = height / box.height;
    alpha = Math.max(scalar, 0.2);
    box.color.a = alpha;
    _results.push(iso.add(Pyramid(box.location, .9, .9, height), box.color));
  }
  return _results;
});
