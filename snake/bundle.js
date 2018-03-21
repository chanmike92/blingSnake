/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/snake/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(coords) {
    return new Coord(this.x + coords.x, this.y + coords.y);
  }

  equals(coords) {
    return (this.x === coords.x && this.y === coords.y);
  }

  isOpposite(coords) {
    return (this.x === (coords.x * -1)) && (this.y === (coords.y * -1));
  }

}

module.exports = Coord;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const SnakeView = __webpack_require__(2);

$b(function () {
  const rootEl = $b('.snake-game');
  new SnakeView(rootEl);
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(3);


class View {
  constructor(el) {
    this.el = el;

    this.board = new Board(20);
    this.setupGrid();

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );

    window.addEventListener("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {

    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  }



  setupGrid() {
    let html = "";

    for (let i = 0; i < this.board.dimensions; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.dimensions; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.el.html(html);
    this.li = this.el.find("li");
  }

  step() {
    if (this.board.snake.length() > 0) {
      this.board.snake.move();
      this.render();
    } else {
      alert("You lose!");
      window.clearInterval(this.intervalId);
    }
  }
  //
  // render() {
  //   this.updateClasses(this.board.snake.segments, "snake");
  //   this.updateClasses([this.board.apple.position], "apple");
  // }
  //
  // updateClasses(coords, className) {
  //
  //   $b('li').removeClass(className);
  //
  //   coords.forEach(coord => {
  //     const flatCoord = (coord.i * this.board.dimensions) + coord.j;
  //     $b('li').htmlElements[flatCoord].addClass(className);
  //   });
  // }


  render() {
    $b("li").removeClass("snake");
    this.board.snake.segments.forEach( segment => {
      let idx = (segment.y * this.board.dimensions) + segment.x;

      $b(this.li[idx]).addClass("snake");

    });
    $b("li").removeClass("apple");
    let app = this.board.apple.position;
    let idx2 = (app.y * this.board.dimensions) + app.x;

    $b(this.li[idx2]).addClass("apple");
  }

}

View.KEYS = {
  38: "N",
  39: "E",
  40: "S",
  37: "W"
};

View.STEP_MILLIS = 100;

module.exports = View;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(4);
const Apple = __webpack_require__(5);


class Board {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }

  static blankGrid(dimensions) {
    const grid = [];

    for (let i = 0; i < dimensions; i++) {
      const row = [];
      for (let j = 0; j < dimensions; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }

    return grid;
  }

  render() {
    const grid = Board.blankGrid(this.dimensions);

    this.snake.segments.forEach( segment => {
      grid[segment.x][segment.y] = Snake.SYMBOL;
    });

    grid[this.apple.position.x][this.apple.position.y] = Apple.SYMBOL;

    const rowStrs = [];
    grid.map( row => row.join("") ).join("\n");
  }

  validPosition(coord) {
    return (coord.x >= 0) && (coord.x < this.dimensions) &&
      (coord.y >= 0) && (coord.y < this.dimensions);
  }
}

Board.BLANK_SYMBOL = ".";

module.exports = Board;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(0);

class Snake {
  constructor(board) {
    this.direction = 'N';
    this.turning = false;
    this.board = board;

    const center = new Coord(Math.floor(board.dimensions/2), Math.floor(board.dimensions/2));
    this.segments = [center];

    this.growTurns = 0;
  }

  eatApple() {
      if (this.head().equals(this.board.apple.position)) {
        this.growTurns += 2;
        return true;
      } else {
        return false;
      }
    }

    isOccupying(array) {
      let result = false;
      this.segments.forEach( segment => {
        if (segment.i === array[0] && segment.j === array[1]) {
          result = true;
          return result;
        }
      });
      return result;
    }

    head() {
      return this.segments.slice(-1)[0];
    }

    isValid() {
      const head = this.head();

      if (!this.board.validPosition(this.head())) {

        return false;
      }

      for (let i = 0; i < this.length() - 1; i++) {
        if (this.segments[i].equals(head)) {
          return false;
        }
      }

      return true;
    }

    move() {

      this.segments.push(this.head().plus(Snake.DIRECTIONS[this.direction]));

      this.turning = false;

      if (this.eatApple()) {
        this.board.apple.replace();
      }

      if (this.growTurns > 0) {

        this.growTurns -= 1;
      } else {
        this.segments.shift();
      }

      if (!this.isValid()) {

        this.segments = [];
      }
    }

    turn(dir) {

      if (Snake.DIRECTIONS[this.direction].isOpposite(Snake.DIRECTIONS[dir]) ||
        this.turning) {

        return;
      } else {

        this.turning = true;
        this.direction = dir;
      }
    }

    length() {
      return this.segments.length;
    }
}

Snake.DIRECTIONS = {
  "N": new Coord(0, -1),
  "E": new Coord(1, 0),
  "S": new Coord(0, 1),
  "W": new Coord(-1, 0)
};

Snake.SYMBOL = "S";
Snake.GROW_TURNS = 2;

module.exports = Snake;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(0);

class Apple {
  constructor(board) {
    this.board = board;
    this.replace();
  }

  replace() {
    let x = Math.floor(Math.random() * this.board.dimensions);
    let y = Math.floor(Math.random() * this.board.dimensions);

    while (this.board.snake.isOccupying([x, y])) {
      x = Math.floor(Math.random() * this.board.dimensions);
      y = Math.floor(Math.random() * this.board.dimensions);
    }

    this.position = new Coord(x, y);
  }

}

module.exports = Apple;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map