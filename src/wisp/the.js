const Spectra = require('spectra');
const makeCanvasFillScreen = require('./lib/make-canvas-fill-screen');

const MAX_PARTICLES = 4096;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
makeCanvasFillScreen(canvas);

const particleData = new Float64Array(MAX_PARTICLES * 3);

let lastTime;
function tick(t) {
  const dt = lastTime == null ? 0 : t - lastTime;
  lastTime = t;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particleData.length; i += 3) {
    const y = particleData[i + 1];
    if (y < 0) { continue; }
    const x = particleData[i];

    const scalar = particleData[i + 2];
    const size = Math.round((scalar * 7) + 5);
    const speed = (scalar * 0.2) + 0.05;
    const color = Spectra('teal').darken((1 - scalar) * 15).hex();

    particleData[i + 1] = y - dt * speed;

    ctx.fillStyle = color;
    ctx.fillRect(x, y | 0, size, size);
  }

  requestAnimationFrame(tick);
}

setInterval(function () {
  const newX = Math.round(Math.random() * canvas.width);

  let i;
  for (i = 0; i < particleData.length; i += 3) {
    const y = particleData[i + 1];
    if (y < 0) { break; }
  }

  particleData[i] = newX;
  particleData[i + 1] = canvas.height;
  particleData[i + 2] = Math.random();
}, 0);

tick(0);
