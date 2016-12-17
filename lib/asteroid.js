const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');

Util.inherits(Asteroid, MovingObject);

function Asteroid(pos, game) {
  let colors = ["green", "yellow", "red", "purple", "blue", "pink"];
  const COLOR = colors[Math.floor(Math.random()*6)];
  const RADIUS = 20;

  let vel = Util.randomVec(10);
  MovingObject.call(this, pos, vel, RADIUS, COLOR, game);
}

Asteroid.prototype.collideWith = function(otherObject) {
  // if (otherObject instanceof Ship) {
  //   otherObject.relocate();
  // }
};

module.exports = Asteroid;
