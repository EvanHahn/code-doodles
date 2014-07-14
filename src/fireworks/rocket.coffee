class Rocket extends Entity

  constructor: ->
    super
    @position = [@destination[0], canvas.height]
    @velocity[1] = -1500

  explode: ->

    ringCount = Math.ceil(Math.random() * 10)

    hue = [
      "red"
      "green"
      "blue"
      "white"
    ].sample()

    ringCount.times =>

      particleSpeed = Math.floor(Math.random() * 500) + 500
      particleDecel = (Math.floor(Math.random() * 50) + 50) * -1
      particleCount = Math.ceil(Math.random() * 90) + 10
      particleSize = Math.ceil(Math.random() * 5) + 1
      particleColor = randomColor({ hue })

      twopi = Math.PI * 2
      particleCount.times (i) =>
        angle = twopi * i / particleCount
        pool.add new Particle
          color: particleColor
          size: particleSize
          position: @position.clone()
          velocity: [
            Math.cos(angle) * particleSpeed
            Math.sin(angle) * particleSpeed
          ]
          acceleration: [
            Math.cos(angle) * particleDecel
            Math.sin(angle) * particleDecel
          ]

    @remove()

  tick: ->
    super
    @explode() if @position[1] < @destination[1]

  draw: ->
    context.fillStyle = "#ffffff"
    context.beginPath()
    context.arc(
      @position[0] | 0, @position[1] | 0, 2,
      0, 2 * Math.PI
    )
    context.fill()
