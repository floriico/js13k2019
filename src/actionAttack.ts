import { Action, ActionResult } from "./action";
import { AdventureStage } from "./adventureStage";
import { Actor } from "./actor";

export class actionAttack extends Action {
  constructor (stage: AdventureStage, target: Actor) {
    super();
    this._stage = stage;
    this._target = target;
  }

  perform(actor: Actor): ActionResult {
    let attack = actor.getAttack();
    let damage = Math.round(Math.random() * (attack[1] - attack[0]) + attack[0]);
    let hp = this._target.getHp();
    let defense = this._target.getDefense();
    hp -= (damage - defense);
    this._target.setHp(hp);
    let message = actor.getName() + ' hit ' + this._target.getName() + ' for ' + (damage - defense) + ' damage';
    this._stage.getConsole().addMessage(message);
    if (this._target.isDead()) {
      let message = this._target.getName() + ' is dead';
      this._stage.getConsole().addMessage(message);
    }
    return new ActionResult({ isOk: true });
  }

  private _stage: AdventureStage;
  private _target: Actor;
}