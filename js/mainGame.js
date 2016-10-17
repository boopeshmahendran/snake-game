var mainGame = {
    preload: function() {
        game.load.image('snake', 'images/snake.png');
        game.load.image('apple', 'images/apple.png');
    },
    create: function() {
        // data members
        this.snake = [];
        this.initialSnakeLength = 3;
        this.characterScale = 2;
        this.squareSize = 15 * this.characterScale;
        this.speed = 9;
        this.count = this.speed;
        this.width  = Math.floor(game.world.width / this.squareSize);
        this.height = Math.floor(game.world.height / this.squareSize);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.direction = "right";
        this.apple = game.add.sprite(0, 0, 'apple');
        this.apple.scale.set(this.characterScale);
        console.log(this.apple.width);
        this.apple.visible = false;
        this.score = 0;
        this.scoreText = game.add.text(10, 10, "", fontStyle);
        this.updateXY = {up: {x: 0, y: -1}, down: {x: 0, y: 1}, left: {x: -1, y: 0}, right: {x: 1, y: 0}};

        this.createSnake();
        this.drawScore();
        this.drawApple();
    },
    update: function() {
        this.updateDirection();
        this.moveSnake();
        this.snakeEatApple();
        this.checkGameOver();
    },
    checkGameOver: function() {
        this.checkOutOfWorld();
        this.checkSnakeCollision();
    },
    checkSnakeCollision: function() {
        var head = this.snake[this.snake.length - 1];
        for (var i = 0; i < this.snake.length - 1; ++i) {
            if (head.x == this.snake[i].x && head.y === this.snake[i].y) {
                this.gameOver();
            }
        }
    },
    checkOutOfWorld: function() {
        var head = this.snake[this.snake.length - 1];
        if (head.x < 0 || head.x > game.world.width || head.y < 0 || head.y > game.world.height) {
            this.gameOver();
        }
    },
    gameOver: function() {
        finalScore = this.score;
        game.state.start('gameOver');
    },
    drawScore: function() {
        this.scoreText.setText("Score: " + this.score);
    },
    createSnake: function() {
        for (var i = 0; i < this.initialSnakeLength; ++i) {
            var t = this.add.sprite(game.world.centerX + i * this.squareSize, game.world.centerY, 'snake');
            t.scale.set(this.characterScale);
            this.snake.push(t);
        }
    },
    snakeEatApple: function() {
        var head = this.snake[this.snake.length - 1];
        if (head.x === this.apple.x && head.y === this.apple.y) {
            this.score += 1;
            this.speed = Math.max(4, this.speed - Math.floor((this.score) / 5)); // increment speed
            this.growSnake();
            this.drawScore();
            this.drawApple();
        }
    },
    growSnake: function() {
        var tail = this.snake[0];
        var x = this.snake[this.snake.length - 1].x + this.updateXY[this.direction].x * this.squareSize;
        var y = this.snake[this.snake.length - 1].y + this.updateXY[this.direction].y * this.squareSize;
        var t = this.add.sprite(x, y, 'snake');
        t.scale.set(this.characterScale);
        this.snake.push(t);
    },
    moveSnake: function() {
        --this.count;
        if (this.count === 0) {
            this.count = this.speed;
            var tail = this.snake.shift();
            tail.x = this.snake[this.snake.length - 1].x + this.updateXY[this.direction].x * this.squareSize;
            tail.y = this.snake[this.snake.length - 1].y + this.updateXY[this.direction].y * this.squareSize;
            this.snake.push(tail);
        }
    },
    updateDirection: function() {
        const opposites = {up: 'down', down: 'up', left: 'right', right: 'left'};
        const directions = Object.keys(opposites);
        const isPressed = d => this.cursors[d].isDown;
        const isValid = d => this.direction != opposites[d];
        const newDir = directions.find(d => isPressed(d) && isValid(d));
        if (newDir) this.direction = newDir;
    },
    drawApple: function() {
        var posX = game.rnd.integerInRange(0, this.width - 1);
        var posY = game.rnd.integerInRange(0, this.height - 1);
        var collidingWithSnake = false;
        for (var i = 0; i < this.snake.length; ++i) {
            if (posX === this.snake[i].x && posY === this.snake[i].y) {
                collidingWithSnake = true;
                break;
            }
        }
        if (!collidingWithSnake) this.apple.reset(posX * this.squareSize, posY * this.squareSize);
        else this.drawApple();
    }
};
