var gameOver = {
    preload: function() {
    },
    create: function() {
        var infoText = this.add.text(game.world.centerX, game.world.centerY, 'Game Over\nYour score is ' 
        	+ finalScore + '\nClick to Restart');
        infoText.anchor.set(0.5);
        game.input.onDown.add(this.startGame, this);
    },
    update: function() {
    },
    startGame: function() {
       game.state.start('mainGame');
    }
};
