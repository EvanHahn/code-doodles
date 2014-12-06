class Dot

  constructor: (@baseX, @baseY, @radius) ->
    [@x, @y] = [@baseX, @baseY]
    @color = Spectra.random()
    while @color.lightness() < 0.5
      @color = Spectra.random()
    @maxMovement = @radius
    @distance = 100

  update: (dt) ->
    xDiff = mouse.x - @baseX
    yDiff = mouse.y - @baseY
    @distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff)) or 0.00001
    d = (@radius * 1000) / (@distance * @distance)
    destination =
      x: @baseX - clamp(Math.sign(xDiff) * d, -@maxMovement, @maxMovement)
      y: @baseY - clamp(Math.sign(yDiff) * d, -@maxMovement, @maxMovement)
    @x = Math.moveTowards(@x, destination.x, @radius * 10 * dt)
    @y = Math.moveTowards(@y, destination.y, @radius * 10 * dt)

  draw: (context) ->
    context.fillStyle = @color.desaturate(@distance / 3).hex()
    context.beginPath()
    context.arc(@x, @y, @radius, 0, 2 * Math.PI)
    context.fill()
