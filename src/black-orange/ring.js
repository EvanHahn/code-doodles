const randomDirection = require('./random-direction');
const Spectra = require('../vendor/spectra-0.2.3');

class Ring {

  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
    this.startRotation = randomDirection();
    this.rotation = this.startRotation;
    this.color = Spectra.random();
  }

  percentAround() {
    const amount = (this.rotation - this.startRotation) / (2 * Math.PI);
    return amount * 100;
  }

  update(dt) {
    this.rotation = (this.rotation + dt) % (2 * Math.PI);
  }

  draw(context) {

    const color = this.color.desaturate(this.percentAround());
    context.fillStyle = color.hex();

    context.beginPath();
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    context.fill();

  }

}

module.exports = Ring;
