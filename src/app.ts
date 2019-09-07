import { Game } from './game';
import { GameRenderer } from './gameRenderer';
import { GlyphWriter } from './glyphs';
import { Color } from './color';

const game = new Game();
const glyphWriter = new GlyphWriter({
  backgroundColor: Color.BLACK,
  foregroundColor: Color.WHITE
});

const gameRenderer = new GameRenderer({
  game: game,
  glyphWriter: glyphWriter
});
gameRenderer.render();
