var $clockTime, $differenceEarlier, $differenceTime, $html, $solarTime, MIDNIGHT_COLOR, NOON_COLOR, clockNoon, latitude, longitude, solarNoon, updateBackground, updateTimes, _ref;

NOON_COLOR = "#46bbfa";

MIDNIGHT_COLOR = "#02273c";

latitude = longitude = null;

$html = document.documentElement;

$clockTime = document.querySelector(".clock .time");

$solarTime = document.querySelector(".solar .time");

$differenceEarlier = document.querySelector(".difference .earlier");

$differenceTime = document.querySelector(".difference .time");

clockNoon = function() {
  return Date.create().set({
    hour: 12
  }, true);
};

solarNoon = function() {
  return SunCalc.getTimes(new Date(), latitude, longitude).solarNoon;
};

updateBackground = function() {
  var firstMoment, hex, lastMoment, noon, now, percent;
  now = new Date();
  firstMoment = now.clone().beginningOfDay();
  lastMoment = now.clone().endOfDay();
  noon = clockNoon();
  percent = Math.abs(noon - now) / (lastMoment - firstMoment);
  hex = Spectra(NOON_COLOR).mix(Spectra(MIDNIGHT_COLOR), percent * 100).hex();
  return $html.style.backgroundColor = hex;
};

updateBackground();

updateTimes = function() {
  var clockNow, difference, solarNow;
  difference = solarNoon() - clockNoon();
  clockNow = new Date();
  solarNow = new Date().addMilliseconds(difference);
  $clockTime.innerHTML = clockNow.format("{12hr}:{mm}{tt}");
  $solarTime.innerHTML = solarNow.format("{12hr}:{mm}{tt}");
  $differenceEarlier.innerHTML = difference > 0 ? "late" : "early";
  return $differenceTime.innerHTML = humanizeDuration(difference);
};

if ((_ref = navigator.geolocation) != null) {
  _ref.getCurrentPosition(function(position) {
    var _ref1;
    _ref1 = position.coords, latitude = _ref1.latitude, longitude = _ref1.longitude;
    updateTimes();
    return setInterval(updateTimes, 1000);
  }, function(err) {
    return console.error(err);
  });
}
