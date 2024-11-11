import { Vec2, GameObj, Shape } from "kaplay";
import game from "../kaplayCtx";

export class GameEntity {
  //the tag is used for the library to easily identify the entity for other game events
  //the offscreen component grants us a method to check when the entity is offscreen
  protected obj: GameObj;

  constructor(
    spriteSheet: string,
    defaultAnim: string,
    spawnPoint: Vec2,
    hitboxSize: Shape,
    entityTag: string
  ) {
    this.obj = game.add([
      game.sprite(spriteSheet, { anim: defaultAnim }),
      game.area({ shape: hitboxSize }),
      game.scale(4),
      game.anchor("center"),
      game.pos(spawnPoint),
      game.offscreen(),
      entityTag,
    ]);
  }

  getEntity() {
    return this.obj;
  }
}
