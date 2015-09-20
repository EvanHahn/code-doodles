module.exports = function (element) {
  var mouse = { x: 0, y: 0 };

  element.addEventListener('mousemove', function (event) {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
  });

  return mouse;
};
