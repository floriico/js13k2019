import { Action, ActionResult } from "./action";
import { Actor } from "./actor";
import { AdventureStage } from "./adventureStage";

export class ActionRest extends Action {
  constructor(stage: AdventureStage) {
    super();
    this._stage = stage;
  }

  perform(actor: Actor): ActionResult {
    let hp = actor.getHp();
    let heal = Math.round(Math.random() * 3) + 1;
    actor.setHp(hp + heal);
    let message = actor.getName() + ' rest for ' + heal + ' hp        ';
    this._stage.getConsole().addMessage(message);
    return new ActionResult({ isOk: true });
  }

  private _stage: AdventureStage;
}