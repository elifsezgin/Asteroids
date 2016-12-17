const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Game = require('./game.js');

Util.inherits(Ship, MovingObject);

function Ship (options) {
  options.radius = Ship.RADIUS;
  options.color = 'black';
  options.vel = [0, 0];
  MovingObject.call(this, options);
}

Ship.RADIUS = 40;

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

module.exports = Ship;
