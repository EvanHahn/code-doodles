const Spectra = require('spectra');

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.size = Math.round((Math.random() * 5) + 5);
    this.speed = (Math.random() * 0.5) + 0.05;
    this.color = Spectra.random().hex();
  }

  tick(dt, canvas) {
    this.y += dt * this.speed;

    if (this.y > canvas.height) {
      this.deleted = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x | 0, this.y | 0, this.size, this.size);
  }
}

module.exports = Particle;
