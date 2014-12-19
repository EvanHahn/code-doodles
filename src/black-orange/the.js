const crel = require('crel');
const ticker = require('../vendor/ticker-0.2.1');
const makeCanvasFillScreen = require('./make-canvas-fill-screen');
const Ring = require('./ring');

const canvas = crel('canvas');
const context = canvas.getContext('2d');
makeCanvasFillScreen(canvas);
document.body.appendChild(canvas);

const center = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

const fullRadius = Math.min(window.innerWidth, window.innerHeight) / 2;

let rings = [];
for (let i = 1; i <= 12; i ++) {
  rings.push(new Ring(center, fullRadius / i));
}

ticker(dt => {
  dt /= 1000;
  rings.forEach(ring => {
    ring.update(dt);
    ring.draw(context);
  });
});
