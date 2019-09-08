import { Map } from './map';
import { GlyphWriter } from './glyphs';
import { Actor } from './actor';
import { Position } from './position';
import { Color } from './color';

export interface MapRendererOptions {
  viewportWidth: number;
  viewportHeight: number;
  glyphWriter: GlyphWriter;
}

interface GlyphOptions {
  glyph: string,
  color: Color
}

export class MapRenderer {
  constructor (options: MapRendererOptions) {
    this._viewportWidth = options.viewportWidth;
    this._viewportHeight = options.viewportHeight;
    this._glyphWriter = options.glyphWriter;
  }

  render (map: Map, focus: Actor) {
    let offset = this.getOffset(map, focus);
    for (let y = 0; y < this._viewportHeight; y++) {
      for (let x = 0; x < this._viewportWidth; x++) {
        let cell = map.getCell({
          x: offset.x + x,
          y: offset.y + y
        });
        let glyphOptions = this.getGlyphOptions(cell);
        this._glyphWriter.writeGlyph(glyphOptions.glyph, x * 4, y * 6, glyphOptions.color);
      }
    }
  }

  private getOffset (map: Map, focus: Actor) : Position {
    let offset = focus.getPosition();
    let halfViewportWidth = Math.round(this._viewportWidth / 2);
    let halfViewportHeight = Math.round(this._viewportHeight / 2);
    offset.x = Math.max(offset.x - halfViewportWidth, 0);
    offset.y = Math.max(offset.y - halfViewportHeight, 0);
    offset.x = Math.min(offset.x, map.getWidth() - halfViewportWidth);
    offset.x = Math.min(offset.x, map.getHeight() - halfViewportHeight);
    return offset;
  }

  private getGlyphOptions (cell: number) : GlyphOptions {
    let glyph;
    let color;

    switch (cell) {
      case 0:
        glyph = '\x01';
        color = Color.DARK_BLUE;
        break;
      case 1:
        glyph = '\x01';
        color = Color.BLUE;
        break;
      case 2:
        glyph = '.';
        color = Color.YELLOW;
        break;
      case 3:
        glyph = ',';
        color = Color.GREEN;
        break;
      case 4:
        glyph = '"';
        color = Color.DARK_GREEN;
        break;
      case 5:
        glyph = '.';
        color = Color.DARK_GREY;
        break;
      default:
        glyph = '.';
        color = Color.GREY;
        break;
    }
    return {
      glyph: glyph,
      color: color
    };
  }

  private _viewportWidth: number;
  private _viewportHeight: number;
  private _glyphWriter: GlyphWriter;
}