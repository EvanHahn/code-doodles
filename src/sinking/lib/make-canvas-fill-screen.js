function makeCanvasFillScreen(canvas) {
  const dpi = window.devicePixelRatio || 1;
  if (dpi !== 1) {
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

  canvas.width = window.innerWidth * dpi;
  canvas.height = window.innerHeight * dpi;

  window.addEventListener('resize', makeCanvasFillScreen.bind(window, canvas));
}

module.exports = makeCanvasFillScreen;
