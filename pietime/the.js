var COLORS, INTERVALS, PADDING, PIXEL_RATIO, crel, draw, intervals;

PADDING = 25;

INTERVALS = "second minute hour day week month year".split(" ");

COLORS = ["#fa8072", "#faad72", "#fada72", "#ecfa72", "#87ceeb", "#87aceb", "#a4b7eb"];

PIXEL_RATIO = window.devicePixelRatio || 1;

crel = function(el) {
  return document.createElement(el);
};

intervals = [];

draw = function(interval) {
  var center, ctx, diff, percent, radius, size;
  diff = moment().endOf(interval.name).diff(moment());
  percent = diff / interval.ms;
  size = interval.canvas.width;
  center = size / 2;
  ctx = interval.context;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = ctx.strokeStyle = interval.color;
  radius = Math.max(center * percent, center * 0.9);
  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.arc(center, center, radius, 0, 2 * Math.PI * percent);
  return ctx.fill();
};

(function() {
  var canvas, description, fragment, i, interval, timelist, wrapper, _i, _len;
  fragment = document.createDocumentFragment();
  timelist = crel("ul");
  for (i = _i = 0, _len = INTERVALS.length; _i < _len; i = ++_i) {
    interval = INTERVALS[i];
    wrapper = crel("li");
    description = crel("div");
    canvas = crel("canvas");
    wrapper.appendChild(canvas);
    wrapper.appendChild(description);
    timelist.appendChild(wrapper);
    description.style.color = COLORS[i];
    description.innerHTML = interval;
    intervals.push({
      name: interval,
      color: COLORS[i],
      ms: moment.duration(1, interval).asMilliseconds(),
      canvas: canvas,
      context: canvas.getContext("2d")
    });
  }
  fragment.appendChild(timelist);
  return document.body.appendChild(fragment);
})();

(window.onresize = function() {
  var canvas, interval, size, width, _i, _len, _results;
  width = window.innerWidth;
  if (width > 600) {
    size = (width - (PADDING * intervals.length)) / intervals.length;
  } else if (width > 400) {
    size = (width - (PADDING * intervals.length)) / (intervals.length / 4);
  } else {
    size = width - (PADDING * intervals.length);
  }
  _results = [];
  for (_i = 0, _len = intervals.length; _i < _len; _i++) {
    interval = intervals[_i];
    canvas = interval.canvas;
    canvas.width = canvas.height = size * PIXEL_RATIO;
    canvas.style.width = canvas.style.height = size + "px";
    _results.push(draw(interval));
  }
  return _results;
})();

(function() {
  var secondsAndMinutes;
  (secondsAndMinutes = function() {
    draw(intervals[0]);
    draw(intervals[1]);
    return requestAnimationFrame(secondsAndMinutes);
  })();
  return startInterval(function() {
    var i, interval, _i, _len, _results;
    _results = [];
    for (i = _i = 0, _len = intervals.length; _i < _len; i = ++_i) {
      interval = intervals[i];
      if (i >= 2) {
        _results.push(draw(interval));
      }
    }
    return _results;
  }, 1000);
})();
