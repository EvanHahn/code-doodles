const Spectra = require('spectra');
const makeCanvasFillScreen = require('./lib/make-canvas-fill-screen');

// make a canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
makeCanvasFillScreen(canvas);

// define particle data array
const MAX_PARTICLES = 2048;
const particleDataLength = MAX_PARTICLES * 3;
const particleData = new Float64Array(particleDataLength);

let lastTime = 0;
function tick(t) {
  // calculate ∆t
  const dt = t - lastTime;
  lastTime = t;

  // empty screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // make a new particle
  const newX = (Math.random() * canvas.width) | 0;
  let i;
  for (i = 0; i < particleDataLength; i += 3) {
    const y = particleData[i + 1];
    if (y < 0) { break; }
  }
  particleData[i] = newX;
  particleData[i + 1] = canvas.height;
  particleData[i + 2] = Math.random();

  // move and draw all the particles
  for (let i = 0; i < particleDataLength; i += 3) {
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

  // begin anew
  requestAnimationFrame(tick);
}

tick(0);
