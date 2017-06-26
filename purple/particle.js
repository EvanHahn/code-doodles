/* global clamp, square, distance */

class Particle {  // eslint-disable-line no-unused-vars
  constructor ({ x, y }) {
    this.x = x
    this.y = y

    this.vx = 0
    this.vy = 0

    this.ax = 0
    this.ay = 0

    this.maxA = 700000

    this.size = Math.random()

    this.destroyed = false
  }

  tick ({ dt, ctx, mouse, screen }) {
    const oldX = this.x
    const oldY = this.y

    this.ax = clamp(mouse.x - this.x, -this.maxA, this.maxA)
    this.ay = clamp(mouse.y - this.y, -this.maxA, this.maxA)
    if (!mouse.isClicking) {
      this.ax *= -1
      this.ay *= -1
    }

    this.vx += this.ax * square(dt / 100)
    this.vy += this.ay * square(dt / 100)
    this.x += this.vx * dt / 1000
    this.y += this.vy * dt / 1000

    if ((this.x < 0) ||
      (this.x > screen.width) ||
      (this.y < 0) ||
      (this.y > screen.height) ||
      (distance(this.x, this.y, mouse.x, mouse.y) < mouse.radius)) {
      this.destroyed = true
    }

    ctx.lineWidth = this.size * (screen.thinner / 50)

    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(oldX, oldY)
    ctx.stroke()
  }
}
