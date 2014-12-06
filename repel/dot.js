var Dot;

Dot = (function() {
  function Dot(baseX, baseY, radius) {
    var _ref;
    this.baseX = baseX;
    this.baseY = baseY;
    this.radius = radius;
    _ref = [this.baseX, this.baseY], this.x = _ref[0], this.y = _ref[1];
    this.color = Spectra.random();
    while (this.color.lightness() < 0.5) {
      this.color = Spectra.random();
    }
    this.maxMovement = this.radius;
    this.distance = 100;
  }

  Dot.prototype.update = function(dt) {
    var d, destination, xDiff, yDiff;
    xDiff = mouse.x - this.baseX;
    yDiff = mouse.y - this.baseY;
    this.distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff)) || 0.00001;
    d = (this.radius * 1000) / (this.distance * this.distance);
    destination = {
      x: this.baseX - clamp(Math.sign(xDiff) * d, -this.maxMovement, this.maxMovement),
      y: this.baseY - clamp(Math.sign(yDiff) * d, -this.maxMovement, this.maxMovement)
    };
    this.x = Math.moveTowards(this.x, destination.x, this.radius * 10 * dt);
    return this.y = Math.moveTowards(this.y, destination.y, this.radius * 10 * dt);
  };

  Dot.prototype.draw = function(context) {
    context.fillStyle = this.color.desaturate(this.distance / 3).hex();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    return context.fill();
  };

  return Dot;

})();
