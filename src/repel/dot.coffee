class Dot

  constructor: (@baseX, @baseY, @radius) ->
    [@x, @y] = [@baseX, @baseY]
    @color = Spectra('#9b9f99')
    @maxMovement = @radius

  update: (mouse) ->
    scalar = 500
    xDiff = mouse.x - @baseX
    yDiff = mouse.y - @baseY
    distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))
    @x = @baseX - clamp(Math.sign(xDiff) * scalar / distance, -@maxMovement, @maxMovement)
    @y = @baseY - clamp(Math.sign(yDiff) * scalar / distance, -@maxMovement, @maxMovement)

  draw: (context) ->
    context.fillStyle = @color.hex()
    context.beginPath()
    context.arc(@x, @y, @radius, 0, 2 * Math.PI)
    context.fill()

    context.fillStyle = '#000000'
    context.beginPath()
    context.arc(@baseX, @baseY, @radius * 0.1, 0, 2 * Math.PI)
    context.fill()
