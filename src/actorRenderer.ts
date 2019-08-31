import { Actor } from './actor';
import { Position } from './position';
import { writeGlyph } from './glyphs';

export interface ActorRendererOptions {
  graphicalContext: CanvasRenderingContext2D;
  position: Position;
  viewportWidth: number;
  viewportHeigth: number;
  actors: Actor[];
}

export class ActorRenderer {
  constructor (options: ActorRendererOptions) {
    this._graphicalContext = options.graphicalContext;
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

        writeGlyph(this._graphicalContext, glyph, displayX * 4, displayY * 6) ;
      }, this);
  }

  private _graphicalContext: CanvasRenderingContext2D;
  private _position: Position;
  private _viewportWidth: number;
  private _viewportHeight: number;
  private _actors: Actor[];
}