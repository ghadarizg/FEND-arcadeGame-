// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 490)
        this.x += this.speed * dt;
    else
       this.x = 0;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function () {
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (moves) {
    switch (moves) {
        case "lift":
            this.x = this.x - 45;
            break
        case "right":
            this.x = this.x + 45;
            break
        case "down":
            this.y = this.y + 45;
            break
        case "up":
            this.y = this.y - 45;
            break
    }

}
function checkCollisions() {
    let Y_position = player.y;
    let X_position = player.x;
    allEnemies.forEach(enemy => {
        if (X_position + 45 >= enemy.x && X_position - 45 <= enemy.x && Y_position + 45 >= enemy.y && Y_position - 45 <= enemy.y) {

            player.y = 400;
            player.x = 200;
            setTimeout(() => { alert("I'm sorry, you lose 😔") }, 300);
        }
    });

    if (Y_position <= 1) {
        /**sweet alert library */
        setTimeout(() => { alert("Congrats, You win in the game YAAY!🥳") }, 300);
        player.x = 200;
        player.y = 400;
    }
    /**To avoid the player to go outside the canvas  */
    if (Y_position > 400) {
        player.y = 400;
    } else if (X_position > 400) {
        player.x = 200
    } else if (X_position < 1) {
        player.x = 200;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemies = [50, 140, 220];
for (let i = 0; i < enemies.length; i++) {
    enemy = new Enemy(Math.floor(Math.random() * ((-300) - (-150) + 1) + -150),
        enemies[i], (Math.random() * (100) + 200));
    allEnemies.push(enemy);
}
let player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
