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
import { Position } from "./position";
import { actionAttack } from "./actionAttack";
import { ActionRest } from "./actionRest";
import { GameLoopEvent } from "./gameLoop";

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
      case Input.SPACE:
        this._hero.pushAction(new ActionRest(this));
        break;
    }
  }
  
  update(): void {
    if (this._hero.isDead()) {
      this.notifyGameLoop(GameLoopEvent.GAME_OVER);
    }
    if (this._hero.hasAction()) {
      this.ia();
      this._actors.forEach((actor) => {
        let result;
        do {
          let action = actor.getNextAction()
          result = action.perform(actor);
          let delegate = result.getDelegate();
          if (!(result.isOk()) && delegate) {
            actor.pushAction(delegate);
          }
        } while (!(result.isOk()));
      });
      this._actors = this._actors.filter((actor) => !(actor.isDead()));
    }
  }

  private ia(): void {
    this._actors.forEach((actor) => {
      if (!(actor.hasAction())) {
        let position = actor.getPosition();
        let heroPosition = this._hero.getPosition();
        let dist = Math.abs(position.x - heroPosition.x) + Math.abs(position.y - heroPosition.y);
        if (dist === 1) {
          actor.pushAction(new actionAttack(this, this._hero))
        } else {
          let d4 = Math.floor(Math.random() * 4);
          let direction: Direction;
          switch (d4) {
            case 0: direction = Direction.NORTH; break;
            case 1: direction = Direction.SOUTH; break;
            case 2: direction = Direction.WEST; break;
            default: direction = Direction.EAST; break;
          }
          actor.pushAction(new ActionWalk(this, direction));
        }
      }
    });
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
      position: { x: 120, y: 120 },
      glyph: '@',
      name: 'you',
      maxHp: 10,
      hp: 10,
      attack: [1,2],
      defense: 0,
    });
  }

  private createConsole () : Console {
    return new Console();
  }

  private createEnemies () {
    for (let r = 0; r < 20; r ++) {
      let position = {
        x: Math.round(Math.random() * 108 + 10),
        y: Math.round(Math.random() * 30) + 90
      }
      this._actors.push(this.createRat(position));
    }
    this._actors.push(new Actor({
      position: { x: 66, y: 59 },
      glyph: 'D',
      name: 'dragon',
      color: Color.RED,
      maxHp: 30,
      hp: 30,
      attack: [6, 8],
      defense: 4
    }));
  }

  private createRat (position: Position) {
    return new Actor ({
      position: position,
      glyph: 'r',
      name: 'rat',
      color: Color.GREY,
      maxHp: 4,
      hp: 4,
      attack: [1,2],
      defense: 0
    })
  }

  private _map: Map;
  private _hero: Actor;
  private _actors: Actor[];
  private _console: Console;
  private _renderer: AdventureRenderer;
}