import { GameStage } from "./GameStage";
import { GameOverRenderer } from "./gameOverRenderer";
import { Input } from "./input";

export class GameOverStage extends GameStage {
  constructor (renderer: GameOverRenderer) {
    super ();
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

  private _renderer: GameOverRenderer;
}