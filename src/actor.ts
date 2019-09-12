import { Position } from './position';
import { Direction } from './direction';
import { Action } from './action';
import { ActionDoNothing } from './actiondoNothing';
import { Color } from './color';

export interface ActorOptions {
  position: Position,
  glyph: string,
  color?: Color,
  name: string,
  maxHp: number,
  hp: number,
  attack: [number, number],
  defense: number 
}

export class Actor {
  constructor (options: ActorOptions) {
    this._position = options.position;
    this._glyph = options.glyph;
    this._actions = [];
    this._color = options.color || Color.WHITE;
    this._name = options.name;
    this._maxHp = options.maxHp;
    this._hp = options.hp;
    this._attack = options.attack;
    this._defense = options.defense;
    this._isDead = false;
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

  getName (): string {
    return this._name;
  }

  getHp (): number {
    return this._hp;
  }

  setHp (hp: number) {
    this._hp = Math.min(this._maxHp, hp);
    if (this._hp < 0) {
      this._hp = 0;
      this._isDead = true;
    }
  }

  getAttack (): [number, number] {
    return this._attack;
  }

  getDefense (): number {
    return this._defense;
  }

  isDead (): boolean {
    return this._isDead;
  }

  private _position: Position;
  private _glyph: string;
  private _actions: Action[];
  private _color: Color;
  private _name: string;
  private _maxHp: number;
  private _hp: number;
  private _attack: [number, number];
  private _defense: number;
  private _isDead: boolean;
}