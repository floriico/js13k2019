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
    this._map.normalize(2, 7);
    this.createOcean();
    this.createCastle();
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

  createOcean () {
    const width = this._map.getWidth();
    const height = this._map.getHeight();
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < width; x++) {
        let topPosition = { x: x, y: y };
        let bottomPosition = { x: x, y: height - y - 1 };
        let cellTop = this._map.getCell(topPosition);
        let cellBottom = this._map.getCell(bottomPosition);
        cellTop = Math.max(0, cellTop - 7 + y);
        cellBottom = Math.max(0, cellBottom - 7 + y);
        this._map.setCell(topPosition, cellTop);
        this._map.setCell(bottomPosition, cellBottom);
      }
    }
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < 7; x++) {
        let topPosition = { x: x, y: y };
        let bottomPosition = { x: width - x - 1, y: y };
        let cellTop = this._map.getCell(topPosition);
        let cellBottom = this._map.getCell(bottomPosition);
        cellTop = Math.max(0, cellTop - 7 + x);
        cellBottom = Math.max(0, cellBottom - 7 + x);
        this._map.setCell(topPosition, cellTop);
        this._map.setCell(bottomPosition, cellBottom);
      }
    }
  }

  private createCastle () {
    this._map.fillBox(49, 49, 54, 54, 10);
    this._map.fillBox(65, 50, 68, 53, 10);
    this._map.fillBox(79, 49, 84, 54, 10);
    this._map.fillBox(53, 51, 80, 52, 10);
    this._map.fillBox(51, 54, 52, 65, 10);
    this._map.fillBox(49, 65, 54, 70, 10);
    this._map.fillBox(81, 54, 82, 65, 10);
    this._map.fillBox(79, 65, 84, 70, 10);

    this._map.fillBox(54, 67, 60, 68, 10);
    this._map.fillBox(60, 66, 63, 69, 10);

    this._map.fillBox(73, 67, 79, 68, 10);
    this._map.fillBox(70, 66, 73, 69, 10);
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