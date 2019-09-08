import { Random } from './random';
import { Map } from './map';

export interface MapFactoryOptions {
  seed: number,
  detail: number,
  rougthness: number
}

class MidPointDisplacement {
  constructor (options: MapFactoryOptions) {
    this._random = new Random (options.seed);
    this._rougthness = options.rougthness;
    this._max = Math.pow(2, options.detail);
    this._size = this._max + 1;
    this._map = new Map({ width: this._size, height: this._size });
  }

  generate () {
    let resolution = this._max;
    while (resolution >= 2) {
      let half = resolution / 2;
      for (let x = half; x < this._size; x += resolution) {
        for (let y = half; y < this._size; y += resolution) {
          this.diamondStep(x, y, resolution);
        }
      }
      for (let y = 0; y < this._size; y += half) {
        for (let x = y % 2 ? 0 : half; x < this._size; x += half) {
          this.squareStep(x, y, half);
        }
      }
      resolution = half;
    }
    this._map.normalize(0, 5);
    return this._map;
  }

  diamondStep (cx: number, cy: number, resolution: number) {
    let half = resolution / 2;
    let average = (this._map.getCell({ x: cx - half, y: cy - half}) + 
      this._map.getCell({ x: cx + half, y: cy - half }) +
      this._map.getCell({ x: cx + half, y: cy + half }) +
      this._map.getCell({ x: cx - half, y: cy - half })
      ) / 4
    let depth  = Math.floor(this._random.next() * this._rougthness * resolution * 2 - resolution + average);
    this._map.setCell({x: cx, y: cy}, depth); 
  }

  squareStep (cx: number, cy: number, resolution: number) {
    let average = (this._map.getCell({ x: cx, y: cy - resolution }) +
      this._map.getCell({ x: cx, y: cy + resolution }) +
      this._map.getCell({ x: cx + resolution, y: cy }) +
      this._map.getCell({ x: cx - resolution, y: cy })
      ) / 4;
    let depth  = Math.floor(this._random.next() * this._rougthness * resolution * 2 - resolution + average);
    this._map.setCell({ x: cx, y: cy }, depth);
  }

  private _random: Random;
  private _max: number;
  private _size: number;
  private _rougthness: number;
  private _map: Map;
}

export class MapFactory {
  static createMap (options: MapFactoryOptions) {
    let generator = new MidPointDisplacement(options);
    return generator.generate();
  }
}