class Branch

  constructor: ({ @center, @width, maxHeight, @direction, @color, @parent }) ->
    @maxHeight = Math.floor(maxHeight)
    @height = 0
    @children = []

  peak: ->
    return {
      x: @center.x - (Math.cos(@direction) * @height)
      y: @center.y - (Math.sin(@direction) * @height)
    }

  draw: (context) ->
    return if @height >= @maxHeight
    radius = @width / 2
    context.strokeStyle = @color.hex()
    context.lineWidth = @width
    context.beginPath()
    context.moveTo(@center.x, @center.y)
    context.lineTo(@peak().x, @peak().y)
    context.stroke()

  update: (dt) ->
    if @height >= @maxHeight
      if @parent?
        siblings = @parent.children
        siblings.splice(siblings.indexOf(this), 1)
    else
      @height += dt * 500
      if (Math.random() < 0.1) and (@width > 10)
        if Math.random() < 0.5
          direction = (Math.PI / 2) + @direction
        else
          direction = (3 * Math.PI / 2) + @direction
        direction %= Math.PI * 2
        @children.push new Branch
          color: @color.mix(Spectra('#ffffff'), 15)
          center: @peak()
          width: (@height / @maxHeight) * @width
          maxHeight: @maxHeight
          direction: direction
          parent: this
