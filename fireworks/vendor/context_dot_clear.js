(function() {

  var Context = window.CanvasRenderingContext2D;
  if (!Context)
    return;

  Context.prototype.clear = function clear() {
    this.clearRect(
      0, 0,
      this.canvas.width, this.canvas.height
    );
  };

})();
