const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

Util.inherits(Asteroid, MovingObject);

function Asteroid(options) {

  let colors = ["green", "yellow", "red", "purple", "blue", "pink"];
  options.color = colors[Math.floor(Math.random()* (colors.length))];
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(5);
  MovingObject.call(this, options);
}

Asteroid.RADIUS = 30;
Asteroid.SPEED = 15;

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  } else if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

module.exports = Asteroid ;
