import { Vec2 } from "kaplay";
import { GameEntity } from "./game-entity";
import game from "../kaplayCtx";

export class BuzzBomber extends GameEntity {
  constructor(spawnPoint: Vec2) {
    super(
      "buzzbomber",
      "fly",
      spawnPoint,
      "flyingEnemy",
      new game.Rect(game.vec2(6, 0), 44, 24)
    );
  }
}
