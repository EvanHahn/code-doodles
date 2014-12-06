var canvas, context, dots, mouse;

canvas = document.querySelector('canvas');

context = canvas.getContext('2d');

dots = [];

mouse = {
  x: -1000,
  y: -1000
};

(function() {
  var dpr;
  dpr = window.devicePixelRatio || 1;
  canvas.width = dpr * innerWidth;
  canvas.height = dpr * innerHeight;
  canvas.style.width = innerWidth + 'px';
  return canvas.style.height = innerHeight + 'px';
})();

(function() {
  var radius, step, x, y, _i, _ref, _ref1, _results;
  step = 35;
  radius = (step / 2) - 2;
  _results = [];
  for (x = _i = _ref = step / 2, _ref1 = innerWidth + step * 2; step > 0 ? _i < _ref1 : _i > _ref1; x = _i += step) {
    _results.push((function() {
      var _j, _ref2, _results1;
      _results1 = [];
      for (y = _j = 0, _ref2 = innerHeight + step * 2; step > 0 ? _j < _ref2 : _j > _ref2; y = _j += step) {
        _results1.push(dots.push(new Dot(x, y, radius)));
      }
      return _results1;
    })());
  }
  return _results;
})();

canvas.addEventListener('mousemove', function(event) {
  var _ref;
  return _ref = [event.clientX, event.clientY], mouse.x = _ref[0], mouse.y = _ref[1], _ref;
});

ticker(function(dtRaw) {
  var dot, dt, _i, _len, _results;
  dt = dtRaw / 1000;
  context.clearRect(0, 0, canvas.width, canvas.height);
  _results = [];
  for (_i = 0, _len = dots.length; _i < _len; _i++) {
    dot = dots[_i];
    dot.update(dt);
    _results.push(dot.draw(context));
  }
  return _results;
});
