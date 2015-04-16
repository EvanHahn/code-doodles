function Building() {
  this.height = Math.random();
}

Building.prototype.draw = function(ctx, x, width) {
  ctx.fillRect(x, 0, width, this.height * ctx.canvas.hypotenuse);
};
