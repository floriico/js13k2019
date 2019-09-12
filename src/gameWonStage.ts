import { GameWonRenderer } from "./gameWonRenderer";
import { GameStage } from "./GameStage";
import { Input } from "./input";

export class GameWonStage extends GameStage {
  constructor (renderer: GameWonRenderer) {
    super();
    this._renderer = renderer;
  }

  handleInput(input: Input): void {
    if (input === Input.ENTER) {
      window.location.reload();
    }
  }

  update(): void {}

  render(): void {
    this._renderer.render();
  }

  

  private _renderer: GameWonRenderer;
}