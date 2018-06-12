/* Global Variables*/
//Row Dimensions and Allowed Enemy Rows Defined
let rows = [83 * 1 - 20, 83 * 2 - 20, 83 * 3 - 20];
let winCount = 0;
let playCount = 0;
let percentScore;

/*Enemy Class Construction*/
class Enemy {
  constructor(x, y, speed) {
    //Place at random x position within allowed width
    this.x = Math.random() * -500;
    //Use rows to randomly place enemies across the three rows permitted for enemies
    this.y = rows[Math.floor(Math.random() * rows.length)];
    //Randomize the speed of the enemies
    this.speed = Math.random() * 400 + 100;
    //Enemy image 
    this.sprite = 'images/enemy-bug.png';
  }

  //Update method defines the enemy / player collision criteria and calls the player.lose() method if that criteria is observed.
  update(dt) {
    if (this.x + 101 * 0.8 >= player.x && this.x <= player.x && this.y + 83 * 0.2 >= player.y && this.y - 83 * 0.2 <= player.y) {
      player.lose();
    }
    //This is a scaling factor to normalize speed distribution across different browsers and operating systems.
    this.x += this.speed * dt;
    //Resets enemy positions after a win has occured 
    if (this.x > 505) {
      this.x = Math.random() * -400;
      this.y = rows[Math.floor(Math.random() * rows.length)];
    }
  }

  //Draws out the enemy sprites using the ctx object from html canvas / resources.js at a given x and y coordinate
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/*Player Class Construction*/
class Player {
  constructor(x, y) {
    //Places player at starting position upon instantiation 
    this.x = 101 * 2;
    this.y = 83 * 5 - 10;
    this.sprite = 'images/char-boy.png';
  }

  //Updates the x,y position of the player 
  update(dt) {
    this.x = this.x;
    this.y = this.y;
  }

  //Draws out the player sprite using the ctx object from html canvas/ resources.js at given x, y coordinate
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //Method that is called when player reaches the top row (water graphic) and the game counts as a win.
  win() {
    alert('win');
    //Increment win counter by 1
    winCount += 1;
    //Increment play counter by 1
    playCount += 1;
    //Calculate a success score which is just a percentage calculated from the number of wins divided by the number of plays, multiplied by 100, and rounded to nearest whole number.
    percentScore = Math.round((winCount / playCount) * 100);
    //Inserts updates score values into DOM 
    $('#td1').html(winCount);
    $('#td2').html(playCount);
    $('#td3').html(percentScore + ' %');
    //Reset the game 
    this.reset();
  }

  //Similar in functionality to the win() method except it does not increment the win score and gives a different alert pop up to indicate a collision occured.
  lose() {
    alert('OUCHIES');
    playCount += 1;
    percentScore = Math.round((winCount / playCount) * 100);
    $('#td1').html(winCount);
    $('#td2').html(playCount);
    $('#td3').html(percentScore + ' %');
    this.reset();
  }

  //Reset the player to the starting coordinates.
  reset() {
    this.x = 101 * 2;
    this.y = 83 * 5 - 10;
  }

  //Establishes the movement that is allowed by the player sprite.  
  handleInput(allowedKeys) {
    switch (allowedKeys) {
      //Establishes a movement of one unit to the left and disallows the player from moving outside the boundries of the canvas.
      case 'left':
        this.x = (this.x - 101 >= 0) ? this.x - 101 : 0;
        break;
      //Establishes a movement of one unit to the right and disallows the player from moving outside the boundries of the canvas.
      case 'right':
        this.x = (this.x + 101 <= 101 * 4) ? this.x + 101 : 101 * 4;
        break;
      //Establishes a movement of one unit down and disallows the player from moving outside the boundries of the canvas.
      case 'down':
        this.y = (this.y + 83 <= 83 * 5) ? this.y + 83 : 83 * 5;
        break;
      //Establishes a movement of one unit up and signals a win once outside of the allowed canvas bound at the top of the canvas.
      case 'up':
        if (this.y - 83 >= 60) {
          this.y -= 83;
        } else {
          this.win();
        }
        break;
      default:
        return;
    }
  }
}

//Event listener that listens for keyboard arrow presses and links them to the cases of the handleInput() method.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

//Initializing of enemy and player objects
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();