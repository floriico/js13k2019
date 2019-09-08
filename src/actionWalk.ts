import { Action, ActionResult } from "./action";
import { Actor } from "./actor";
import { Direction } from "./direction";

export class ActionWalk extends Action {
  
  constructor (direction: Direction) {
    super();
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
    actor.setPosition(position);
    return new ActionResult({ isOk: true });
  }

  private _direction: Direction;
}