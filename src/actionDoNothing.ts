import { Action, ActionResult } from "./action";
import { Actor } from "./actor";

export class ActionDoNothing extends Action {
  private static _instance = new ActionDoNothing();

  static getInstance () {
    return ActionDoNothing._instance;
  }

  perform(actor: Actor): ActionResult {
    return new ActionResult({ isOk: true });
  }
}