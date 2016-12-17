const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

function Game() {
  this.asteroids = [];
  this.addAsteroids();
  this.ships = [];
  this.addShip();
  this.bullets = [];
}

Game.DIM_X = 700;
Game.DIM_Y = 700;
Game.NUM_ASTEROIDS = 5;

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({
      pos: this.randomPosition(),
      game: this}));
  }
};

Game.prototype.addShip = function () {
  this.ships.push(new Ship({
    pos: this.randomPosition(),
    game: this
  }));
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
    obj.move();
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
    pos[1] -= Game.DIM_Y;
  }
  else if (pos[1] < 0) {
    pos[1] += Game.DIM_Y;
  }

  return pos;
};

Game.prototype.checkCollisions = function() {
  let that = this;
  this.allObjects().forEach(function(obj1) {
    that.allObjects().forEach(function(obj2) {
      if (obj1 !== obj2) {
        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      }
    });
  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (obj) {
  let objects;

  if (obj instanceof Asteroid) {
    objects = this.asteroids;
  } else if (obj instanceof Bullet) {
    objects = this.bullets;
  } else {
    return;
  }

  let index = objects.indexOf(obj);
  if (index > -1) {
    objects.splice(index, 1);
  }
};

Game.prototype.allObjects = function () {
  let all = this.asteroids.concat(this.ships);
  all = all.concat(this.bullets);
  return all;
};

module.exports = Game;
