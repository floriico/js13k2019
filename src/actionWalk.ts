import { Action, ActionResult } from "./action";
import { Actor } from "./actor";
import { Direction } from "./direction";
import { AdventureStage } from "./adventureStage";
import { Position } from "./position";
import { actionAttack } from "./actionAttack";

export class ActionWalk extends Action {
  
  constructor (stage: AdventureStage, direction: Direction) {
    super();
    this._stage = stage;
    this._direction = direction;
  }

  perform(actor: Actor): ActionResult {
    let position = actor.getPosition();

    switch (this._direction) {
      case Direction.NORTH:
        position.y -= 1;
        break;
      case Direction.SOUTH:
        position.y += 1;
        break;
      case Direction.EAST:
        position.x += 1;
        break;
      case Direction.WEST:
        position.x -= 1;
        break;
    }
    let canWalk = this.canWalk(position);
    let canAttack = this.canAttack(position);
    let result;
    if (canWalk && !(canAttack)) {
      actor.setPosition(position);
      result = new ActionResult({ isOk: canWalk });
    } else if (canAttack) {
      result = new ActionResult({
        isOk: false,
        delegate: new actionAttack(this._stage, canAttack)
      });
    } else {
      result = new ActionResult({ isOk: false });
    }
    return result;
  }

  private canWalk(position: Position): boolean {
    let map = this._stage.getMap();
    let cell = map.getCell(position);
    let canWalk = cell !== 0 && cell !== 10;
    return canWalk;
  }

  private canAttack (position: Position) : Actor | undefined {
    let actors = this._stage.getActors();
    return actors.find((actor) => {
      let enemyPosition = actor.getPosition();
      return enemyPosition.x === position.x &&
        enemyPosition.y === position.y;
    });
  } 

  private _direction: Direction;
  private _stage: AdventureStage;
}