var Particle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Particle = (function(_super) {
  __extends(Particle, _super);

  function Particle() {
    Particle.__super__.constructor.apply(this, arguments);
    this.isRightward = this.velocity[0] > 0;
    this.isDownward = this.velocity[1] > 20;
  }

  Particle.prototype.tick = function(dt) {
    Particle.__super__.tick.apply(this, arguments);
    if (this.isRightward) {
      if (this.velocity[0] <= 0) {
        this.velocity[0] = 0;
      }
    } else {
      if (this.velocity[0] >= 0) {
        this.velocity[0] = 0;
      }
    }
    if (this.isDownward) {
      if (this.velocity[1] <= 20) {
        this.velocity[1] = 20;
      }
    } else {
      if (this.velocity[1] >= 20) {
        this.velocity[1] = 20;
      }
    }
    this.size -= (dt / 1000) * 4;
    if (this.size <= 0) {
      return this.remove();
    }
  };

  Particle.prototype.draw = function() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.position[0] | 0, this.position[1] | 0, this.size, 0, 2 * Math.PI);
    return context.fill();
  };

  return Particle;

})(Entity);
