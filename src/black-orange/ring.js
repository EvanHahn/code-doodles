const randomDirection = require('./random-direction');
const randomSpectra = require('./random-spectra');

const twopi = 2 * Math.PI;

class Ring {

  constructor({ center: center, radius: radius }) {
    this.center = center;
    this.radius = radius;
    this.startRotation = randomDirection();
    this.rotation = this.startRotation;
    this.color = randomSpectra();
  }

  percentAround() {
    const amount = ((this.rotation + this.startRotation) % twopi) / twopi;
    return amount * 100;
  }

  update(dt) {
    const rotationAmount = (dt * Math.pow(this.radius, 1.3) / 1000) + (this.radius / 10000);
    this.rotation = (this.rotation + rotationAmount) % (2 * Math.PI);
  }

  draw(context) {

    context.lineWidth = Math.max(Math.pow(this.radius, 0.4), 1);
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
