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
