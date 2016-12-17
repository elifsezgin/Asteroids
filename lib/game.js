const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');

function Game() {
  this.asteroids = [];
  this.addAsteroids();
  let pos = this.randomPosition();
  this.ship = new Ship(pos);
}

Game.DIM_X = 700;
Game.DIM_Y = 700;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
  }
};

Game.prototype.randomPosition = function () {
  let xPos = Math.floor(Math.random()*Game.DIM_X);
  let yPos = Math.floor(Math.random()*Game.DIM_Y);

  return [xPos, yPos];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(function(obj) {
    obj.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(function(obj) {
    if (obj instanceof Asteroid) {
      obj.move();
    }
  });
};

Game.prototype.wrap = function(pos) {
  if (pos[0] > Game.DIM_X) {
    pos[0] -= Game.DIM_X;
  }
  else if (pos[0] < 0) {
    pos[0] += Game.DIM_X;
  }
  else if (pos[1] > Game.DIM_Y) {
    pos[1] += Game.DIM_Y;
  }
  else if (pos[1] < 0) {
    pos[1] += Game.DIM_Y;
  }

  return pos;
};

Game.prototype.checkCollisions = function() {
  let that = this;
  this.allObjects().forEach(function(aster1) {
    that.allObjects().forEach(function(aster2) {
      if (aster1 !== aster2) {
        debugger;
        if (aster1.isCollidedWith(aster2)) {

        }
      }
    });
  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (asteroid) {
  let index = this.asteroids.indexOf(asteroid);
  if (index > -1) {
    this.asteroids.splice(index, 1);
  }
};
Game.prototype.allObjects = function () {
  let all = this.asteroids.concat(this.ship);
  return all;
};

module.exports = Game;
