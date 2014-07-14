class Entity

  constructor: (properties) ->
    @position = [0, 0]
    @velocity = [0, 0]
    @acceleration = [0, 0]
    $.extend this, properties

  remove: ->
    index = pool.indexOf this
    pool[index] = null if index isnt -1

  tick: (dt) ->
    scale = dt / 1000
    @velocity[0] += @acceleration[0] * scale * dt
    @velocity[1] += @acceleration[1] * scale * dt
    @position[0] += @velocity[0] * scale
    @position[1] += @velocity[1] * scale

  draw: $.noop
