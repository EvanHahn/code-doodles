class Planet

  constructor: (options) ->
    @x = options.x
    @y = options.y
    @radius = 1

  grow: (dt) ->
    @radius += (dt / 16)

  draw: (context) ->
    context.fillStyle = "#000000"
    context.beginPath()
    context.arc(@x, @y, @radius, 0, 2 * Math.PI)
    context.fill()
