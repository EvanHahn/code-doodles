var DECEL, Droplet, MAX_AGE, MAX_RADIUS, SPEED, TWOPI;

MAX_RADIUS = 15;

MAX_AGE = 5000;

SPEED = 100;

DECEL = 3;

TWOPI = 2 * Math.PI;

Droplet = (function() {
  function Droplet(colorIndex, x, y) {
    this.x = x;
    this.y = y;
    this.direction = Math.random() * TWOPI;
    this.speed = SPEED;
    this.age = 0;
    this.color = makeColor(colorIndex);
  }

  Droplet.prototype.tick = function(dt) {
    this.age += dt;
    if (this.age >= MAX_AGE) {
      this.pool.leave();
      return;
    }
    this.speed = Math.max(this.speed - DECEL, 0);
    this.x += Math.cos(this.direction) * (this.speed * (dt / 1000));
    return this.y += Math.sin(this.direction) * (this.speed * (dt / 1000));
  };

  Droplet.prototype.draw = function(ctx) {
    var radius, scale;
    if (this.age >= MAX_AGE) {
      return;
    }
    scale = (MAX_AGE - this.age) / MAX_AGE;
    radius = MAX_RADIUS * scale;
    ctx.fillStyle = this.color.hex();
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, TWOPI);
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = Math.floor(radius / 5);
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, TWOPI);
    return ctx.stroke();
  };

  return Droplet;

})();

this.Droplet = Droplet;
