const Game = require('./game.js');
const Ship = require('./ship.js');
// const Key = require('./keymaster.js');

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  let that = this;
  setTimeout(function() {
    that.game.step();
    that.game.draw(that.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  // key.bind(null, this.game.ship.power());
};

module.exports = GameView;
