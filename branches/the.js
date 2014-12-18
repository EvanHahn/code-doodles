var canvas, context, makeCanvasFillScreen, newTrunk, okayToMakeNewTrunk, trunk, updateBranch;

canvas = document.querySelector('canvas');

context = canvas.getContext('2d');

makeCanvasFillScreen = function() {
  var dpr;
  dpr = window.devicePixelRatio || 1;
  canvas.width = dpr * innerWidth;
  canvas.height = dpr * innerHeight;
  canvas.style.width = innerWidth + 'px';
  return canvas.style.height = innerHeight + 'px';
};

makeCanvasFillScreen();

window.addEventListener('resize', makeCanvasFillScreen);

trunk = null;

okayToMakeNewTrunk = false;

newTrunk = function() {
  trunk = new Branch({
    color: Spectra.random(),
    center: {
      x: canvas.width / 2,
      y: canvas.height
    },
    width: 50,
    maxHeight: canvas.height * Math.max(Math.random(), 0.5),
    direction: Math.PI / 2
  });
  okayToMakeNewTrunk = false;
  return setTimeout(function() {
    return okayToMakeNewTrunk = true;
  }, 1000);
};

updateBranch = function(branch, dt) {
  var child, _i, _len, _ref, _results;
  if (branch) {
    branch.update(dt);
    branch.draw(context);
    _ref = branch.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(updateBranch(child, dt));
    }
    return _results;
  }
};

newTrunk();

ticker(function(dt) {
  dt /= 1000;
  updateBranch(trunk, dt);
  if ((trunk.children.length === 0) && okayToMakeNewTrunk) {
    return newTrunk();
  }
});
