import { Map } from './map';
import { writeGlyph, GlyphWriter } from './glyphs';
import { Actor } from './actor';

export interface MapRendererOptions {
  viewportWidth: number;
  viewportHeight: number;
  glyphWriter: GlyphWriter;
  map: Map;
  focus: Actor;
}

export class MapRenderer {
  constructor (options: MapRendererOptions) {
    this._viewportWidth = options.viewportWidth;
    this._viewportHeight = options.viewportHeight;
    this._glyphWriter = options.glyphWriter;
    this._map = options.map;
    this._focus = options.focus;
  }

  render () {
    for (let y = 0; y < this._viewportHeight; y++) {
      for (let x = 0; x < this._viewportWidth; x++) {
        let cell = this._map.getCell({x: x, y: y});
        let glyph = this.getGlyph(cell);
        this._glyphWriter.writeGlyph(glyph, x * 4, y * 6);
      }
    }
  }

  private getGlyph (cell: number) {
    let glyph;
    switch (cell) {
      case 0:
        glyph = '0';
        break;
      case 1:
        glyph = '1';
        break;
      case 2:
        glyph = '2';
        break;
      case 3:
        glyph = '3';
        break;
      case 4:
        glyph = '4';
        break;
      case 5:
        glyph = '5';
        break;
      case 6:
        glyph = '6';
        break;
      case 7:
        glyph = '7';
        break;
      case 8:
        glyph = '8';
        break;
      case 9:
        glyph = '9';
        break;
      case 10:
        glyph = 'A';
        break;
      default:
        glyph = '.';
        break;
    }
    return glyph;
  }

  private _viewportWidth: number;
  private _viewportHeight: number;
  private _glyphWriter: GlyphWriter;
  private _map: Map;
  private _focus: Actor;
}