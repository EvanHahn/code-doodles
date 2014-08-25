navigator.geolocation?.getCurrentPosition (position) ->

  now = new Date()

  clockNoon = now.clone().set({ hour: 12 }, true)

  { latitude, longitude } = position.coords
  { solarNoon } = SunCalc.getTimes(now, latitude, longitude)

  difference = solarNoon - clockNoon

  console.log [
    "Solar noon is at "
    solarNoon.format("{12hr}:{mm}{tt}")
    ", which is "
    humanizeDuration(difference)
    " "
    if difference > 0 then "later" else "earlier"
    " than noon on your clock"
  ].join ""
