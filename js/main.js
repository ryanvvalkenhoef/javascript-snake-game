
var game = {
    isOn: false,
    timeOuts: [],
    clockTime: 0,
    timeCounter: 0,
    cc: 400, // Cellcount
    time: "0:00",
    speed: "1 FPS",
    score: "0",
    highscore: "0",
    gameLoop: function() {
        // Update position of snake
        snake.moveTo(snake.direction);
        game.update();
        
        // Check if game.isOn, otherwise toggle it and hide related elements
        if (!game.isOn) {
            game.isOn = true;
            const ptsLbl = document.getElementsByClassName('pts-label')[0];
            const overlay = document.getElementsByClassName('overlay')[0];
            overlay.style.display = "none";
            ptsLbl.style.display = "none";
        }
        game.timeCounter++;
        // Logic that sets time of timeout based on the snake's speed
        const timeoutTime = 550 - snake.pos.length * 30 - game.timeCounter / 2;
        if (timeoutTime < 300) timeOutTime = 300;
        game.timeOuts.push(setTimeout(game.gameLoop, timeoutTime));
    },
    clock: function() {
        // Display time in time label
        game.clockTime++;
        if (game.isOn) {
            const mins = Math.floor(game.clockTime / 60).toString();
            const secs = Math.floor(game.clockTime - mins * 60).toString();
            game.time = mins + ":" + ((secs.length == 1) ? "0" + secs : secs);
        } else {
            const ptsLbl = document.getElementsByClassName("pts-label")[0];
            if (ptsLbl.style.display == "inline-flex") {
                ptsLbl.style.display = "none";
            } else {
                ptsLbl.style.display = "inline-flex";
            }
        }
        game.timeOuts.push(setTimeout(game.clock, 1000));
    },
    generate: function() {
        const dominator = new Dominator(Templates.gameContainer());
        document.body.appendChild(dominator.domElement);
    },
    update: function() {
        document.body.innerHTML = String();
        this.generate();
    }
}

var snake = {
    color: "blue",
    pos: [snakePos(), { x: snakePos().x, y: snakePos().y+1 }],
    position: snakePos(),
    direction: 1,
    speed: 1,
    moveTo: function(direction) {
        // Move snake, perform this.die() when it hits the border and
        // perform this.eat() when it collides with the candy.
        switch (direction) {
            case 1: // Up
                if (this.pos[0].y == 0) {
                    this.die();
                } else if (this.pos[0].x == candy.pos.x && this.pos[0].y-1 == candy.pos.y) {
                    this.eat();
                } else {
                    this.position.y--;
                    this.pos.pop();
                    this.pos.splice(0, 0, this.position);
                }
              break;
            case 2: // Left
                if (this.pos[0].x == 0) {
                    this.die();
                } else if (this.pos[0].y == candy.pos.y && this.pos[0].x-1 == candy.pos.x) {
                    this.eat();
                } else {
                    this.position.x--;
                    this.pos.pop();
                    this.pos.splice(0, 0, this.position);
                }
              break;
            case 3: // Right
                if (this.pos[0].x == game.cc**0.5-1) {
                    this.die();
                } else if (this.pos[0].y == candy.pos.y && this.pos[0].x+1 == candy.pos.x) {
                    this.eat();
                    break;
                } else {
                    this.position.x++;
                    this.pos.pop();
                    this.pos.splice(0, 0, this.position);
                }
              break;
            case 4: // Down
                console.log(game.cc**0.5-1);
                if (this.pos[snake.pos.length-1].y == game.cc**0.5-1) {
                    this.die();
                } else if (this.pos[0].x == candy.pos.x && this.pos[0].y+1 == candy.pos.y) {
                    this.eat();
                } else {
                    this.position.y++;
                    this.pos.pop();
                    this.pos.splice(0, 0, this.position);
                }
              break;
        }
        console.log(this.pos);
    },
    die: function() {
        // Reset position of snake and candy, set highscore,
        // reset score and update game
        candy.pos = candyPos();
        if (game.score > game.highscore) game.highscore = game.score;
        game.isOn = false;
        game.score = "0";
        game.clockTime = 0;
        game.timeOuts = [];
        game.time = "0:00";
        this.pos = [{ x: snakePos().x, y: snakePos().y },
                    { x: snakePos().x, y: snakePos().y+1 }];
        snake.speed = 1;
        game.speed = snake.speed + " FPS";
        game.update();
    },
    eat: function() {
        // Set candy.eaten to true, increase score, set highscore,
        // add position and change speed
        candy.pos = candyPos();
        game.score++;
        this.pos.push({ x: this.position.x, y: this.position.y });
        snake.speed += 0.5;
        game.speed = snake.speed + " FPS";
        game.update();
    }
}

var candy = {
    pos: candyPos()
}

window.onload = function() {
    game.generate();
    setTimeout(game.clock, 0);
}

function startGame() {
    if (!game.isOn) {
        game.update();
        game.clockTime = 0;
        // Start game clock and gameLoop
        setTimeout(game.gameLoop, 0);
    } else {
        return;
    }
}

window.addEventListener("keydown", function(event) {
    let key = event.key || event.code;
    startGame();
    switch (key) {
        case "ArrowUp":
            snake.direction = 1;
            break;
        case "ArrowLeft":
            snake.direction = 2;
            break;
        case "ArrowRight":
            snake.direction = 3;
            break;
        case "ArrowDown":
            snake.direction = 4;
            break;
    }
})

function candyPos() {
    // Get random position in grid
    let randomPos = randomGridPos();
    // Make sure randomPos is not position of snake
    while (snake.pos.includes(randomPos)) randomPos = randomGridPos();
    return randomPos;
}

function snakePos() {
    return { x: Math.floor(game.cc**0.5/2), y: Math.floor(game.cc**0.5/2) };
}

function randomGridPos() {
    return { x: Math.floor(Math.random() * game.cc**0.5),
             y: Math.floor(Math.random() * game.cc**0.5) };
}