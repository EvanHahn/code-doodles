const makeCanvasFillScreen = require('./lib/make-canvas-fill-screen');
const Particle = require('./entities/particle');
const mouseTracker = require('./lib/mousetracker');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
makeCanvasFillScreen(canvas);

const mouse = mouseTracker(canvas);

const entities = [];
global.entities = entities;

let lastTime;
function tick(t) {
  const dt = lastTime == null ? 0 : t - lastTime;
  lastTime = t;

  const canvasDimensions = {
    width: canvas.width,
    height: canvas.height,
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    size: Math.min(canvas.width, canvas.height),
    mouse: mouse
  };

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  entities.forEach(function (entity) {
    if (entity.deleted) { return; }
    entity.tick(dt, canvasDimensions);
    entity.draw(ctx, canvas);
  });

  requestAnimationFrame(tick);
}

setInterval(function () {
  const newEntity = new Particle(Math.random() * canvas.width, 0);

  let needsToPush = true;
  for (let i = 0; i < entities.length; i++) {
    if (entities[i].deleted) {
      entities[i] = newEntity;
      needsToPush = false;
      break;
    }
  }

  if (needsToPush) {
    entities.push(newEntity);
  }
}, 1);

tick(0);
