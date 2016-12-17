const Game = require('./game.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');
const Key = require('../vendor/keymaster.js');

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
};


GameView.prototype.start = function() {
  let that = this;
  this.bindKeyHandlers();
  setInterval(function() {
    that.game.step();
    that.game.draw(that.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  let ship = this.game.ships[0];
  Object.keys(GameView.MOVES).forEach( function(k) {
    let move = GameView.MOVES[k];
    global.key(k, function() {
      ship.power(move);
    });
  });
  global.key("space", function() { ship.fireBullet(); });
};

module.exports = GameView;
