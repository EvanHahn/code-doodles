var Rocket,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Rocket = (function(_super) {
  __extends(Rocket, _super);

  function Rocket() {
    Rocket.__super__.constructor.apply(this, arguments);
    this.position = [this.destination[0], canvas.height];
    this.velocity[1] = -1500;
  }

  Rocket.prototype.explode = function() {
    var hue, ringCount;
    ringCount = Math.ceil(Math.random() * 10);
    hue = ["red", "green", "blue", "white"].sample();
    ringCount.times((function(_this) {
      return function() {
        var particleColor, particleCount, particleDecel, particleSize, particleSpeed, twopi;
        particleSpeed = Math.floor(Math.random() * 500) + 500;
        particleDecel = (Math.floor(Math.random() * 50) + 50) * -1;
        particleCount = Math.ceil(Math.random() * 90) + 10;
        particleSize = Math.ceil(Math.random() * 5) + 1;
        particleColor = randomColor({
          hue: hue
        });
        twopi = Math.PI * 2;
        return particleCount.times(function(i) {
          var angle;
          angle = twopi * i / particleCount;
          return pool.add(new Particle({
            color: particleColor,
            size: particleSize,
            position: _this.position.clone(),
            velocity: [Math.cos(angle) * particleSpeed, Math.sin(angle) * particleSpeed],
            acceleration: [Math.cos(angle) * particleDecel, Math.sin(angle) * particleDecel]
          }));
        });
      };
    })(this));
    return this.remove();
  };

  Rocket.prototype.tick = function() {
    Rocket.__super__.tick.apply(this, arguments);
    if (this.position[1] < this.destination[1]) {
      return this.explode();
    }
  };

  Rocket.prototype.draw = function() {
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.arc(this.position[0] | 0, this.position[1] | 0, 2, 0, 2 * Math.PI);
    return context.fill();
  };

  return Rocket;

})(Entity);
