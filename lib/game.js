const Asteroid = require('./asteroid.js');

function Game() {
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X = 100;
Game.DIM_Y = 100;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition()));
  }
};

Game.prototype.randomPosition = function () {
  let xPos = Math.floor(Math.random()*Game.DIM_X);
  let yPos = Math.floor(Math.random()*Game.DIM_Y);
  return [xPos, yPos];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach(function(asteroid) {
    asteroid.draw(ctx);
  });
};

module.extends = Game;
