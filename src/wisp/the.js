const makeCanvasFillScreen = require('./lib/make-canvas-fill-screen');
const Particle = require('./entities/particle');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
makeCanvasFillScreen(canvas);

const entities = [];

let lastTime;
function tick(t) {
  const dt = lastTime == null ? 0 : t - lastTime;
  lastTime = t;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  entities.forEach(function (entity) {
    if (entity.deleted) { return; }
    entity.tick(dt);
    entity.draw(ctx);
  });

  requestAnimationFrame(tick);
}

setInterval(function () {
  const newEntity = new Particle(Math.random() * canvas.width, canvas.height);

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
}, 0);

tick(0);
