class Dot

  constructor: (@baseX, @baseY, @radius) ->
    [@x, @y] = [@baseX, @baseY]
    @color = Spectra('#9b9f99')
    @minX = @baseX - @radius
    @maxX = @baseX + @radius
    @minY = @baseY - @radius
    @maxY = @baseY + @radius

  update: (mouse) ->
    xDiff = mouse.x - @x
    yDiff = mouse.y - @y
    if Math.sqrt((xDiff * xDiff) + (yDiff * yDiff)) < (@radius * 10)
      scalar = 2 / @radius
      @x = clamp(@baseX - xDiff * scalar, @minX, @maxX)
      @y = clamp(@baseY - yDiff * scalar, @minY, @maxY)
    else
      [@x, @y] = [@baseX, @baseY]

  draw: (context) ->
    context.fillStyle = @color.hex()
    context.beginPath()
    context.arc(@x, @y, @radius, 0, 2 * Math.PI)
    context.fill()
