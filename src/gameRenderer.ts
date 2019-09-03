import { Game } from "./game";
import { MapRenderer } from "./mapRenderer";
import { ActorRenderer } from "./actorRenderer";
import { ConsoleRenderer } from "./consoleRenderer";
import { GlyphWriter } from "./glyphs";
import { Color } from "./color";

export interface GameRendererOptions {
  game: Game
}

export class GameRenderer {
  constructor (options: GameRendererOptions) {
    this._game = options.game;
    this._canvas = this.createCanvas();
    this._graphicalContext = this.createGraphicalContext();
    this._glyphWriter = this.createGlyphWriter();
    this._mapRenderer = this.createMapRenderer();
    this._actorRenderer = this.createActorRenderer();
    this._consoleRenderer = this.createConsoleRenderer();
  }

  render () {
    this._mapRenderer.render();
    this._actorRenderer.render();
    this._consoleRenderer.render();
  }

  private createCanvas () {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
    return canvas;
  }

  private createGraphicalContext () : CanvasRenderingContext2D {
    const gc = this._canvas.getContext('2d');
    if (gc === null) {
      throw new Error();
    }
    gc.scale(2, 2);
    return gc;
  }

  private createMapRenderer () : MapRenderer {
    return new MapRenderer({
      viewportWidth: 80,
      viewportHeight: 40,
      glyphWriter: this._glyphWriter,
      map: this._game.getMap(),
      focus: this._game.getHero()
    });
  }

  private createActorRenderer () : ActorRenderer {
    return new ActorRenderer({
      glyphWriter: this._glyphWriter,
      viewportWidth: 80,
      viewportHeigth: 40,
      position: { x: 0, y: 0},
      actors: this._game.getActors()
    });
  }

  private createConsoleRenderer () : ConsoleRenderer {
    return new ConsoleRenderer({
      console: this._game.getConsole(),
      glyphWriter: this._glyphWriter,
      viewportWidth: 100,
      viewportHeight: 10,
      position: {x: 0, y: 40 },
    });
  }

  private createGlyphWriter () {
    return new GlyphWriter({
      graphicalContext: this._graphicalContext,
      backgroundColor: Color.BLACK,
      foregroundColor: Color.WHITE
    });
  }

  private _canvas: HTMLCanvasElement;
  private _graphicalContext: CanvasRenderingContext2D;
  private _game: Game;
  private _glyphWriter: GlyphWriter;
  private _mapRenderer: MapRenderer;
  private _actorRenderer: ActorRenderer;
  private _consoleRenderer: ConsoleRenderer; 
}