import { Vec2 } from "kaplay";
import game from "../kaplayCtx";

export function makeSonic(pos: Vec2) {
  //js dev wants a pattern where a function constructs sonic, cause of this i think we could have a Sonic class
  const sonic = game.add([
    game.sprite("sonic", { anim: "run" }), //set default animation to run
    game.scale(4),
    game.area(), //to have automatic hitbox
    game.anchor("center"), //the default origin of the object is top left, we do this tp position along the center
    game.pos(pos),
  ]);
}
