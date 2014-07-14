var Square, addSquare, at, canvas, ctx, firstSquare, grid, highest, loadingEl, lowest, second, squares, tick, zctx,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

canvas = document.createElement("canvas");

canvas.width = innerWidth;

canvas.height = innerHeight;

ctx = canvas.getContext("2d");

zctx = new ZoomContext(ctx);

grid = {};

squares = [];

lowest = {
  x: 0,
  y: 0
};

highest = {
  x: 0,
  y: 0
};

at = function(x, y) {
  return grid["" + x + "," + y];
};

addSquare = function(square) {
  var x, y;
  x = square.x;
  y = square.y;
  squares.push(square);
  grid["" + x + "," + y] = square;
  if (lowest.x > x) {
    lowest.x = x;
  }
  if (lowest.y > y) {
    lowest.y = y;
  }
  if (highest.x < x) {
    highest.x = x;
  }
  if (highest.y < y) {
    return highest.y = y;
  }
};

Square = (function() {
  function Square(x, y) {
    this.x = x;
    this.y = y;
    this.color = Spectra.random();
    while (this.color.isDark()) {
      this.color = Spectra.random();
    }
    this.age = 0;
  }

  Square.prototype.placeAdjacent = function() {
    var added;
    added = false;
    if (!at(this.x - 1, this.y)) {
      addSquare(new Square(this.x - 1, this.y));
      added = true;
    }
    if (!at(this.x + 1, this.y)) {
      addSquare(new Square(this.x + 1, this.y));
      added = true;
    }
    if (!at(this.x, this.y - 1)) {
      addSquare(new Square(this.x, this.y - 1));
      added = true;
    }
    if (!at(this.x, this.y + 1)) {
      addSquare(new Square(this.x, this.y + 1));
      added = true;
    }
    return added;
  };

  Square.prototype.draw = function(zctx) {
    var size;
    this.age += 0.008;
    ctx.fillStyle = Spectra(this.color.hex()).saturation(this.age - 1).rgbaString();
    size = Math.min(this.age, 0.9);
    return zctx.fillRect(this.x - (size / 2), this.y - (size / 2), size, size);
  };

  return Square;

})();

firstSquare = new Square(0, 0);

firstSquare.age = 1;

addSquare(firstSquare);

zctx.keepInView({
  coordinates: [lowest, highest],
  padding: 1
});

second = -1;

tick = function(t) {
  var appendTo, index, onSecond, square, _i, _len;
  onSecond = false;
  if (Math.floor(t / 1000) > second) {
    onSecond = true;
    second += 1;
  }
  zctx.clear();
  if (onSecond) {
    zctx.keepInView({
      coordinates: [lowest, highest],
      forceCenter: {
        x: 0,
        y: 0
      },
      padding: 3,
      tween: {
        time: 1000,
        easing: TWEEN.Easing.Linear.None
      }
    });
  }
  appendTo = [];
  Math.ceil(squares.length / 100).times(function() {
    return appendTo.push(Math.floor(Math.random() * squares.length));
  });
  for (index = _i = 0, _len = squares.length; _i < _len; index = ++_i) {
    square = squares[index];
    square.draw(zctx);
    if ((__indexOf.call(appendTo, index) >= 0) && (squares.length < 10000)) {
      square.placeAdjacent();
    }
  }
  return requestAnimationFrame(tick);
};

tick();

loadingEl = document.querySelector(".loading");

loadingEl.style.display = "none";

document.body.appendChild(canvas);
