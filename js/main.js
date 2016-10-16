var game = new Phaser.Game(900, 900, Phaser.AUTO);
var finalScore = 0;
var fontStyle = {font: '30px Open Sans', fill: '#2c3e50'};

game.state.add('gameStart', gameStart);
game.state.add('mainGame', mainGame);
game.state.add('gameOver', gameOver);
game.state.start('gameStart');
