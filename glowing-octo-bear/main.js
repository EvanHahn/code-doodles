var $body, backgroundColor, canvas, colorIndex, context, makeDroplet, mouse, mouseDown, pool;

$body = $(document.body);

canvas = bigOlCanvas();

context = canvas.getContext("2d");

$body.append(canvas);

pool = new Poolboy();

mouse = mouseTracker();

colorIndex = -1;

backgroundColor = "#ffffff";

makeDroplet = function(x, y) {
  return pool.create(Droplet, colorIndex, mouse.x, mouse.y);
};

mouseDown = false;

$body.on("mousedown", function() {
  mouseDown = true;
  colorIndex += 1;
  return backgroundColor = makeColor(colorIndex + 1).lighten(30).hex();
});

$body.on("mouseup", function() {
  return mouseDown = false;
});

new Ticker(function(dt) {
  $body.css("background-color", backgroundColor);
  context.clearRect(0, 0, canvas.width, canvas.height);
  pool.each(function(swimmer) {
    swimmer.tick(dt);
    return swimmer.draw(context);
  });
  if (mouseDown) {
    return pool.create(Droplet, colorIndex, mouse.x, mouse.y);
  }
});
