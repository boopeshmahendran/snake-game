var gameStart = {
    preload: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    create: function() {
        game.stage.backgroundColor = '#27ae60';
        var infoText = this.add.text(game.world.centerX, game.world.centerY, 'Snake Game\nClick to Start', fontStyle);
        infoText.anchor.set(0.5);
        game.input.onDown.add(this.startGame, this);
    },
    update: function() {
    },
    startGame: function() {
       game.state.start('mainGame');
    }
};
