let GameView = require('./game_view.js');
let Game = require('./game.js');

document.addEventListener('DOMContentLoaded', function() {
  let canvasEl = document.getElementById('game-canvas');
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  let ctx = canvasEl.getContext("2d");
  let newGame = new Game();
  let newGameView = new GameView(newGame, ctx);
  newGameView.start();
});
