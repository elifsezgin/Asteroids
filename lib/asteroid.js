const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

Util.inherits(Asteroid, MovingObject);

function Asteroid(pos, game) {
  let colors = ["green", "yellow", "red", "purple", "blue", "pink"];
  this.COLOR = colors[Math.floor(Math.random()*6)];
  this.RADIUS = 20;

  let vel = Util.randomVec(10);
  MovingObject.call(this, pos, vel, this.RADIUS, this.COLOR, game);
}

module.exports = Asteroid;
