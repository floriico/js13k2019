export class Console {

  constructor() {
    this._logs = [];
  }

  getMessages (numberOdMessages: number): string[] {
    return this._logs.slice(-5);
  }

  addMessage (message:string) {
    this._logs.push(message);
  }

  private _logs: string[];
}