const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');

Util.inherits(Asteroid, MovingObject);

function Asteroid(options = {}) {

  let colors = ["green", "yellow", "red", "purple", "blue", "pink"];
  options.color = colors[Math.floor(Math.random()* (colors.length))];
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(10);
  MovingObject.call(this, options);
}

Asteroid.RADIUS = 20;

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
};

module.exports = Asteroid;
