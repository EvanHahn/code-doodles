const crel = require('crel');
const ticker = require('../vendor/ticker-0.2.1');
const makeCanvasFillScreen = require('./make-canvas-fill-screen');
const randomDirection = require('./random-direction');

const canvas = crel('canvas');
const context = canvas.getContext('2d');
makeCanvasFillScreen(canvas);
document.body.appendChild(canvas);

const center = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

const fullRadius = Math.min(window.innerWidth, window.innerHeight) / 2;

let radius = fullRadius * 0.95;
let lineHeight = radius;
let lineDirection;

ticker(dt => {

  if (lineHeight >= radius) {

    context.beginPath();
    context.arc(center.x, center.y, radius, 0, Math.PI * 2);
    context.stroke();

    lineHeight = 0;
    lineDirection = randomDirection();
    radius -= fullRadius * 0.1;

  }

  lineHeight = Math.min(lineHeight + dt * 5, radius);

  context.beginPath();
  context.moveTo(center.x, center.y);
  context.lineTo(
    center.x + Math.cos(lineDirection) * lineHeight,
    center.y + Math.sin(lineDirection) * lineHeight
  );
  context.stroke();

});
