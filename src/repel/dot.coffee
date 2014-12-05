class Dot

  constructor: (@baseX, @baseY, @radius) ->
    [@x, @y] = [@baseX, @baseY]
    @color = Spectra('#9b9f99')

  # update: (mouseX, mouseY) ->

  draw: (context) ->
    context.fillStyle = @color.hex()
    context.beginPath()
    context.arc(@x, @y, @radius, 0, 2 * Math.PI)
    context.fill()
