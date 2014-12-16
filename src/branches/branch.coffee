class Branch

  constructor: ({ @center, @width, maxHeight, @direction }) ->
    @maxHeight = Math.floor(maxHeight)
    @color = '#bb00ff'
    @height = 0
    @children = []

  peak: ->
    return {
      x: @center.x - (Math.cos(@direction) * @height)
      y: @center.y - (Math.sin(@direction) * @height)
    }

  draw: (context) ->
    radius = @width / 2
    leftX = Math.cos(@direction + Math.PI / 2) * radius
    rightX = Math.sin(@direction + Math.PI / 2) * radius
    context.strokeStyle = @color
    context.lineWidth = @width
    context.beginPath()
    context.moveTo(@center.x, @center.y)
    context.lineTo(@peak().x, @peak().y)
    context.stroke()

  update: (dt) ->
    if @height < @maxHeight
      @height += dt * 100
      if (Math.random() < 0.01) and (@height > (@maxHeight * 0.1)) and (@width > 5)
        if Math.random() < 0.5
          direction = (Math.PI / 2)
        else
          direction = (3 * Math.PI / 2)
        @children.push new Branch
          center: @peak()
          width: @width / 2
          maxHeight: @maxHeight / 2
          direction: @direction + direction
