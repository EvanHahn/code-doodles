var util;
(function (util) {
    function makeCanvasFillWindow(canvas) {
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        var dpi = window.devicePixelRatio || 1;
        if (dpi !== 1) {
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
        }
        canvas.width = window.innerWidth * dpi;
        canvas.height = window.innerHeight * dpi;
    }
    util.makeCanvasFillWindow = makeCanvasFillWindow;
    ;
})(util || (util = {}));
var util;
(function (util) {
    function ticker(fn) {
        var lastTime;
        function tick(t) {
            lastTime || (lastTime = t);
            var dt = (t - lastTime) / 1000;
            lastTime = t;
            fn(dt);
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }
    util.ticker = ticker;
    ;
})(util || (util = {}));
var util;
(function (util) {
    function lerp(a, b, amount) {
        return a * (1 - amount) + b * amount;
    }
    util.lerp = lerp;
})(util || (util = {}));
/// <reference path="lerp" />
var Color = (function () {
    function Color(colors) {
        this.colors = colors;
    }
    Color.prototype.blendWith = function (other, amount) {
        var result = this.colors.map(function (val, i) {
            return util.lerp(val, other.colors[i], amount);
        });
        return new Color(result);
    };
    Color.prototype.lighten = function (amount) {
        amount = Math.abs(amount);
        return this.blendWith(new Color([255, 255, 255]), amount);
    };
    Color.prototype.toString = function () {
        var colors = this.colors.map(function (c) { return Math.round(c); }).join(',');
        return 'rgb(' + colors + ')';
    };
    return Color;
})();
// Pallet by Wist, licensed under CC-BY-NC-SA.
// http://www.colourlovers.com/palette/3748211/comet_ride
/// <reference path="Color" />
var colors;
(function (colors) {
    colors.background = new Color([44, 37, 69]);
    colors.daytime = new Color([162, 65, 90]);
    colors.nighttime = new Color([237, 136, 130]);
})(colors || (colors = {}));
var util;
(function (util) {
    var Mouse = (function () {
        function Mouse(element) {
            var _this = this;
            this.element = element || window;
            this.x = this.element.offsetWidth / 2;
            this.y = this.element.offsetHeight / 2;
            this.element.addEventListener('mousemove', function (event) {
                _this.x = event.clientX;
                _this.y = event.clientY;
            });
        }
        return Mouse;
    })();
    util.Mouse = Mouse;
})(util || (util = {}));
var util;
(function (util) {
    function sample(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    util.sample = sample;
})(util || (util = {}));
/// <reference path="../lib/Color" />
/// <reference path="../lib/colors" />
/// <reference path="../lib/sample" />
var Bar = (function () {
    function Bar(y) {
        this.reset(y);
    }
    Bar.prototype.reset = function (y) {
        var jitter = (Math.random() - 0.5) / 2;
        var brightness = Math.sin(Date.now() / 5000) + jitter;
        this.x = 0;
        this.y = y;
        this.color = colors.daytime.blendWith(colors.nighttime, brightness);
    };
    Bar.prototype.tick = function (dt) {
        this.x += dt * 100;
    };
    Bar.prototype.draw = function (context) {
        context.fillStyle = this.color.toString();
        context.fillRect(this.x, this.y, 10, context.canvas.height);
    };
    return Bar;
})();
/// <reference path="lib/make-canvas-fill-window" />
/// <reference path="lib/ticker" />
/// <reference path="lib/colors" />
/// <reference path="lib/mouse" />
/// <reference path="entities/Bar" />
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
util.makeCanvasFillWindow(canvas);
window.addEventListener('resize', function () {
    util.makeCanvasFillWindow(canvas);
}, false);
var context = canvas.getContext('2d');
var mouse = new util.Mouse(window);
var bars = [];
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
    if (!mouseHasMoved) {
        return;
    }
    var barToReset;
    bars.forEach(function (bar) {
        if (bar.x > canvas.width) {
            barToReset = bar;
        }
        bar.tick(dt);
        bar.draw(context);
    });
    if (!barToReset) {
        barToReset = new Bar(mouse.y);
        bars.push(barToReset);
    }
    else {
        barToReset.reset(mouse.y);
    }
});
