class Branch

  constructor: ({ @center, @width, maxHeight, @direction, @color }) ->
    @maxHeight = Math.floor(maxHeight)
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
    context.strokeStyle = @color.hex()
    context.lineWidth = @width
    context.beginPath()
    context.moveTo(@center.x, @center.y)
    context.lineTo(@peak().x, @peak().y)
    context.stroke()

  update: (dt) ->
    if @height < @maxHeight
      @height += dt * 100 * Math.random()
      if (Math.random() < (@height / (@maxHeight * 5))) and (@width > 5)
        if Math.random() < 0.5
          direction = (Math.PI / 2) + @direction
        else
          direction = (3 * Math.PI / 2) + @direction
        direction %= Math.PI * 2
        if direction != (3 * Math.PI / 2)
          @children.push new Branch
            color: Spectra.random().mix(@color, 50)
            center: @peak()
            width: (@height / @maxHeight) * @width
            maxHeight: @maxHeight / 2
            direction: direction
