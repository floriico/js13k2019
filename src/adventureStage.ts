import { GameStage } from "./GameStage";
import { Map } from "./map";
import { Actor } from "./actor";
import { MapFactory } from "./mapFactory";
import { Console } from "./console";
import { AdventureRenderer } from "./adventureRenderer";
import { Input } from "./input";
import { ActionWalk } from "./actionWalk";
import { Direction } from "./direction";
import { Color } from "./color";

export interface AdventureStageOptions {
  renderer: AdventureRenderer
}

export class AdventureStage extends GameStage {
  constructor (options: AdventureStageOptions) {
    super();
    this._map = this.createMap();
    this._hero = this.createHero();
    this._actors = [this._hero];
    this.createEnemies();
    this._console = this.createConsole();
    this._renderer = options.renderer;
  }

  handleInput(input: Input): void {
    switch (input) {
      case Input.ARROW_UP:
        this._hero.pushAction(new ActionWalk(this, Direction.NORTH));
        break;
      case Input.ARROW_DOWN:
        this._hero.pushAction(new ActionWalk(this, Direction.SOUTH));
        break;
      case Input.ARROW_LEFT:
        this._hero.pushAction(new ActionWalk(this, Direction.WEST));
        break;
      case Input.ARROW_RIGHT:
        this._hero.pushAction(new ActionWalk(this, Direction.EAST));
        break;
    }
  }
  
  update(): void {
    if (this._hero.hasAction()) {
      this._actors.forEach(function (actor) {
        let action = actor.getNextAction();
        action.perform(actor);
      });
    }
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
      detail: 7,
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

  private createEnemies () {
    this._actors.push(new Actor ({
      position: {x: 10, y: 10},
      glyph: 'r',
      color: Color.GREY
    }));
  }

  private _map: Map;
  private _hero: Actor;
  private _actors: Actor[];
  private _console: Console;
  private _renderer: AdventureRenderer;
}