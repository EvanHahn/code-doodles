/* global TWEEN, requestAnimationFrame */

(function() {

  // utility methods
  // ===============

  function arrayMin(array) {
    return Math.min.apply(Math, array);
  }

  function arrayMax(array) {
    return Math.max.apply(Math, array);
  }

  // store all the real context properties and methods
  // =================================================

  var contextProperties;
  var contextMethods;
  (function() {
    var fakeCanvas = document.createElement('canvas');
    var fakeContext = fakeCanvas.getContext('2d');
    contextProperties = Object.keys(fakeContext);
    contextMethods = Object.keys(Object.getPrototypeOf(fakeContext));
  })();

  // the constructor
  // ===============

  function ZoomContext(real) {

    var me = this;

    this.realContext = real;

    this.width = real.canvas.width;
    this.height = real.canvas.height;

    this.zoom = 1;
    this.center = {
      x: real.canvas.width / 2,
      y: real.canvas.height / 2
    };

    Object.defineProperty(this, 'canvas', {
      value: real.canvas,
      enumerable: true,
      writable: false
    });

    contextProperties.forEach(function(property) {
      if (property !== 'canvas') {
        Object.defineProperty(me, property, {
          enumerable: true,
          get: function() {
            return real[property];
          },
          set: function(value) {
            return (real[property] = value);
          }
        });
      }
    });

  }

  // get the real values (mostly internal methods)
  // =============================================

  ZoomContext.prototype.realSize = function realSize(s) {
    return s * this.zoom;
  };

  ZoomContext.prototype.realX = function realX(x) {
    return (this.zoom * (x - this.center.x)) + (this.width / 2);
  };

  ZoomContext.prototype.realY = function realY(y) {
    return (this.zoom * (y - this.center.y)) + (this.height / 2);
  };

  ZoomContext.prototype.real = function real(thing, v) {
    if (thing === 'size')
      return this.realSize(v);
    else if (thing === 'x')
      return this.realX(v);
    else if (thing === 'y')
      return this.realY(v);
    else
      return v;
  };

  // zoom-related methods
  // ====================

  ZoomContext.prototype.translate = function translate(x, y, options) {
    options = options || {};
    if (!options.tween) {
      this.center.x = x;
      this.center.y = y;
    } else {
      var tweenTime = options.tween.time || 1000;
      var tweenEasing = options.tween.easing || TWEEN.Easing.Elastic.InOut;
      new TWEEN.Tween(this.center)
        .to({ x: x, y: y }, tweenTime)
        .easing(tweenEasing)
        .start();
      var animate = function () {
        TWEEN.update();
        requestAnimationFrame(animate);
      };
      animate();
    }
  };

  ZoomContext.prototype.zoomToSize = function zoomToSize(s, options) {
    options = options || {};
    var desiredZoom = Math.min(this.width, this.height) / s;
    if (!options.tween) {
      this.zoom = desiredZoom;
    } else {
      var tweenTime = options.tween.time || 1000;
      var tweenEasing = options.tween.easing || TWEEN.Easing.Back.Out;
      new TWEEN.Tween(this)
        .to({ zoom: desiredZoom }, tweenTime)
        .easing(tweenEasing)
        .start();
      var animate = function () {
        TWEEN.update();
        requestAnimationFrame(animate);
      };
      animate();
    }
  };

  ZoomContext.prototype.keepInView = function keepInView(options) {

    var padding = options.padding || 0;
    var xs = options.coordinates.map(function(c) { return c.x; });
    var ys = options.coordinates.map(function(c) { return c.y; });
    var min = { x: arrayMin(xs) - padding, y: arrayMin(ys) - padding };
    var max = { x: arrayMax(xs) + padding, y: arrayMax(ys) + padding };

    var centerX;
    var centerY;
    if (options.forceCenter) {
      centerX = options.forceCenter.x;
      centerY = options.forceCenter.y;
    } else {
      centerX = (min.x + max.y) / 2;
      centerY = (min.y + max.y) / 2;
    }
    var zoomSize = Math.max(max.x - min.x, max.y - min.y);

    if (!options.tween) {
      this.translate(centerX, centerY);
      this.zoomToSize(zoomSize);
    } else {
      var centerTween = options.tween.center || options.tween;
      var zoomTween = options.tween.zoom || options.tween;
      this.translate(centerX, centerY, { tween: centerTween });
      this.zoomToSize(zoomSize, { tween: zoomTween });
    }

  };

  // define a bunch of the methods
  // =============================

  var xy = ['x', 'y'];
  var xyxy = ['x', 'y', 'x', 'y'];
  var xyss = ['x', 'y', 'size', 'size'];
  var nxys = [null, 'x', 'y', 'size'];

  var updatedMethods = {
    arc: ['x', 'y', 'size', null, null, null],
    arcTo: ['x', 'y', 'x', 'y', 'size'],
    beizerCurveTo: ['x', 'y', 'x', 'y', 'x', 'y'],
    clearRect: xyss,
    createLinearGradient: xyxy,
    createRadialGradient: ['x', 'y', 'size', 'x', 'y', 'size'],
    drawImage: [null, 'x', 'y', 'size', 'size', 'x', 'y', 'size', 'size'],
    fillRect: xyss,
    fillText: nxys,
    isPointInPath: xy,
    isPointInStroke: xy,
    lineTo: xy,
    moveTo: xy,
    putImageData: [null, 'x', 'y', null, null, null, null],
    quadraticCurveTo: xyxy,
    rect: xyss,
    // TODO: setTransform?
    strokeRect: xyss,
    strokeText: nxys
    // TODO: transform?
  };

  Object.keys(updatedMethods).forEach(function(methodName) {

    var method = updatedMethods[methodName];

    var fn = function() {
      var args = arguments;
      for (var i = 0; i < arguments.length; i ++) {
        if (method[i])
          args[i] = this.real(method[i], arguments[i]);
        else
          args[i] = arguments[i];
      }
      this.realContext[methodName].apply(this.realContext, args);
    };
    fn.name = methodName;

    ZoomContext.prototype[methodName] = fn;

  });

  // for all undefined methods, defer to the real
  // ============================================

  contextMethods.forEach(function(method) {
    var deferToOriginal = !ZoomContext.prototype[method];
    if (deferToOriginal) {
      var fn = function() {
        this.realContext[method].apply(this.realContext, arguments);
      };
      fn.name = method;
      ZoomContext.prototype[method] = fn;
    }
  });

  // some other fun methods
  // ======================

  ZoomContext.prototype.clear = function clear() {
    this.realContext.clearRect(0, 0, this.width, this.height);
  };

  // export it all
  // =============

  if (typeof module !== 'undefined')
    module.exports = ZoomContext;
  else
    this.ZoomContext = ZoomContext;

})();
