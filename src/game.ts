import { GameState } from './gameState';
import { MapFactory } from './mapFactory';
import { Map } from './map';
import { Actor } from './actor';
import { Console } from './console';

export class Game {
  constructor () {
    this._state = GameState.PLAY;
    this._map = this.createMap();
    this._hero = this.createHero();
    this._actors = [this._hero];
    this._console = this.createConsole();
  }

  getHero () : Actor {
    return this._hero;
  }

  getMap () : Map {
    return this._map;
  }

  getActors () : Actor[] {
    return this._actors;
  }

  getConsole () : Console {
    return this._console;
  }

  private createMap() : Map {
    return MapFactory.createMap({
      seed: 4242,
      detail: 9,
      rougthness: 0.95
    });
  }

  private createHero() : Actor {
    return new Actor ({
      position: { x: 40, y: 20 },
      glyph: '@'
    });
  }

  private createConsole () : Console {
    return new Console();
  }

  private _state: GameState;
  private _map: Map;
  private _hero: Actor;
  private _actors: Actor[];
  private _console: Console;
}