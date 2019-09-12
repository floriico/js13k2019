import { Position } from "./position";
import { GlyphWriter } from "./glyphs";
import { Actor } from "./actor";

export interface InfoRendererOptions {
  viewportWidth: number;
  viewportHeight: number;
  position: Position;
  glyphWriter: GlyphWriter;
}

export class InfoRenderer {
  constructor (options: InfoRendererOptions) {
    this._viewportWidth = options.viewportWidth;
    this._viewportHeight = options.viewportHeight;
    this._position = options.position;
    this._glyphWriter = options.glyphWriter;
  }

  render (hero: Actor) {
    for (let y = this._position.y; y < this._viewportHeight; y++) {
      this._glyphWriter.writeGlyph('|', this._position.x * 4, y * 6);
    }
    this._glyphWriter.writeText('hero', (this._position.x + 1) * 4, 0);

    this._glyphWriter.writeText('LVL: ' + hero.getLevel() + '     ', (this._position.x + 1) * 4, 2 * 6);
    this._glyphWriter.writeText('XP:  ' + hero.getXp() + '/' + hero.getNextLevelXp() + '   ' , (this._position.x + 1) * 4, 3 * 6);

    let attack = hero.getAttack();
    this._glyphWriter.writeText('ATK: ' + attack[0] + '-' + attack[1], (this._position.x + 1) * 4, 5 * 6);
    this._glyphWriter.writeText('DEF: ' + hero.getDefense(), (this._position.x + 1) * 4, 6 * 6);
    this._glyphWriter.writeText('HP:  ' + hero.getHp() + '/' + hero.getHpMax() + '     ', (this._position.x + 1) * 4, 7 * 6);
  }

  private _viewportWidth: number;
  private _viewportHeight: number;
  private _position: Position;
  private _glyphWriter: GlyphWriter;
}