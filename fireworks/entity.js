var Entity;

Entity = (function() {
  function Entity(properties) {
    this.position = [0, 0];
    this.velocity = [0, 0];
    this.acceleration = [0, 0];
    $.extend(this, properties);
  }

  Entity.prototype.remove = function() {
    var index;
    index = pool.indexOf(this);
    if (index !== -1) {
      return pool[index] = null;
    }
  };

  Entity.prototype.tick = function(dt) {
    var scale;
    scale = dt / 1000;
    this.velocity[0] += this.acceleration[0] * scale * dt;
    this.velocity[1] += this.acceleration[1] * scale * dt;
    this.position[0] += this.velocity[0] * scale;
    return this.position[1] += this.velocity[1] * scale;
  };

  Entity.prototype.draw = $.noop;

  return Entity;

})();
