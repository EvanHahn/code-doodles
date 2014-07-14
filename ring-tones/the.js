var $html, NOTES, RING_COUNT, Ring, TWOPI, canvas, center, clicking, ctx, lastT, maxRadius, radius, ringFrom, ringSize, rings, tick, _i;

RING_COUNT = 30;

TWOPI = Math.PI * 2;

NOTES = [];

[4, 5, 6].forEach(function(octave) {
  var scale;
  scale = tsw.scale('C', 'major');
  return scale.forEach(function(note, index) {
    if (scale.length - 1 !== index) {
      return NOTES.push(tsw.frequency("" + note + octave));
    }
  });
});

canvas = document.createElement('canvas');

ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

$html = $('html');

$('body').append(canvas);

center = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

maxRadius = Math.sqrt(center.x * center.x + center.y * center.y);

ringSize = maxRadius / RING_COUNT;

clicking = false;

ringFrom = function(event) {
  var distanceFromCenter, index, mouseX, mouseY;
  mouseX = Math.abs(event.pageX - center.x);
  mouseY = Math.abs(event.pageY - center.y);
  distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
  index = Math.floor(distanceFromCenter / ringSize);
  return rings[index] || {
    lightUp: function() {}
  };
};

Ring = (function() {
  function Ring(radius) {
    var noteIndex;
    this.radius = radius;
    this.randomizeColor();
    this.saturation = 0;
    noteIndex = (Math.floor(this.radius / ringSize) - 1) % NOTES.length;
    this.volume = tsw.gain(0);
    this.oscillator = tsw.oscillator('sine', NOTES[noteIndex]);
    tsw.connect(this.oscillator, this.volume, tsw.speakers);
    this.oscillator.start();
  }

  Ring.prototype.randomizeColor = function() {
    this.baseColor = Spectra.random();
    while (this.baseColor.isDark()) {
      this.baseColor = Spectra.random();
    }
    this.baseColor.green(this.baseColor.green() / 2);
    return this.baseColor.blue(this.baseColor.blue() / 3);
  };

  Ring.prototype.lightUp = function() {
    if (this.saturation === 0) {
      this.randomizeColor();
    }
    return this.saturation = 0.75;
  };

  Ring.prototype.tick = function(dt) {
    this.volume.gain(this.saturation);
    return this.saturation = Math.max(0, this.saturation - (0.000001 * dt));
  };

  Ring.prototype.draw = function() {
    var color;
    color = Spectra(this.baseColor.hex()).saturation(this.saturation);
    ctx.fillStyle = color.hex();
    ctx.beginPath();
    ctx.arc(center.x, center.y, this.radius, 0, TWOPI);
    return ctx.fill();
  };

  return Ring;

})();

rings = [];

for (radius = _i = 1; 1 <= RING_COUNT ? _i <= RING_COUNT : _i >= RING_COUNT; radius = 1 <= RING_COUNT ? ++_i : --_i) {
  rings.push(new Ring(radius * ringSize));
}

lastT = 0;

tick = function(t) {
  var dt, ring, _j;
  dt = t - lastT;
  for (_j = rings.length - 1; _j >= 0; _j += -1) {
    ring = rings[_j];
    ring.tick(dt);
    ring.draw();
  }
  return requestAnimationFrame(tick);
};

requestAnimationFrame(tick);

$html.on('mousemove', function(event) {
  if (clicking) {
    return ringFrom(event).lightUp();
  }
});

$html.on('mousedown', function(event) {
  clicking = true;
  return ringFrom(event).lightUp();
});

$html.on('mouseup', function() {
  return clicking = false;
});
