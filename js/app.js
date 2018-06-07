var rows = [83 * 1 - 20, 83 * 2 - 20, 83 * 3 - 20];

class Enemy {
  constructor (x, y, speed) {
    this.x = Math.random() * -500;
    this.y = rows[Math.floor(Math.random() * rows.length)];
    this.speed = Math.random() * 400 + 100;
    this.sprite = 'images/enemy-bug.png';
  }

  update (dt) {
    if (this.x + 101 * 0.8 >= player.x && this.x <= player.x && this.y + 83 * 0.2 >= player.y && this.y - 83 * 0.2 <= player.y) {
      player.reset();
    }

    this.x += this.speed * dt;

    if (this.x > 505) {
      this.x = Math.random() * -400;
      this.y = rows[Math.floor(Math.random() * rows.length)];
    }
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor (x, y) {
    this.x = 101 * 2;
    this.y = 83 * 5 - 10;
    this.sprite = 'images/char-boy.png';
  }

  update (dt) {
    this.x = this.x;
    this.y = this.y;
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  reset () {
    this.x = 101 * 2;
    this.y = 83 * 5 - 10;
  }

  handleInput (allowedKeys) {
    switch (allowedKeys) {
      case 'left':
        this.x = (this.x - 101 >= 0) ? this.x - 101 : 0;
        break;
      case 'right':
        this.x = (this.x + 101 <= 101 * 4) ? this.x + 101 : 101 * 4;
        break;
      case 'down':
        this.y = (this.y + 83 <= 83 * 5) ? this.y + 83 : 83 * 5;
        break;
      case 'up':
        if (this.y - 83 >= 60) {
          this.y -= 83;
        } else {
          this.reset();
        }
        break;
      default:
        return;
    }
  }
}

document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
