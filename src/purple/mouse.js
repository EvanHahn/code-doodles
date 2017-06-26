/* global RED_COLOR, PURPLE_COLOR */

class Mouse {  // eslint-disable-line no-unused-vars
  constructor () {
    this.oldX = 0
    this.oldY = 0
    this.radius = 0
    this.isClicking = false
    this.hasEverMoved = false
    this.hasEverClicked = false
  }

  tick ({ ctx, screen }) {
    this.radius = screen.thinner / 50

    ctx.fillStyle = this.isClicking ? PURPLE_COLOR : RED_COLOR
    ctx.lineWidth = this.radius / 10

    ctx.beginPath()
    ctx.arc(this.oldX, this.oldY, this.radius, 0, 2 * Math.PI)
    ctx.fill()

    this.oldX = this.x
    this.oldY = this.y
  }
}
