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
	let Game = __webpack_require__(2);

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

	const Game = __webpack_require__(2);
	const MovingObject = __webpack_require__(5);
	const Ship = __webpack_require__(6);
	// const Key = require('./keymaster.js');

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

	GameView.prototype.bindKeyHandlers = function () {
	  // key.bind(null, this.game.ship.power());
	};

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);

	function Game() {
	  this.asteroids = [];
	  this.addAsteroids();
	  this.ships = [];
	  this.addShip();
	}

	Game.DIM_X = 700;
	Game.DIM_Y = 700;
	Game.NUM_ASTEROIDS = 50;

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
	        if (aster1.isCollidedWith(aster2)) {
	          aster1.collideWith(aster2);
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
	  let all = this.asteroids.concat(this.ships);
	  return all;
	};

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	const Ship = __webpack_require__(6);

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


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);

	function MovingObject(options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
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

	MovingObject.prototype.collideWith = function (otherObject) {
	//do nothing
	};

	module.exports = MovingObject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	const Game = __webpack_require__(2);

	Util.inherits(Ship, MovingObject);

	function Ship (options) {
	  options.radius = Ship.RADIUS;
	  options.color = 'black';
	  options.vel = [0, 0];
	  MovingObject.call(this, options);
	}

	Ship.RADIUS = 20;

	Ship.prototype.relocate = function () {
	  this.pos = this.game.randomPosition();
	  this.vel = [0,0];
	};

	Ship.prototype.power = function (impulse) {
	  this.vel[0] += impulse[0];
	  this.vel[1] += impulse[1];
	};

	module.exports = Ship;


/***/ }
/******/ ]);