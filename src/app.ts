import { Glyphs, writeGlyph, GlyphWriter } from './glyphs';
import { MapFactory } from './mapFactory'; 
import { MapRenderer } from './mapRenderer';
import { Actor } from './actor';
import { ActorRenderer } from './actorRenderer';
import { Console } from './console';
import { ConsoleRenderer } from './consoleRenderer';
import { Color } from './color';

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const graphicalContext = canvas.getContext('2d');



if (graphicalContext) {
  graphicalContext.scale(2, 2);

  const glyphWriter = new GlyphWriter({
    graphicalContext: graphicalContext,
    backgroundColor: Color.BLACK,
    foregroundColor: Color.WHITE
  });
  
  const hero = new Actor({
    position: { x: 40, y: 20 },
    glyph: '@'
  });
  const actors: Actor[] = [];
  actors.push(hero);
  const actorRenderer = new ActorRenderer({
    glyphWriter: glyphWriter,
    viewportWidth: 80,
    viewportHeigth: 40,
    position: { x: 0, y: 0},
    actors: actors
  });
  const map  = MapFactory.createMap({
    seed: 4242,
    detail: 9,
    rougthness: 0.95
  });
  const mapRenderer = new MapRenderer({
    viewportWidth: 80,
    viewportHeight: 40,
    glyphWriter: glyphWriter,
    map: map,
    focus: hero
  });
  const console = new Console();
  console.addMessage('Hello World !!');
  console.addMessage('Florian Bellot');
  console.addMessage('0123456789 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  
  const consoleRenderer = new ConsoleRenderer({
    console: console,
    glyphWriter: glyphWriter,
    viewportWidth: 100,
    viewportHeight: 10,
    position: {x: 0, y: 40 },
  })
  
  mapRenderer.render();
  actorRenderer.render();
  consoleRenderer.render();

}
