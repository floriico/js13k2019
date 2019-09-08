import { Actor } from "./actor";

export interface ActionResultOptions {
  isOk: boolean,
  delegate?: Action
}

export class ActionResult {
  constructor (options: ActionResultOptions) {
    this._isOk = options.isOk;
    this._delegate = options.delegate;
  }

  isOk () {
    return this._isOk;
  }

  getDelegate (): Action | undefined {
    return this._delegate;
  }

  private _isOk: boolean;
  private _delegate?: Action;
}

export abstract class Action {
  abstract perform (actor: Actor): ActionResult;
}