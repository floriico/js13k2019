import { GlyphWriter } from './glyphs';
import { Color } from './color';
import { GameLoop } from './gameLoop';
import { MainMenuStage } from './mainMenuStage';
import { MainMenuRenderer } from './mainMenuRenderer';
import { GameStageType } from './GameStage';
import { AdventureStage } from './adventureStage';
import { AdventureRenderer } from './adventureRenderer';
import { GameOverStage } from './gameOverStage';
import { GameOverRenderer } from './gameOverRenderer';

const glyphWriter = new GlyphWriter({
  backgroundColor: Color.BLACK,
  foregroundColor: Color.WHITE
});

const mainMenuStage = new MainMenuStage({
  renderer: new MainMenuRenderer({
    glyphWriter: glyphWriter,
    viewportWidth: 100,
    viewportHeight: 40
  })
});
const adventureStage = new AdventureStage({
  renderer: new AdventureRenderer({
    glyphWriter: glyphWriter
  })
});
const gameOverStage = new GameOverStage(new GameOverRenderer(glyphWriter));
const gameLoop = new GameLoop();
gameLoop.registerStage(GameStageType.MAIN_MENU, mainMenuStage);
gameLoop.registerStage(GameStageType.ADVENTURE, adventureStage);
gameLoop.registerStage(GameStageType.GAME_OVER, gameOverStage);
gameLoop.start();