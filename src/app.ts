import { Glyphs, writeGlyph } from './glyphs';
import { MapFactory } from './mapFactory'; 
import { MapRenderer } from './mapRenderer';
import { Actor } from './actor';
import { ActorRenderer } from './actorRenderer';

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const graphicalContext = canvas.getContext('2d');



if (graphicalContext) {
  graphicalContext.scale(2, 2);
  
  const hero = new Actor({
    position: { x: 40, y: 20 },
    glyph: '@'
  });
  const actors: Actor[] = [];
  actors.push(hero);
  const actorRenderer = new ActorRenderer({
    graphicalContext: graphicalContext,
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
    graphicalContext: graphicalContext,
    map: map,
    focus: hero
  });
  
  mapRenderer.render();
  actorRenderer.render();

}
