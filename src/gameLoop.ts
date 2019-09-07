import { GameStage, EmptyGameStage, GameStageType } from "./GameStage";
import { Input } from "./input";
import { InputHandler } from "./inputHandler";

export enum GameLoopEvent {
  START_ADVENTURE
}

export class GameLoop {
  constructor () {
    this._currentStage = EmptyGameStage.getInstance();
    this._mainMenuStage = EmptyGameStage.getInstance();
    this._adventureStage = EmptyGameStage.getInstance();
    this._inputHandler = new InputHandler();
    this._inputHandler.listen();
    this._isRunning = false;
    this._intervalId = NaN;
  }

  start () {
    this._isRunning = true;
    this._intervalId = setInterval(this.tick.bind(this), 20);
  }

  stop () {
    this._isRunning = false;
    clearInterval(this._intervalId);
  }

  registerStage (type:GameStageType, stage:GameStage) {
    stage.registerGameLoop(this);
    switch (type) {
      case GameStageType.MAIN_MENU:
        this._mainMenuStage = stage;
        this._currentStage = this._mainMenuStage;
        break;
      case GameStageType.ADVENTURE:
        this._adventureStage = stage;
        break;
    }
  }

  tick () {
    if (this._isRunning) {
      let stage = this._currentStage;
      stage.handleInput(this._inputHandler.getNextInput());
      stage.update();
      requestAnimationFrame(stage.render.bind(stage));
    }
  }

  notify (event: GameLoopEvent) {
    switch (event) {
      case GameLoopEvent.START_ADVENTURE:
        this.stop();
        this._currentStage = this._adventureStage;
        this.start();
        break;
    }
  }

  private _currentStage: GameStage;
  private _mainMenuStage: GameStage;
  private _adventureStage: GameStage;
  private _isRunning: boolean;
  private _intervalId: number;
  private _inputHandler: InputHandler;
}