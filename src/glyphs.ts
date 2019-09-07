import { Color } from "./color";

export const Glyphs: Record<string, number> = {
  '\x00': 0xEEE440, // tree
  '\x01': 0x6C06C0, // water
  '@': 0x69BB86,
  '0': 0x6AAAC0,
  '1': 0x4C4440,
  '2': 0xC248E0,
  '3': 0xC242C0,
  '4': 0xAAE220,
  '5': 0xE8C2C0,
  '6': 0x68EAE0,
  '7': 0xE24880,
  '8': 0xEAEAE0,
  '9': 0xEAE2C0,
  'A': 0x4AEAA0,
  'B': 0xCACAC0,
  'C': 0x688860,
  'D': 0xCAAAC0,
  'E': 0xE8E8E0,
  'F': 0xE8E880,
  'G': 0x68EA60,
  'H': 0xAAEAA0,
  'I': 0xE444E0,
  'J': 0x222A40,
  'K': 0xAACAA0,
  'L': 0x8888E0,
  'M': 0xAEEAA0,
  'N': 0xAEEEA0,
  'O': 0x4AAA40,
  'P': 0xCAC880,
  'Q': 0x4AAA60,
  'R': 0xCACAA0,
  'S': 0x6842C0,
  'T': 0xE44440,
  'U': 0xAAAA60,
  'V': 0xAAA440,
  'W': 0xAAEEA0,
  'X': 0xAA4AA0,
  'Y': 0xAA4440,
  'Z': 0xE248E0,
  'a': 0x0C6AE0,
  'b': 0x8CAAC0,
  'c': 0x068860,
  'd': 0x26AA60,
  'e': 0x06AC60,
  'f': 0x24E440,
  'g': 0x06AE24,
  'h': 0x8CAAA0,
  'i': 0x404440,
  'j': 0x2022A4,
  'k': 0x8ACCA0,
  'l': 0xC444E0,
  'm': 0x0EEEA0,
  'n': 0x0CAAA0,
  'o': 0x04AA40,
  'p': 0x0CAAC8,
  'q': 0x06AA62,
  'r': 0x068880,
  's': 0x06C6C0,
  't': 0x4E4460,
  'u': 0x0AAA60,
  'v': 0x0AAE40,
  'w': 0x0AEEE0,
  'x': 0x0A44A0,
  'y': 0x0AA624,
  'z': 0x0E6CE0,
  '.': 0x000040,
  '!': 0x444040,
  '"': 0xAA0000,
  '?': 0xE24040,
  '|': 0x444444,
  '+': 0x004E40,
  '-': 0x000E00,
  '/': 0x224880,
  ':': 0x004040,
  '(': 0x488840,
  ')': 0x844480
};

export function writeGlyph(graphicalContext: CanvasRenderingContext2D, letter: string, posX: number, posY: number) {
  let glyph = Glyphs[letter];
  graphicalContext.fillStyle = '#fff';
  graphicalContext.fillRect(posX, posY, 4, 6);
  graphicalContext.fillStyle = '#000';
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

export interface GlyphWriterOptions {
  backgroundColor: Color;
  foregroundColor: Color;
}

export class GlyphWriter {
  constructor (options: GlyphWriterOptions) {
    this._canvas = this.createCanvas();
    this._graphicalContext = this.createGraphicalContext();
    this._backgroundColor = options.backgroundColor;
    this._foregroundColor = options.foregroundColor;
  }

  writeGlyph (letter: string, posX: number, posY: number) {
    let glyph = Glyphs[letter];
    this._graphicalContext.fillStyle = this._backgroundColor;
    this._graphicalContext.fillRect(posX, posY, 4, 6);
    this._graphicalContext.fillStyle = this._foregroundColor;
    for (let i = 0; i < 24; i++) {
      let x = i % 4;
      let y = Math.floor(i / 4);
      let bit = glyph & (1 << (23 - i));
      console.log()
      if (bit) {
        this._graphicalContext.fillRect(x + posX, y + posY, 1, 1);
      }
    }
  }

  writeText (text: string, posX: number, posY: number) {
    let length = text.length;
    let cPosX = posX;
    let cPosY = posY;
    
    for(let i = 0; i < length; i++) {
      let c = text.charAt(i);
      this.writeGlyph(c, cPosX, cPosY);
      cPosX += 4;
    }
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

  private _canvas: HTMLCanvasElement;
  private _graphicalContext: CanvasRenderingContext2D;
  private _backgroundColor: Color;
  private _foregroundColor: Color;
}
