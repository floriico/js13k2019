import { MapRenderer } from "./mapRenderer";
import { ActorRenderer } from "./actorRenderer";
import { ConsoleRenderer } from "./consoleRenderer";
import { GlyphWriter } from "./glyphs";
import { AdventureStage } from "./adventureStage";
import { InfoRenderer } from "./infoRenderer";

export interface AdventureRendererOptions {
  glyphWriter: GlyphWriter
}

export class AdventureRenderer {
  constructor (options: AdventureRendererOptions) {
    this._glyphWriter = options.glyphWriter;
    this._mapRenderer = this.createMapRenderer();
    this._actorRenderer = this.createActorRenderer();
    this._consoleRenderer = this.createConsoleRenderer();
    this._infoRenderer = this.createInfoRenderer();
  }

  render (adventureStage: AdventureStage) {
    this._mapRenderer.render(adventureStage.getMap(), adventureStage.getHero());
    this._actorRenderer.render(adventureStage.getActors(), adventureStage.getMap(), adventureStage.getHero());
    this._consoleRenderer.render(adventureStage.getConsole());
    this._infoRenderer.render(adventureStage.getHero());
  }

  private createMapRenderer () : MapRenderer {
    return new MapRenderer({
      viewportWidth: 80,
      viewportHeight: 40,
      glyphWriter: this._glyphWriter,
    });
  }

  private createActorRenderer () : ActorRenderer {
    return new ActorRenderer({
      glyphWriter: this._glyphWriter,
      viewportWidth: 80,
      viewportHeigth: 40
    });
  }

  private createConsoleRenderer () : ConsoleRenderer {
    return new ConsoleRenderer({
      glyphWriter: this._glyphWriter,
      viewportWidth: 100,
      viewportHeight: 10,
      position: {x: 0, y: 40 },
    });
  }

  private createInfoRenderer () : InfoRenderer {
    return new InfoRenderer({
      glyphWriter: this._glyphWriter,
      viewportWidth: 20,
      viewportHeight: 40,
      position: { x: 80, y: 0 }
    });
  }

  private _glyphWriter: GlyphWriter;
  private _mapRenderer: MapRenderer;
  private _actorRenderer: ActorRenderer;
  private _consoleRenderer: ConsoleRenderer; 
  private _infoRenderer: InfoRenderer;
}