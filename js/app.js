/*jshint esversion:6*/
class Enemy {

    constructor(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';

    }

    update(dt) {
        this.x = this.x + this.speed * dt;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }

    update(dt) {
        this.x = this.x + this.speed * dt;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //handleInput() {
//
  //  }
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
