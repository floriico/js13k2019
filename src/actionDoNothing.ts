import { Action, ActionResult } from "./action";
import { Actor } from "./actor";

export class ActionDoNothing extends Action {
  static instance = new ActionDoNothing();

  static getInstance () {
    return ActionDoNothing.instance;
  }

  perform(actor: Actor): ActionResult {
    return new ActionResult({ isOk: true });
  }
}