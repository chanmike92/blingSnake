const Coord = require("./coord");

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
