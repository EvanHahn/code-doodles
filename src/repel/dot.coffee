class Dot

  constructor: (@baseX, @baseY, @radius) ->
    [@x, @y] = [@baseX, @baseY]
    @color = Spectra('#9b9f99')
    @maxMovement = @radius

  update: (dt) ->
    xDiff = mouse.x - @baseX
    yDiff = mouse.y - @baseY
    d = 500 / Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))
    destination =
      x: @baseX - clamp(Math.sign(xDiff) * d, -@maxMovement, @maxMovement)
      y: @baseY - clamp(Math.sign(yDiff) * d, -@maxMovement, @maxMovement)
    @x = Math.moveTowards(@x, destination.x, @radius * 10 * dt)
    @y = Math.moveTowards(@y, destination.y, @radius * 10 * dt)

  draw: (context) ->
    context.fillStyle = @color.hex()
    context.beginPath()
    context.arc(@x, @y, @radius, 0, 2 * Math.PI)
    context.fill()
