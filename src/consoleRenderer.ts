import { Console } from './console';
import { GlyphWriter } from './glyphs';
import { Position } from './position';

export interface ConsoleRendererOptions {
  viewportWidth: number;
  viewportHeight: number;
  glyphWriter: GlyphWriter;
  position: Position;
}

export class ConsoleRenderer {

  constructor (options: ConsoleRendererOptions) {
    this._viewportWidth = options.viewportWidth;
    this._viewportHeight = options.viewportHeight;
    this._glyphWriter = options.glyphWriter;
    this._position = options.position;
  }

  render (console: Console) {
    for (let i = 0; i < this._viewportWidth; i++) {
      this._glyphWriter.writeGlyph('-', (i + this._position.x) * 4, this._position.y * 6);
    }
    console.getMessages(5)
      .forEach((message, index) => {
        this._glyphWriter.writeText(message, this._position.x, (this._position.y + index + 1) * 6 )
      }, this);
  }

  private _viewportWidth: number;
  private _viewportHeight: number;
  private _position: Position;
  private _glyphWriter: GlyphWriter;
}