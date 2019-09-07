import { GlyphWriter } from "./glyphs";

export interface MainMenuRendererOptions {
  glyphWriter: GlyphWriter,
  viewportWidth: number;
  viewportHeight: number;
}

export class MainMenuRenderer {
  constructor (options: MainMenuRendererOptions) {
    this._glyphWriter = options.glyphWriter;
    this._viewPortHeight = options.viewportHeight;
    this._viewPortWidth = options.viewportWidth;
  }

  render () {
    this._glyphWriter.writeText('Hello', 0, 0);
    this._glyphWriter.writeText('Press Enter to continue ...', 0, 2 * 6);
  }

  private _glyphWriter: GlyphWriter;
  private _viewPortWidth: number;
  private _viewPortHeight: number;
}