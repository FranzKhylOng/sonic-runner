import { Vec2 } from "kaplay";
import { GameEntity } from "./game-entity";

export class Ring extends GameEntity {
  constructor(spawnPoint: Vec2) {
    super("ring", "spin", spawnPoint, "ring");
  }
}
