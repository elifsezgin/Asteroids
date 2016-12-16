const Game = require('./game.js');

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  let that = this;
  setInterval(function() {
    Game.prototype.moveObjects();
    Game.prototype.draw(that.ctx);
  }, 20);
};
