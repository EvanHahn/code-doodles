class Branch

  constructor: ({ @center, @width, @direction }) ->
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
    context.fillStyle = @color
    context.beginPath()
    context.moveTo(@center.x - leftX, @center.y - rightX)
    context.lineTo(@center.x + leftX, @center.y + rightX)
    context.lineTo(@peak().x, @peak().y)
    context.lineTo(@center.x - leftX, @center.y - rightX)
    context.fill()

  update: (dt) ->
    if @height < (@width * 2)
      @height += dt * 100
    # if Math.random() < 0.01
    #   @children.push new Branch
    #     center: @peak()
    #     width: @width / 2
    #     direction: @direction + (Math.PI / 2)
