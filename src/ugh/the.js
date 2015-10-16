function Layer(options) {
  var el = document.createElement('div');
  el.className = 'layer';
  el.style.fontSize = options.size + 'px';
  el.style.zIndex = options.size;

  var innerEl = document.createElement('div');
  innerEl.className = 'layer-inner';
  innerEl.innerHTML = 'ugh';
  el.appendChild(innerEl);

  this.color = '#000';

  document.body.appendChild(el);

  this.innerEl = innerEl;
}

Layer.prototype.render = function () {
  this.innerEl.style.color = this.color;
};

var layers = [];

for (var i = 10; i < (window.innerHeight / 2); i += 10) {
  layers.push(new Layer({
    size: i
  }));
}

var lastLayer = layers[layers.length - 1];
var hasCycled = false;

var currentIndex = 0;
setInterval(function () {
  var layer = layers[currentIndex];

  layer.color = Spectra.random().hex();

  if ((currentIndex < 3) && hasCycled) {
    lastLayer.color = '#fff';
  } else {
    lastLayer.color = '#000';
  }

  if (currentIndex >= 3) {
    hasCycled = true;
  }

  lastLayer.render();
  layer.render();

  currentIndex = (currentIndex + 1) % layers.length;
}, 100);
