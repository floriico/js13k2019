import { Action, ActionResult } from "./action";
import { Actor } from "./actor";
import { Direction } from "./direction";
import { AdventureStage } from "./adventureStage";
import { Position } from "./position";

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
    let canWalk = this.validatePosition(position);
    if (canWalk) {
      actor.setPosition(position);
    }
    return new ActionResult({ isOk: canWalk });
  }

  private validatePosition(position: Position): boolean {
    let map = this._stage.getMap();
    let cell = map.getCell(position);
    return cell !== 0;
  }

  private _direction: Direction;
  private _stage: AdventureStage;
}