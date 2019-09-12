import { Input } from "./input";
import { GameLoop, GameLoopEvent } from "./gameLoop";

export enum GameStageType {
  MAIN_MENU,
  ADVENTURE,
  GAME_OVER
}

export abstract class GameStage {
  abstract handleInput(input: Input): void;
  abstract update(): void;
  abstract render(): void;

  registerGameLoop (gameLoop: GameLoop) {
    this._gameLoop = gameLoop;
  }

  notifyGameLoop (event: GameLoopEvent) {
    this._gameLoop && this._gameLoop.notify(event);
  }

  private _gameLoop?: GameLoop; 
}

export class EmptyGameStage extends GameStage {
  handleInput(input: Input): void {}
  update(): void {}
  render(): void {}

  static getInstance() {
    return EmptyGameStage.instance;
  }

  private static instance = new EmptyGameStage();
}