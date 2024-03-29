import { Action, ActionResult } from "./action";
import { AdventureStage } from "./adventureStage";
import { Actor } from "./actor";
import { GameLoopEvent } from "./gameLoop";

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
    let hit = Math.max(0, (damage - defense));
    hp -= hit;
    this._target.setHp(hp);
    let message = actor.getName() + ' hit ' + this._target.getName() + ' for ' + hit + ' damage';
    this._stage.getConsole().addMessage(message);
    actor.addXp(1);
    if (this._target.isDead()) {
      actor.addXp(2);
      let message = this._target.getName() + ' is dead                 ';
      this._stage.getConsole().addMessage(message);
      if (this._target.getGlyph() === 'D') {
        this._stage.notifyGameLoop(GameLoopEvent.GAME_WON);
      }
    }
    return new ActionResult({ isOk: true });
  }

  private _stage: AdventureStage;
  private _target: Actor;
}