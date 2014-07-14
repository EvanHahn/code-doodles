@makeColor = (index) ->

  modded = index % 5

  switch modded
    when 0
      r = 0
      b = (Math.random() * 100)
      g = (Math.random() * 100) + 155
    when 1
      r = (Math.random() * 100)
      g = (Math.random() * 100)
      b = (Math.random() * 100) + 155
    when 2
      r = (Math.random() * 100) + 155
      g = (Math.random() * 50)
      b = (Math.random() * 75)
    when 3
      r = (Math.random() * 100) + 155
      g = (Math.random() * 100) + 155
      b = (Math.random() * 40)
    when 4
      r = (Math.random() * 100) + 155
      g = (Math.random() * 75)
      b = (Math.random() * 100) + 155

  return Spectra { r, g, b }
