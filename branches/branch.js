var Branch;

Branch = (function() {
  function Branch(_arg) {
    var maxHeight;
    this.center = _arg.center, this.width = _arg.width, maxHeight = _arg.maxHeight, this.direction = _arg.direction, this.color = _arg.color, this.parent = _arg.parent;
    this.maxHeight = Math.floor(maxHeight);
    this.height = 0;
    this.children = [];
  }

  Branch.prototype.peak = function() {
    return {
      x: this.center.x - (Math.cos(this.direction) * this.height),
      y: this.center.y - (Math.sin(this.direction) * this.height)
    };
  };

  Branch.prototype.draw = function(context) {
    var radius;
    if (this.height >= this.maxHeight) {
      return;
    }
    radius = this.width / 2;
    context.strokeStyle = this.color.hex();
    context.lineWidth = this.width;
    context.beginPath();
    context.moveTo(this.center.x, this.center.y);
    context.lineTo(this.peak().x, this.peak().y);
    return context.stroke();
  };

  Branch.prototype.update = function(dt) {
    var direction, siblings;
    if (this.height >= this.maxHeight) {
      if (this.parent != null) {
        siblings = this.parent.children;
        return siblings.splice(siblings.indexOf(this), 1);
      }
    } else {
      this.height += dt * 500;
      if ((Math.random() < 0.1) && (this.width > 10)) {
        if (Math.random() < 0.5) {
          direction = (Math.PI / 2) + this.direction;
        } else {
          direction = (3 * Math.PI / 2) + this.direction;
        }
        direction %= Math.PI * 2;
        return this.children.push(new Branch({
          color: this.color.mix(Spectra('#ffffff'), 15),
          center: this.peak(),
          width: (this.height / this.maxHeight) * this.width,
          maxHeight: this.maxHeight,
          direction: direction,
          parent: this
        }));
      }
    }
  };

  return Branch;

})();
