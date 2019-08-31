import { Position } from './position';

export interface ActorOptions {
  position: Position,
  glyph: string
}

export class Actor {
  constructor (options: ActorOptions) {
    this._position = options.position;
    this._glyph = options.glyph;
  }

  getPosition (): Position {
    return {
      x: this._position.x,
      y: this._position.y
    };
  }

  getGlyph (): string {
    return this._glyph;
  }

  private _position: Position;
  private _glyph: string;
}