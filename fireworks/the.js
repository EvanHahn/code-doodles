var $output, shootTo, theEnd, update, userHasShotEver;

this.canvas = bigOlCanvas();

this.context = canvas.getContext("2d");

$("body").append(canvas);

this.pool = [];

pool.add = function(obj) {
  var insertAt;
  insertAt = pool.indexOf(null);
  if (insertAt !== -1) {
    return pool[insertAt] = obj;
  } else {
    return pool.push(obj);
  }
};

shootTo = function(x, y) {
  return pool.add(new Rocket({
    destination: [x, y]
  }));
};

userHasShotEver = false;

$(window).on("click", function(event) {
  shootTo(event.clientX, event.clientY);
  if (!userHasShotEver) {
    $("#instructions").css("opacity", 1).animate({
      opacity: 0
    }, 1000);
    return userHasShotEver = true;
  }
});

ticker(function(dt) {
  var entity, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = pool.length; _i < _len; _i++) {
    entity = pool[_i];
    if (!(entity != null)) {
      continue;
    }
    entity.draw(context);
    _results.push(entity.tick(dt));
  }
  return _results;
});

$("#content").show();

$output = $("#output");

theEnd = Date.create("July 3, 2014");

update = function() {
  var duration;
  if (theEnd.isToday()) {
    return $output.text("Today's the day!");
  } else if (theEnd.isPast()) {
    return $output.text("Why are you still here?");
  } else {
    duration = theEnd.millisecondsFromNow();
    duration = Math.floor(duration / 1000) * 1000;
    return $output.text("See you in " + (humanizeDuration(duration)) + "!");
  }
};

update();

setInterval(update, 1000);
