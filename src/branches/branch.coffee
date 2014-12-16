class Branch

  constructor: ({ @center, @width, @direction }) ->
    @color = '#bb00ff'
    @height = 0
    @children = []

  draw: (context) ->
    radius = @width / 2
    leftX = Math.cos(@direction + Math.PI / 2) * radius
    rightX = Math.sin(@direction + Math.PI / 2) * radius
    context.fillStyle = @color
    context.beginPath()
    context.moveTo(@center.x - leftX, @center.y - rightX)
    context.lineTo(@center.x + leftX, @center.y + rightX)
    context.stroke()
