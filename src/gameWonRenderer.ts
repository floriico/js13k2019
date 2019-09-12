import { GlyphWriter } from "./glyphs";

export class GameWonRenderer {
  constructor (glyphWriter: GlyphWriter) {
    this._glyphWriter = glyphWriter;
  }

  render (): void {
    this._glyphWriter.writeText('+-------------+', 44 * 4, 23 * 6);
    this._glyphWriter.writeText('|             |', 44 * 4, 24 * 6);
    this._glyphWriter.writeText('|  You won !  |', 44 * 4, 25 * 6);
    this._glyphWriter.writeText('|             |', 44 * 4, 26 * 6);
    this._glyphWriter.writeText('+-------------+', 44 * 4, 27 * 6);
  }

  private _glyphWriter: GlyphWriter
}