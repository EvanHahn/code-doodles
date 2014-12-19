const randomDirection = require('./random-direction');
const Spectra = require('../vendor/spectra-0.2.3');

const twopi = 2 * Math.PI;

class Ring {

  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
    this.startRotation = randomDirection();
    this.rotation = this.startRotation;
    this.color = Spectra.random();
  }

  percentAround() {
    const amount = ((this.rotation + this.startRotation) % twopi) / twopi;
    return amount * 100;
  }

  update(dt) {
    this.rotation = (this.rotation + dt) % (2 * Math.PI);
  }

  draw(context) {

    context.strokeStyle = this.color.hex();

    context.beginPath();
    context.moveTo(this.center.x, this.center.y);
    context.lineTo(
      this.center.x + Math.cos(this.rotation) * this.radius,
      this.center.y + Math.sin(this.rotation) * this.radius
    );
    context.stroke();

  }

}

module.exports = Ring;
