import { Game } from './game';
import { GameRenderer } from './gameRenderer';

const game = new Game();
const gameRenderer = new GameRenderer({
  game: game
});
gameRenderer.render();
