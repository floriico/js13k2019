import { Glyphs, writeGlyph } from './glyphs';
import { MapFactory } from './mapFactory'; 
import { MapRenderer } from './mapRenderer';

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const graphicalContext = canvas.getContext('2d');



if (graphicalContext) {
  graphicalContext.scale(2, 2);
  
  const map  = MapFactory.createMap({
    seed: 4242,
    detail: 9,
    rougthness: 0.95
  });
  const mapRenderer = new MapRenderer({
    viewportWidth: 80,
    viewportHeight: 40,
    graphicalContext: graphicalContext,
    map: map
  });
  
  mapRenderer.render();

  //writeGlyph(graphicalContext, 'A', 0, 0);
}
