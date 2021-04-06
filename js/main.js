

// let clock;
// setTimeout(updateIW = () => {
//     gameInfo.time = '1:00';
//     console.log(gameInfo.time);
//     clock = this;
// }, 1000);

var game = {
    cc: 400, // Cellcount
    time: '0:00',
    speed: '1 FPS',
    score: '0',
    highscore: '0',
    generate: function() {
        const dominator = new Dominator(Templates.gameContainer());
        document.body.insertBefore(dominator.domElement, document.body.childNodes[0]);
    },
    update: function() {
        document.body.innerHTML = String();
        this.generate();
    }
}

// -- Entities

// Snake Object
var snake = {
    color: 'red',
    pos: [{ x: 10, y: 9 },
          { x: 10, y: 10 }],
    speed: 1,
    len: 0
}

// Candy Object
var candy = {
    pos: {
        x: randomPos(),
        y: randomPos()
    }
}

function randomPos() {
    return Math.floor(Math.random() * game.cc);
}

window.onload = function() {
    game.generate();
    setTimeout(function() {
        game.score = '2';
        game.update();
    }, 1000);
}