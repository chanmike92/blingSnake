const Coord = require('./coord');

class Snake {
  constructor(board) {
    this.direction = 'N';
    this.turning = false;
    this.board = board;

    this.center = new Coord(Math.floor(board.dimensions/2), Math.floor(board.dimensions/2));
    this.segments = [this.center];

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
        this.board.ateApple();
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

    reset() {
      this.segments = [this.center];
    }
}

Snake.DIRECTIONS = {
  "N": new Coord(-1, 0),
  "E": new Coord(0, 1),
  "S": new Coord(1, 0),
  "W": new Coord(0, -1)
};

Snake.SYMBOL = "S";
Snake.GROW_TURNS = 2;

module.exports = Snake;
