import { Vec2 } from "kaplay";
import game from "../kaplayCtx";

export function makeBuzzBomber(pos: Vec2) {
  return game.add([
    game.sprite("buzzbomber", { anim: "run" }), //set default animation to run
    game.area({ shape: new game.Rect(game.vec2(6, 0), 44, 24) }),
    game.scale(4),
    game.anchor("center"),
    game.pos(pos),
    game.offscreen(), //component that grants us method to check when enemy is offscreen
    "flyingEnemy", //tag for enemies
  ]);
}
