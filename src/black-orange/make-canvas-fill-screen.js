module.exports = function(canvas) {
  var dpr = window.devicePixelRatio || 1;
  canvas.width = dpr * window.innerWidth;
  canvas.height = dpr * window.innerHeight;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
};
