import { Actor } from './actor';
import { Position } from './position';
import { GlyphWriter } from './glyphs';
import { Map } from './map';

export interface ActorRendererOptions {
  glyphWriter: GlyphWriter;
  viewportWidth: number;
  viewportHeigth: number;
}

export class ActorRenderer {
  constructor (options: ActorRendererOptions) {
    this._glyphWriter = options.glyphWriter;
    this._viewportWidth = options.viewportWidth;
    this._viewportHeight = options.viewportHeigth;
  }

  render (actors: Actor[], map: Map, focus: Actor) {
    const position = this.getPosition(map, focus);
    actors
      .filter(actor => {
        const actorPosition = actor.getPosition();
        
        return (actorPosition.x >= position.x) && 
          (actorPosition.x <= (position.x + this._viewportWidth)) &&
          (actorPosition.y >= position.y) && 
          (actorPosition.y <= (position.y + this._viewportHeight));
      }, this)
      .forEach(actor => {
        const actorPosition = actor.getPosition();
        const displayX = actorPosition.x - position.x;
        const displayY = actorPosition.y - position.y;
        const glyph = actor.getGlyph();

        this._glyphWriter.writeGlyph(glyph, displayX * 4, displayY * 6) ;
      }, this);
  }

  private getPosition(map: Map, focus: Actor): Position {
    let position = focus.getPosition();
    let halfviewportWidth = Math.round(this._viewportWidth / 2);
    let halfviewportHeigt = Math.round(this._viewportHeight / 2);
    position.x = Math.max(0, position.x - halfviewportWidth);
    position.y = Math.max(0, position.y - halfviewportHeigt);
    position.x = Math.min(position.x, map.getWidth() - this._viewportWidth);
    position.y = Math.min(position.y, map.getHeight() - this._viewportHeight);
    return position;
  }

  private _glyphWriter: GlyphWriter;
  private _viewportWidth: number;
  private _viewportHeight: number;
}