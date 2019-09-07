import { GameLoop } from './gameLoop';
import { Input } from './input';

export class InputHandler {
  constructor () {
    this._inputs = [];
  }

  listen () {
    document.body.addEventListener('keyup', this.onKeyboardEvent.bind(this));
  }

  getNextInput (): Input {
    let input = this._inputs.shift();
    return input || Input.NONE;
  }

  onKeyboardEvent (keyboardEvent: KeyboardEvent) {
    switch (keyboardEvent.key) {
      case 'arrowUp':
        this._inputs.push(Input.ARROW_UP);
        break;
      case 'arrowDown':
        this._inputs.push(Input.ARROW_DOWN);
        break;
      case 'arrowLeft':
        this._inputs.push(Input.ARROW_LEFT);
        break;
      case 'arrowRight':
        this._inputs.push(Input.ARROW_RIGHT);
        break;
      case 'Enter':
        this._inputs.push(Input.ENTER);
        break;
      case ' ':
        this._inputs.push(Input.SPACE);
        break;
    }
  }
 
  private _inputs: Input[];
}