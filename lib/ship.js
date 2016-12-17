const MovingObject = require('./moving_object.js');
const Game = require('./game.js');

function Ship(pos) {
  const COLOR = 'black';
  const RADIUS = 20;
  let vel = [0, 0];
  // debugger;
  MovingObject.call(this, pos, vel, RADIUS, COLOR);
}

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

module.exports = Ship;
