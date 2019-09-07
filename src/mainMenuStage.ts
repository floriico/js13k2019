import { GameStage } from "./GameStage";
import { Input } from "./input";
import { MainMenuRenderer } from "./mainMenuRenderer";
import { GameLoopEvent } from "./gameLoop";

export interface MainMenuRendererOptions {
  renderer: MainMenuRenderer
}

export class MainMenuStage extends GameStage {

  constructor(options: MainMenuRendererOptions) {
    super();
    this._renderer = options.renderer;
  }
  
  handleInput(input: Input): void {
    if (input === Input.ENTER) {
      this.notifyGameLoop(GameLoopEvent.START_ADVENTURE);
    }
  }
    
  render(): void {
    this._renderer.render();
  }

  update(): void {}

  private _renderer: MainMenuRenderer;

}