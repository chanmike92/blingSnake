const Snake = require('./snake');
const Apple = require('./apple');


class Board {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
    this.apples = 0;
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

  appleReset() {
    this.apples = 0;
  }

  ateApple() {
    this.apples++;
  }
}

Board.BLANK_SYMBOL = ".";

module.exports = Board;
