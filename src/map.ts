import { Position } from './position';

export interface MapOptions {
  width: number,
  height: number
}

export class Map {


  constructor (options: MapOptions) {
    this._width = options.width;
    this._height = options.height;
    this._size = this._width * this._height;
    this._cells = new Array(this._size).fill(0);
  }

  getCell (position: Position) {
    if ((position.x < 0) || (position.x >= this._width)) { return 0; }
    if ((position.y < 0) || (position.y >= this._height)) { return 0; }
    return this._cells[position.x + position.y * this._width];
  }

  setCell (position: Position, value: number) {
    if ((position.x < 0) || (position.x >= this._width)) { return 0; }
    if ((position.y < 0) || (position.y >= this._height)) { return 0; }
    this._cells[position.x + position.y * this._width] = value;
  }

  getMin () {
    let min = Number.MAX_SAFE_INTEGER;
    this._cells.forEach(function (cell) {
      if (cell < min) {
        min = cell;
      }
    });
    return min;
  }

  getMax () {
    let max = Number.MIN_SAFE_INTEGER;
    this._cells.forEach(function (cell) {
      if (cell > max) {
        max = cell;
      }
    });
    return max;
  }

  normalize (min: number, max: number) {
    const mapMin = this.getMin();
    const mapMax = this.getMax();
    const mapRange = mapMax - mapMin;
    const range = max - min;

    this._cells = this._cells.map(function (cell) {
      return Math.floor(((cell - mapMin) * range) / mapRange + min);
    });
  }

  private _width: number;
  private _height: number;
  private _size: number;
  private _cells: number[];
}