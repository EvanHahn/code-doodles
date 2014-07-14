class Particle extends Entity

  constructor: ->
    super
    @isRightward = @velocity[0] > 0
    @isDownward = @velocity[1] > 20

  tick: (dt) ->
    super
    if @isRightward
      @velocity[0] = 0 if @velocity[0] <= 0
    else
      @velocity[0] = 0 if @velocity[0] >= 0
    if @isDownward
      @velocity[1] = 20 if @velocity[1] <= 20
    else
      @velocity[1] = 20 if @velocity[1] >= 20
    @size -= (dt / 1000) * 4
    @remove() if @size <= 0

  draw: ->
    context.fillStyle = @color
    context.beginPath()
    context.arc(
      @position[0] | 0, @position[1] | 0, @size,
      0, 2 * Math.PI
    )
    context.fill()
