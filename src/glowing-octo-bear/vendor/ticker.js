/* global requestAnimationFrame */

(function () {

  function Ticker (fn) {

    var me = this;

    var lastTime = 0;
    var pausedFor = 0;

    function tick (t) {
      var dt = t - lastTime;
      if (me.paused)
        pausedFor += dt;
      else
        fn(dt, t - pausedFor);
      lastTime = t;
      requestAnimationFrame(tick);
    }

    tick(0);

  }

  if (typeof module !== "undefined")
    module.exports = Ticker;
  else
    this.Ticker = Ticker;

})();
