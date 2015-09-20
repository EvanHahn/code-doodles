const Spectra = require('spectra');

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    const random = Math.random();
    this.size = Math.round((random * 7) + 5);
    this.speed = (random * 0.2) + 0.05;
    this.color = Spectra('teal').darken((1 - random) * 15).hex();
  }

  tick(dt, canvas) {
    this.y -= dt * this.speed;

    if (this.y < 0) {
      this.deleted = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x | 0, this.y | 0, this.size, this.size);
  }
}

module.exports = Particle;
