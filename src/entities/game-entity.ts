import { Vec2, GameObj, Shape } from "kaplay";
import game from "../kaplayCtx";

export class GameEntity {
  protected obj: GameObj;

  constructor(
    spriteSheet: string,
    defaultAnim: string,
    spawnPoint: Vec2,
    entityTag: string,
    hitboxSize?: Shape
  ) {
    this.obj = game.add([
      game.sprite(spriteSheet, { anim: defaultAnim }),
      game.area({ shape: hitboxSize }),
      game.scale(4),
      game.anchor("center"),
      game.pos(spawnPoint),
      game.offscreen(), //grants us a method to check when the entity is offscreen
      entityTag, //used for the library to easily identify which entity is used to trigger other game events
    ]);
  }

  getEntity() {
    return this.obj;
  }
}
