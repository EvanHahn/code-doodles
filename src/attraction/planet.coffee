class Planet

  constructor: (options) ->
    @x = options.x
    @y = options.y
    @velocityX = @velocityY = 0
    @accelerationX = @accelerationY = 0
    @radius = 1

  grow: (dt) ->
    @radius += (dt / 16)

  tick: (dt) ->
    @velocityX += @accelerationX * dt / 1000
    @velocityY += @accelerationY * dt / 1000
    @x += @velocityX * dt / 1000
    @y += @velocityY * dt / 1000

  draw: (context) ->
    context.fillStyle = "#000000"
    context.beginPath()
    context.arc(@x, @y, @radius, 0, 2 * Math.PI)
    context.fill()
