const SnakeView = require('./snake-view');

$b(function () {
  const rootEl = $b('.snake-game');
  new SnakeView(rootEl);
});
