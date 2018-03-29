const Board = require('./board.js');


class View {
  constructor(el) {
    this.el = el;
    this.time = 100;
    this.board = new Board(20);
    this.score = 0;

    this.handleStart = this.handleStart.bind(this);
    this.handleStart();
  }

  handleStart() {
      const start = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          this.setupGrid();
          this.board.snake.reset();
          this.intervalId = window.setInterval(
            this.step.bind(this),
            this.time
          );
          // window.removeEventListener('keypress', start);
          window.removeEventListener('keypress', start);
          window.addEventListener("keydown", this.handleKeyEvent.bind(this));
        }
      };
    window.addEventListener('keypress', start);
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
      if (this.board.apples > (this.score / 50)) {
        window.clearInterval(this.intervalId);
        this.time = this.time * 0.95;
        this.intervalId = window.setInterval(
          this.step.bind(this),
          this.time
        );
        this.score = this.board.apples * 50;

      }
      this.render();
    } else {
      this.endGame();
      // alert("You lose!");
      // window.clearInterval(this.intervalId);
    }
  }

  endGame() {
    $b('figure').html('<div>You lose. Press Enter to play again</div>');
    window.clearInterval(this.intervalId);
    window.removeEventListener('keydown', this.handleKeyEvent.bind(this));
    this.score = 0;
    this.time = 100;
    this.board.appleReset();
    this.handleStart();
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
    $b(".score").html(`Score: ${this.score}`)
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
