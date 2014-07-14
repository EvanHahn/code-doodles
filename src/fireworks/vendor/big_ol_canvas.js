(function() {

  function bigOlCanvas() {

    var canvas = document.createElement("canvas");

    function makeCanvasFillScreen() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    canvas.style.position = "absolute";
    canvas.style.top = canvas.style.left = 0;

    makeCanvasFillScreen();
    window.addEventListener("resize", makeCanvasFillScreen);

    return canvas;

  }

  if (typeof module !== "undefined")
    module.exports = bigOlCanvas;
  else
    this.bigOlCanvas = bigOlCanvas;

})();
