import { Actor } from './actor';
import { Position } from './position';
import { writeGlyph, GlyphWriter } from './glyphs';

export interface ActorRendererOptions {
  glyphWriter: GlyphWriter;
  position: Position;
  viewportWidth: number;
  viewportHeigth: number;
  actors: Actor[];
}

export class ActorRenderer {
  constructor (options: ActorRendererOptions) {
    this._glyphWriter = options.glyphWriter;
    this._position = options.position;
    this._viewportWidth = options.viewportWidth;
    this._viewportHeight = options.viewportHeigth;
    this._actors = options.actors;
  }

  setPosition (position: Position) {
    this._position = position;
  }

  render () {
    this._actors
      .filter(actor => {
        const actorPosition = actor.getPosition();
        
        return (actorPosition.x >= this._position.x) && 
          (actorPosition.x <= (this._position.x + this._viewportWidth)) &&
          (actorPosition.y >= this._position.y) && 
          (actorPosition.y <= (this._position.y + this._viewportHeight));
      }, this)
      .forEach(actor => {
        const actorPosition = actor.getPosition();
        const displayX = actorPosition.x - this._position.x;
        const displayY = actorPosition.y - this._position.y;
        const glyph = actor.getGlyph();

        this._glyphWriter.writeGlyph(glyph, displayX * 4, displayY * 6) ;
      }, this);
  }

  private _glyphWriter: GlyphWriter;
  private _position: Position;
  private _viewportWidth: number;
  private _viewportHeight: number;
  private _actors: Actor[];
}