var _ref;

if ((_ref = navigator.geolocation) != null) {
  _ref.getCurrentPosition(function(position) {
    var clockNoon, difference, latitude, longitude, now, solarNoon, _ref1;
    now = new Date();
    clockNoon = now.clone().set({
      hour: 12
    }, true);
    _ref1 = position.coords, latitude = _ref1.latitude, longitude = _ref1.longitude;
    solarNoon = SunCalc.getTimes(now, latitude, longitude).solarNoon;
    difference = solarNoon - clockNoon;
    return console.log(["Solar noon is at ", solarNoon.format("{12hr}:{mm}{tt}"), ", which is ", humanizeDuration(difference), " ", difference > 0 ? "later" : "earlier", " than noon on your clock"].join(""));
  });
}
