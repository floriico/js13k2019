const N = 2147483647;
const G = 48271;

export class Random {
  constructor (seed: number) {
    this._seed = seed;
  }

  next () {
    this._seed = (G * this._seed) % N;
		return this._seed / N;
  }

  private _seed: number;
}