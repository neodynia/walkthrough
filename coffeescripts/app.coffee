rows = [
  83 * 1 - 20
  83 * 2 - 20
  83 * 3 - 20
]

class Enemy
  constructor: (@x, @y, @speed) ->
    @x = Math.random() * -500
    @y = rows[Math.floor (Math.random() * rows.length )]
    @speed = Math.random() * 400 + 100
    @sprite = 'images/enemy-bug.png'

  update = (dt) ->
    eqnXPoz = @x + 101 * 0.8
    eqnYNeg = @y = 83 * 0.2
    eqnYPoz = @y + 83 * 0.2
    px = player.x
    py = player.y


    if eqnXPoz >= px && @x <= px && eqnYPoz >= py && eqnYNeg <= py then player.reset()

    @x += @speed * dt

    if @x > 505
      @x = Math.random() * -400
      @y = rows[Math.floor(Math.random() * rows.length)]

  render = ->
    ctx.drawImage(Resources.get(@sprite), @x, @y)

class Player
  constructor: (@x, @y) ->
    @x = 101 * 2
    @y = 83 * 5 - 10
    @sprite = 'images/char-boy.png'

  update = (dt) ->
    @x = x
    @y = y
  
  render ->
    ctx.drawImage(Resources(@sprite), @x, @y)
  
  reset ->
    @x = 101 * 2
    @y = 83 * 5 - 10
  
  handleInput = (allowedKeys) ->
    switch (allowedKeys)
      when "left", @x - 101 >= 0 then @x = @x -101
      when "left", @x - 101 <= 0 then @x = 0
      when "right", @x + 101 <= 101 * 4 then @x = @x + 101
      when "right", @x + 101 >= 101 * 4 then @x = 101 * 4
      when "down", @y + 83 <= 83 * 5 then @y + 83
      when "down", @y + 83 >= 83 * 5 then 83 * 5
      when "up"
        if @y - 83 >= 60 then @y -= 83
        else this.reset()
      else return

callback = (e) ->
  allowedKeys = {
    37: 'left'
    38: 'up'
    39: 'right'
    40: 'down'
  }
  player.handleInput(allowedKeys[e.keyCode])

  allEnemies = [
    new Enemy()
    new Enemy()
    new Enemy()
    new Enemy()
  ]

  player = new Player()

  

    




  