NOON_COLOR = "#46bbfa"
MIDNIGHT_COLOR = "#02273c"

latitude = longitude = null

$html = document.documentElement
$clockTime = document.querySelector(".clock .time")
$solarTime = document.querySelector(".solar .time")
$differenceEarlier = document.querySelector(".difference .earlier")
$differenceTime = document.querySelector(".difference .time")

clockNoon = ->
  Date.create().set({ hour: 12 }, true)

solarNoon = ->
  SunCalc.getTimes(new Date(), latitude, longitude).solarNoon

updateBackground = ->
  now = new Date()
  firstMoment = now.clone().beginningOfDay()
  lastMoment = now.clone().endOfDay()
  noon = clockNoon()
  percent = Math.abs(noon - now) / (lastMoment - firstMoment)
  hex = Spectra(NOON_COLOR).mix(Spectra(MIDNIGHT_COLOR), percent * 100).hex()
  $html.style.backgroundColor = hex

updateBackground()

updateTimes = ->
  difference = solarNoon() - clockNoon()
  clockNow = new Date()
  solarNow = new Date().addMilliseconds(difference)
  $clockTime.innerHTML = clockNow.format("{12hr}:{mm}{tt}")
  $solarTime.innerHTML = solarNow.format("{12hr}:{mm}{tt}")
  $differenceEarlier.innerHTML = if difference > 0 then "late" else "early"
  $differenceTime.innerHTML = humanizeDuration(difference)

navigator.geolocation?.getCurrentPosition (position) ->

  { latitude, longitude } = position.coords

  updateTimes()
  setInterval(updateTimes, 1000)

, (err) ->

  console.error err
