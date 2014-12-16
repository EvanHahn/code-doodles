class Branch

  constructor: ({ @center, @width, @direction }) ->
    @color = '#bb00ff'
    @height = 0
    @children = []

  draw: (context) ->
    radius = @width / 2
    xDiff = Math.cos(@direction + Math.PI / 2) * radius
    yDiff = Math.sin(@direction + Math.PI / 2) * radius
    context.fillStyle = @color
    context.beginPath()
    context.moveTo(@center.x - xDiff, @center.y - yDiff)
    context.lineTo(@center.x + xDiff, @center.y + yDiff)
    context.stroke()
