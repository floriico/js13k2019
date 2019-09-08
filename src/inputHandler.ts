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
    return input === undefined ? Input.NONE : input;
  }

  onKeyboardEvent (keyboardEvent: KeyboardEvent) {
    switch (keyboardEvent.key) {
      case 'ArrowUp':
        this._inputs.push(Input.ARROW_UP);
        break;
      case 'ArrowDown':
        this._inputs.push(Input.ARROW_DOWN);
        break;
      case 'ArrowLeft':
        this._inputs.push(Input.ARROW_LEFT);
        break;
      case 'ArrowRight':
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