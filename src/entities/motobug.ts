import { Vec2 } from "kaplay";
import game from "../kaplayCtx";
import { GameEntity } from "./game-entity";

export class MotoBug extends GameEntity {
  constructor(spawnPoint: Vec2) {
    super(
      "motobug",
      "run",
      spawnPoint,
      "enemy",
      new game.Rect(game.vec2(-5, 0), 32, 32)
    );
  }
}
