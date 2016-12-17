const Util = require('./util.js');
const MovingObject = require('./moving_object.js');



Util.inherits(Bullet, MovingObject);

function Bullet(options) {
  options.radius = Bullet.RADIUS;
  // options.vel = [0, 0];
  MovingObject.call(this, options);
}

Bullet.RADIUS = 5;

Bullet.prototype.isWrappable = false;

module.exports = Bullet;
