import { GameStage } from "./GameStage";
import { Map } from "./map";
import { Actor } from "./actor";
import { MapFactory } from "./mapFactory";
import { Console } from "./console";
import { AdventureRenderer } from "./adventureRenderer";

export interface AdventureStageOptions {
  renderer: AdventureRenderer
}

export class AdventureStage extends GameStage {
  constructor (options: AdventureStageOptions) {
    super();
    this._map = this.createMap();
    this._hero = this.createHero();
    this._actors = [this._hero];
    this._console = this.createConsole();
    this._renderer = options.renderer;
  }

  handleInput(input: import("./input").Input): void {
    
  }
  
  update(): void {
    
  }
  
  render(): void {
    this._renderer.render(this);
  }

  getMap () {
    return this._map;
  }

  getHero () {
    return this._hero;
  }

  getActors () {
    return this._actors;
  } 

  getConsole () {
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

  private _map: Map;
  private _hero: Actor;
  private _actors: Actor[];
  private _console: Console;
  private _renderer: AdventureRenderer;
}