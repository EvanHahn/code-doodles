function Layer(options) {
  var el = document.createElement('div');
  el.className = 'layer';
  el.style.fontSize = options.size + 'px';
  el.style.zIndex = options.size;

  var innerEl = document.createElement('div');
  innerEl.className = 'layer-inner';
  innerEl.innerHTML = 'ugh';
  el.appendChild(innerEl);

  this.color = '#fff';

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

setInterval(function () {
  layers.forEach(function (layer) {
    layer.color = Spectra.random().hex();
    layer.render();
  });
}, 500);
