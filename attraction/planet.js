var Planet;

Planet = (function() {
  function Planet(options) {
    this.x = options.x;
    this.y = options.y;
    this.velocityX = this.velocityY = 0;
    this.accelerationX = this.accelerationY = 0;
    this.radius = 1;
  }

  Planet.prototype.grow = function(dt) {
    return this.radius += dt / 16;
  };

  Planet.prototype.tick = function(dt) {
    this.velocityX += this.accelerationX * dt / 1000;
    this.velocityY += this.accelerationY * dt / 1000;
    this.x += this.velocityX * dt / 1000;
    return this.y += this.velocityY * dt / 1000;
  };

  Planet.prototype.draw = function(context) {
    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    return context.fill();
  };

  return Planet;

})();
