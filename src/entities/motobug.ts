import { Vec2 } from "kaplay";
import game from "../kaplayCtx";

export function makeMotobug(pos: Vec2) {
  return game.add([
    game.sprite("motobug", { anim: "run" }), //set default animation to run
    game.area({ shape: new game.Rect(game.vec2(-5, 0), 32, 32) }),
    game.scale(4),
    game.anchor("center"),
    game.pos(pos),
    game.offscreen(), //compontnet that grants us method to check when enemy is offscreen
    "enemy", //tag for enemies
  ]);
}
