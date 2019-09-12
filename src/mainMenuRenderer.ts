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
    this._glyphWriter.writeText('Welcome back hero,', 20 * 4, 4 * 6);
    this._glyphWriter.writeText('A terrible Dragon have claimed our castle while you were overseas.', 20 * 4, 7 * 6);
    this._glyphWriter.writeText('Evil creatures are know walking upon our land.', 20 * 4 , 8 * 6);
    this._glyphWriter.writeText('You must fight those monsters and win back our castle.', 20 * 4, 9 * 6);

    this._glyphWriter.writeText('Use arrow keys to move.', 20 * 4, 12 * 6);
    this._glyphWriter.writeText('Use space bar to rest.', 20 * 4, 13 * 6);
    
    this._glyphWriter.writeText('Press Enter to continue ...', 20 * 4, 16 * 6);
  }

  private _glyphWriter: GlyphWriter;
  private _viewPortWidth: number;
  private _viewPortHeight: number;
}