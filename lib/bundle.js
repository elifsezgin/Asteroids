/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let GameView = __webpack_require__(1);
	let Game = __webpack_require__(3);

	document.addEventListener('DOMContentLoaded', function() {
	  let canvasEl = document.getElementById('game-canvas');
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	  let ctx = canvasEl.getContext("2d");
	  let newGame = new Game();
	  let newGameView = new GameView(newGame, ctx);
	  newGameView.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(3);

	function GameView(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}

	GameView.prototype.start = function() {
	  let that = this;
	  setInterval(function() {
	    that.game.step();
	    that.game.draw(that.ctx);
	  }, 20);
	};

	module.exports = GameView;


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(4);
	const Ship = __webpack_require__(7);

	function Game() {
	  this.asteroids = [];
	  this.addAsteroids();
	  this.ship = new Ship(this.randomPosition());
	}

	Game.DIM_X = 700;
	Game.DIM_Y = 700;
	Game.NUM_ASTEROIDS = 40;

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
	  // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.allObjects.forEach(function(asteroid) {
	    asteroid.draw(ctx);
	  });
	};

	Game.prototype.moveObjects = function() {
	  this.allObjects.forEach(function(asteroid) {
	    asteroid.move();
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
	  this.allObjects.forEach(function(aster1) {
	    that.allObjects.forEach(function(aster2) {
	      if (aster1 !== aster2) {
	        if (aster1.isCollidedWith(aster2)) {
	          that.remove(aster1);
	          that.remove(aster2);
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(5);
	const MovingObject = __webpack_require__(6);

	Util.inherits(Asteroid, MovingObject);

	function Asteroid(pos, game) {
	  let colors = ["green", "yellow", "red", "purple", "blue", "pink"];
	  this.COLOR = colors[Math.floor(Math.random()*6)];
	  this.RADIUS = 20;

	  let vel = Util.randomVec(10);
	  MovingObject.call(this, pos, vel, this.RADIUS, this.COLOR, game);
	}

	module.exports = Asteroid;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, parentClass) {
	    function Surrogate() {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate;
	    childClass.prototype.constructor = childClass;
	  },
	  // Return a randomly oriented vector with the given length.
	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return this.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};

	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports) {

	function MovingObject(pos, vel, radius, color, game) {
	  this.pos = pos;
	  this.vel = vel;
	  this.radius = radius;
	  this.color = color;
	  this.game = game;
	}

	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI*2);
	  ctx.closePath();
	  ctx.fill();
	};

	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  this.pos = this.game.wrap(this.pos);
	};

	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  return (Math.sqrt(
	    Math.pow(
	      (this.pos[0] - otherObject.pos[0]), 2
	    ) + Math.pow(
	      (this.pos[1] - otherObject.pos[1]), 2
	    )) <= (this.radius + otherObject.radius));
	  };

	module.exports = MovingObject;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(6);

	function Ship(pos) {
	  this.pos = pos;
	  this.COLOR = 'black';
	  this.RADIUS = 20;
	  this.vel = [0, 0];


	}


/***/ }
/******/ ]);