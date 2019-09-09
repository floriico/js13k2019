import { Position } from './position';
import { Direction } from './direction';
import { Action } from './action';
import { ActionDoNothing } from './actiondoNothing';
import { Color } from './color';

export interface ActorOptions {
  position: Position,
  glyph: string,
  color?: Color
}

export class Actor {
  constructor (options: ActorOptions) {
    this._position = options.position;
    this._glyph = options.glyph;
    this._actions = [];
    this._color = options.color || Color.WHITE;
  }

  getPosition (): Position {
    return {
      x: this._position.x,
      y: this._position.y
    };
  }

  setPosition (position: Position) {
    this._position = position;
  }

  getGlyph (): string {
    return this._glyph;
  }

  getColor (): Color {
    return this._color;
  }

  pushAction (action: Action) {
    this._actions.push(action);
  }

  getNextAction () : Action {
    return this._actions.shift() || ActionDoNothing.getInstance();
  }

  hasAction () : boolean {
    return this._actions.length > 0;
  }

  private _position: Position;
  private _glyph: string;
  private _actions: Action[];
  private _color: Color;
}