import { Glyphs } from './glyphs';

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const graphicalContext = canvas.getContext('2d');

function writeGlyph(graphicalContext: CanvasRenderingContext2D, letter: string, posX: number, posY: number) {
  let glyph = Glyphs[letter]; 
  for (let i = 0; i < 24; i++) {
    let x = i % 4;
    let y = Math.floor(i / 4);
    let bit = glyph & (1 << (23 - i));
    console.log()
    if (bit) {
      graphicalContext.fillRect(x + posX, y + posY, 1, 1);
    }
  }
}

if (graphicalContext) {
  graphicalContext.scale(2, 2);
  writeGlyph(graphicalContext, 'A', 0, 0);
}
