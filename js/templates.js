const Templates = {
    scoreboard: function() {
        return {
            tag: 'div',
            classes: ['sb-container'],
            children: [
                { tag: 'div', classes: ['time-label'], children: [{ tag: 'p', content: game.time }] },
                { tag: 'div', classes: ['score-label'], children: [{ tag: 'p', content: game.score }] },
                { tag: 'div', classes: ['highscore-label'], children: [{ tag: 'p', content: game.highscore }] },
                { tag: 'div', classes: ['speed-label'], children: [{ tag: 'p', content: game.speed }] }
            ]
        };
    },
    grid: function() {
        // Create cell objects and append to cells array
        let cells = [];
        const snakeParts = this.snakeParts();
        for (let y = 0; y < game.cc**0.5; y++) {
            for (let x = 0; x < game.cc**0.5; x++) {
                // Add snakepart if there is any that matches the cell's position
                let snakepart;
                const indx = snake.pos.findIndex(p => p.x == x && p.y == y); {
                    if (indx != -1) snakepart = snakeParts[indx];
                }
                const cellObj = {
                    tag: 'div',
                    classes: (y%2) ? ['gridcell'] : ['gridcell', 'odd-row'],
                    attributes: { x: x, y: y },
                    children: [snakepart ?? []]
                };
                cells.push(cellObj);
            }
        }
        return { tag: 'div', classes: ['grid'], children: cells };
    },
    snakeBodyParts: function() {
        // Create snake bodypart objects and append to parts array
        let parts = [];
        for (let i = 1; i < snake.pos.length-1; i++) {
            let object = {
                tag: 'div',
                classes: ['snake-body', snake.color],
                attributes: { x: snake.pos[i].x, y: snake.pos[i].y }
            };
            parts.push(object);
        }
        return parts;
    },
    snakeParts: function() {
        return [].concat({
              tag: 'div',
              classes: ['snake-head', snake.color],
              children: [
                  { tag: 'div', classes: ['snake-eye', 'eye--first'] },
                  { tag: 'div', classes: ['snake-eye', 'eye--second'] }
              ],
              attributes: { x: snake.pos[0].x, y: snake.pos[0].y }
            },
            (snake.len > 0) ? this.snakeBodyParts() : [],
            {
              tag: 'div',
              classes: ['snake-end', snake.color],
              attributes: { 
                  x: snake.pos[snake.pos.length-1].x,
                  y: snake.pos[snake.pos.length-1].y
                }
            }
        );
    },
    gameContainer: function() {
        return {
            tag: 'div',
            classes: ['container'],
            children: [
                this.scoreboard(),
                this.grid()
            ]
        };
    }
}