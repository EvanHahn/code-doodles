/// <reference path="lib/make-canvas-fill-window" />
/// <reference path="lib/ticker" />
/// <reference path="lib/colors" />
/// <reference path="lib/mouse" />
/// <reference path="entities/Bar" />

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

util.makeCanvasFillWindow(canvas);
window.addEventListener('resize', () => {
	util.makeCanvasFillWindow(canvas);
}, false);

var context:any = canvas.getContext('2d');
var mouse = new util.Mouse(window);

var bars:Bar[] = [];

var mouseHasMoved = false;
var instructionsEl = document.getElementById('instructions');
function handleInitialMouseOver() {
	instructionsEl.className = 'hidden';
	mouseHasMoved = true;
	window.removeEventListener('mousemove', handleInitialMouseOver);
}
window.addEventListener('mousemove', handleInitialMouseOver, false);

util.ticker(function (dt) {
	context.clearRect(0, 0, canvas.width, canvas.height);

	var brightness = (Math.sin(Date.now() / 5000) + 1) / 12;
	canvas.style.backgroundColor = colors.background.lighten(brightness).toString();

	if (!mouseHasMoved) { return; }

	var barToReset: Bar;

	bars.forEach(bar => {
		if (bar.x > canvas.width) {
			barToReset = bar;
		}
		bar.tick(dt);
		bar.draw(context);
	});

	if (!barToReset) {
		barToReset = new Bar(mouse.y);
		bars.push(barToReset);
	} else {
		barToReset.reset(mouse.y);
	}
});
