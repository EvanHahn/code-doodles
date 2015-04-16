/* global Building */

var BUILDING_COUNT = 8;
var BUILDING_SCALAR = 0.9;

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

function updateCanvasSize() {
  canvas.hypotenuse = 0.95 * Math.min(innerWidth, innerHeight);
  canvas.width = canvas.height = canvas.hypotenuse / Math.sqrt(2);
}
updateCanvasSize();

var buildings = [];
for (var i = 0; i < BUILDING_COUNT; i++) {
  buildings.push(new Building());
}

function tick() {
  ctx.translate(0, 0);
  ctx.rotate(-Math.PI / 4);

  ctx.fillStyle = '#edb300';

  var buildingWidth = (canvas.hypotenuse / BUILDING_COUNT) * BUILDING_SCALAR;
  for (i = 0; i < BUILDING_COUNT; i++) {
    var x = (i * (canvas.hypotenuse / BUILDING_COUNT)) - (canvas.hypotenuse / 2);
    buildings[i].draw(ctx, x, buildingWidth);
  }
}
tick();
